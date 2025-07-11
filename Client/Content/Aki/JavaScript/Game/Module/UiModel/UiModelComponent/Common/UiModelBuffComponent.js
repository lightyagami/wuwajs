"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var f;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (f = e[n]) {
        r = (s < 3 ? f(r) : s > 3 ? f(t, i, r) : f(t, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelBuffComponent = undefined;
const BuffById_1 = require("../../../../../Core/Define/ConfigQuery/BuffById");
const GameplayCueById_1 = require("../../../../../Core/Define/ConfigQuery/GameplayCueById");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const UiModelEffectComponent_1 = require("./UiModelEffectComponent");
let UiModelBuffComponent = class UiModelBuffComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.D_r = undefined;
    this.BuffToEffectsMap = new Map();
    this.CacheEffectContext = new UiModelEffectComponent_1.UiModelEffectPlayContext();
    this.CacheLocation = Vector_1.Vector.Create();
    this.CacheRotator = Rotator_1.Rotator.Create();
    this.CacheScale = Vector_1.Vector.Create();
    this.CacheTransform = Transform_1.Transform.Create();
  }
  OnInit() {
    this.n$t = this.Owner.CheckGetComponent(1);
    this.D_r = this.Owner.CheckGetComponent(4);
  }
  OnEnd() {
    this.RemoveAllBuffId();
  }
  AddBuffByBuffId(t) {
    if (!this.BuffToEffectsMap.has(t)) {
      var e = BuffById_1.configBuffById.GetConfig(t);
      if (e) {
        e = e.GameplayCueIds;
        if (e && e.length !== 0) {
          for (const o of e) {
            var i = GameplayCueById_1.configGameplayCueById.GetConfig(o);
            if (i) {
              i = this.PlayEffectByCueConfig(i);
              let e = this.BuffToEffectsMap.get(t);
              if (!e) {
                e = new Set();
                this.BuffToEffectsMap.set(t, e);
              }
              e.add(i);
            }
          }
        }
      }
    }
  }
  PlayEffectByCueConfig(e) {
    var t = this.CacheEffectContext;
    t.Reset();
    t.EffectPath = e.Path;
    t.AttachTargetComponent = this.n$t.MainMeshComponent;
    t.LocationRule = e.LocRule;
    t.RotationRule = e.RotaRule;
    t.ScaleRule = e.SclRule;
    var i = e.Location;
    this.CacheLocation.Set(i.X, i.Y, i.Z);
    this.CacheTransform.SetLocation(this.CacheLocation);
    var i = e.Rotation;
    this.CacheRotator.Set(i.X, i.Y, i.Z);
    this.CacheTransform.SetRotation(this.CacheRotator.Quaternion());
    var i = e.Scale;
    this.CacheScale.Set(i.X, i.Y, i.Z);
    this.CacheTransform.SetScale3D(this.CacheScale);
    t.Transform = this.CacheTransform.ToUeTransform();
    t.SocketName = FNameUtil_1.FNameUtil.GetDynamicFName(e.Socket) ?? FNameUtil_1.FNameUtil.EMPTY;
    return this.D_r.PlayEffectByContext(t);
  }
  RemoveBuffByBuffId(e) {
    e = this.BuffToEffectsMap.get(e);
    if (e) {
      for (const t of e) {
        this.D_r.StopEffect(t);
      }
    }
  }
  RemoveAllBuffId() {
    if (this.BuffToEffectsMap.size !== 0) {
      for (const e of this.BuffToEffectsMap.keys()) {
        this.RemoveBuffByBuffId(e);
      }
      this.BuffToEffectsMap.clear();
    }
  }
};
UiModelBuffComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(11)], UiModelBuffComponent);
exports.UiModelBuffComponent = UiModelBuffComponent; //# sourceMappingURL=UiModelBuffComponent.js.map