const express = require('express');
const app = express();
const Routes = require('./src/routes/routesCuentas');

const PORT = 3130;

app.use(express.json());

app.use('/cuentas', Routes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});