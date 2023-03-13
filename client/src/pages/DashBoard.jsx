import { React, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../context/authContext'
import { WorkPlaceContext } from '../context/workPlaceContext'
import { TableContext } from '../context/tableContext'
import { CardContext } from '../context/cardContext'
import { TaskContext } from '../context/taskContext'
import { Delete, Edit } from '@material-ui/icons'
import ConfirmModal from '../components/ConfirmModal'
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import { PieChart, Add } from '@material-ui/icons'
import DashBoardtUser from '../components/DashBoardUser'
import DashBoardWorkPlace from '../components/DashBoardWorkPlace'
import DashBoardTable from '../components/DashBoardTable'
import CreateUser from '../components/CreateUser'
import CreateWorkPlace from '../components/CreateWorkPlace'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import InforCardLateDeadline from '../components/InfroCardLateDeadline'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import AttachEmailRoundedIcon from '@mui/icons-material/AttachEmailRounded'

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	color: #ded6d6;
	.option-user {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 16px;
		padding-right: 16px;

		.icon {
			cursor: pointer;
			color: #635c5c;
		}
	}
`

const LeftDashBoard = styled.div`
	width: 15%;
	background-color: #3c4b64;
	margin-right: 16px;
	padding: 8px;
`

const HeadLeft = styled.div`
	display: flex;
	align-items: center;
	img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		margin-right: 16px;
	}
	h1 {
		text-align: center;
		font-size: 24px;
	}
	padding-bottom: 16px;
	border-bottom: 1px solid #fff;
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
	border-radius: 3px;
`

const CenterDashBoard = styled.div`
	width: 80%;
	.notify {
		width: 80%;
		padding: 16px 32px;
		border-radius: 5px;
		background-color: #ccc;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
			rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
		.form-label {
			color: #141313;
		}
	}
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

const DashBoard = () => {
	const [allAccounts, setAllAccounts] = useState([])
	const [showDelete, setShowDelete] = useState(false)
	const [showDeleteCard, setShowDeleteCard] = useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const [showStat, setShowStat] = useState(false)
	const [showStatWorkPlace, setShowStatWorkPlace] = useState(false)
	const [showStatTable, setShowStatTable] = useState(false)
	const handleCloseDelete = () => setShowDelete(false)
	const handleCloseEdit = () => setShowEdit(false)
	const [user, setUser] = useState({})
	const [workPlace, setWorkPlace] = useState({})
	const [table, setTable] = useState({})
	const [isOpenUser, setIsOpenUser] = useState(true)
	const [isOpenWorkPlace, setIsOpenWorkPlace] = useState(false)
	const [isOpenTable, setIsOpenTable] = useState(false)
	const [isOpenCard, setIsOpenCard] = useState(false)
	const [isOpenNotify, setOpenNotify] = useState(false)
	const [isOpenAddUser, setIsOpenAddUser] = useState(false)
	const [isOpenUpdateWorkPlce, setIsOpenUpdateWorkPlce] = useState(false)
	const [isOpenLateDeadline, setIsOpenLateDeadline] = useState(false)
	const [listCard, setListCard] = useState([])
	const [error, setError] = useState('')
	const [data, setData] = useState({
		email: '',
		title: '',
		description: '',
	})

	TimeAgo.addLocale(en)
	// Create formatter (English).
	const timeAgo = new TimeAgo('en-US')

	//use data context
	const {
		workPlaceState: { workPlaces },
		updateWorkPlace,
	} = useContext(WorkPlaceContext)

	const {
		tableState: { tables },
	} = useContext(TableContext)

	const {
		cardState: { allCards },
	} = useContext(CardContext)

	const {
		authState: { allUsers },
		notifyUser,
	} = useContext(AuthContext)

	const {
		taskState: { allTasks },
	} = useContext(TaskContext)

	useEffect(() => {
		setAllAccounts(allUsers.filter((user) => user.isAdMin === false))
	}, [allUsers])

	const deleteUserHandler = async () => {}
	const EditUserHandler = async () => {}
	const DeleteCard = async () => {}

	const handleForm = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const notifications = async () => {
		try {
			const res = await notifyUser(data)
			if (!res.success) {
				setError(res.message)
			} else {
				setError('Đã thông báo tới người dùng thành công.')
				setData({
					email: '',
					title: '',
					description: '',
				})
			}
			setTimeout(() => {
				setError('')
			}, 3000)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container>
			<LeftDashBoard>
				<HeadLeft>
					<img
						src="https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png"
						alt="img"
					/>
					<h1>Dashboard</h1>
				</HeadLeft>
				<LeftItem
					style={{
						backgroundColor: isOpenUser
							? 'rgba(255, 255, 255, 0.2)'
							: '#3c4b64',
						color: isOpenUser ? '#ffffff' : '#ded6d6',
					}}
					onClick={() => {
						setIsOpenUser(true)
						setIsOpenWorkPlace(false)
						setIsOpenTable(false)
						setIsOpenCard(false)
						setOpenNotify(false)
					}}
				>
					<GroupRoundedIcon className="icon" />
					Người dùng
				</LeftItem>
				<LeftItem
					style={{
						backgroundColor: isOpenWorkPlace
							? 'rgba(255, 255, 255, 0.2)'
							: '#3c4b64',
						color: isOpenWorkPlace ? '#ffffff' : '#ded6d6',
					}}
					onClick={() => {
						setIsOpenUser(false)
						setIsOpenWorkPlace(true)
						setIsOpenTable(false)
						setIsOpenCard(false)
						setOpenNotify(false)
					}}
				>
					<AccountTreeRoundedIcon className="icon" />
					Không gian làm việc
				</LeftItem>
				<LeftItem
					style={{
						backgroundColor: isOpenTable
							? 'rgba(255, 255, 255, 0.2)'
							: '#3c4b64',
						color: isOpenTable ? '#ffffff' : '#ded6d6',
					}}
					onClick={() => {
						setIsOpenUser(false)
						setIsOpenWorkPlace(false)
						setIsOpenTable(true)
						setIsOpenCard(false)
						setOpenNotify(false)
					}}
				>
					<TableViewRoundedIcon className="icon" />
					Bảng công việc
				</LeftItem>
				<LeftItem
					style={{
						backgroundColor: isOpenCard
							? 'rgba(255, 255, 255, 0.2)'
							: '#3c4b64',
						color: isOpenCard ? '#ffffff' : '#ded6d6',
					}}
					onClick={() => {
						setIsOpenUser(false)
						setIsOpenWorkPlace(false)
						setIsOpenTable(false)
						setIsOpenCard(true)
						setOpenNotify(false)
					}}
				>
					<AssignmentRoundedIcon className="icon" />
					Thẻ công việc
				</LeftItem>
				<LeftItem
					style={{
						backgroundColor: isOpenNotify
							? 'rgba(255, 255, 255, 0.2)'
							: '#3c4b64',
						color: isOpenNotify ? '#ffffff' : '#ded6d6',
					}}
					onClick={() => {
						setIsOpenUser(false)
						setIsOpenWorkPlace(false)
						setIsOpenTable(false)
						setIsOpenCard(false)
						setOpenNotify(true)
					}}
				>
					<NotificationsRoundedIcon className="icon" />
					Thông báo
				</LeftItem>
				<LeftItem>
					<SettingsRoundedIcon className="icon" />
					Cài đặt
				</LeftItem>
			</LeftDashBoard>
			<CenterDashBoard>
				{isOpenUser && (
					<>
						<Title onClick={() => setIsOpenAddUser(true)} on>
							<Add />
							Thêm người dùng
						</Title>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>User Name</th>
									<th>Email</th>
									<th>Status</th>
									<th>WorkPlaces</th>
									<th>Tables</th>
									<th>Task Doing</th>
									<th>Task Done</th>
									<th>Late Deadline</th>
									<th>Option</th>
								</tr>
							</thead>
							<tbody>
								{allAccounts &&
									allAccounts.map((account, index) => (
										<tr key={index}>
											<td>{index}</td>
											<td>{account.username}</td>
											<td>{account.email}</td>
											<td>
												{account.isActive
													? 'Active'
													: 'Block'}
											</td>
											<td>
												{
													workPlaces.filter(
														(w) =>
															w.admin ===
															account._id
													).length
												}
											</td>
											<td>
												{
													tables.filter(
														(t) =>
															t.admin ===
															account._id
													).length
												}
											</td>
											<td>
												{
													allCards.filter(
														(c) =>
															c.member ===
																account._id &&
															c.progress ===
																'Doing'
													).length
												}
											</td>
											<td>
												{
													allCards.filter(
														(c) =>
															c.member ===
																account._id &&
															c.progress ===
																'Done'
													).length
												}
											</td>
											<td
												onClick={() => {
													setListCard(
														allCards.filter(
															(c) =>
																c.member ===
																	account._id &&
																c.progress !==
																	'Done' &&
																timeAgo
																	.format(
																		new Date(
																			c.deadline
																		)
																	)
																	.includes(
																		'ago'
																	)
														)
													)
													setIsOpenLateDeadline(true)
												}}
											>
												<div
													style={{
														width: '36px',
														height: '36px',
														display: 'flex',
														alignItems: 'center',
														justifyContent:
															'center',
														borderRadius: '50%',
														backgroundColor: '#ccc',
														cursor: 'pointer',
													}}
												>
													{
														allCards.filter(
															(c) =>
																c.member ===
																	account._id &&
																c.progress !==
																	'Done' &&
																timeAgo
																	.format(
																		new Date(
																			c.deadline
																		)
																	)
																	.includes(
																		'ago'
																	)
														).length
													}
												</div>
											</td>
											<td className="option-user">
												<Delete
													onClick={() => {
														setShowDelete(true)
														setUser(account)
													}}
													className="icon"
												/>
												<Edit
													className="icon"
													onClick={() => {
														setShowEdit(true)
														setUser(account)
													}}
												/>

												<PieChart
													className="icon"
													onClick={() => {
														setShowStat(true)
														setUser(account)
													}}
												/>

												<AttachEmailRoundedIcon
													className="icon"
													onClick={() => {
														setData({
															...data,
															email: account.email,
														})
														setIsOpenUser(false)
														setOpenNotify(true)
													}}
												/>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
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
									<th>Admin</th>
									<th>Member</th>
									<th>Tables</th>
									<th>Task Doing</th>
									<th>Task Done</th>
									<th>Option</th>
								</tr>
							</thead>
							<tbody>
								{workPlaces &&
									workPlaces.map((workPlace, index) => (
										<tr key={index}>
											<td>{index}</td>
											<td>{workPlace.name}</td>
											<td>{workPlace.scope}</td>
											<td>
												{
													allUsers.find(
														(u) =>
															u._id ===
															workPlace.admin
													).email
												}
											</td>
											<td>{workPlace.members.length}</td>
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
												<Delete
													onClick={() => {
														setShowDelete(true)
													}}
													className="icon"
												/>
												<Edit
													className="icon"
													onClick={() => {
														setIsOpenUpdateWorkPlce(
															true
														)
													}}
												/>

												<PieChart
													className="icon"
													onClick={() => {
														setShowStatWorkPlace(
															true
														)
														setWorkPlace(workPlace)
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
									<th>Admin</th>
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
									tables.map((table, index) => (
										<tr key={index}>
											<td>{index}</td>
											<td>{table.name}</td>
											<td>{table.scope}</td>
											<td>
												{
													allUsers.find(
														(u) =>
															u._id ===
															table.admin
													).email
												}
											</td>
											<td>
												{
													workPlaces.find(
														(w) =>
															w._id ===
															table.workPlaceId
													).name
												}
											</td>
											<td>{table.members.length}</td>
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
												<Delete
													onClick={() => {
														setShowDelete(true)
													}}
													className="icon"
												/>
												<Edit
													className="icon"
													onClick={() => {
														setShowEdit(true)
													}}
												/>
												<PieChart
													className="icon"
													onClick={() => {
														setShowStatTable(true)
														setTable(table)
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
									<th>Member</th>
									<th>Table</th>
									<th>Tasks</th>
									<th>Task Done</th>
									<th>Labels</th>
									<th>Option</th>
								</tr>
							</thead>
							<tbody>
								{allCards &&
									allCards.map((card, index) => (
										<tr key={index}>
											<td>{index}</td>
											<td>{card.name}</td>
											<td>{card.progress}</td>
											<td>
												{card.member &&
													allUsers.find(
														(u) =>
															card.member ===
															u._id
													).email}
											</td>
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
											<td>{card.labels.length}</td>
											<td className="option-user">
												<Delete
													onClick={() => {
														setShowDeleteCard(true)
													}}
													className="icon"
												/>
												<Edit
													className="icon"
													onClick={() => {
														setShowEdit(true)
													}}
												/>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</>
				)}
				{isOpenNotify && (
					<div>
						<Title>
							<Add />
							Thông báo
						</Title>
						<div className="notify">
							<Form>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput1"
								>
									<Form.Label>
										Địa chỉ email người nhận
									</Form.Label>
									<Form.Control
										type="email"
										placeholder="abc@gmail.com"
										name="email"
										value={data.email}
										onChange={handleForm}
									/>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlInput2"
								>
									<Form.Label>Tiêu đề email</Form.Label>
									<Form.Control
										type="text"
										placeholder="abc..."
										name="title"
										value={data.title}
										onChange={handleForm}
									/>
								</Form.Group>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlTextarea1"
								>
									<Form.Label>Nội dung email</Form.Label>
									<Form.Control
										as="textarea"
										rows={3}
										name="description"
										value={data.description}
										onChange={handleForm}
									/>
								</Form.Group>
							</Form>
							{error && (
								<Alert
									variant="warning"
									className="alert-error"
								>
									{error}
								</Alert>
							)}
							<Button variant="primary" onClick={notifications}>
								Gửi thông báo
							</Button>
						</div>
					</div>
				)}
				<DashBoardtUser
					show={showStat}
					handleClose={() => setShowStat(false)}
					user={user}
					allCards={allCards}
				/>
				<DashBoardWorkPlace
					show={showStatWorkPlace}
					handleClose={() => setShowStatWorkPlace(false)}
					workPlace={workPlace}
					myTables={tables.filter(
						(t) => t.workPlaceId === workPlace._id
					)}
				/>
				<DashBoardTable
					show={showStatTable}
					handleClose={() => setShowStatTable(false)}
					table={table}
					numTodo={
						allCards.filter(
							(c) =>
								c.tableId === table._id &&
								c.progress === 'To do'
						).length
					}
					numDoing={
						allCards.filter(
							(c) =>
								c.tableId === table._id &&
								c.progress === 'Doing'
						).length
					}
					numReview={
						allCards.filter(
							(c) =>
								c.tableId === table._id &&
								c.progress === 'Review'
						).length
					}
					numDone={
						allCards.filter(
							(c) =>
								c.tableId === table._id && c.progress === 'Done'
						).length
					}
					memberInfor={allUsers.filter((u) =>
						table.members?.includes(u._id)
					)}
					cards={allCards.filter((c) => c.tableId === table._id)}
				/>
				<CreateUser
					show={isOpenAddUser}
					handleClose={() => setIsOpenAddUser(false)}
				/>
				<ConfirmModal
					show={showDelete}
					handleClose={handleCloseDelete}
					title={'Xóa tài khoản người dùng '}
					content={`Bạn có chắc chắn muốn xóa tài khoản ${user.username} .Tất cả các thông tin của tài khoản cũng bị xóa.`}
					deleteHandler={deleteUserHandler}
				/>
				<ConfirmModal
					show={showDeleteCard}
					handleClose={() => setShowDeleteCard(false)}
					title={'Xóa thẻ công việc '}
					content={`Bạn có chắc chắn muốn xóa thẻ công viêc.Tất cả các thông tin của thẻ công việc cũng bị xóa.`}
					deleteHandler={DeleteCard}
				/>
				<ConfirmModal
					show={showEdit}
					handleClose={handleCloseEdit}
					title={'Khóa tài khoản người dùng '}
					content={`Bạn có chắc chắn muốn khóa tài khoản ${user.username} .
					Người dùng không thể đăng nhập hay truy cập vào các bảng hay thẻ công việc`}
					deleteHandler={EditUserHandler}
				/>
				<CreateWorkPlace
					show={isOpenUpdateWorkPlce}
					handleClose={() => setIsOpenUpdateWorkPlce(false)}
					updateWorkPlace={updateWorkPlace}
					workPlace={workPlace}
				/>
				<InforCardLateDeadline
					show={isOpenLateDeadline}
					handleClose={() => setIsOpenLateDeadline(false)}
					listCard={listCard}
				/>
			</CenterDashBoard>
		</Container>
	)
}

export default DashBoard
