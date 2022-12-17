import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    showModal: false,
    query: '',
  };

  handleSearchBarSubmit = query => {
    if (!query) {
      toast.warning('Please, enter your search query.');
    }
    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleSearchBarSubmit} />

        <ImageGallery query={query} />

        <ToastContainer theme="colored" autoClose={3000} />
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
