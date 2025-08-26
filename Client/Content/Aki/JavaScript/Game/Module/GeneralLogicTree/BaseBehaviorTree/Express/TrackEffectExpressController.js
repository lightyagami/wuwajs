"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackEffectExpressController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const PROFILE_KEY = "TrackedMark_CreateTrackEffect";
const OFFSET_Z = 1000;
class TrackEffectExpressController {
  constructor(t, e) {
    this.Yre = e;
    this.OQt = undefined;
    this.kQt = undefined;
    this.OnBattleViewActive = () => {
      if (this.kQt) {
        for (var [, t] of this.kQt) {
          t.OnBattleViewActive();
        }
      }
    };
    this.OnBattleViewHide = () => {
      if (this.kQt) {
        for (var [, t] of this.kQt) {
          t.OnBattleViewHide();
        }
      }
    };
    this.OQt = t;
    this.kQt = new Map();
  }
  Clear() {
    if (this.kQt) {
      for (var [, t] of this.kQt) {
        t.Destroy();
      }
      this.kQt.clear();
    }
    this.OQt = undefined;
  }
  EnableTrack(t) {
    if (this.kQt) {
      for (var [, e] of this.kQt) {
        if (t) {
          e.Start();
        } else {
          e.End();
        }
      }
    }
  }
  UpdateOnChildQuestNodeStatusChange(t, e, i) {
    var s = t.TrackTarget;
    if (s && s.EffectOption && (e && this.gY1(t.NodeId, s.EffectOption, this.Yre.IsTracking), i)) {
      this.CY1(t.NodeId);
    }
  }
  gY1(t, e, i) {
    t = this.FQt(t, e);
    if (i) {
      t.Start();
    }
  }
  CY1(t) {
    this.GetNodeTrackMarkCreator(t)?.End();
    this.kQt.delete(t);
  }
  FQt(t, e) {
    var i = this.GetNodeTrackMarkCreator(t);
    return i || (i = new NodeTrackEffect(this.OQt, t, e), this.kQt.set(t, i), i);
  }
  GetNodeTrackMarkCreator(t) {
    return this.kQt.get(t);
  }
  OnBtApplyExpressionOccupation(t) {
    if (!t) {
      for (var [, e] of this.kQt) {
        e.OnExpressOccupied();
      }
    }
  }
  OnBtReleaseExpressionOccupation(t) {
    if (!t) {
      for (var [, e] of this.kQt) {
        e.OnExpressOccupationRelease();
      }
    }
  }
}
exports.TrackEffectExpressController = TrackEffectExpressController;
class NodeTrackEffect {
  constructor(t, e, i) {
    this.OQt = undefined;
    this.Jut = 0;
    this.VQt = 0;
    this.HQt = 0;
    this.jQt = 0;
    this.WQt = 0;
    this.Wse = undefined;
    this.j3 = undefined;
    this.KQt = 0;
    this.QQt = false;
    this.pCt = false;
    this.OnBattleViewActive = () => {
      var t = this.OQt.GetTrackDistance(this.Jut);
      this.QQt = t < this.jQt;
      this.XQt(this.VQt, !this.QQt);
      this.XQt(this.HQt, this.QQt);
      if (this.j3 && this.j3.IsPause()) {
        this.j3.Resume();
      }
    };
    this.OnBattleViewHide = () => {
      this.xmt();
      if (this.j3 && !this.j3.IsPause()) {
        this.j3.Pause();
      }
    };
    this.$Qt = () => {
      var t;
      if (this.pCt || (t = this.OQt.GetTrackDistance(this.Jut)) <= 0) {
        this.xmt();
      } else {
        if (!this.QQt && t < this.jQt) {
          this.QQt = true;
          this.XQt(this.VQt, false);
          this.XQt(this.HQt, true);
        }
        if (this.QQt && t >= this.WQt) {
          this.QQt = false;
          this.XQt(this.VQt, true);
          this.XQt(this.HQt, false);
        }
      }
    };
    if (!NodeTrackEffect.uoe) {
      NodeTrackEffect.Rmt();
    }
    this.Jut = e;
    this.OQt = t;
    this.jQt = i.EnterRange;
    this.WQt = i.LeaveRange;
    this.Wse = Vector_1.Vector.Create();
  }
  Destroy() {
    this.End();
    this.OQt = undefined;
  }
  static Rmt() {
    var t = UE.NewObject(UE.TraceLineElement.StaticClass());
    t.WorldContextObject = GlobalData_1.GlobalData.World;
    t.bIsSingle = true;
    t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
    NodeTrackEffect.uoe = t;
  }
  Start() {
    this.QQt = undefined;
    this.KQt = 0;
    var t;
    var e;
    var i = ConfigManager_1.ConfigManager.QuestNewConfig.GetTrackEffectPath("LongLightBeam");
    if (StringUtils_1.StringUtils.IsEmpty(i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "找不到追踪特效配置路径", ["trackEffectType", "LongLightBeam"]);
      }
    } else {
      t = ConfigManager_1.ConfigManager.QuestNewConfig.GetTrackEffectPath("ShortLightBeam");
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "找不到追踪特效配置路径", ["trackEffectType", "ShortLightBeam"]);
        }
      } else if (e = this.OQt.GetNodeTrackPosition(this.Jut)) {
        this.VQt = this.Pmt("LongLightBeam", i, e);
        this.HQt = this.Pmt("ShortLightBeam", t, e);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GeneralLogicTree", 18, "找不到追踪位置", ["trackEffectType", "ShortLightBeam"], ["nodeId", this.Jut]);
      }
    }
  }
  End() {
    if (TimerSystem_1.TimerSystem.Has(this.j3)) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
    }
    this.j3 = undefined;
    if (EffectSystem_1.EffectSystem.IsValid(this.VQt)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.VQt, "[TrackEffectExpress.End]", true);
    }
    this.VQt = 0;
    if (EffectSystem_1.EffectSystem.IsValid(this.HQt)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.HQt, "[TrackEffectExpress.End]", true);
    }
    this.HQt = 0;
  }
  Pmt(i, t, e) {
    var s = NodeTrackEffect.uoe;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, e);
    s.SetEndLocation(e.X, e.Y, e.Z + OFFSET_Z);
    this.Wse.FromUeVector(e);
    var e = TraceElementCommon_1.TraceElementCommon.LineTrace(s, PROFILE_KEY);
    var s = s.HitResult;
    if (e && s.bBlockingHit) {
      this.Wse.Z = s.LocationZ_Array.Get(0);
    }
    this.Wse.Z -= 5;
    var e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, this.Wse.ToUeVector(), Vector_1.Vector.OneVectorDouble), t, "[TrackEffectExpress.CreateTrackEffect]", undefined, 3, undefined, (t, e) => {
      if (t === 5) {
        this.YQt(i, e ?? 0);
      }
    });
    return e;
  }
  YQt(t, e) {
    EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(e, () => this.OQt !== undefined);
    var i = this.OQt.GetTrackDistance(this.Jut);
    this.QQt = i < this.jQt;
    var i = t === "LongLightBeam" ? !this.QQt : this.QQt;
    this.XQt(e, i);
    this.KQt++;
    if (this.KQt === 2) {
      this.j3 = TimerSystem_1.TimerSystem.Forever(this.$Qt, 1000);
    }
  }
  xmt() {
    this.XQt(this.VQt, false);
    this.XQt(this.HQt, false);
  }
  XQt(t, e) {
    EffectSystem_1.EffectSystem.SetEffectHidden(t, !e);
  }
  OnExpressOccupied() {
    this.pCt = true;
  }
  OnExpressOccupationRelease() {
    this.pCt = false;
  }
}
NodeTrackEffect.uoe = undefined;
//# sourceMappingURL=TrackEffectExpressController.js.map