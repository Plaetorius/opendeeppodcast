import axios from 'axios'

export async function fetchPodcasts() {
	try {
		const response = await axios.get("/api/podcasts")
		return response.data.podcasts;
	} catch (e) {
		console.error("Error fetching podcsts:", e)
		throw e
	}
}

export async function fetchPodcastById(id: string) {
	try {
		const response = await axios.get(`/api/podcasts/${id}`)
		return response.data.podcast;
	} catch (e) {
		console.error(`Error fetching podcast with ID: ${id}`, e)
		throw e
	}
}