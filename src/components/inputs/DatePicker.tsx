import { useState, useEffect } from "react";

interface DatePickerProps {
  Month?: Date;
  onDateSelect: (date: Date) => void;
}

function DatePicker({ Month = new Date(), date = new Date(), onDateSelect }: DatePickerProps) {
  const [calendarDays, setCalendarDays] = useState<(Date | null)[][]>([]);
  const [monthName, setMonthName] = useState<string>("");

  useEffect(() => {
    const currentMonth = Month.getMonth();
    const currentYear = Month.getFullYear();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    setMonthName(monthNames[currentMonth]);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendar: (Date | null)[][] = [];
    let week: (Date | null)[] = Array(firstDayOfMonth).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      week.push(date);

      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      calendar.push(week);
    }

    setCalendarDays(calendar);
  }, [Month]);

  const handleDateClick = (date: Date | null) => {
    if (date) {
      onDateSelect(date);
    }
  };

  return (
    <>
      <h2 className="w-full h-10 text-2xl">{monthName}</h2>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday) => (
          <p key={weekday} className="text-center font-bold">{weekday}</p>
        ))}
        {calendarDays.flat().map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            className={`rounded-full w-10 h-10 flex-center hover:bg-white/15 trans-fast ${
              day ? "" : "invisible"
            }`}
          >
            {day ? day.getDate() : ""}
          </button>
        ))}
      </div>
    </>
  );
}

export default DatePicker;
