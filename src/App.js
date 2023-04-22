import react, { Suspense } from 'react'
import { HashRouter, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

import Config from './components/custom/Config'
import AppContent from './components/AppContent'
import NavBar from './components/nav/Navbar'

class App extends React.Component
{
	render() {
		return(
			<HashRouter>	
				<div className='mr-3 mt-2 rounded bg-white min-vh-100'>
					<NavBar />				
					<Suspense fallback={Config.loading}>
						<AppContent />
					</Suspense>
				</div>
			</HashRouter>
		)
	}
}

export default App