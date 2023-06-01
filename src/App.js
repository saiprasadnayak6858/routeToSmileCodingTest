import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  //  I did not use redux as setting it up would be a huge task and also I'm not very familiar with it. Also I don't think it is required for the task given and hence I went with native state management using useState hook
  const [products, setProducts] = useState([]);
  const [selectedProductForUpdation, setSelectedProductForUpdation] = useState(
    null
  );
  const [newProduct, setNewProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);

  // fetch products from dummy url api
  const fetchProducts = async () => {
    const url = "https://dummyjson.com/products";
    try {
      const { data } = await axios.get(url);
      console.log(data);
      setProducts(data.products);
      setSelectedProductForUpdation(data.products[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // function to delete a product from the list
  const handleDeleteProduct = async (productId) => {
    const productsAfterDeletion = products.filter(
      (product) => product.id !== productId
    );
    setProducts(productsAfterDeletion);
  };

  // function to add a new product to the list of products
  const addNewProduct = async () => {
    const { title, description, price } = newProduct;
    setProducts((prev) => [
      ...prev,
      { id: prev.length + 1, title, description, price }
    ]);
  };

  // function to update information of the selected product
  const updateProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "left", marginBottom: "4rem" }}>
        Product listings:{" "}
      </h1>
      <table>
        <thead>
          <tr>
            <td style={{ fontWeight: "bold", fontSize: "1.2rem" }}>id</td>
            <td style={{ fontWeight: "bold", fontSize: "1.2rem" }}>image</td>
            <td style={{ fontWeight: "bold", fontSize: "1.2rem" }}>title</td>
            <td style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              description
            </td>
            <td style={{ fontWeight: "bold", fontSize: "1.2rem" }}>price</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ height: "4rem", width: "4rem" }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "0.4rem",
                    border: "none",
                    padding: "0.5rem",
                    cursor: "pointer"
                  }}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  delete
                </button>
              </td>
              <td>
                <button
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    borderRadius: "0.4rem",
                    border: "none",
                    padding: "0.5rem",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    console.log("hi");
                    setSelectedProductForUpdation(product);
                    setUpdatedProduct({
                      ...selectedProductForUpdation,
                      id: product.id
                    });
                  }}
                >
                  update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* form to add a new product to the list */}
      <div style={{ marginTop: "3rem" }}>
        <h2>add new product form</h2>
        <form>
          <input
            type="text"
            placeholder="title"
            style={{ marginRight: "1rem" }}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="description"
            style={{ marginRight: "1rem" }}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="price"
            style={{ marginRight: "1rem" }}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "0.4rem",
              border: "none",
              padding: "0.5rem",
              cursor: "pointer"
            }}
            onClick={addNewProduct}
          >
            add product
          </button>
        </form>
      </div>
      {/* form to update info for a selected product */}
      {selectedProductForUpdation && (
        <div style={{ marginTop: "3rem" }}>
          <h2>update product form</h2>
          <form>
            <input
              type="text"
              placeholder={selectedProductForUpdation.title}
              style={{ marginRight: "1rem" }}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder={selectedProductForUpdation.description}
              style={{ marginRight: "1rem" }}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  description: e.target.value
                })
              }
            />
            <input
              type="number"
              placeholder={selectedProductForUpdation.price}
              style={{ marginRight: "1rem" }}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
            />
            <button
              style={{
                backgroundColor: "orange",
                color: "white",
                borderRadius: "0.4rem",
                border: "none",
                padding: "0.5rem",
                cursor: "pointer"
              }}
              onClick={updateProduct}
            >
              update product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
