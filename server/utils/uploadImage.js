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
  const uploadPromises = imagePaths.map(path => {
    return cloudinary.uploader.upload(path, {
      folder: folder,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    });
  });

  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults.map(result => ({
    url: result.secure_url,
    publicId: result.public_id,
  }));
};

module.exports = { uploadImage, uploadImages };