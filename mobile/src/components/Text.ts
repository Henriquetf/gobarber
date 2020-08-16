import styled from 'styled-components/native';

import {
  RobotoSlabRegular,
  RobotoSlabMedium,
} from '../styles/fonts/RobotoSlab';

const fontSizes = {
  regular: RobotoSlabRegular,
  medium: RobotoSlabMedium,
};

interface TextProps {
  size?: keyof typeof fontSizes;
}

const Text = styled.Text<TextProps>`
  ${(props) => fontSizes[props.size || 'regular']}
`;

export default Text;
