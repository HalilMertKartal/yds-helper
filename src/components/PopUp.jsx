import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormPopUp from './FormPopUp';
import 'bootstrap/dist/css/bootstrap.css';


function PopUp(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          OPTIONS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Select word categories that you want to practise on</h4>
            <br/>
            <FormPopUp />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default PopUp;