import React from 'react'

export default function Toast({ msg, handleShow, bgColor }) {
    return (
        <div className={`toast show postition-fixed text-light ${bgColor}`} style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '280px' }} role="alert" aria-live="assertive" aria-atomic="true">
            <div className={`toast-header ${bgColor} text-light`}>
                {/* <img src="..." className="rounded mr-2" alt="..."/> */}
                <strong className="mr-auto text-light">{msg.title}</strong>
                <button type="button" style={{ outline: 'none' }} onClick={handleShow} className="ml-2 mb-1 close text-light" data-dismiss="toast" aria-label="Close">x
                </button>
            </div>
            <div className="toast-body">
                {msg.msg}
            </div>
        </div>
    )
}
