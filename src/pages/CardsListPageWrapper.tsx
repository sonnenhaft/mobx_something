import styled from 'styled-components';

export const CardsListPageWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 8px;

    > a {
        display: block;
        border: 1px solid #ccc;
        margin: 4px;
        border-radius: 4px;
        text-decoration: none;
        color: black;

        p {
            padding: 0;
            margin: 8px;
        }

        &:hover {
            cursor: pointer;
            border-color: #747474;
        }
    }
`;
