"use strict";

var SceneItemResetSelfPositionComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var n = arguments.length;
  var h = n < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (o = e[r]) {
        h = (n < 3 ? o(h) : n > 3 ? o(t, i, h) : o(t, i)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemResetSelfPositionComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const TICK_CHECK_INTERVAL = 500;
const FIX_DELAY = 0.35;
let SceneItemResetSelfPositionComponent = SceneItemResetSelfPositionComponent_1 = class SceneItemResetSelfPositionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.tVr = undefined;
    this.EMn = -1;
    this.j6 = 0;
    this.SMn = true;
    this.yMn = undefined;
    this.IMn = false;
    this.TDe = undefined;
    this.LDe = undefined;
    this.TMn = (e, t, i, s, o) => {
      if (this.tVr?.HasMoveAuthority() && (!this.LMn(e) && e !== 11 || this.IMn || (this.DMn("[SceneItemResetSelfPositionComponent] 结束被当前主控移动，停止检查距离Tick"), this.EMn !== -1 && this.RMn()), t === 3 && this.UMn(), this.Lo?.IsDisableResetPosAfterThrow && this.LMn(t) && (this.DMn("[SceneItemResetSelfPositionComponent] 被控物配置丢出时停止检测"), this.IMn = true), this.Lo?.IsResetPosAfterThrow && t === 11 && (this.TDe !== undefined && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = undefined), this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
        this.TDe = undefined;
        this.AMn("ResetPositionTip2");
      }, FIX_DELAY * TimeUtil_1.TimeUtil.InverseMillisecond)), this.Lo?.ResetPosDelayTime && !s?.IsNoLockCasting() && o?.IsNoLockCasting() && (this.TDe !== undefined && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = undefined), this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
        this.TDe = undefined;
        this.AMn(undefined);
      }, this.Lo.ResetPosDelayTime * TimeUtil_1.TimeUtil.InverseMillisecond)), t === 12) && this.TDe !== undefined) {
        TimerSystem_1.TimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemResetSelfPositionComponent_1)[0];
    this.Lo = e;
    if (this.Lo.ResetRadius !== undefined) {
      this.EMn = this.Lo.ResetRadius * this.Lo.ResetRadius;
    }
    this.j6 = TICK_CHECK_INTERVAL;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(203);
    this.tVr = this.Entity.CheckGetComponent(159);
    if (this.Entity.CheckGetComponent(157)) {
      this.DMn("[SceneItemResetSelfPositionComponent] 初始关闭检查距离Tick");
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatableItemStateModified, this.TMn);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemResetSelfPositionComponent] OnStart失败，实体不是可被控物", ["PbDataID", this.Hte.CreatureData.GetPbDataId()]);
      }
      return false;
    }
  }
  OnActivate() {
    if (this.EMn !== -1) {
      this.LDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.RMn();
      }, this.j6);
    }
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatableItemStateModified, this.TMn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatableItemStateModified, this.TMn);
    }
    if (this.LDe !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.LDe);
      this.LDe = undefined;
    }
    return true;
  }
  UMn() {
    if (!this.PMn()) {
      this.LDe?.Resume();
    }
  }
  DMn(e) {
    if (this.PMn()) {
      this.LDe?.Pause();
    }
  }
  PMn() {
    return !this.LDe?.IsPause() ?? false;
  }
  RMn() {
    var e = this.SMn;
    if (!this.xMn() && e) {
      this.AMn(undefined);
    }
  }
  xMn() {
    var e;
    var t = this.Hte.ActorLocationProxy;
    if (t !== this.yMn && (this.yMn = Vector_1.Vector.Create(t), e = this.Hte.CreatureData.GetInitLocation())) {
      e = Vector_1.Vector.Create(e);
      this.SMn = Vector_1.Vector.DistSquared(e, t) <= this.EMn;
    }
    return this.SMn;
  }
  AMn(e) {
    LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(this.Entity, e, 0);
  }
  LMn(e) {
    return e === 6 || e === 7 || e === 9 || e === 8;
  }
  StopTimerOnResetPos() {
    if (this.TDe !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
};
SceneItemResetSelfPositionComponent = SceneItemResetSelfPositionComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(167)], SceneItemResetSelfPositionComponent);
exports.SceneItemResetSelfPositionComponent = SceneItemResetSelfPositionComponent; //# sourceMappingURL=SceneItemResetSelfPositionComponent.js.map