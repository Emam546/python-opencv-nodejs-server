const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { PythonShell } = require("python-shell");

let options = {
    mode: "binary",
    pythonPath: "./env/Scripts/python.exe",
    scriptPath: "./python/",
};
io.on("connection", (socket) => {
    const pyshell = new PythonShell("__main__.py", options);
    pyshell.stdout.on("data", function (message) {
        socket.emit("image",message)
    });
    socket.on("disconnect", () => {
        pyshell.kill();
    });
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(3000, () => {
    console.log("http://localhost:3000");
});
