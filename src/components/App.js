import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    query: '',
    images: [
      {
        id: 2815641,
        pageURL:
          'https://pixabay.com/photos/laboratory-analysis-chemistry-2815641/',
        type: 'photo',
        tags: 'laboratory, analysis, chemistry',
        previewURL:
          'https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_150.jpg',
        previewWidth: 150,
        previewHeight: 99,
        webformatURL:
          'https://pixabay.com/get/gb9823b2255cde4283d7123568b8155cd8bae4bc91ed64bb69afa1bcaee299cc8fd90a6317d1ffd64f5cb6cec37a9454c2a362a42fa3d376c2c41dca812d9fa06_640.jpg',
        webformatWidth: 640,
        webformatHeight: 426,
        largeImageURL:
          'https://pixabay.com/get/g2ded21b619f5776de1482f3a8bf1b6f9df142d938ec98fa24dd17e9ec0626d3bf7b5b2238eba83f07beb9df6bc88ae33cc0e734a46ba3d498454b9092b1a8842_1280.jpg',
        imageWidth: 3000,
        imageHeight: 2000,
        imageSize: 1048722,
        views: 494022,
        downloads: 258451,
        collections: 557,
        likes: 619,
        comments: 169,
        user_id: 143740,
        user: 'jarmoluk',
        userImageURL:
          'https://cdn.pixabay.com/user/2019/09/18/07-14-26-24_250x250.jpg',
      },
      {
        id: 563423,
        pageURL: 'https://pixabay.com/photos/laboratory-test-tubes-563423/',
        type: 'photo',
        tags: 'laboratory, test tubes, healthcare worker',
        previewURL:
          'https://cdn.pixabay.com/photo/2014/12/10/20/48/laboratory-563423_150.jpg',
        previewWidth: 150,
        previewHeight: 99,
        webformatURL:
          'https://pixabay.com/get/g4695fcfbc4822d88e98b6af9927e2e53a824c2d650d03ed0804f2a6175e07232b8055033a50c7d9a28a18daeabcf184d_640.jpg',
        webformatWidth: 640,
        webformatHeight: 426,
        largeImageURL:
          'https://pixabay.com/get/g68000ff1caa320ba1deb2a51b585543c243d8107caf51e61d14962204e3455936fe7a3ff3a1464a5f372ce607e31307a934f07670924842bcbc28c36a70c2110_1280.jpg',
        imageWidth: 3000,
        imageHeight: 2000,
        imageSize: 1275857,
        views: 483532,
        downloads: 219124,
        collections: 512,
        likes: 555,
        comments: 176,
        user_id: 638422,
        user: 'DarkoStojanovic',
        userImageURL:
          'https://cdn.pixabay.com/user/2014/12/10/02-47-32-961_250x250.jpg',
      },
      {
        id: 275984,
        pageURL:
          'https://pixabay.com/photos/microscope-slide-research-close-up-275984/',
        type: 'photo',
        tags: 'microscope, slide, research',
        previewURL:
          'https://cdn.pixabay.com/photo/2014/02/27/16/09/microscope-275984_150.jpg',
        previewWidth: 150,
        previewHeight: 99,
        webformatURL:
          'https://pixabay.com/get/g8e8f7929e00d5dc3bcf697552f1d3463bf920f661a7d2b14e462fa38bd0d66907a8539a65fd3e1e204c545c66ea086d2_640.jpg',
        webformatWidth: 640,
        webformatHeight: 423,
        largeImageURL:
          'https://pixabay.com/get/g49364ab457e734ed979bd02b9c256efd608383b003cf8f75746f0fab8dc53bb2a2004bf9836057ee742995ae6a40f3d9a1e3195ed272468e11f05905bb8d8351_1280.jpg',
        imageWidth: 4928,
        imageHeight: 3264,
        imageSize: 2237438,
        views: 289900,
        downloads: 160822,
        collections: 435,
        likes: 370,
        comments: 105,
        user_id: 14,
        user: 'PublicDomainPictures',
        userImageURL:
          'https://cdn.pixabay.com/user/2012/03/08/00-13-48-597_250x250.jpg',
      },
    ],
  };

  getQuery = query => this.setState({ query });

  showModal = imageURL => {
    console.log('show modal');
    console.log(imageURL);
  };

  render() {
    const { images } = this.state;

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

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.showModal} />
        )}

        <ToastContainer theme="colored" autoClose={3000} />
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
