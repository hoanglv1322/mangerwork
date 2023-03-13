import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import ConfirmEmail from './pages/ConfirmEmail'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/authContext'
import { useContext, React } from 'react'
import BoardPage from './pages/BoardPage'
import DashBoard from './pages/DashBoard'
import BoardTable from './pages/BoardTable'
import ChangePassword from './pages/ChangerPassword'
import Blog from './pages/Blog'

const Container = styled.div`
	font-family: Roboto, sans-serif;
	margin: 0;
	padding: 0;
`

const App = () => {
	const {
		authState: { isAuthenticated, user },
	} = useContext(AuthContext)
	return (
		<Container>
			<BrowserRouter>
				<Routes>
					<Route
						path="/dashboard"
						element={
							user && user.isAdMin ? <DashBoard /> : <Login />
						}
					/>
					<Route path="/register" element={<Register />} />
					<Route
						path="/"
						element={isAuthenticated ? <BoardPage /> : <Login />}
					/>
					<Route
						path="/boardpage"
						element={isAuthenticated ? <BoardPage /> : <Login />}
					/>
					<Route
						path="/table/:tableId"
						element={isAuthenticated ? <BoardTable /> : <Login />}
					/>
					<Route path="/auth/verifyuser" element={<ConfirmEmail />} />
					<Route
						path="/auth/changepassword"
						element={<ChangePassword />}
					/>
					<Route path="/blog" element={<Blog />} />
				</Routes>
			</BrowserRouter>
		</Container>
	)
}

export default App
