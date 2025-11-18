"use strict";

var SceneItemTrackGuideComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var n = arguments.length;
  var o = n < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, e, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        o = (n < 3 ? h(o) : n > 3 ? h(i, e, o) : h(i, e)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(i, e, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemTrackGuideComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const SceneItemSplineMoveTaskUtils_1 = require("../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTaskUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogReportController_1 = require("../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent");
const DISTANCE_SPLINE_FOUNDATION_THRESHOLD = 10000;
const SPLINE_FOUNDATION_SPEED = 150;
const DISTANCE_SQUARE_THRESHOLD = 2500;
const MOVEMENT_SPEED = 600;
const CONFIG_DEFAULT_MOVEMENT_SPEED = 50;
const MAX_MOVEMENT_SPEED = 800;
const NORMAL_RADIUS = 50;
const COMPRESS_RADIUS = 0;
let SceneItemTrackGuideComponent = SceneItemTrackGuideComponent_1 = class SceneItemTrackGuideComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.oEn = undefined;
    this.Gce = undefined;
    this.Oln = undefined;
    this.rEn = undefined;
    this.Nln = undefined;
    this.nEn = undefined;
    this.sEn = undefined;
    this.aEn = undefined;
    this.hEn = undefined;
    this.lEn = undefined;
    this._En = undefined;
    this.uEn = undefined;
    this.cEn = 0;
    this.IAl = 0;
    this.dEn = 0;
    this.fgn = -0;
    this.CEn = -0;
    this.gEn = undefined;
    this.fEn = undefined;
    this.cPl = undefined;
    this.pEn = true;
    this.b1n = false;
    this.Usi = 0;
    this.vEn = false;
    this.MEn = undefined;
    this.rzr = undefined;
    this.y1h = false;
    this.yEn = false;
    this.IEn = false;
    this.RAl = false;
    this.TEn = -0;
    this.w0n = undefined;
    this.Rne = undefined;
    this.Nsn = false;
    this.LEn = false;
    this.zun = 0;
    this.UAl = () => {
      this.RAl = false;
      this.pEn = true;
      this.Nln?.CollectSampleAndSend();
      this.Nln?.SetEnableMovementSync(false, "SceneItemTrackGuideComponent SplineMoveStopCallback");
      if (this.lEn?.IsValid() && !this.Hte?.CreatureData.GetRemoveState()) {
        var t = this.lEn;
        this.cEn = t.GetDistanceAlongSplineAtSplinePoint(this.IAl);
        this.IAl = this.IAl + 1;
        if (this.IAl > this.dEn - 1) {
          this.IAl = this.dEn - 1;
          this.cEn = this.fgn;
          switch (this.rEn) {
            case 0:
              this.Usi = 0;
              break;
            case 1:
              this.Usi = 2;
              break;
            case 2:
              this.Usi = 3;
          }
        }
        if (this.rEn === 1 && this.oEn && this.IAl === this.dEn - 1) {
          t = (this.fgn - this.cEn) * this.CEn;
          t = MathUtils_1.MathUtils.Lerp(COMPRESS_RADIUS, NORMAL_RADIUS, t);
          this.oEn.ApplyNiagaraParameters("Radius", t);
          this.oEn.ApplyNiagaraParameters("IsMoving", 1);
        }
      }
    };
    this.DEn = () => {
      this.yEn = true;
    };
    this.Jsn = () => {
      if (!ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
        this.b1n = true;
      }
    };
    this.vzr = () => {
      this.b1n = false;
    };
    this.zYe = () => {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        if (LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.w0n, false)) {
          if (this.Rne) {
            this.Enable(this.Rne, "[SceneItemTrackGuideComponent.OnChangeModeFinish] 联机启用交互");
            this.Rne = undefined;
          }
        } else {
          this.Rne = this.Disable("[SceneItemTrackGuideComponent.OnChangeModeFinish] 联机停止交互");
          this.av();
        }
      } else if (this.Rne) {
        this.Enable(this.Rne, "[SceneItemTrackGuideComponent.OnChangeModeFinish] 单机启用交互");
        this.Rne = undefined;
      }
    };
  }
  OnInitData(t) {
    var i = t.GetParam(SceneItemTrackGuideComponent_1)[0];
    if (i.SplineEntityId) {
      this.zun = i.SplineEntityId;
    }
    this.b1n = false;
    this.Usi = 0;
    this.vEn = false;
    var t = this.Entity.GetComponent(0).GetModelConfig();
    var e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-1133639932);
    this.y1h = !!t?.常驻特效列表.Get(e);
    switch (i.EndType.Type) {
      case 0:
        this.nEn = undefined;
        this.rEn = 0;
        break;
      case 1:
        this.nEn = i.EndType.FoundationId;
        this.rEn = 1;
        if (i.EndType.FinalOffset) {
          this.sEn = Vector_1.Vector.Create(i.EndType.FinalOffset.X, i.EndType.FinalOffset.Y, i.EndType.FinalOffset.Z);
        } else {
          this.sEn = Vector_1.Vector.Create();
        }
        break;
      case 2:
        this.rEn = 2;
    }
    this.cEn = 0;
    this.IAl = 0;
    this.pEn = true;
    this.hEn = Vector_1.Vector.Create();
    this._En = Vector_1.Vector.Create();
    this.uEn = Vector_1.Vector.Create();
    this.MEn = Vector_1.Vector.Create();
    this.CEn = 0;
    this.rzr = this.Entity.GetComponent(125);
    this.rzr.SetLogicRange(i.Range);
    this.Ore();
    return true;
  }
  Ore() {
    if (this.y1h) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnAddCommonEffect, this.DEn);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange, this.Jsn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
  }
  kre() {
    if (this.y1h) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnAddCommonEffect, this.DEn);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange, this.Jsn);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
  }
  OnStart() {
    var t;
    var i;
    this.Hte = this.Entity.GetComponent(206);
    if (this.Hte) {
      if (i = (t = this.Hte.CreatureData).GetBaseInfo()) {
        this.w0n = i.OnlineInteractType ?? 2;
        if (this.w0n === 1) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneGameplay", 29, "[PawnAdsorbComponent.OnStart] 不支持的联机类型配置", ["CreatureGenID:", t.GetOwnerId()], ["PbDataId:", t.GetPbDataId()]);
          }
          this.w0n = 0;
        }
        this.oEn = this.Entity.GetComponent(108);
        this.Oln = this.Entity.GetComponent(134);
        this.Nln = this.Entity.GetComponent(162);
        this.Gce = this.Entity.GetComponent(132);
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.w0n, false)) {
          this.Rne = this.Disable("[SceneItemTrackGuideComponent.OnStart] 联机停止交互");
        } else {
          this.HC();
        }
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 29, "[PawnAdsorbComponent.OnStart] SceneItemPatrolComponent初始化失败 Config Invalid", ["CreatureGenID:", t.GetOwnerId()], ["PbDataId:", t.GetPbDataId()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 29, "[SceneItemTrackGuideComponent] SceneItemPatrolComponent初始化失败 Actor Component Undefined");
      }
      return false;
    }
  }
  OnActivate() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.w0n, false)) {
      this.Nln?.SetEnableMovementSync(true, "SceneItemTrackGuideComponent OnActivate");
    }
    return true;
  }
  HC() {
    var t = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.zun, this.Hte.CreatureData.GetPbDataId());
    if (t) {
      this.lEn = t;
      var i = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(this.zun);
      this._En.FromUeVector(t.D_GetLocationAtDistanceAlongSpline(0, 1));
      this.dEn = t.GetNumberOfSplinePoints();
      var e = i.SplineData;
      this.gEn = new Array(this.dEn);
      this.fEn = new Array(this.dEn);
      var s = new Array(this.dEn);
      for (let t = 0; t < this.dEn; ++t) {
        this.gEn[t] = !e.Points[t].IgnorePoint;
        s[t] = 0;
      }
      for (let t = 0; t < this.dEn; ++t) {
        this.fEn[t] = MathUtils_1.MathUtils.Clamp(e.Points[t].MoveSpeed, CONFIG_DEFAULT_MOVEMENT_SPEED, MAX_MOVEMENT_SPEED);
        this.TEn = this.fEn[t];
      }
      this.cPl = new SceneItemMoveComponent_1.SceneItemSplineMoveAtConstantTimeParam(t);
      SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseOldConfigToSplineMoveParam(t, this.fEn, s, false, false, true, 0, this.cPl);
      this.fgn = t.GetSplineLength();
      this.uEn.FromUeVector(t.D_GetLocationAtSplinePoint(this.dEn - 1, 1));
      if (this.hEn && (this.uEn.Subtraction(this.hEn, this.MEn), this.MEn.SizeSquared() < DISTANCE_SPLINE_FOUNDATION_THRESHOLD)) {
        this.gEn[this.dEn - 1] = false;
        this.fEn[this.dEn - 1] = SPLINE_FOUNDATION_SPEED;
        this.TEn = SPLINE_FOUNDATION_SPEED;
      }
      if (this.dEn >= 2) {
        this.CEn = this.fgn - t.GetDistanceAlongSplineAtSplinePoint(this.dEn - 2);
        if (this.CEn <= 1) {
          this.CEn = 0;
        } else {
          this.CEn = 1 / this.CEn;
        }
      }
    }
  }
  OnTick(t) {
    if (!this.vEn && (!this.y1h || !!this.yEn)) {
      if (this.Usi !== 1) {
        this.REn(t);
      } else {
        this.UEn(t);
      }
    }
  }
  UEn(t) {
    var i;
    var e;
    if (this.lEn?.IsValid() && this.cPl && !this.Hte?.CreatureData.GetRemoveState()) {
      if (this.pEn && this.AEn()) {
        if (this.RAl) {
          this.RAl = false;
          this.Nln?.SetEnableMovementSync(false, "SceneItemTrackGuideComponent UpdateSplineMovement MoveStop");
          this.oEn.ApplyNiagaraParameters("IsMoving", 0);
          this.Gce?.StopMove();
        }
      } else {
        e = this.lEn;
        i = this.IAl;
        e = e.GetDistanceAlongSplineAtSplinePoint(i);
        if (this.Gce?.IsMoving) {
          this.cEn = this.Gce.GetDistanceAloneSpline();
        }
        if (!this.RAl && !(this.RAl = true, this.oEn.ApplyNiagaraParameters("IsMoving", 1), this.Nsn)) {
          this.Nsn = true;
          this.PEn();
        }
        this.Entity.ChangeTickInterval(0);
        if (!this.Gce?.IsMoving) {
          this.cPl.StartDis = this.cEn;
          this.cPl.EndDis = e;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SceneItem", 39, "[SceneItemTrackGuideComponent.UpdateSplineMovement] StartSplineMove", ["EntityId", this.Entity.Id], ["SplineMoveParam", this.cPl]);
          }
          this.Gce?.StartSplineMoveAtConstantTimeImplement(this.cPl, this.UAl);
        }
        if (this.rEn === 1 && this.oEn && this.IAl === this.dEn - 1) {
          i = (this.fgn - this.cEn) * this.CEn;
          e = MathUtils_1.MathUtils.Lerp(COMPRESS_RADIUS, NORMAL_RADIUS, i);
          this.oEn.ApplyNiagaraParameters("Radius", e);
          this.oEn.ApplyNiagaraParameters("IsMoving", 1);
        }
      }
    }
  }
  REn(t) {
    if (this.pEn && this.AEn()) {
      if (this.RAl) {
        this.RAl = false;
        this.Nln?.CollectSampleAndSend();
        this.Nln?.SetEnableMovementSync(false, "SceneItemTrackGuideComponent UpdateNoSplineMovement MoveStop");
        this.oEn.ApplyNiagaraParameters("IsMoving", 0);
      }
    } else {
      if (!this.RAl && !(this.RAl = true, this.oEn.ApplyNiagaraParameters("IsMoving", 1), this.Nsn)) {
        this.Nsn = true;
        this.PEn();
      }
      this.Entity.ChangeTickInterval(0);
      switch (this.Usi) {
        case 0:
          this.xEn(t);
          if (this.wEn(this._En)) {
            this.BEn();
          }
          break;
        case 2:
          this.bEn(t);
          if (this.wEn(this.hEn)) {
            this.Hte.SetActorLocation(this.hEn.ToUeVector());
            this.qEn();
          }
          break;
        case 3:
          this.E1h(t);
          if (this.wEn(this.uEn)) {
            this.qEn();
          }
      }
    }
  }
  xEn(t) {
    var i;
    if (this.lEn?.IsValid() && !this.Gce?.IsMoving) {
      i = Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this._En) / MOVEMENT_SPEED;
      this.Nln?.SetEnableMovementSync(true, "UpdateNoSplineMovement UpdateToSplineStart");
      this.Gce?.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(Vector_1.Vector.Create(this._En), i));
      this.IEn = true;
    }
  }
  bEn(t) {
    if (this.nEn && !this.Gce?.IsMoving) {
      if (!this.aEn) {
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.nEn);
        if (!i) {
          return;
        }
        var e = i.Entity.GetComponent(1);
        if (!e || !e.Owner) {
          return;
        }
        this.aEn = i;
        this.hEn.DeepCopy(e.ActorLocationProxy);
        this.hEn.AdditionEqual(this.sEn);
      }
      i = Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this.hEn) / this.TEn;
      this.Nln?.SetEnableMovementSync(true, "UpdateNoSplineMovement UpdateToFoundation");
      this.Gce?.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(Vector_1.Vector.Create(this.hEn), i));
    }
  }
  E1h(t) {
    this.Hte.SetActorLocation(this.uEn.ToUeVector());
    this.Nln?.SetEnableMovementSync(true, "UpdateNoSplineMovement UpdateToStopAtEnd");
  }
  qEn() {
    this.Gce?.StopMove();
    this.Nln?.CollectSampleAndSend();
    this.Nln?.SetEnableMovementSync(false, "UpdateNoSplineMovement OnTrackGuideFinish");
    this.oEn.ApplyNiagaraParameters("IsMoving", 0);
    this.oEn.ApplyNiagaraParameters("IsDying", 1);
    this.vEn = true;
    LevelGamePlayController_1.LevelGamePlayController.EntityFollowTrackRequest(this.Hte.CreatureData.GetCreatureDataId(), t => {});
  }
  BEn() {
    this.Hte.SetActorLocation(this._En.ToUeVector());
    this.Usi = 1;
    this.cEn = 0;
    this.IAl = 0;
    this.pEn = true;
    this.RAl = false;
    this.Gce?.StopMove();
    this.Nln?.CollectSampleAndSend();
    this.Nln?.SetEnableMovementSync(false, "UpdateNoSplineMovement OnTrackGuideReset");
    this.IEn = true;
    this.oEn.ApplyNiagaraParameters("IsMoving", 0);
  }
  AEn() {
    var t;
    if (!this.lEn?.IsValid() || this.Oln?.IsLocked) {
      return this.pEn = true;
    } else if (this.b1n) {
      return this.pEn = false;
    } else if (this.IEn) {
      t = this.IAl === 0 ? 0 : this.IAl - 1;
      this.pEn = this.gEn[t];
      return this.pEn;
    } else {
      return this.pEn = true;
    }
  }
  wEn(t) {
    var i;
    return !!this.Hte && (i = this.Hte.ActorLocationProxy, Vector_1.Vector.DistSquared(i, t) <= DISTANCE_SQUARE_THRESHOLD);
  }
  av() {
    if (!this.vEn) {
      this.BEn();
    }
  }
  OnEnd() {
    this.kre();
    if (this.lEn) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.zun, this.Hte.CreatureData.GetPbDataId());
    }
    return true;
  }
  PEn() {
    var t;
    if (!this.LEn) {
      (t = new ButterflyTriggerData()).event_id = "10";
      t.i_inst_id = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      t.i_config_id = this.Hte.CreatureData.GetPbDataId().toString();
      t.f_player_pos_x = this.Hte.ActorLocationProxy.X.toString();
      t.f_player_pos_y = this.Hte.ActorLocationProxy.Y.toString();
      t.f_player_pos_z = this.Hte.ActorLocationProxy.Z.toString();
      t.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId.toString();
      t.s_tag = this.Hte.CreatureData.GetPlayerId().toString() + "|" + this.Hte.CreatureData.GetCreatureDataId().toString();
      LogReportController_1.LogReportController.LogReport(t);
      this.LEn = true;
    }
  }
};
SceneItemTrackGuideComponent = SceneItemTrackGuideComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(172)], SceneItemTrackGuideComponent);
exports.SceneItemTrackGuideComponent = SceneItemTrackGuideComponent;
class ButterflyTriggerData extends LogReportDefine_1.PlayerCommonLogData {
  constructor() {
    super();
    this.i_inst_id = 0;
    this.i_config_id = "";
    this.f_player_pos_x = "";
    this.f_player_pos_y = "";
    this.f_player_pos_z = "";
    this.i_area_id = "";
    this.s_tag = "";
  }
}
//# sourceMappingURL=SceneItemTrackGuideComponent.js.map