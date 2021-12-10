import React from 'react'

export default function Toast({ msg, handleShow, bgColor }) {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{position: 'fixed', minWidth: '350px', zIndex: 10}}className={`toast show postition-absolute text-light ${bgColor}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`toast-header ${bgColor} text-light`}>
                    <strong className="mr-auto text-light">{msg.title}</strong>
                    <button type="button" style={{ outline: 'none' }} onClick={handleShow} className="ml-2 mb-1 close text-light" data-dismiss="toast" aria-label="Close">x
                    </button>
                </div>
                <div className="toast-body">
                    {msg.msg}
                </div>
            </div>
        </div>
    )
}
