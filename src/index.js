import React from 'react';
import ReactDOM from 'react-dom';
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
    state = {
        'searchText' : '',
        'inStockOnly' : false
    }

    updateInput=(searchText,inStockOnly)=>{
        this.setState(()=>{
                if (searchText === null)  //the change came from the checkbox
                return(
                {
                    'inStockOnly' : inStockOnly
                })
               return(    //the change came from the search box
                {
                    'searchText': searchText
                }) 
        })
    }


    render=(props)=>{
        function regex(string, search){
            let myRegexp = new RegExp(`${search}`,'i');
            return myRegexp.test(string);
        }

        //filter props based on search text and checkbox
        let filteredProducts = this.props.products.filter((product)=>{
            return regex(product.name, this.state.searchText)
        }).filter((product)=>{
            if (this.state.inStockOnly && (!product.stocked))
                return false
            return true
        })

        return(
        <div className="App">
            <Inputs updateInput={this.updateInput}/>
            <SearchResults products={filteredProducts}/>
        </div>
        )
    }
}
App.propTypes ={
    products: PropTypes.array.isRequired
}

const Inputs=(props)=>{

    const updateState=(event)=>{
       let {type} = event.target
       let {checked} = event.target
       let {value} = event.target
       if (type === 'checkbox')
            props.updateInput(null, checked)
       else
            props.updateInput(value, null)
    }

    return(
        <div className="Inputs">
            <input type="text" name="searchBox" placeholder="search" onChange={updateState} />
            <br/>
            <input type="checkbox" name="stockFilter" onChange={updateState} />
            Only show products in stock
        </div>
    )
}

Inputs.propTypes ={
    updateInput: PropTypes.func.isRequired,
}

const SearchResults=(props)=>{
    let {products} = props

    //get unique categories from resultset
    let unique = [...new Set(products.map(product => product.category))]

    //build array of ResultCategories, one per unique category.
    let categories = []
    let filterProducts = []
    unique.forEach((val)=>{
        filterProducts= products.filter((item) => {
            return item.category === val
        })
        categories.push(<ResultCategory 
                        key={val} 
                        name={val} 
                        products={filterProducts}/>)
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
SearchResults.propTypes ={
    products: PropTypes.array.isRequired
}

const ResultCategory=(props)=>{
    const {products} = props;
    const results = [];
    products.forEach((value) =>{
            results.push(<Result key={value.name} 
                        price={value.price} 
                        stocked={value.stocked} 
                        name={value.name} 
            />)
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
    if (props.stocked)
    {
        return(
            <div className="Result">
                <span>{props.name}</span><span>{props.price}</span>
            </div>
        ) 
    } else {
        return(
            <div className="Result">
                <span className="outOfStock">{props.name}</span><span>{props.price}</span>
            </div>
        )
    }
    
}
Result.propTypes ={
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stocked: PropTypes.bool.isRequired
}


ReactDOM.render(<App products={PRODUCTS}/>, document.getElementById('root'));
