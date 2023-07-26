import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const pagination = 10;
  const fetchProducts = () => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const fnNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const fnPreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  const fnPageClick = (index) => {
    setPage(index);
  };
  return (
    <>
      <div className="product">
        {products
          .slice(page * pagination, (page + 1) * pagination)
          .map((product, productId) => {
            return (
              <div key={productId} style={{ textAlign: "center" }}>
                <img src={product.thumbnail} alt={productId} className="img" />
                <div> {product.title}</div>
              </div>
            );
          })}
      </div>
      {/* <div className="footer">
        <p>{page}</p>
        <button disabled={page === 0 ? true : false}>
          <span className="lt" onClick={() => fnPreviousPage()}>
            &lt;{" "}
          </span>
        </button>
        <button disabled={page === pagination - 1 ? true : false}>
          <span className="gt" onClick={() => fnNextPage()}>
            &gt;
          </span>
        </button>
      </div> */}
      <div className="footer">
        <p>{page}</p>
        <button disabled={page === 0 ? true : false}>
          <span className="lt" onClick={() => fnPreviousPage()}>
            &lt;{" "}
          </span>
        </button>
        {new Array(pagination).fill(0).map((item, index) => {
          return (
            <button>
              <span className="gt" onClick={() => fnPageClick(index)}>
                {index + 1}
              </span>
            </button>
          );
        })}
        <button disabled={page === pagination - 1 ? true : false}>
          <span className="gt" onClick={() => fnNextPage()}>
            &gt;
          </span>
        </button>
      </div>
    </>
  );
}
