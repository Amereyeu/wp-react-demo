import Skeleton from "react-loading-skeleton";

function CakeSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="gallery__item">
        <Skeleton height={500} />
      </div>
    ));
}

export default CakeSkeleton;

