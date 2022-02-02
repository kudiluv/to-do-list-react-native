import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

type Options = Parameters<typeof ImagePicker.openPicker>[0];

const defaultOptions: Options = {
  width: 20,
  height: 20,
  cropping: true,
};

export default (options?: Options) => {
  const [image, setImage] = useState('');
  const getImg = async () => {
    try {
      const {path} = await ImagePicker.openPicker({
        ...defaultOptions,
        ...options,
      });
      setImage(path);
    } catch (error) {}
  };
  return {
    image,
    getImg,
  };
};
