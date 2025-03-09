import { NextRequest, NextResponse } from "next/server";
import { uploadPodcastToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getAllPodcasts } from "@/lib/actions/podcastActions";
import { CloudinaryUploadResult } from "@/lib/types";

export async function GET() {
	try {
		const podcasts = await getAllPodcasts();

		return NextResponse.json({
			podcasts
		});
	} catch (e) {
		console.error("Error fetching podcasts:", e)
		return NextResponse.json({
			error: "Failed to fetch podcasts"
		}, { status: 500 });
	} 
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = formData.getAll('tags') as string[];
    const audioFile = formData.get('audio') as File;

		const buffer = Buffer.from(await audioFile.arrayBuffer())

		const cloudinaryResult = await uploadPodcastToCloudinary(
			buffer,
			audioFile.name // TODO change me
		) as CloudinaryUploadResult;

		const podcast = await prisma.podcast.create({
			data: {
				title,
				description,
				storedName: audioFile.name,
				fileUrl: cloudinaryResult.secure_url,
				tags: tags
			}
		});
		return NextResponse.json({
			message: "Podcast uploaded successfully",
			data: podcast
		}, { status: 201});
	} catch (e) {
		console.error("Uploaded error:", e);
		return NextResponse.json({
			error: "failed to upload podcast"
		}, { status: 500 })
	}
}