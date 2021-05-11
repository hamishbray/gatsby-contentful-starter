import React, { useRef, useState, FormEvent } from 'react'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import { useIdentityContext } from 'react-netlify-identity-widget'

import LoadingButton from './loadingButton'

const ForgottenPassword: React.FC<any> = () => {
	const { requestPasswordRecovery } = useIdentityContext()
	const formRef = useRef<HTMLFormElement>(null!)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		recoverPassword()
	}

	const recoverPassword = async () => {
		const email = formRef.current.email.value
		setError(null)
		setLoading(true)

		try {
			await requestPasswordRecovery(email)
			console.log('Success! Recovered password')
			navigate('/account/login')
		} catch (error) {
			setError(error.json?.error_description)
			console.error('Error recovering password', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className="flex items-center justify-center">
			<div className="max-w-full w-96">
				<h1>Forgotten Password?</h1>
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
					</div>
					<LoadingButton
						defaultLabel="Submit"
						loadingLabel="Recovering"
						isLoading={loading}
					/>
					{error && (
						<div className="mt-2 text-red-700">
							<span>{error}</span>
						</div>
					)}
				</form>
			</div>
		</section>
	)
}

export default ForgottenPassword
