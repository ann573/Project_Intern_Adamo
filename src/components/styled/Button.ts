import styled from 'styled-components'

export const ButtonAuth = styled.button<{ disabled?: boolean }>`
  background-color: #ff7b42;
  color: white;
  font-size: 1em;
  width: 100%;
  padding: 16px;
  border: none;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-weight: 600;
  transition: background-color 0.3s;
  &:hover {
    opacity: 0.8;
  }
`
