import { React, useState, useContext } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import { AuthContext } from '../context/authContext'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'

const ModalCustomer = styled(Modal)`
	.modal-content.modal-customer {
		background-color: #f4f5f7;
	}
	.dialog-customer {
		max-width: 850px;
	}
	.modal-body {
		display: -webkit-box;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	color: #4c627a;
	label {
		cursor: pointer;
		input[type='date'] {
			background-color: transparent;
			border: none;
			outline: none;
			width: 100%;
			color: #3387ab;
			padding: 5px;
		}
		.filetype {
			display: none;
		}
	}
	.alert-error {
		margin-top: 8px;
		height: 32px;
		display: flex;
		align-items: center;
	}
`

const Image = styled.img``

const InputImage = styled.div`
	display: block;
	.filetype {
		margin-bottom: 16px;
	}
	img {
		width: 100%;
		height: 150px;
		border-radius: 5px;
		margin-top: 10px;
		margin: auto;
	}
`

const CreateUser = (props) => {
	const PF = 'https://manager-work.onrender.com/images/'
	const { show, handleClose } = props
	const { registerUser } = useContext(AuthContext)
	const [file, setFile] = useState(null)
	const [error, setError] = useState([])
	const navigation = useNavigate()

	const [formRegsiter, setFormRegsiter] = useState({
		username: '',
		email: '',
		password: '',
		isActive: false,
	})

	const onChangeFormRegsiter = (e) => {
		setFormRegsiter({ ...formRegsiter, [e.target.name]: e.target.value })
	}

	const create = async (e) => {
		e.preventDefault()
		formRegsiter.isActive === 'true'
			? (formRegsiter.isActive = true)
			: (formRegsiter.isActive = false)
		if (file) {
			const data = new FormData()
			const filename = Date.now() + file.name.replace(/ +/g, '')
			data.append('name', filename)
			data.append('file', file)
			formRegsiter.avatar = PF + filename
			try {
				await axios.post(
					'https://manager-work.onrender.com/api/upload',
					data
				)
			} catch (err) {}
		}
		try {
			formRegsiter.confirmPassword = formRegsiter.password
			const registerData = await registerUser(formRegsiter)
			if (!registerData.success) {
				setError(registerData.message)
				setTimeout(() => {
					setError([])
				}, 3000)
			} else {
				navigation('/dashboard')
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<ModalCustomer
			show={show}
			onHide={handleClose}
			contentClassName="modal-customer"
			dialogClassName="dialog-customer"
		>
			<Modal.Header closeButton>Thêm người dùng</Modal.Header>
			<Modal.Body>
				<Form>
					<InputImage>
						<Form.Label>
							{file && (
								<img
									src={URL.createObjectURL(file)}
									alt="background-img"
								/>
							)}
						</Form.Label>
						<Form.Control
							type="file"
							onChange={(e) => setFile(e.target.files[0])}
							className="filetype"
						/>
					</InputImage>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Tên người dùng</Form.Label>
						<Form.Control
							type="text"
							name="username"
							value={formRegsiter.username}
							onChange={onChangeFormRegsiter}
						/>
						<Form.Text className="text-muted">
							Tên người dùng là bắt buộc.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email người dùng</Form.Label>
						<Form.Control
							type="text"
							name="email"
							value={formRegsiter.email}
							onChange={onChangeFormRegsiter}
						/>
						<Form.Text className="text-muted">
							Email người dùng là bắt buộc.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Mật khẩu người dùng</Form.Label>
						<Form.Control
							type="password"
							name="password"
							value={formRegsiter.password}
							onChange={onChangeFormRegsiter}
						/>
						<Form.Text className="text-muted">
							Mật khẩu người dùng là bắt buộc.
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Trạng thái của tài khoản</Form.Label>
						<Form.Select
							aria-label="Default select example"
							name="isActive"
							value={formRegsiter.isActive}
							onChange={onChangeFormRegsiter}
						>
							<option>Open this select menu</option>
							<option value={false}>Khóa</option>
							<option value={true}>Hoạt động</option>
						</Form.Select>
					</Form.Group>
					{error &&
						error.map((e, index) => (
							<Alert
								key={index}
								variant="warning"
								className="alert-error"
							>
								{e}
							</Alert>
						))}
				</Form>
				<Image
					src={
						'https://a.trellocdn.com/prgb/assets/d1f066971350650d3346.svg'
					}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Đóng
				</Button>
				<Button variant="primary" onClick={create}>
					Thêm
				</Button>
			</Modal.Footer>
		</ModalCustomer>
	)
}

export default CreateUser
