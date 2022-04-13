const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const fs_extra  = require('fs-extra')

async function getOneFolder(completePath) {
  return fs.readdirSync(completePath, (err, files) => {
    if (err) {
      return err;
    } else {
      return files;
    }
  });
}

async function createFolder(completePath) {
  fs.mkdirSync(completePath, (err) => {
    if (err) {
      return err;
    } else {
      console.log("The folder has been created!");
      return "Folder created";
    }
  });
}

async function deleteFolder(completePath) {
  try {
    fs.rmSync(completePath, { recursive: true, force: true });
  } catch (err) {
    console.error(err);
  }
}

async function moveOneFolder(oldpath, newPath) {
  try {
    fs_extra.move(oldpath, newPath);
    return "Folder moved successfully";
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = {
  GetOneFolder: async (partialPath) => {
    let temp = await getOneFolder(path.join(__dirname, "../", partialPath));
    return temp.map((file) => {
      return {
        name: file,
        type: path.extname(file) ? "file" : "directory",
      };
    });
  },

  AddFolder: async (data) => {
    return createFolder(data.data.address + "/" + data.data.name);
  },

  MoveOneFolder: (oldPath, newPath) => {
    return moveOneFolder(oldPath, newPath);
  },

  DeleteFolder: async (data) => {
    return deleteFolder(data);
  },
};
