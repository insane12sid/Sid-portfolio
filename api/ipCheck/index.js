const fs = require("fs");
const path = require("path");

module.exports = async function (context, req) {
  const allowedIP = "10.237.238.227"; // Replace with your actual IP

  const clientIP =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.headers["x-client-ip"];

  if (clientIP === allowedIP) {
    const htmlPath = path.join(__dirname, "../../portfolio.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    context.res = {
      status: 200,
      headers: { "Content-Type": "text/html" },
      body: html
    };
  } else {
    context.res = {
      status: 403,
      headers: { "Content-Type": "text/plain" },
      body: "Access Denied: Your IP is not allowed."
    };
  }
};
