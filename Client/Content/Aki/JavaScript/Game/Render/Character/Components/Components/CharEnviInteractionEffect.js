"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharEnviInteractionEffect = undefined;
const UE = require("ue");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharEnviInteractionEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.EnviInteractionComponent = undefined;
  }
  Start() {
    var e;
    if (!this.EnviInteractionComponent) {
      e = this.GetRenderingComponent().GetOwner();
      this.EnviInteractionComponent = e.AddComponentByClass(UE.KuroEnviInteractionComponent.StaticClass(), false, new UE.Transform(), false);
    }
    if (this.EnviInteractionComponent) {
      this.EnviInteractionComponent.bCalEnviInteractionData = true;
      this.EnviInteractionComponent.RegisterComponentToSystem();
      this.EnviInteractionComponent.bUpdateWaterEID = false;
      this.EnviInteractionComponent.RayToOffset.Z = -3000;
    }
    this.OnInitSuccess();
  }
  Destroy() {
    if (this.EnviInteractionComponent) {
      this.EnviInteractionComponent.GetOwner()?.K2_DestroyComponent(this.EnviInteractionComponent);
    }
  }
  GetStatName() {
    return "CharEnviInteractionEffect";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdEnviInteractionEffect;
  }
}
exports.CharEnviInteractionEffect = CharEnviInteractionEffect;
//# sourceMappingURL=CharEnviInteractionEffect.js.map