const express = require('express');
const path = require("path");
const app = express();
const ejs = require("ejs");
const hbs = require("hbs");
const MongoClient = require('mongodb').MongoClient;
const url ='mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mealbox';


var success = false;

//Database Connection
require("./db/conn");

//Imported orders and registers from models folder
const feedback_con = require("./models/registers");
const orders_con = require("./models/order")

//Port created
const port = process.env.PORT || 4000;

//Setting paths
const static_path = path.join(__dirname, "../public"); 
const tamplate_path = path.join(__dirname, "../templates/views"); 
const partial_path = path.join(__dirname, "../templates/partials"); 

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", tamplate_path);
hbs.registerPartials(partial_path);
//index loading page
app.get("/", (req, res) => {
    res.render("index");
});

//Loading other gbs files
app.get("/vegmeal", (req, res) => {
    res.render("vegmeal");
});
app.get("/admin_login", (req, res) => {
    res.render("admin_login");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.get("/feedback", (req, res) => {
    res.render("feedback");
});
app.get("/login_failed", (req, res) => {
    res.render("login_failed");
});
app.get("/index", (req, res) => {
    res.render("index");
});
app.get("/info", (req, res) => {
    res.render("info");
});
app.get("/maggie", (req, res) => {
    res.render("maggie");
});
app.get("/meals", (req, res) => {
    res.render("meals");
});
app.get("/non_veg_maggie_details", (req, res) => {
    res.render("non_veg_maggie_details");
});
app.get("/nonveg_maggie", (req, res) => {
    res.render("nonveg_maggie");
});
app.get("/nonveg_meal_details", (req, res) => {
    res.render("nonveg_meal_details");
});
app.get("/nonvegmeal", (req, res) => {
    res.render("nonvegmeal");
});
app.get("/order", (req, res) => {
    res.render("order");
});
app.get("/success", (req, res) => {
    res.render("success");
});
app.get("/veg_maggie_details", (req, res) => {
    res.render("veg_maggie_details");
});
app.get("/veg_maggie", (req, res) => {
    res.render("veg_maggie");
});
app.get("/veg_meal_details", (req, res) => {
    res.render("veg_meal_details");
});
app.get("/feedback_success", (req, res) => {
    res.render("feedback_success");
});

//get feedback from form
app.post("/feedback", async(req, res) => {  
    try {
            const feedbackUser = new feedback_con({
                user_feedback : req.body.user_feedback
            })
        const registered = await feedbackUser.save();
        res.status(201).render("feedback_success");
    } catch (error) {
        res.status(400).send(error);
    }
})

//get oders from from
app.post("/order", async(req, res) => {  
    try {
            const orderUser = new orders_con({
                user_name : req.body.user_name,
                user_mobile : req.body.user_mobile,
                user_meal : req.body.user_meal,
                user_hub : req.body.user_hub,
            })
        const registered = await orderUser.save();
        res.status(201).render("success");
    } catch (error) {
        res.status(400).send(error);
    }
})

//admin login check
app.post("/admin_login", (req, res) => {
    try{
        var u = 'name';
        var p = 'pass';

        const username = req.body.username;
        const password = req.body.password;
        if(username == u && password == p) {
                success=true;
                const db = client.db(dbName);
                const collection = db.collection('orders');
            
                collection.find({}).toArray(function(err, device_list) {
                     res.render('admin_index.ejs', {'orders': device_list})
                 });
        }
        else
        {
            res.render("login_failed");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})


//db connection for ejs view
client.connect(function(err){
    console.log("Connected");
});

//To display feedback
app.get('/adminfeedback', (req, res) => {
    if(success)
    {
        const db = client.db(dbName);
        const collection = db.collection('feedbacks');

        collection.find({}).toArray(function(err, device_list) {
            res.render('adminfeedback.ejs', {'feedbacks': device_list})
        });
    }
    else{
        res.render('admin_login');
    }
})

//To display admin_index and orders
app.get('/admin_index', (req, res) => {
    if(success)
    {
        const db = client.db(dbName);
        const collection = db.collection('orders');

        collection.find({}).toArray(function(err, device_list) {
            res.render('admin_index.ejs', {'orders': device_list})
        });
    }
    else{
        res.render('admin_login');
    }
})


//Server log
app.listen(port, () => {
    console.log(`Server running at ${port}`);
})