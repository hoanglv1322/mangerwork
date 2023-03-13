import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import AuthContextProvider from './context/authContext'
import WorkPlaceContextProvider from './context/workPlaceContext'
import TableContextProvider from './context/tableContext'
import CardContextProvider from './context/cardContext'
import CommentContextProvider from './context/commentContext'
import MessagerContextProvider from './context/messagerContext'
import TaskContextProvider from './context/taskContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<WorkPlaceContextProvider>
				<TableContextProvider>
					<CardContextProvider>
						<CommentContextProvider>
							<MessagerContextProvider>
								<TaskContextProvider>
									<App />
								</TaskContextProvider>
							</MessagerContextProvider>
						</CommentContextProvider>
					</CardContextProvider>
				</TableContextProvider>
			</WorkPlaceContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
