import React, { useRef, useState, FormEvent } from 'react'
import { navigate } from '@reach/router'
import { useIdentityContext } from 'react-netlify-identity'

const Login: React.FC<any> = () => {
	const { loginUser, logoutUser, signupUser } = useIdentityContext()
	const formRef = useRef<HTMLFormElement>(null!)
	const [error, setError] = useState(null)
	const [loggingIn, setLoggingIn] = useState(false)

	const onSubmit = (event: FormEvent) => {
		event.preventDefault()
		login()
	}

	const login = async () => {
		const email = formRef.current.email.value
		const password = formRef.current.password.value
		setError(null)
		setLoggingIn(true)

		try {
			const user = await loginUser(email, password)
			console.log('Success! Logged in user: ', user)
			navigate('/account/profile')
		} catch (error) {
			setError(error.json?.error_description)
			console.error('Error logging in user', error)
		} finally {
			setLoggingIn(false)
		}
	}

	return (
		<form ref={formRef} onSubmit={onSubmit}>
			<div>
				<label className="block">
					<span>Email</span>
					<input
						type="email"
						name="email"
						className="block max-w-full mt-1 w-96 form-input"
						placeholder="Enter your email"
					/>
				</label>
				<label className="block mt-4">
					<span>Password</span>
					<input
						type="password"
						name="password"
						className="block max-w-full mt-1 w-96 form-input"
						placeholder="Enter your password"
					></input>
				</label>
			</div>
			<button
				type="submit"
				className="inline-flex items-center px-4 py-2 mt-4 border-2 border-black rounded hover:border-gray-500 hover:text-black"
			>
				{loggingIn ? (
					<>
						<svg
							className="w-5 h-5 mr-3 -ml-1 text-black animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Logging In
					</>
				) : (
					`Submit`
				)}
			</button>
			{error && (
				<div className="mt-2 text-red-700">
					<span>{error}</span>
				</div>
			)}
		</form>
	)
}

export default Login
