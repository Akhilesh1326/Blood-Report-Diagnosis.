const express = require("express");
const cw = require("tesseract.js");
const bodyParser = require("body-parser");
const db = require("./models/mysql");
const multer = require("multer");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
<<<<<<< HEAD
require('dotenv').config()


const app = express();
const Port = 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
=======

const app = express();
const Port = 3000;
process.env.API_KEY = "YOUR API KEY";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
>>>>>>> df413913b3aa892e4fa38f828ad0248b69c1b0ed

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let imagePath;
app.post('/user/setphoto', upload.single('image'), async (req, res) => {
  try {
    imagePath = path.resolve(__dirname, 'uploads', req.file.filename);
    // const imageText = await readImg(imagePath);

    res.status(200).json({
      message: 'Image uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
      imageText: imageText, // Optionally return the extracted text
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});

async function readImg(filePath) {
  const worker = await cw.createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(filePath);
  await worker.terminate();
  return text;
}

function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}

app.get("/user/getreport", async (req, res) => {
  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Give me proper information about the given blood report if the data is besides from blood report only give info that it must be about blood report";

    const imageParts = [
      fileToGenerativePart(imagePath, "image/jpeg")
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const text = await result.response.text();
    // console.log(text)
    res.json({ data: text });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report', error });
  }
});

app.post("/user/login/register", async (req, res) => {
  const resultData = req.body;

  try {
    const message = await db.insertIntoRegisterCheckRepetation(resultData.name, resultData.email, resultData.password, resultData.gender, resultData.age);
    if (message) {
      res.json({ msg: "Data Repetition" });
    } else {
      res.json({ msg: "All clear" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

app.post("/user/login/loginwithname", async (req, res) => {
  const resultData = req.body;

  try {
    const msg = await db.checkLoginWithName(resultData.name, resultData.password);
    if (msg) {
      res.json({ msg: "present", user_info: msg.all_info });
    } else {
      res.json({ msg: "Absent" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

app.post("/user/login/loginwithemail", async (req, res) => {
  const resultData = req.body;

  try {
    const msg = await db.checkLoginWithEmail(resultData.email, resultData.password);
    if (msg) {
      res.json({ msg: "present" });
    } else {
      res.json({ msg: "Absent" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

app.get("/user/gethistory/:idC",async(req,res)=>{
    console.log("User id from blood report = ",req.params.idC);
    const eventData = await db.registerHistoryDataGet(req.params.idC);
    res.json({data:eventData})
})

app.post("/user/updatehistory",async(req,res)=>{
  console.log("Data from frontend for History= ",req.body);
  const insertHistoryMsg = await db.registerHistoryDataInsert(req.body.hid, req.body.idC, req.body.reportInfo);
  res.json({msg:"Got History"})
})


app.listen(Port, () => {
  console.log("Server Started at Port = ", Port);
});
