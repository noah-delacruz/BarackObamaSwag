import React from 'react'
import barackObamaImage from './images/barackobama.png'
import barackObamaHandsImage from './images/barackobamahands.png'
import uziImage from './images/uzi.png'

export default function MainContent() {

    const [show, setShow] = React.useState(true)

    function handleClick() {
        console.log("clicked!")
        setShow(prevShow => !prevShow)
    }

    return (
        <div>
            <button onClick={handleClick}>click me</button>
            <div>
                <img className="base-image" src={barackObamaImage} />
                {show && <img className="overlay-image" src={uziImage} />}
                {/* <img className="overlay-image" src={uziImage} /> */}
                <img className="baseHands-image" src={barackObamaHandsImage} />
            </div>
        </div>
    )
}