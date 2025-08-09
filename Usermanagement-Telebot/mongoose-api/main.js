const express = require('express');
const mongoose = require('mongoose');
const {
  AirConditionersCll,
  LaptopsCll,
  SmartphonesCll,
} = require('./models/productsSchema.js'); // Ensure path is correct
const { ShopsCll } = require('./models/shopsSchema.js');
const { QuestionsCll } = require('./models/questionsSchema.js');
const productsRouter = require('./routes/productsApi.js');
const cors = require('cors');
const authMiddleware = require('./authMiddleware');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/productsdb")
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));

// 连接 MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB Atlas connection error:', err));

const app = express();
app.use(express.json());
app.use(cors());

// "Public routing (no authentication required)"
// “公共路由（無需身份驗證）”
app.use('/products', productsRouter);

// Airconditioner GET Read
app.get('/airconditioners', async (req, res) => {
  try {
    const airconditioners = await AirConditionersCll.find(); // Query air conditioner collection
    res.status(200).send(airconditioners);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Airconditioner GET Search Keyword
app.get('/airconditioners/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const airconditioners = await AirConditionersCll.find({
      $or: [
        { productName_en: { $regex: keyword, $options: 'i' } },
        { brand_en: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.send(airconditioners);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Laptop GET Read
app.get('/laptops', async (req, res) => {
  try {
    const laptop = await LaptopsCll.find();
    res.status(200).send(laptop);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Laptop GET Search Keyword
app.get('/laptops/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const laptop = await LaptopsCll.find({
      $or: [
        { productName_en: { $regex: keyword, $options: 'i' } },
        { brand_en: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.send(laptop);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Smartphone GET Read
app.get('/smartphones', async (req, res) => {
  try {
    const smartphone = await SmartphonesCll.find();
    res.status(200).send(smartphone);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Smartphone GET Search Keyword
app.get('/smartphones/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const smartphone = await SmartphonesCll.find({
      $or: [
        { productName_en: { $regex: keyword, $options: 'i' } },
        { brand_en: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.send(smartphone);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Shops GET Read
app.get('/shops', async (req, res) => {
  try {
    const shops = await ShopsCll.find(); // 获取商店数据
    res.send(shops);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Shops GET Search Keyword
app.get('/shops/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const shop = await ShopsCll.find({
      $or: [
        { shop_en: { $regex: keyword, $options: 'i' } },
        { shop_cn: { $regex: keyword, $options: 'i' } },
        { address_cn: { $regex: keyword, $options: 'i' } },
        { address_en: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.send(shop);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Questions GET Read
app.get('/questions', async (req, res) => {
  try {
    const question = await QuestionsCll.find();
    res.send(question);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Questions GET Search Keyword
app.get('/questions/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const question = await QuestionsCll.find({
      $or: [{ question: { $regex: keyword, $options: 'i' } }],
    });
    res.send(question);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// "Registration authentication middleware (protects all subsequent routes)"）
//「註冊認證中間件（保護所有後續路由）」）
app.use(authMiddleware);
// ========== "Protected routes (Token verification required)"==========
// ==========「受保護的路線（需要token驗證）」===========
// Items One
// Airconditioner POST Create
app.post('/airconditioners', async (req, res) => {
  try {
    const airconditioner = new AirConditionersCll(req.body); // Use air conditioner model
    await airconditioner.save();
    res.status(201).send(airconditioner);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Airconditioner PUT Update
app.put('/airconditioners/:id', async (req, res) => {
  try {
    const airconditioners = await AirConditionersCll.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!airconditioners) {
      return res.status(404).send();
    }
    res.send(airconditioners);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Airconditioner Delete
app.delete('/airconditioners/:id', async (req, res) => {
  try {
    const airconditioner = await AirConditionersCll.findByIdAndDelete(
      req.params.id,
    );
    if (!airconditioner) {
      return res.status(404).send({ message: 'Air conditioner not found.' });
    }
    res.status(200).send({
      message: 'Air conditioner deleted successfully.',
      deletedItem: airconditioner,
    });
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while deleting the air conditioner.',
      error,
    });
  }
});

// Item Two
// Laptop POST Create
app.post('/laptops', async (req, res) => {
  try {
    const laptop = new LaptopsCll(req.body);
    await laptop.save();
    res.status(201).send(laptop);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Laptop PUT Update
app.put('/laptops/:id', async (req, res) => {
  try {
    const laptop = await LaptopsCll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!laptop) {
      return res.status(404).send();
    }
    res.send(laptop);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Laptop Delete
app.delete('/laptops/:id', async (req, res) => {
  try {
    const laptop = await LaptopsCll.findByIdAndDelete(req.params.id);
    if (!laptop) {
      return res.status(404).send({ message: 'Laptop not found.' });
    }
    res
      .status(200)
      .send({ message: 'Laptop deleted successfully.', deletedItem: laptop });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while deleting the Laptop', error });
  }
});

// Item Three
// Smartphone POST Create
app.post('/smartphones', async (req, res) => {
  try {
    const smartphone = new SmartphonesCll(req.body);
    await smartphone.save();
    res.status(201).send(smartphone);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Smartphone PUT Update
app.put('/smartphones/:id', async (req, res) => {
  try {
    const smartphone = await SmartphonesCll.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!smartphone) {
      return res.status(404).send();
    }
    res.send(smartphone);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Smartphone Delete
app.delete('/smartphones/:id', async (req, res) => {
  try {
    const smartphone = await SmartphonesCll.findByIdAndDelete(req.params.id);
    if (!smartphone) {
      return res.status(404).send({ message: 'Smartphone not found.' });
    }
    res.status(200).send({
      message: 'Smartphone deleted successfully.',
      deletedItem: smartphone,
    });
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while deleting the Smartphone',
      error,
    });
  }
});

// Item Four
// Shops POST Create
app.post('/shops', async (req, res) => {
  try {
    const shop = new ShopsCll(req.body);
    await shop.save();
    res.status(201).send(shop);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Shops PUT Update
app.put('/shops/:id', async (req, res) => {
  try {
    const shop = await ShopsCll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!shop) return res.status(404).send('Shop not found');
    res.send(shop);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Shops Delete
app.delete('/shops/:id', async (req, res) => {
  try {
    const shop = await ShopsCll.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found.' });
    }
    res
      .status(200)
      .send({ message: 'Shop deleted successfully.', deletedItem: shop });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'An error occurred while deleting the Shop', error });
  }
});

// Item Five
// Questions POST Create
app.post('/questions', async (req, res) => {
  try {
    const question = new QuestionsCll(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Questions PUT Update
app.put('/questions/:id', async (req, res) => {
  try {
    const question = await QuestionsCll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!question) return res.status(404).send('Question not found');
    res.send(question);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Questions Delete
app.delete('/questions/:id', async (req, res) => {
  try {
    const question = await QuestionsCll.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).send({ message: 'Question not found.' });
    }
    res.status(200).send({
      message: 'Question deleted successfully.',
      deletedItem: question,
    });
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while deleting the Question',
      error,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
