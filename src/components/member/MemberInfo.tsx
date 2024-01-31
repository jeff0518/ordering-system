import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdCreate, IoIosSave } from "react-icons/io";

import SpendingRecordsCard from "./memberCard/SpendingRecordsCard";
import InfoCard from "./memberCard/InfoCard";
import MemberContext from "../../context/MemberContext";
import { Alert } from "../../utils/getSweetalert";
import style from "./MemberInfo.module.scss";

export interface SpendingRecordsProps {
  spendingId: string;
  date: string;
  point: number;
}

function MemberInfo() {
  const memberCtx = useContext(MemberContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!memberCtx) {
    Alert.fire({
      title: `${t("messages.phoneIncorrect")}`,
      icon: "error",
    });
    navigate("/member");
  }

  const { name, phoneNumber, count, point, spendingRecords } = memberCtx!.item;
  const [isSave, setSave] = useState(false);
  const [fixName, setFixName] = useState(phoneNumber);

  const sortSpendingRecords = spendingRecords.sort(function (a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    const dateComparison = dateA.getTime() - dateB.getTime();

    if (dateComparison === 0) {
      const idA = parseInt(a.spendingId.split("-")[2]);
      const idB = parseInt(b.spendingId.split("-")[2]);
      return idA - idB;
    }

    return dateComparison;
  });

  function clickButtonIconHandler() {
    setSave((prev) => !prev);
  }

  function uploadNameHandler() {}

  return (
    <div className={style.memberInfo_container}>
      <div className={style.info}>
        <div className={style.info__item}>
          <InfoCard fistText={t("text.phoneNumber")} lastText={phoneNumber} />
        </div>
        <div className={style.info__title}>
          {isSave ? (
            <InfoCard
              fistText={t("text.name")}
              lastText={fixName}
              readOnly={false}
              setFixName={setFixName}
            />
          ) : (
            <InfoCard
              fistText={t("text.name")}
              lastText={name ? name : fixName}
              readOnly={true}
            />
          )}

          <span className={style.icon} onClick={clickButtonIconHandler}>
            {isSave ? (
              <IoIosSave size={25} onClick={uploadNameHandler} />
            ) : (
              <IoMdCreate size={25} />
            )}
          </span>
        </div>
        <div className={style.info__item}>
          <InfoCard
            fistText={t("text.numberConsumptions")}
            lastText={count ? count : 0}
          />
        </div>
        <div className={style.info__item}>
          <InfoCard fistText={t("text.point")} lastText={point ? point : 0} />
        </div>
      </div>
      <div className={style.spendingRecords_info}>
        {sortSpendingRecords ? (
          <div className={style.title}>
            <SpendingRecordsCard
              time={t("text.date")}
              spend={t("text.point")}
            />
          </div>
        ) : null}

        {sortSpendingRecords ? (
          <div className={style.spendingBox}>
            {sortSpendingRecords.map((item: SpendingRecordsProps) => {
              return (
                <SpendingRecordsCard
                  key={item.spendingId}
                  time={item.date}
                  spend={item.point}
                />
              );
            })}
          </div>
        ) : (
          <div className={style.text}>{t("text.consumption")}</div>
        )}
      </div>
    </div>
  );
}
export default MemberInfo;
