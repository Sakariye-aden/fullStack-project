import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import DashboardPage from './Pages/DashboardPage'
import TransactionPage from './Pages/TransactionPage'
import ReportPage from './Pages/ReportPage'
import AdminPage from './Pages/AdminPage'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import ProtectedAdmin from './components/Auth/ProtectedAdmin'
import HomeDashboard from './Pages/HomeDashboard'

function App() {
 

  return (
    <div>
        <Routes>
           <Route path='/login'element={<LoginPage />}/>
           <Route path='/register'element={<RegisterPage/>}/>
           <Route path='/dashboard' 
              element={
               <ProtectedRoute>
                 <DashboardPage/>
               </ProtectedRoute>
                }
              >
              <Route index element={<HomeDashboard/>} />
              <Route path='transactions' element={<TransactionPage/>}/>
              <Route path='report' element={<ReportPage/>}/>
               <Route path='admin' 
                element={ 
                  <ProtectedAdmin>
                    <AdminPage/>
                  </ProtectedAdmin>
                }   
               />
             </Route>
           <Route path='/' element={<Navigate to='/login'/>}/>
        </Routes>
    </div>
  )
}

export default App
