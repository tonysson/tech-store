
/**
 * Un context API nous permet de passer des data à travers nos differents Component sans leur passer des props
 * 
 * pour le faire fonctionner  on doit d'abord creer un object en utilisant:
 * "React.CreatContext()" c'est a dire ds notre exemple, const ProductContext = React.CreateContext()
 * 
 * et apres  definir deux choses essentielles
 * 
 * 1) Provider : sur cette methode la value est importante, et au
 * 2) le Consumer
 * 
 * Apres on va wrap tte notre application dans index.js du provider
 */

 import React, { Component  } from 'react';
 import { linkData } from './linkData';
 import { SocialData } from './SocialData';
 import { items } from '../context/productData';



const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        sidebarOpen:false,
        cartOpen: false,
        links:linkData,
        socialIcons:SocialData,
        cart:[],
        cartItems: 0,
        cartSubTotal:0,
        cartTotal:0,
        cartTax:0,
        storeProducts:[],
        filteredProducts:[],
        featuredProducts:[],
        singleProduct:{},
        loading:true,
        price:0,
        min:0,
        max:0,
        search:'',
        company:"all",
        shipping:false
    }

    componentDidMount(){
       this.setProducts(items);
    }

    /**
     * SetProducts est notre methode qui va nous rendre nos data en local et plustard par contentful
     */

     setProducts= (products) => {
         
        let storeProducts = products.map(item => {

            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            const product = { id, ...item.fields, image};

            return product
        });

      //  console.log(storeProducts);

      //Featured Products
      let featuredProducts = storeProducts.filter(item => item.featured === true);

      // get MaxPrice from our products to set up the filter
      let maxPrice = Math.max(...storeProducts.map(item => item.price));

     // console.log(maxPrice);

      this.setState({
          storeProducts,
          featuredProducts,
          filteredProducts:storeProducts,
          cart:this.getStorageCart(),
          singleProduct:this.getStorageProduct(),
          loading:false,
          price:maxPrice,
          max:maxPrice
      },() => {
          this.addTotals()
      });
     }

    /**
   * Lorsqu'on ajoute les produits au panier et qu'on rafraichit la page, on perd tout.
   * Pour palier a ce probleme on fait donc appel au localStorage avec sa methode setItem();
   * elle prend deux parametres....
   */
    syncStorage = () => {
        localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }



     /**
      * get Cart from our localStorage
      * La méthode JSON.parse() analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par  cette chaîne
      */
     getStorageCart = () => {
         let cart;
         if(localStorage.getItem("cart")){
             cart = JSON.parse(localStorage.getItem("cart"));
         }else{
             cart = [];
         }

         return cart;
     }



    // set Single Product

    setSingleProduct = (id) => {     
        let product = this.state.storeProducts.find(item => item.id === id);
        localStorage.setItem("singleProduct", JSON.stringify(product));
        this.setState({
            singleProduct : {...product},
            loading:false
        })
    }

      
     // get product from local storage
     getStorageProduct = () => {
         return localStorage.getItem("singleProduct")? JSON.parse(localStorage.getItem("singleProduct")): {}
     }


   /**
    * On loop a travers le panier et a chaque fois qu'on a une subtotal on lui rajoute une nouvelle subtotal
    * pareil pour le nombre d'articles ajoutés également
    */
     getTotals = () => {
         let subTotal = 0 ;
         let cartItems = 0 ;

         
         this.state.cart.forEach(item => {
             subTotal += item.total;
             cartItems += item.count;
         });
          
         subTotal = parseFloat(subTotal.toFixed(2));

         // calcul de la taxe
         let tax = subTotal * 0.1 ;
         tax = parseFloat(tax.toFixed(2));

         // on calcul le total
         let total = subTotal + tax;
         total     = parseFloat(total.toFixed(2));

         return {
             cartItems,
             subTotal,
             total,
             tax
         }
     }

    // addTotal
    addTotals = () => { 
        const totals = this.getTotals();
        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal:totals.subTotal,
            cartTax:totals.tax,
            cartTotal: totals.total
        })
    }

    //add To cart
    addToCart = (id) => {
        // on stocke temporelement ce quui se trouve dans le panier
        let tempCart = [...this.state.cart];
        // on stocke temporelement les produits qui se trouvent dans le panier
        let tempProducts = [...this.state.storeProducts];

        // on verifie si on a deja un produit dans le panier
        let tempItem = tempCart.find(item => item.id === id);

        // Si on a pas de produit dans le panier on la forcement dans le storeProduct

        if(!tempItem){
            tempItem = tempProducts.find(item => item.id === id);
            let total = tempItem.price;

            // je stocke tt ca dans une variable
            let cartItem = {...tempItem, count:1 , total};

            tempCart =  [...tempCart, cartItem]
        }else{
            //On passe ds le cas ou j'ai deja le produit  ds le panier
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }
        this.setState(() => {
            return { cart: tempCart } 
        }, () => {
            this.addTotals();
            this.syncStorage();
            this.openCart();
        })
    }

    /**
     * Methode qui permet de toggle le side bar
     */

     handleSidebar = () => {
         this.setState({
           sidebarOpen: !this.state.sidebarOpen
         })
     }


    /**
    * Methode qui permet de toggle le panier
    */

    handleCart = () => {
        this.setState({
            cartOpen: !this.state.cartOpen
        })
    }

    /**
    * Methode qui permet de fermer le panier
    */

    closeCart = () => {
        this.setState({
            cartOpen: false
        })
    }

    /**
    * Methode qui permet d'ouvrir le panier
    */

    openCart = () => {
        this.setState({
            cartOpen: true
        })
    }

    /**
     * ----------------------------------------
     *  les fonctionnalités sur la page panier
     * ----------------------------------------
     */

     /**
      * incrementation: l'idée est qu'au moment ou je clique sur le bouton incrementé, je fais augmenter le nombre d'articles
      * et egalement je change le prix et le total automatiquement
      * 
      * 1-Pour s'y faire il faut que je recupere d'abord  le produit(prix, title, description...) cliqué
      * 2- je prend donc la propriété count et j'incrémente
      * 3- je prend la propriéte cartItem.total= cartItem.count * cartItem.price
      * 4-on fixe le prix a deux chiffre apres la virgule
      * apres tout ca dans le setState on oublie pas de penser au localstorage et au addTotal
      */

     increment = (id) => {

        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
       // console.log(cartItem);
       cartItem.count++;
       cartItem.total = cartItem.count * cartItem.price;
       cartItem.total = parseFloat(cartItem.total.toFixed(2));

       this.setState(() => {
           return {
               cart:[...tempCart],

           }
       },() =>{
           this.addTotals();
           this.syncStorage();
       });
     }


    /**
    * decrementation
    */

    decrement = (id) => {

        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count = cartItem.count - 1 ;

        if(cartItem.count === 0){
            this.removeItem(id);
        }else{
            cartItem.total = cartItem.count * cartItem.price;
            cartItem.total = parseFloat(cartItem.total.toFixed(2));

            this.setState(() => {
                return {
                    cart: [...tempCart],

                }
            }, () => {
                this.addTotals();
                this.syncStorage();
            });
        }

    }

    /**
    * Permet de supprimer un article sur la page panier
    */

    removeItem = (id) => {
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item => item.id !== id);

        this.setState({
            cart:[...tempCart]
        },() => {
           this.addTotals();
           this.syncStorage();
        })
    }


    /**
    * Permet de vider tout sur la page panier
    */

     clearCart = () => {
       
        this.setState({
            cart:[]
        }, () => {
            this.syncStorage();
            this.addTotals();
            
        });
    }


/**
* ----------------------------------------
*  les fonctionnalités sur le filtre 
* ----------------------------------------
*/

handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === "checkbox"? event.target.checked:event.target.value;
   // console.log(`name:${name}, value:${value}`);
   this.setState({
       [name] : value
   },this.sortData);
}


sortData = () => { 
    const { storeProducts, shipping, price, search, company} = this.state;
    let tempProducts = [...storeProducts];

    // filter for searching
    if(search.length > 0){
        tempProducts = tempProducts.filter(item => {
            let tempSearch = search.toLowerCase();
            let tempTitle = item.title.toLowerCase().slice(0, search.length);
            if(tempSearch === tempTitle){
                return item
            }
        })
    }

    // FILTER for freeShipping
    if(shipping){
    tempProducts = tempProducts.filter(item => item.freeShipping === true);
    }

    // filter price
     let tempPrice = parseInt(price);
     tempProducts = tempProducts.filter(item => item.price <= tempPrice);

    // filter company
    if(company !== "all"){
        tempProducts = tempProducts.filter(item => item.company === company);
    }




    this.setState({ filteredProducts : tempProducts});
}
    
    render() {
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleCart:this.handleCart,
                handleSidebar:this.handleSidebar,
                closeCart:this.closeCart,
                openCart:this.openCart,
                addToCart:this.addToCart,
                setSingleProduct:this.setSingleProduct,
                increment: this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart,
                handleChange:this.handleChange
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
      
        
    }
}

const ProductConsumer = ProductContext.Consumer
 
 export  { ProductProvider, ProductConsumer}