import React from 'react'
import Welcome from '../components/Welcome'
import Services from '../components/Services'
import About from '../components/About'
import Footer from '../components/Footer'

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