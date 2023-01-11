const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userDetail = {};

const items = [
  {
    name: "Fully detached duplex(Evernest Estate)",
    price: 7500000,
    currency: "NGN",
    location: "Lagos, Nigeria",
    description: "8 bedrooms, 9 bathrooms, 1700sqft  ",
    available: "Rented",
    Id: 1,
  },
  {
    name: "Semi-detached duplex(Pinecrest Estate)",
    price: 2300000,
    currency: "NGN",
    location: "Lagos, Nigeria",
    description: "6 bedrooms, 7 bathrooms, 1000sqft",
    available: "Yes",
    Id: 2,
  },
  {
    name: "Bungalow(Pinecrest Estate)",
    price: 1500000,
    currency: "NGN",
    location: "Lagos, Nigeria",
    description: "4 bedrooms, 5 bathroom, 900sqft",
    available: "Yes",
    Id: 3,
  },
  {
    name: "Unique 5 bedroom duplex(Evermark Estate))",
    price: 3000000,
    currency: "NGN",
    location: "Lagos, Nigeria",
    description: "4 bedrooms, 5 bathrooms, 900sqft",
    available: "Yes",
    Id: 4,
  },
  {
    name: "Fully detached duplex(Luxuna Estate)",
    price: 8000000,
    currency: "NGN",
    location: "Abuja, Nigeria",
    description: "4 Bedrooms, 5 Bathrooms, 900sqft",
    available: "yes",
    Id: 5,
  },
  {
    name: "Bungalow(Riseonic Estate)",
    price: 1200000,
    currency: "NGN",
    location: "Enugu, Nigeria",
    description: "4 Bedrooms, 5Bathrooms, 900sqft",
    available: "Rented",
    Id: 6,
  },
  {
    name: "Semi-detached duplex(Primdale Estate)",
    price: 2000000,
    currency: "NGN",
    location: "Asaba, Nigeria",
    description: "4 Bedrooms, 5 Bathrooms, 900sqft",
    available: "Yes",
    Id: 7,
  },
  {
    name: "Fully detached duplex(Urban Estate)",
    price: 4200000,
    currency: "NGN",
    location: "Abia, Nigeria",
    description: "4 Bedroom, 5 Bathrooms, 900sqft",
    available: "Yes",
    Id: 8,
  },
];

//Creating a get endpoint for the homepage("/")
app.get("/", function (req, res) {
  res.send({ success: true, message: "Hello, Welcome to Ultra Homes" });
});

//Creating a post endpoint that accepts data from the client
app.post("/sign-up", function (req, res) {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    res
      .status(400)
      .send({
        success: false,
        message: "Please provide all required informaton",
      });
  } else {
    const registeredUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    res.status(200).send({
      message: "User registered successfully",
      user: registeredUser,
    });
  }
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;
  if (email === "admin" && password === "admin") {
    const token = "123456";
    res.json({
      success: true,
      token,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Username or password is incorrect",
    });
  }
});

app.post("/contact-us", function (req, res) {
  const { name, email, phonenumber, message } = req.body;

  if (!name || !email || !phonenumber || !message) {
    return res.status(200).send({
      success: false,
      message: "Please provide all the fields",
    });
  }
  return res.status(200).send({
    success: true,
    message: "Your message is sent successfully",
  });
});

function getItems() {
  return {
    statusCode: 200,
    message: `${items.length} Items returned successfully`,
    data: items,
  };
}

// POST/add-items
function addItem(item) {
  // Process

  const id = Math.floor(Math.random() * 100000);
  item.id = id;
  items.push(item);

  return {
    statusCode: 201,
    message: "item created successfully",
    data: item,
  };
}

//GET/items/:id
function findItem(id) {
  const item = items.find((item) => (item.Id = id));

  if (item) {
    return {
      statusCode: 200,
      message: `1 Item  found successfully`,
      data: item,
    };
  } else {
    return {
      statusCode: 404,
      message: `Item not found`,
      data: {},
    };
  }
}

//create a get endpont for getting list of houses available
app.get("/items", (req, res) => {
  return res.json(getItems());
});

//create a post endpoint for accepting form data and add it to the shopping list
app.post("/items",  (req, res)=> {
    const item = req.body;
  return res.json(addItem(item));
});

//create a get endpoint for display of a single item's name and price
app.get("/items/:id", (req, res) => {
  const id = req.params.id;

  return res.json(findItem(id));
});

module.exports = app;
