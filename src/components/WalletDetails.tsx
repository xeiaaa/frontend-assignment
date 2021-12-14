import { useState, useEffect } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { formatEther } from "@ethersproject/units";
import axios from "axios";

// Hooks
import useAppStateContext from "../hooks/useAppStateContext";

const WalletDetails = () => {
  const { account, disconnect, library, chainId } = useAppStateContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<any>(null);
  const [symbol, setSymbol] = useState<string | null>(null);

  const getBalanceAndSymbol = async () => {
    try {
      // Get Chains List and FIND the chainId to get the Native currency symbol (ETH, BNB, etc...)
      const result = await axios.get("https://chainid.network/chains.json");
      const chain = result.data.find((data: any) => data.chainId === chainId);
      let symbol = null;
      if (chain) {
        symbol = chain.nativeCurrency.symbol;
      }

      // Get Current balance
      const balance = await library.eth.getBalance(account);
      return {
        symbol,
        balance,
      };
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const result: any = await getBalanceAndSymbol();
        setBalance(result.balance);
        setSymbol(result.symbol);
      } catch (err) {
        setBalance(null);
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    init();

    return () => {};
  }, [account, chainId]);

  const renderAccount = () => {
    return account === null
      ? "-"
      : account
      ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      : "";
  };

  const renderBalance = () => {
    if (loading) {
      return <Spinner animation="border" role="status" size="sm" />;
    } else {
      return balance ? `${formatEther(balance)} ${symbol}` : null;
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Wallet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 224 }}>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Account</th>
              <td>{renderAccount()}</td>
            </tr>
            <tr>
              <th>Chain ID</th>
              <td>{chainId}</td>
            </tr>
            <tr>
              <th>Balance</th>
              <td>{renderBalance()}</td>
            </tr>
          </tbody>
        </Table>

        <div className="d-grid gap-2">
          <Button
            variant="danger"
            onClick={() => {
              disconnect();
            }}
          >
            Disconnect
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default WalletDetails;
