import { Component } from 'react';
import { List } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import pixabayAPI from 'services/pixabay-api';
import { Oval } from 'react-loader-spinner';

class ImageGallery extends Component {
  state = {
    gallery: null,
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      try {
        const { hits: gallery, totalHits: total } =
          await pixabayAPI.searchImages(nextQuery, 1);

        setTimeout(() => {
          this.setState({ gallery, status: 'resolved' });
        }, 30000);
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  render() {
    const { gallery, error, status } = this.state;

    if (status === 'pending') {
      return (
        <Oval
          height={80}
          width={80}
          color="#3f51b5"
          wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#3f51b5"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      );
    }

    if (status === 'resolved') {
      return (
        <List>
          {gallery.map(item => (
            <ImageGalleryItem key={item.id} img={item} />
          ))}
        </List>
      );
    }
  }
}

export default ImageGallery;
