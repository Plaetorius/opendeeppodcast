import React from 'react'
import { ToastContainer, Bounce } from "react-toastify"

export default function Providers({ 
	children 
} : {
	children: React.ReactNode,
}) {
	return (
		<>
			{children}
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</>
	)
}
