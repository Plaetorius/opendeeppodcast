import UploadPodcast from 'forms/uploadPodcast'
import React from 'react'

export default function NewProject() {
	return (
		<main className="flex flex-col items-center justify-center mx-auto max-w-[90%] bg-white rounded-2xl py-3 ">
			<h1 className='text-3xl font-bold mt-3'>
				New DeepPodcast
			</h1>
			<div className='mt-4'>
				<UploadPodcast />
			</div>
		</main>
	)
}