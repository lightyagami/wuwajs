"use strict";

var SceneItemBeamReceiveComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, s) {
  var r;
  var o = arguments.length;
  var n = o < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, s);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (r = e[a]) {
        n = (o < 3 ? r(n) : o > 3 ? r(t, i, n) : r(t, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemBeamReceiveComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const BattleUiDefine_1 = require("../../Module/BattleUi/BattleUiDefine");
const castingPerformTag = -308662637;
const stopCastingPerformTag = -1101371633;
let SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent_1 = class SceneItemBeamReceiveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.EIe = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.$mn = 0;
    this.Ymn = 0;
    this.Jmn = undefined;
    this.zmn = e => {
      var t = this.EIe.GetEntityOnlineInteractType();
      if (LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(t) && this.$mn !== 1) {
        this.$mn = 1;
        this.Zmn(1);
        this.edn(Protocol_1.Aki.Protocol._ks.Proto_BeginAction);
        if (this.Ymn === 0) {
          this.tdn(e);
        } else if (!this.Jmn || !TimerSystem_1.TimerSystem.Has(this.Jmn)) {
          this.Jmn = TimerSystem_1.TimerSystem.Delay(() => {
            this.tdn(e);
          }, this.Ymn);
          if (this.Jmn) {
            t = this.Entity.GetComponent(133)?.CurrentTimeScale ?? 1;
            if ((t = this.TimeDilation * t) == 0) {
              TimerSystem_1.TimerSystem.Pause(this.Jmn);
            } else if (t > 0) {
              TimerSystem_1.TimerSystem.ChangeDilation(this.Jmn, t);
            }
          }
        }
      }
    };
    this.idn = e => {
      var t = this.EIe.GetEntityOnlineInteractType();
      if (LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(t) && this.$mn !== 0) {
        this.$mn = 0;
        this.Zmn(0);
        if (this.Jmn && TimerSystem_1.TimerSystem.Has(this.Jmn)) {
          TimerSystem_1.TimerSystem.Remove(this.Jmn);
        }
        this.Jmn = undefined;
        this.edn(Protocol_1.Aki.Protocol._ks.Proto_StopAction);
      }
    };
    this.tdn = e => {
      var t = this.EIe.GetEntityOnlineInteractType();
      if (LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(t) && this.$mn !== 2) {
        this.$mn = 2;
        this.Zmn(2);
        if (this.Jmn && TimerSystem_1.TimerSystem.Has(this.Jmn)) {
          TimerSystem_1.TimerSystem.Remove(this.Jmn);
        }
        this.Jmn = undefined;
        this.edn(Protocol_1.Aki.Protocol._ks.Proto_CompleteAction);
      }
    };
  }
  OnInitData(e) {
    this.EIe = this.Entity.GetComponent(0);
    e = e.GetParam(SceneItemBeamReceiveComponent_1)[0];
    if (e) {
      this.Lo = e;
      this.Ymn = this.Lo.Duration * BattleUiDefine_1.SECOND_TO_MILLISECOND;
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[BeamReceiveComp] 组件配置缺失", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      return false;
    }
  }
  OnActivate() {
    this.Hte = this.Entity.GetComponent(214);
    this.Lie = this.Entity.GetComponent(208);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BeamCastStart, this.zmn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BeamCastStop, this.idn);
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.BeamCastStart, this.zmn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BeamCastStart, this.zmn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.BeamCastStop, this.idn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BeamCastStop, this.idn);
    }
    return true;
  }
  OnChangeTimeDilation(e) {
    if (this.Jmn && TimerSystem_1.TimerSystem.Has(this.Jmn)) {
      if ((e = e * (this.Entity.GetComponent(133)?.CurrentTimeScale ?? 1)) == 0) {
        if (!TimerSystem_1.TimerSystem.IsPause(this.Jmn)) {
          TimerSystem_1.TimerSystem.Pause(this.Jmn);
        }
      } else if (e > 0) {
        if (TimerSystem_1.TimerSystem.IsPause(this.Jmn)) {
          TimerSystem_1.TimerSystem.Resume(this.Jmn);
        }
        TimerSystem_1.TimerSystem.ChangeDilation(this.Jmn, e);
      }
    }
  }
  Zmn(e) {
    switch (e) {
      case 0:
        if (this.Lie?.HasTag(castingPerformTag)) {
          this.Lie?.RemoveTag(castingPerformTag);
        }
        if (!this.Lie?.HasTag(stopCastingPerformTag)) {
          this.Lie?.AddTag(stopCastingPerformTag);
        }
        this.Hte?.SetActiveTagSequencePlaybackProgress(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(castingPerformTag), 1);
        break;
      case 1:
        if (this.Lie?.HasTag(stopCastingPerformTag)) {
          this.Lie?.RemoveTag(stopCastingPerformTag);
        }
        if (!this.Lie?.HasTag(castingPerformTag)) {
          this.Lie?.AddTag(castingPerformTag);
        }
        this.Hte?.SetActiveTagSequenceDurationTime(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(castingPerformTag), this.Lo.Duration);
        this.Hte?.SetActiveTagSequencePlaybackProgress(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(castingPerformTag), 0);
        break;
      case 2:
        this.Hte?.SetActiveTagSequencePlaybackProgress(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(castingPerformTag), 1);
        if (this.Lie?.HasTag(castingPerformTag)) {
          this.Lie?.RemoveTag(castingPerformTag);
        }
        if (this.Lie?.HasTag(stopCastingPerformTag)) {
          this.Lie?.RemoveTag(stopCastingPerformTag);
        }
    }
  }
  edn(t) {
    var e = Protocol_1.Aki.Protocol.Cgs.create();
    e.F4n = this.EIe.GetCreatureDataId();
    e.c6n = t;
    Net_1.Net.Call(16599, e, e => {
      if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[BeamReceiveComp] 请求执行光线接收行为出错", ["PbDataId", this.EIe?.GetPbDataId()], ["CreatureDataId", this.EIe?.GetCreatureDataId()], ["EntityBeamReceiveType", t], ["Response", e]);
      }
    });
  }
  GetBeamReceiveActions(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol._ks.Proto_BeginAction:
        return this.Lo?.BeginActions;
      case Protocol_1.Aki.Protocol._ks.Proto_CompleteAction:
        return this.Lo?.CompleteActions;
      case Protocol_1.Aki.Protocol._ks.Proto_StopAction:
        return this.Lo?.StopActions;
      default:
        return;
    }
  }
};
SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(225)], SceneItemBeamReceiveComponent);
exports.SceneItemBeamReceiveComponent = SceneItemBeamReceiveComponent; //# sourceMappingURL=SceneItemBeamReceiveComponent.js.map