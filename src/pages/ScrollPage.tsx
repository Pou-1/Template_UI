import "../styles/buttonStyles.css";
import "../styles/border.css";
import Scroll from "../components/inputs/Scroll";
import Colors from "../components/divs/Colors";

function ButtonsPage() {
  return (
    <div className="flex-center relative w-full h-screen flex-wrap gap-10">
      <div className="relative w-52 h-52 overflow-hidden rounded-xl border-3 grayscale hover:grayscale-0 hover:w-full hover:h-full trans-lessfast">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover scale-[10] hover:scale-100 trans-lessfast"
          src="img/Clem.jpg"
          alt="Image"
        />
      </div>
	  <Scroll/>
	  <Colors colors={["#bf28ba", "#32CD32", "#1E90FF", "#FFD700", "#5555"]}/>
    </div>
  );
}

export default ButtonsPage;
