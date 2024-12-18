import ParallaxImage from "../components/parallax/ParallaxImage";
import ParallaxImageLeft from "../components/parallax/ParallaxImageLeft";
import TextReveal from "../components/parallax/ParallaxText";
import TextReveal2 from "../components/parallax/ParallaxText2";
import RotatingImage from "../components/parallax/RotatingImage";

function ButtonsPage() {
  return (
    <div className="flex w-full min-h-screen flex-col">
      <TextReveal text="Hi and Welcome" className="mt-10" className2="text-8xl"/>
      <TextReveal2 text="Hi and Welcome" className="mt-10" className2="text-8xl"/>
      <ParallaxImage
        imgSrc="https://pbs.twimg.com/media/GchiZZoaMAA3HXh.jpg:large"
        altText="Image de démonstration"
        className="h-96 w-full bg-zinc-800"
      />
      <ParallaxImageLeft
        imgSrc="https://pbs.twimg.com/media/GchiZZoaMAA3HXh.jpg:large"
        altText="Image de démonstration"
        className="h-96 w-full bg-zinc-800"
      />
      <RotatingImage
        imgSrc="https://pbs.twimg.com/media/GchiZZoaMAA3HXh.jpg:large"
        altText="Image de démonstration"
        className="h-96 w-full bg-zinc-800"
      />
    </div>
  );
}

export default ButtonsPage;
