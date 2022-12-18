import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';

class App extends Component {
  state = {
    query: '',
  };

  getQuery = query => this.setState({ query });

  render() {
    return (
      <Layout>
        {/* 
          <Searchbar>
          <ImageGallery>
          <ImageGalleryItem>
          <Loader>
          <Button>
          <Modal>
        */}

        <Searchbar onSearch={this.getQuery} />

        <ToastContainer theme="colored" autoClose={3000} />
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
