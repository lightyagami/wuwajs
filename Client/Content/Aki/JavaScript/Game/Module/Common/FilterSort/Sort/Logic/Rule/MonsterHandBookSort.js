"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterHandBookSort = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const CommonSort_1 = require("./CommonSort");
class MonsterHandBookSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.VDt = (o, r, n) => {
      var e = ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetMonsterDetectionConfById(o)?.DangerType ?? 0;
      var t = ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetMonsterDetectionConfById(r)?.DangerType ?? 0;
      if (e !== t) {
        return (e - t) * (n ? 1 : -1);
      } else if ((e = ConfigManager_1.ConfigManager.HandBookConfig?.GetMonsterHandBookConfigById(o)?.SortId ?? 0) !== (t = ConfigManager_1.ConfigManager.HandBookConfig?.GetMonsterHandBookConfigById(r)?.SortId ?? 0)) {
        return (t - e) * (n ? 1 : -1);
      } else {
        return 0;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.VDt);
  }
}
exports.MonsterHandBookSort = MonsterHandBookSort;
//# sourceMappingURL=MonsterHandBookSort.js.map