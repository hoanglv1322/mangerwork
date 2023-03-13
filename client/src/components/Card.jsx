import { React, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AccessTime, CheckBox } from '@material-ui/icons'
import CardInformation from './CardInformation'
import { AuthContext } from '../context/authContext'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { TaskContext } from '../context/taskContext'

const CardContainer = styled.div`
	width: 100%;
	align-items: center;
	justify-content: flex-start;
	padding: 8px;
	margin-bottom: 16px;
	border-radius: 3px;
	background-color: #ffffff;
	height: fit-content;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	cursor: pointer;
	:hover {
		background-color: #e2d8d8;
	}
`

const CardImage = styled.img`
	width: 100%;
`

const CardLabel = styled.div`
	display: flex;
	margin-top: 8px;
`
const CardLabelItem = styled.div`
	width: 50px;
	height: 10px;
	margin-right: 8px;
	background-color: #eb2f2f;
	border-radius: 2px;
`

const CardTitle = styled.div`
	margin-top: 8px;
`

const CardFooter = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	.icon_item {
		font-size: 18px;
		margin-right: 4px;
	}
`

const CardDeadline = styled.div`
	display: flex;
	align-items: center;
	font-size: 15px;
	margin-right: 16px;
`

const CardTask = styled.div`
	display: flex;
	align-items: center;
	font-size: 15px;
	margin-right: 16px;
`

const CardMember = styled.img`
	position: absolute;
	right: 4px;
	height: 32px;
	width: 32px;
	border-radius: 50%;
	border: 1px solid #ccc;
`

const Card = (props) => {
	const [show, setShow] = useState(false)
	const [listTodo, setListTodo] = useState([])
	const [deadline, setDeadline] = useState('')
	const handleClose = () => {
		setShow(false)
	}
	const [member, setMember] = useState({})
	const { c, memberTable } = props

	TimeAgo.addLocale(en)
	// Create formatter (English).
	const timeAgo = new TimeAgo('en-US')
	//get data context
	const {
		authState: { allUsers },
	} = useContext(AuthContext)

	const {
		taskState: { allTasks },
		getAllTask,
		updateTask,
	} = useContext(TaskContext)

	useEffect(() => {
		setMember(allUsers.find((u) => c.member === u._id))
		setListTodo(allTasks.filter((tasks) => tasks.cardId === c._id))
		setDeadline(timeAgo.format(new Date(c.deadline)))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [c, allUsers, allTasks])

	const updateTaskStatus = async (e) => {
		let taskId = e.target.id
		let taskDataUpdate = {
			id: taskId,
			inforTask: {
				isDone: !allTasks.find((t) => t._id === taskId).isDone,
			},
		}
		try {
			const res = await updateTask(taskDataUpdate)
			if (res.success) {
				getAllTask()
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<CardContainer
				onClick={() => setShow(true)}
				style={{
					borderBottom:
						deadline.includes('ago') && c.progress !== 'Done'
							? '5px solid #f00909'
							: 'none',
				}}
			>
				{memberTable && (
					<>
						<CardImage src={c.background} />
					</>
				)}

				<CardLabel>
					{c.labels &&
						c.labels.map((label, index) => (
							<CardLabelItem
								key={index}
								style={{
									backgroundColor: `${label}`,
								}}
							/>
						))}
				</CardLabel>
				<CardTitle>{c.name}</CardTitle>
				<CardFooter>
					{c.deadline && (
						<CardDeadline>
							<AccessTime className="icon_item" />
							{timeAgo.format(new Date(c.deadline))}
						</CardDeadline>
					)}
					<CardTask>
						<CheckBox className="icon_item" />
						{listTodo &&
							listTodo.filter((t) => t.isDone === true).length}
						/{listTodo.length}
					</CardTask>
					<CardMember src={member && member.avatar} />
				</CardFooter>
			</CardContainer>
			{memberTable && (
				<>
					<CardInformation
						show={show}
						handleCloseCardInfor={handleClose}
						card={c}
						memberTable={memberTable}
						listTodo={listTodo}
						updateTaskStatus={updateTaskStatus}
					/>
				</>
			)}
		</div>
	)
}

export default Card
