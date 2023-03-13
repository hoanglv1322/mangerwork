import { React, useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'
import {
	ArrowDropDown,
	LocalPhone,
	Videocam,
	Close,
	Send,
} from '@material-ui/icons'
import { MessagerContext } from '../context/messagerContext'

const Container = styled.div`
	position: absolute;
	bottom: 8px;
	right: 8px;
	max-height: 500px;
	width: 25%;
	min-width: 400px;
	background-color: #8991c4;
	border-radius: 5px;
	z-index: 25;
`

const NavBar = styled.div`
	position: relative;
	height: 45px;
	width: 100%;
	padding: 8px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-bottom: 1px solid #ccc;
`

const NavItem = styled.div`
	display: flex;
	align-items: center;
	color: #ffffff;
	cursor: pointer;
`

const BodyChat = styled.div`
	padding: 4px;
	padding-top: 16px;
	height: 400px;
	width: 100%;
	overflow-y: scroll;
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
	.other {
		float: left;
		justify-content: left;
	}
	.owner {
		float: right;
		justify-content: right;
	}
`

const Message = styled.div`
	display: flex;
	align-items: center;
	width: 80%;
	margin-bottom: 4px;
`

const Avatar = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	margin: 0 4px;
	border: 1px solid #ccc;
`

const ContentBox = styled.div`
	span {
		font-size: 12px;
		color: #e6ebee;
	}
`

const Content = styled.div`
	padding: 4px;
	display: flex;
	align-items: center;
	border-radius: 10px;
	color: #1474ab;
	background-color: #cbc4c4;
`

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	height: 45px;
	margin-bottom: 16px;
	.icon_btn {
		cursor: pointer;
		margin-left: 4px;
	}
`

const InputChat = styled.textarea`
	border: none;
	outline: none;
	padding: 4px;
	height: 45px;
	width: 80%;
	border-radius: 10px;
	background-color: #ffff;
`

const BoxMember = styled.div`
	position: absolute;
	padding: 16px;
	border-radius: 5px;
	background-color: #ffffff;
	top: 45px;
	left: 0;
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

const ChatGroup = (props) => {
	const { handleClose, tableId, user, memberInfor } = props
	const {
		messagerState: { allMessagers },
		createMessager,
	} = useContext(MessagerContext)
	const [listMessager, setListMessager] = useState([])
	const [contentMessager, setContentMessager] = useState('')
	const [isOpenBoxMember, setIsOpenBoxMember] = useState(false)

	const socket = useRef()
	const [arrivalMessage, setArrivalMessage] = useState(null)
	//realtime chat
	useEffect(() => {
		socket.current = io('ws://localhost:8900')
		socket.current.on('getMessage', (data) => {
			setArrivalMessage({
				author: data.author,
				content: data.content,
				tableId: data.tableId,
				createdAt: Date.now(),
			})
		})
	}, [])

	useEffect(() => {
		arrivalMessage &&
			tableId === arrivalMessage.tableId &&
			setListMessager((prev) => [...prev, arrivalMessage])
	}, [arrivalMessage, tableId])

	useEffect(() => {
		allMessagers &&
			setListMessager(allMessagers.filter((m) => m.tableId === tableId))
	}, [allMessagers, tableId])

	const addMessager = async () => {
		const messagerData = {
			content: contentMessager,
			tableId: tableId,
			author: user._id,
		}

		socket.current.emit('sendMessage', {
			author: user._id,
			tableId,
			content: contentMessager,
		})

		try {
			const res = await createMessager(messagerData)
			if (res.success) {
				setContentMessager('')
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<Container>
			<NavBar>
				<NavItem>
					{memberInfor.length}
					{' Thành viên'}
					<ArrowDropDown
						onClick={() => setIsOpenBoxMember((pre) => !pre)}
					/>
				</NavItem>
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
					</BoxMember>
				)}
				<NavItem>
					<LocalPhone />
				</NavItem>
				<NavItem>
					<Videocam />
				</NavItem>
				<NavItem>
					<Close onClick={handleClose} />
				</NavItem>
			</NavBar>
			<BodyChat>
				{listMessager &&
					listMessager.map((message, index) => (
						<Message
							className={
								message.author === user._id ? 'owner' : 'other'
							}
							key={index}
						>
							{message.author !== user._id && (
								<Avatar
									src={
										memberInfor.find(
											(u) => message.author === u._id
										).avatar
									}
								/>
							)}
							<ContentBox>
								<span>
									{format(new Date(message.createdAt))}
								</span>
								<Content>{message.content}</Content>
							</ContentBox>
						</Message>
					))}
			</BodyChat>
			<InputContainer>
				<Avatar src={user.avatar} />
				<InputChat
					placeholder="Nhập tin nhắn..."
					type="text"
					value={contentMessager}
					onChange={(e) => setContentMessager(e.target.value)}
				></InputChat>
				<Send className="icon_btn" onClick={addMessager} />
			</InputContainer>
		</Container>
	)
}

export default ChatGroup
