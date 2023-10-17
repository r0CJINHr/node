const path = require("path");
const fs = require("fs");

// console.log("File name: ", path.basename(__filename));
// console.log("Directory name: ", path.dirname(__filename));
// console.log("Extansion name: ", path.extname(__filename));

// fs.mkdir(path.join(__dirname, "tmp"), function (err) {
//   if (err) {
//     console.error(err);
//   }
//   console.log("directory has been create ");
// });

const filePath = path.join(__dirname, "tmp", "2.txt");

console.log(filePath);

// fs.appendFile(filePath, "\nsomething in the way", function (err) {
//   if (err) {
//     console.error(err);
//   }
//   console.log("xd ");
// });

fs.readFile(filePath, "UTF-8", (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
});
