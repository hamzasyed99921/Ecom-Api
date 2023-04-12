const Product = require('../model/products')

const getAllProducts = async(req,res) => {
    const {company,name,featured,sort,select} = req.query;
    const queryObject = {};
    
    // Search data in Api
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {$regex: name, $options: "i"};
    }
    if(featured){
        queryObject.featured = featured;
    }

    let apiData = Product.find(queryObject)
    // Sort Api data
    if(sort){
        let sortFix = sort.split(",").join(" "); 
        apiData = apiData.sort(sortFix)
    }

    // Selected items in Api
    if(select){
        let selectFix = select.split(",").join(" "); 
        apiData = apiData.select(selectFix)
    }

    // Pagination in RestApi

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    const Products = await apiData
    res.status(201).json({Products, nbHits: Products.length})
    // console.log(Products);
};

const getAllProductsTesting = async(req,res) => {
    res.status(201).json({msg: "I am getAllProductsTesting"})
};

module.exports = {getAllProducts, getAllProductsTesting}