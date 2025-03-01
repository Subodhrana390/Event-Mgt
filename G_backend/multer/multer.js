import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../src/utils/AppError.js";

const createMulterUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname == "images")
        cb(null, `uploads/${folderName}/${file.fieldname}`);
      else if (file.fieldname == "video")
        cb(null, `uploads/${folderName}/${file.fieldname}`);
      else if (file.fieldname == "icon") cb(null, `uploads/${folderName}`);
      else if (file.fieldname == "documents")
        cb(null, `uploads/${folderName}/${file.fieldname}`);
      else cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + " - " + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    const acceptedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml", // Image types
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/avi",
      "video/mkv", // Video types
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Document types
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel documents
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PowerPoint
    ];

    if (acceptedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Not supporting this mimetype", 401), false); // Reject the file with an error
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload;
};

//For Single upload
export const uploadSingleFile = (fieldName, folderName) => {
  return createMulterUploader(folderName).single(fieldName);
};

//Fir Multiple fields upload
export const uploadMultipleFiles = (arrayOfFields, folderName) => {
  return createMulterUploader(folderName).fields(arrayOfFields);
};
