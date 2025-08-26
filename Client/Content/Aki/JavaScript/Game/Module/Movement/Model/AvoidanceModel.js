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
    this.Rnd = undefined;
    this.wnd = undefined;
    this.UseRVOAvoidance = false;
    this.SceneItemAvoidanceRadius = 200;
  }
  get ZeroTuple32() {
    if (this.wnd === undefined) {
      this.wnd = GameUtils_1.GameUtils.CreateFixedLengthTuple(32, false);
    }
    return this.wnd;
  }
  GetSingleBitMask(e) {
    var t;
    if (e < 0 || e >= 32) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 72, `[AvoidanceModel.GetSingleBitMask] ${e}非法`);
      }
      return new UE.NavAvoidanceMask();
    } else if (AvoidanceModel.Lnd) {
      this.ZeroTuple32[e] = true;
      t = new UE.NavAvoidanceMask(...this.ZeroTuple32);
      this.ZeroTuple32[e] = false;
      return t;
    } else {
      if (this.Rnd === undefined) {
        this.Rnd = GameUtils_1.GameUtils.CreateFixedLengthTuple(32, undefined);
      }
      if (this.Rnd[e] === undefined) {
        this.Rnd[e] = GameUtils_1.GameUtils.CreateFixedLengthTuple(32, false);
        this.Rnd[e][e] = true;
      }
      return new UE.NavAvoidanceMask(...this.Rnd[e]);
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
(exports.AvoidanceModel = AvoidanceModel).Lnd = true;
//# sourceMappingURL=AvoidanceModel.js.map