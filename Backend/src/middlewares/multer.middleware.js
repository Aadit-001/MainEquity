//multer is a middle ware which is used to upload files on cloudinary 
import multer from "multer";

//take this code from the document of multer
//now this multer will upload the files to the local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')  //is location pe hum apna sara file rakhenege as a local storage
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })  
  
export const upload = multer({ 
  storage,
})