"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiWanderInfos = undefined;
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
class AiWanderInfos {
  constructor() {
    this.AiWander = undefined;
    this.AiBattleWanderGroups = undefined;
    this.CurrentBattleWanderIndex = 0;
    this.wre = undefined;
    this.Bre = undefined;
    this.BattleWanderAddTime = 0;
  }
  SetOverrideBattleWanderTime(t, i) {
    this.wre = t;
    this.Bre = i;
  }
  GetCurrentBattleWander() {
    return this.AiBattleWanderGroups[this.CurrentBattleWanderIndex];
  }
  RandomBattleWanderEndTime() {
    var t;
    if (this.wre && this.wre <= this.Bre) {
      return MathUtils_1.MathUtils.GetRandomRange(this.wre, this.Bre);
    } else {
      t = this.GetCurrentBattleWander().SumWanderTime;
      return MathUtils_1.MathUtils.GetRandomRange(t.Min, t.Max);
    }
  }
}
exports.AiWanderInfos = AiWanderInfos;
//# sourceMappingURL=AiWanderInfos.js.map