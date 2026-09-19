const errorHandler = (err, req, res, next) => {
  let statusCode = err.code || 500;
  let details = err.details || null;
  let message = err.message || "Internal Server Error...";
  let status = err.status || "SERVER_ERROR";
  
  if (err.code === "ER_DUP_ENTRY") {
    statusCode = 400;
    message = "A record with this unique value already exists.";
    status = "DUPLICATE_ENTRY";
  } 
  
  else if (err.code === "ER_NO_REFERENCED_ROW_2" || err.code === "ER_ROW_IS_REFERENCED_2") {
    statusCode = 400;
    message = "Invalid reference or related record does not exist.";
    status = "FOREIGN_KEY_ERROR";
  } 

  else if (err.code === "ECONNREFUSED" || err.code === "PROTOCOL_CONNECTION_LOST") {
    statusCode = 503; 
    message = "Database connection is currently unavailable. Please try again later.";
    status = "DATABASE_UNAVAILABLE";
  }

  res.status(statusCode).json({
    error: details,
    message: message,
    status: status,
    option: null,
  });
};

module.exports = errorHandler;
