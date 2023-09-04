import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export function FeatureCard({ img }) {
  return (
    <Card className="rounded-2xl bg-transparent shadow-none">
      <CardBody className="px-24 md:px-0 text-center flex justify-center">
        <img className="w-[80vw] max-w-[80vw] md:w-[40vw] md:max-w-[40vw] lg:w-[20vw] lg:max-w-[20vw] xl:w-[16vw] xl:max-w-[16vw]" src={img} />
      </CardBody>
    </Card>
  );
}

FeatureCard.propTypes = {
  img: PropTypes.string,
};

FeatureCard.displayName = "/src/widgets/layout/feature-card.jsx";

export default FeatureCard;
