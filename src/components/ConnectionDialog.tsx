import { Button, Modal } from "react-bootstrap";

// Hooks
import useAppStateContext from "../../src/hooks/useAppStateContext";

const ConnectionDialog = () => {
  const { setModalShown, connect } = useAppStateContext();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Wallet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>Wallet not connected. Please click the "Connect" button below.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => connect()}>
          Connect
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setModalShown(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ConnectionDialog;
