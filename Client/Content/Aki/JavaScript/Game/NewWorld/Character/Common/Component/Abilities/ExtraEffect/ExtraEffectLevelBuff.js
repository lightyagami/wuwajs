"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraEffectLevelBuff = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const AbilityUtils_1 = require("../AbilityUtils");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
const LevelBuffSceneItem_1 = require("./LevelBuffs/LevelBuffSceneItem");
const LevelBuffSetWalkableFloorAngle_1 = require("./LevelBuffs/LevelBuffSetWalkableFloorAngle");
const levelBuffClassMap = {
  LevelBuffSceneItem: LevelBuffSceneItem_1.LevelBuffSceneItem,
  LevelBuffSetWalkableFloorAngle: LevelBuffSetWalkableFloorAngle_1.LevelBuffSetWalkableFloorAngle
};
class ExtraEffectLevelBuff extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.EXo = undefined;
  }
  InitParameters(e) {
    var t = e.ExtraEffectParameters[0];
    var l = e.ExtraEffectParameters.slice(1);
    var s = AbilityUtils_1.AbilityUtils.GetLevelValue(e.ExtraEffectGrowParameters1, this.Level, 0);
    var e = AbilityUtils_1.AbilityUtils.GetLevelValue(e.ExtraEffectGrowParameters2, this.Level, 0);
    var f = levelBuffClassMap[t];
    if (f) {
      this.EXo = new f(this.OwnerEntity, this.BuffId, l, s, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 28, "没有注册玩法效果", ["ClassName", t], ["Buff", this.BuffId]);
    }
  }
  OnCreated() {
    this.EXo?.OnCreated();
  }
  OnExecute() {}
  OnRemoved(e) {
    this.EXo?.OnRemoved(e);
  }
  OnStackIncreased(e, t) {
    this.EXo?.OnStackChanged(e, t, false);
  }
  OnStackDecreased(e, t, l) {
    this.EXo?.OnStackChanged(e, t, l);
  }
}
exports.ExtraEffectLevelBuff = ExtraEffectLevelBuff;
//# sourceMappingURL=ExtraEffectLevelBuff.js.map