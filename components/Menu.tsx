import Link from 'next/link';
import styled from 'styled-components';

const Overlay = styled.div`
  display:flex;
  justify-content: space-around;
`;

const Anchor = styled.a`
  font-size: 1.2em;
  transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
    &:hover{
      color: #FFFFFF;
      cursor: pointer;
    }
`;

const Menu = () => (
  <Overlay>
    <p>
      <Link href="/">
        <Anchor>Home</Anchor>
      </Link>
    </p>
    <p>
      <Link href="/female">
        <Anchor>Female data</Anchor>
      </Link>
    </p>
    <p>
      <Link href="/male">
        <Anchor>Male data</Anchor>
      </Link>
    </p>
    <p>
      <Link href="/genderless">
        <Anchor>Genderless data</Anchor>
      </Link>
    </p>
  </Overlay>
);

export default Menu;
