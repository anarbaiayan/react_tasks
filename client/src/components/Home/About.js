import React from 'react'

const About = () => {
  return (
    <section class="about common-section">
      <div class="container">
        <div class="title-wrapper">
          <h3 class="title">what we do</h3>
          <p class="subtitle">This is some text inside of a div block.</p>
        </div>

        <div class="cards-wrapper">
          <div class="card">
            <img src="/assets/card-icon1.svg" alt="icon" />
            <h4>Graphic Design</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique.</p>
          </div>

          <div class="card">
            <img src="/assets/card-icon2.svg" alt="icon" />
            <h4>Awesome code</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique.</p>
          </div>

          <div class="card">
            <img src="/assets/card-icon3.svg" alt="icon" />
            <h4>free template</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About