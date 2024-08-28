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
  

  const query = "INSERT INTO `SOLD_ITEMS` (`ID`, `CUSTOMER_ID`, `EMPLOYEE_ID`, `DATE`) VALUES (?, ?, ?, ?)";
const values = [
    req.body.id_producto,
    req.body.customer_id,
    req.body.employee_id,
    req.body.date
];

pool.getConnection()
    .then(conn => {
        return conn.query(query, values);
    })
    .then(res.status(200).json({
        status: "Se realizó el registro del producto"
    }))
    .catch(err => {
        console.error("Insertion error: ", err);

    });

};

