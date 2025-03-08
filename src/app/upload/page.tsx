import UploadPodcast from 'forms/uploadPodcast'
import React from 'react'

export default function NewProject() {
	return (
		<main className="flex flex-col items-center justify-center p-10 w-[98%] bg-background rounded-xl">
			<h1 className='text-xl font-bold'>
				New DeepPodcast
			</h1>
			<div className='mt-4'>
				<UploadPodcast />
			</div>
		</main>
	)
}