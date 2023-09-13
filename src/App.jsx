import './App.css'
import Cities from './components/cities/Cities.jsx'
import Home from './components/home/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/nav/Nav.jsx'
import Footer from './components/footer/Footer.jsx'
import Details from './components/details/Details.jsx'
import Activity from './components/activity/Activity.jsx'
import SignIn from './components/signIn/SignIn'
import SingUp from './components/signUp/SignUp'







function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/details/:_id/:itineratyID" element={<Details />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/users/login" element={<SignIn />} />
        <Route path="/users" element={<SingUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
