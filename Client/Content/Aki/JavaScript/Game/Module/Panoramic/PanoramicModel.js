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
    this.UVm = undefined;
    this.xVm = undefined;
    this.cSa = false;
    this.fnf = false;
    this.Qvf = 0;
  }
  get IsPanoramic() {
    return this.fnf;
  }
  set IsPanoramic(t) {
    this.fnf = t;
  }
  get PlayMoveMotorTag() {
    return this.Qvf;
  }
  set PlayMoveMotorTag(t) {
    this.Qvf = t;
  }
  OnInit() {
    this.UVm = undefined;
    this.cSa = false;
    this.fnf = false;
    this.xVm = new Map();
    return true;
  }
  OnClear() {
    this.UVm = undefined;
    this.cSa = false;
    this.fnf = false;
    this.ClearPoint();
    return true;
  }
  OnLeaveLevel() {
    this.UVm = undefined;
    this.cSa = false;
    this.fnf = false;
    this.ClearPoint();
    return true;
  }
  AddPoint(t, i) {
    this.xVm ||= new Map();
    if (this.xVm?.has(t) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Panoramic", 45, "[环视] AddPoint but already have", ["Id", t]);
    }
    this.xVm?.set(t, i);
  }
  RemovePoint(t) {
    var i;
    if (this.xVm?.has(t)) {
      i = this.xVm?.get(t);
      if (this.UVm === i) {
        this.UVm = undefined;
      }
      this.xVm?.delete(t);
    }
  }
  ClearPoint() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Panoramic", 45, "[环视] ClearPoint");
    }
    this.xVm?.clear();
    this.xVm = undefined;
  }
  FindPoint(t) {
    if (this.xVm?.has(t)) {
      return this.xVm?.get(t);
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Panoramic", 45, "[环视] FindPoint not find");
    }
  }
  GetPoint() {
    return this.xVm;
  }
  GetPointNum() {
    return this.xVm?.size ?? 0;
  }
  SetCurrentPanoramic(t, i = false) {
    if (!t) {
      if (i) {
        this.UVm = undefined;
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
    if (t?.GetId() !== this.UVm?.GetId()) {
      this.ChangeAllPanoramicTypeExecptWhich(0, t?.GetId());
      this.UVm = t;
    }
    this.UVm?.ChangeSpotType(1);
  }
  GetCurrentPanoramic() {
    return this.UVm;
  }
  ChangeAllPanoramicType(i) {
    this.xVm?.forEach(t => {
      t.ChangeSpotType(i);
    });
  }
  ChangeAllPanoramicTypeExecptWhich(i, e) {
    this.xVm?.forEach(t => {
      if (t.GetId() !== e) {
        t.ChangeSpotType(i);
      }
    });
  }
}
exports.PanoramicModel = PanoramicModel;
//# sourceMappingURL=PanoramicModel.js.map