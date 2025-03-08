"use client";

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { uploadPodcastSchema, UploadPodcastSchema } from '@/components/schemas/uploadPodcastSchema'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'ui/input';
import { Button } from 'ui/button';
import { Plus } from 'lucide-react';
import { Textarea } from 'ui/textarea';
import { MultiSelect, type ItemType, type CategoryType } from 'ui/MultiSelect';
import { uploadPodcast } from '@/lib/upload';

// TODO fetch me
const categories: CategoryType[] = [
  { id: "programming", name: "Programming" },
  { id: "web3", name: "Web3" },
  { id: "design", name: "Design" },
  { id: "business", name: "Business" },
  { id: "marketing", name: "Marketing" },
]

// TODO fetch me 
const items: ItemType[] = [
  { id: "react", name: "React", categories: ["programming"] },
  { id: "nextjs", name: "Next.js", categories: ["programming"] },
  { id: "typescript", name: "TypeScript", categories: ["programming"] },
  { id: "solidity", name: "Solidity", categories: ["programming", "web3"] },
  { id: "ethereum", name: "Ethereum", categories: ["web3"] },
  { id: "nft", name: "NFT", categories: ["web3", "design"] },
  { id: "figma", name: "Figma", categories: ["design"] },
  { id: "tailwind", name: "Tailwind CSS", categories: ["design", "programming"] },
  { id: "photoshop", name: "Photoshop", categories: ["design"] },
  { id: "marketing", name: "Digital Marketing", categories: ["marketing", "business"] },
  { id: "seo", name: "SEO", categories: ["marketing"] },
  { id: "analytics", name: "Analytics", categories: ["marketing", "business"] },
  { id: "finance", name: "Finance", categories: ["business"] },
  { id: "strategy", name: "Strategy", categories: ["business"] },
  { id: "blockchain", name: "Blockchain", categories: ["web3", "programming"] },
  { id: "defi", name: "DeFi", categories: ["web3", "business"] },
]



export default function UploadPodcast() {
	const [selectedTags, setSeletectTags] = useState<string[]>([]);
	const [file, setFile] = useState<File | null>(null);
	const [uploadForm, setUploadForm] = useState<UploadPodcastSchema | null>(null);

	const {
		register,
		handleSubmit, 
		watch,
		setValue,
		formState: {errors, isSubmitting}
	} = useForm<UploadPodcastSchema>({
		resolver: zodResolver(uploadPodcastSchema),
		defaultValues: {
			title: '',
			description: '',
			tags: [],
		}
	});

	useEffect(() => {
		setValue('tags', selectedTags);
	}, [selectedTags, setValue])

	const formValues = watch()

	const onSubmit = async (data: UploadPodcastSchema) => {
		try {
			console.log("Submit clicked");
			
			// Include tags in form data
			const formData = {
				...data,
				tags: selectedTags,
				audio: file
			};
			
			console.log("Form data to submit:", formData);
			setUploadForm(formData);
			uploadPodcast(formData);
		} catch (error) {
			console.error("Error in form submission:", error);
		}
	}

	useEffect(() => {
		console.log(uploadForm);
	}, [uploadForm])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFile = e.target.files[0]
			setFile(selectedFile)
			setValue('audio', selectedFile)
		}
	};

	const getSafeFormValues = () => {
		const values = {...formValues};

		if (values.audio && typeof values.audio === 'object')
			delete values.audio
		return values
	}

	console.log("Validation errors:", errors);

	return (
		<div className='w-full'>
			<form 
				onSubmit={handleSubmit(onSubmit)}
				className='grid gap-2 w-full'
			>
				<Input
					id='title'
					defaultValue=''
					placeholder='Title'
					{...register('title')}
					className='w-80'
				/>
				<Textarea
					id='description'
					placeholder='Description of your podcast'
					{...register('description')}
					className='w-80'
				>
				</Textarea>
				<MultiSelect
					id='tags'
					items={items}
					categories={categories}
					selected={selectedTags}
					onChange={(newTags) => {
						setSeletectTags(newTags);
						setValue('tags', newTags);
					}}
					placeholder="Select tags..."
				/>
				<Input
					id='audio'
					type='file'
					onChange={handleFileChange}
				/>
				<Button
					color='default'
					type='submit'	
					className='w-80'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Submitting...' : (
						<>
							<Plus />
							Add podcast
						</>
					)}
				</Button>
			</form>
			<div>
				<h2 className='text-xl font-bold mt-8 mb-2'>
						Debug section
				</h2>
				
				{/* Form data debug view */}
				<div className="mb-4 text-wrap">
					<h3 className='font-semibold'>Form Values (Live):</h3>
					<pre className="bg-gray-100 p-2 rounded text-sm text-wrap overflow-auto max-w-full">
							{JSON.stringify(getSafeFormValues(), null, 2)}
					</pre>
					
					<h3 className='font-semibold mt-4'>Tags Selected:</h3>
					<pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-w-full">
							{JSON.stringify(selectedTags, null, 2)}
					</pre>
					
					{uploadForm && (
						<>
							<h3 className='font-semibold mt-4'>Submitted Form Data:</h3>
							<pre className="bg-gray-100 p-2 rounded text-sm text-wrap overflow-auto max-w-full">
									{JSON.stringify(uploadForm, null, 2)}
							</pre>
						</>
					)}
				</div>
    
			{/* File debug view - keep your existing code */}
			{file && (
				<div>
					<h3 className='font-semibold'>File details:</h3>
					<ul className="bg-gray-100 p-2 rounded">
							<li>Name: {file.name}</li>
							<li>Type: {file.type}</li>
							<li>Size: {file.size} bytes</li>
					</ul>
				</div>
			)}

			{Object.keys(errors).length > 0 && (
				<div className="mt-4">
					<h3 className='font-semibold text-red-500'>Form Errors:</h3>
					<pre className="bg-red-50 p-2 rounded text-sm overflow-auto max-w-full">
						{JSON.stringify(errors, null, 2)}
					</pre>
				</div>
			)}
			</div>
		</div>
	)
}
