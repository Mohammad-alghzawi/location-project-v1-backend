require('dotenv').config();
const { sequelize } = require('./models');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
const port = process.env.PORT || 4433;
app.get('/', (req, res) => res.send('Dat App'));
const locationRoutes = require('./routers/rotues/locationRoutes');
///all routes needed
app.use('/location', locationRoutes);

app.listen(port, async () => {
  try {
    console.log(`app listening on http://localhost:${port}`);
    await sequelize.sync().then(() => {
      console.log('Database connected successfully');
    });
  } catch (error) {
    console.error(error);
  }
});
