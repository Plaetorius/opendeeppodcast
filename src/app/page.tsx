import PodcastCard from '@/components/PodcastCard'
import React from 'react'

// TODO add id to each podcast
const podcasts = [
  {
    id: '1',
    title: 'Bitcoin post quantum',
    description: "Delve into the world of Bitcoin of quantum computing adoption",
    audioFile: {
      name: "AnchorNotebook-123abc.wav",
      type: "audio/wav",
    },
    tags: [ 'nextjs', 'nft', 'solidity' ],
  },
  {
    id: '2',
    title: 'Hydrogen in Nuclear fusion',
    description: "Why is hydrogen so important in nuclear fusion?",
    audioFile: {
      name: "AnchorNotebook-123abc.wav",
      type: "audio/wav",
    },
    tags: [ 'physics', 'energy', 'nuclear' ],
  },
  {
    id: '3',
    title: 'Hydrogen in Nuclear fusion',
    description: "Why is hydrogen so important in nuclear fusion?",
    audioFile: {
      name: "AnchorNotebook-123abc.wav",
      type: "audio/wav",
    },
    tags: [ 'physics', 'energy', 'nuclear' ],
  },
  {
    id: '4',
    title: 'Hydrogen in Nuclear fusion',
    description: "Why is hydrogen so important in nuclear fusion?",
    audioFile: {
      name: "AnchorNotebook-123abc.wav",
      type: "audio/wav",
    },
    tags: [ 'physics', 'energy', 'nuclear' ],
  },
  {
    id: '5',
    title: 'Hydrogen in Nuclear fusion',
    description: "Why is hydrogen so important in nuclear fusion?",
    audioFile: {
      name: "AnchorNotebook-123abc.wav",
      type: "audio/wav",
    },
    tags: [ 'physics', 'energy', 'nuclear' ],
  },
]

export default function NewProject() {
  return (
    <main className="flex flex-col items-center justify-center px-10 py-5 w-[98%] bg-background rounded-xl">
      <h1 className='text-3xl font-bold my-4'>
        OpenDeepPodcast
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {podcasts.map((podcast) => {
          return (
            <PodcastCard key={podcast.id} {...podcast} />
          )
        })}
      </div>
    </main>
  )
}