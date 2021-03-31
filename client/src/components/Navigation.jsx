import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import Hamburger from './Hamburger'

export default function Navigation() {
  const [active, setActive] = useState(null)
  return (
    <>
      <NavContainer className={active ? 'active' : ''}>
        <NavLink
          className="link-2"
          to="/tbr"
          onClick={() => setActive(!active)}
        >
          Books
        </NavLink>
        <NavLink
          className="link-3"
          to="/monthly-tbr"
          onClick={() => setActive(!active)}
        >
          Monthly TBR
        </NavLink>
        <NavLink
          className="link-4"
          to="/add"
          onClick={() => setActive(!active)}
        >
          Add book to TBR
        </NavLink>
        <NavLink
          className="link-1"
          role="button"
          to="/"
          onClick={() => setActive(!active)}
        >
          Wheel
        </NavLink>
      </NavContainer>
      <Hamburger onClick={() => setActive(!active)} active={active} />
    </>
  )
}

const NavContainer = styled.nav`
  position: absolute;
  bottom: -370px;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: flex-end;
  overflow: hidden;
  width: 160px;
  max-height: 0;
  overflow: hidden;
  text-align: right;
  padding: 0;
  background: linear-gradient(#f9f9f9dd 0%, #e5e5e5dd 100%);
  border-radius: 2px;
  transition: all 750ms cubic-bezier(0.32, 1.25, 0.375, 1.15);

  &.active {
    bottom: 0;
    max-height: 400px;
    padding: 10px 12px 50px 10px;
    transition: all 750ms cubic-bezier(0.32, 1.25, 0.375, 1.15);
  }
  a {
    display: block;
    float: right;
    clear: right;
    margin: 15px;
    padding-right: 5px;
    color: #000;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-right: 3px solid #093a40;
  }
`
