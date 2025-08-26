"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelModeData = undefined;
const TrapDefenseDefine_1 = require("../TrapDefenseDefine");
const TrapDefenseLevelModeDataBase_1 = require("./TrapDefenseLevelModeDataBase");
class TrapDefenseLevelModeData extends TrapDefenseLevelModeDataBase_1.TrapDefenseLevelModeDataBase {
  Init() {}
  GetDifficultyTypeList() {
    return [TrapDefenseDefine_1.trapDefenseDifficultyLevelRecord[1], TrapDefenseDefine_1.trapDefenseDifficultyLevelRecord[2], TrapDefenseDefine_1.trapDefenseDifficultyLevelRecord[3]];
  }
  GetLevelDataListByDifficulty(a) {
    var e = this.LevelDataList.filter(e => e.IsDifficulty(a));
    e.forEach((e, a) => {
      e.SetPosition(a + 1);
    });
    return e;
  }
}
exports.TrapDefenseLevelModeData = TrapDefenseLevelModeData;
//# sourceMappingURL=TrapDefenseLevelModeData.js.map