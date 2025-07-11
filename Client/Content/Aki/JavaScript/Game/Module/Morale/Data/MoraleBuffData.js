"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBuffData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class MoraleBuffData {
  constructor(t) {
    this.Id = 0;
    this.Config = undefined;
    this.IsSelect = false;
    this.StartStageLv = 0;
    this.EndStageLv = 0;
    this.Index = 0;
    this.Id = t.Id;
    this.Config = t;
  }
  static Create(t) {
    t = new MoraleBuffData(t);
    t.AU();
    return t;
  }
  AU() {
    this.EndStageLv = this.Config.LvStage;
  }
  SetStartStageLv(t) {
    this.StartStageLv = t;
  }
  SetIndex(t) {
    this.Index = t;
  }
  GetActiveState() {
    var t = this.Config.LvStage;
    var e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel();
    if (t <= e) {
      return 1;
    } else if (t <= e + ModelManager_1.ModelManager.MoraleBattleModel.GetTempMoraleLevel()) {
      return 0;
    } else {
      return 2;
    }
  }
  IsActive() {
    return this.GetActiveState() === 1;
  }
  IsTempActive() {
    return this.GetActiveState() === 0;
  }
  IsNotActive() {
    return this.GetActiveState() === 2;
  }
  IsActiveOrTempActive() {
    var t = this.GetActiveState();
    return t === 1 || t === 0;
  }
  SetSelectState(t) {
    this.IsSelect = t;
  }
}
exports.MoraleBuffData = MoraleBuffData;
//# sourceMappingURL=MoraleBuffData.js.map