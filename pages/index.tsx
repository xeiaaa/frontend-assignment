import type { NextPage } from "next";
import { Card, Container, Form } from "react-bootstrap";

// Components
import Converter from "../src/components/Converter";
import ModalWalletDetails from "../src/components/ModalWalletDetails";
import OpenModalButton from "../src/components/OpenModalButton";

const Home: NextPage = () => {
  return (
    <Container>
      <Card className="card-wrapper">
        <Card.Body>
          <Card.Title>Crypto Converter</Card.Title>

          <Form>
            <Converter />
            <OpenModalButton />
          </Form>
        </Card.Body>
      </Card>

      <ModalWalletDetails />
    </Container>
  );
};

export default Home;
