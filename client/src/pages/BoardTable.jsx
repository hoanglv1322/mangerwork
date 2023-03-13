import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

const Container = styled.div`
	height: 100%;
`

const BoardTable = () => {
	return (
		<Container>
			<Navbar />
			<Table />
		</Container>
	)
}

export default BoardTable
