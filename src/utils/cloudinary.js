import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadToCloudinary = async (localFilePath) => {
    try{ 
        if(!localFilePath) return null;
        // Configure cloudinary (inside function so env vars are loaded)
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        // file has been uploaded successfully
       
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.error("Cloudinary upload failed:", error.message || error);
        // remove the locally saved temporary file as upload operation got failed
        try {
            if (localFilePath && fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        } catch (e) {
            // ignore
        }
        return null;
    }
};

export { uploadToCloudinary };