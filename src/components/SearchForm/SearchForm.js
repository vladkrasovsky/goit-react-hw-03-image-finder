import { Form, Button, ButtonLabel, Input } from './SearchForm.styled';

const SearchForm = () => {
  return (
    <Form>
      <Button type="submit">
        <ButtonLabel>Search</ButtonLabel>
      </Button>

      <Input
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </Form>
  );
};

export default SearchForm;
