process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/configs/db');

const PORT = process.env.PORT || 5000;

// Kết nối Database trước khi chạy Server
connectDB();

app.listen(PORT, () => {
  console.log('---');
  console.log(`🚀 Server is running on: https://localhost:${PORT}`);
  console.log(`📡 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log('---');
});