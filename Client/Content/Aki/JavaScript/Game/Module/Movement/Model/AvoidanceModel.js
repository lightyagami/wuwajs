"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvoidanceModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const GameUtils_1 = require("../../../GameUtils");
class AvoidanceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Hsd = undefined;
    this.$sd = undefined;
    this.UseRVOAvoidance = false;
    this.SceneItemAvoidanceRadius = 200;
  }
  get ZeroTuple32() {
    if (this.$sd === undefined) {
      this.$sd = GameUtils_1.GameUtils.CreateFixedLengthTuple(32, false);
    }
    return this.$sd;
  }
  GetSingleBitMask(e) {
    var t;
    if (e < 0 || e >= 32) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 72, `[AvoidanceModel.GetSingleBitMask] ${e}非法`);
      }
      return new UE.NavAvoidanceMask();
    } else if (AvoidanceModel.Wsd) {
      this.ZeroTuple32[e] = true;
      t = new UE.NavAvoidanceMask(...this.ZeroTuple32);
      this.ZeroTuple32[e] = false;
      return t;
    } else {
      if (this.Hsd === undefined) {
        this.Hsd = GameUtils_1.GameUtils.CreateFixedLengthTuple(32, undefined);
      }
      if (this.Hsd[e] === undefined) {
        this.Hsd[e] = GameUtils_1.GameUtils.CreateFixedLengthTuple(32, false);
        this.Hsd[e][e] = true;
      }
      return new UE.NavAvoidanceMask(...this.Hsd[e]);
    }
  }
  get PlayerAvoidanceGroupMask() {
    return this.GetSingleBitMask(31);
  }
  get SceneItemAvoidanceGroupMask() {
    return this.GetSingleBitMask(6);
  }
  get SceneItemGroupsToAvoidMask() {
    return this.GetSingleBitMask(31);
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
}
(exports.AvoidanceModel = AvoidanceModel).Wsd = true;
//# sourceMappingURL=AvoidanceModel.js.map