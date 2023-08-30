import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../gql/queries";

function CategoryList({ lg }) {
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES, {
    variables: {
      language: lg,
    },
  });

  if (loading) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div className="circle"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>Error loading categories!</p>
          </div>
        </div>
      </div>
    );
  }

  const categoriesFound = Boolean(data?.categories.nodes.length);

  if (!categoriesFound) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>No categories found.</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("cat:", data);

  return (
    <div className="categorylist-wrap">
      <ul className="categorylist">
        <li className="categorylist__item">
          <HashLink smooth className="categorylist__item__link" to="/#posts">
            ALL
          </HashLink>
        </li>

        {data.categories.nodes.map((category) => (
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

