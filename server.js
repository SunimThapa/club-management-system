require("dotenv").config();
const express = require("express");
const router = require("./config/router.config")
const errorHandler = require("./middlewares/error.middleware")
const app = express();
app.use(express.json());
app.use("/api/v1/", router);
app.use(errorHandler);

app.get("/home", async(req, res) => {
    res.send("Club Management API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}`);
    console.log("To stop the server, press Ctrl+C");
});
