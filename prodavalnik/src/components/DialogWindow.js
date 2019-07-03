import React from 'react';
import ReactDOM from 'react-dom';

const DialogWindow = (props) => {
      return ReactDOM.createPortal(
            <div onClick={props.proceedAction} className="ui dimmer modals visible active">
                  <div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
                        <div className="content">{props.text}</div>
                        <div className="actions">
                              <button onClick={props.proceedAction} className="ui primary button">{props.primaryButtonText}</button>
                        </div>
                  </div>
            </div>,
            document.querySelector('#modal')
      );
};

export default DialogWindow;