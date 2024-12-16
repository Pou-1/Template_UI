import ParallaxImage from "../components/parallax/ParallaxImage";
import ParallaxImageLeft from "../components/parallax/ParallaxImageLeft";
import TextReveal from "../components/parallax/ParallaxText";

function ButtonsPage() {
  return (
    <div className="flex-center w-screen h-screen flex-col">
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
      <TextReveal text="Hi hiiiiiiiiiiiiiiiiiii" className="mt-10" className2="text-8xl"/>
    </div>
  );
}

export default ButtonsPage;
