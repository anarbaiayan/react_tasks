import React from 'react'

const Services = () => {
  return (
    <section class="services common-section common-section--dark">
      <div class="container">
        <div class="title-wrapper">
          <h3 class="title">services</h3>
          <p class="subtitle">Thi&nbsp; is some text inside of a div block.</p>
        </div>

        <div class="cards-wrapper">
          <div class="card">
            <img src="/assets/services1.jpg" alt="img" />
            <h4>SERVICES one</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse&nbsp;varius.</p>
            <a href="#!" class="link">Learn more</a>
          </div>

          <div class="card">
            <img src="/assets/services2.jpg" alt="img" />
            <h4>SERVICES one</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse&nbsp;varius.</p>
            <a href="#!" class="link">Learn more</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services