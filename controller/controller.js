import pool from "../db/database.js";

// Funcion de llamar a mis cartas de lista de deseos
export const getProducts = async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();
    console.log("iniciando la conexion");
    
    const rows = await conn.query(
      "SELECT * FROM PRODUCT WHERE ID=" +
        req.params.IdProduct +
        ";"
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






export const insertProductos = async (req, res) => {
  const products = req.body;
  const currentDate = new Date().toISOString().slice(0, 10); 
  console.log(" ===================================")
  console.log(products)
  try {
      const conn = await pool.getConnection();


      for (const product of products) {
           // Incrementar el ID para el siguiente producto
          const query = "INSERT INTO `SOLD_ITEMS` (`DATE`, `CUSTOMER_ID`, `EMPLOYEE_ID`) VALUES ( ?, ?, ?)";
          const values = [
                   // Usar el nuevo ID incrementado
              currentDate, // Usar la fecha actual
              1,           // CUSTOMER_ID o el valor que corresponda
              1            // EMPLOYEE_ID o el valor que corresponda
          ];
          await conn.query(query, values);
      }

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
