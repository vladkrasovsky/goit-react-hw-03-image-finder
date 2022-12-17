import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    query: '',
  };

  handleQueryChange = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleQueryChange} />
        <ImageGallery query={query} />
        <ToastContainer theme="colored" autoClose={3000} />
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
