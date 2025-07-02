const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require('./routes/category.routes'); // ✅ Correct path
const itemsRoute = require('./routes/item.routes');
 
app.use(express.json());
app.get('/', (req, res) => res.send('Welcome to backend project'));
 
app.use("/api/auth", authRoutes);
app.use('/api/categories', categoryRoutes); // ✅ Mounting route
app.use('/api/items', itemsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
