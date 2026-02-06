"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChargeSlashCurveControl = exports.CurveControlBase = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const MATERIAL_PERFORMANCE_TIME = 800;
const raisePerformanceTagId = -880666116;
const rebornPerformanceTagId = -1324562569;
class CurveControlBase {
  constructor() {
    this.Zst = 0;
    this.Entity = undefined;
    this.StartTime = 0;
    this.LoopTime = 0;
    this.EndTime = 0;
    this.CurTime = 0;
  }
  get CurStage() {
    return this.Zst;
  }
  SetAllTime(t, s, i) {
    this.StartTime = t;
    this.LoopTime = s;
    this.EndTime = i;
  }
  Init(t, s) {
    this.Zst = 0;
    this.CurTime = 0;
    this.Entity = t;
    this.OnInit(s);
  }
  Start() {
    this.Zst = 0;
    this.CurTime = 0;
    this.OnStart();
  }
  Stop(t = false) {
    if (t) {
      this.Zst = 3;
      this.CurTime = this.StartTime + this.LoopTime + this.EndTime;
    } else {
      this.Zst = 2;
      this.CurTime = this.StartTime + this.LoopTime;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItemCurveControl", 31, "[CurveControlBase.Stop]", ["Stage", this.Zst], ["Time", this.CurTime]);
    }
  }
  Tick(t) {
    if (!this.TickStage(t)) {
      return false;
    }
    switch (this.Zst) {
      case 0:
        this.TickStartStage();
        break;
      case 1:
        this.TickLoopStage();
        break;
      case 2:
        this.TickEndStage();
    }
    return true;
  }
  TickStage(t) {
    this.CurTime += t;
    if (this.CurTime < this.StartTime) {
      this.Zst = 0;
    } else if (this.CurTime > this.StartTime && this.CurTime < this.StartTime + this.LoopTime) {
      this.Zst = 1;
    } else {
      if (!(this.CurTime > this.StartTime + this.LoopTime) || !(this.CurTime < this.StartTime + this.LoopTime + this.EndTime)) {
        return !(this.Zst = 3);
      }
      this.Zst = 2;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItemCurveControl", 31, "[CurveControlBase.TickStage]", ["Stage", this.Zst], ["Time", this.CurTime]);
    }
    return true;
  }
  TickStartStage() {}
  TickLoopStage() {}
  TickEndStage() {}
  OnInit(t) {}
  OnStart() {}
  IsStop() {
    return this.Zst === 2 || this.Zst === 3;
  }
}
class ChargeSlashCurveControl extends (exports.CurveControlBase = CurveControlBase) {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this.esr = Vector_1.Vector.Create();
    this.pb1 = 0;
    this.vb1 = undefined;
    this.rB1 = false;
    this.oB1 = false;
    this.nB1 = false;
  }
  OnInit(t) {
    this.Hte = this.Entity?.GetComponent(214);
    this.Lie = this.Entity?.GetComponent(208);
    const s = t.CurveControlConfig;
    this.pb1 = s.UpHeight;
    if (s.UpCurvePath && !StringUtils_1.StringUtils.IsEmpty(s.UpCurvePath)) {
      ResourceSystem_1.ResourceSystem.LoadAsync(s.UpCurvePath, UE.CurveFloat, t => {
        if (t) {
          this.vb1 = t;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItemCurveControl", 31, "[ChargeSlashCurveControl.OnInit] RiseCurve Load Failed", ["Path", s.UpCurvePath]);
        }
      });
    }
  }
  OnStart() {
    this.esr.DeepCopy(this.Hte.ActorLocationProxy);
    this.rB1 = false;
    this.oB1 = false;
    this.nB1 = false;
  }
  TickStartStage() {
    var t;
    var s;
    if (this.vb1) {
      if (!this.rB1) {
        this.rB1 = true;
        if (this.Lie?.HasTag(rebornPerformanceTagId)) {
          this.Lie?.RemoveTag(rebornPerformanceTagId);
        }
        this.Lie?.AddTag(raisePerformanceTagId);
      }
      t = this.CurTime / this.StartTime;
      t = this.vb1.GetFloatValue(t);
      (s = Vector_1.Vector.Create()).DeepCopy(this.esr);
      s.Z += t * this.pb1;
      this.Hte.SetActorLocation(s.ToUeVector(), "ChargeSlashCurveControl.StartStage");
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItemCurveControl", 31, "[ChargeSlashCurveControl.TickStartStage] RiseCurve is null", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
  }
  TickEndStage() {
    if (this.CurTime > this.StartTime + this.LoopTime && !this.oB1) {
      this.oB1 = true;
      this.Lie?.RemoveTag(raisePerformanceTagId);
    } else if (this.CurTime > this.StartTime + this.LoopTime + MATERIAL_PERFORMANCE_TIME && !this.nB1) {
      this.nB1 = true;
      this.Hte?.SetActorLocation(this.esr.ToUeVector(), "ChargeSlashCurveControl.EndStage");
      this.Lie?.AddTag(rebornPerformanceTagId);
    }
  }
}
exports.ChargeSlashCurveControl = ChargeSlashCurveControl;
//# sourceMappingURL=CurveControlDefine.js.map