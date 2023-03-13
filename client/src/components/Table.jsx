import { React, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TableContext } from '../context/tableContext'
import { CardContext } from '../context/cardContext'
import { AuthContext } from '../context/authContext'
import UpdateTable from './CRUDTable'
import DashBoardTable from './DashBoardTable'
import Card from './Card'
import { useLocation } from 'react-router-dom'
import { PieChart, AssignmentInd, Block, Add } from '@material-ui/icons'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import MarkChatUnreadRoundedIcon from '@mui/icons-material/MarkChatUnreadRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import { Button, Form } from 'react-bootstrap'
import ChatGroup from './ChatGroup'
import Papa from 'papaparse'

const Container = styled.div`
	height: calc(100% - 46px);
	min-height: calc(100vh - 46px);
	position: relative;
	top: 46px;
	.icon_chat {
		position: absolute;
		bottom: 32px;
		right: 32px;
		font-size: 30px;
		cursor: pointer;
		color: #ffffff;
	}
	padding-bottom: 32px;
`

const NavBarTable = styled.div`
	position: relative;
	height: 45px;
	padding-top: 5px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`

const Item = styled.div`
	.icon_menu {
		font-size: 20px;
		color: #fff;
	}
	display: flex;
	align-items: center;
	color: #fff;
	cursor: pointer;
	margin-right: 32px;
	padding: 4px 12px;
	border-radius: 3px;
	background-color: #337da7;
	:hover {
		background-color: #3284b4;
	}
`

const InputAddMemeber = styled.div`
	position: absolute;
	padding: 16px;
	border-radius: 5px;
	background-color: #ffffff;
	top: 45px;
	left: 570px;
	z-index: 22;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const GroupBtn = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-top: 16px;
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
		.filecsv {
			display: none;
		}
	}
`

const ColumnContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-around;
	margin-top: 16px;
`

const Column = styled.div`
	background-color: #ebecf0;
	padding: 8px;
	border-radius: 5px;
	width: 23%;
	height: fit-content;
	padding-bottom: 32px;
`

const ColumnTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	font-weight: bold;
	border-bottom: 1px solid #ccc;
	padding-bottom: 8px;
`
const ColumnBody = styled.div`
	margin-top: 16px;
`

const AddCard = styled.div`
	width: 100%;
	height: fit-content;
	padding: 8px;
	border-radius: 5px;
	background-color: #f3ebeb;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	cursor: pointer;
`

const InputAddCard = styled.div`
	width: 100%;
	height: fit-content;
	margin-top: 16px;
	padding: 8px;
	border-radius: 5px;
	background-color: #f3ebeb;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const BoxMember = styled.div`
	position: absolute;
	padding: 16px;
	border-radius: 5px;
	background-color: #ffffff;
	top: 45px;
	left: 400px;
	z-index: 22;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	button {
		padding: 8px;
		width: 100%;
		margin-top: 8px;
	}
`

const MemberInfor = styled.div`
	padding: 8px;
	margin: 8px 0;
	border: 1px solid #ccc;
	background-color: #7bd9c8;
	border-radius: 3px;
	:hover {
		cursor: pointer;
		background-color: #ccc;
	}
	img {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid #ccc;
		margin-right: 8px;
	}
`

const Table = () => {
	const [table, setTable] = useState({})
	const [backgroundImage, setBackgroundImage] = useState('')
	const [showUpdateTable, setShowUpdateTable] = useState(false)
	const [isOpenAddMember, setIsOpenAddMember] = useState(false)
	const [isOpenBoxMember, setIsOpenBoxMember] = useState(false)
	const [cards, setCards] = useState([])
	const [cardToDo, setCardToDo] = useState([])
	const [cardDoing, setCardDoing] = useState([])
	const [cardReview, setCardReview] = useState([])
	const [memberTable, setMemberTable] = useState([])
	const [memberInfor, setMemberInfor] = useState([])
	const [cardDone, setCardDone] = useState([])
	const [listCardAdded, setListCardAdded] = useState([])
	const [email, setEmail] = useState('')
	const [isOpenAddCard, setIsOpenAddCard] = useState(false)
	const [isOpenDashboardTable, setIsOpenDashboardTable] = useState(false)
	const [isOpenChat, setIsOpenChat] = useState(false)
	const [cardData, setCardData] = useState({
		name: '',
		tableId: '',
		progress: 'To do',
	})

	const handleClose = () => {
		setShowUpdateTable(false)
		setIsOpenDashboardTable(false)
	}

	//get tableId from url
	const location = useLocation()
	const tableId = location.pathname.split('/')[2]

	//context data
	const {
		tableState: { tables },
		updateTable,
	} = useContext(TableContext)
	const {
		cardState: { allCards },
		createCard,
		createCardCSV,
	} = useContext(CardContext)
	const {
		authState: { allUsers, user },
	} = useContext(AuthContext)

	//init data
	useEffect(() => {
		const tableCurrent = tables.find((t) => t._id === tableId)
		if (tableCurrent) {
			setTable(tableCurrent)
			setBackgroundImage(tableCurrent.background)
			cardData.tableId = tableCurrent._id
			allCards &&
				setCards(allCards.filter((c) => c.tableId === tableCurrent._id))
			setMemberTable([...tableCurrent.members, tableCurrent.admin])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tables, tableId, allCards])

	useEffect(() => {
		setMemberInfor(allUsers.filter((u) => memberTable.includes(u._id)))
	}, [allUsers, memberTable])

	useEffect(() => {
		if (cards) {
			setCardToDo(cards.filter((c) => c.progress === 'To do'))
			setCardDoing(cards.filter((c) => c.progress === 'Doing'))
			setCardReview(cards.filter((c) => c.progress === 'Review'))
			setCardDone(cards.filter((c) => c.progress === 'Done'))
		}
	}, [cards])

	//update data name card
	const onChangeData = (e) => {
		setCardData({ ...cardData, [e.target.name]: e.target.value })
	}

	//create Card
	const create = async (e) => {
		e.preventDefault()
		try {
			if (listCardAdded.length > 0) {
				let res = await createCardCSV(listCardAdded)
				if (res.success) {
					setIsOpenAddCard((pre) => !pre)
					setListCardAdded([])
				}
			} else {
				let res = await createCard(cardData)
				if (res.success) {
					setIsOpenAddCard((pre) => !pre)
					setCardData({
						name: '',
						tableId: '',
						progress: 'To do',
					})
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	//add member to table
	const addMemberTable = async (e) => {
		e.preventDefault()
		const memberAdd = allUsers.find((user) => user.email === email)
		const tableData = {
			id: table._id,
			isAddMember: true,
			tableInfor: {
				member: memberAdd._id,
			},
		}
		try {
			const res = await updateTable(tableData)
			if (res.success) {
				console.log(res)
				setIsOpenAddMember((pre) => !pre)
			}
		} catch (error) {
			console.log(error)
		}
	}

	//hanlde file csv
	const handleFileCSV = (e) => {
		setCardData({ ...cardData, name: e.target.files[0].name })
		Papa.parse(e.target.files[0], {
			header: true,
			skipEmpty: true,
			complete: function (result) {
				const arraySCV = []
				result.data.forEach((d) => {
					d.name &&
						arraySCV.push({
							name: d.name,
							tableId: table._id,
							member: allUsers.find(
								(user) => user.email === d.member
							)._id,
							deadline:
								d.deadline.split('/')[2] +
								'-0' +
								d.deadline.split('/')[1] +
								'-' +
								d.deadline.split('/')[0],
							progress: 'To do',
						})
				})
				setListCardAdded(arraySCV)
			},
		})
	}

	return (
		<Container
			style={{
				backgroundImage:
					backgroundImage !== null
						? 'url(' + backgroundImage + ')'
						: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		>
			<NavBarTable>
				<Item onClick={() => setShowUpdateTable(true)}>
					<DriveFileRenameOutlineRoundedIcon className="icon_menu" />
					{table.name}
				</Item>
				<UpdateTable
					show={showUpdateTable}
					handleClose={handleClose}
					workPlaceId={table.workPlaceId}
					table={table}
				/>
				<Item>
					<Block className="icon_menu" />
					{table.scope}
				</Item>
				<Item onClick={() => setIsOpenBoxMember((pre) => !pre)}>
					<AssignmentInd className="icon_menu" />
					Thành viên
				</Item>
				{isOpenBoxMember && (
					<BoxMember>
						{memberInfor &&
							memberInfor.map((u, index) => (
								<MemberInfor key={index}>
									<img
										src={u.avatar && u.avatar}
										alt="image_user"
									/>
									{u.email}
								</MemberInfor>
							))}
						{table.admin === user._id && (
							<button
								onClick={() =>
									setIsOpenAddMember((pre) => !pre)
								}
							>
								Thêm thành viên
							</button>
						)}
					</BoxMember>
				)}
				{isOpenAddMember && (
					<InputAddMemeber>
						<Form>
							<Form.Label>
								Nhập email của thành viên tham gia bảng làm
								việc.
							</Form.Label>
							<Form.Control
								type="email"
								name="email"
								placeholder="abc@gmail.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Text className="text-muted">
								Cộng tác với các thành viên khác để hoàn thành
								tốt dự án.
							</Form.Text>
						</Form>
						<GroupBtn>
							<Button
								variant="secondary"
								onClick={() =>
									setIsOpenAddMember((pre) => !pre)
								}
							>
								Đóng
							</Button>
							<Button variant="primary" onClick={addMemberTable}>
								Thêm thành viên
							</Button>
						</GroupBtn>
					</InputAddMemeber>
				)}
				<Item onClick={() => setIsOpenDashboardTable(true)}>
					<PieChart className="icon_menu" />
					Thống kê
				</Item>
				<DashBoardTable
					show={isOpenDashboardTable}
					handleClose={handleClose}
					table={table}
					numTodo={cardToDo.length}
					numDoing={cardDoing.length}
					numReview={cardReview.length}
					numDone={cardDone.length}
					memberInfor={memberInfor}
					cards={cards}
				/>
			</NavBarTable>
			<ColumnContainer>
				<Column>
					<ColumnTitle>Cần làm</ColumnTitle>
					<ColumnBody>
						{cardToDo &&
							cardToDo.map((c, index) => (
								<Card
									key={index}
									c={c}
									memberTable={memberTable}
								/>
							))}
						{!isOpenAddCard && (
							<AddCard
								onClick={() => setIsOpenAddCard((pre) => !pre)}
							>
								<Add />
								Thêm thẻ
							</AddCard>
						)}
						{isOpenAddCard && (
							<InputAddCard>
								<Form>
									<Form.Control
										type="text"
										name="name"
										placeholder="Nhập tên thẻ"
										value={cardData.name}
										onChange={onChangeData}
									/>
								</Form>
								<GroupBtn>
									<Button
										variant="secondary"
										onClick={() =>
											setIsOpenAddCard((pre) => !pre)
										}
									>
										Đóng
									</Button>
									<label>
										<AttachFileRoundedIcon className="icon-option" />
										<input
											type="file"
											name="fileCard"
											accept=".csv"
											onChange={handleFileCSV}
											className="filecsv"
										/>
									</label>

									<Button variant="primary" onClick={create}>
										Thêm Thẻ
									</Button>
								</GroupBtn>
							</InputAddCard>
						)}
					</ColumnBody>
				</Column>
				<Column>
					<ColumnTitle>Đang làm</ColumnTitle>
					<ColumnBody>
						{cardDoing &&
							cardDoing.map((c, index) => (
								<Card
									key={index}
									c={c}
									memberTable={memberTable}
								/>
							))}
					</ColumnBody>
				</Column>
				<Column>
					<ColumnTitle>Cần Kiểm tra</ColumnTitle>
					<ColumnBody>
						{cardReview &&
							cardReview.map((c, index) => (
								<Card
									key={index}
									c={c}
									memberTable={memberTable}
								/>
							))}
					</ColumnBody>
				</Column>
				<Column>
					<ColumnTitle>Đã hoàn thành</ColumnTitle>
					<ColumnBody>
						{cardDone &&
							cardDone.map((c, index) => (
								<Card
									key={index}
									c={c}
									memberTable={memberTable}
								/>
							))}
					</ColumnBody>
				</Column>
			</ColumnContainer>
			{isOpenChat ? (
				<ChatGroup
					handleClose={() => setIsOpenChat(false)}
					tableId={table._id}
					user={user}
					memberInfor={memberInfor}
				/>
			) : (
				<MarkChatUnreadRoundedIcon
					className="icon_chat"
					onClick={() => setIsOpenChat(true)}
				/>
			)}
		</Container>
	)
}

export default Table
