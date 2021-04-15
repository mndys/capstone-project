import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import Hamburger from './Hamburger'

export default function Navigation({ showPromptInfo }) {
  const [active, setActive] = useState(null)
  return (
    <NavComponent>
      <NavContainer className={active ? 'active' : ''}>
        <NavLink to="/monthly-tbr" onClick={() => setActive(!active)}>
          Monthly TBR
        </NavLink>
        <NavLink to="/tbr" onClick={() => setActive(!active)}>
          Books
        </NavLink>
        <NavLink to="/add" onClick={() => setActive(!active)}>
          Add book to TBR
        </NavLink>
        <NavLink to="/" onClick={() => setActive(!active)} exact>
          Wheel
        </NavLink>
      </NavContainer>
      <Hamburger
        toggleActive={() => setActive(!active)}
        active={active}
        showPromptInfo={showPromptInfo}
      />
    </NavComponent>
  )
}

const NavComponent = styled.section`
  z-index: 6;
`

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
    color: var(--color-text);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-right: 3px solid var(--color-primary-dark);

    &.active {
      border-right: 3px solid var(--color-primary);
    }
  }
`
