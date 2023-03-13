import React from 'react'
import styled from 'styled-components'
import BoardHome from '../components/BoardHome'
import Navbar from '../components/Navbar'

const Container = styled.div`
	height: 100%;
`

const BoardPage = () => {
	return (
		<Container>
			<Navbar />
			<BoardHome />
		</Container>
	)
}

export default BoardPage
