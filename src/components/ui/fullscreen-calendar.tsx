"use client";

import * as React from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  name: string;
  time: string;
  datetime: string;
}

interface CalendarData {
  day: Date;
  events: Event[];
}

interface FullScreenCalendarProps {
  data: CalendarData[];
  onDateSelect: (date: Date) => void;
}

export function FullScreenCalendar({ data, onDateSelect }: FullScreenCalendarProps) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = React.useState(today);
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    setCurrentMonth(format(add(firstDayCurrentMonth, { months: -1 }), "MMM-yyyy"));
  }

  function nextMonth() {
    setCurrentMonth(format(add(firstDayCurrentMonth, { months: 1 }), "MMM-yyyy"));
  }

  function goToToday() {
    setCurrentMonth(format(today, "MMM-yyyy"));
  }

  function handleDayClick(day: Date) {
    setSelectedDay(day);
    console.log("Selected Date in Child:", format(day, "yyyy-MM-dd"));
    onDateSelect(day);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex p-4 flex-row items-center justify-end lg:flex-none">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            {format(firstDayCurrentMonth, "MMMM, yyyy")}
          </h2>
          <div className="flex items-center gap-3">
            <Button onClick={previousMonth} variant="default" size="lg">
              <ChevronLeftIcon size={16} strokeWidth={2} />
            </Button>
            <Button onClick={nextMonth} variant="default" size="lg">
              <ChevronRightIcon size={16} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 border text-center text-xs font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="border-r py-2.5">
            {day}
          </div>
        ))}
      </div>

      <div className="grid w-full grid-cols-7 border-x">
        {days.map((day, dayIdx) => (
          <button
            key={dayIdx}
            onClick={() => handleDayClick(day)}
            className={cn(
              "flex h-14 flex-col border-b border-r px-3 py-2 hover:bg-primary/40 focus:z-10",
              isEqual(day, selectedDay) && "bg-primary text-primary-foreground",
              !isSameMonth(day, firstDayCurrentMonth) && "text-muted-foreground"
            )}
          >
            <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
          </button>
        ))}
      </div>
    </div>
  );
}
