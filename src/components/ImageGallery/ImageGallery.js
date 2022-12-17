import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import pixabayAPI from 'services/pixabay-api';
import { List, BtnWrap } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    gallery: [],
    page: 1,
    totalPages: 0,
    status: 'idle',
    loadMorePending: false,
    activeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      if (!nextQuery) {
        this.setState({ gallery: [], status: 'idle' });
        return;
      }

      this.setState({ gallery: [], status: 'pending' });
      this.fetchImages(nextQuery);
    }

    if (prevPage !== nextPage) {
      this.scrollToLoadedItems();
    }
  }

  async fetchImages(query, page = 1) {
    try {
      const { hits, totalHits } = await pixabayAPI.searchImages(query, page);

      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...hits],
        status: 'resolved',
        page,
        loadMorePending: false,
      }));

      if (page === 1) {
        if (!hits.length) {
          toast.info('Oooh oh, there are no results that match your query.');
          return;
        }
        toast.info(`Hooray! We found ${totalHits} image(s).`);
        this.calculateTotalPages(totalHits);
      }
    } catch (error) {
      this.setState({ status: 'rejected' });
      toast.error(error.message);
    }
  }

  async handleLoadMore() {
    this.setState({ loadMorePending: true });
    this.fetchImages(this.props.query, this.state.page + 1);
  }

  calculateTotalPages(total) {
    this.setState({ totalPages: Math.ceil(total / 12) });
  }

  scrollToLoadedItems() {
    const refs = {
      header: document.querySelector('.header'),
      wrapper: document.querySelector('.gallery'),
    };

    refs.items = refs.wrapper.querySelectorAll('li');

    const itemsLength = refs.items.length;
    const itemIdx = itemsLength - (itemsLength % 12 || 12);
    const headerHeight = refs.header.getBoundingClientRect().height;
    const gapOffset = parseInt(getComputedStyle(refs.wrapper).gap);

    const top =
      refs.items[itemIdx].getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      gapOffset;

    window.scrollTo({ top, behavior: 'smooth' });
  }

  handleItemClick = e => {
    e.preventDefault();
    this.toggleDocumentScroll('hidden');
    this.setState({ activeImage: e.currentTarget });
    window.addEventListener('keydown', this.handleEscModalClose);
  };

  hideModal = () => {
    this.setState({ activeImage: null });
    this.toggleDocumentScroll('auto');
  };

  handleEscModalClose = e => {
    if (e.code === 'Escape') {
      this.hideModal();
      window.removeEventListener('keydown', this.handleEscModalClose);
    }
  };

  toggleDocumentScroll(value) {
    document.querySelector('html').style.overflowY = value;
  }

  render() {
    const { status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return this.renderGallery();
    }
  }

  renderGallery() {
    const { gallery } = this.state;

    return (
      <>
        <List className="gallery">
          {gallery.map(item => (
            <ImageGalleryItem
              key={item.id}
              img={item}
              onClick={this.handleItemClick}
            />
          ))}
        </List>

        {this.renderLoadMore()}

        {this.renderModal()}
      </>
    );
  }

  renderLoadMore() {
    const { page, totalPages, loadMorePending } = this.state;

    if (loadMorePending) return <Loader />;

    if (page < totalPages) {
      return (
        <BtnWrap>
          <Button onClick={() => this.handleLoadMore()}>Load More</Button>
        </BtnWrap>
      );
    }
  }

  renderModal() {
    const { activeImage } = this.state;

    if (!activeImage) return;

    const { href, title } = activeImage;
    return (
      <Modal onClose={this.hideModal}>
        <img src={href} alt={title} />
      </Modal>
    );
  }
}

export default ImageGallery;
