import { Modal } from "react-bootstrap";

// Hooks
import useAppStateContext from "../../src/hooks/useAppStateContext";
import ConnectionDialog from "./ConnectionDialog";

// Components
import WalletDetails from "./WalletDetails";

const ModalWalletDetails = () => {
  const { modalShown, setModalShown, active } = useAppStateContext();

  return (
    <Modal
      show={modalShown}
      onHide={() => {
        setModalShown(false);
      }}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
    >
      {!active ? <ConnectionDialog /> : <WalletDetails />}
    </Modal>
  );
};

export default ModalWalletDetails;
