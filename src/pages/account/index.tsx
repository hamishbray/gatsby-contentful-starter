import React from 'react'
import { Router } from '@reach/router'

import Layout from '../../components/layout'
import PrivateRoute from '../../components/privateRoute'
import Login from '../../components/login'
import Profile from '../../components/profile'
import SignUp from '../../components/signup'
import RecoverPassword from '../../components/recoverPassword'

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
