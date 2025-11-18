"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var n;
  var o = arguments.length;
  var r = o < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, s);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        r = (o < 3 ? n(r) : o > 3 ? n(t, i, r) : n(t, i)) || r;
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
    return !!super.OnStart() && (this.TimeScaleList.Empty && this.SetTimeScaleTicking(false, "[SceneItemTimeScaleComponent] OnStart, 初始关闭时间缩放"), this.Xte = this.Entity.GetComponent(200), true);
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
    let t = 1;
    let i = 1;
    let s = false;
    while (!this.TimeScaleList.Empty) {
      var n = this.TimeScaleList.Top;
      if (!n) {
        break;
      }
      if (this.IsTimescaleValid(n)) {
        t = n.CalculateTimeScale();
        s = n.NeedAddSceneItemTag;
        if (n.EndTime - n.StartTime >= AudioDefine_1.ENTITY_TIMESCALE_ENABLE_THRESHOLD) {
          i = t;
        }
        break;
      }
      this.TimeScaleMap.delete(n.Id);
      this.TimeScaleList.Pop();
    }
    this.FreezeTimeScaleInternal = t;
    var o = this.GetTopForeverTimeScale();
    t *= o;
    i *= o;
    if (t !== this.TimeScaleInternal) {
      this.bla();
      if (s && t !== 1) {
        this.Xte?.AddTag(t > 1 ? upsizeTag : downsizeTag);
      }
      this.TimeScaleInternal = t;
      this.Entity.SetTimeDilation(this.TimeDilation);
    }
    i *= this.TimeDilation * (ModelManager_1.ModelManager.CharacterModel?.SelfCenteredTimeDilation ?? 1);
    this.Entity.GetComponent(206)?.UpdateAkFinalTimeScale(i);
    if (this.TimeScaleList.Empty) {
      this.SetTimeScaleTicking(false, "[PawnTimeScaleComponent] 时间缩放结束");
    }
  }
  SetTimeScale(e, t, i, s, n, o = false) {
    e = super.SetTimeScale(e, t, i, s, n, o);
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
      t = this.Entity.GetComponent(292);
      if (t && t?.ExtraTimeDilationInSelfCenteredMode !== 0) {
        e /= t.ExtraTimeDilationInSelfCenteredMode;
      }
      LevelGeneralNetworks_1.LevelGeneralNetworks.PushEntityTimeDilation(this.EIe.GetCreatureDataId(), e);
    }
  }
};
SceneItemTimeScaleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(208)], SceneItemTimeScaleComponent);
exports.SceneItemTimeScaleComponent = SceneItemTimeScaleComponent; //# sourceMappingURL=SceneItemTimeScaleComponent.js.map