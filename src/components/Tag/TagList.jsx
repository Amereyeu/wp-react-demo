import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function CategoryList({ tags }) {
  return (
    <div className="categorylist-wrap">
      <ul className="categorylist">
        <li className="categorylist__item">
          <HashLink smooth className="categorylist__item__link" to="/#posts">
            ALL
          </HashLink>
        </li>

        {tags.map((tag) => (
          <li className="categorylist__item" key={tag.id}>
            <Link className="categorylist__item__link" to={`/tag/${tag.id}`}>
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

