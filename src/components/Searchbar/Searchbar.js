import PropTypes from 'prop-types';
import SearchForm from 'components/SearchForm';
import { Header } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  return (
    <Header className="header">
      <SearchForm onSubmit={onSubmit} />
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
