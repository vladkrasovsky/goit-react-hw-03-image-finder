import { Component } from 'react';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  render() {
    return (
      <Layout>
        <Searchbar />
        <ImageGallery />
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
