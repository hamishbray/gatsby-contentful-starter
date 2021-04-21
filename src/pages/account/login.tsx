import React, { useRef, FormEvent } from 'react'
import { navigate } from '@reach/router'
import { useIdentityContext } from 'react-netlify-identity'

const Login: React.FC<any> = () => {
	const { loginUser, logoutUser, signupUser } = useIdentityContext()
	const formRef = useRef<HTMLFormElement>(null!)

	const onSubmit = (event: FormEvent) => {
		event.preventDefault()
		login()
	}

	const login = async () => {
		const email = formRef.current.email.value
		const password = formRef.current.password.value

		try {
			const user = await loginUser(email, password)
			console.log('Success! Logged in user: ', user)
			navigate('/account/profile')
		} catch (error) {
			console.error('Error logging in user', error)
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
			<button
				type="submit"
				className="px-4 py-2 mt-4 border-2 border-black rounded  hover:border-gray-500 hover:text-black"
			>
				Submit
			</button>
		</form>
	)
}

export default Login
