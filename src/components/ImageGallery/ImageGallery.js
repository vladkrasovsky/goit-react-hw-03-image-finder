import { Component } from 'react';
import { List, BtnWrap } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import pixabayAPI from 'services/pixabay-api';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    gallery: null,
    page: 1,
    totalPages: 0,
    error: null,
    status: 'idle',
    loadMorePending: false,
    activeImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      if (!nextQuery) {
        this.setState({ gallery: null, status: 'idle' });
        return;
      }

      this.setState({ status: 'pending' });

      try {
        const { hits: gallery, totalHits: total } =
          await pixabayAPI.searchImages(nextQuery, 1);

        this.setState({
          gallery,
          page: 1,
          status: 'resolved',
        });

        this.calculateTotalPages(total);

        if (!gallery.length) {
          toast.info('Oooh oh, there are no results that match your query.');
          return;
        }

        toast.info(`Hooray! We found ${total} image(s).`);
      } catch (error) {
        this.setState({ error, status: 'rejected' });
        toast.error(error.message);
      }
    }

    if (prevPage !== nextPage) {
      this.scrollToLoadedGalleryItems();
    }
  }

  calculateTotalPages(total) {
    this.setState({ totalPages: Math.ceil(total / 12) });
  }

  isShowLoadMore() {
    return this.state.page < this.state.totalPages;
  }

  async handleLoadMore() {
    const { query } = this.props;
    const { page, gallery: prevGallery } = this.state;
    const nextPage = page + 1;

    this.setState({ loadMorePending: true });

    try {
      const { hits: gallery } = await pixabayAPI.searchImages(query, nextPage);

      this.setState({
        gallery: [...prevGallery, ...gallery],
        status: 'resolved',
        page: nextPage,
        loadMorePending: false,
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
      toast.error(error.message);
    }
  }

  scrollToLoadedGalleryItems() {
    const gallery = document.querySelector('.gallery');
    const galleryItems = gallery.querySelectorAll('li');
    const gapOffset = parseInt(getComputedStyle(gallery).gap);
    const headerHeight = document
      .querySelector('.header')
      .getBoundingClientRect().height;

    const elementIdx = galleryItems.length - (galleryItems.length % 12 || 12);

    const { top } = galleryItems[elementIdx].getBoundingClientRect();

    const scrollOptions = {
      top: top + window.pageYOffset - headerHeight - gapOffset,
      behavior: 'smooth',
    };

    window.scrollTo(scrollOptions);
  }

  showLoader() {
    return (
      <Oval
        height={60}
        width={60}
        color="#3f51b5"
        wrapperStyle={{ display: 'inline-block', textAlign: 'center' }}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#3f51b5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    );
  }

  showLoadMore() {
    const { loadMorePending } = this.state;

    if (loadMorePending) {
      return this.showLoader();
    }

    if (this.isShowLoadMore()) {
      return (
        <BtnWrap>
          <Button onClick={() => this.handleLoadMore()}>Load More</Button>
        </BtnWrap>
      );
    }
  }

  showModal() {
    const { activeImage } = this.state;

    if (activeImage) {
      const { href: src, title: alt } = activeImage;
      return (
        <Modal onClose={this.hideModal}>
          <img src={src} alt={alt} />
        </Modal>
      );
    }
  }

  hideModal = () => {
    this.setState({ activeImage: null });

    document.querySelector('html').style.overflowY = 'auto';
  };

  handleEscModalClose = e => {
    if (e.code === 'Escape') {
      this.hideModal();
      window.removeEventListener('keydown', this.handleEscModalClose);
    }
  };

  handleGalleryItemClick = e => {
    e.preventDefault();

    document.querySelector('html').style.overflowY = 'hidden';

    const { href, title } = e.currentTarget;

    this.setState({
      activeImage: { href, title },
    });

    window.addEventListener('keydown', this.handleEscModalClose);
  };

  showGallery() {
    const { gallery } = this.state;

    return (
      <>
        <List className="gallery">
          {gallery.map(item => (
            <ImageGalleryItem
              key={item.id}
              img={item}
              onClick={this.handleGalleryItemClick}
            />
          ))}
        </List>

        {this.showLoadMore()}

        {this.showModal()}
      </>
    );
  }

  render() {
    const { status } = this.state;

    if (status === 'pending') {
      return this.showLoader();
    }

    if (status === 'resolved') {
      return this.showGallery();
    }
  }
}

export default ImageGallery;
