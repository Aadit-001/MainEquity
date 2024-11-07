//file ya image ya vedio upload ka sara kaam yaha se hoga
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


// Configuration : CONNECT KARNA cloudinary ko apne server se
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//upload a file on cloudinary , and then unlink(delete) from the local storage

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        //abb upload ka code
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto" //konsa type ka file hai image ya vedio
        })
        console.log("File is uploaded",response.url);  //yr url hai wo file ka jo upload ho gaya hai hame bass ye use karna hai jaha bhi hame ye file chahiye
        fs.unlinkSync(localFilePath) // jaise hi file cloudinary pe uplaod ho jayega waise hi yaha ke local storage se file delete ho jayega
        return response   // ye hai wo response jo hame sara kuch dega cloudinary se like url
    }catch(error){
        fs.unlinkSync(localFilePath) //removes the file from the local storage as the upload has been failed
        return null
    }
}

export default uploadOnCloudinary