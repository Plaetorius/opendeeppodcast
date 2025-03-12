"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "ui/card"
import React from 'react'
import { Download, Share } from "lucide-react"
import Link from "next/link"
import { Button } from "ui/button"
import { toast } from "react-toastify";

interface PodcastCardProps {
	id: string
	title: string
	description: string
	audioFile: {
		name: string
		type: string
		url: string;
	}
	tags: string[]
}

export default function PodcastCard(params: PodcastCardProps) {
	const copyToClipboard = () => {
		const shareUrl = params.audioFile.url //TODO later create a page per podcast
		navigator.clipboard.writeText(shareUrl)
		toast.success("Link copied to clipboard!")
	}


	return (
		<Card>
			<CardHeader>
				<CardTitle>{params.title}</CardTitle>
				<CardDescription>{params.description}</CardDescription>
			</CardHeader>
			<CardContent className="flex items-center justify-center space-x-2">
				{/* <Play className="size-10 p-2.5 rounded-full bg-pink fill-white" color="white" /> */}
				<Link href={params.audioFile.url} target="_blank" download>
					<Button className="size-10" asChild>
						<div className="flex items-center justify-center">
							<Download />
						</div>
					</Button>
				</Link>
				<Button className="size-10" onClick={copyToClipboard} variant='default'>
					<Share />
				</Button>
			</CardContent>
		</Card>
	)
}


