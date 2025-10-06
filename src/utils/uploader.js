import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, filr, callback) => {
        callback(null, "./public/img");
    },
    filename: (req, file, callback ) => {
        const newFilename = `${Date.now()}-${file.originalname}`;
        callback(null, newFilename);
    }
});

//creamos el middleware

const uploader = multer({storage})

export default uploader;