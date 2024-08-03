import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from './queries';
import { LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK } from './mutations';

// Function to get logged in user's info
export const getMe = () => {
  const { loading, error, data } = useQuery(GET_ME);
  return { loading, error, data };
};

// Function to create a new user
export const createUser = (userData) => {
  const [addUser] = useMutation(ADD_USER);
  return addUser({ variables: { ...userData } });
};

// Function to login a user
export const loginUser = (userData) => {
  const [login] = useMutation(LOGIN_USER);
  return login({ variables: { ...userData } });
};

// Function to save book data for a logged in user
export const saveBook = (bookData) => {
  const [saveBook] = useMutation(SAVE_BOOK);
  return saveBook({ variables: { bookData } });
};

// Function to remove saved book data for a logged in user
export const deleteBook = (bookId) => {
  const [removeBook] = useMutation(REMOVE_BOOK);
  return removeBook({ variables: { bookId } });
};

// Function to make a search to Google Books API
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
