import { QuyxCard } from "@quyx/fetch";
import React from "react";
import { useQuyxProvider } from "../../providers/QuyxProvider";

type Props = {
  data: QuyxCard;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  ref?: (element: any) => void;
};

const Card: React.FC<Props> = ({ data, isSelected, onClick, ref }) => {
  const { filterSpam } = useQuyxProvider();

  return (
    <div
      className={`card w-100 ${
        filterSpam && data.isFlagged ? "disabled" : isSelected ? "active" : ""
      }`}
      onClick={onClick}
      ref={ref}
    >
      <div className="w-100">
        <div>
          <img src={data.pfp} alt="" />
        </div>

        <div className="w-100">
          <h4>{data.username}</h4>
          <p>{data.bio}</p>
        </div>
      </div>

      {data.isForSale || data.isFlagged ? (
        <div style={{ gap: "0.3rem" }}>
          {data.isForSale ? <span className="blue">isForSale</span> : null}
          {data.isFlagged ? <span className="red">isFlagged</span> : null}
        </div>
      ) : null}
    </div>
  );
};

export default Card;
