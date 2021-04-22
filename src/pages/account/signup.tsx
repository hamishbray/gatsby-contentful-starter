import React, { useRef, useState, FormEvent } from 'react'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import { useIdentityContext } from 'react-netlify-identity-widget'

import LoadingButton from '../../components/loadingButton'

const Login: React.FC<any> = () => {
	const { signupUser } = useIdentityContext()
	const formRef = useRef<HTMLFormElement>(null!)
	const [error, setError] = useState(null)
	const [loggingIn, setLoggingIn] = useState(false)

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		signup()
	}

	const signup = async () => {
		const name = formRef.current.username.value
		const email = formRef.current.email.value
		const password = formRef.current.password.value
		setError(null)
		setLoggingIn(true)

		try {
			const user = await signupUser(email, password, {
				full_name: name,
			})
			console.log('Success! Signed up user: ', user)
			navigate('/account/profile')
		} catch (error) {
			setError(error.message)
			console.error('Error signing up user', error)
		} finally {
			setLoggingIn(false)
		}
	}

	return (
		<section className="flex items-center justify-center">
			<div className="max-w-full w-96">
				<h1>Sign Up</h1>
				<form ref={formRef} onSubmit={onSubmit}>
					<div>
						<label className="block">
							<span>Name</span>
							<input
								type="text"
								name="username"
								className="block w-full mt-1 form-input"
								placeholder="Enter your name"
							/>
						</label>
						<label className="block mt-4">
							<span>Email</span>
							<input
								type="email"
								name="email"
								className="block w-full mt-1 form-input"
								placeholder="Enter your email"
							/>
						</label>
						<label className="block mt-4">
							<span>Password</span>
							<input
								type="password"
								name="password"
								className="block w-full mt-1 form-input"
								placeholder="Enter your password"
							></input>
						</label>
					</div>
					<LoadingButton
						defaultLabel="Submit"
						loadingLabel="Signing Up"
						isLoading={loggingIn}
					/>
					{error && (
						<div className="mt-2 text-red-700">
							<span>{error}</span>
						</div>
					)}
				</form>
				<div className="mt-4">
					<p>
						Already a member? <Link to={'/account/login'}>Sign In</Link>
					</p>
				</div>
			</div>
		</section>
	)
}

export default Login
