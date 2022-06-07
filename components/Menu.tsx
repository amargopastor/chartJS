import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Overlay = styled.div`
  display:flex;
  justify-content: space-around;
  height:50px
`;

const Parraf = styled.p`
  margin: 0;
`;

const Anchor = styled.a`
  font-size: 1.2em;
  color: ${(props) => (props.className ? '#c9647a;' : props.className)};
  font-size: ${(props) => (props.className ? '2.3em' : props.className)};
  transition: color .3s ease-in-out, box-shadow .3s, font-size .3s ease-in-out;
    &:hover{
      color: #c9647a;
      cursor: pointer;
    };
    activeStyle={{
      fontWeight: 'bold',
      color: #ff0000, // red
    }}
`;

const Menu = () => {
  const router = useRouter();
  return (
    <Overlay>
      <Parraf>
        <Link href="/">
          <Anchor className={router.pathname === '/' ? 'active' : ''}>Home</Anchor>
        </Link>
      </Parraf>
      <Parraf>
        <Link href="/female">
          <Anchor className={router.pathname === '/female' ? 'active' : ''}>Female data</Anchor>
        </Link>
      </Parraf>
      <Parraf>
        <Link href="/male">
          <Anchor className={router.pathname === '/male' ? 'active' : ''}>Male data</Anchor>
        </Link>
      </Parraf>
      <Parraf>
        <Link href="/all">
          <Anchor className={router.pathname === '/all' ? 'active' : ''}>All data</Anchor>
        </Link>
      </Parraf>
    </Overlay>
  );
};

export default Menu;
