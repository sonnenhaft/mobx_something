import React from 'react';
import { NavLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const NiceMenu = styled.nav`
    list-style: none outside none;
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 8px;

    a {
        border-bottom: 2px solid #dddddd;
        cursor: pointer;
        margin: 0;
        width: 100px;
        position: relative;
        display: block;
        text-align: center;
        font-size: 20px;
        color: black;
        text-decoration: none;
        padding: 7px 15px;
    }

    a:hover:after,
    a.active:after {
        border: 1px solid #414098;
        content: '';
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
    }

    a:hover:not(.active):after {
        border-color: #a6a5ff;
    }
`;

export const Menu = ({
    links
}: {
    links: {
        path: string;
        name?: string;
        exact?: boolean;
        component: LinkProps['component'];
    }[];
}) => (
    <NiceMenu>
        {links
            .filter(item => item.name)
            .map(item => (
                <NavLink
                    key={item.name + item.path}
                    activeClassName="active"
                    to={item.path}
                    exact={item.exact}
                >
                    {item.name}
                </NavLink>
            ))}
    </NiceMenu>
);
