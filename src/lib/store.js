import { configureStore } from '@reduxjs/toolkit';
import propertiesReduce from './features/properties/propertiesSlice';
import statusAPIReduce from './features/api/statusAPISlice';
import groupStrategiesReduce from './features/group/groupStrategies';
import themeColor from './features/theme/colorTheme';
export const makeStore = () => {
  return configureStore({
    reducer: {
      properties: propertiesReduce,
      statusAPI: statusAPIReduce,
      currentGroup: groupStrategiesReduce,
      themeColor: themeColor
    }
  });
};
