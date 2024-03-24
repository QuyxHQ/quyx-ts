import React, { useEffect, useRef, useState } from "react";
import { useModal, useTheme } from "../..";
import { Logo, CloseIcon, EmptyIcon, ErrorIcon } from "../../icons";
import { Button, Card } from "../../helper-components";
import { useHelperProvider } from "../../providers/HelperProvider";
import { APP_URL } from "../../constants";
import { QuyxCard } from "@quyx/fetch";
import { useQuyxProvider } from "../../providers/QuyxProvider";
import { useIntersection } from "@mantine/hooks";

const ImportCardUI: React.FC<{}> = () => {
  const { closeModal } = useModal();
  const { isChangingCard, changeCard, listUserCards, isFetchingUserCard } = useHelperProvider();
  const theme = useTheme();
  const { filterSpam } = useQuyxProvider();

  const [cardId, setCardId] = useState<string>();
  const [cards, setCards] = useState<QuyxCard[]>();
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const lastCardRef = useRef<HTMLElement | null>(null);
  const { ref, entry } = useIntersection({ root: lastCardRef.current, threshold: 1 });

  useEffect(() => {
    if (entry?.isIntersecting) setPage((prev) => prev + 1);
  }, [entry]);

  async function fn() {
    if (cards && cards.length >= total) return;

    const resp = await listUserCards({ limit, page });
    if (resp) {
      setTotal(resp.data.pagination.total);
      setCards((prev) => (prev ? [...prev, ...resp.data.data] : resp.data.data));
    }
  }

  useEffect(() => {
    fn();
  }, [page]);

  return (
    <div className="import-card-ui">
      <div className="header d-flex w-100">
        <div className="brand d-flex">
          <h2 className="d-flex">
            <Logo />
            <hr />
            <span>Quyx</span>
          </h2>
        </div>

        <div onClick={closeModal}>
          <CloseIcon className="pointer" />
        </div>
      </div>

      <div className="title">
        <h2>Sync Card</h2>
        <p>Choose a profile card from a list of your profile cards to sync with this app</p>
      </div>

      {isFetchingUserCard ? (
        <div className="loading mb-2">
          <div className={`span-loader ${theme == "dark" ? "light" : "dark"}`} />
        </div>
      ) : !cards ? (
        <div className="error mb-2">
          <ErrorIcon />

          <h3>Oops! unable to fetch user cards at the moment</h3>
        </div>
      ) : cards.length > 0 ? (
        <React.Fragment>
          <div className="cards">
            {cards.map((card, i) => (
              <Card
                key={`card-${i}`}
                data={card}
                isSelected={cardId == card._id}
                onClick={() => {
                  if (filterSpam && card.isFlagged) return;
                  setCardId(card._id);
                }}
                ref={i === total - 1 ? ref : undefined}
              />
            ))}
          </div>

          <div>
            <Button
              className="basic-btn w-100 mb-1"
              disabled={isChangingCard || !cardId}
              onClick={() => changeCard(cardId!)}
            >
              {isFetchingUserCard ? (
                <div className="d-flex" style={{ gap: "1rem", justifyContent: "center" }}>
                  <span>Fetching cards..</span>
                  <span className={`span-loader ${theme}`} />
                </div>
              ) : isChangingCard ? (
                <span className={`span-loader ${theme}`} />
              ) : !cardId ? (
                "Select a card"
              ) : (
                "Link card"
              )}
            </Button>
            <Button children="Cancel" className="basic-cancel-btn w-100" onClick={closeModal} />
          </div>
        </React.Fragment>
      ) : (
        <div className="empty d-flex mb-2">
          <EmptyIcon color={theme == "light" ? "#ccc" : "#555"} />

          <p>
            You don't seem to have created any profile card yet! Click&nbsp;
            <a href={APP_URL} target="_blank">
              here
            </a>
            &nbsp;to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default ImportCardUI;
