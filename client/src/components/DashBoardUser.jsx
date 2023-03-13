import { React } from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'react-bootstrap'
import { Bar, Line, Pie, PolarArea } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const ModalCustomer = styled(Modal)`
	.modal-content.modal-customer {
		background-color: #f4f5f7;
	}
	.dialog-customer {
		max-width: 1000px;
	}
	.modal-body {
		display: flex;
		flex-wrap: wrap;
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
const DashBoardtUser = (props) => {
	const { show, handleClose, user, allCards } = props

	const userData = {
		labels: ['Cần làm', 'Đang làm', 'Cần kiểm tra', 'Đã hoàn thành'],
		datasets: [
			{
				label: `Số thẻ do (${user.email}) quản lý`,
				data: [
					allCards.filter(
						(c) => c.member === user._id && c.progress === 'To do'
					).length,
					allCards.filter(
						(c) => c.member === user._id && c.progress === 'Doing'
					).length,
					allCards.filter(
						(c) => c.member === user._id && c.progress === 'Review'
					).length,
					allCards.filter(
						(c) => c.member === user._id && c.progress === 'Done'
					).length,
				],
				backgroundColor: ['#0793b7', '#30e407', '#f419c1', '#e1101e'],
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
			>{`Thống kê công việc của thành viên ${user.username}(${user.email})`}</Modal.Header>
			<Modal.Body>
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
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Đóng
				</Button>
			</Modal.Footer>
		</ModalCustomer>
	)
}

export default DashBoardtUser
