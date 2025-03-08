import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const formData = await req.formData()

	const audioFile = formData.get('audio') instanceof File ? formData.get('audio') as File : null

	const responseData = {
		title: formData.get('title'),
		description: formData.get('description'),
		tags: formData.getAll('tags'),
		audio: audioFile ? {
			name: audioFile.name,
			type: audioFile.type,
			size: audioFile.size,
			lastModified: audioFile.lastModified,
		} : null
	}
	
	console.log("Data on API", responseData);
	return NextResponse.json(
    { 
			message: "Successfully received some data",
			data: responseData,
		},
		{ status: 200 },
	)
}