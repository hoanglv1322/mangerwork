import { React, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../context/authContext'
import { WorkPlaceContext } from '../context/workPlaceContext'
import { TableContext } from '../context/tableContext'
import UserInformation from './UserInformation'
import CreateWorkPlace from './CreateWorkPlace'
import { useNavigate } from 'react-router-dom'

import {
	ArrowDropDown,
	Menu,
	Search,
	NotificationsNone,
} from '@material-ui/icons'

const Container = styled.div`
	display: flex;
	position: fixed;
	width: 100%;
	height: 46px;
	line-height: 46px;
	background-color: #026aa7;
	z-index: 25;
`

const Left = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	width: 50%;
	justify-content: space-between;
	.btn_add_new {
		background-color: #2c4a75;
		padding: 0 12px;
		border-radius: 3px;
		height: 38px;
	}
`

const Right = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: right;
	position: relative;
`

const Item = styled.div`
	.icon_menu {
		font-size: 30px;
		color: #fff;
	}
	display: flex;
	align-items: center;
	color: #fff;
	cursor: pointer;
`
const SearchContainer = styled.div`
	margin-left: 32px;
	display: flex;
	background-color: #3588b9;
	height: 38px;
	align-items: center;
	padding: 0 8px;
	border-radius: 5px;
	margin-right: 32px;
`

const Input = styled.input`
	border: none;
	outline: none;
	padding: 5px;
	background-color: transparent;
	width: 90%;
	::placeholder {
		color: #fff;
	}
`

const Avatar = styled.img`
	border-radius: 50%;
	border: 1px solid #ffffff;
	width: 36px;
	height: 36px;
	cursor: pointer;
	object-fit: cover;
	margin: 0 32px;
	cursor: pointer;
`

const BoxInfor = styled.div`
	position: absolute;
	top: 46px;
	right: 8px;
	z-index: 10;
	display: ${(props) => (props.isOpenBoxUser === true ? 'block' : 'none')};
	align-items: center;
	justify-content: center;
	width: 160px;
	height: 100px;
	background-color: #ffffff;
	padding: 8px 0;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
		rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`

const BoxItem = styled.div`
	width: 100%;
	height: 46px;
	padding-left: 8px;
	color: #107c75;
	:hover {
		border-radius: 3px;
		cursor: pointer;
		background-color: #7ad4e2;
	}
`

const BoxShowResult = styled.div`
	position: absolute;
	width: fit-content;
	padding: 16px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
		rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
	height: fit-content;
	top: 46px;
	background-color: #ffffff;
	left: 25%;
	border-radius: 5px;
`

const Table = styled.div`
	width: 200px;
	height: 100px;
	border-radius: 5px;
	position: relative;
	margin-right: 16px;
	margin-bottom: 16px;
	background-repeat: no-repeat;
	background-size: cover;
	h1 {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 16px;
		color: #fff;
		font-weight: bold;
		cursor: pointer;
	}
`

const TableContainer = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ccc;
	margin-top: 4px;
`

const Infor = styled.div`
	h5 {
		font-size: 12px;
	}
`

const Navbar = () => {
	const [isOpenBoxUser, setIsOpenBoxUser] = useState(false)
	const [show, setShow] = useState(false)
	const [showBoxCreate, setShowBoxCreate] = useState(false)
	const [strSearch, setStrSearch] = useState('')
	const [listTableResult, setListTableResult] = useState([])
	const [listTableRecently, setListTableRecently] = useState([])
	const [listTableFavourite, setListTableFavourite] = useState([])
	const [isOpenRcently, setIsOpenRcently] = useState(false)
	const [isOpenFavourite, setIsOpenFavourite] = useState(false)

	//redrect to home
	const navigation = useNavigate()

	const handleClose = () => {
		setShow(false)
		setShowBoxCreate(false)
	}
	const handleShow = () => {
		setShow(true)
		setIsOpenBoxUser((pre) => !pre)
	}
	const handleShowBoxCreate = () => {
		setShowBoxCreate(true)
	}
	const {
		authState: { user, allUsers },
		updateUser,
		logoutUser,
		updateTableRecently,
	} = useContext(AuthContext)

	const { createWorkPlace } = useContext(WorkPlaceContext)

	const {
		tableState: { tables },
	} = useContext(TableContext)

	const {
		workPlaceState: { workPlaces },
	} = useContext(WorkPlaceContext)

	const logOut = async () => {
		try {
			const res = await logoutUser()
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}

	//update Recenty table
	useEffect(() => {
		setListTableRecently(
			tables.filter((t) => user.recentlyTables.includes(t._id))
		)
		setListTableFavourite(
			tables.filter((t) => user.favoriteTables.includes(t._id))
		)
	}, [tables, user.favoriteTables, user.recentlyTables])

	//update table recently
	const updateRecentlyTables = async (e) => {
		let tableId = e.target.id
		try {
			const res = await updateTableRecently(tableId)
			if (res.success) {
				setIsOpenRcently(false)
				setIsOpenFavourite(false)
				setListTableResult([])
				navigation(`/table/${tableId}`)
			}
		} catch (error) {
			console.error(error)
		}
	}

	//search table
	useEffect(() => {
		strSearch.length > 0
			? setListTableResult(
					tables.filter((t) =>
						t.name.toLowerCase().includes(strSearch)
					)
			  )
			: setListTableResult([])
	}, [strSearch, tables])

	return (
		<Container>
			<Left>
				<Item>
					<Menu
						className="icon_menu"
						onClick={() => navigation('/')}
					/>
					MW
				</Item>
				<Item>
					Các không gian làm việc
					<ArrowDropDown />
				</Item>
				<Item>
					Gần đây
					<ArrowDropDown
						onClick={() => setIsOpenRcently((pre) => !pre)}
					/>
				</Item>
				{isOpenRcently && listTableRecently.length > 0 && (
					<BoxShowResult>
						{listTableRecently.map((table, index) => (
							<TableContainer key={index}>
								<Table
									style={{
										backgroundImage: table.background
											? 'url(' + table.background + ')'
											: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
									}}
								>
									<h1
										id={table._id}
										onClick={updateRecentlyTables}
									>
										{table.name}
									</h1>
								</Table>
								<Infor>
									<h5>
										Thuộc không gian làm việc:{' '}
										{
											workPlaces.find(
												(w) =>
													w._id === table.workPlaceId
											).name
										}{' '}
									</h5>
									<h5>
										Quản lý bảng:{' '}
										{
											allUsers.find(
												(u) => u._id === table.admin
											).email
										}{' '}
									</h5>
									<h5>
										Số thành viên: {table.members.length}{' '}
									</h5>
									<h5>Phạm vi truy cập: {table.scope} </h5>
								</Infor>
							</TableContainer>
						))}
					</BoxShowResult>
				)}
				<Item>
					Đã dánh dấu sao
					<ArrowDropDown
						onClick={() => setIsOpenFavourite((pre) => !pre)}
					/>
				</Item>
				{isOpenFavourite && listTableFavourite.length > 0 && (
					<BoxShowResult>
						{listTableFavourite.map((table, index) => (
							<TableContainer key={index}>
								<Table
									style={{
										backgroundImage: table.background
											? 'url(' + table.background + ')'
											: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
									}}
								>
									<h1
										id={table._id}
										onClick={updateRecentlyTables}
									>
										{table.name}
									</h1>
								</Table>
								<Infor>
									<h5>
										Thuộc không gian làm việc:{' '}
										{
											workPlaces.find(
												(w) =>
													w._id === table.workPlaceId
											).name
										}{' '}
									</h5>
									<h5>
										Quản lý bảng:{' '}
										{
											allUsers.find(
												(u) => u._id === table.admin
											).email
										}{' '}
									</h5>
									<h5>
										Số thành viên: {table.members.length}{' '}
									</h5>
									<h5>Phạm vi truy cập: {table.scope} </h5>
								</Infor>
							</TableContainer>
						))}
					</BoxShowResult>
				)}
				<Item className="btn_add_new" onClick={handleShowBoxCreate}>
					Tạo mới
				</Item>
			</Left>
			<Right>
				<SearchContainer>
					<Search />
					<Input
						placeholder="Tìm kiếm"
						onChange={(e) => setStrSearch(e.target.value)}
					/>
				</SearchContainer>
				{listTableResult.length > 0 && (
					<BoxShowResult>
						{listTableResult.map((table, index) => (
							<TableContainer key={index}>
								<Table
									style={{
										backgroundImage: table.background
											? 'url(' + table.background + ')'
											: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
									}}
								>
									<h1
										id={table._id}
										onClick={updateRecentlyTables}
									>
										{table.name}
									</h1>
								</Table>
								<Infor>
									<h5>
										Thuộc không gian làm việc:{' '}
										{
											workPlaces.find(
												(w) =>
													w._id === table.workPlaceId
											).name
										}{' '}
									</h5>
									<h5>
										Quản lý bảng:{' '}
										{
											allUsers.find(
												(u) => u._id === table.admin
											).email
										}{' '}
									</h5>
									<h5>
										Số thành viên: {table.members.length}{' '}
									</h5>
									<h5>Phạm vi truy cập: {table.scope} </h5>
								</Infor>
							</TableContainer>
						))}
					</BoxShowResult>
				)}
				<Item>
					<NotificationsNone />
				</Item>
				<Item>
					<Avatar
						src={
							user.avatar
								? user.avatar
								: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
						}
						onClick={() => setIsOpenBoxUser((pre) => !pre)}
					/>
				</Item>
				<BoxInfor isOpenBoxUser={isOpenBoxUser}>
					<BoxItem onClick={handleShow}>Hồ sơ và Hiển thị</BoxItem>
					<BoxItem onClick={logOut}>Đăng xuất</BoxItem>
				</BoxInfor>
			</Right>
			<UserInformation
				show={show}
				handleClose={handleClose}
				user={user}
				updateUser={updateUser}
			/>
			<CreateWorkPlace
				show={showBoxCreate}
				handleClose={handleClose}
				createWorkPlace={createWorkPlace}
			/>
		</Container>
	)
}

export default Navbar
