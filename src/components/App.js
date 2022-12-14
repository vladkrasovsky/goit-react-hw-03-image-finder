import { Component } from 'react';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

class App extends Component {
  state = {
    showModal: false,
  };

  render() {
    const { showModal } = this.state;

    return (
      <Layout>
        <Searchbar />

        <ImageGallery />

        {showModal && (
          <Modal>
            <img src="" alt="" />
          </Modal>
        )}

        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
