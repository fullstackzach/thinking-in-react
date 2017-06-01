import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class App extends React.Component{
    render=(props)=>{
        return(
        <div className="App">
            <Inputs />
            <SearchResults products={this.props.products}/>
        </div>
        )
    }
}

const Inputs=()=>{
    return(
        <div className="Inputs">
            <input type="text" name="searchBox" placeholder="search" />
            <br/>
            <input type="checkbox" name="stockFilter" />
            Only show products in stock
        </div>
    )
}

const SearchResults=(props)=>{
    let {products} = props

    //get unique categories from resultset
    let unique = [...new Set(products.map(product => product.category))]

    //build array of ResultCategories, one per unique category.
    let categories = []
    unique.forEach((val)=>{
        //this can be improved--- it's sending all of the products, 
        //could it just send only the products for it's own category???
        categories.push(<ResultCategory key={val} name={val} products={products}/>)
    })

    //send it on up
    return(
        <div className="SearchResults">
            <h3>Name</h3><h3>Price</h3>
            <br/>
            {categories}
        </div>
    )
}

const ResultCategory=(props)=>{
    return(
    <div className="ResultCategory">
        <h4>{props.name}</h4>
        <Result />
    </div>
    )
}

const Result=(props)=>{
    return(
        <div className="Result">
            <span>Football</span><span>$1000</span>
        </div>
    )
}

ReactDOM.render(<App products={PRODUCTS}/>, document.getElementById('root'));
// registerServiceWorker();
