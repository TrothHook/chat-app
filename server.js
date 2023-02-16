const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: '/config/config.env' });

const PORT = process.env.PORT || 2301;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
