"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (s = e[a]) {
        r = (o < 3 ? s(r) : o > 3 ? s(t, i, r) : s(t, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemTimeScaleComponent = undefined;
const AudioDefine_1 = require("../../../Core/Audio/AudioDefine");
const Time_1 = require("../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks");
const ModelManager_1 = require("../../Manager/ModelManager");
const PawnTimeScaleComponent_1 = require("../Pawn/Component/PawnTimeScaleComponent");
const downsizeTag = 301831016;
const upsizeTag = 273828843;
let SceneItemTimeScaleComponent = class SceneItemTimeScaleComponent extends PawnTimeScaleComponent_1.PawnTimeScaleComponent {
  constructor() {
    super(...arguments);
    this.Xte = undefined;
    this.EIe = undefined;
  }
  OnInit() {
    return !!super.OnInit() && (this.EIe = this.Entity.GetComponent(0), true);
  }
  OnStart() {
    return !!super.OnStart() && (this.TimeScaleList.Empty && this.SetTimeScaleTicking(false, "[SceneItemTimeScaleComponent] OnStart, 初始关闭时间缩放"), this.Xte = this.Entity.GetComponent(196), true);
  }
  SetTimeScaleTicking(e, t) {
    if (e && this.DisableHandle !== undefined) {
      if (this.Enable(this.DisableHandle, t ?? "[SceneItemTimeScaleComponent] 开启Tick")) {
        this.DisableHandle = undefined;
      }
    } else if (!e && this.DisableHandle === undefined) {
      this.DisableHandle = this.Disable(t ?? "[SceneItemTimeScaleComponent] 关闭Tick");
      this.bla();
    }
  }
  OnTick(e) {
    var t = Time_1.Time.WorldTimeSeconds;
    let i = 1;
    let n = 1;
    let s = false;
    while (!this.TimeScaleList.Empty) {
      var o = this.TimeScaleList.Top;
      if (!o) {
        break;
      }
      if (o.EndTime > t && !o.MarkDelete) {
        i = o.CalculateTimeScale();
        s = o.NeedAddSceneItemTag;
        if (o.EndTime - o.StartTime >= AudioDefine_1.ENTITY_TIMESCALE_ENABLE_THRESHOLD) {
          n = i;
        }
        break;
      }
      this.TimeScaleMap.delete(o.Id);
      this.TimeScaleList.Pop();
    }
    this.FreezeTimeScaleInternal = i;
    var r = this.GetTopForeverTimeScale();
    i *= r;
    n *= r;
    if (i !== this.TimeScaleInternal) {
      this.bla();
      if (s && i !== 1) {
        this.Xte?.AddTag(i > 1 ? upsizeTag : downsizeTag);
      }
      this.TimeScaleInternal = i;
      this.Entity.SetTimeDilation(this.TimeDilation);
    }
    n *= this.TimeDilation * (ModelManager_1.ModelManager.CharacterModel?.SelfCenteredTimeDilation ?? 1);
    this.Entity.GetComponent(202)?.UpdateAkFinalTimeScale(n);
    if (this.TimeScaleList.Empty) {
      this.SetTimeScaleTicking(false, "[PawnTimeScaleComponent] 时间缩放结束");
    }
  }
  SetTimeScale(e, t, i, n, s, o = false) {
    e = super.SetTimeScale(e, t, i, n, s, o);
    if (e >= 0) {
      this.SetTimeScaleTicking(true);
    }
    this.OnTick(0);
    return e;
  }
  RemoveTimeScale(e) {
    super.RemoveTimeScale(e);
    this.OnTick(0);
  }
  SetForeverTimeScale(e, t, i = 0) {
    e = super.SetForeverTimeScale(e, t, i);
    this.OnTick(0);
    return e;
  }
  RemoveForeverTimeScale(e) {
    super.RemoveForeverTimeScale(e);
    this.OnTick(0);
  }
  bla() {
    if (this.Xte) {
      this.Xte.RemoveTag(downsizeTag);
      this.Xte.RemoveTag(upsizeTag);
    }
  }
  OnChangeTimeDilation(t) {
    super.OnChangeTimeDilation(t);
    if (this.EIe && LevelGeneralNetworks_1.LevelGeneralNetworks.CheckEntityCanPushTimeDilation(this.EIe.GetEntityTimeScaleModifyStrategy())) {
      let e = this.CurrentTimeScale * t;
      t = this.Entity.GetComponent(284);
      if (t && t?.ExtraTimeDilationInSelfCenteredMode !== 0) {
        e /= t.ExtraTimeDilationInSelfCenteredMode;
      }
      LevelGeneralNetworks_1.LevelGeneralNetworks.PushEntityTimeDilation(this.EIe.GetCreatureDataId(), e);
    }
  }
};
SceneItemTimeScaleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(204)], SceneItemTimeScaleComponent);
exports.SceneItemTimeScaleComponent = SceneItemTimeScaleComponent; //# sourceMappingURL=SceneItemTimeScaleComponent.js.map