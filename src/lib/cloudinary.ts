import { v2 as cloudinary, UploadApiOptions } from 'cloudinary'
import { CloudinaryUploadResult } from 'types';

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadPodcastToCloudinary(file: Buffer, originalFilename: string) {
	return new Promise((resolve, reject) => {
		const timestamp = new Date().getTime()
		const cleaName = originalFilename
			.split('.')[0] // TODO better, protect type, protect against directory traversal attacks
			.toLowerCase()
			.replace(/[^a-z0-9]/g, '-')

		const publicId = `${cleaName}-${timestamp}`
		const uploadOptions: UploadApiOptions = {
			resource_type: "auto",
			folder: "podcasts",
			public_id: publicId
		};
		
		cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
			if (error) return reject(error);
			resolve(result as CloudinaryUploadResult);
		}).end(file)
	})
}