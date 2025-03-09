import Link from 'next/link'
import React from 'react'
import { Button } from 'ui/button'

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
	return (
		<header className='w-[90%] m-4 bg-white rounded-xl p-4 flex justify-center items-center space-x-2'>
			{links.map((link) => {
				return (
					<Link key={link.title} href={link.url}>
						<Button>
							{link.title}
						</Button>
					</Link>
				)
			})}
		</header>
	)
}
