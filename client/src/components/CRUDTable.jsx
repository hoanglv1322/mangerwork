import { React, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Button, Form } from 'react-bootstrap'
import { TableContext } from '../context/tableContext'
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

const CreateTable = (props) => {
	const PF = 'https://manager-work.onrender.com/images/'
	const { show, handleClose, workPlaceId, table } = props
	const { createTable, updateTable } = useContext(TableContext)
	const [file, setFile] = useState(null)

	const [tableData, setTableData] = useState({
		name: '',
		description: '',
		scope: '',
		workPlaceId,
	})

	useEffect(() => {
		if (table) {
			setTableData(table)
			setFile(table.background)
		}
	}, [table])

	const onChaneFormWorkPlace = (e) => {
		setTableData({ ...tableData, [e.target.name]: e.target.value })
	}

	const create = async (e) => {
		e.preventDefault()
		if (file && ((table && table.background !== file) || !table)) {
			const data = new FormData()
			const filename = Date.now() + file.name.replace(/ +/g, '')
			data.append('name', filename)
			data.append('file', file)
			tableData.background = PF + filename
			try {
				await axios.post('http://localhost:5000/api/upload', data)
			} catch (err) {}
		}
		try {
			let res
			if (table) {
				const tableDataUpdate = {
					id: table._id,
					isAddMember: false,
					tableInfor: tableData,
				}
				res = await updateTable(tableDataUpdate)
			} else {
				res = await createTable(tableData)
			}

			if (res.success) {
				handleClose()
				setTableData({
					name: '',
					description: '',
					scope: '',
					workPlaceId,
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
				{table ? 'Chỉnh sửa bảng làm việc' : 'Tạo bảng làm việc'}
			</Modal.Header>
			<Modal.Body>
				<Form>
					<InputImage>
						<Form.Label>
							{file && (
								<img
									src={
										table?.background === file
											? table.background
											: URL.createObjectURL(file)
									}
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
						<Form.Label>Tiêu đề bảng</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={tableData.name}
							onChange={onChaneFormWorkPlace}
						/>
						<Form.Text className="text-muted">
							Tiêu đề bảng là bắt buộc.
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Phạm vi làm việc của bảng</Form.Label>
						<Form.Select
							aria-label="Default select example"
							name="scope"
							value={tableData.scope}
							onChange={onChaneFormWorkPlace}
						>
							<option>Open this select menu</option>
							<option value="Riêng tư">Riêng tư</option>
							<option value="Không gian làm việc">
								Không gian làm việc
							</option>
							<option value="Công khai">Công khai</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="mt-3" controlId="formBasicEmail">
						<Form.Label>Mô tả bảng làm việc</Form.Label>
						<Form.Control
							type="text"
							as="textarea"
							name="description"
							value={tableData.description}
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
					{table ? 'Chỉnh sửa' : 'Tạo'}
				</Button>
			</Modal.Footer>
		</ModalCustomer>
	)
}

export default CreateTable
