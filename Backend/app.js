const express = require("express");
const path = require("path");
const fileController = require("./controllers/fileController");
const folderController = require("./controllers/folderController");
const { exec } = require("child_process");
const cors = require("cors");

////////////////////////////////////////////////////////////////////////////// APP SETUP //////////////////////////////////////////////////////////////

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

////////////////////////////////////////////////////////////////////////////// APP ROUTES //////////////////////////////////////////////////////////////

// GET ONE FOLDER AND ITS CONTENT
app.post("/folderDetail", async function (req, res) {
  let oneFolder = await folderController
    .GetOneFolder(req.body.path)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });

  res.json(oneFolder);
});

// GET ONE FILE AND ITS CONTENT
app.post("/fileContent", async function (req, res) {
  let oneFile = await fileController
    .GetOneFile(req.body.path)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  res.json(oneFile);
});

// ADD A NEW FILE TO THE SPECIFIED FOLDER
app.post("/addFile", async function (req, res) {
  let addedFile = await fileController
    .AddFile(req.body)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  res.json(addedFile);
});

// ADD A NEW FOLDER TO THE SPECIFIED FOLDER
app.post("/addFolder", async function (req, res) {
  let addedFolder = await folderController
    .AddFolder(req.body)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  res.json(addedFolder);
});

// DELETE A FOLDER
app.delete("/deleteFolder", async function (req, res) {
  await folderController
    .DeleteFolder(req.body.path)
    .then(() => {
      res.status(200).send("Deletion OK");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// DELETE A FILE
app.delete("/deleteFile", async function (req, res) {
  await fileController
    .DeleteFile(req.body.path)
    .then(() => {
      res.status(200).send("Deletion OK");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// MOVE A FILE TO ANOTHER FOLDER
app.post("/moveFile", async function (req, res) {
  console.log(req.body);
  let oneFile = await fileController
    .MoveOneFile(req.body.data.oldPath, req.body.data.newPath)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  res.json(oneFile);
});

// MOVE A FOLDER TO ANOTHER FOLDER
app.post("/moveFolder", async function (req, res) {
  await folderController
    .MoveOneFolder(req.body.data.oldPath, req.body.data.newPath)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

// EXECUTE A COMMAND AND RETURN ITS RESULT
app.post("/bash", async function (req, res) {
  exec(req.body.data, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.send(error.message);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      res.send(stderr);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.send(stdout);
  });
});

////////////////////////////////////////////////////////////////////////////// APP START //////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log("Server app listening on port " + port);
});
