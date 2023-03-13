import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'react-bootstrap'
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

const DashBoardTable = (props) => {
	const {
		show,
		handleClose,
		table,
		numTodo,
		numDoing,
		numReview,
		numDone,
		memberInfor,
		cards,
	} = props

	const [isOpenCardColumn, setIsOpenCardColumn] = useState(true)
	const [isOpenCardUser, setIsOpenCardUser] = useState(false)
	const [isOpenLabel, setIsOpenLabel] = useState(false)

	//data user card
	const [labels, setLabels] = useState([])
	const [data, setData] = useState([])
	const [backgroundColor, setBackgroundColor] = useState([])

	//data labels
	const [labels1, setLabels1] = useState([])
	const [data1, setData1] = useState([])
	const [backgroundColor1, setBackgroundColor1] = useState([])

	const listLabel = [
		{
			title: 'red',
			color: 'rgb(223, 29, 29)',
		},
		{
			title: 'green',
			color: 'rgb(54, 251, 0)',
		},
		{
			title: 'blue',
			color: 'rgb(55, 29, 223)',
		},
		{
			title: 'light blue',
			color: 'rgb(6, 190, 246)',
		},
		{
			title: 'pink',
			color: 'rgb(226, 6, 246)',
		},
		{
			title: 'light pink',
			color: 'rgb(246, 6, 198)',
		},
	]

	const cardDataColumn = {
		labels: ['Cần làm', 'Đang làm', 'Cần kiểm tra', 'Đã hoàn thành'],
		datasets: [
			{
				label: 'Tổng số thẻ',
				data: [numTodo, numDoing, numReview, numDone],
				backgroundColor: ['#0793b7', '#30e407', '#f419c1', '#e1101e'],
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	}

	useEffect(() => {
		let array1 = []
		let array2 = []
		let array3 = []
		memberInfor &&
			memberInfor.forEach((user) => {
				array1.push(user.username)
				array2.push(cards.filter((c) => c.member === user._id).length)
				array3.push(
					'#' + Math.floor(Math.random() * 16777215).toString(16)
				)
			})
		setLabels(array1)
		setData(array2)
		setBackgroundColor(array3)
	}, [memberInfor, cards])

	useEffect(() => {
		let array11 = []
		let array21 = []
		let array31 = []
		cards &&
			listLabel.forEach((lab) => {
				array11.push(lab.title)
				array21.push(
					cards.filter((c) => c.labels.includes(lab.color)).length
				)
				array31.push(lab.color)
			})
		setLabels1(array11)
		setData1(array21)
		setBackgroundColor1(array31)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cards])

	const cardDataUser = {
		labels,
		datasets: [
			{
				label: 'Tổng số thẻ đảm nhiệm',
				data,
				backgroundColor,
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	}

	const cardDataLabels = {
		labels: labels1,
		datasets: [
			{
				label: 'Tổng số thẻ mỗi nhãn',
				data: data1,
				backgroundColor: backgroundColor1,
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
			>{`Thống kê bảng làm việc ${table.name}`}</Modal.Header>
			<Modal.Body>
				<NavChart>
					<NavItem
						onClick={() => {
							setIsOpenCardColumn(true)
							setIsOpenCardUser(false)
							setIsOpenLabel(false)
						}}
						style={{
							backgroundColor: isOpenCardColumn
								? '#7d7a7a'
								: '#ccc',
							color: isOpenCardColumn ? '#ffffff' : '#343434',
						}}
					>
						Thống kê thẻ mỗi cột
					</NavItem>
					<NavItem
						onClick={() => {
							setIsOpenCardColumn(false)
							setIsOpenCardUser(true)
							setIsOpenLabel(false)
						}}
						style={{
							backgroundColor: isOpenCardUser
								? '#7d7a7a'
								: '#ccc',
							color: isOpenCardUser ? '#ffffff' : '#343434',
						}}
					>
						Thống kê thẻ mỗi thành viên
					</NavItem>
					<NavItem
						onClick={() => {
							setIsOpenCardColumn(false)
							setIsOpenCardUser(false)
							setIsOpenLabel(true)
						}}
						style={{
							backgroundColor: isOpenLabel ? '#7d7a7a' : '#ccc',
							color: isOpenLabel ? '#ffffff' : '#343434',
						}}
					>
						Thống kê thẻ mỗi nhãn
					</NavItem>
				</NavChart>
				<BodyChart>
					{isOpenCardColumn && (
						<>
							<ChartContainer>
								<Bar data={cardDataColumn} />
							</ChartContainer>
							<ChartContainer>
								<Line data={cardDataColumn} />
							</ChartContainer>
							<ChartContainer>
								<Pie data={cardDataColumn} />
							</ChartContainer>
							<ChartContainer>
								<PolarArea data={cardDataColumn} />
							</ChartContainer>
						</>
					)}
					{isOpenCardUser && (
						<>
							<ChartContainer>
								<Bar data={cardDataUser} />
							</ChartContainer>
							<ChartContainer>
								<Line data={cardDataUser} />
							</ChartContainer>
							<ChartContainer>
								<Pie data={cardDataUser} />
							</ChartContainer>
							<ChartContainer>
								<PolarArea data={cardDataUser} />
							</ChartContainer>
						</>
					)}
					{isOpenLabel && (
						<>
							<ChartContainer>
								<Bar data={cardDataLabels} />
							</ChartContainer>
							<ChartContainer>
								<Line data={cardDataLabels} />
							</ChartContainer>
							<ChartContainer>
								<Pie data={cardDataLabels} />
							</ChartContainer>
							<ChartContainer>
								<PolarArea data={cardDataLabels} />
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

export default DashBoardTable
