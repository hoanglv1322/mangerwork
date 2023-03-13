import { React } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Card from './Card'

const InforCardLateDeadline = (props) => {
	const { listCard, handleClose, show } = props

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Danh sách thẻ chậm deadline</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{listCard &&
						listCard.map((c, index) => (
							<Card key={index} c={c} />
						))}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Đóng
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default InforCardLateDeadline
