import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './pages/Home'



function App() {
  return (
    <div className="App min-h-screen w-full">
        <Header />
        <Home />
        <Footer/>
    </div>
  )
}

export default App