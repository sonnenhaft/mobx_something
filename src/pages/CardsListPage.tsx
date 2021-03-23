import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CardInterface, getCardsResourceMock, useAsync } from 'utils';
import { CardsListPageWrapper } from './CardsListPageWrapper';

export const CardsListPage = () => {
    const [{ data: cards }, load] = useAsync<CardInterface[]>(() =>
        getCardsResourceMock().getAll()
    );
    useEffect(load, []);

    if (!cards) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    } else {
        return (
            <CardsListPageWrapper>
                {cards.map(
                    // @ts-ignore
                    props => (
                        <NavLink to={`/edit/${props.id}`} key={props.id}>
                            <p>{props.name}</p>

                            <p>
                                <b>ID:</b> {props.id}
                            </p>

                            <p>
                                <b>Status:</b> {props.status}
                            </p>
                        </NavLink>
                    )
                )}
            </CardsListPageWrapper>
        );
    }
};
