import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.catalog.list().then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
      }, [])

    if(loading) {
       return <LoadingComponent message="Loading Products..."/>
    }
    
    // useEffect(() => {
    //   fetch('http://localhost:5000/api/products')
    //     .then(response => response.json())
    //     .then(data => setProducts(data))
    // }, [])
  
    // function addProduct() {
    //   // setProducts([...products, {name:'product3', price:300.00}])
    //   setProducts(prevState => [...prevState,
    //   {
    //     id: (prevState.length) + 101,
    //     name: 'product' + (prevState.length + 1),
    //     price: (prevState.length * 100) + 100,
    //     brand: 'some brand',
    //     description: 'some description',
    //     pictureUrl: 'http://picsum.photos/200'
    //   }])
    // }
  
    return (
        <>
            <ProductList products={products}/>
            {/* <Button variant="contained" onClick={addProduct}>Add Product</Button> */}
        </>

    )
}