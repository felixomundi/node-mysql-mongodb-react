const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
connectDB();

const app = express();


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/contact', require('./routes/contactRoute'))
// // // Serve frontend
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, '../frontend/build')));

// //   app.get('*', (req, res) =>
// //     res.sendFile(
// //       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
// //     )
// //   );
// // } else {
// //   app.get('/', (req, res) => res.send('Please set to production'));
// }
//app.get('/', (req, res) => res.send('Please set to production'));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
