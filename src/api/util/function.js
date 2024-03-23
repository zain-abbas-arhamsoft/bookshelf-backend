
const { cloudinary } = require("../util/cloudinary");
const tinify = require("tinify");
const fs = require("fs"); // Import the fs module
const path = require("path");

// Set your Tinify API key here
tinify.key = `${process.env.TINY_PNG_API_KEY}`;
const outputPath = path.join(__dirname, "../next/compressed_images");

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}


async function compressImage(files, image) {
    const inputImageBuffer = fs.readFileSync(image);
    const source = await tinify.fromBuffer(inputImageBuffer);
    // Compress the image using TinyPNG and store the result in 'compressedImageBuffer'
    const compressedImageBuffer = await source.toBuffer();
    let uniqueFileName = "";
    if (files.image) {
        uniqueFileName = files.image[0]?.originalname;
    }
    // uniqueFileName = `${files.image[0]?.originalname}`;
    // Specify the output file path with the unique file name
    const outputFilePath = `${outputPath}/${uniqueFileName}`;
    // Write the compressed image buffer to the specified output file path
    fs.writeFileSync(outputFilePath, compressedImageBuffer);
}
async function imageUpload(req, filePath, name, userId, res) {
    try {
        await compressImage(req.files, filePath);
        const uploadResponse = await uploadImagesToCloudinary(filePath);
        const parts = uploadResponse?.secure_url?.split("/");
        const extractedPath = "/" + parts.slice(6).join("/");

        const obj = { file: extractedPath };

        return sendSuccessResponse(
            res,
            obj,
            "Image has been created successfully."
        );
    } catch (error) {
        res.send({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};


async function uploadImagesToCloudinary(image) {
    try {
        var uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "sellDigital", // Specify the folder name
            upload_preset: "sell_digital_images",
        });
    } catch (error) {
        console.log(error)
    }
    return uploadResponse;
}

// Export both functions so they can be used in other modules
module.exports = {
    imageUpload,
    uploadImagesToCloudinary,
    compressImage
};
