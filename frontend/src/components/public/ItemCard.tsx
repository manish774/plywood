import { useNavigate } from "react-router-dom";
import TiltCard from "./TiltCard";
import { revealItem } from "../motionVariants";
import { useLanguage } from "../../i18n/useLanguage";
import type { Item } from "../../types/models";

export default function ItemCard({ item }: { item: Item }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <TiltCard
      variants={revealItem}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className="ply-card"
      onClick={() => navigate(`/items/${item._id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/items/${item._id}`);
      }}
    >
      <div className="ply-card-edge ply-stripe" aria-hidden="true" />
      <div className="ply-card-body">
        {item.images?.[0] && (
          <div className="ply-card-media">
            <img src={item.images[0]} alt="" loading="lazy" />
          </div>
        )}
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="ply-card-footer">
          <span className="ply-card-cta">
            {item.specifications?.thickness
              ? `${item.specifications.thickness} ${t("common.perSheet")}`
              : t("common.viewDetails")}
          </span>
          {typeof item.price === "number" && (
            <span className="ply-card-price">₹{item.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
