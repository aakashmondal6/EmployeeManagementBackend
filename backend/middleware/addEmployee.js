
// This middleware checks if the request body is empty and returns a 400 Bad Request response
module.exports = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body cannot be empty" });
  }
  next();
};