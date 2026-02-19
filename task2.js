const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.get("/addnote", (req, res) => {
    const note = req.query.note;
    if (!note) {
        return res.status(400).send("400 Bad Request");
    }
    fs.appendFile("notes.txt", note + "\n", (err) => {
        if (err) return res.send("Error writing file");
        res.send("Note Added Successfully");
    });
});


app.get("/notes", (req, res) => {
    fs.readFile("notes.txt", "utf8", (err, data) => {
        if (err || data.trim() === "") {
            return res.send("No Notes Found");
        }
        res.send(data);
    });
});


app.get("/clear", (req, res) => {
    fs.writeFile("notes.txt", "", (err) => {
        if (err) return res.send("Error clearing file");
        res.send("All Notes Deleted");
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
