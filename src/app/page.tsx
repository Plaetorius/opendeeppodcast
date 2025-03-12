"use client";

import PodcastCard from '@/components/PodcastCard'
import { fetchPodcasts } from '@/lib/fetches/podcastsFetches';
import React, { useEffect, useState } from 'react'

interface Podcast {
  id: string;
  title: string;
  description?: string;
  storedName: string;
  fileUrl: string;
  tags: string[]
}

// TODO add id to each podcast
// const podcasts = [
//   {
//     id: '1',
//     title: 'Bitcoin post quantum',
//     description: "Delve into the world of Bitcoin of quantum computing adoption",
//     audioFile: {
//       name: "AnchorNotebook-123abc.wav",
//       type: "audio/wav",
//     },
//     tags: [ 'nextjs', 'nft', 'solidity' ],
//   },
//   {
//     id: '2',
//     title: 'Hydrogen in Nuclear fusion',
//     description: "Why is hydrogen so important in nuclear fusion?",
//     audioFile: {
//       name: "AnchorNotebook-123abc.wav",
//       type: "audio/wav",
//     },
//     tags: [ 'physics', 'energy', 'nuclear' ],
//   },
//   {
//     id: '3',
//     title: 'Hydrogen in Nuclear fusion',
//     description: "Why is hydrogen so important in nuclear fusion?",
//     audioFile: {
//       name: "AnchorNotebook-123abc.wav",
//       type: "audio/wav",
//     },
//     tags: [ 'physics', 'energy', 'nuclear' ],
//   },
//   {
//     id: '4',
//     title: 'Hydrogen in Nuclear fusion',
//     description: "Why is hydrogen so important in nuclear fusion?",
//     audioFile: {
//       name: "AnchorNotebook-123abc.wav",
//       type: "audio/wav",
//     },
//     tags: [ 'physics', 'energy', 'nuclear' ],
//   },
//   {
//     id: '5',
//     title: 'Hydrogen in Nuclear fusion',
//     description: "Why is hydrogen so important in nuclear fusion?",
//     audioFile: {
//       name: "AnchorNotebook-123abc.wav",
//       type: "audio/wav",
//     },
//     tags: [ 'physics', 'energy', 'nuclear' ],
//   },
// ]

export default function NewProject() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPodcasts() {
      try {
        const data = await fetchPodcasts()
        setPodcasts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    loadPodcasts()
  }, []);

  return (
    <main className="flex flex-col items-center justify-center px-10 py-5 w-[98%] bg-background rounded-xl">
      <h1 className='text-3xl font-bold my-4'>
        OpenDeepPodcast
      </h1>

      {loading ? (
        <p>Loading podcasts...</p>
      ) : podcasts.length === 0 ? (
        <p>No podcasts found</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {podcasts.map((podcast) => {
            console.log(podcast)
            return (
              <PodcastCard
                key={podcast.id}
                id={podcast.id}
                title={podcast.title}
                description={podcast.description || ''}
                audioFile={{
                  name: podcast.storedName,
                  type: "audio/wav",
                  url: podcast.fileUrl
                }}
                tags={podcast.tags}
              />
            )
          })}
        </div>
      )}
    </main>
  )
}