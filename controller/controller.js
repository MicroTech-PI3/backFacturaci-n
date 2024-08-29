import pool from "../db/database.js";

// Funcion de llamar a mis cartas de lista de deseos
export const getProducts = async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();
    console.log("iniciando la conexion");
    console.log(req.params.IdProduct);
    const rows = await conn.query(
      "SELECT * FROM PRODUCT WHERE ID=" +
        req.params.IdProduct +
        ";"
    );
    console.log(rows);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ status: "No se encontró el producto" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error en la base de datos" });
    console.log("Entre un error", err);
  } finally {
    if (conn) conn.end();
  }
};






//funcion de ingresar carrito a la DB
export const insertProductos = async (req, res) => {
  const products = req.body; // Asumiendo que req.body es un array de productos.
console.log(products)
  const query = "INSERT INTO `SOLD_ITEMS` (`ID`, `NAME`, `PRICE`, `DESCRIPTION`, `QUANTITY`, `CATEGORY_ID`, `SUPPLIER_ID`) VALUES ?";
  
  const values = products.map(product => [
      product.ID,
      product.NAME,
      product.PRICE,
      product.DESCRIPTION,
      product.QUANTITY,
      product.CATEGORY_ID,
      product.SUPPLIER_ID
  ]);

  try {
      const conn = await pool.getConnection();
      await conn.query(query, [values]);
      res.status(200).json({
          status: "Se realizó el registro de los productos"
      });
      conn.release();
  } catch (err) {
      console.error("Insertion error: ", err);
      res.status(500).json({
          status: "Hubo un error al registrar los productos",
          error: err.message
      });
  }
};


