import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer