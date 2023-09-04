import { featuresData } from "@/data";
import { FeatureCard } from "@/widgets/cards";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
export default function CharacterCarousel() {
  const items = featuresData.map(({ img }) => (
    <FeatureCard key={img} img={img} />
  ));
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };
  return (
    <section className="px-8 lg:px-24 xl:px-56 pt-4">
      <AliceCarousel
        mouseTracking
        items={items}
        paddingLeft={50}
        paddingRight={50}
        responsive={responsive}
      />
    </section>
  );
}
