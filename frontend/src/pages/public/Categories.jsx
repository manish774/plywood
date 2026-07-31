import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listCategories } from "../../api/categories";
import CategoryCard from "../../components/public/CategoryCard";
import { LoadingBlock, ErrorBlock, EmptyBlock } from "../../components/public/StateBlock";
import { staggerContainer } from "../../components/motionVariants";
import { getErrorMessage } from "../../utils/errors";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    listCategories()
      .then(setCategories)
      .catch((err) => setError(getErrorMessage(err, "Could not load categories.")));
  };

  useEffect(load, []);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Categories</h1>
          <p>Every family of sheet good we stock, grouped by what it's built for.</p>
        </div>
      </div>

      <div className="container section">
        {categories === null && !error && <LoadingBlock label="Loading categories..." />}
        {error && <ErrorBlock message={error} onRetry={load} />}
        {categories && categories.length === 0 && (
          <EmptyBlock title="No categories yet" message="Check back soon — the catalog is being stocked." />
        )}
        {categories && categories.length > 0 && (
          <motion.div
            className="card-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {categories.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
