"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class TrackModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.pRo = undefined;
    this.vRo = undefined;
    this.MRo = undefined;
    this.DefaultTrackHideDis = 0;
    this.d4u = false;
  }
  OnInit() {
    this.pRo = new Map();
    this.vRo = new Map();
    this.MRo = new Map();
    this.DefaultTrackHideDis = parseInt(ConfigManager_1.ConfigManager.QuestNewConfig.GetGlobalConfig("TrackMarkHideDis"));
    return true;
  }
  OnClear() {
    if (this.pRo) {
      this.pRo.clear();
      this.pRo = undefined;
    }
    if (this.vRo) {
      this.vRo.clear();
      this.vRo = undefined;
    }
    if (this.MRo) {
      this.MRo.clear();
      this.MRo = undefined;
    }
    return true;
  }
  OnLeaveLevel() {
    return true;
  }
  AddTrackData(e) {
    let t = this.GetTracksByType(e.TrackSource);
    if (!t) {
      t = new Map();
      this.pRo.set(e.TrackSource, t);
    }
    e.TrackHideDis ||= this.DefaultTrackHideDis;
    t.set(e.Id, e);
    this.ERo(e);
  }
  RemoveTrackData(e, t) {
    var i;
    var e = this.GetTracksByType(e);
    if (e) {
      i = e.get(t);
      e.delete(t);
      this.SRo(i);
    }
  }
  ClearTrackData() {
    this.pRo.clear();
    this.vRo.clear();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearTrackMark);
  }
  ERo(t) {
    if (t && t.ShowGroupId !== undefined) {
      let e = this.vRo.get(t.ShowGroupId);
      (e = e || new Map()).set(t.Id, t);
    }
  }
  SRo(e) {
    var t;
    if (e && e.ShowGroupId !== undefined && (t = this.vRo.get(e.ShowGroupId))) {
      t.delete(e.Id);
    }
  }
  IsTargetTracking(e) {
    let t = undefined;
    let i = undefined;
    for (var [r, s] of this.pRo) {
      for (var [, a] of s) {
        if (a.TrackTarget === e && (t || (t = r, i = a), r > t)) {
          i = a;
          t = r;
        }
      }
    }
    return i;
  }
  GetTrackData(e, t) {
    e = this.GetTracksByType(e);
    if (e) {
      return e.get(t);
    }
  }
  UpdateTrackData(e, t, i) {
    var r = this.GetTrackData(e, t);
    if (r) {
      r.TrackTarget = i;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateTrackTarget, e, t, i);
    }
  }
  GetTracksByType(e) {
    return this.pRo.get(e);
  }
  IsTracking(e, t) {
    return e !== undefined && t !== undefined && !!(e = this.GetTracksByType(e)) && e.has(t);
  }
  UpdateGroupMinDistance(e, t) {
    var i;
    if (this.MRo && e && (!(i = this.MRo.get(e)) || t <= i)) {
      this.MRo.set(e, t);
    }
  }
  CanShowInGroup(e, t) {
    return !this.MRo || !e || !(e = this.MRo.get(e)) || t <= e;
  }
  ClearGroupMinDistance() {
    this.MRo?.clear();
  }
  IsForceCloseTracked() {
    return this.d4u;
  }
  SetForceCloseTracked(e) {
    this.d4u = e;
  }
}
exports.TrackModel = TrackModel;
//# sourceMappingURL=TrackModel.js.map