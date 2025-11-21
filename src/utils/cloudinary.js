import fs from "fs"; // file syaytem (read, write remove ... )
import path from "path";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary=async(localFilePath)=>{
  try{
      if(!localFilePath){
        return null
      }
      const response =await cloudinary.uploader.upload(localFilePath,{
          resource_type:"auto"
      }
      )
      // file uploaded successfully
      console.log("file is uploaded on cludinary",
        response.url
       );
       return response;
      
  }
  catch(error){
    // remove the locally saved temporary file if it exists
    try{
      if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath)
      }
    } catch (unlinkErr) {
      console.warn('Failed to remove temp file after upload error', unlinkErr)
    }
    console.error('Cloudinary upload error:', error)
    return null;

  }
}
export {uploadOnCloudinary}
