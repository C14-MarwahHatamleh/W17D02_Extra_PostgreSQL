const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  GetCountOfCategories,
} = require("../controllers/product");

const productRouter = express.Router();

productRouter.post("/", addProduct);
productRouter.get("/", getAllProducts);
productRouter.put("/:product_id", updateProduct);
productRouter.get("/counts", GetCountOfCategories);

/*
** For test 
http://localhost:5000/products
{
"title":"table lamp",
 "category":"furniture", 
 "price":"14",
 "img" :"https://rukminim2.flixcart.com/image/850/1000/kj8wccw0-0/table-lamp/t/z/y/table-lamp-for-bedroom-and-drawing-room-big-gola-with-blue-original-imafyuwnuuxcypg9.jpeg?q=90&crop=false"


}


{
"title":"table",
"category":"furniture", 
"price":"100",
 "img" :"https://secure.img1-fg.wfcdn.com/im/98758229/resize-h755-w755%5Ecompr-r85/7002/70021880/Julianna+Frame+Coffee+Table+with+Storage.jpg"


}
{
"title":"chair",
 "category":"furniture", 
 "price":"25",
 "img" :"https://grandrapidschair.com/wp-content/uploads/2016/01/250_Brady_Graphite_Honey-1-768x1153.jpg"


}
{
"title":"pc",
 "category":"electronic", 
 "price":"600",
 "img" :"https://www.pcspecialist.ie/images/landing/pcs/gaming-pc-bundles/bundles-visual.jpg"


}
{
"title":"laptop",
 "category":"electronic", 
 "price_Unit":"400",
 "img" :"https://cdn.thewirecutter.com/wp-content/media/2022/10/laptopstopicpage-2048px-2029.jpg?auto=webp&quality=75&width=1024"


}



*/
module.exports = productRouter;
