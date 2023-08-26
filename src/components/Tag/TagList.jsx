import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function taglist({ tags }) {
  return (
    <div className="taglist-wrap">
      <ul className="taglist">
        <li className="taglist__item">
          <HashLink smooth className="taglist__item__link" to="/#posts">
            ALL
          </HashLink>
        </li>

        {tags.edges.map((tag) => (
          <li className="taglist__item" key={tag.node.id}>
            <Link className="taglist__item__link" to={`/tag/${tag.node.slug}`}>
              {tag.node.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default taglist;

