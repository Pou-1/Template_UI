import { useState, useEffect } from "react";
import "../styles/buttonStyles.css";
import "../styles/border.css";
import DatePicker from "../components/inputs/DatePicker";

function ButtonsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [Months, setMonths] = useState<Date[]>([]);
  const [seePopup, setSeePopup] = useState<boolean>(false);

  const ShowHidePopup = () => {
    setSeePopup(!seePopup);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const previousMonthDate = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth() - 1,
      1
    );

    const nextMonthDate = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth() + 1,
      1
    );

    setMonths([previousMonthDate, currentMonthDate, nextMonthDate]);
  }, []);

  return (
    <div className="flex relative flex-col w-full h-screen">
      <input
        type="date"
        className="bg-white/20 shadow-md px-5 w-fit py-2 rounded-full"
        value={selectedDate.toISOString().slice(0, 10)}
        onClick={ShowHidePopup}
        readOnly
      />
      <div
        className={`anim-show bg-white/20 absolute top-[50px] flex flex-col gap-y-4 h-96 p-6 overflow-y-scroll  backdrop-blur-md rounded-md ${
          !seePopup && "hidden"
        }`}
      >
          <DatePicker Month={Months[0]} onDateSelect={setSelectedDate} />
          <DatePicker Month={Months[1]} onDateSelect={setSelectedDate} />
          <DatePicker Month={Months[2]} onDateSelect={setSelectedDate} />
      </div>
    </div>
  );
}

export default ButtonsPage;
