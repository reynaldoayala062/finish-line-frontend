import React from 'react'
import {useSpring, animated} from 'react-spring'
import anime from 'animejs';
import logo from './kisspng-finish-line-inc-gift-card-discounts-and-allowanc-finish-line-5ac2e843cada51.6585623915227228838309.png'


class Home extends React.Component {

    
    render() {
        return(
            <div className="home-container">
                <div className="home">
                    <div className="anime">  
                        <img src={logo} />
                        <br/>
                        <h4>Helping you achieve your goals one step at a time</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home 

