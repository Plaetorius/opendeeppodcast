import { prisma } from "lib/prisma";

export async function getAllPodcasts() {
	try {
		const podcasts = await prisma.podcast.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})
		return podcasts;
	} catch (e) {
		console.error("Failed to fetch podcasts:", e);
		throw e
	}
}

export async function getPodcastById(id: string) {
	try {
		const podcast = await prisma.podcast.findUnique({
			where: { id }
		});
		return podcast;
	} catch (e) {
		console.error("Failed to fetch podcast by id:", e)
		throw e
	}
}

