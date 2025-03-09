import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const links = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "Upload",
		url: "/upload"
	}
]

export default function Header() {
	const linkStyle = "hover:text-gray-500 transition font-bold uppercase"

	return (
		<header className='mx-auto w-full mb-4 bg-white p-4 flex justify-center items-center space-x-2'>
			<Link key={links[0].title} href={links[0].url} className={linkStyle} >
				{links[0].title}
			</Link>
			<Image src={"/icons/OpenDeepPodcast.png"} height={50} width={50} alt="OpenDeepPodcast Icon" />
			<Link key={links[1].title} href={links[1].url} className={linkStyle} >
				{links[1].title}
			</Link>
			{/* {links.map((link) => {
				return (
					<Link key={link.title} href={link.url}>
						<Button>
							{link.title}
						</Button>
					</Link>
				)
			})} */}
		</header>
	)
}
