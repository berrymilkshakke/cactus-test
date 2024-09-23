const importFiles = require("glob");
const fs = require('fs');



importFiles("../Html/src/assets/img/**/*.*", [], function (er, files) {


  for (const pathSource of files) {

    const pathDestination = pathSource.substring(8, pathSource.length);

    console.log(pathSource)
    console.log(pathDestination)

    fs.copyFile(pathSource, pathDestination, (err) => {
      if (err) throw err;
      console.log(`${pathSource} was copied to ${pathDestination}`);
    });

    // break
  }

})
