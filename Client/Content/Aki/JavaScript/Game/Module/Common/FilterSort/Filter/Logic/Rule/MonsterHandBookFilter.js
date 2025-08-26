"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterHandBookFilter = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const CommonFilter_1 = require("./CommonFilter");
class MonsterHandBookFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.eDt = e => {
      return ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetMonsterDetectionConfById(e)?.DangerType ?? 0;
    };
    this.tDt = e => {
      return ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetMonsterDetectionConfById(e)?.TypeDescription2 ?? 0;
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(7, this.eDt);
    this.FilterMap.set(17, this.tDt);
  }
}
exports.MonsterHandBookFilter = MonsterHandBookFilter;
//# sourceMappingURL=MonsterHandBookFilter.js.map