import styled from 'styled-components'
import { React, useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url('https://tino.org/wp-content/uploads/2021/09/word-image-10.jpeg')
			center;
	background-size: cover;
	background-repeat: no-repeat;
`

const FormConfirm = styled.form`
	button {
		height: 40px;
		border: none;
		outline: none;
		background-color: #71c11c;
		border-radius: 5px;
		width: 100px;
		line-height: 40px;
		color: #fcf7f7;
		:hover {
			background-color: #7bd61a;
		}
	}
`

const ConfirmEmail = () => {
	const navigation = useNavigate()
	const {
		verifyEmail,
		authState: { user },
	} = useContext(AuthContext)
	const veryfy = async (e) => {
		e.preventDefault()
		try {
			const veryfyData = await verifyEmail(user._id)
			if (veryfyData.success) {
				navigation('/boardpage')
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Container>
			<FormConfirm onSubmit={veryfy}>
				<button type="submit">Veryfy Email</button>
			</FormConfirm>
		</Container>
	)
}

export default ConfirmEmail
