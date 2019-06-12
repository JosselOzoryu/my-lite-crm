const products = [
  {
    id: 1,
    productName: "Juice - Apple, 500 Ml",
    vendor: "Brightbean",
    price: 617.91,
    retailPrice: 97.34,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 2,
    productName: "Wine - Jaboulet Cotes Du Rhone",
    vendor: "Oyoba",
    price: 262.14,
    retailPrice: 55.62,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 3,
    productName: "Artichoke - Fresh",
    vendor: "Riffpedia",
    price: 257.81,
    retailPrice: 66.63,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 4,
    productName: "Dc - Sakura Fu",
    vendor: "Oyope",
    price: 748.75,
    retailPrice: 97.47,
    photo: "http://dummyimage.com/250x250.png/ff4444/ffffff"
  },
  {
    id: 5,
    productName: "Longos - Lasagna Beef",
    vendor: "Youbridge",
    price: 279.85,
    retailPrice: 58.79,
    photo: "http://dummyimage.com/250x250.png/5fa2dd/ffffff"
  },
  {
    id: 6,
    productName: "Pomegranates",
    vendor: "Yacero",
    price: 294.23,
    retailPrice: 37.01,
    photo: "http://dummyimage.com/250x250.png/cc0000/ffffff"
  },
  {
    id: 7,
    productName: "Jolt Cola - Electric Blue",
    vendor: "Skaboo",
    price: 498.5,
    retailPrice: 74.88,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 8,
    productName: "Sherbet - Raspberry",
    vendor: "Photobean",
    price: 548.5,
    retailPrice: 47.95,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 9,
    productName: "Duck - Legs",
    vendor: "Topiczoom",
    price: 710.08,
    retailPrice: 77.31,
    photo: "http://dummyimage.com/250x250.png/5fa2dd/ffffff"
  },
  {
    id: 10,
    productName: "Ezy Change Mophandle",
    vendor: "Tanoodle",
    price: 332.48,
    retailPrice: 91.28,
    photo: "http://dummyimage.com/250x250.png/5fa2dd/ffffff"
  },
  {
    id: 11,
    productName: "Milk - Chocolate 500ml",
    vendor: "Oyoloo",
    price: 206.48,
    retailPrice: 98.6,
    photo: "http://dummyimage.com/250x250.png/cc0000/ffffff"
  },
  {
    id: 12,
    productName: "Mayonnaise - Individual Pkg",
    vendor: "Mymm",
    price: 373.89,
    retailPrice: 75.42,
    photo: "http://dummyimage.com/250x250.png/ff4444/ffffff"
  },
  {
    id: 13,
    productName: "Horseradish Root",
    vendor: "Aimbo",
    price: 716.94,
    retailPrice: 89.51,
    photo: "http://dummyimage.com/250x250.png/ff4444/ffffff"
  },
  {
    id: 14,
    productName: "Dried Apple",
    vendor: "Kwimbee",
    price: 442.04,
    retailPrice: 46.08,
    photo: "http://dummyimage.com/250x250.png/ff4444/ffffff"
  },
  {
    id: 15,
    productName: "Oil - Cooking Spray",
    vendor: "Jabbersphere",
    price: 102.29,
    retailPrice: 91.35,
    photo: "http://dummyimage.com/250x250.png/ff4444/ffffff"
  },
  {
    id: 16,
    productName: "Beef Dry Aged Tenderloin Aaa",
    vendor: "Edgeblab",
    price: 121.82,
    retailPrice: 44.49,
    photo: "http://dummyimage.com/250x250.png/ff4444/ffffff"
  },
  {
    id: 17,
    productName: "Seaweed Green Sheets",
    vendor: "Innojam",
    price: 518.49,
    retailPrice: 74.36,
    photo: "http://dummyimage.com/250x250.png/5fa2dd/ffffff"
  },
  {
    id: 18,
    productName: "Milk - Chocolate 250 Ml",
    vendor: "Kwinu",
    price: 786.04,
    retailPrice: 28.77,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 19,
    productName: "Icecream Bar - Del Monte",
    vendor: "Blogspan",
    price: 644.54,
    retailPrice: 81.82,
    photo: "http://dummyimage.com/250x250.png/cc0000/ffffff"
  },
  {
    id: 20,
    productName: "Bagel - Plain",
    vendor: "Brightbean",
    price: 195.63,
    retailPrice: 51.19,
    photo: "http://dummyimage.com/250x250.png/5fa2dd/ffffff"
  },
  {
    id: 21,
    productName: "Spice - Montreal Steak Spice",
    vendor: "Rhyzio",
    price: 12.24,
    retailPrice: 65.54,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 22,
    productName: "Coke - Classic, 355 Ml",
    vendor: "Yakidoo",
    price: 458.95,
    retailPrice: 36.13,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 23,
    productName: "Oil - Peanut",
    vendor: "Jaxbean",
    price: 12.49,
    retailPrice: 51.73,
    photo: "http://dummyimage.com/250x250.png/dddddd/000000"
  },
  {
    id: 24,
    productName: "Chickhen - Chicken Phyllo",
    vendor: "Meezzy",
    price: 332.11,
    retailPrice: 51.38,
    photo: "http://dummyimage.com/250x250.png/cc0000/ffffff"
  },
  {
    id: 25,
    productName: "Truffle Paste",
    vendor: "Oyoloo",
    price: 56.59,
    retailPrice: 84.31,
    photo: "http://dummyimage.com/250x250.png/5fa2dd/ffffff"
  }
];

export default products;
