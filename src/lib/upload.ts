import { UploadPodcastSchema } from '@/components/schemas/uploadPodcastSchema'
import axios from 'axios'

export async function uploadPodcast(data: UploadPodcastSchema) {
	console.log("Data on lib", data);
	const formData = new FormData()
	formData.append('title', data.title)
	formData.append('description', data.description)
	
	if (data.tags && Array.isArray(data.tags)) {
		data.tags.forEach(tag => {
			formData.append('tags', tag)
		})
	}

	if (data.audio && data.audio instanceof File) {
		formData.append('audio', data.audio)
	}

	try {
		const response = await axios.post('/api/podcasts', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		})

		console.log("Data Resp", response.data)
		return response.data;
	} catch (e) {
		console.error(e)
		throw e
	}
}