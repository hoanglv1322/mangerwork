import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/authContext'

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
	font-family: Helvetica;
`
const Wrapper = styled.form`
	width: 35%;
	height: fit-content;
	padding: 32px;
	border: 1px solid teal;
	background-color: rgba(255, 255, 255, 0.7);
	border-radius: 5px;
	.error-text {
		color: red;
	}
	.success-text {
		color: green;
	}
	@media only screen and (max-width: 480px) {
		width: 80%;
		padding: 24px;
	}
	@media only screen and (max-width: 800px) and (min-width: 485px) {
		width: 70%;
	}
	@media only screen and (max-width: 900px) and (min-width: 805px) {
		width: 50%;
	}
`
const Title = styled.h1`
	color: teal;
	font-weight: 500;
`
const InputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	@media only screen and (max-width: 480px) {
		flex-direction: column;
	}
`
const Input = styled.input`
	width: 48%;
	padding: 10px;
	margin-top: 16px;
	outline: none;
	border-radius: 5px;
	border: none;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	:focus {
		border: 1px solid #5388e9;
	}
	@media only screen and (max-width: 480px) {
		width: 80%;
	}
`
const Desc = styled.div`
	font-size: 13px;
	margin: 16px 0;
	width: 100%;
	margin: 0px;
`
const Button = styled.button`
	border-radius: 5px;
	width: 30%;
	border: none;
	outline: none;
	margin-top: 16px;
	padding: 5px;
	margin-left: 35%;
	color: white;
	font-weight: 500;
	background-color: #71d314;
	:hover {
		background-color: #75dd14;
	}
`

const LinkLogin = styled.div`
	margin-top: 10px;
	span {
		font-size: 15px;
		font-weight: 300;
		color: #12a29b;
	}
	.btn-link-register {
		font-size: 15px;
		font-weight: 300;
		color: #12a29b;
		text-decoration: none;
		cursor: pointer;
		margin-left: 10px;
		:hover {
			color: #0ce9de;
		}
	}
`

const Register = () => {
	const { registerUser } = useContext(AuthContext)

	const [formRegsiter, setFormRegsiter] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		isActive: false,
	})
	const [error, setError] = useState([])
	const [success, setSuccess] = useState(false)

	const register = async (e) => {
		e.preventDefault()
		try {
			const registerData = await registerUser(formRegsiter)
			if (!registerData.success) {
				setError(registerData.message)
			} else {
				setSuccess(true)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const onChangeFormRegsiter = (e) => {
		setError([])
		setFormRegsiter({ ...formRegsiter, [e.target.name]: e.target.value })
	}
	return (
		<Container>
			<Wrapper onSubmit={register}>
				<Title>CREATE AN ACCOUNT</Title>
				{error &&
					error.map((e, index) => (
						<span className="error-text" key={index}>
							{e}
						</span>
					))}
				{success && (
					<span className="success-text">
						Register account success, please check your email to
						verify account!
					</span>
				)}
				<InputContainer>
					<Input
						placeholder="username..."
						type="text"
						name="username"
						value={formRegsiter.username}
						onChange={onChangeFormRegsiter}
						required
					/>
					<Input
						placeholder="email..."
						type="email"
						name="email"
						value={formRegsiter.email}
						onChange={onChangeFormRegsiter}
						required
					/>
					<Input
						placeholder="password..."
						type="password"
						name="password"
						value={formRegsiter.password}
						onChange={onChangeFormRegsiter}
						required
					/>
					<Input
						placeholder="confirm password..."
						type="password"
						name="confirmPassword"
						value={formRegsiter.confirmPassword}
						onChange={onChangeFormRegsiter}
						required
					/>
				</InputContainer>
				<LinkLogin>
					<span>Do you have a account?</span>
					<Link to="/" className="btn-link-register">
						Login
					</Link>
				</LinkLogin>
				<Desc>
					By creating an account, I consent to the prossessing of my
					personal data in accordance the <b>PRIVATE POLICY</b>
				</Desc>
				<Button type="submit">CREATE</Button>
			</Wrapper>
		</Container>
	)
}

export default Register
