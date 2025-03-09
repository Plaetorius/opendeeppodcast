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
import { toast } from 'react-toastify';

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

// TODO podcast name must be created by deleting the whitespace in the name, and appending it its ID

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
			const resp = await uploadPodcast(formData);
			if (resp && resp.data) {
				toast.success("Podcast successfully uploaded!")
			}
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

	const getSafeUploadForm = () => {
		if (!uploadForm) return null;
		
		// Create a deep copy without circular references
		const safeForm = {...uploadForm};
		
		// Remove file object which causes circular references
		if (safeForm.audio && typeof safeForm.audio === 'object') {
			safeForm.audio = {
				name: safeForm.audio.name,
				type: safeForm.audio.type,
				size: safeForm.audio.size,
				lastModified: safeForm.audio.lastModified
			};
		}
		
		return safeForm;
	};

	console.log("Validation errors:", errors);

	return (
		<div className='w-full p-4'>
			<form 
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col items-center gap-3'
			>
				<Input
					id='title'
					defaultValue=''
					placeholder='Title'
					{...register('title')}
					className='w-full'
				/>
				
				<Textarea
					id='description'
					placeholder='Description of your podcast'
					{...register('description')}
					className='w-full'
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
					className='w-80 flex items-center justify-center h-fit file:h-8 cursor-pointer 
										file:mr-4 file:py-2 file:px-4
										file:rounded-md file:border-0
										file:text-sm file:font-semibold
										file:bg-gray-200 file:text-gray-700
										hover:file:bg-gray-300 file:transition-colors
										file:cursor-pointer file:flex file:items-center'
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
					{uploadForm && (
						<>
							<h3 className='font-semibold mt-4'>Submitted Form Data:</h3>
							<pre className="bg-gray-100 p-2 rounded text-sm text-wrap overflow-auto max-w-full">
								{JSON.stringify(getSafeUploadForm(), null, 2)}
							</pre>
						</>
					)}
				</div>
			)}
			</div>
		</div>
	)
}
