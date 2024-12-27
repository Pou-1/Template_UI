import Button1 from "../components/buttons/Button1";
import Button2 from "../components/buttons/Button2";
import Button3 from "../components/buttons/Button3";
import Button4 from "../components/buttons/Button4";
import Button5 from "../components/buttons/Button5";
import Button6 from "../components/buttons/Button6";
import Button7 from "../components/buttons/Button7";
import Button8 from "../components/buttons/Button8";
import "../styles/buttonStyles.css";
import "../styles/border.css";

function ButtonsPage() {
  return (
    <div className="flex-center w-full h-screen flex-wrap gap-10">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />

      <div className="border-animation relative cursor-pointer rounded-md w-32 h-20 bg-secondary trans-fast"></div>

      <div className="border-style rounded-md relative mt-10 bg-red-400 h-32 w-1/2">
        <div>Brat Haj</div>
      </div>
    </div>
  );
}

export default ButtonsPage;
