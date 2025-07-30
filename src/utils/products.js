// src/utils/products.js
const products = [
  {
    name: "Elegant Sketch Pen Set",
    price: 199,
    mrp: 249,
    brand: "SketchBrand",
    description: "Premium quality sketch pen set.",
    image: "https://via.placeholder.com/300",
    stock: 100,
    showOnHome: true,
    lastSold: new Date(),
    type: "pen",
  },
  {
    name: "Deluxe Marker Pack",
    price: 249,
    mrp: 299,
    brand: "MarkerMaster",
    description: "A complete set of markers for professionals.",
    image: "https://via.placeholder.com/300",
    stock: 75,
    showOnHome: false,
    lastSold: new Date(),
    type: "marker",
  },
  {
    name: "Professional Drawing Kit",
    price: 599,
    mrp: 699,
    brand: "ArtElite",
    description: "Kit includes pencils, erasers, and more.",
    image: "https://via.placeholder.com/300",
    stock: 50,
    showOnHome: true,
    lastSold: new Date(),
    type: "kit",
  },
];

export default products;
