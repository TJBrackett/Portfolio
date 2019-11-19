import React from 'react'
import './Tech.css'

export function Tech(props) {
    return(
        <div className='techRow'>
        <img className={props.level} key={props.icon} src={props.icon} />
        </div>
    )
}