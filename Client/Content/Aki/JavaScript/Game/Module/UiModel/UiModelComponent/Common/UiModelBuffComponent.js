"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var s;
  var r = arguments.length;
  var f = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    f = Reflect.decorate(e, t, i, o);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (s = e[n]) {
        f = (r < 3 ? s(f) : r > 3 ? s(t, i, f) : s(t, i)) || f;
      }
    }
  }
  if (r > 3 && f) {
    Object.defineProperty(t, i, f);
  }
  return f;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelBuffComponent = undefined;
const BuffById_1 = require("../../../../../Core/Define/ConfigQuery/BuffById");
const GameplayCueById_1 = require("../../../../../Core/Define/ConfigQuery/GameplayCueById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const UiModelEffectComponent_1 = require("./UiModelEffectComponent");
class BuffHandle {
  constructor() {
    this.EffectHandleSet = new Set();
    this.MaterialHandleSet = new Set();
  }
}
let UiModelBuffComponent = class UiModelBuffComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.D_r = undefined;
    this.dGg = undefined;
    this.BuffToHandlesMap = new Map();
    this.CacheEffectContext = new UiModelEffectComponent_1.UiModelEffectPlayContext();
    this.CacheLocation = Vector_1.Vector.Create();
    this.CacheRotator = Rotator_1.Rotator.Create();
    this.CacheScale = Vector_1.Vector.Create();
    this.CacheTransform = Transform_1.Transform.Create();
  }
  OnInit() {
    this.n$t = this.Owner.CheckGetComponent(1);
    this.D_r = this.Owner.CheckGetComponent(4);
    this.dGg = this.Owner.CheckGetComponent(5);
  }
  OnEnd() {
    this.RemoveAllBuffId();
  }
  AddBuffByBuffId(e) {
    if (!this.BuffToHandlesMap.has(e)) {
      var t = BuffById_1.configBuffById.GetConfig(e);
      if (t) {
        var i = t.GameplayCueIds;
        if (i && i.length !== 0) {
          var o = new BuffHandle();
          for (const r of i) {
            var s = GameplayCueById_1.configGameplayCueById.GetConfig(r);
            if (s) {
              this.z5g(t, s, o);
            }
          }
          this.BuffToHandlesMap.set(e, o);
        }
      }
    }
  }
  z5g(e, t, i) {
    var o;
    switch (t.CueType) {
      case 0:
        if ((o = this.PlayEffectByConfig(e, t)) > 0) {
          i.EffectHandleSet.add(o);
        }
        break;
      case 1:
        if ((o = this.AddMaterialControllerByCueConfig(t)) > 0) {
          i.MaterialHandleSet.add(o);
        }
    }
  }
  AddMaterialControllerByCueConfig(e) {
    e = e.Path;
    if (StringUtils_1.StringUtils.IsBlank(e)) {
      return 0;
    } else {
      return this.dGg.AddRenderingMaterialByPath(e);
    }
  }
  PlayEffectByConfig(e, i) {
    let o = 0;
    if (e.DurationPolicy === 2) {
      o = e.DurationMagnitude[0];
    }
    var e = this.CacheEffectContext;
    e.Reset();
    e.EffectPath = i.Path;
    e.AttachTargetComponent = this.n$t.MainMeshComponent;
    e.LocationRule = i.LocRule;
    e.RotationRule = i.RotaRule;
    e.ScaleRule = i.SclRule;
    var t = i.Location;
    this.CacheLocation.Set(t.X, t.Y, t.Z);
    this.CacheTransform.SetLocation(this.CacheLocation);
    var t = i.Rotation;
    this.CacheRotator.Set(t.X, t.Y, t.Z);
    this.CacheTransform.SetRotation(this.CacheRotator.Quaternion());
    var t = i.Scale;
    this.CacheScale.Set(t.X, t.Y, t.Z);
    this.CacheTransform.SetScale3D(this.CacheScale);
    e.Transform = this.CacheTransform.ToUeTransform();
    e.SocketName = FNameUtil_1.FNameUtil.GetDynamicFName(i.Socket) ?? FNameUtil_1.FNameUtil.EMPTY;
    if (o > 0) {
      e.Callback = (e, t) => {
        if (e === 5) {
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            this.StopEffectByCueEndRule(t, i.EndRule);
          }, o * TimeUtil_1.TimeUtil.InverseMillisecond);
        }
      };
    }
    return this.D_r.PlayEffectByContext(e);
  }
  StopEffectByCueEndRule(e, t) {
    let i = false;
    if (EffectSystem_1.EffectSystem.IsValid(e)) {
      switch (t) {
        case 0:
          i = true;
          break;
        case 1:
          i = false;
          break;
        case 2:
          EffectSystem_1.EffectSystem.FreezeHandle(e, false);
          i = false;
      }
      this.D_r.StopEffect(e, i);
    }
  }
  RemoveBuffByBuffId(e) {
    var t = this.BuffToHandlesMap.get(e);
    if (t) {
      for (const i of t.EffectHandleSet) {
        this.D_r.StopEffect(i);
      }
      t.EffectHandleSet.clear();
      for (const o of t.MaterialHandleSet) {
        this.dGg.RemoveRenderingMaterial(o);
      }
      t.MaterialHandleSet.clear();
      this.BuffToHandlesMap.delete(e);
    }
  }
  RemoveAllBuffId() {
    if (this.BuffToHandlesMap.size !== 0) {
      for (const e of this.BuffToHandlesMap.keys()) {
        this.RemoveBuffByBuffId(e);
      }
      this.BuffToHandlesMap.clear();
    }
  }
};
UiModelBuffComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(11)], UiModelBuffComponent);
exports.UiModelBuffComponent = UiModelBuffComponent; //# sourceMappingURL=UiModelBuffComponent.js.map