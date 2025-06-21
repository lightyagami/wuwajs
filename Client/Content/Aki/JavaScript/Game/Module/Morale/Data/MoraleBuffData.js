"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffData = void 0;
const ModelManager_1 = require("../../../Manager/ModelManager");
class MoraleBuffData {
  constructor(t) {
    this.Id = 0, this.Config = void 0, this.IsSelect = !1, this.StartStageLv = 0, this.EndStageLv = 0, this.Index = 0, this.Id = t.Id, this.Config = t
  }
  static Create(t) {
    t = new MoraleBuffData(t);
    return t.AU(), t
  }
  AU() {
    this.EndStageLv = this.Config.LvStage
  }
  SetStartStageLv(t) {
    this.StartStageLv = t
  }
  SetIndex(t) {
    this.Index = t
  }
  GetActiveState() {
    var t = this.Config.LvStage,
      e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel();
    return t <= e ? 1 : t <= e + ModelManager_1.ModelManager.MoraleBattleModel.GetTempMoraleLevel() ? 0 : 2
  }
  IsActive() {
    return 1 === this.GetActiveState()
  }
  IsTempActive() {
    return 0 === this.GetActiveState()
  }
  IsNotActive() {
    return 2 === this.GetActiveState()
  }
  IsActiveOrTempActive() {
    var t = this.GetActiveState();
    return 1 === t || 0 === t
  }
  SetSelectState(t) {
    this.IsSelect = t
  }
}
exports.MoraleBuffData = MoraleBuffData;
//# sourceMappingURL=MoraleBuffData.js.map