# Compte rendu 4FULLB2-Full Stack Back

## Contributeurs 

Ce projet a été realisé par les contributeurs suivants

- Raphaël DA FONSECA
- William HERBIN
- Florian GILLET

## Installation

## Technologies utilisées

### Backend
#### Node js
Node.js est un environnement bas niveau permettant l’exécution de JavaScript côté serveur.\
Version du framework utilisée: 17.9.0 
Plus d'information: [Voir le site Node js](https://nodejs.org/fr/about/)

### FrontEnd 
#### React js

React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page HTML à chaque changement d'état.\
Version de React utilisée: 18.0.0
Plus d'information: [Voir le site React js](https://fr.reactjs.org/)

### Fichiers

#### Route /fileContent
##### Présentation
Cette route de type 'POST' est ulisée pour lire le contenu d'un fichier. 
##### Code

Dans App.js

Déclaration de la route dans App.js:
```
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
```
Nous faissons appel à la fonction 'GetOneFile' de 'fileController'. Nous attendons le résultat de cette fonction, puis nous envoyons une réponse au format JSON. 

Dans fileController:

La fonction 'readFileSync' permet de lire le contenu d'un fichier. Nous retournons le resultat de la lecture.
```
async function getOneFile(completePath) {
  return fs.readFileSync(completePath, "UTF-8", (err, file) => {
    if (err) {
      return err;
    } else {
      return file;
    }
  });
}
```

#### Route /addFile
##### Présentation
Cette route de type 'POST' est ulisée pour créer un nouveau fichier. 
##### Code
Dans App.js:
Nous faissons appel à la fonction 'AddFile' de 'fileController'. Nous attendons le résultat de cette fonction, puis nous envoyons une réponse au format JSON. 
```
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
```
Dans fileController:

Pour créer un nouveau fichier, nous utilisons la fonction 'writeFileSync'. Nous envoyons le chemin du fichier en arguments. Cette fonction permet d'écrire dans un fichier s'il existe déjà ou de le créer s'il n'existe pas.
```
async function createFile(completePath) {
  fs.writeFileSync(completePath, "", (err) => {
    if (err) {
      return err;
    } else {
      console.log("The file has been created!");
      return "File created";
    }
  });
}
```

#### Route /deleteFile
##### Présentation
Cette route de type 'DELETE' est ulisée pour supprimer un fichier. 
##### Code
Dans App.js:
Nous faissons appel à la fonction 'DeleteFile' de 'fileController'. Nous envoyons le chemin du fichier en arguments. Nous attendons le résultat de cette fonction, puis nous envoyons une réponse au format JSON. 
```
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
```
Dans fileController:
La fonction "unlinkSync" permet de supprimer un fichier.
```
async function deleteFile(completePath) {
  try {
    fs.unlinkSync(completePath);
    //file removed
  } catch (err) {
    console.error(err);
  }
}

```

#### Route /moveFile
##### Présentation
Cette route de type 'POST' est ulisée pour déplacer un fichier. 
##### Code
Dans App.js:
Nous faissons appel à la fonction 'MoveOneFile' de 'fileController'. Arguments sont requis, le chemin actuel et le nouveau chemin.
Nous attendons le résultat de cette fonction, puis nous envoyons une réponse au format JSON. 
```
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
```
Dans fileController:
La fonction 'renameSync' permet de modifier le chemin d'un fichier, donc de le déplacer.
```
async function moveOneFile(oldpath, newPath) {
  try {
    fs.renameSync(oldpath, newPath);
    return "file moved successfully";
  } catch (err) {
    console.error(err);
    return err;
  }
}
```

### Dossiers

#### Route /folderDetail
##### Présentation
Cette route de type 'POST' permet de lister le contenu d'un dossier.
##### Code
Dans app.js:
```
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
```
Dans folderController.js:
Pour lire un dossier, nous utilisons la fonction readdirSync. Elle prend en argument, le chemin du dossier à lire.
```
async function getOneFolder(completePath) {
  return fs.readdirSync(completePath, (err, files) => {
    if (err) {
      return err;
    } else {
      return files;
    }
  });
}
```


#### Route /addFolder
##### Présentation
Cette route de type 'POST' permet de créer un nouveau dossier.
##### Code
Dans App.js:
```
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
```
Dans folderController.js:
Pour créer un dossier, nous utilisons la fonction mkdirSync. Elle prend en argument, le chemin du nouveau dossier.
```
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
```
#### Route /deleteFolder
##### Présentation
Cette route de type 'DELETE' permet de supprimer un dossier.
##### Code
Dans App.js:
```
async function deleteFolder(completePath) {
  try {
    fs.rmSync(completePath, { recursive: true, force: true });
  } catch (err) {
    console.error(err);
  }
}
```
Dans folderController.js:
Pour supprimer un dossier, nous utilisons la fonction DeleteFolder. Elle prend en argument, le chemin du dossier à supprimer.
```
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
```

#### Route /moveFolder
##### Présentation
Cette route de type 'POST' permet de déplacer un dossier.
##### Code
Dans App.js:
```
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
```
Dans folderController.js:
Pour déplacer un dossier, nous utilison la fonction move. Elle prend en argument, le chemin actuel et le nouveau chemin.
```
async function moveOneFolder(oldpath, newPath) {
  try {
    fs_extra.move(oldpath, newPath);
    return "Folder moved successfully";
  } catch (err) {
    console.error(err);
    return err;
  }
}
```

### Bash

#### Route /bash
##### Présentation
Cette route de type 'POST' permet d'executer une commande bash.
##### Code
Pour pouvoir executer une commande bash, nous utilisons la fonction 'exec'. Elle prend en argument la commande. Elle peut retourner une erreur (error), le résultat de la commande (stdout) et si la commande retourne autre chose que 'succès' mais que la commande fonctionne (stderr)
```
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
```
