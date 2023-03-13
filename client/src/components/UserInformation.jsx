import { React, useState, useContext } from 'react'
import styled from 'styled-components'
import { Modal, Button, Form } from 'react-bootstrap'
import { PhotoCamera } from '@material-ui/icons'
import { AuthContext } from '../context/authContext'
import { WorkPlaceContext } from '../context/workPlaceContext'
import { TableContext } from '../context/tableContext'
import { CardContext } from '../context/cardContext'
import { TaskContext } from '../context/taskContext'
import Table from 'react-bootstrap/Table'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import DashBoardWorkPlace from './DashBoardWorkPlace'
import DashBoardTable from './DashBoardTable'
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import { Delete, Edit, PieChart, Add } from '@material-ui/icons'
import axios from 'axios'

const ModalCustomer = styled(Modal)`
	.modal-content.modal-customer {
		background-color: #f4f5f7;
	}
	.dialog-customer {
		max-width: 90%;
	}
	.modal-body {
		display: flex;
		align-items: flex-start;
	}
	color: #4c627a;
	min-height: 90%;
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

const Left = styled.div`
	width: 20%;
	height: 100%;
`

const LeftItem = styled.div`
	margin-top: 16px;
	display: flex;
	align-items: center;
	padding: 8px;
	cursor: pointer;
	.icon {
		font-size: 24px;
		margin-right: 8px;
	}
	border-radius: 5px;
`

const Right = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80%;
	border-left: 1px solid #201f1f;
	form {
		width: 80%;
	}
	.option-user .icon {
		cursor: pointer;
	}
`

const AvatarUser = styled.img`
	border-radius: 50%;
	width: 100px;
	height: 100px;
	cursor: pointer;
	display: flex;
	align-items: center;
	object-fit: cover;
	border: 1px solid #2d23b5;
`

const InforItem = styled.div`
	width: 100%;
	background-color: #ffffff;
	color: #505356;
	padding: 8px;
	height: 48px;
	line-height: 1.5rem;
	border: 1px solid #ccc;
	display: flex;
	align-items: center;
	justify-content: space-between;
	h1 {
		font-size: 1rem;
		font-weight: 400;
	}
	.icon_number {
		height: 36px;
		width: 36px;
		border-radius: 50%;
		background-color: #310edd;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	border-radius: 5px;
	margin-bottom: 16px;
`
const Title = styled.div`
	color: #3b3a3a;
	margin: 16px 0;
	padding: 8px;
	background-color: #67e921;
	border-radius: 3px;
	width: fit-content;
	cursor: pointer;
	:hover {
		background-color: #67f31c;
	}
`

const UserInformation = (props) => {
	const PF = 'https://manager-work.onrender.com/images/'
	const { show, handleClose, user, updateUser } = props
	const [file, setFile] = useState('')
	const [userName, setUserName] = useState(user.username)
	const [isOpenUser, setIsOpenUser] = useState(true)
	const [isOpenWorkPlace, setIsOpenWorkPlace] = useState(false)
	const [isOpenTable, setIsOpenTable] = useState(false)
	const [isOpenCard, setIsOpenCard] = useState(false)
	const [showDashboardWorkPlace, setShowDashboardWorkPlace] = useState(false)
	const [showStatTable, setShowStatTable] = useState(false)
	const [workPlace, setWorkPlace] = useState({})
	const [tableSelector, setTableSelector] = useState({})
	const [myTables, setMyTables] = useState([])

	TimeAgo.addLocale(en)
	// Create formatter (English).
	const timeAgo = new TimeAgo('en-US')

	//use data context

	const {
		authState: { allUsers },
	} = useContext(AuthContext)

	const {
		workPlaceState: { workPlaces },
	} = useContext(WorkPlaceContext)

	const {
		tableState: { tables },
	} = useContext(TableContext)

	const {
		cardState: { allCards },
	} = useContext(CardContext)

	const {
		taskState: { allTasks },
	} = useContext(TaskContext)

	const handleUpdate = async () => {
		let userData = {
			username: userName,
		}
		if (file) {
			const data = new FormData()
			const filename = Date.now() + file.name.replace(/ +/g, '')
			data.append('name', filename)
			data.append('file', file)
			userData.avatar = PF + filename
			try {
				await axios.post('http://localhost:5000/api/upload', data)
			} catch (err) {}
		}
		try {
			const res = await updateUser(userData)
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<ModalCustomer
			show={show}
			onHide={handleClose}
			contentClassName="modal-customer"
			dialogClassName="dialog-customer"
		>
			<Modal.Header closeButton>Hồ sơ và hiển thị</Modal.Header>
			<Modal.Body>
				<Left>
					<LeftItem
						style={{
							backgroundColor: isOpenUser ? '#4a4646' : '#f4f5f7',
							color: isOpenUser ? '#ffffff' : '#4c627a',
						}}
						onClick={() => {
							setIsOpenUser(true)
							setIsOpenWorkPlace(false)
							setIsOpenTable(false)
							setIsOpenCard(false)
						}}
					>
						<GroupRoundedIcon className="icon" />
						Thông tin cá nhân
					</LeftItem>
					<LeftItem
						style={{
							backgroundColor: isOpenWorkPlace
								? '#4a4646'
								: '#f4f5f7',
							color: isOpenWorkPlace ? '#ffffff' : '#4c627a',
						}}
						onClick={() => {
							setIsOpenUser(false)
							setIsOpenWorkPlace(true)
							setIsOpenTable(false)
							setIsOpenCard(false)
						}}
					>
						<AccountTreeRoundedIcon className="icon" />
						Không gian làm việc
					</LeftItem>
					<LeftItem
						style={{
							backgroundColor: isOpenTable
								? '#4a4646'
								: '#f4f5f7',
							color: isOpenTable ? '#ffffff' : '#4c627a',
						}}
						onClick={() => {
							setIsOpenUser(false)
							setIsOpenWorkPlace(false)
							setIsOpenTable(true)
							setIsOpenCard(false)
						}}
					>
						<TableViewRoundedIcon className="icon" />
						Bảng công việc
					</LeftItem>
					<LeftItem
						style={{
							backgroundColor: isOpenCard ? '#4a4646' : '#f4f5f7',
							color: isOpenCard ? '#ffffff' : '#4c627a',
						}}
						onClick={() => {
							setIsOpenUser(false)
							setIsOpenWorkPlace(false)
							setIsOpenTable(false)
							setIsOpenCard(true)
						}}
					>
						<AssignmentRoundedIcon className="icon" />
						Thẻ công việc
					</LeftItem>
					<LeftItem>
						<NotificationsRoundedIcon className="icon" />
						Thông báo
					</LeftItem>
					<LeftItem>
						<SettingsRoundedIcon className="icon" />
						Cài đặt
					</LeftItem>
				</Left>
				<Right>
					{isOpenUser && (
						<>
							<AvatarUser
								src={
									file
										? URL.createObjectURL(file)
										: user.avatar
										? user.avatar
										: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
								}
							/>
							<label>
								<PhotoCamera className="icon-option" />
								<input
									type="file"
									onChange={(e) => setFile(e.target.files[0])}
									className="filetype"
								/>
							</label>
							<Form>
								<Form.Group
									className="mb-3"
									controlId="formBasicEmail"
								>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										value={user.email}
									/>
									<Form.Text className="text-muted">
										We'll never share your email with anyone
										else.
									</Form.Text>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="formBasicEmail"
								>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type="text"
										value={userName}
										name="username"
										onChange={(e) =>
											setUserName(e.target.value)
										}
									/>
								</Form.Group>
								<InforItem>
									<h1>Số không gian làm việc</h1>
									<div className="icon_number">
										{
											workPlaces.filter(
												(w) => w.admin === user._id
											).length
										}
									</div>
								</InforItem>
								<InforItem>
									<h1>Số bảng công việc</h1>
									<div className="icon_number">
										{
											tables.filter(
												(t) => t.admin === user._id
											).length
										}
									</div>
								</InforItem>
								<InforItem>
									<h1>Số thẻ công việc</h1>
									<div className="icon_number">
										{
											allCards.filter(
												(c) => c.member === user._id
											).length
										}
									</div>
								</InforItem>
							</Form>
						</>
					)}
					{isOpenWorkPlace && (
						<>
							<Title>
								<Add />
								Không gian làm việc
							</Title>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Scope</th>
										<th>Member</th>
										<th>Tables</th>
										<th>Task Doing</th>
										<th>Task Done</th>
										<th>Option</th>
									</tr>
								</thead>
								<tbody>
									{workPlaces &&
										workPlaces
											.filter((w) => w.admin === user._id)
											.map((workPlace, index) => (
												<tr key={index}>
													<td>{index}</td>
													<td>{workPlace.name}</td>
													<td>{workPlace.scope}</td>
													<td>
														{
															workPlace.members
																.length
														}
													</td>
													<td>
														{
															tables.filter(
																(t) =>
																	t.workPlaceId ===
																	workPlace._id
															).length
														}
													</td>
													<td>14</td>
													<td>15</td>
													<td className="option-user">
														<Delete className="icon" />
														<Edit className="icon" />
														<PieChart
															className="icon"
															onClick={() => {
																setShowDashboardWorkPlace(
																	true
																)
																setWorkPlace(
																	workPlace
																)
																setMyTables(
																	tables.filter(
																		(t) =>
																			t.workPlaceId ===
																			workPlace._id
																	)
																)
															}}
														/>
													</td>
												</tr>
											))}
								</tbody>
							</Table>
						</>
					)}
					{isOpenTable && (
						<>
							<Title>
								<Add />
								Bảng công việc
							</Title>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Scope</th>
										<th>WorkPlaces</th>
										<th>Members</th>
										<th>Cards</th>
										<th>Task Doing</th>
										<th>Task Done</th>
										<th>Option</th>
									</tr>
								</thead>
								<tbody>
									{tables &&
										tables
											.filter((t) => t.admin === user._id)
											.map((table, index) => (
												<tr key={index}>
													<td>{index}</td>
													<td>{table.name}</td>
													<td>{table.scope}</td>

													<td>
														{
															workPlaces.find(
																(w) =>
																	w._id ===
																	table.workPlaceId
															).name
														}
													</td>
													<td>
														{table.members.length}
													</td>
													<td>
														{
															allCards.filter(
																(c) =>
																	c.tableId ===
																	table._id
															).length
														}
													</td>
													<td>
														{
															allCards.filter(
																(c) =>
																	c.tableId ===
																		table._id &&
																	c.progress ===
																		'Doing'
															).length
														}
													</td>
													<td>
														{
															allCards.filter(
																(c) =>
																	c.tableId ===
																		table._id &&
																	c.progress ===
																		'Done'
															).length
														}
													</td>
													<td className="option-user">
														<Delete className="icon" />
														<Edit className="icon" />
														<PieChart
															className="icon"
															onClick={() => {
																setShowStatTable(
																	true
																)
																setTableSelector(
																	table
																)
															}}
														/>
													</td>
												</tr>
											))}
								</tbody>
							</Table>
						</>
					)}
					{isOpenCard && (
						<>
							<Title>
								<Add />
								Thẻ công việc
							</Title>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Progress</th>
										<th>Table</th>
										<th>Tasks</th>
										<th>Task Done</th>
										<th>Labels</th>
										<th>Deadline</th>
										<th>Option</th>
									</tr>
								</thead>
								<tbody>
									{allCards &&
										allCards
											.filter(
												(c) => c.member === user._id
											)
											.map((card, index) => (
												<tr
													key={index}
													style={{
														backgroundColor:
															timeAgo
																.format(
																	new Date(
																		card.deadline
																	)
																)
																.includes(
																	'ago'
																) &&
															card.progress !==
																'Done'
																? '#f00909'
																: 'none',
														color:
															timeAgo
																.format(
																	new Date(
																		card.deadline
																	)
																)
																.includes(
																	'ago'
																) &&
															card.progress !==
																'Done'
																? '#ffffff'
																: '#3a3535',
													}}
												>
													<td>{index}</td>
													<td>{card.name}</td>
													<td>{card.progress}</td>
													<td>
														{
															tables.find(
																(t) =>
																	card.tableId ===
																	t._id
															).name
														}
													</td>
													<td>
														{allTasks &&
															allTasks.filter(
																(task) =>
																	task.cardId ===
																	card._id
															).length}
													</td>
													<td>
														{allTasks &&
															allTasks.filter(
																(task) =>
																	task.cardId ===
																		card._id &&
																	task.isDone
															).length}
													</td>
													<td>
														{card.labels.length}
													</td>
													<td>
														{timeAgo.format(
															new Date(
																card.deadline
															)
														)}
													</td>
													<td className="option-user">
														<Delete className="icon" />
														<Edit className="icon" />
													</td>
												</tr>
											))}
								</tbody>
							</Table>
						</>
					)}
				</Right>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Đóng
				</Button>
				<Button variant="primary" onClick={handleUpdate}>
					Lưu thay đổi
				</Button>
			</Modal.Footer>
			<DashBoardWorkPlace
				show={showDashboardWorkPlace}
				handleClose={() => setShowDashboardWorkPlace(false)}
				workPlace={workPlace}
				myTables={myTables}
			/>
			<DashBoardTable
				show={showStatTable}
				handleClose={() => setShowStatTable(false)}
				table={tableSelector}
				numTodo={
					allCards.filter(
						(c) =>
							c.tableId === tableSelector._id &&
							c.progress === 'To do'
					).length
				}
				numDoing={
					allCards.filter(
						(c) =>
							c.tableId === tableSelector._id &&
							c.progress === 'Doing'
					).length
				}
				numReview={
					allCards.filter(
						(c) =>
							c.tableId === tableSelector._id &&
							c.progress === 'Review'
					).length
				}
				numDone={
					allCards.filter(
						(c) =>
							c.tableId === tableSelector._id &&
							c.progress === 'Done'
					).length
				}
				memberInfor={allUsers.filter((u) =>
					tableSelector.members?.includes(u._id)
				)}
				cards={allCards.filter((c) => c.tableId === tableSelector._id)}
			/>
		</ModalCustomer>
	)
}

export default UserInformation
