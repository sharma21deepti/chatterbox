const fs = require("fs");

const logReqRes = (fileName) => {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `${Date.now()}: ${req.method} ${req.url}\n`,
      (err) => {
        if (err) console.error("Logging error:", err);
      }
    );
    console.log("middleware 1");
    next();
  };
};

module.exports = logReqRes;
