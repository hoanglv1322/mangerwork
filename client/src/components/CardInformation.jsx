import { React, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { format } from 'timeago.js'
import { Modal, Button, Form } from 'react-bootstrap'
import ConfirmModal from './ConfirmModal'
import { CardContext } from '../context/cardContext'
import { CommentContext } from '../context/commentContext'
import { AuthContext } from '../context/authContext'
import { TaskContext } from '../context/taskContext'
import {
	Subtitles,
	ViewColumn,
	Chat,
	AccountCircle,
	Bookmark,
	AccessTime,
	Image,
	Delete,
	Add,
	Clear,
	Favorite,
	Edit,
	Send,
	Done,
	CheckBox,
	CropSquare,
} from '@material-ui/icons'
import NextPlanRoundedIcon from '@mui/icons-material/NextPlanRounded'
import axios from 'axios'

const ModalCustomer = styled(Modal)`
	.modal-content.modal-customer {
		background-color: #f4f5f7;
	}
	.dialog-customer {
		max-width: 770px;
	}
	.modal-body {
		display: flex;
	}
	color: #4c627a;
`

const LeftModal = styled.div`
	flex: 9;
`
const ImgBackground = styled.div`
	margin-bottom: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		height: 200px;
		width: 80%;
		border-radius: 5px;
	}
`

const DisplayInfor = styled.div`
	margin-left: 20px;
	margin-bottom: 16px;
	color: #4c627a;
	h1 {
		font-size: 15px;
		font-weight: 300;
	}

	.list-label {
		display: flex;
		align-items: center;
	}
	.label {
		width: 40px;
		height: 30px;
		border-radius: 5px;
		margin-right: 10px;
	}
	.display-deadline {
		font-size: 16px;
		padding: 0 10px;
		width: fit-content;
		line-height: 36px;
		height: 36px;
		background-color: #eaecf0;
		border-radius: 5px;
	}
`

const RightModal = styled.div`
	flex: 3;
	.add_member_card {
		top: 150px;
	}
`

const Option = styled.div`
	display: flex;
	background-color: #eaecf0;
	margin-bottom: 10px;
	border-radius: 5px;
	padding: 5px;
	color: #6d9cac;
	align-items: center;
	cursor: pointer;
	position: relative;
	:hover {
		background-color: #d2d3d7;
	}
	.icon-option {
		margin-right: 10px;
		font-size: 20px;
	}

	.list-member {
		position: absolute;
		top: 36px;
		left: 0;
		width: 300px;
		height: fit-content;
		padding: 10px 20px;
		background: #fef9f9;
		z-index: 10;
		border-radius: 5px;
		h1 {
			font-size: 16px;
			text-align: center;
			padding-bottom: 10px;
			border-bottom: 1px solid #6c7ec0;
		}
		.clear-box-member {
			position: absolute;
			top: 5px;
			right: 5px;
			cursor: pointer;
		}
	}
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
const Label = styled.div`
	display: flex;
	align-items: center;
	margin: 10px 0;
	:first-child {
		margin-top: 15px;
	}
	span {
		width: 90%;
		height: 30px;
		border-radius: 5px;

		.tick-label {
			float: right;
		}
	}
	.edit-label {
		padding: 5px 10px;
		border-radius: 5px;
		:hover {
			background-color: #e6dfdf;
		}
	}

	.edit-label-icon {
		font-size: 16px;
	}
`
const InputAddMemeber = styled.div`
	position: absolute;
	padding: 8px;
	border-radius: 5px;
	background-color: #ffffff;
	top: 100px;
	z-index: 22;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	option {
		padding: 8px;
		margin-top: 8px;
	}
`

const Description = styled.div`
	.input-des {
		margin-left: 40px;
	}
	div {
		font-size: 18px;
		margin-bottom: 10px;
	}
`
const TodoList = styled.div`
	margin: 16px 0;
	div {
		font-size: 18px;
		margin-bottom: 10px;
	}
`

const Todo = styled.div`
	margin-left: 16px;
	display: flex;
	align-items: center;
	:hover {
		cursor: pointer;
	}
	.icon_todolist {
		margin-right: 16px;
		font-size: 18px;
		cursor: pointer;
	}
	span {
		font-size: 16px;
	}
`

const Title = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	input {
		width: 80%;
		margin-left: 10px;
		padding: 5px 10px;
		border: none;
		outline: none;
		height: 36px;
		line-height: 36px;
		background-color: transparent;
		:focus {
			background-color: #eaecf0;
			outline: 1px solid #4170c7;
			border-radius: 5px;
		}
	}
`

const Input = styled.textarea`
	border: none;
	outline: none;
	height: 65px;
	padding-left: 10px;
	padding-top: 10px;
	width: 90%;
	background-color: #eaecf0;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	color: #000;
	border-radius: 5px;
`

const CommentContainer = styled.div`
	div {
		font-size: 18px;
		margin-bottom: 10px;
	}
	.input-comment {
		height: 40px;
		background-color: #fff;
		font-size: 15px;
	}
`

const ShowCommentsContainer = styled.div`
	max-height: 280px;
	overflow-y: auto;
	&::-webkit-scrollbar {
		-webkit-appearance: none;
	}
	&::-webkit-scrollbar:vertical {
		width: 10px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #565555;
		border-radius: 3px;
	}
`

const ShowComments = styled.div`
	display: flex;
	align-items: flex-start;
	.head-comment {
		display: flex;
		margin-bottom: 0px;
		align-items: center;
	}

	.head-comment span:first-child {
		font-size: 16px;
		color: #2799af;
		font-weight: bold;
	}
	.head-comment span:last-child {
		font-size: 12px;
		margin-left: 10px;
	}
	.text-comment {
		font-size: 15px;
		padding: 5px 10px;
		border-radius: 5px;
		background-color: #fff;
	}

	.footer-comment {
		display: flex;
		align-items: center;
		.icon-comment {
			font-size: 15px;
			margin-right: 10px;
			cursor: pointer;
			color: #8096a6;
			:hover {
				color: #0e7d5a;
			}
		}
	}
`

const Comment = styled.div`
	display: flex;
	height: auto;
	.btn-add-comment {
		outline: none;
		border: none;
		cursor: pointer;
		background-color: transparent;
		margin-left: 10px;
		color: #0e66a5;
	}
`

const Avatar = styled.img`
	border-radius: 50%;
	width: 36px;
	height: 36px;
	margin-right: 4px;
	object-fit: cover;
	background-color: #329a1e;
`
const ButtonAdd = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	h1 {
		font-size: 16px;
		padding: 0 5px;
		background-color: #434fcf;
		color: #fff;
		margin-right: 10px;
		height: 35px;
		line-height: 35px;
		border-radius: 5px;
	}
	cursor: pointer;
`

const AddTask = styled.div`
	position: absolute;
	top: 40px;
	left: 16px;
	width: 300px;
	height: fit-content;
	padding-bottom: 24px;
	z-index: 25;
	background-color: #ffffff;
	border-radius: 5px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	.title-openAddTask {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px 0;
	}
	.lable-input-addTask {
		margin-left: 5%;
		margin-bottom: 8px;
		font-weight: bold;
	}
	.close-addTask {
		position: absolute;
		top: 4px;
		right: 8px;
	}
	input {
		outline: none;
		border: 1px solid #6b94d2;
		padding: 4px;
		border-radius: 4px;
		height: 46px;
		width: 90%;
		margin-left: 5%;
	}
	button {
		outline: none;
		border: none;
		margin-top: 16px;
		border-radius: 5px;
		cursor: pointer;
		padding: 8px 16px;
		margin-left: 5%;
		background-color: #1a33c0;
		color: #ffffff;
	}
`

const Process = styled.div`
	border: 1px solid #ccc;
	width: 100%;
	height: 14px;
	display: flex;
	align-items: center;
	h1 {
		font-size: 12px;
		margin: 0;
	}
	border-radius: 3px;
`

const Percent = styled.div`
	height: 14px;
	background-color: #15df3d;
	margin-bottom: 0 !important;
`

const CardInformation = (props) => {
	const PF = 'https://manager-work.onrender.com/images/'
	const {
		show,
		handleCloseCardInfor,
		card,
		memberTable,
		listTodo,
		updateTaskStatus,
	} = props
	const [showConfirmCard, setShowConfirmCard] = useState(false)
	const handleCloseConfirmCard = () => setShowConfirmCard(false)
	const [showConfirmComment, setShowConfirmComment] = useState(false)
	const handleCloseConfirmComment = () => setShowConfirmComment(false)
	const [isOpenBoxLabel, setIsOpenBoxLabel] = useState(false)
	const [isOpenAddLabel, setIsOpenAddLabel] = useState(false)
	const [isOpenNextProgress, setIsOpenNextProgress] = useState(false)
	const [isOpenAddMember, setIsOpenAddMember] = useState(false)
	const [isOpenAddTask, setIsOpenAddTask] = useState(false)
	const [comments, setComments] = useState([])
	const [commentText, setCommentText] = useState('')
	const [taskText, setTaskText] = useState('')
	const [commentId, setCommentId] = useState('')
	const [member, setMember] = useState({})
	const [formCard, setFormCard] = useState({
		name: card.name,
		description: card.description,
		lables: card.labels,
		member: card.member ? card.member : '',
		deadline: card.deadline,
		progress: card.progress,
	})
	const [labels, setLabels] = useState(card.labels ? card.labels : [])
	const [file, setFile] = useState(card.background)
	const [listUser, setListUser] = useState([])

	const listLabel = [
		'rgb(223, 29, 29)',
		'rgb(54, 251, 0)',
		'rgb(55, 29, 223)',
		'rgb(6, 190, 246)',
		'rgb(226, 6, 246)',
		'rgb(246, 6, 198)',
	]

	TimeAgo.addLocale(en)
	// Create formatter (English).
	const timeAgo = new TimeAgo('en-US')

	const handleClick = (e) => {
		if (e.target.className === 'title-add-label') {
			setIsOpenAddLabel(true)
		} else {
			setIsOpenAddLabel(false)
		}
	}

	const onChangeFormcard = (e) => {
		setFormCard({ ...formCard, [e.target.name]: e.target.value })
	}

	//use context
	const {
		commentState: { allComments },
		createComment,
		deleteComment,
		getAllComment,
	} = useContext(CommentContext)
	const { updateCard, deleteCard } = useContext(CardContext)
	const {
		authState: { user, allUsers },
	} = useContext(AuthContext)
	const { createTask, getAllTask } = useContext(TaskContext)

	useEffect(() => {
		setComments(
			allComments.filter((comment) => comment.cardId === card._id)
		)
		setListUser(allUsers.filter((u) => memberTable.includes(u._id)))
		setMember(allUsers.find((u) => card.member === u._id))
	}, [allComments, allUsers, card._id, card.member, memberTable])

	const updateCardHandle = async (e) => {
		e.preventDefault()
		if (file && file !== card.background) {
			const data = new FormData()
			const filename = Date.now() + file.name.replace(/ +/g, '')
			data.append('name', filename)
			data.append('file', file)
			formCard.background = PF + filename
			try {
				await axios.post('http://localhost:5000/api/upload', data)
			} catch (err) {}
		}
		formCard.labels = labels
		let cardData = {
			id: card._id,
			formCard,
		}
		try {
			const res = await updateCard(cardData)
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}

	const updateLabel = async (e) => {
		if (labels && labels.includes(e.target.style.backgroundColor)) {
			setLabels(
				labels.filter(
					(label) => label !== e.target.style.backgroundColor
				)
			)
		} else {
			setLabels([...labels, e.target.style.backgroundColor])
		}
	}

	const deleteCardHandler = async () => {
		try {
			const res = await deleteCard(card._id)
			if (res.success) {
				handleCloseCardInfor()
			}
		} catch (error) {
			console.error(error)
		}
	}

	const addComment = async () => {
		let commentData = {
			content: commentText,
			cardId: card._id,
			author: user._id,
			dateCreated: Date.now(),
		}
		try {
			const res = await createComment(commentData)
			if (res.success) {
				getAllComment()
				setCommentText('')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const deleteCommentHandler = async () => {
		try {
			const res = await deleteComment(commentId)
			if (res.success) {
				getAllComment()
			}
		} catch (error) {
			console.error(error)
		}
	}

	const addTask = async () => {
		let taskData = {
			content: taskText,
			cardId: card._id,
		}
		try {
			const res = await createTask(taskData)
			if (res.success) {
				getAllTask()
				setTaskText('')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<ModalCustomer
			show={show}
			onHide={handleCloseCardInfor}
			contentClassName="modal-customer"
			dialogClassName="dialog-customer"
		>
			<Modal.Header closeButton>
				<Title>
					<Subtitles />
					<input
						type="text"
						name="name"
						value={formCard.name}
						onChange={onChangeFormcard}
					/>
				</Title>
			</Modal.Header>
			<Modal.Body>
				<LeftModal>
					<ImgBackground>
						{file && (
							<img
								src={
									file === card.background
										? file
										: URL.createObjectURL(file)
								}
								alt="background-img"
							/>
						)}
					</ImgBackground>
					<DisplayInfor>
						{labels && labels.length > 0 && <h1>Nhãn</h1>}
						<div className="list-label">
							{labels &&
								labels.map((label, index) => (
									<div
										className="label"
										style={{
											backgroundColor: `${label}`,
										}}
										key={index}
									></div>
								))}
						</div>
					</DisplayInfor>
					{member && (
						<DisplayInfor>
							<h1>Thành viên thực hiện</h1>
							<div className="list-label">
								<Avatar
									src={member.avatar && member.avatar}
									alt="image-member"
									className="image-meber"
								/>
								{member.username}
							</div>
						</DisplayInfor>
					)}
					{card.deadline && (
						<DisplayInfor>
							<h1>Ngày hết hạn</h1>
							<div className="display-deadline">
								{timeAgo.format(new Date(formCard.deadline))}
							</div>
						</DisplayInfor>
					)}
					<Description>
						<div>
							<ViewColumn />
							Mô tả
						</div>
						<Input
							placeholder="Thêm mô tả chi tiết hơn..."
							className="input-des"
							name="description"
							value={formCard.description}
							onChange={onChangeFormcard}
						/>
					</Description>
					<TodoList>
						<div>
							<CheckBox />
							Việc cần làm
						</div>
						<Process>
							<Percent
								style={{
									width: `${
										(listTodo.filter(
											(t) => t.isDone === true
										).length /
											listTodo.length) *
										100
									}%`,
								}}
							/>
							<h1>
								{(listTodo.filter((t) => t.isDone === true)
									.length /
									listTodo.length) *
									100}
								%
							</h1>
						</Process>
						{listTodo &&
							listTodo.map((todo, index) => (
								<Todo
									key={index}
									onClick={(e) => updateTaskStatus(e)}
								>
									{todo.isDone ? (
										<CheckBox className="icon_todolist" />
									) : (
										<CropSquare className="icon_todolist" />
									)}
									<span
										id={todo._id}
										style={{
											textDecoration: `${
												todo.isDone
													? 'line-through'
													: 'none'
											}`,
										}}
									>
										{todo.content}
									</span>
								</Todo>
							))}
					</TodoList>
					<CommentContainer>
						<div>
							<Chat />
							Hoạt động
						</div>
						<Comment>
							<Avatar
								src={
									user.avatar
										? user.avatar
										: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
								}
							></Avatar>
							<Input
								placeholder="thêm bình luận chi tiêt.."
								className="input-comment"
								name="content"
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
							/>
							<button
								className="btn-add-comment"
								onClick={addComment}
							>
								<Send />
							</button>
						</Comment>
						<ShowCommentsContainer>
							{comments &&
								comments.map((comment, index) => (
									<ShowComments key={index}>
										<Avatar
											src={
												comment.author.avatar
													? comment.author.avatar
													: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
											}
										></Avatar>
										<div>
											<div className="head-comment">
												<span>
													{comment.author.username}
												</span>
												<span>
													{format(comment.createdAt)}
												</span>
											</div>
											<span className="text-comment">
												{comment.content}
											</span>
											<div className="footer-comment">
												<span>
													<Favorite className="icon-comment" />
												</span>
												{comment.author._id ===
													user._id && (
													<span>
														<Edit className="icon-comment" />
													</span>
												)}
												{comment.author._id ===
													user._id && (
													<span>
														<Delete
															className="icon-comment"
															onClick={() => {
																setCommentId(
																	comment._id
																)
																setShowConfirmComment(
																	true
																)
															}}
														/>
													</span>
												)}
											</div>
										</div>
									</ShowComments>
								))}
						</ShowCommentsContainer>
					</CommentContainer>
				</LeftModal>
				<RightModal>
					<p>Thêm vào thẻ</p>
					<Option
						onClick={() => setIsOpenNextProgress((pre) => !pre)}
					>
						<div>
							<NextPlanRoundedIcon className="icon-option" />
							Chuyển trạng thái
						</div>
					</Option>
					{isOpenNextProgress && (
						<InputAddMemeber>
							<Form>
								<Form.Select
									aria-label="Default select example"
									name="progress"
									value={formCard.progress}
									onChange={onChangeFormcard}
								>
									<option value="To do">Cần làm</option>
									<option value="Doing">Đang làm</option>
									<option value="Review">Cần kiểm tra</option>
									<option value="Done">Đã hoàn thành</option>
								</Form.Select>
							</Form>
						</InputAddMemeber>
					)}
					<Option onClick={() => setIsOpenAddMember((pre) => !pre)}>
						<div>
							<AccountCircle className="icon-option" />
							Thành viên
						</div>
					</Option>
					{isOpenAddMember && (
						<InputAddMemeber className="add_member_card">
							<Form>
								<Form.Select
									aria-label="Default select example"
									name="member"
									value={formCard.member}
									onChange={onChangeFormcard}
								>
									<option>Chọn thành viên</option>
									{listUser &&
										listUser.map((u, index) => (
											<option value={u._id} key={index}>
												{u.username}
											</option>
										))}
								</Form.Select>
							</Form>
						</InputAddMemeber>
					)}
					<Option>
						<div
							onClick={() =>
								setIsOpenBoxLabel((pre) => {
									return !pre
								})
							}
						>
							<Bookmark className="icon-option" />
							Nhãn
						</div>
						{isOpenBoxLabel && (
							<div className="list-member">
								<h1>Nhãn</h1>
								{listLabel &&
									listLabel.map((label, index) => (
										<Label key={index}>
											<span
												style={{
													backgroundColor: `${label}`,
												}}
												onClick={updateLabel}
											>
												{labels &&
													labels.includes(label) && (
														<Done className="tick-label" />
													)}
											</span>
											<div className="edit-label">
												<Edit className="edit-label-icon" />
											</div>
										</Label>
									))}

								{!isOpenAddLabel && (
									<div
										className="title-add-label"
										onClick={(e) => handleClick(e)}
									>
										<Add />
										Tạo nhãn mới
									</div>
								)}
								{isOpenAddLabel && (
									<div className="input-add-label">
										<Input
											placeholder="Nhập tên nhãn..."
											className="input-member"
										/>
										<ButtonAdd>
											<h1>Tạo nhãn mới</h1>
											<Clear
												onClick={(e) => handleClick(e)}
											/>
										</ButtonAdd>
									</div>
								)}
								<div
									className="clear-box-member"
									onClick={() =>
										setIsOpenBoxLabel((pre) => {
											return !pre
										})
									}
								>
									<Clear />
								</div>
							</div>
						)}
					</Option>
					<Option>
						<label>
							<AccessTime className="icon-option" />
							Thời gian
							<input
								type="date"
								onChange={onChangeFormcard}
								name="deadline"
							/>
						</label>
					</Option>
					<Option>
						<div onClick={() => setIsOpenAddTask((pre) => !pre)}>
							<CheckBox className="icon-option" />
							Việc cần làm
						</div>
						{isOpenAddTask && (
							<AddTask>
								<div className="title-openAddTask">
									Thêm việc cần làm
									<Clear
										className="close-addTask"
										onClick={() =>
											setIsOpenAddTask((pre) => !pre)
										}
									/>
								</div>
								<div className="lable-input-addTask">
									Tiêu đề
								</div>
								<input
									placeholder="Nhập tiêu đề..."
									value={taskText}
									onChange={(e) =>
										setTaskText(e.target.value)
									}
								/>
								<button onClick={addTask}> Thêm </button>
							</AddTask>
						)}
					</Option>
					<Option>
						<label>
							<Image className="icon-option" />
							<input
								type="file"
								onChange={(e) => setFile(e.target.files[0])}
								className="filetype"
							/>
							Ảnh bìa
						</label>
					</Option>
					<Option onClick={() => setShowConfirmCard(true)}>
						<Delete className="icon-option" />
						Xóa thẻ
					</Option>
				</RightModal>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseCardInfor}>
					Đóng
				</Button>
				<Button variant="primary" onClick={updateCardHandle}>
					Lưu thay đổi
				</Button>
			</Modal.Footer>
			<ConfirmModal
				show={showConfirmCard}
				handleClose={handleCloseConfirmCard}
				title={'Xóa thẻ công việc'}
				content={`Bạn có chắc chắn muốn xóa thẻ ${card.name}. Tất cả các thông tin trong thẻ cũng bị xóa.`}
				deleteHandler={deleteCardHandler}
			/>
			<ConfirmModal
				show={showConfirmComment}
				handleClose={handleCloseConfirmComment}
				title={'Xóa commnet '}
				content={`Bạn có chắc chắn muốn xóa commnet. Tất cả các thông tin của comment cũng bị xóa.`}
				deleteHandler={deleteCommentHandler}
			/>
		</ModalCustomer>
	)
}

export default CardInformation
