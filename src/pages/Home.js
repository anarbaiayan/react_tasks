import React from 'react'
import Welcome from '../components/Home/Welcome'
import Services from '../components/Home/Services'
import About from '../components/Home/About'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div>
      <main class="main" id="main">

        <Welcome />

        <About />

        <Services />

      </main>

      <Footer />
    </div>
  )
}

export default Home