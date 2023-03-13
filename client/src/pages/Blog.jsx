import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import PostHome from '../components/PostHome'

const Container = styled.div`
	height: 100%;
`

const Blog = () => {
	return (
		<Container>
			<Navbar />
			<PostHome />
		</Container>
	)
}

export default Blog
