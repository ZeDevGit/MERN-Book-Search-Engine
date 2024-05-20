import { gql } from '@apollo/client';
import { client } from './apolloClient';

export const addUser = async (userData) => {
    const ADD_USER = gql`
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
                mutation: ADD_USER,
                variables: userData,
            });
            return response.data.createUser;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };


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
    }

export const saveBook = async (bookData) => {
    const SAVE_BOOK = gql`
        mutation SaveBook($bookData: BookInput!) {
            saveBook(bookData: $bookData) {
                _id
                username
                email
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

export const removeBook = async (bookId) => {
    const REMOVE_BOOK = gql`
        mutation RemoveBook($bookId: ID!) {
            removeBook(bookId: $bookId) {
                _id
                username
                email
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
            mutation: REMOVE_BOOK,
            variables: { bookId },
        });
        return response.data.removeBook;
    } catch (err) {
        console.error(err);
        throw err;
    }
};