import React, { FC } from "react";
import classnames from "classnames";
import Timeslot from "./Timeslot";
import { DEFAULT, DISABLED, SELECTED } from "../constants/timeslot";
import {
  format,
  isBefore,
  isSameDay,
  isSameHour,
  isSameMonth,
  differenceInDays,
} from "date-fns";
import { getDaysBetweenDates } from "../util/helpers";

interface DayProps {
  renderTitle: Function;
  momentTime: {};
  timeslots: [];
  timeslotProps: {};
  selectedTimeslots: SelectedTimeslot[];
  disabledTimeslots: [];
  initialDate: Date;
  timeslotFormat: string;
  onTimeslotClick: Function;
}
type SelectedTimeslot = {
  startDate: string;
  endDate: string;
};

const Day: FC<DayProps> = (props) => {
  const dayClassNames = classnames({
    "tsc-day": true,
  });
  const renderTitle = () => {
    const { renderTitle, momentTime } = props;

    return (
      <div className="tsc-day__title">
        <span>{renderTitle(momentTime)}</span>
      </div>
    );
  };

  const renderTimeSlots = () => {
    const {
      timeslots,
      timeslotProps,
      selectedTimeslots,
      disabledTimeslots,
      momentTime,
      initialDate,
    } = props;

    return timeslots.map((slot: any[], index) => {
      let description = "";
      for (let i = 0; i < slot.length; i++) {
        description += format(slot[i], timeslotProps.format);
        if (i < slot.length - 1) {
          description += " - ";
        }
      }
      let timeslotDates = {
        startDate: format(slot[0], timeslotProps.format),
        endDate: format(slot[slot.length - 1], timeslotProps.format),
      };

      let status = DEFAULT;
      if (
        isBefore(initialDate, new Date(timeslotDates.startDate)) ||
        isSameDay(initialDate, new Date(timeslotDates.startDate))
      ) {
        status = DISABLED;
      }

      const isSelected = selectedTimeslots.some((selectedTimeslot) => {
        return timeslotDates.startDate.localeCompare(
          selectedTimeslot.startDate
        );
      });

      const isDisabled = disabledTimeslots.some((disabledTimeslot) => {
        return (
          disabledTimeslot.startDate.isBetween(
            timeslotDates.startDate,
            timeslotDates.endDate,
            null,
            "[)"
          ) ||
          disabledTimeslot.endDate.isBetween(
            timeslotDates.startDate,
            timeslotDates.endDate,
            null,
            "(]"
          )
        );
      });

      if (isDisabled) {
        status = DISABLED;
      } else if (isSelected) {
        status = SELECTED;
      }

      return (
        <Timeslot
          key={index}
          description={description}
          onClick={onTimeslotClick.bind(this, index)}
          status={status}
        />
      );
    });
  };
  const onTimeslotClick = (index) => {
    const { timeslots, timeslotFormat, momentTime, onTimeslotClick } = props;

    const timeslot = {
      startDate: momentTime.clone().add(timeslots[index][0], timeslotFormat),
      endDate: momentTime.clone().add(timeslots[index][1], timeslotFormat),
    };

    onTimeslotClick(timeslot);
  };
  return (
    <div className={dayClassNames}>
      {renderTitle()}
      {renderTimeSlots()}
    </div>
  );
};

export default Day;
