import { NextRequest, NextResponse } from "next/server";
import { getPodcastById } from "@/lib/actions/podcastActions";

export async function GET(
	request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id
	try {
		const podcast = await getPodcastById(id)

		if (!podcast) {
			return NextResponse.json(
				{ error: "Podcast not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json({ podcast })
	} catch (e) {
		console.error(`Error fetching podcast with ID ${id}}:`, e)
		return NextResponse.json(
			{ error: "Failed to fetch podcast" },
			{ status: 500 }
		)
	}
}