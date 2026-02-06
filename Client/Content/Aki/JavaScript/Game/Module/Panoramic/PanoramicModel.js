"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanoramicModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class PanoramicModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.J6m = undefined;
    this.Z6m = undefined;
    this.cSa = false;
    this.Baf = false;
    this.nEf = 0;
  }
  get IsPanoramic() {
    return this.Baf;
  }
  set IsPanoramic(t) {
    this.Baf = t;
  }
  get PlayMoveMotorTag() {
    return this.nEf;
  }
  set PlayMoveMotorTag(t) {
    this.nEf = t;
  }
  OnInit() {
    this.J6m = undefined;
    this.cSa = false;
    this.Baf = false;
    this.Z6m = new Map();
    return true;
  }
  OnClear() {
    this.J6m = undefined;
    this.cSa = false;
    this.Baf = false;
    this.ClearPoint();
    return true;
  }
  OnLeaveLevel() {
    this.J6m = undefined;
    this.cSa = false;
    this.Baf = false;
    this.ClearPoint();
    return true;
  }
  AddPoint(t, i) {
    this.Z6m ||= new Map();
    if (this.Z6m?.has(t) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Panoramic", 45, "[环视] AddPoint but already have", ["Id", t]);
    }
    this.Z6m?.set(t, i);
  }
  RemovePoint(t) {
    var i;
    if (this.Z6m?.has(t)) {
      i = this.Z6m?.get(t);
      if (this.J6m === i) {
        this.J6m = undefined;
      }
      this.Z6m?.delete(t);
    }
  }
  ClearPoint() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Panoramic", 45, "[环视] ClearPoint");
    }
    this.Z6m?.clear();
    this.Z6m = undefined;
  }
  FindPoint(t) {
    if (this.Z6m?.has(t)) {
      return this.Z6m?.get(t);
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Panoramic", 45, "[环视] FindPoint not find");
    }
  }
  GetPoint() {
    return this.Z6m;
  }
  GetPointNum() {
    return this.Z6m?.size ?? 0;
  }
  SetCurrentPanoramic(t, i = false) {
    if (!t) {
      if (i) {
        this.J6m = undefined;
        return;
      } else {
        this.ChangeAllPanoramicType(0);
        if (this.cSa) {
          this.cSa = false;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPanoramicDisable);
        }
        return;
      }
    }
    if (!this.cSa) {
      this.cSa = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPanoramicActive);
    }
    if (t?.GetId() !== this.J6m?.GetId()) {
      this.ChangeAllPanoramicTypeExecptWhich(0, t?.GetId());
      this.J6m = t;
    }
    this.J6m?.ChangeSpotType(1);
  }
  GetCurrentPanoramic() {
    return this.J6m;
  }
  ChangeAllPanoramicType(i) {
    this.Z6m?.forEach(t => {
      t.ChangeSpotType(i);
    });
  }
  ChangeAllPanoramicTypeExecptWhich(i, e) {
    this.Z6m?.forEach(t => {
      if (t.GetId() !== e) {
        t.ChangeSpotType(i);
      }
    });
  }
}
exports.PanoramicModel = PanoramicModel;
//# sourceMappingURL=PanoramicModel.js.map