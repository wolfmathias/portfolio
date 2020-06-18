import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'
import {GitHub, Twitter, Mail} from 'react-feather'

export default () => (
  <div>
    {/* <h2 className="taCenter">
      Follow us{' '}
      <a href="https://instagram.com/thrivegoldcoast/">@thrivegoldcoast</a>
    </h2> */}
    <br />
    {/* <InstagramFeed count="8" /> */}
    <footer className="footer">
      <div className="container taCenter ">
        <a className="footer-contact-item" href={`https://www.github.com/bigcatplichta`}>
          <GitHub /> github.com/bigcatplichta
        </a>
        <a className="footer-contact-item" href={`https://www.twitter.com/mattplichtawild`}>
          <Twitter /> @mattplichtawild
        </a>
        <a className="footer-contact-item" href={`mailto:mattplichtawild@gmail.com`}>
          <Mail /> mattplichtawild@gmail.com
        </a>
      </div>
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  </div>
)
