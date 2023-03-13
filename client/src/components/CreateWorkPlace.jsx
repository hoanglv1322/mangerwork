import { React, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal, Button, Form } from 'react-bootstrap'

const ModalCustomer = styled(Modal)`
	.modal-content.modal-customer {
		background-color: #f4f5f7;
	}
	.dialog-customer {
		max-width: 770px;
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
`

const Image = styled.img``

const CreateWorkPlace = (props) => {
	const { show, handleClose, createWorkPlace, workPlace, updateWorkPlace } =
		props
	const [workPlaceData, setWorkPlaceData] = useState({
		name: '',
		description: '',
		scope: '',
	})

	const onChaneFormWorkPlace = (e) => {
		setWorkPlaceData({ ...workPlaceData, [e.target.name]: e.target.value })
	}

	useEffect(() => {
		workPlace && setWorkPlaceData(workPlace)
	}, [workPlace])

	const create = async (e) => {
		e.preventDefault()
		try {
			let res
			if (workPlace) {
				const workPlaceDataUpdate = {
					id: workPlace._id,
					isAddMember: false,
					workPlaceInfor: workPlaceData,
				}
				res = await updateWorkPlace(workPlaceDataUpdate)
			} else {
				res = await createWorkPlace(workPlaceData)
			}
			if (res.success) {
				handleClose()
				setWorkPlaceData({
					name: '',
					description: '',
					scope: '',
				})
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
			<Modal.Header closeButton>
				{workPlace
					? 'Chỉnh sửa không gian làm viêc '
					: 'Tạo không gian làm việc'}
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Tên không gian làm việc</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={workPlaceData.name}
							onChange={onChaneFormWorkPlace}
						/>
						<Form.Text className="text-muted">
							Đây là tên của công ty, nhóm hoặc tổ chức của bạn.
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Phạm vi của không gian làm việc</Form.Label>
						<Form.Select
							aria-label="Default select example"
							name="scope"
							value={workPlaceData.scope}
							onChange={onChaneFormWorkPlace}
						>
							<option>Open this select menu</option>
							<option value="private">Riêng tư</option>
							<option value="default">Mặc định</option>
							<option value="public">Công khai</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="mt-3" controlId="formBasicEmail">
						<Form.Label>Mô tả không gian làm việc</Form.Label>
						<Form.Control
							type="text"
							as="textarea"
							name="description"
							value={workPlaceData.description}
							onChange={onChaneFormWorkPlace}
						/>
					</Form.Group>
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
					{workPlace ? 'Chỉnh sửa' : 'Tạo'}
				</Button>
			</Modal.Footer>
		</ModalCustomer>
	)
}

export default CreateWorkPlace
