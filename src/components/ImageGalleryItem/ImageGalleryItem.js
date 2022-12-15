import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ img }) => {
  const { webformatURL, largeImageURL, tags } = img;

  return (
    <Item>
      <Image src={webformatURL} alt={tags} loading="lazy" />
    </Item>
  );
};

export default ImageGalleryItem;
