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

  return (
    <div className={style.memberInfo_container}>
      <div className={style.info}>
        <div className={style.info__item}>
          <InfoCard fistText="會員手機" lastText={phoneNumber} />
        </div>
        <div className={style.info__title}>
          {isSave ? (
            <InfoCard
              fistText="姓名"
              lastText={fixName}
              readOnly={false}
              setFixName={setFixName}
            />
          ) : (
            <InfoCard
              fistText="姓名"
              lastText={name ? name : fixName}
              readOnly={true}
            />
          )}

          <span className={style.icon} onClick={clickButtonIconHandler}>
            {isSave ? <IoIosSave size={25} /> : <IoMdCreate size={25} />}
          </span>
        </div>
        <div className={style.info__item}>
          <InfoCard fistText="消費次數" lastText={count ? count : 0} />
        </div>
        <div className={style.info__item}>
          <InfoCard fistText="會員點數" lastText={point ? point : 0} />
        </div>
      </div>
      <div className={style.spendingRecords_info}>
        {sortSpendingRecords ? (
          <div className={style.title}>
            <SpendingRecordsCard time="消費日期" spend="會員點數" />
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
          <div className={style.text}>還沒有消費紀錄</div>
        )}
      </div>
    </div>
  );
}
export default MemberInfo;