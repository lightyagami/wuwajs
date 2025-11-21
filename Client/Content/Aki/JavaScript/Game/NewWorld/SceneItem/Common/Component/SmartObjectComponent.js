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
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const Global_1 = require("../../../../Global");
const SceneItemSplineMoveTaskUtils_1 = require("../../../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTaskUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TimeOfDayDefine_1 = require("../../../../Module/TimeOfDay/TimeOfDayDefine");
const TimeOfDayModel_1 = require("../../../../Module/TimeOfDay/TimeOfDayModel");
const CharacterUnifiedStateTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const SceneItemMoveComponent_1 = require("./SceneItemMoveComponent");
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
    this.Hte = this.Entity.GetComponent(1);
    this.vtn = this.Entity.GetComponent(86);
    this.Gce = this.Entity.GetComponent(132);
    if (this.Hte && (t = this.Hte.CreatureData?.GetPbEntityInitData()?.ComponentsData) && (this.k_n = (0, IComponent_1.getComponent)(t, "AiAlertNotifyComponent"), this.k_n && this.Q_n(), this.aEl = (0, IComponent_1.getComponent)(t, "SceneItemAiComponent"), this.aEl)) {
      this.pEl();
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
    return true;
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
    var t = t.GetComponent(47);
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
  OnTick(t) {
    this.Y_n(t);
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
      const m = this.cEl.GetDistanceAlongSplineAtSplineInputKey(this.mEl + 1);
      var a = m - o;
      this.cka = a * r + o;
      var a = (m - o) / (h - e);
      var _ = a * this.dEl / TimeOfDayDefine_1.TOD_RATE_RATIO;
      var r = this.cEl.D_GetLocationAtDistanceAlongSpline(this.cka, 1);
      this.Hte.SetActorLocation(r);
      const v = [];
      const l = [];
      let t = 0;
      while (t++ < i.Points.length) {
        v.push(_);
        l.push(0);
      }
      TimerSystem_1.TimerSystem.Next(() => {
        var t;
        if (this.cEl?.IsValid() && !this.EIe?.GetRemoveState()) {
          t = new SceneItemMoveComponent_1.SceneItemSplineMoveAtConstantTimeParam(this.cEl);
          SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseOldConfigToSplineMoveParam(this.cEl, v, l, false, false, true, l[0] ?? 0, t);
          t.StartDis = this.cka;
          t.EndDis = m;
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
};
SmartObjectComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(140)], SmartObjectComponent);
exports.SmartObjectComponent = SmartObjectComponent; //# sourceMappingURL=SmartObjectComponent.js.map