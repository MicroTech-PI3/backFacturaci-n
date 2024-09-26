import axios from "axios";
import pool from "../db/database.js";
import https from "https";

// Funcion para llamar productos por ID
export const getProducts = async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();
    console.log("iniciando la conexion");
    const rows = await conn.query(
      "SELECT * FROM PRODUCT WHERE ID=" + req.params.IdProduct + ";"
    );
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

//funcion para insertar productos en el carrito de compras
export const insertProductos = async (req, res) => {
  let temp_ID = null;
  const products = req.body;
  const currentDate = new Date().toISOString().slice(0, 10);
  console.log(" ===================================");
  console.log(products.length);
  console.log(req.body);

  try {
    const conn = await pool.getConnection();
    const query =
      "INSERT INTO `SOLD_ITEMS` (`DATE`, `CUSTOMER_ID`, `EMPLOYEE_ID`) VALUES ( ?, ?, ?)";
    const values = [currentDate, 1, 1];
    await conn.query(query, values);

    //def id_carro
    const id_carro = await conn.query(
      "SELECT `ID` FROM `SOLD_ITEMS` ORDER BY `ID` DESC LIMIT 1"
    );

    for (const product of products) {
      if (temp_ID === product.ID) {
        const query2 = `
          UPDATE \`SOLD_ITEMS_has_PRODUCT\`
          SET \`QUANTITY\` = \`QUANTITY\` + 1
          WHERE \`SOLD_ITEMS_ID\` = ? AND \`PRODUCT_ID\` = ?;
        `;
        const values2 = [id_carro[0].ID, product.ID];
        await conn.query(query2, values2);
        console.log("Cantidad actualizada correctamente.");
      } else {
        const query =
          "INSERT INTO `SOLD_ITEMS_has_PRODUCT` (`SOLD_ITEMS_ID`, `PRODUCT_ID`, `QUANTITY`) VALUES ( ?, ?, ?)";
        const values = [id_carro[0].ID, product.ID, 1];
        await conn.query(query, values);
      }

      temp_ID = product.ID;
    }

    res.json({
      status: "approved",
      id_carro: id_carro,
    });

    // Actualizar stock de productos después de la compra

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    await axios.post(
      "https://gateway:5000/payment/update/stock",
      {
        soldCartId: id_carro[0].ID,
      },
      { httpsAgent: agent }
    );

    conn.release();
  } catch (err) {
    console.error("Insertion error: ", err);
    res.status(500).json({
      status: "Hubo un error al registrar los productos",
      error: err.message,
    });
  }
};
