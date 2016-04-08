import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/modal.styl'

function Modal() {
  return (
    <div styleName="modal">
      <div styleName="eventHeader">    
        <div className="six columns">
          <img src="http://columbiaspectator.com/sites/default/files/HomecomingFans_111015.jpg" />
        </div>
        <div className="six columns">
          <h6>Saturday, October 31, 2015 • 9:00pm</h6>
          <h5>Homecoming 2015</h5>
          <h6>Baker Athletics Complex</h6>
          <div className="row">
            <div className="six columns">
              <strong>Add to Calendar</strong>
            </div>
            <div className="six columns">
              <strong>Subscribe</strong>
              <p>
                <span className="tag">football</span><span className="tag">pep rally</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div styleName="eventDetails">
        <div className="eight columns">
          <h6>Event Details</h6>
          <p>
          Lorem ipsum dolor sit amet, id mei atqui libris minimum, eu cum falli consequat. Eu his quod dicant verear. Nihil theophrastus vix ad. Dico inimicus sit ea, utinam vocibus perpetua ut vel. Ei pri nibh mucius concludaturque, nisl nibh vivendo nam ea, munere numquam persequeris sed no.
          </p>
          <p>
          Ex sed volumus consulatu, ut ferri quaerendum vix, in elit minim accommodare vix. Eum ut dicant dictas aeterno. Et vis placerat rationibus adipiscing, vix quas ullum laoreet ex. Quo ea homero accusam, id eam stet graece, quo no simul rationibus. Vim doctus impedit reprimique ne. Nominavi adolescens vix at. In porro fuisset reformidans sed, cum ex porro iracundia dissentias.
          </p>
        </div>
        <div className="four columns">
        </div>
      </div>
    </div>
  )
}

export default CSSModules(Modal, styles)
