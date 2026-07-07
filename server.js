const express = require("express");
const authRouter = require("./modules/auth/auth.router")
const db = require("./config/database");
const app = express();
app.use(express.json());
app.use("/api/v1", authRouter);

app.get("/home", async(req, res) => {
  
    try{ const [rows] = await db.query("SELECT * FROM users");
        console.log(rows);
    }catch(err){
        console.error(err);
    }
    res.send("Club Management API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}`);
    console.log("To stop the server, press Ctrl+C");
});
