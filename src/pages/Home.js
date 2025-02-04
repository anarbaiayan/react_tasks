import React from 'react'

const Home = () => {
  return (
    <div>
      <main class="main" id="main">

        <section class="welcome">
          <div class="container">
            <h2 class="welcome__heading">React</h2>

            <div class="welcome__links">
              <a href="#!" class="link-primary">Button</a>
              <a href="#!" class="link">Button</a>
            </div>
          </div>
        </section>

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

      </main>

      <footer class="footer" id="contacts">
        <div class="footer__desc">
          <div class="container footer__desc-container">
            <div class="footer__about">
              <h4>about</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
                erat.</p>
            </div>

            <div class="footer__links">
              <h4>useful links</h4>
              <ul>
                <li><a href="#!">Phasellus gravida semper nisi</a></li>
                <li><a href="#!">Suspendisse nisl elit</a></li>
                <li><a href="#!">Dellentesque habitant morbi</a></li>
                <li><a href="#!">Etiam sollicitudin ipsum</a></li>
              </ul>
            </div>

            <div class="footer__social">
              <h4>social</h4>
              <ul>
                <li>
                  <img src="/assets/icon-tw.svg" alt="twitter" />
                    <a href="#!">Twitter</a>
                </li>
                <li>
                  <img src="/assets/icon-fb.svg" alt="facebook" />
                    <a href="#!">Facebook</a>
                </li>
                <li>
                  <img src="/assets/icon-pt.svg" alt="pinterest" />
                    <a href="#!">Pinterest</a>
                </li>
                <li>
                  <img src="/assets/icon-google.svg" alt="google" />
                    <a href="#!">Google</a>
                </li>
                <li>
                  <img src="/assets/icon-wb.svg" alt="webflow" />
                    <a href="#!">Webflow</a>
                </li>
              </ul>
            </div>


          </div>
        </div>

        <footer class="footer__copy">
          <div class="container">
            <p>Copyright Velocity Inc. Made in Webflow.</p>
          </div>
        </footer>
      </footer>
    </div>
  )
}

export default Home