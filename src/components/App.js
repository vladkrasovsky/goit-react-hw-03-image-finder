import { Component } from 'react';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';

class App extends Component {
  render() {
    return (
      <Layout>
        <Searchbar />
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
