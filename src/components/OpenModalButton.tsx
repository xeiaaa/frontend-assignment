import { Button } from "react-bootstrap";

// Hooks
import useAppStateContext from "../hooks/useAppStateContext";

const OpenModalButton = () => {

  const { setModalShown } = useAppStateContext();

  return (
    <div className="d-grid gap-2">
      <Button
        variant="primary"
        type="button"
        onClick={() => {
          setModalShown(true);
        }}
      >
        Check Wallet Details
      </Button>
    </div>
  );
};

export default OpenModalButton;
