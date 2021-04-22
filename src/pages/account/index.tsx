import React from 'react'
import { Router } from '@reach/router'

import Layout from '../../components/layout'
import PrivateRoute from '../../components/privateRoute'
import Login from './login'
import Profile from './profile'
import SignUp from './signup'

const Account: React.FC = () => (
	<Layout>
		<Router>
			<PrivateRoute path="/account/profile" component={Profile} />
			<Login path="/account/login" />
			<SignUp path="/account/signup" />
		</Router>
	</Layout>
)

export default Account
