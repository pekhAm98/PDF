import{Router}from"express";
import{uploadPdf}from"../controllers/pdfUploadController";
import upload from"../middleware/multer";
const router=Router();

router.post("/", upload.single('file'), uploadPdf);
export default router;
