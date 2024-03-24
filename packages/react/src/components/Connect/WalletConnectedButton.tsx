import React from "react";
import { userImage } from "../../assets/images";
import { truncateAddress, useAddress, useBalance, useTheme } from "../..";

const WalletConnectedButton: React.FC<{}> = () => {
  const address = useAddress();
  const balance = useBalance();
  const theme = useTheme();

  return (
    <div className={`quyx connected-wallet-btn ${theme}`}>
      <div>
        <img src={userImage} />
      </div>
      <hr />
      <div>
        <h5>{address ? truncateAddress({ address }) : "-------"}</h5>
        <p>{balance ? balance : "--.--"} SOL</p>
      </div>
    </div>
  );
};

export default WalletConnectedButton;
