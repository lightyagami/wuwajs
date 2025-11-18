"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeTrackControlModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class TimeTrackControlModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.zxe = undefined;
    this.Zxe = undefined;
    this.ewe = undefined;
    this.twe = 0;
    this.iwe = 0;
    this.owe = false;
    this.rwe = 0;
    this.FBn = 0;
    this.nwe = undefined;
    this.swe = undefined;
  }
  get CreatureDataId() {
    return this.twe;
  }
  get ControlPoint() {
    return this.iwe;
  }
  get CanUpdated() {
    return this.owe;
  }
  set CanUpdated(t) {
    this.owe = t;
  }
  get RefEntityId() {
    return this.rwe;
  }
  set RefEntityId(t) {
    this.rwe = t;
  }
  get RefTrueEntityId() {
    return this.FBn;
  }
  set RefTrueEntityId(t) {
    this.FBn = t;
  }
  get ControllerEntity() {
    return this.zxe;
  }
  SetCurrentTimeTrackControl(t, i) {
    this.zxe = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    this.Zxe = i;
    t = this.zxe?.Entity.GetComponent(0);
    this.twe = t?.GetCreatureDataId() ?? 0;
    this.awe();
    this.owe = true;
  }
  awe() {
    var t;
    if (this.zxe && this.Zxe !== undefined && (t = this.zxe.Entity.GetComponent(138))) {
      this.ewe = t.GetTimeTrackControlConfig(this.Zxe);
    }
  }
  GetConfigStatesCounts() {
    if (this.ewe) {
      for (const t of this.ewe.ControlConfigs) {
        return t.ControlPoints?.length;
      }
    }
    return 0;
  }
  GetConfigSegmentTime() {
    return this.ewe && this.ewe.SegmentTime || 0.5;
  }
  InitControlInfo(t) {
    this.iwe = t.nps;
    this.nwe = t.vGs;
    this.UpdatePointsUsable();
  }
  UpdateControlInfo(t) {
    this.iwe = t;
    this.UpdatePointsUsable();
  }
  UpdatePointsUsable() {
    var i = this.GetConfigStatesCounts();
    if (i) {
      if (this.swe) {
        this.swe.fill(false);
      } else {
        this.swe = new Array(i).fill(false);
      }
      var s = this.nwe[this.iwe];
      this.swe[this.iwe] = (s.gGs || s.fGs) ?? false;
      for (let t = this.iwe - 1; t >= 0; t--) {
        if (s.gGs && this.swe[t + 1]) {
          this.swe[t] = this.nwe[t + 1].gGs ?? false;
        } else {
          this.swe[t] = false;
        }
      }
      for (let t = this.iwe + 1; t < i; t++) {
        if (s.fGs && this.swe[t - 1]) {
          this.swe[t] = this.nwe[t - 1].fGs ?? false;
        } else {
          this.swe[t] = false;
        }
      }
    }
  }
  IsControlPointUsable(t) {
    return !!this.swe?.length && !(t > this.swe.length - 1) && this.swe[t];
  }
}
exports.TimeTrackControlModel = TimeTrackControlModel;
//# sourceMappingURL=TimeTrackControlModel.js.map