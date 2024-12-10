const cloudinary = require('../config/cloudinary');

const uploadImage = async (imagePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    });
    return {
      publicId: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

const uploadImages = async (imagePaths, folder) => {
  try {
    const uploadPromises = imagePaths.map(imagePath => uploadImage(imagePath, folder));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw new Error('Multiple image upload failed');
  }
};

module.exports = { uploadImage, uploadImages };