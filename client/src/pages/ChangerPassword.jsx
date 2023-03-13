import styled from 'styled-components'
import { React, useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded'
import { Form } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'

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

const Box = styled.div`
	padding: 32px;
	border-radius: 5px;
	background-color: #ffffff;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	.alert-error {
		margin-top: 8px;
		height: 32px;
		display: flex;
		align-items: center;
	}
`

const Button = styled.div`
	width: 100%;
	padding-left: 8px;
	align-items: center;
	justify-content: flex-end;
	height: fit-content;
	.icon {
		float: right;
		font-size: 48px;
		cursor: pointer;
	}
`

const ButtonReset = styled.div`
	padding: 4px 8px;
	border-radius: 3px;
	background-color: #a6d41c;
	cursor: pointer;
	width: 50%;
	margin-left: 25%;
	text-align: center;
`

const ChangePassword = () => {
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const [code, setCode] = useState(0)
	const [codeRes, setCodeRes] = useState(1)
	const [isOpenEmail, setIsOpenEmail] = useState(true)
	const [isOpenCode, setIsOpenCode] = useState(false)
	const [isOpenReset, setIsOpenReset] = useState(false)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const { resetPassword, updatePassword } = useContext(AuthContext)

	const navigation = useNavigate()

	const sendCode = async () => {
		try {
			const res = await resetPassword(email)
			if (!res.success) {
				setError(res.message)
				setTimeout(() => {
					setError('')
				}, 3000)
			} else {
				setIsOpenEmail(false)
				setIsOpenCode(true)
				setCodeRes(res.code)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const update = async () => {
		if (password !== '' && password === confirmPassword) {
			try {
				const infor = {
					password,
					email,
				}
				const res = await updatePassword(infor)
				if (!res.success) {
					setError(res.message)
					setTimeout(() => {
						setError('')
					}, 3000)
				} else {
					navigation('/')
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			setError('Incorrect password and confirm password!')
			setTimeout(() => {
				setError('')
			}, 3000)
		}
	}

	const handleCode = () => {
		if (parseInt(code) === parseInt(codeRes)) {
			setIsOpenCode(false)
			setIsOpenReset(true)
		}
	}

	return (
		<Container>
			<Box>
				{isOpenEmail && (
					<>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<Form.Label>Nhập email</Form.Label>
								<Form.Control
									type="text"
									name="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Form.Text className="text-muted">
									Nhập email bạn đã đăng ký tài khoản.
								</Form.Text>
							</Form.Group>
						</Form>
						{error && (
							<Alert variant="warning" className="alert-error">
								{error}
							</Alert>
						)}

						<Button>
							<TrendingFlatRoundedIcon
								className="icon"
								onClick={() => {
									sendCode()
								}}
							/>
						</Button>
					</>
				)}
				{isOpenCode && (
					<>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<Form.Label>Nhập mã code</Form.Label>
								<Form.Control
									type="num"
									onChange={(e) => setCode(e.target.value)}
								/>
								<Form.Text className="text-muted">
									Nhập mã code được gửi tới email của bạn.
								</Form.Text>
							</Form.Group>
						</Form>
						<Button>
							<TrendingFlatRoundedIcon
								className="icon"
								onClick={handleCode}
							/>
						</Button>
					</>
				)}
				{isOpenReset && (
					<>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<Form.Label>Nhập mật khẩu mới</Form.Label>
								<Form.Control
									type="password"
									name="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<Form.Text className="text-muted">
									Nhập mật khẩu mới của bạn.
								</Form.Text>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<Form.Label>Nhập lại mật khẩu mới</Form.Label>
								<Form.Control
									type="password"
									name="confirmPassword"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								/>
								<Form.Text className="text-muted">
									Nhập lại mật khẩu mới của bạn.
								</Form.Text>
							</Form.Group>
						</Form>
						{error && (
							<Alert variant="warning" className="alert-error">
								{error}
							</Alert>
						)}
						<ButtonReset onClick={update}>Cập nhật</ButtonReset>
					</>
				)}
			</Box>
		</Container>
	)
}

export default ChangePassword
