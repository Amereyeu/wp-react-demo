import { Link } from "react-router-dom";

function CategoryList({ categories }) {
  return (
    <div className="categorylist-wrap">
      <ul className="categorylist">
        {categories.map((category) => (
          <li className="categorylist__item" key={category.id}>
            <Link className="categorylist__item__link" to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

