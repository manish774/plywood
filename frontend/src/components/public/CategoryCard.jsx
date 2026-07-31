import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { revealItem } from "../motionVariants";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <motion.article
      variants={revealItem}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className="ply-card"
      onClick={() => navigate(`/categories/${category._id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/categories/${category._id}`);
      }}
    >
      <div className="ply-card-edge ply-stripe" aria-hidden="true" />
      <div className="ply-card-body">
        {category.image && (
          <div className="ply-card-media">
            <img src={category.image} alt="" loading="lazy" />
          </div>
        )}
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <div className="ply-card-footer">
          <span className="ply-card-cta">Browse items &rarr;</span>
        </div>
      </div>
    </motion.article>
  );
}
