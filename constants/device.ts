import { Dimensions, Platform, StatusBar } from 'react-native';

const android = Platform.OS === 'android';
const ios = Platform.OS === 'ios';
const web = Platform.OS === 'web';

const windowInfo = Dimensions.get('window');
const { height, width } = windowInfo;

const aspectRatio = height / width;

// is iPad
// const { isPad } = Platform;

// is Iphone Notch
let iphoneNotch = false;
if (ios) {
  // iphone screen breakdown
  // https://blog.calebnance.com/development/iphone-ipad-pixel-sizes-guide-complete-list.html
  if (height === 812 || height === 844 || height === 896 || height === 926) {
    iphoneNotch = true;
  }
}

// get status-bar height
// const statusBarHeight = (() => {
//   if (android) {
//     return StatusBar.currentHeight + 10;
//   }
//   return iphoneNotch ? 55 : 35;
// })();

export default {
  android,
  ios,
  web,
  // isPad,
  height,
  width,
  aspectRatio,
  iphoneNotch,
  // statusBarHeight,
};
