module.exports = async function (context, req) {
  const allowedIp = "10.237.238.227"; // 🔁 Replace with your IP
  const requesterIp = req.headers["x-forwarded-for"]?.split(",")[0].trim();

  if (requesterIp === allowedIp) {
    context.res = {
      status: 200,
      headers: { "Content-Type": "text/html" },
      body: require('fs').readFileSync(`${__dirname}/../../portfolio.html`, 'utf8')
    };
  } else {
    context.res = {
      status: 403,
      body: "Access denied: IP not allowed."
    };
  }
};
