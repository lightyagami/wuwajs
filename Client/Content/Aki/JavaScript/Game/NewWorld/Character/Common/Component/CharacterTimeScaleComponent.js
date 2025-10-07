"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (r = e[a]) {
        n = (s < 3 ? r(n) : s > 3 ? r(t, i, n) : r(t, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterTimeScaleComponent = undefined;
const AudioDefine_1 = require("../../../../../Core/Audio/AudioDefine");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const PawnTimeScaleComponent_1 = require("../../../Pawn/Component/PawnTimeScaleComponent");
let CharacterTimeScaleComponent = class CharacterTimeScaleComponent extends PawnTimeScaleComponent_1.PawnTimeScaleComponent {
  constructor() {
    super(...arguments);
    this.dKr = 1;
    this.CKr = 1;
    this.gKr = 1;
    this.TimeStopEntitySet = new Set();
    this.J81 = false;
    this.Ix1 = -1;
  }
  OnStart() {
    return !!super.OnStart() && (this.J81 = ControllerHolder_1.ControllerHolder.EffectAudioController.CheckInSpecialInstanceDungeon(), true);
  }
  IsTimescaleValid(e) {
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      switch (e.SourceType) {
        case 3:
        case 4:
        case 6:
        case 5:
        case 7:
          break;
        default:
          return false;
      }
    }
    return super.IsTimescaleValid(e);
  }
  OnTick(e) {
    let t = 1;
    let i = 0;
    let o = 1;
    while (!this.TimeScaleList.Empty) {
      var r = this.TimeScaleList.Top;
      if (!r) {
        break;
      }
      if (this.IsTimescaleValid(r)) {
        t = r.CalculateTimeScale();
        i = r.SourceType;
        o = r.EndTime - r.StartTime >= AudioDefine_1.ENTITY_TIMESCALE_ENABLE_THRESHOLD ? t : this.CKr;
        break;
      }
      this.TimeScaleMap.delete(r.Id);
      this.TimeScaleList.Pop();
    }
    var s = this.Entity.GetComponent(15);
    if (!!this.ActorComp && !this.ActorComp.IsMoveAutonomousProxy && (!s || !s.IsDead())) {
      t = this.gKr;
      o = this.gKr;
    }
    if (this.Ix1 >= 0) {
      t = this.Ix1;
      o = this.Ix1;
    }
    this.FreezeTimeScaleInternal = t;
    var s = this.GetTopForeverTimeScale();
    t *= s;
    if (this.RemoveLockTimestamp > 0 && this.Entity.GetComponent(0)?.IsMonster()) {
      if ((n = Time_1.Time.NowSeconds - this.RemoveLockTimestamp) > 2) {
        CombatLog_1.CombatLog.Error("Skill", this.Entity, "大招时停恢复时间过长", ["gap time", n]);
      }
      this.RemoveLockTimestamp = -1;
    }
    var n = o * this.Entity.TimeDilation * ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation * s;
    if (n !== this.dKr && (s = this.ActorComp?.Owner)) {
      if (!this.J81) {
        AudioSystem_1.AudioSystem.SetRtpcValue("entity_time_scale_combat", n, {
          Actor: s
        });
      }
      if (n < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD && this.dKr >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD) {
        AudioSystem_1.AudioSystem.PostEvent("time_scale_pause", s);
      } else if (n >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD && this.dKr < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD) {
        AudioSystem_1.AudioSystem.PostEvent("time_scale_resume", s);
      }
    }
    this.dKr = n;
    this.CKr = o;
    if (t !== this.TimeScaleInternal) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 19, "实体流速变化", ["entityId", this.Entity.Id], ["newScale", t], ["oldScale", this.TimeScaleInternal], ["sourceType", i]);
      }
      this.TimeScaleInternal = t;
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, t, i);
      this.Entity.SetTimeDilation(this.TimeDilation);
    }
  }
  SetMoveSyncTimeScale(e) {
    this.gKr = e;
  }
  SetForceTimeScale(e, t = false) {
    this.Ix1 = e;
    if (t) {
      this.OnTick(0);
    }
  }
  RemoveForceTimeScale(e = false) {
    this.Ix1 = -1;
    if (e) {
      this.OnTick(0);
    }
  }
  SetTimeScale(e, t, i, o, r, s, n = false) {
    var a = this.Entity.GetComponent(175)?.BuffEffectManager?.FilterFirstById(85);
    if (a) {
      return a.SetTimeScale(e, t, i, o, r, s, n);
    } else {
      return super.SetTimeScale(e, t, i, o, r, s, n);
    }
  }
  RemoveTimeScale(e) {
    var t = this.Entity.GetComponent(175)?.BuffEffectManager?.FilterFirstById(85);
    if (t) {
      t.RemoveTimeScale(e);
    } else {
      super.RemoveTimeScale(e);
    }
  }
};
CharacterTimeScaleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(180)], CharacterTimeScaleComponent);
exports.CharacterTimeScaleComponent = CharacterTimeScaleComponent; //# sourceMappingURL=CharacterTimeScaleComponent.js.map