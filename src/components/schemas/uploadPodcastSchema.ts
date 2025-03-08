import { z } from 'zod'

// TODO add compression algorithm to turn wav to mp3 files

// TODO get me from db?
export const MAX_IMAGE_FILE_SIZE = 5000000 // 5MB 
export const MAX_AUDIO_FILE_SIZE = 50000000 // 50MB 
export const MIN_FILE_SIZE = 1000

const ACCEPTED_AUDIO_TYPES = ["audio/mp3", "audio/wav"]
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/webp", "image/png", "image/gif"]

enum FileType {
	IMAGE = 0,
	AUDIO = 1,
}

function checkFileType(filetype: FileType, file: File): boolean {
	if (!file) return false;

	if (filetype === FileType.IMAGE)
		return ACCEPTED_IMAGE_TYPES.includes(file.type)
	else if (filetype === FileType.AUDIO)
		return ACCEPTED_AUDIO_TYPES.includes(file.type)
	return false;
}

export const uploadPodcastSchema = z.object({
	title: z.string()
		.min(1, { message: "Please provide a title" })
		.max(100, { message: "Title can't be more than 100 characters" }),
	description: z.string()
		.min(1, { message: "Please provide a desciption" })
		.max(500, { message: "Description must be less than 500 characters" }),
	tags: z.array(z.string()).min(1, { message: "Please provide at least 1 tag" }),
	image: z.any()
		.optional()
		.refine((file: File) => !file || file?.size < MIN_FILE_SIZE, "Minimun file size: 1KB")
		.refine((file: File) => !file || file?.size > MAX_IMAGE_FILE_SIZE, "Maximum file size: 5MB")
		.refine((file: File) => !file ||  checkFileType(FileType.IMAGE, file), "Invalid file type (JPEG, PNG, WEBP or GIF)"),
	audio: z.any()
		// .refine((file: File) => !file || file?.size < MIN_FILE_SIZE, "Minimun file size: 1KB")
		// .refine((file: File) => !file || file?.size > MAX_AUDIO_FILE_SIZE, "Maximum file size: 50MB")
		// .refine((file: File) => !file || checkFileType(FileType.AUDIO, file), "Invalid file type (WAV or MP3"),
	// LATER permit upload of sources
})

export type UploadPodcastSchema = z.infer<typeof uploadPodcastSchema>