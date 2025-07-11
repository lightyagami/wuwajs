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
  IsTimescaleValid(e, t) {
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
    return super.IsTimescaleValid(e, t);
  }
  OnTick(e) {
    var t = Time_1.Time.WorldTimeSeconds;
    let i = 1;
    let o = 0;
    let r = 1;
    while (!this.TimeScaleList.Empty) {
      var s = this.TimeScaleList.Top;
      if (!s) {
        break;
      }
      if (this.IsTimescaleValid(s, t)) {
        i = s.CalculateTimeScale();
        o = s.SourceType;
        r = s.EndTime - s.StartTime >= AudioDefine_1.ENTITY_TIMESCALE_ENABLE_THRESHOLD ? i : this.CKr;
        break;
      }
      this.TimeScaleMap.delete(s.Id);
      this.TimeScaleList.Pop();
    }
    var n = this.Entity.GetComponent(15);
    if (!!this.ActorComp && !this.ActorComp.IsMoveAutonomousProxy && (!n || !n.IsDead())) {
      i = this.gKr;
      r = this.gKr;
    }
    if (this.Ix1 >= 0) {
      i = this.Ix1;
      r = this.Ix1;
    }
    this.FreezeTimeScaleInternal = i;
    var n = this.GetTopForeverTimeScale();
    i *= n;
    if (this.RemoveLockTimestamp > 0 && this.Entity.GetComponent(0)?.IsMonster()) {
      if ((a = Time_1.Time.NowSeconds - this.RemoveLockTimestamp) > 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 19, "大招时停恢复时间过长", ["gap time", a]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 19, "大招时停恢复", ["gap time", a]);
      }
      this.RemoveLockTimestamp = -1;
    }
    var a = r * this.Entity.TimeDilation * ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation * n;
    if (a !== this.dKr && (n = this.ActorComp?.Owner)) {
      if (!this.J81) {
        AudioSystem_1.AudioSystem.SetRtpcValue("entity_time_scale_combat", a, {
          Actor: n
        });
      }
      if (a < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD && this.dKr >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD) {
        AudioSystem_1.AudioSystem.PostEvent("time_scale_pause", n);
      } else if (a >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD && this.dKr < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD) {
        AudioSystem_1.AudioSystem.PostEvent("time_scale_resume", n);
      }
    }
    this.dKr = a;
    this.CKr = r;
    if (i !== this.TimeScaleInternal) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 19, "实体流速变化", ["entityId", this.Entity.Id], ["newScale", i], ["oldScale", this.TimeScaleInternal], ["sourceType", o]);
      }
      this.TimeScaleInternal = i;
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, i, o);
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
};
CharacterTimeScaleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(179)], CharacterTimeScaleComponent);
exports.CharacterTimeScaleComponent = CharacterTimeScaleComponent; //# sourceMappingURL=CharacterTimeScaleComponent.js.map