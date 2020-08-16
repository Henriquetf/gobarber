import React from 'react';

import Icon, { FeatherGlyphs } from 'react-native-vector-icons/Feather';

export type { FeatherGlyphs };

interface FeatherIconProps extends React.ComponentProps<typeof Icon> {
  name: FeatherGlyphs;
}

const FeatherIcon: React.FC<FeatherIconProps> = (props) => {
  return <Icon {...props} />;
};

export default FeatherIcon;
