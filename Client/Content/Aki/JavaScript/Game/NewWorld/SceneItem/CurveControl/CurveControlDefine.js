"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ChargeSlashCurveControl = exports.CurveControlBase = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  MATERIAL_PERFORMANCE_TIME = 800,
  raisePerformanceTagId = -880666116,
  rebornPerformanceTagId = -1324562569;
class CurveControlBase {
  constructor() {
    this.Zst = 0, this.Entity = void 0, this.StartTime = 0, this.LoopTime = 0, this.EndTime = 0, this.CurTime = 0
  }
  get CurStage() {
    return this.Zst
  }
  SetAllTime(t, s, i) {
    this.StartTime = t, this.LoopTime = s, this.EndTime = i
  }
  Init(t, s) {
    this.Zst = 0, this.CurTime = 0, this.Entity = t, this.OnInit(s)
  }
  Start() {
    this.Zst = 0, this.CurTime = 0, this.OnStart()
  }
  Stop(t = !1) {
    t ? (this.Zst = 3, this.CurTime = this.StartTime + this.LoopTime + this.EndTime) : (this.Zst = 2, this.CurTime = this.StartTime + this.LoopTime), Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItemCurveControl", 31, "[CurveControlBase.Stop]", ["Stage", this.Zst], ["Time", this.CurTime])
  }
  Tick(t) {
    if (!this.TickStage(t)) return !1;
    switch (this.Zst) {
      case 0:
        this.TickStartStage();
        break;
      case 1:
        this.TickLoopStage();
        break;
      case 2:
        this.TickEndStage()
    }
    return !0
  }
  TickStage(t) {
    if (this.CurTime += t, this.CurTime < this.StartTime) this.Zst = 0;
    else if (this.CurTime > this.StartTime && this.CurTime < this.StartTime + this.LoopTime) this.Zst = 1;
    else {
      if (!(this.CurTime > this.StartTime + this.LoopTime && this.CurTime < this.StartTime + this.LoopTime + this.EndTime)) return !(this.Zst = 3);
      this.Zst = 2
    }
    return Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItemCurveControl", 31, "[CurveControlBase.TickStage]", ["Stage", this.Zst], ["Time", this.CurTime]), !0
  }
  TickStartStage() {}
  TickLoopStage() {}
  TickEndStage() {}
  OnInit(t) {}
  OnStart() {}
  IsStop() {
    return 2 === this.Zst || 3 === this.Zst
  }
}
class ChargeSlashCurveControl extends(exports.CurveControlBase = CurveControlBase) {
  constructor() {
    super(...arguments), this.Hte = void 0, this.Lie = void 0, this.esr = Vector_1.Vector.Create(), this.WT1 = 0, this.QT1 = void 0, this.bU1 = !1, this.RU1 = !1, this.LU1 = !1
  }
  OnInit(t) {
    this.Hte = this.Entity?.GetComponent(202), this.Lie = this.Entity?.GetComponent(196);
    const s = t.CurveControlConfig;
    this.WT1 = s.UpHeight, s.UpCurvePath && !StringUtils_1.StringUtils.IsEmpty(s.UpCurvePath) && ResourceSystem_1.ResourceSystem.LoadAsync(s.UpCurvePath, UE.CurveFloat, t => {
      t ? this.QT1 = t : Log_1.Log.CheckError() && Log_1.Log.Error("SceneItemCurveControl", 31, "[ChargeSlashCurveControl.OnInit] RiseCurve Load Failed", ["Path", s.UpCurvePath])
    })
  }
  OnStart() {
    this.esr.DeepCopy(this.Hte.ActorLocationProxy), this.bU1 = !1, this.RU1 = !1, this.LU1 = !1
  }
  TickStartStage() {
    var t, s;
    this.QT1 ? (this.bU1 || (this.bU1 = !0, this.Lie?.HasTag(rebornPerformanceTagId) && this.Lie?.RemoveTag(rebornPerformanceTagId), this.Lie?.AddTag(raisePerformanceTagId)), t = this.CurTime / this.StartTime, t = this.QT1.GetFloatValue(t), (s = Vector_1.Vector.Create()).DeepCopy(this.esr), s.Z += t * this.WT1, this.Hte.SetActorLocation(s.ToUeVector(), "ChargeSlashCurveControl.StartStage")) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneItemCurveControl", 31, "[ChargeSlashCurveControl.TickStartStage] RiseCurve is null", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()])
  }
  TickEndStage() {
    this.CurTime > this.StartTime + this.LoopTime && !this.RU1 ? (this.RU1 = !0, this.Lie?.RemoveTag(raisePerformanceTagId)) : this.CurTime > this.StartTime + this.LoopTime + MATERIAL_PERFORMANCE_TIME && !this.LU1 && (this.LU1 = !0, this.Hte?.SetActorLocation(this.esr.ToUeVector(), "ChargeSlashCurveControl.EndStage"), this.Lie?.AddTag(rebornPerformanceTagId))
  }
}
exports.ChargeSlashCurveControl = ChargeSlashCurveControl;
//# sourceMappingURL=CurveControlDefine.js.map