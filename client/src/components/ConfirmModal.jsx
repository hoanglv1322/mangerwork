import { React } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ConfirmModal = (props) => {
	const { show, handleClose, title, content, deleteHandler } = props

	const handleButtonClick = async (e) => {
		e.preventDefault()
		try {
			deleteHandler()
			handleClose()
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{content}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Đóng
					</Button>
					<Button variant="primary" onClick={handleButtonClick}>
						Xác nhận
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ConfirmModal
