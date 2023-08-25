import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function CategoryList({ categories }) {
  return (
    <div className="categorylist-wrap">
      <ul className="categorylist">
        <li className="categorylist__item">
          <HashLink smooth  className="categorylist__item__link" to="/#posts">
            ALL
          </HashLink>
        </li>

        {categories.nodes.map((category) => (
          <li className="categorylist__item" key={category.id}>
            <Link
              className="categorylist__item__link"
              to={`/category/${category.slug}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

