

class ProductList extends React.Component {

    constructor() {
      super();

      this.state = {
        products: []
      }

      this.handleProductUpVote =this.handleProductUpVote.bind(this);

    }

    componentDidMount() {
      this.setState({ products: Seed.products });
    }

    handleProductUpVote(productId) {
      console.log(productId + ' was upvoted.');

      var stateProductsClone = this.state.products.map((product) => {
        if (productId === product.id) {
          return Object.assign({}, product, {votes: product.votes + 1})
        }
        else return product
      });

      this.setState({ products: stateProductsClone });
      
    }

    render() {

        const products = this.state.products.sort((a,b) => (b.votes - a.votes));

        const productComponents = products.map((product) => (<Product id={product.id}
          title={product.title}
          descriprion={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl} key={products.indexOf(product)} onVote={this.handleProductUpVote} />));

        return (
          <div className='ui unstackable items'>
                {productComponents}
           </div>
        );
    }
}

// this.props.upVote
class Product extends React.Component {

  constructor() {
    super();
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  handleUpVote() {
    this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<ProductList />, document.getElementById("content"));