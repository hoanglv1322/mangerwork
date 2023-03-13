import { React, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import CreateTable from './CRUDTable'
import { Button, Form } from 'react-bootstrap'
import { AuthContext } from '../context/authContext'
import CreateWorkPlace from './CreateWorkPlace'
import {
	TableChart,
	Add,
	Group,
	Edit,
	StarOutline,
	AddToQueue,
	PieChart,
	Delete,
} from '@material-ui/icons'
import DashBoardWorkPlace from './DashBoardWorkPlace'

const MyTables = styled.div`
	margin-top: 32px;
`

const ListTables = styled.div`
	display: flex;
	flex-wrap: wrap;
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

	:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.2);
	}

	:hover .icon-star {
		display: block;
	}

	h1 {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 16px;
		color: #fff;
		font-weight: bold;
	}

	.icon-star {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: 24px;
		color: #fff;
		display: none;
	}
`

const NavBarMyTable = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
	position: relative;
`

const OptionNav = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px;
	height: 40px;
	line-height: 40px;
	margin-right: 10px;
	.icon-left {
		font-size: 16px;
	}
	:hover {
		background-color: #e4f0f6;
		cursor: pointer;
		border-radius: 5px;
	}
	h1 {
		font-size: 15px;
		font-weight: 300;
		margin-left: 10px;
		margin-bottom: 0;
	}
`

const InputAddMemeber = styled.div`
	position: absolute;
	padding: 16px;
	border-radius: 5px;
	background-color: #ffffff;
	bottom: 40px;
	left: 150px;
	z-index: 22;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const GroupBtn = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-top: 16px;
`

const Workplace = (props) => {
	const [myTables, setMyTable] = useState([])
	const [email, setEmail] = useState('')
	const [showDashboardWorkPlace, setDashboardWorkPlace] = useState(false)
	const {
		user,
		workPlace,
		tables,
		updateRecentlyTables,
		updateStatusTable,
		updateWorkPlace,
		deleteWorkPlace,
	} = props
	const [showBoxCreate, setShowBoxCreate] = useState(false)
	const [isOpenAddMember, setIsOpenAddMember] = useState(false)
	const [isOpenUpdate, setIsOpenUpdate] = useState(false)

	const {
		authState: { allUsers },
	} = useContext(AuthContext)

	//colse box create table
	const handleClose = () => {
		setShowBoxCreate(false)
	}

	useEffect(() => {
		setMyTable(tables.filter((t) => t.workPlaceId === workPlace._id))
	}, [workPlace._id, tables])

	const handleUpdateWorkPlace = async (e) => {
		e.preventDefault()
		const memberAdd = allUsers.find((user) => user.email === email)
		const workPlaceData = {
			id: workPlace._id,
			isAddMember: true,
			workPlaceInfor: {
				member: memberAdd._id,
			},
		}
		try {
			const res = await updateWorkPlace(workPlaceData)
			if (res.success) {
				setIsOpenAddMember((pre) => !pre)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteWorkplace = async () => {
		try {
			const res = await deleteWorkPlace(workPlace._id)
			if (res.success) {
				console.log(res)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<MyTables>
			<NavBarMyTable>
				<OptionNav>
					<AddToQueue className="icon-left" />
					<h1>{workPlace.name}</h1>
				</OptionNav>
				<OptionNav>
					<TableChart className="icon-left" />
					<h1> Bảng </h1>
				</OptionNav>
				<OptionNav onClick={() => setIsOpenUpdate(true)}>
					<Edit className="icon-left" />
					<h1> Chỉnh sửa </h1>
				</OptionNav>
				{user._id === workPlace.admin && (
					<OptionNav onClick={() => handleDeleteWorkplace(true)}>
						<Delete className="icon-left" />
						<h1> Xóa </h1>
					</OptionNav>
				)}
				<OptionNav
					id="title-add-member"
					onClick={() => setIsOpenAddMember((pre) => !pre)}
				>
					<Group className="icon-left" />
					<h1>Thành viên</h1>
				</OptionNav>
				{isOpenAddMember && (
					<InputAddMemeber>
						<Form>
							<Form.Label>
								Nhập email của thành viên tham gia không gian
								làm việc.
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
							<Button
								variant="primary"
								onClick={handleUpdateWorkPlace}
							>
								Thêm thành viên
							</Button>
						</GroupBtn>
					</InputAddMemeber>
				)}
				<OptionNav onClick={() => setDashboardWorkPlace(true)}>
					<PieChart className="icon-left" />
					<h1> Thống kê </h1>
				</OptionNav>
				<OptionNav onClick={() => setShowBoxCreate(true)}>
					<Add className="icon-left" />
					<h1> Tạo bảng mới </h1>
				</OptionNav>
			</NavBarMyTable>
			<ListTables>
				{myTables &&
					myTables.map((table, index) => (
						<Table
							key={index}
							style={{
								backgroundImage: table.background
									? 'url(' + table.background + ')'
									: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
							}}
						>
							<h1 id={table._id} onClick={updateRecentlyTables}>
								{table.name}
							</h1>
							<StarOutline
								className="icon-star"
								onClick={updateStatusTable}
								id={table._id}
							/>
						</Table>
					))}
			</ListTables>
			<CreateTable
				show={showBoxCreate}
				handleClose={handleClose}
				workPlaceId={workPlace._id}
			/>
			<DashBoardWorkPlace
				show={showDashboardWorkPlace}
				handleClose={() => setDashboardWorkPlace(false)}
				workPlace={workPlace}
				myTables={myTables}
			/>
			<CreateWorkPlace
				show={isOpenUpdate}
				handleClose={() => setIsOpenUpdate(false)}
				updateWorkPlace={updateWorkPlace}
				workPlace={workPlace}
			/>
		</MyTables>
	)
}

export default Workplace
