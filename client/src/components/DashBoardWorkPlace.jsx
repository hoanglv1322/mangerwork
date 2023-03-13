import { React, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'react-bootstrap'
import { CardContext } from '../context/cardContext'
import { AuthContext } from '../context/authContext'
import { Bar, Line, Pie, PolarArea } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const ModalCustomer = styled(Modal)`
	.modal-content.modal-customer {
		background-color: #f4f5f7;
	}
	.dialog-customer {
		max-width: 900px;
	}
	.modal-body {
		display: flex;
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
const ChartContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 32px;
`
const NavChart = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const NavItem = styled.div`
	padding: 4px 8px;
	border-radius: 3px;
	:hover {
		cursor: pointer;
		background-color: #7d7a7a !important;
		color: #ffffff !important;
	}
	margin-right: 32px;
`

const BodyChart = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
`
const DashBoardWorkPlace = (props) => {
	const { show, handleClose, workPlace, myTables } = props
	const {
		cardState: { allCards },
	} = useContext(CardContext)

	const {
		authState: { allUsers },
	} = useContext(AuthContext)

	const [labels, setLabels] = useState([])
	const [data, setData] = useState([])
	const [backgroundColor, setBackgroundColor] = useState([])
	const [data1, setData1] = useState([])
	const [backgroundColor1, setBackgroundColor1] = useState([])
	const [labels3, setLabels3] = useState([])
	const [data3, setData3] = useState([])
	const [backgroundColor3, setBackgroundColor3] = useState([])
	const [openDashCard, setOpenDashCard] = useState(true)
	const [openDashUser, setOpenDashUser] = useState(false)
	const [openDashCardUser, setOpenDashCardUser] = useState(false)

	useEffect(() => {
		let array1 = []
		let array2 = []
		let array3 = []
		let array4 = []
		let array5 = []
		let array6 = []
		let array7 = []
		let array8 = []
		let arrayCardofTables = []
		myTables.forEach((table) => {
			array1.push(table.name)
			array2.push(allCards.filter((t) => t.tableId === table._id).length)
			array3.push('#' + Math.floor(Math.random() * 16777215).toString(16))
			array4.push(table.members.length + 1)
			array5.push('#' + Math.floor(Math.random() * 16777215).toString(16))

			let userAdmin = allUsers.find((u) => u._id === table.admin).email
			!array6.includes(userAdmin) && array6.push(userAdmin)
			arrayCardofTables.push({
				email: userAdmin,
				countCard: allCards.filter(
					(c) => c.member === table.admin && c.tableId === table._id
				).length,
			})
			table.members.forEach((userId) => {
				let emailUser = allUsers.find((u) => u._id === userId).email
				!array6.includes(emailUser) && array6.push(emailUser)

				arrayCardofTables.push({
					email: emailUser,
					countCard: allCards.filter(
						(c) => c.member === userId && c.tableId === table._id
					).length,
				})
			})
		})
		array6.forEach((emai) => {
			let cnt = 0
			arrayCardofTables.forEach((e) => {
				if (e.email === emai) {
					cnt += e.countCard
				}
			})
			array7.push(cnt)
			array8.push('#' + Math.floor(Math.random() * 16777215).toString(16))
		})
		setLabels(array1)
		setData(array2)
		setBackgroundColor(array3)
		setData1(array4)
		setBackgroundColor1(array5)
		setLabels3(array6)
		setData3(array7)
		setBackgroundColor3(array8)
	}, [allCards, allUsers, myTables])

	const cardData = {
		labels,
		datasets: [
			{
				label: 'Số thẻ công việc trong mỗi bảng công việc',
				data,
				backgroundColor,
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	}

	const userData = {
		labels,
		datasets: [
			{
				label: 'Số thành viên trong mỗi bảng công việc',
				data: data1,
				backgroundColor: backgroundColor1,
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	}

	const usercardData = {
		labels: labels3,
		datasets: [
			{
				label: 'Số thẻ của mỗi thành viên ',
				data: data3,
				backgroundColor: backgroundColor3,
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	}

	return (
		<ModalCustomer
			show={show}
			onHide={handleClose}
			contentClassName="modal-customer"
			dialogClassName="dialog-customer"
		>
			<Modal.Header
				closeButton
			>{`Thống kê không gian làm viêc ${workPlace.name}`}</Modal.Header>
			<Modal.Body>
				<NavChart>
					<NavItem
						onClick={() => {
							setOpenDashCard(true)
							setOpenDashUser(false)
							setOpenDashCardUser(false)
						}}
						style={{
							backgroundColor: openDashCard ? '#7d7a7a' : '#ccc',
							color: openDashCard ? '#ffffff' : '#343434',
						}}
					>
						Thống kê thẻ mỗi bảng
					</NavItem>
					<NavItem
						onClick={() => {
							setOpenDashCard(false)
							setOpenDashUser(true)
							setOpenDashCardUser(false)
						}}
						style={{
							backgroundColor: openDashUser ? '#7d7a7a' : '#ccc',
							color: openDashUser ? '#ffffff' : '#343434',
						}}
					>
						Thống kê thành viên mỗi bảng
					</NavItem>
					<NavItem
						onClick={() => {
							setOpenDashCard(false)
							setOpenDashUser(false)
							setOpenDashCardUser(true)
						}}
						style={{
							backgroundColor: openDashCardUser
								? '#7d7a7a'
								: '#ccc',
							color: openDashCardUser ? '#ffffff' : '#343434',
						}}
					>
						Thống kê thẻ mỗi thành viên
					</NavItem>
				</NavChart>
				<BodyChart>
					{openDashCard && (
						<>
							<ChartContainer>
								<Bar data={cardData} />
							</ChartContainer>
							<ChartContainer>
								<Line data={cardData} />
							</ChartContainer>
							<ChartContainer>
								<Pie data={cardData} />
							</ChartContainer>
							<ChartContainer>
								<PolarArea data={cardData} />
							</ChartContainer>
						</>
					)}
					{openDashUser && (
						<>
							<ChartContainer>
								<Bar data={userData} />
							</ChartContainer>
							<ChartContainer>
								<Line data={userData} />
							</ChartContainer>
							<ChartContainer>
								<Pie data={userData} />
							</ChartContainer>
							<ChartContainer>
								<PolarArea data={userData} />
							</ChartContainer>
						</>
					)}
					{openDashCardUser && (
						<>
							<ChartContainer>
								<Bar data={usercardData} />
							</ChartContainer>
							<ChartContainer>
								<Line data={usercardData} />
							</ChartContainer>
							<ChartContainer>
								<Pie data={usercardData} />
							</ChartContainer>
							<ChartContainer>
								<PolarArea data={usercardData} />
							</ChartContainer>
						</>
					)}
				</BodyChart>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Đóng
				</Button>
			</Modal.Footer>
		</ModalCustomer>
	)
}

export default DashBoardWorkPlace
