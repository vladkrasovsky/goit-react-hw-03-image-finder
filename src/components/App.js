import { Component } from 'react';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { MagnifyingGlass } from 'react-loader-spinner';

class App extends Component {
  state = {
    showModal: false,
    loading: false,
  };

  render() {
    const { showModal, loading } = this.state;

    return (
      <Layout>
        <Searchbar />

        <ImageGallery />

        {loading && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}

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
