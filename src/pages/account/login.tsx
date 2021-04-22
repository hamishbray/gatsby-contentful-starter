import React, { useRef, useState, FormEvent } from 'react'
import { navigate } from '@reach/router'
import { useIdentityContext } from 'react-netlify-identity-widget'

import LoadingButton from '../../components/loadingButton'

const Login: React.FC<any> = () => {
	const { loginUser, logoutUser, signupUser } = useIdentityContext()
	const formRef = useRef<HTMLFormElement>(null!)
	const [error, setError] = useState(null)
	const [loggingIn, setLoggingIn] = useState(false)

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
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
			<LoadingButton
				defaultLabel="Submit"
				loadingLabel="Logging In"
				isLoading={loggingIn}
			/>
			{error && (
				<div className="mt-2 text-red-700">
					<span>{error}</span>
				</div>
			)}
		</form>
	)
}

export default Login
