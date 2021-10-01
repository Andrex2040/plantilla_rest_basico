const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_ALAS,
      { useNewUrlParser: true },
      (err, res) => {
        if (err) throw err;
        console.log("Base de Datos ONLINE");
      }
    );
    console.log("Base de datos online");
  } catch (error) {
    throw new Error("Error al inicializar la base de dartos");
  }
};

module.exports = {
  dbConnection,
};
