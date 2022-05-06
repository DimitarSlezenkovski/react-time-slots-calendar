import React, { FC } from "react";
import classnames from "classnames";
import { DISABLED, SELECTED } from "../constants/timeslot";

interface TimeSlotProps {
  description: string;
  status: string;
  customClassNames?: string;
  onClick: Function;
  key: number;
}

const Timeslot: FC<TimeSlotProps> = (props) => {
  const { description, status, customClassNames, onClick } = props;

  const timeslotClassNames = classnames(
    {
      "tsc-timeslot": true,
      "tsc-timeslot--selected": status === SELECTED,
      "tsc-timeslot--disabled": status === DISABLED,
    },
    customClassNames
  );

  const onTimeslotClick = (e: any) => {
    e.preventDefault();
    if (status !== DISABLED) {
      onClick();
    }
  };

  return (
    <div className={timeslotClassNames} onClick={onTimeslotClick}>
      {description}
    </div>
  );
};

export default Timeslot;
