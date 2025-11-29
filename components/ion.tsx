import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';

const Ion: React.FC<IconProps> = (props) => {
  return <Ionicons {...props} />;
};

export default Ion;
