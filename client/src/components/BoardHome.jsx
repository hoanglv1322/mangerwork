import { React, useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../context/authContext'
import { WorkPlaceContext } from '../context/workPlaceContext'
import { TableContext } from '../context/tableContext'
import { useNavigate } from 'react-router-dom'
import Workplace from './Workplace'
import { CardContext } from '../context/cardContext'
import {
	TableChart,
	Add,
	StarOutline,
	AccessTime,
	Widgets,
	BlurLinear,
	ViewQuilt,
	AddToPhotos,
} from '@material-ui/icons'
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined'

const ContainerHome = styled.div`
	min-height: calc(100vh - 46px);
	display: flex;
	background-color: #fafbfc;
	position: relative;
	top: 46px;
`

const LeftHome = styled.div`
	margin-top: 40px;
	flex: 3;
	padding-left: 15%;
`
const LeftItem = styled.div`
	display: flex;
	height: 36px;
	line-height: 36px;
	align-items: center;
	padding: 10px;
	margin-bottom: 10px;
	color: #2a3d5c;
	margin-right: 20px;
	position: relative;
	:hover {
		background-color: #e4f0f6;
		cursor: pointer;
		border-radius: 5px;
	}
	h1 {
		font-size: 16px;
		font-weight: bold;
		margin-left: 10px;
		margin-bottom: 0;
	}
`

const RightHome = styled.div`
	flex: 9;
	margin-top: 40px;
`

const FavouriteTables = styled.div``

const RecentlyTables = styled.div`
	margin-top: 32px;
`

const InvitedTables = styled.div`
	margin-top: 32px;
`
const MyWorkPlace = styled.div`
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

const Title = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
	color: #2b7277;
	font-weight: bold;
	.icon-title {
		margin-right: 10px;
	}
`
const Process = styled.div`
	border: 1px solid #ccc;
	width: 100%;
	height: 8px;
	position: absolute;
	bottom: 0;
	display: flex;
	align-items: center;
`

const Percent = styled.div`
	height: 8px;
	background-color: #15df3d;
	margin-bottom: 0 !important;
`

const BoardHome = () => {
	//get data context
	const {
		workPlaceState: { workPlaces },
		updateWorkPlace,
		deleteWorkPlace,
	} = useContext(WorkPlaceContext)

	const {
		tableState: { tables },
	} = useContext(TableContext)

	const {
		authState: { user },
		updateTableFavourite,
		updateTableRecently,
		updateTableDislike,
	} = useContext(AuthContext)

	//useState
	const [myWorkPlace, setMyWorkPlace] = useState([])
	const [tableFavourites, setTableFavourites] = useState([])
	const [tableRecentlys, setTableRecentlys] = useState([])
	const [myTableInvites, setMyTableInvites] = useState([])

	//redrect to table view
	const navigation = useNavigate()

	//init data
	useEffect(() => {
		setMyWorkPlace(
			workPlaces.filter(
				(w) => w.admin === user._id || w.members.includes(user._id)
			)
		)
		user.favoriteTables &&
			setTableFavourites(
				tables.filter((t) => user.favoriteTables.includes(t._id))
			)
		user.recentlyTables &&
			setTableRecentlys(
				tables
					.filter((t) => user.recentlyTables.includes(t._id))
					.reverse()
			)
		setMyTableInvites(tables.filter((t) => t.members.includes(user._id)))
	}, [workPlaces, user, tables])

	//update table recently
	const updateRecentlyTables = async (e) => {
		let tableId = e.target.id
		try {
			const res = await updateTableRecently(tableId)
			if (res.success) {
				navigation(`/table/${tableId}`)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const {
		cardState: { allCards },
	} = useContext(CardContext)

	//update status table
	const updateStatusTable = async (e) => {
		let tableId = e.target.id
		try {
			const res = await updateTableFavourite(tableId)
			console.log(res)
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}

	//update status table dislike
	const updateStatusDisLikeTable = async (e) => {
		let tableId = e.target.id
		try {
			const res = await updateTableDislike(tableId)
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<ContainerHome>
			<LeftHome>
				<LeftItem>
					<TableChart />
					<h1> Bảng </h1>
				</LeftItem>
				<LeftItem>
					<Widgets />
					<h1> Mẫu </h1>
				</LeftItem>
				<LeftItem>
					<BlurLinear />
					<h1> Trang chủ </h1>
				</LeftItem>
				<LeftItem onClick={() => navigation('/blog')}>
					<NotesOutlinedIcon />
					<h1> Blog </h1>
				</LeftItem>
				<hr style={{ width: '200px' }} />
				<LeftItem>
					<Add />
					<h1> Các không gian làm việc </h1>
				</LeftItem>
				{myWorkPlace &&
					myWorkPlace.map((w, index) => (
						<LeftItem key={index}>
							<ViewQuilt />
							<h1>{w.name}</h1>
						</LeftItem>
					))}
			</LeftHome>
			<RightHome>
				<FavouriteTables>
					<Title>
						<StarOutline className="icon-title" />
						Bảng đã đánh dấu sao
					</Title>
					<ListTables>
						{tableFavourites &&
							tableFavourites.map((table, index) => (
								<Table
									key={index}
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
									<StarOutline
										className="icon-star"
										id={table._id}
										onClick={updateStatusDisLikeTable}
										style={{
											display: 'block',
											color: 'rgb(255,255,0)',
										}}
									/>
									<Process>
										<Percent
											style={{
												width: `${
													(
														allCards.filter(
															(c) =>
																c.tableId ===
																	table._id &&
																c.progress ===
																	'Done'
														).length /
														allCards.filter(
															(c) =>
																c.tableId ===
																table._id
														).length
													).toFixed(2) * 100
												}%`,
											}}
										/>
									</Process>
								</Table>
							))}
					</ListTables>
				</FavouriteTables>
				<RecentlyTables>
					<Title>
						<AccessTime className="icon-title" />
						Bảng đã xem gần đây
					</Title>
					<ListTables>
						{tableRecentlys &&
							tableRecentlys.map((table, index) => (
								<Table
									key={index}
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
									<StarOutline
										className="icon-star"
										id={table._id}
										onClick={updateStatusTable}
									/>
									<Process>
										<Percent
											style={{
												width: `${
													(
														allCards.filter(
															(c) =>
																c.tableId ===
																	table._id &&
																c.progress ===
																	'Done'
														).length /
														allCards.filter(
															(c) =>
																c.tableId ===
																table._id
														).length
													).toFixed(2) * 100
												}%`,
											}}
										/>
									</Process>
								</Table>
							))}
					</ListTables>
				</RecentlyTables>
				<InvitedTables>
					<Title>
						<AddToPhotos className="icon-title" />
						Các không gian làm việc khách
					</Title>
					<ListTables>
						{myTableInvites &&
							myTableInvites.map((table, index) => (
								<Table
									key={index}
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
									<StarOutline
										className="icon-star"
										id={table._id}
										onClick={updateStatusTable}
									/>
									<Process>
										<Percent
											style={{
												width: `${
													(
														allCards.filter(
															(c) =>
																c.tableId ===
																	table._id &&
																c.progress ===
																	'Done'
														).length /
														allCards.filter(
															(c) =>
																c.tableId ===
																table._id
														).length
													).toFixed(2) * 100
												}%`,
											}}
										/>
									</Process>
								</Table>
							))}
					</ListTables>
				</InvitedTables>
				<MyWorkPlace>
					<Title>
						<ViewQuilt className="icon-title" />
						Các không gian làm việc
					</Title>
					{myWorkPlace &&
						myWorkPlace.map((w, index) => (
							<Workplace
								key={index}
								workPlace={w}
								tables={tables}
								updateRecentlyTables={updateRecentlyTables}
								updateStatusTable={updateStatusTable}
								updateWorkPlace={updateWorkPlace}
								deleteWorkPlace={deleteWorkPlace}
								user={user}
							/>
						))}
				</MyWorkPlace>
			</RightHome>
		</ContainerHome>
	)
}

export default BoardHome
