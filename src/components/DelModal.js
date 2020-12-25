import React from 'react';
import { Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes
} from '@fortawesome/free-solid-svg-icons';

import './style/modallogin.css';
import bookApi from '../api/book.api';
import userApi from '../api/user.api';


const DelModal = (props) => {
    const dataType = props.dataType;
    const Del = () => {
        if(dataType === 'Books'){
            bookApi.del(props.id).then(() => {
                props.dataObj.data.splice(props.dataObj.indexDel, 1);
                props.closeDelModal();
                props.openMess('Book deleted.');

            });
        }
        if(dataType === 'Users'){
            userApi.del(props.id).then(() => {
                props.dataObj.data.splice(props.dataObj.indexDel, 1);
                props.closeDelModal();
                props.openMess('Book deleted.');

            });
        }
    }
    return(
        <div>
        <div className="overlay"></div>
        <Container className="login-form">
            <FontAwesomeIcon icon={faTimes} className="exit" onClick={props.closeDelModal} />
            
            <Row className="justify-content-center mt-3 mb-3">
                <h2>Do you want delete?</h2>
            </Row>
            <Row className="justify-content-center mb-3 class-del">
                <button className="m-3" onClick={Del}>Yes</button>
                <button className="m-3" onClick={props.closeDelModal}>No</button>
            </Row>
        </Container>
        </div>
        
    );
}
export default DelModal;