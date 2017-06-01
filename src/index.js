import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import PropTypes from 'prop-types';

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
    let filterProducts = []
    unique.forEach((val)=>{
        //this can be improved--- it's sending all of the products, 
        //could it just send only the products for it's own category???
        filterProducts= products.filter((item) => {
            return item.category === val
        })
        categories.push(<ResultCategory key={val} name={val} products={filterProducts}/>)
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
    const {products} = props;
    const results = [];
    products.forEach((value) =>{
        results.push(<Result key={value.name} price={value.price} stocked={value.stocked} name={value.name} />)
    })
    return(
    <div className="ResultCategory">
        <h4>{props.name}</h4>
        {results}
    </div>
    )
}
    ResultCategory.propTypes ={
        name: PropTypes.string.isRequired,
        products: PropTypes.array.isRequired
    }

const Result=(props)=>{
    return(
        <div className="Result">
            <span>{props.name}</span><span>{props.price}</span>
        </div>
    )
}

ReactDOM.render(<App products={PRODUCTS}/>, document.getElementById('root'));
// registerServiceWorker();
