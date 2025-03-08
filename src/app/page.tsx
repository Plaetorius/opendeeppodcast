import UploadPodcast from 'forms/uploadPodcast'
import React from 'react'

export default function NewProject() {
  return (
    <div className="min-h-screen relative m-0">
      {/* True angular/conic gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FB575B] via-[#FB575B] to-[#8E52FC]" />

      
      {/* Your content */}
      <div className="relative p-4 w-screen flex flex-col items-center justify-center">
        <main className="flex flex-col items-center justify-center p-10 w-[98%] bg-background rounded-xl">
          <h1 className='text-xl font-bold'>
            New DeepPodcast
          </h1>
          <div className='mt-4'>
            <UploadPodcast />
          </div>
        </main>
      </div>
    </div>
  )
}