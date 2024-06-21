const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysqlispassword@26"
});

function dbConnect(){
    con.connect(function(err){
        if(err) throw(err);
        console.log("Connect Established");
    })
}

function dbUse(){
    con.query(`USE Medical`, function(err,res){
        if(err) throw err;
        console.log("DB In Business (laughing Emoji)")
    })
}
dbUse();

async function insertIntoRegisterCheckRepetation(name, email, pass, gender, age){
    console.log("Data from server = ",name,email,pass,gender,age)
    const sql = `select * from Register where name = '${name}'`;
    
    const [data] =  await new Promise((resolve,rej)=>{
        con.query(sql,function(err,res){
            if(err) throw(err);
            else resolve(res);
        });
    });
    
    if(data){
        console.log("Data is already present in DataBase");
        return true;
    }else{
        console.log("No data repetation, Good to go");
        const sql = `INSERT INTO Register(name, email, password, gender, age) VALUES(?, ?, ?, ?, ?)`;
        con.query(sql,[name,email,pass,gender,age],function(err,res){
            if(err) throw err;

            console.log("Data Inserted in Register table successfully");
            return false;
        })
    }
};


async function checkLoginWithName(name, password){
    console.log("name - ",name);
    console.log("pass - ",password);

    const sql = `SELECT * FROM Register WHERE name = '${name}' AND password = ${password}`;
    const[LoginInfo] = await new Promise((resolve,reject)=>{
        con.query(sql, function(err,res){
            if (err) throw err;
            else resolve(res);
        });
    });

    if(LoginInfo){
        console.log("User Registered = ",LoginInfo);
        return {present:true, id:LoginInfo.userLoginId, all_info:LoginInfo};
    }
    else{
        console.log("User Not Registered = ",LoginInfo);
        return false;
    }
}

async function checkLoginWithEmail(email, password){
    console.log("email = ",email);
    console.log("password = ",password);

    const sql = `SELECT * FROM Login where email = '${email}' AND password = '${password}'`;
    const [LoginInfo] = await new Promise((reslove,reject)=>{
        con.query(sql,function(err,res){
            if(err) throw err;
            else reslove(res);
        });
    });

    if(LoginInfo){
        console.log("User Registered = ",LoginInfo);
        return {present:true, id:LoginInfo.userLoginId};
    }
    else{
        console.log("User Not Registered = ", LoginInfo);
        return false;
    }
}

async function registerHistoryDataInsert(historyId, userId, historyText){
    const sql = `INSERT INTO ReportHistory(userId,reportId, reportData) VALUES (?, ?, ?)`;
      con.query(sql, [userId,historyId,historyText ], function (err, res) {
        if (err) throw err;
        console.log("Data in History inserted Successfully");
      });
  }

async function registerHistoryDataGet(userId){
    console.log("User Id recived = ",userId);
    const sql = `SELECT * FROM ReportHistory WHERE userId = ${userId}`;
    return new Promise((resolve, reject) => {
        con.query(sql, function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
    });
}


module.exports = {dbConnect,
                dbUse,
                insertIntoRegisterCheckRepetation,
                checkLoginWithName,
                checkLoginWithEmail,
                registerHistoryDataGet,
                registerHistoryDataInsert

}