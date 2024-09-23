const importFiles = require("glob");
const fs = require('fs');
const folderDestination = '../Html';


importFiles("src/app/**/*.html", [], function (er, files) {


  for (const pathSource of files) {

    const pathDestination = `${folderDestination}/${pathSource}`

    console.log(pathSource)
    console.log(pathDestination)

    fs.copyFile(pathSource, pathDestination, (err) => {
      if (err) throw err;
      console.log(`${pathSource} was copied to ${pathDestination}`);
    });

    // break
  }

})


importFiles("src/app/**/*.scss", [], function (er, files) {


  for (const pathSource of files) {

    const pathDestination = `${folderDestination}/${pathSource}`

    console.log(pathSource)
    console.log(pathDestination)

    fs.copyFile(pathSource, pathDestination, (err) => {
      if (err) throw err;
      console.log(`${pathSource} was copied to ${pathDestination}`);
    });

    // break
  }

})


importFiles("src/assets/scss/*.scss", [], function (er, files) {


  for (const pathSource of files) {

    const pathDestination = `${folderDestination}/${pathSource}`

    console.log(pathSource)
    console.log(pathDestination)

    fs.copyFile(pathSource, pathDestination, (err) => {
      if (err) throw err;
      console.log(`${pathSource} was copied to ${pathDestination}`);
    });

    // break
  }

})

