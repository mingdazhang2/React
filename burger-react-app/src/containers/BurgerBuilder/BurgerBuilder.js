import React, { Component } from 'react';
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionTypes from '../../store/actions'
const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.5,
	bacon: 2.0,
	meat: 1.5,
};

class BurgerBuilder extends Component {
	// constructor(props){
	//     super(props);
	//     this.state = {...}
	// }
	state = {
		ingredients: {
			bacon: 0,
			cheese: 0,
			salad: 0,
			meat: 0,
		},

		// ingredients: null,
		totalPrice: 0,
		purchasable: false,
		purchasing: false,
        loading: false,
        error:false
	};

	componentDidMount() {
		console.log(this.props)
		axios.get('https://myreact-burger.firebaseio.com/ingredients.json').then(response => {
            // alert(this.addIngredientHandler.Fixed(2))
            this.setState({ ingredients: response.data });
            
		}).catch(error =>{
            this.setState({error:true})
        });
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// alert('Continue...')
		// this.setState({ loading: true });
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Ben',
		// 		address: {
		// 			street: 'Bishop',
		// 			zipCode: '8016',
		// 			contry: 'New Zealand',
		// 		},
		// 		email: '123456qq.com',
		// 		deliveryMethod: 'fastest',
		// 	},
		// };
		// axios
		// 	.post('/orders.json', order)
		// 	.then(response => this.setState({ loading: false, purchasing: false }))
		// 	.catch(error => this.setState({ loading: false, purchasing: false }));
		const queryParams=[]
		for (let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
		}
		queryParams.push('price='+ this.state.totalPrice)
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname:'./checkout',
			search:'?' + queryString
		})
	};

	updatePurchaseState(ingredients) {
		// const ingredients ={
		//     ...this.state.ingredients
		// }
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}
	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const priceAddtion = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddtion;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary =null
	

		
		let burger =this.state.error?<p>broken</p>: <Spinner />;
		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
            if (this.state.loading) {
                orderSummary = <Spinner />;
            }
		}

		//{salad:true, meat:false,...}
		return (
			<Aux>
				<Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Model>
				{burger}
			</Aux>
		);
	}
}
const mapDispatchToProps =dispatch=>{
	return {
		onIngredientAdded:(ingName)=> dispatch({type:actionTypes.ADD_INGREDIENTS,ingredientName:ingName}),
		onIngredientRemoved:(ingName)=> dispatch({type:actionTypes.REMOVE_INGREDIENTS,ingredientName:ingName})
	}
}

const mapStateToProps = state =>{
	return {
		ings:state.ingredients
	}
}
export default withErrorHandler(BurgerBuilder, axios)
// export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
