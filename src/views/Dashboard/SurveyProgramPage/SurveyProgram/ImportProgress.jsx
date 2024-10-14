import { Flex, Progress } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const ImportProgress = ({ importStatus, setFetchProgressId }) => {
  const [remainingTime, setRemainingTime] = useState();

  useEffect(() => {
    if (importStatus?.start_date == null) {
      setFetchProgressId(null);
    }

    let interval;
    if (importStatus.start_date && importStatus.predicted_end) {
      interval = setInterval(() => {
        calcRemainingTime();
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [importStatus]);

  const calcRemainingTime = () => {
    let now = moment();
    let end = moment(importStatus.predicted_end);

    let diff = moment(end).diff(now);

    if (diff <= 0) {
      return "0min0s";
    }

    let duration = moment.duration(diff);

    let min = Math.floor(duration.asMinutes());
    let sec = Math.floor(duration.asSeconds() % 60);

    setRemainingTime(`${min}min${sec}s`);
  };

  const calcProgress = (key) => {
    let val =
      (importStatus[key]?.current_row / importStatus[key]?.total_rows) * 100;

    return importStatus[key]?.current_row && importStatus[key]?.total_rows
      ? Math.round(val)
      : 0;
  };

  return (
    <Flex gap="small" vertical>
      <div>
        <p>{"DIVE_SITE_METADATA"}</p>
        <Progress percent={calcProgress("DIVE_SITE_METADATA")} />
      </div>
      <div>
        <p>{"BENTHIC_TAXAS"}</p>
        <Progress percent={calcProgress("BENTHIC_TAXAS")} />
      </div>
      <div>
        <p>{"MOTILE_TAXAS"}</p>
        <Progress percent={calcProgress("MOTILE_TAXAS")} />
      </div>
      <div>
        <p>{"BENTHIC_DB"}</p>
        <Progress percent={calcProgress("BENTHIC_DB")} />
      </div>
      <div>
        <p>{"MOTILE_DB"}</p>
        <Progress percent={calcProgress("MOTILE_DB")} />
      </div>
      Remaining:{" "}
      {importStatus?.predicted_end ? remainingTime : "Calculating..."}
    </Flex>
  );
};

export default ImportProgress;
