"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharGrassInteraction = undefined;
const UE = require("ue");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const GlobalData_1 = require("../../../../GlobalData");
const TsBaseVehicle_1 = require("../../../../NewWorld/Vehicle/TsBaseVehicle");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
const refBoneName = new UE.FName("Bip001Head");
class CharGrassInteraction extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.GrassInteractionComponent = undefined;
    this.Enabled = true;
    this.IsOnMobile = false;
    this.OwnerCapsule = undefined;
    this.OwnerSkeletal = undefined;
    this.BaseBias = undefined;
    this.M4a = 0;
    this.S4a = false;
    this.InteractionDefaultRadius = 70;
    this.InteractionDefaultBias = new UE.Vector(0, 0, 70);
  }
  E4a() {
    return this.OwnerSkeletal.D_GetSocketTransform(refBoneName, 2).GetLocation().Z;
  }
  SetEnabled(t) {
    this.Enabled = t;
    if (this.GrassInteractionComponent) {
      this.GrassInteractionComponent.bEnabled = t;
    }
  }
  SetConfig(t) {
    var e;
    var s;
    if (t && !this.IsOnMobile) {
      e = t.植被交互半径;
      s = t.植被交互相对位置;
      t = t.启用植被交互;
      this.UDa(e, s, t);
    }
  }
  UDa(t, e, s) {
    if (!this.IsOnMobile) {
      const i = this.RenderComponent.GetCachedOwner();
      if (i && (i instanceof TsBaseCharacter_1.default || i instanceof TsBaseVehicle_1.default)) {
        this.OwnerCapsule = i.CapsuleComponent;
        this.OwnerSkeletal = i.Mesh;
      }
      if (this.OwnerCapsule && this.OwnerSkeletal) {
        if (this.OwnerSkeletal.GetBoneIndex(refBoneName) !== -1) {
          this.M4a = this.E4a();
          this.S4a = true;
        }
        this.BaseBias = new UE.Vector(e.X, e.Y, e.Z - this.OwnerCapsule.CapsuleHalfHeight);
        if (!this.GrassInteractionComponent) {
          const i = this.GetRenderingComponent().GetOwner();
          this.GrassInteractionComponent = i.AddComponentByClass(UE.KuroGrassInteractionSphereComponent.StaticClass(), false, new UE.Transform(this.BaseBias), false);
        }
        this.GrassInteractionComponent.Radius = t;
        this.GrassInteractionComponent.bEnabled = s;
        this.Enabled = s;
      }
    }
  }
  Start() {
    this.IsOnMobile = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(GlobalData_1.GlobalData.World) === 0;
    if (!this.IsOnMobile) {
      if (this.RenderComponent.InteractionConfig) {
        this.SetConfig(this.RenderComponent.InteractionConfig);
      } else {
        this.UDa(this.InteractionDefaultRadius, this.InteractionDefaultBias, true);
      }
    }
    this.OnInitSuccess();
  }
  Update() {
    var t;
    if (!this.IsOnMobile && this.GrassInteractionComponent && this.S4a) {
      t = this.E4a();
      this.M4a = this.M4a * 0.9 + t * 0.1;
      t = t - this.M4a;
      t = Math.max(-10, t);
      t = new UE.VectorDouble(this.BaseBias.X, this.BaseBias.Y, this.BaseBias.Z + t * 3);
      this.GrassInteractionComponent.D_K2_SetRelativeLocation(t, false, undefined, false);
    }
  }
  Destroy() {
    if (this.GrassInteractionComponent) {
      this.GrassInteractionComponent.GetOwner()?.K2_DestroyComponent(this.GrassInteractionComponent);
    }
  }
  GetStatName() {
    return "CharGrassInteraction";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdGrassInteraction;
  }
}
exports.CharGrassInteraction = CharGrassInteraction;
//# sourceMappingURL=CharGrassInteraction.js.map