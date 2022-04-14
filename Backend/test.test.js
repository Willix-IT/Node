const { TestWatcher } = require("jest")
const fileController = require("./controllers/fileController")
const folderController = require("./controllers/folderController")

//test de getOneFile
//test de getOneFolder

test('getOneFile', () => {
    let fileToRead = "./dossierTestsJest/fichier1.txt"
    fileController
        .GetOneFile(fileToRead)
        .then((result) => {
            expect(result).toBe('Bonjour')
        })
});

test('getFolderDetail', () => {
    let folderToRead = "./dossierTestsJest/"
    folderController
        .GetOneFolder(folderToRead)
        .then((result) => {
            expect(result.name).toBe("fichier1.txt")
        })
});

