import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import ReservationListPage from './pages/ReservationListPage/ReservationListPage';
import AddReservationPage from './pages/AddReservationPage/AddReservationPage';
import ViewReservationPage from './pages/ViewReservationPage/ViewReservationPage';
import GuestListPage from './pages/GuestListPage/GuestListPage';
import RoomListPage from './pages/RoomListPage/RoomListPage';
import AddGuestPage from './pages/AddGuestPage/AddGuestPage';
import SideBar from './components/SideBar/SideBar';

function App() {

  return (
    <>
      <BrowserRouter>
      <SideBar />
      <Routes>
            <Route path="/" element={<DashboardPage />} />

            <Route path="/reservations">
              <Route index element={<ReservationListPage />} />
              <Route path=":reservationID" element={<ViewReservationPage />} />
              <Route path="add" element={<AddReservationPage />} />
              <Route path="edit/:reservationID" element={<ViewReservationPage />} />
            </Route>

            <Route path="/guests">
              <Route index element={<GuestListPage />} />
              {/* <Route path=":guestID" element={<ViewGuestPage />} /> */}
              <Route path="add" element={<AddGuestPage />} />
              {/* <Route path="edit/:inventoryID" element={<InventoryFormPage />} /> */}
            </Route>

            <Route path="/rooms">
              <Route index element={<RoomListPage />} />
            </Route>
          </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
