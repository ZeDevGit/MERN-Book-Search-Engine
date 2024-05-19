import { gql } from '@apollo/client';
import { client } from './client';

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

    export const searchGoogleBooks = async (searchInput) => {
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
    };