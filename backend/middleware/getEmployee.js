// This middleware checks if the request body is present and returns a 400 Bad Request response if it is present.
module.exports = (req, res, next) => {
  if (req.body && Object.keys(req.body).length > 0) {
    return res.status(400).json({ message: "Request body is not allowed for this endpoint" });
  }
  next();
};