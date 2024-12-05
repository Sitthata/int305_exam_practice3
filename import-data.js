var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://int305fb-default-rtdb.firebaseio.com"
});

var db = getFirestore() ;

var mycategories = [
    {
        "id": "Books",
        "rows": 10
    },
    {
        "id": "Phones",
        "rows": 10
    }
]

var myproducts = [
    {
        "title": "The Wok: Recipes and Techniques",
        "price": 29.56,
        "category": "Books",
        "author": "J. Kenji López-Alt",
        "pages": 672,
        "keywords": ["Food","Cookbook"]
    },
    {
        "title": "Empathy In Action: How to Deliver Great Customer Experiences at Scale",
        "price": 17.99,
        "category": "Books",
        "author": "Tony Bates",
        "pages": 352,
        "keywords": ["Business","Money","Marketing"]
    },
    {
        "title": "Fairy Tale",
        "price": 16.25,
        "category": "Books",
        "author": "Stephen King",
        "pages": 608,
        "keywords": ["Science","Fiction"]
    },
    {
        "title": "Faith Still Moves Mountain: Miraculous Stories of the Healing Power of Prayer",
        "price": 18.23,
        "category": "Books",
        "author": "Harris Faulkner",
        "pages": 288,
        "keywords": ["Religious","Life"]
    },
    {
        "title": "Rich Dad Poor Dad",
        "price": 7.68,
        "category": "Books",
        "author": "Robert T. Kiyosaki",
        "pages": 336,
        "keywords": ["Finance","Bestseller"]
    },
    {
        "title": "Charlotte's Web",
        "price": 5.47,
        "category": "Books",
        "author": "E. B White",
        "pages": 192,
        "keywords": ["Children","Novel"]
    },
    {
        "title": "Best Road Trips in the USA",
        "price": 18.38,
        "category": "Books",
        "author": "Fodor's Travel Guides",
        "pages": 544,
        "keywords": ["Travel","Guidebook"]
    },
    {
        "title": "How to make the best coffee at home",
        "price": 16.09,
        "category": "Books",
        "author": "James Hoffmann",
        "pages": 225,
        "keywords": ["Coffee","Expert"]
    },
    {
        "title": "The Power of Habit: Why We Do What We Do in Life and Business",
        "price": 18.69,
        "category": "Books",
        "author": "Charles Duhigg",
        "pages":416,
        "keywords": ["Business","Award"]
    },
    {
        "title": "The Berlin Exchange",
        "price": 21.28,
        "category": "Books",
        "author": "Joseph Kanon",
        "pages": 320,
        "keywords": ["Fiction","Crime","Bestseller"]
    },
    {
        "title": "iPhone 13 Pro",
        "price": 836,
        "category": "Phones",
        "brand": "Apple",
        "memory": 256,
        "colors": ["Gold","Silver","Alpine Green","Sierra Blue","Graphite"]
    },
    {
        "title": "Galaxy S22 Ultra",
        "price": 1048.95,
        "category": "Phones",
        "brand": "Samsung",
        "memory": 256,
        "colors": ["Phantom Black","Phantom White","Burgundy","Green"]
    },
    {
        "title": "Galazy Z Fold 4",
        "price": 1551.44,
        "category": "Phones",
        "brand": "Sammsung",
        "memory": 512,
        "colors": ["Phantom Black","Beige","Green"]
    },
    {
        "title": "Xiaomi 12T 5G+4G LTE",
        "price": 494.68,
        "category": "Phones",
        "brand": "Xiaomi",
        "memory": 256,
        "colors": ["Black","Blue","Silver"]
    },
    {
        "title": "Pixel 6 - 5G Android Phone",
        "price": 629,
        "category": "Phones",
        "brand": "Google",
        "memory": 256,
        "colors": ["Stormy Black","Sorta Seaform","Kinda Coral"]
    },
    {
        "title": "Pixel 6 Pro - 5G Android Phone",
        "price": 619,
        "category": "Phones",
        "brand": "Google",
        "memory": 128,
        "colors": ["Cloudy White","Sorta Sunny","Stormy Black"]
    },
    {
        "title": "iPhone 13 Mini",
        "price": 539.95,
        "category": "Phones",
        "brand": "Apple",
        "memory": 128,
        "colors": ["Pink","Blue","Midnight","Red","Starlight"]
    },
    {
        "title": "iPhone 12",
        "price": 516,
        "category": "Phones",
        "brand": "Apple",
        "memory": 64,
        "colors": ["Blue","Red"]
    },
    {
        "title": "Galaxy S20 FE 5G",
        "price": 214,
        "category": "Phones",
        "brand": "Samsung",
        "memory": 128,
        "colors": ["Blue","Cloud Lavender","Cloud Mint","Purple"]
    },
    {
        "title": "Galaxy S21 5G",
        "price": 546.32,
        "category": "Phones",
        "brand": "Samsung",
        "memory": 128,
        "colors": ["Phantom Gray","Phantom Pink","Phantom Violet"]
    }]

mycategories.forEach(function(obj){
    db.collection("mycategories").doc(obj.id).set({
        rows: obj.rows
    }).then( docRef => { console.log("Category Document written with ID : "+docRef.id)})
})
    
myproducts.forEach(function(obj){
    if(obj.category=='Books'){
        db.collection("myproducts").add({
            title: obj.title,
            price: obj.price,
            category: obj.category,
            author: obj.author,
            pages: obj.pages,
            keywords: obj.keywords
        }).then( docRef => { console.log("Book Document written with ID : "+docRef.id)})
    } else {
        db.collection("myproducts").add({
            title: obj.title,
            price: obj.price,
            category: obj.category,
            brand: obj.brand,
            memory: obj.memory,
            colors: obj.colors
        }).then( docRef => { console.log("Phone Document written with ID : "+docRef.id)})        
    }
});
      