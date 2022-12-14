function shortcutToFile() {
  
  var folders = DriveApp.getFoldersByName('foldername');
  var dest = DriveApp.getFolderById("folderid");
  var folder = folders.next();
  var files = folder.getFiles();
  
  while(files.hasNext()){
    var file = files.next()
    var fileName = file.getName();
    Logger.log(fileName);

    if (file.getMimeType() === 'application/vnd.google-apps.shortcut') {
      var sharedFiles = DriveApp.searchFiles('sharedWithMe');
      while (sharedFiles.hasNext()) {
        var sFile = sharedFiles.next();
        if (fileName === sFile.getName()) {
          Logger.log(sFile.getName() + sFile.getOwner().getEmail());
          sFile.makeCopy(fileName, dest);
          file.setTrashed(true);
          Logger.log(fileName + ' is trashed');
        }
      }
    }

    /*if (fileName.indexOf('Copy of ') > -1) {
        fileName= fileName.split('Copy of ')[1];
        file.setName(fileName);
        Logger.log(fileName);
    };*/
  }
}
