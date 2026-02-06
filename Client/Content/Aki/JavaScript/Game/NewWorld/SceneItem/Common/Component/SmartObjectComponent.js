"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var n = arguments.length;
  var r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        r = (n < 3 ? h(r) : n > 3 ? h(e, i, r) : h(e, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmartObjectComponent = exports.MAMMOTH_SLIDE_MONSTER_KEY = exports.MAMMOTH_SLIDE_TYPE_KEY = exports.MOVE_TARGET_KEY = undefined;
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
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
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
exports.MOVE_TARGET_KEY = "VisionDisplayTarget";
exports.MAMMOTH_SLIDE_TYPE_KEY = "IsMammothSlide";
exports.MAMMOTH_SLIDE_MONSTER_KEY = "IsMammothSlideMonster";
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
    this.Ntf = undefined;
    this.Vtf = false;
    this.Zhn = false;
    this.Htf = false;
    this.BSg = true;
    this.SNf = false;
    this.S3f = undefined;
    this.vVf = undefined;
    this.ZRg = undefined;
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
        this.Zsf();
      }
    };
    this.kXt = () => {
      this.Htf = false;
      this.RDg();
    };
    this.xXf = () => {
      var t;
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(58);
      e?.HideHighlightExploreSkill();
      e?.ShowHighlightExploreSkill(this.hgf ? 6008 : 1007, -1, false);
      if (this.Ntf && (e = this.Ntf.IsBornInTargetPoint ? -27677719 : 1740921780, t = this.BXf?.GetComponent(217) ?? this.Q1g?.GetComponent(217))) {
        if (this.hgf) {
          t.AddTag(e);
          t.AddTag(-1221688283);
          this.Q1g = this.BXf;
        } else {
          t.RemoveTag(e);
          t.RemoveTag(-1221688283);
          this.Q1g = undefined;
        }
      }
    };
    this.Szo = () => {
      var t;
      var e;
      var i;
      if (this.Ntf) {
        t = this.BXf?.GetComponent(217);
        e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
        if (t) {
          i = this.Ntf.IsBornInTargetPoint ? -27677719 : 1740921780;
          if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === 6008) {
            if (!t.HasTag(i)) {
              t.AddTag(i);
              t.AddTag(-1221688283);
            }
          } else {
            t.RemoveTag(i);
            t.RemoveTag(-1221688283);
          }
        }
        if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === 1007) {
          if (!ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(e, -1221688283)) {
            ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(e, -1221688283);
          }
        } else {
          ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(e, -1221688283);
        }
      }
    };
    this.Q1g = undefined;
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
    this.Hte = this.Entity.GetComponent(214);
    this.vtn = this.Entity.GetComponent(91);
    this.Gce = this.Entity.GetComponent(139);
    if (this.Hte && (t = this.Hte.CreatureData?.GetPbEntityInitData()?.ComponentsData) && (this.k_n = (0, IComponent_1.getComponent)(t, "AiAlertNotifyComponent"), this.k_n && this.Q_n(), this.aEl = (0, IComponent_1.getComponent)(t, "SceneItemAiComponent"), this.aEl && this.pEl(), this.Ntf = (0, IComponent_1.getComponent)(t, "VisionDisplayComponent"), this.Ntf)) {
      this.jtf();
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
    if (this.Vtf) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMode, this.kXt);
    }
    this.S3f = undefined;
    this.vVf = undefined;
    var t = ModelManager_1.ModelManager.PhantomInteractModel;
    if (t && this.ZRg) {
      t.RemoveVisionDisplayTargetPoint(this.Entity.Id);
    }
    return !(this.ZRg = undefined);
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
    var t = t.GetComponent(50);
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
  jtf() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMode, this.kXt);
    this.Vtf = true;
    if (this.Ntf?.IsBornInTargetPoint) {
      var t = this.EIe?.GetBaseInfo();
      if (t) {
        if (t.EntityAttachPointList !== undefined) {
          for (const i of t.EntityAttachPointList) {
            if (i.Name === exports.MOVE_TARGET_KEY) {
              var e = Vector_1.Vector.Create();
              e.FromConfigVector(i.AttachPoint);
              e.FromUeVector(this.Hte.ActorTransform.TransformPosition(e.ToUeVector()));
              this.ZRg = e;
              break;
            }
          }
        }
        if (!this.ZRg) {
          (t = Vector_1.Vector.Create()).FromUeVector(this.Hte.ActorLocation);
          this.ZRg = t;
        }
      }
    }
  }
  mni() {
    var t;
    var e;
    var i = Global_1.Global.CharacterController;
    if (i && this.CheckOnVisionDisplayType() && (this.Ntf?.ViewEntityId && this.Ntf.IsNeedInView && (this.S3f?.IsValid() && this.vVf || (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.Ntf.ViewEntityId)) && t.Entity && ((e = t.Entity.GetComponent(214)) ? (e.TryRefreshShowActor(), this.S3f = e.CurLevelPrefabShowActor, this.vVf = e) : (e = t.Entity.GetComponent(3)) && (this.vVf = e, this.S3f = e.Actor))), t = this.vVf ?? this.Hte, e = UE.GameplayStatics.D_ProjectWorldToScreen(i, t.ActorLocation, undefined), i = this.yVf(), (e = e && i) !== this.Htf) && ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity !== undefined) {
      this.Htf = e;
      this.Zsf();
    }
  }
  yVf() {
    let i = true;
    if (this.Ntf && !this.Ntf.IsBanOcclusion) {
      let e = this.S3f ?? this.Hte?.CurLevelPrefabShowActor;
      if (e?.IsValid() && (i = e.WasRecentlyRenderedOnScreen(), UE.KuroStaticLibrary.IsObjectClassByName(e, CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM))) {
        let t = this.Hte;
        (t = this.vVf instanceof SceneItemActorComponent_1.SceneItemActorComponent ? this.vVf : t).RefreshShowActor();
        if ((e = t.CurLevelPrefabShowActor)?.IsValid()) {
          i = e.WasRecentlyRenderedOnScreen();
        }
      }
    }
    return i;
  }
  yzt() {
    if (this.Ntf) {
      let t = true;
      if (this.Ntf.Condition) {
        t = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.Ntf.Condition, this.Hte.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id));
      }
      if (this.BSg !== t) {
        this.BSg = t;
      }
    }
  }
  Zsf() {
    var t;
    var e;
    var i;
    var s;
    var h;
    var n;
    if (this.Ntf && this.CheckOnVisionDisplayType()) {
      t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      e = this.Ntf.IsBornInTargetPoint ? -27677719 : 1740921780;
      i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(58);
      if (n = this.VisionDisplayIsCanBeInteract()) {
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(t, e);
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(t, -1221688283);
        if (this.hgf && (this.Q1g = this.BXf, s = this.BXf?.GetComponent(217))) {
          s.AddTag(e);
          s.AddTag(-1221688283);
        }
        this.LDg();
        i?.ShowHighlightExploreSkill(this.hgf ? 6008 : 1007, -1, false);
        this.SNf = true;
        s = ModelManager_1.ModelManager.PhantomInteractModel;
        if (this.ZRg) {
          s.AddVisionDisplayTargetPoint(this.Entity.Id, this.ZRg);
        }
        if (h = this.GetVisionDisplayType()) {
          s.AddVisionDisplayHighlightExploreType(h);
        }
      } else if (!n && this.SNf && (ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(t, e), ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(t, -1221688283), this.hgf && (s = this.BXf?.GetComponent(217)) && (s.RemoveTag(e), s.RemoveTag(-1221688283)), i?.HideHighlightExploreSkill(), this.RDg(), this.SNf = false, h = ModelManager_1.ModelManager.PhantomInteractModel, this.ZRg && h.RemoveVisionDisplayTargetPoint(this.Entity.Id), n = this.GetVisionDisplayType())) {
        h.RemoveVisionDisplayHighlightExploreType(n);
      }
    }
  }
  LDg() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.xXf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.xXf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
  }
  RDg() {
    if (this.Ntf && (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveVehicle, this.xXf) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.xXf), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnEnterVehicle, this.xXf) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.xXf), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo))) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.Szo);
    }
  }
  get hgf() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!t && !!(t = t.Entity.CheckGetComponent(242)) && t.VehicleType === "Motorcycle";
  }
  get BXf() {
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
    this.$tf(t);
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
  $tf(t) {
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
          var h = i.Points[t];
          if (s < TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(h.Hours, h.Minutes)) {
            break;
          }
          this.mEl = t;
        }
      }
      var e = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(i.Points[this.mEl].Hours, i.Points[this.mEl].Minutes);
      var n = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(i.Points[this.mEl + 1].Hours, i.Points[this.mEl + 1].Minutes);
      var r = (s - e) / (n - e);
      if ((r < 0 || r > 1) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 31, "服务器下发的LastPassIndex与当前游戏时间不符", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      var o = this.cEl.GetDistanceAlongSplineAtSplineInputKey(this.mEl);
      const l = this.cEl.GetDistanceAlongSplineAtSplineInputKey(this.mEl + 1);
      var a = l - o;
      this.cka = a * r + o;
      var a = (l - o) / (n - e);
      var _ = a * this.dEl / TimeOfDayDefine_1.TOD_RATE_RATIO;
      var r = this.cEl.D_GetLocationAtDistanceAlongSpline(this.cka, 1);
      this.Hte.SetActorLocation(r);
      const v = [];
      const m = [];
      let t = 0;
      while (t++ < i.Points.length) {
        v.push(_);
        m.push(0);
      }
      TimerSystem_1.TimerSystem.Next(() => {
        var t;
        if (this.cEl?.IsValid() && !this.EIe?.GetRemoveState()) {
          t = new SceneItemMoveComponent_1.SceneItemSplineMoveAtConstantTimeParam(this.cEl);
          SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseOldConfigToSplineMoveParam(this.cEl, v, m, false, false, true, m[0] ?? 0, t);
          t.StartDis = this.cka;
          t.EndDis = l;
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
    return !!this.Ntf && this.Zhn && (this.Htf || !this.Ntf.IsNeedInView);
  }
  VisionDisplayIsCanBeLookFor() {
    return !!this.Ntf && (this.yzt(), this.BSg);
  }
  GetMoveTargetPos() {
    var e = this.EIe?.GetBaseInfo();
    if (this.Hte !== undefined && e) {
      let t = undefined;
      if (e.EntityAttachPointList !== undefined) {
        for (const i of e.EntityAttachPointList) {
          if (i.Name === exports.MOVE_TARGET_KEY) {
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
    return this.Ntf !== undefined;
  }
  CheckOnVisionDisplayType() {
    var t = this.EIe?.GetEntityOnlineInteractType();
    return !t || LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(t, false);
  }
};
SmartObjectComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(147)], SmartObjectComponent);
exports.SmartObjectComponent = SmartObjectComponent; //# sourceMappingURL=SmartObjectComponent.js.map