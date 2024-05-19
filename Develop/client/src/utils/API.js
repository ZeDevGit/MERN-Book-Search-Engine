import { gql } from '@apollo/client';
import { client } from './client';

// Route to get logged in user's info
export const getMe = async () => {
  const GET_ME = gql`
    query Me {
      me {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  `;

  try {
    const response = await client.query({
      query: GET_ME,
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('id_token')}`,
        },
      },
    });
    return response.data.me;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Route to create a new user
export const createUser = async (userData) => {
  const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
      createUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
  `;
    try {
      const response = await client.mutate({
        mutation: CREATE_USER,
        variables: userData,
      });

      if (response && response.data && response.data.createUser) {
        return response.data.createUser;
      } else {
        throw new Error('User creation failed!');
      }
    } catch (err) {
      console.error('Error creating user: ', err);
      throw err;
    }
};

// Route to login a user and return the token
export const loginUser = async (userData) => {
  const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: LOGIN_USER,
      variables: userData,
    });
    return response.data.login;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Route to save a book to a user's account
export const saveBook = async (bookData) => {
  const SAVE_BOOK = gql`
    mutation SaveBook($bookData: BookInput!) {
      saveBook(bookData: $bookData) {
        _id
        username
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: SAVE_BOOK,
      variables: { bookData },
    });
    return response.data.saveBook;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Route to remove a book from a user's account
export const deleteBook = async (bookId) => {
  const DELETE_BOOK = gql`
    mutation RemoveBook($bookId: ID!) {
      removeBook(bookId: $bookId) {
        _id
        username
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  `;

  try {
    const response = await client.mutate({
      mutation: DELETE_BOOK,
      variables: { bookId },
    });
    return response.data.deleteBook;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};