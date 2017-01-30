import AppConfig from './config';

export const joinLogItems = (state) => {
  let items = {};
  state.logLevel.forEach((level, i, levels) => {
    let levelType = AppConfig.errorLevels.filter((e)=>e.key === level)[0].type;
    items = {
      ...items,
      ...state.logEntries[levelType]
    }
  });
  return items;
};

export const filterCounters = (state) => {
  let counters = {};
  state.logLevel.forEach((level) => {
    let type = AppConfig.errorLevels.filter((configLevel) => configLevel.key === level)[0].type;
    counters[type] = state.counters[type];
  });

  return counters;
};
