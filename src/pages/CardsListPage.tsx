import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useStores } from '../mobx';
import { CardInterface } from '../utils';

import styled from 'styled-components';

const CardsListPageWrapper = styled.div`
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

export const CardsListPage = () => {
    const { cardsListStore } = useStores();
    useEffect(() => {
        !cardsListStore.cardsList && cardsListStore.load();
    }, [cardsListStore]);

    if (!cardsListStore.cardsList) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    } else {
        return (
            <CardsListPageWrapper>
                {cardsListStore.cardsList.map((props: CardInterface) => (
                    <NavLink to={`/edit/${props.id}`} key={props.id}>
                        <p>{props.name}</p>

                        <p>
                            <b>ID:</b> {props.id}
                        </p>

                        <p>
                            <b>Status:</b> {props.status}
                        </p>
                    </NavLink>
                ))}
            </CardsListPageWrapper>
        );
    }
};
