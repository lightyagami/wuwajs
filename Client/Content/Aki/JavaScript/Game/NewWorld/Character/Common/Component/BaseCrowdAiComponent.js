"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (n = t[h]) {
        r = (s < 3 ? n(r) : s > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseCrowdAiComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const motorCollisionTag = new UE.FName("DitherCollisionShape");
const MONSTER_EXTRA_RADIUS = 30;
const NPC_EXTRA_RADIUS = 10;
const DEFAULT_MIN_RADIUS = 1;
let BaseCrowdAiComponent = class BaseCrowdAiComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.DisableKey = undefined;
    this.BoidComponent = undefined;
    this.OnEnableCrowdAiSystemWrapper = t => {
      this.OnEnableCrowdAiSystem(t);
    };
    this.OnClearWorld = () => {
      this.BoidComponent?.K2_DestroyComponent(this.ActorComp?.Owner);
      this.BoidComponent = undefined;
    };
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(1);
    if (ControllerHolder_1.ControllerHolder.CrowdAiController.IsCrowdAiEnable) {
      this.TryInitBoidComponent();
    } else {
      this.DisableKey = this.Disable("[BaseCrowdAiComp.OnStart] 默认Disable");
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnableCrowdAiSystem, this.OnEnableCrowdAiSystemWrapper);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnableCrowdAiSystem, this.OnEnableCrowdAiSystemWrapper);
    return true;
  }
  OnDisable(t) {
    this.BoidComponent?.EnableBoidCollision(false);
  }
  OnEnable() {
    this.TryInitBoidComponent();
    this.BoidComponent?.EnableBoidCollision(true);
  }
  TryInitBoidComponent() {
    if (!this.BoidComponent?.IsValid()) {
      if (this.CheckNeedCreateBoidComp() && (this.BoidComponent = this.FindOrAddBoidComponent(), this.BoidComponent?.IsValid())) {
        this.OnBoidComponentCreated();
        this.BoidComponent.EnableBoidCollision(true);
      }
    }
  }
  CheckNeedCreateBoidComp() {
    var t = this.Entity.GetComponent(0);
    if (!t?.IsSceneItem()) {
      return true;
    }
    t = t.GetPbEntityInitData();
    if (!t) {
      return false;
    }
    t = (0, IComponent_1.getComponent)(t.ComponentsData, "ExtraRangeComponent");
    if (!t?.ExtraRangeConfigs.length) {
      return false;
    }
    let e = 0;
    let i = 0;
    for (const o of t.ExtraRangeConfigs) {
      e = Math.max(o.CylinderRange.Radius, e);
      i = Math.max(o.CylinderRange.Height, i);
    }
    return e > DEFAULT_MIN_RADIUS && i > DEFAULT_MIN_RADIUS;
  }
  OnBoidComponentCreated() {
    var t = this.Entity.GetComponent(0);
    var o = this.Entity.GetComponent(246);
    if (o?.VehicleType === "Motorcycle") {
      this.BoidComponent.ShapeCollisionTagName = motorCollisionTag;
      this.BoidComponent.InitializeShapeBoids();
    } else if (t?.IsMonster() || t?.IsNpc()) {
      o = this.Entity.GetComponent(2).Actor.CapsuleComponent.CapsuleRadius + (t?.IsMonster() ? MONSTER_EXTRA_RADIUS : NPC_EXTRA_RADIUS);
      this.BoidComponent.Radius = o;
      this.BoidComponent.ExtrusionRadius = o;
    } else if (t?.IsSceneItem()) {
      var o = t.GetPbEntityInitData();
      var t = (0, IComponent_1.getComponent)(o.ComponentsData, "ExtraRangeComponent");
      var n = this.Entity.GetComponent(214);
      let e = DEFAULT_MIN_RADIUS;
      let i = DEFAULT_MIN_RADIUS;
      this.BoidComponent.Radius = DEFAULT_MIN_RADIUS;
      this.BoidComponent.HalfHeight = DEFAULT_MIN_RADIUS;
      this.BoidComponent.ExtrusionRadius = DEFAULT_MIN_RADIUS;
      var s = [];
      for (const _ of t.ExtraRangeConfigs) {
        var r = _.CylinderRange.Radius;
        var h = _.CylinderRange.Height;
        MathUtils_1.MathUtils.CommonTempVector.FromConfigVector(_.CylinderRange.Center);
        e = Math.max(e, r);
        i = Math.max(i, h);
        let t = undefined;
        if (MathUtils_1.MathUtils.CommonTempVector.IsNearlyZero()) {
          e = Math.max(e, r);
          i = Math.max(i, h);
        } else {
          t = n.Owner?.AddComponentByClass(UE.CapsuleComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
        }
        if (t?.IsValid()) {
          t.CapsuleRadius = r;
          t.CapsuleHalfHeight = h / 2;
          t.D_K2_SetRelativeLocation(MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), false, undefined, false);
          t.ComponentTags.Add(motorCollisionTag);
          s.push(t);
        } else {
          this.BoidComponent.Radius = e;
          this.BoidComponent.HalfHeight = i / 2;
          this.BoidComponent.ExtrusionRadius = e;
        }
      }
      if (s.length) {
        this.BoidComponent.ShapeCollisionTagName = motorCollisionTag;
        this.BoidComponent.InitializeShapeBoids();
        for (const a of s) {
          a.K2_DestroyComponent(n.Owner);
        }
      }
    }
  }
  FindOrAddBoidComponent() {
    if (this.ActorComp?.Owner?.IsValid()) {
      let t = this.ActorComp.Owner.GetComponentByClass(UE.KuroCrowdAiBoidComponent.StaticClass());
      return t = t?.IsValid() ? t : this.ActorComp.Owner.AddComponentByClass(UE.KuroCrowdAiBoidComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    }
  }
  OnEnableCrowdAiSystem(t) {
    if (t && this.DisableKey) {
      this.Enable(this.DisableKey, "BaseCrowdAiComp.OnEnableCrowdAiSystem");
      this.DisableKey = undefined;
    } else if (!t && !this.DisableKey) {
      this.DisableKey = this.Disable("BaseCrowdAiComp.OnDisableCrowdAiSystem");
    }
  }
};
BaseCrowdAiComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(334)], BaseCrowdAiComponent);
exports.BaseCrowdAiComponent = BaseCrowdAiComponent; //# sourceMappingURL=BaseCrowdAiComponent.js.map