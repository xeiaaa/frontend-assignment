import { Form } from "react-bootstrap";
import { AiOutlineSwap } from "react-icons/ai";

// Hooks
import useAppStateContext from "../hooks/useAppStateContext";
import { Currency } from "../hooks/useConverter";

const Converter = () => {
  const { currencies, handleChange } = useAppStateContext();

  return (
    <>
      <Form.Group className="mb-3" controlId="nep">
        <Form.Label>NEP</Form.Label>
        <Form.Control type="number" placeholder="0.00" value={currencies.nep} onChange={handleChange(Currency.nep)} />
      </Form.Group>
      <div className="absolute-center mb-3">
        <AiOutlineSwap fontSize={20} />
      </div>
      <Form.Group className="mb-3" controlId="nep">
        <Form.Label>BUSD</Form.Label>
        <Form.Control type="number" placeholder="0.00" value={currencies.busd} onChange={handleChange(Currency.busd)} />
      </Form.Group>
    </>
  );
};

export default Converter;
