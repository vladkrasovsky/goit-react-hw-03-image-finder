import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ img, onClick }) => {
  const { webformatURL, largeImageURL, tags } = img;

  return (
    <Item>
      <a onClick={onClick} href={largeImageURL} title={tags}>
        <Image src={webformatURL} alt={tags} loading="lazy" />
      </a>
    </Item>
  );
};

export default ImageGalleryItem;
