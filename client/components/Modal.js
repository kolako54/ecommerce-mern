import React, { useContext } from 'react'
import { deleteItem } from '../store/Actions';
import { DataContext } from '../store/GlobalState'

export default function Modal() {
    const { state, dispatch } = useContext(DataContext);
    console.log(state)
    const {modal} = state;
    console.log('Modal',modal);
    const handleSubmit = () => {
        console.log('this is modal', modal)
        dispatch(deleteItem(modal.data, modal.id, 'ADD_CARD'))
        dispatch({type: 'ADD_MODAL', payload: {}})

    }
    console.log(modal)
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-capitalize" id="exampleModalLabel">{modal?.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure?!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleSubmit}>Yes</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
