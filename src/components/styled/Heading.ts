import styled from 'styled-components'

const Heading = styled.h1<{ $color?: string }>`
  font-size: 1.5em;
  text-align: center;
  color: ${(props) => props.$color || 'green'};
`

export default Heading
