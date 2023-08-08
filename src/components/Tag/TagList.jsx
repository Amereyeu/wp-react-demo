import { Link } from "react-router-dom";

function CategoryList({ tags }) {
  return (
    <div className="categorylist-wrap">
      <ul className="categorylist">
        <li className="categorylist__item">
          <Link className="categorylist__item__link" to="/">
            ALL
          </Link>
        </li>

        {tags.map((tag) => (
          <li className="categorylist__item" key={tag.id}>
            <Link
              className="categorylist__item__link"
              to={`/tag/${tag.id}`}>
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

