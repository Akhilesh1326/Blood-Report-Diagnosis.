import React from 'react';

const FormattedText = ({ text }) => {
  const formatText = (text) => {
    if (!text) return null;

    // Example: Split text into paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((para, index) => (
      <p key={index} className="my-4">
        {para.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    ));
  };

  return <div>{formatText(text)}</div>;
};

export default FormattedText;
