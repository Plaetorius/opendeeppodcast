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

interface PodcastCardProps {
	id: string
	title: string
	description: string
	audioFile: {
		name: string
		type: string
	}
	tags: string[]
}

export default function PodcastCard(params: PodcastCardProps) {
	const copyToClipboard = () => {
		const shareUrl = `${window.location.origin}/podcasts/${params.audioFile.name}` //TODO later create a page per podcast
		navigator.clipboard.writeText(shareUrl)
	}
	
	return (
		<Card>
			<CardHeader>
				<CardTitle>{params.title}</CardTitle>
				<CardDescription>{params.description}</CardDescription>
			</CardHeader>
			<CardContent className="flex items-center justify-center space-x-2">
				{/* <Play className="size-10 p-2.5 rounded-full bg-pink fill-white" color="white" /> */}
				<Button className="size-10">
					<Link href={`/podcasts/${params.audioFile.name}`} target="_blank" download>
						<Download />
					</Link>
				</Button>
				<Button className="size-10" onClick={copyToClipboard} variant='default'>
					<Share />
				</Button>
			</CardContent>
		</Card>
	)
}


