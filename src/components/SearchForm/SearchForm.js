import { Component } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, ButtonLabel, Input } from './SearchForm.styled';

class SearchForm extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    const normilizedQuery = query.trim();

    this.props.onSubmit(normilizedQuery);
    this.setState({ query: normilizedQuery });

    if (!normilizedQuery) {
      toast.warning('Please, enter your search query.');
    }
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
      </Form>
    );
  }
}

export default SearchForm;
