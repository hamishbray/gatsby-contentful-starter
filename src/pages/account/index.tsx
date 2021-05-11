import React from 'react'
import { Router } from '@reach/router'

import Layout from '../../components/layout'
import PrivateRoute from '../../components/privateRoute'
import Login from './login'
import Profile from './profile'
import SignUp from './signup'
import RecoverPassword from './recoverPassword'

const Account: React.FC = () => (
	<Layout>
		<Router basepath="/account">
			<PrivateRoute path="profile" component={Profile} />
			<Login path="login" />
			<SignUp path="signup" />
			<RecoverPassword path="recover-password" />
		</Router>
	</Layout>
)

export default Account
