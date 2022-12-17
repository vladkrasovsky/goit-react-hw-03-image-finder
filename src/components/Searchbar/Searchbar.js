import SearchForm from 'components/SearchForm';
import { Header } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  return (
    <Header className="header">
      <SearchForm onSubmit={onSubmit} />
    </Header>
  );
};

export default Searchbar;
