import styled from 'styled-components/macro'

export default function Input({
  className = 'flex-label',
  name,
  placeholder,
  required,
  autoFocus,
  title,
  type,
  min,
  max,
  pattern,
  step,
  children,
}) {
  return (
    <Label className={className}>
      {children}
      <input
        autoComplete="off"
        {...{
          name,
          placeholder,
          required,
          autoFocus,
          title,
          type,
          min,
          max,
          pattern,
          step,
        }}
      />
    </Label>
  )
}

export const Label = styled.label`
  width: 100%;
  margin-bottom: 10px;

  &.flex-label {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  &.big-label {
    display: block;

    input {
      margin-left: 0;
    }
  }

  &.small-label {
    display: block;
    width: 100%;
    input {
      margin: 0;
    }
  }

  input {
    padding: 0.2rem 0.5rem;
    margin-left: 10px;
    font-size: 16px;

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &[type='date'] {
      opacity: 0.5;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`
