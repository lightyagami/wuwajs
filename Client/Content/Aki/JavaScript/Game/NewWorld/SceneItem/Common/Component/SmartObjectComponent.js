"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var h = arguments.length;
  var r = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (n = t[o]) {
        r = (h < 3 ? n(r) : h > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmartObjectComponent = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const Global_1 = require("../../../../Global");
const LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController");
const SceneItemSplineMoveTaskUtils_1 = require("../../../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTaskUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TimeOfDayDefine_1 = require("../../../../Module/TimeOfDay/TimeOfDayDefine");
const TimeOfDayModel_1 = require("../../../../Module/TimeOfDay/TimeOfDayModel");
const CharacterNameDefines_1 = require("../../../Character/Common/CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const SceneItemActorComponent_1 = require("../../SceneItemActorComponent");
const SceneItemMoveComponent_1 = require("./SceneItemMoveComponent");
const MOVE_TARGET_KEY = "VisionDisplayTarget";
let SmartObjectComponent = class SmartObjectComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.vtn = undefined;
    this.Gce = undefined;
    this.k_n = undefined;
    this.F_n = [];
    this.V_n = false;
    this.sEl = false;
    this.aEl = undefined;
    this.lEl = false;
    this.hEl = false;
    this._El = undefined;
    this.uEl = undefined;
    this.cEl = undefined;
    this.mEl = -1;
    this.cka = -1;
    this.dEl = -1;
    this.rZm = undefined;
    this.oZm = false;
    this.Zhn = false;
    this.nZm = false;
    this.ABf = false;
    this.bkf = undefined;
    this.uqf = undefined;
    this.H_n = (t, e) => {
      var i;
      var e = e.Entity;
      if (!(this.k_n.ExcludeEntities?.indexOf(e.GetComponent(0).GetPbDataId()) >= 0)) {
        if (this.j_n(e)) {
          i = this.F_n.indexOf(e);
          if (t) {
            if (i < 0) {
              this.F_n.push(e);
            }
          } else if (i >= 0) {
            this.F_n.splice(i, 1);
          }
        }
      }
    };
    this.Etn = t => {
      if (this.Zhn !== t) {
        this.Zhn = t;
        this.Uof();
      }
    };
    this.kXt = () => {
      this.nZm = false;
      this.dtg();
    };
    this.bVf = () => {
      var t;
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(56);
      e?.HideHighlightExploreSkill();
      e?.ShowHighlightExploreSkill(this.F_f ? 6008 : 1007, -1, true, "关卡.新版声骸显像.技能高亮");
      if (this.rZm && (e = this.rZm.IsBornInTargetPoint ? -27677719 : 1740921780, t = this.RVf?.GetComponent(215) ?? this.ZKf?.GetComponent(215))) {
        if (this.F_f) {
          t.AddTag(e);
          t.AddTag(-1221688283);
          this.ZKf = this.RVf;
        } else {
          t.RemoveTag(e);
          t.RemoveTag(-1221688283);
          this.ZKf = undefined;
        }
      }
    };
    this.Szo = () => {
      var t;
      var e;
      if (this.F_f && this.RVf && this.rZm && (t = this.RVf.GetComponent(215))) {
        e = this.rZm.IsBornInTargetPoint ? -27677719 : 1740921780;
        if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === 6008) {
          if (!t.HasTag(e)) {
            t.AddTag(e);
            t.AddTag(-1221688283);
          }
        } else {
          t.RemoveTag(e);
          t.RemoveTag(-1221688283);
        }
      }
    };
    this.ZKf = undefined;
    this.W_n = () => {
      var t;
      var e;
      if (this.V_n && (t = this.k_n.AlertSound) !== undefined) {
        e = Global_1.Global.BaseCharacter;
        AudioController_1.AudioController.PostEvent(t, e);
      }
    };
    this.K_n = (t, e) => {
      if (e === CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop || e === CharacterUnifiedStateTypes_1.ECharMoveState.RunStop || e === CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop) {
        this.V_n = false;
      } else if (e === CharacterUnifiedStateTypes_1.ECharMoveState.Walk || e === CharacterUnifiedStateTypes_1.ECharMoveState.Run || e === CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) {
        this.V_n = true;
      }
    };
    this.$Dl = t => {
      if (t) {
        if (this._El === "ByGameTime") {
          this.CEl();
        }
      } else if (this._El === "ByGameTime") {
        this.Gce?.StopMove();
      }
    };
    this.Rnn = () => {
      this.Gce.ForceSyncing = true;
      if (this.Hte?.IsMoveAutonomousProxy && this.hEl && this._El === "ByGameTime") {
        this.CEl();
      }
    };
    this.gEl = () => {
      if (this._El === "ByGameTime") {
        this.Gce.StopMove();
        this.CEl(true);
      }
    };
  }
  OnStart() {
    var t;
    this.EIe = this.Entity.GetComponent(0);
    this.Hte = this.Entity.GetComponent(212);
    this.vtn = this.Entity.GetComponent(89);
    this.Gce = this.Entity.GetComponent(137);
    if (this.Hte && (t = this.Hte.CreatureData?.GetPbEntityInitData()?.ComponentsData) && (this.k_n = (0, IComponent_1.getComponent)(t, "AiAlertNotifyComponent"), this.k_n && this.Q_n(), this.aEl = (0, IComponent_1.getComponent)(t, "SceneItemAiComponent"), this.aEl && this.pEl(), this.rZm = (0, IComponent_1.getComponent)(t, "VisionDisplayComponent"), this.rZm)) {
      this.sZm();
    }
    return true;
  }
  OnEnd() {
    if (this.sEl) {
      this.vtn.RemoveOnEntityOverlapCallback(this.H_n);
      this.$_n();
    }
    if (this.lEl) {
      this.fEl();
    }
    if (this.oZm) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMode, this.kXt);
    }
    this.bkf = undefined;
    return !(this.uqf = undefined);
  }
  Q_n() {
    for (var [, t] of this.vtn.GetEntitiesInRangeLocal()) {
      if (this.k_n.ExcludeEntities?.length && this.k_n.ExcludeEntities?.length > 0) {
        if (this.k_n.ExcludeEntities?.indexOf(t.Entity.GetComponent(0).GetPbDataId()) >= 0) {
          continue;
        }
      }
      if (this.j_n(t.Entity)) {
        this.F_n.push(t.Entity);
      }
    }
    this.vtn.AddOnEntityOverlapCallback(this.H_n);
    this.X_n();
    this.sEl = true;
  }
  j_n(t) {
    var t = t.GetComponent(48);
    return !!t && !!(t = t.AiController?.AiAlert) && !!t.AiAlertConfig;
  }
  pEl() {
    if (this.EIe && this.EIe.Valid) {
      if (this.aEl.AiConfig.Type === "SceneItemPatrol") {
        this.vEl();
      }
      this.lEl = true;
    }
  }
  vEl() {
    this.hEl = this.EIe.PbSceneAiEnabled;
    this.mEl = this.EIe.PbPatrolInfoPb?.AI_ ?? -1;
    this.dEl = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetRate();
    this._El = this.aEl.AiConfig.PatrolType.Type;
    var t = this.aEl.AiConfig.PatrolType.Spline;
    this.cEl = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t, this.EIe.GetPbDataId());
    this.uEl = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(t);
    this.MEl();
  }
  sZm() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMode, this.kXt);
    this.oZm = true;
  }
  mni() {
    var t;
    var e;
    var i = Global_1.Global.CharacterController;
    if (i && this.CheckOnVisionDisplayType() && (this.rZm?.ViewEntityId && this.rZm.IsNeedInView && (this.bkf?.IsValid() && this.uqf || (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.rZm.ViewEntityId)) && t.Entity && ((e = t.Entity.GetComponent(212)) ? (e.TryRefreshShowActor(), this.bkf = e.CurLevelPrefabShowActor, this.uqf = e) : (e = t.Entity.GetComponent(3)) && (this.uqf = e, this.bkf = e.Actor))), t = this.uqf ?? this.Hte, e = UE.GameplayStatics.D_ProjectWorldToScreen(i, t.ActorLocation, undefined), i = this.cqf(), (e = e && i) !== this.nZm) && ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity !== undefined) {
      this.nZm = e;
      this.Uof();
    }
  }
  cqf() {
    let i = true;
    if (this.rZm && !this.rZm.IsBanOcclusion) {
      let e = this.bkf ?? this.Hte?.CurLevelPrefabShowActor;
      if (e?.IsValid() && (i = e.WasRecentlyRenderedOnScreen(), UE.KuroStaticLibrary.IsObjectClassByName(e, CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM))) {
        let t = this.Hte;
        (t = this.uqf instanceof SceneItemActorComponent_1.SceneItemActorComponent ? this.uqf : t).RefreshShowActor();
        if ((e = t.CurLevelPrefabShowActor)?.IsValid()) {
          i = e.WasRecentlyRenderedOnScreen();
        }
      }
    }
    return i;
  }
  Uof() {
    var t;
    var e;
    var i;
    var s;
    var n;
    if (this.rZm && this.CheckOnVisionDisplayType()) {
      t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      e = this.rZm.IsBornInTargetPoint ? -27677719 : 1740921780;
      i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(56);
      if (s = this.VisionDisplayIsCanBeInteract()) {
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(t, e);
        if (this.F_f && (this.ZKf = this.RVf, n = this.RVf?.GetComponent(215))) {
          n.AddTag(e);
          n.AddTag(-1221688283);
        }
        this.mtg();
        i?.ShowHighlightExploreSkill(this.F_f ? 6008 : 1007, -1, true, "关卡.新版声骸显像.技能高亮");
        this.ABf = true;
      } else if (!s && this.ABf) {
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(t, e);
        if (this.F_f && (n = this.RVf?.GetComponent(215))) {
          n.RemoveTag(e);
          n.RemoveTag(-1221688283);
        }
        i?.HideHighlightExploreSkill();
        this.dtg();
        this.ABf = false;
      }
    }
  }
  mtg() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.bVf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.bVf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
  }
  dtg() {
    if (this.rZm && (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveVehicle, this.bVf) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.bVf), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnEnterVehicle, this.bVf) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.bVf), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo))) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    }
  }
  get F_f() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!t && !!(t = t.Entity.CheckGetComponent(242)) && t.VehicleType === "Motorcycle";
  }
  get RVf() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (t) {
      t = t.Entity.CheckGetComponent(242);
      if (t) {
        return t.VehicleEntity;
      }
    }
  }
  OnTick(t) {
    this.Y_n(t);
    this.aZm(t);
  }
  Y_n(e) {
    if (this.k_n !== undefined && !(this.F_n.length <= 0)) {
      let t = 0;
      if (this.V_n) {
        var i = this.k_n.ExtraAiAlert.MoveAlert;
        if (!i) {
          return;
        }
        t = i * e * TimeUtil_1.TimeUtil.Millisecond;
      } else {
        i = this.k_n.ExtraAiAlert.StopAlert;
        if (!i) {
          return;
        }
        t = i * e * TimeUtil_1.TimeUtil.Millisecond;
      }
      for (const s of this.F_n) {
        EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.SmartObjectAiAlterNotify, t);
      }
    }
  }
  aZm(t) {
    this.mni();
  }
  X_n() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCharFootOnTheGround, this.W_n);
    EventSystem_1.EventSystem.AddWithTarget(Global_1.Global.BaseCharacter.CharacterActorComponent.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.K_n);
  }
  $_n() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCharFootOnTheGround, this.W_n);
    EventSystem_1.EventSystem.RemoveWithTarget(Global_1.Global.BaseCharacter.CharacterActorComponent.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.K_n);
  }
  MEl() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSwitchMoveControl, this.$Dl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AdjustTime, this.gEl);
  }
  fEl() {
    if (this.lEl && this.aEl.AiConfig.Type === "SceneItemPatrol") {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSwitchMoveControl, this.$Dl);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AdjustTime, this.gEl);
    }
  }
  CEl(e = false) {
    if (!e && (this.mEl < 0 || this.mEl >= this.uEl.SplineData.Points.length - 1)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 31, "服务器下发的LastPassIndex不合法", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    } else {
      var i = this.uEl.SplineData;
      var s = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
      if (e) {
        for (let t = 0; t < i.Points.length; t++) {
          var n = i.Points[t];
          if (s < TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(n.Hours, n.Minutes)) {
            break;
          }
          this.mEl = t;
        }
      }
      var e = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(i.Points[this.mEl].Hours, i.Points[this.mEl].Minutes);
      var h = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(i.Points[this.mEl + 1].Hours, i.Points[this.mEl + 1].Minutes);
      var r = (s - e) / (h - e);
      if ((r < 0 || r > 1) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 31, "服务器下发的LastPassIndex与当前游戏时间不符", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      var o = this.cEl.GetDistanceAlongSplineAtSplineInputKey(this.mEl);
      const v = this.cEl.GetDistanceAlongSplineAtSplineInputKey(this.mEl + 1);
      var a = v - o;
      this.cka = a * r + o;
      var a = (v - o) / (h - e);
      var _ = a * this.dEl / TimeOfDayDefine_1.TOD_RATE_RATIO;
      var r = this.cEl.D_GetLocationAtDistanceAlongSpline(this.cka, 1);
      this.Hte.SetActorLocation(r);
      const l = [];
      const m = [];
      let t = 0;
      while (t++ < i.Points.length) {
        l.push(_);
        m.push(0);
      }
      TimerSystem_1.TimerSystem.Next(() => {
        var t;
        if (this.cEl?.IsValid() && !this.EIe?.GetRemoveState()) {
          t = new SceneItemMoveComponent_1.SceneItemSplineMoveAtConstantTimeParam(this.cEl);
          SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseOldConfigToSplineMoveParam(this.cEl, l, m, false, false, true, m[0] ?? 0, t);
          t.StartDis = this.cka;
          t.EndDis = v;
          this.Gce.StartSplineMoveAtConstantTimeImplement(t, () => {
            this.Gce.StopMove();
            this.CEl(true);
          });
        }
      });
    }
  }
  ModifyAiEnableState(t, e = undefined) {
    if (this.hEl = t) {
      if (e) {
        this.mEl = e.AI_;
      }
      this.CEl(true);
    } else if (this.Gce?.IsMoving) {
      this.Gce?.StopMove();
    }
  }
  UpdateLastPassIndex(t) {
    this.mEl = t;
  }
  VisionDisplayIsCanBeInteract() {
    return !!this.rZm && this.Zhn && (this.nZm || !this.rZm.IsNeedInView);
  }
  GetMoveTargetPos() {
    var e = this.EIe?.GetBaseInfo();
    if (this.Hte !== undefined && e) {
      let t = undefined;
      if (e.EntityAttachPointList !== undefined) {
        for (const i of e.EntityAttachPointList) {
          if (i.Name === MOVE_TARGET_KEY) {
            t = i;
            break;
          }
        }
      }
      if (t) {
        (e = Vector_1.Vector.Create()).FromConfigVector(t.AttachPoint);
        e.FromUeVector(this.Hte.ActorTransform.TransformPosition(e.ToUeVector()));
        return e;
      } else {
        return this.Hte.ActorLocationProxy;
      }
    }
  }
  GetVisionDisplayType() {
    return this.EIe?.GetBaseInfo()?.Category?.VisionDisplayType;
  }
  get IsVisionDisplayType() {
    return this.rZm !== undefined;
  }
  CheckOnVisionDisplayType() {
    var t = this.EIe?.GetEntityOnlineInteractType();
    return !t || LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(t, false);
  }
};
SmartObjectComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(145)], SmartObjectComponent);
exports.SmartObjectComponent = SmartObjectComponent; //# sourceMappingURL=SmartObjectComponent.js.map