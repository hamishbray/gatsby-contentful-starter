import React from 'react'
import { Router } from '@reach/router'

import Layout from '../../components/layout'
import PrivateRoute from '../../components/privateRoute'
import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import RecoverPassword from './forgottenPassword'

const Account: React.FC = () => (
	<Layout>
		<Router>
			<PrivateRoute path="/account/profile" component={Profile} />
			<Login path="/account/login" />
			<SignUp path="/account/signup" />
			<RecoverPassword path="/account/recover-password" />
		</Router>
	</Layout>
)

export default Account
