import React, {
  useState,
  useEffect
} from "react";
import axios from "axios";

const AdminPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });
  const [editingItem, setEditingItem] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [manageType, setManageType] = useState("menu"); // "menu" or "product"

  useEffect(() => {
    fetchMenuItems();
    fetchProducts();
  }, []);

  const fetchMenuItems = () => {
    axios.get("http://localhost:5000/api/foods")
      .then(response => setMenuItems(response.data))
      .catch(error => console.error("Error fetching menu items:", error));
  };

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  };

  const handleInputChange = (event) => {
    const {
      name,
      value
    } = event.target;
    if (manageType === "menu") {
      setNewMenuItem({
        ...newMenuItem,
        [name]: value
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (manageType === "menu") {
      if (editingItem) {
        axios.put(`http://localhost:5000/api/foods/${editingItem.id}`, newMenuItem)
          .then(response => {
            const updatedItems = menuItems.map(item => {
              if (item.id === response.data.id) {
                return response.data;
              }
              return item;
            });
            setMenuItems(updatedItems);
            setEditingItem(null);
            setNewMenuItem({
              name: "",
              description: "",
              price: "",
              image: ""
            });
          })
          .catch(error => console.error("Error editing menu item:", error));
      } else {
        axios.post("http://localhost:5000/api/foods", newMenuItem)
          .then(response => {
            setMenuItems([...menuItems, response.data]);
            setNewMenuItem({
              name: "",
              description: "",
              price: "",
              image: ""
            });
          })
          .catch(error => console.error("Error adding menu item:", error));
      }
    } else {
      if (editingProduct) {
        axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, newProduct)
          .then(response => {
            const updatedProducts = products.map(product => {
              if (product.id === response.data.id) {
                return response.data;
              }
              return product;
            });
            setProducts(updatedProducts);
            setEditingProduct(null);
            setNewProduct({
              name: "",
              description: "",
              price: "",
              image: ""
            });
          })
          .catch(error => console.error("Error editing product:", error));
      } else {
        axios.post("http://localhost:5000/api/products", newProduct)
          .then(response => {
            setProducts([...products, response.data]);
            setNewProduct({
              name: "",
              description: "",
              price: "",
              image: ""
            });
          })
          .catch(error => console.error("Error adding product:", error));
      }
    }
  };

  const handleEdit = (item, type) => {
    if (type === "menu") {
      setEditingItem(item);
      setNewMenuItem({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image
      });
    } else {
      setEditingProduct(item);
      setNewProduct({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image
      });
    }
  };

  const handleDelete = (itemId, type) => {
    const url = type === "menu" ? `http://localhost:5000/api/foods/${itemId}` : `http://localhost:5000/api/products/${itemId}`;
    axios.delete(url)
      .then(() => {
        if (type === "menu") {
          const updatedItems = menuItems.filter(item => item.id !== itemId);
          setMenuItems(updatedItems);
        } else {
          const updatedProducts = products.filter(product => product.id !== itemId);
          setProducts(updatedProducts);
        }
      })
      .catch(error => console.error(`Error deleting ${type} item:`, error));
  };

  return ( <
    section className = "admin-page" >
    <
    h1 className = "heading" > Admin Dashboard < /h1> <
    div className = "toggle-buttons" >
    <
    button onClick = {
      () => setManageType("menu")
    } > Manage Menu < /button> <
    button onClick = {
      () => setManageType("product")
    } >     Manage Products < /button> <
    /div> <
    form onSubmit = {
      handleSubmit
    } >
    <
    div className = "inputBox" >
    <
    input type = "text"
    name = "name"
    placeholder = "Name"
    value = {
      manageType === "menu" ? newMenuItem.name : newProduct.name
    }
    onChange = {
      handleInputChange
    }
    required /
    >
    <
    /div> <
    div className = "inputBox" >
    <
    input type = "text"
    name = "description"
    placeholder = "Description"
    value = {
      manageType === "menu" ? newMenuItem.description : newProduct.description
    }
    onChange = {
      handleInputChange
    }
    required /
    >
    <
    /div> <
    div className = "inputBox" >
    <
    input type = "number"
    name = "price"
    placeholder = "Price"
    value = {
      manageType === "menu" ? newMenuItem.price : newProduct.price
    }
    onChange = {
      handleInputChange
    }
    required /
    >
    <
    /div> <
    div className = "inputBox" >
    <
    input type = "text"
    name = "image"
    placeholder = "Image URL"
    value = {
      manageType === "menu" ? newMenuItem.image : newProduct.image
    }
    onChange = {
      handleInputChange
    }
    required /
    >
    <
    /div> <
    button type = "submit"
    className = "btn" > {
      editingItem || editingProduct ? "Edit Item" : "Add Item"
    } <
    /button> <
    /form> <
    div className = "items-list" > {
      manageType === "menu" ? (
        menuItems.map(item => ( <
          div key = {
            item.id
          }
          className = "item" >
          <
          img src = {
            item.image
          }
          alt = {
            item.name
          }
          /> <
          h2 > {
            item.name
          } < /h2> <
          p > {
            item.description
          } < /p> <
          p > Ksh {
            item.price.toFixed(2)
          } < /p> <
          div >
          <
          button className = "btn"
          onClick = {
            () => handleEdit(item, "menu")
          } > Edit < /button> <
          button className = "btn"
          onClick = {
            () => handleDelete(item.id, "menu")
          } > Delete < /button> <
          /div> <
          /div>
        ))
      ) : (
        products.map(product => ( <
          div key = {
            product.id
          }
          className = "item" >
          <
          img src = {
            product.image
          }
          alt = {
            product.name
          }
          /> <
          h2 > {
            product.name
          } < /h2> <
          p > {
            product.description
          } < /p> <
          p > Ksh {
            product.price.toFixed(2)
          } < /p> <
          div >
          <
          button className = "btn"
          onClick = {
            () => handleEdit(product, "product")
          } > Edit < /button> <
          button className = "btn"
          onClick = {
            () => handleDelete(product.id, "product")
          } > Delete < /button> <
          /div> <
          /div>
        ))
      )
    } <
    /div> <
    /section>
  );
};

export default AdminPage;
