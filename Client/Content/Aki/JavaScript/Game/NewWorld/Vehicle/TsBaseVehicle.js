"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const CharacterDitherEffectController_1 = require("../Character/Common/Component/Effect/CharacterDitherEffectController");
class TsBaseVehicle extends UE.KuroBaseVehicle {
  constructor() {
    super(...arguments);
    this.EntityId = 0;
    this.VehicleActorComponent = undefined;
    this.CharRenderingComponent = undefined;
    this.RenderType = 7;
    this.InputComponentClass = undefined;
    this.PlatformActor = undefined;
    this.DitherEffectControllerInternal = undefined;
  }
  Constructor() {
    this.VehicleActorComponent = undefined;
    this.DitherEffectControllerInternal = undefined;
  }
  SetEntityId(t) {
    this.EntityId = t;
    this.EntityIdInternal = t;
  }
  GetEntityId() {
    if (this.VehicleActorComponent) {
      return this.VehicleActorComponent.Entity.Id;
    } else {
      return 0;
    }
  }
  GetEntityIdNoBlueprint() {
    if (this.VehicleActorComponent) {
      return this.VehicleActorComponent.Entity.Id;
    } else {
      return 0;
    }
  }
  GetEntityNoBlueprint() {
    if (this.VehicleActorComponent) {
      return this.VehicleActorComponent.Entity;
    }
  }
  ReceiveDestroyed() {
    if (ObjectUtils_1.ObjectUtils.IsValid(this)) {
      this.InputComponentClass = undefined;
      this.VehicleActorComponent = undefined;
      this.CharRenderingComponent = undefined;
      this.DitherEffectControllerInternal = undefined;
      super.ReceiveDestroyed();
    }
  }
  TryAddTsAbilitySystemComponent() {
    this.AbilitySystemComponent ||= this.AddComponentByClass(UE.BaseAbilitySystemComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
  }
  set DitherEffectController(t) {
    this.DitherEffectControllerInternal = t;
  }
  get DitherEffectController() {
    this.DitherEffectControllerInternal ||= new CharacterDitherEffectController_1.CharacterDitherEffectController(this, this.CharRenderingComponent);
    return this.DitherEffectControllerInternal;
  }
  get HasDitherEffectController() {
    return this.DitherEffectControllerInternal !== undefined;
  }
  SetDitherEffect(t, e = 3) {
    this.DitherEffectController?.SetDitherEffect(t, e);
  }
}
exports.default = TsBaseVehicle;
//# sourceMappingURL=TsBaseVehicle.js.map