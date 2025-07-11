"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharSceneInteraction = undefined;
const RenderConfig_1 = require("../../../Config/RenderConfig");
const SceneCharacterInteraction_1 = require("../../../Scene/Interaction/SceneCharacterInteraction");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharSceneInteraction extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.OwnerCharacter = undefined;
    this.CharacterInteraction = undefined;
  }
  Start() {
    super.Start();
    this.OwnerCharacter = this.RenderComponent.GetOwner();
    this.CharacterInteraction = undefined;
    this.PossCharacter(this.RenderComponent.InteractionConfig);
    this.OnInitSuccess();
  }
  Update() {
    if (this.CharacterInteraction) {
      this.CharacterInteraction.Update(this.GetDeltaTime());
    }
  }
  Destroy() {
    this.UnpossCharacter();
    super.Destroy();
  }
  GetIsPossed() {
    return this.CharacterInteraction !== undefined;
  }
  PossCharacter(e, t = 1) {
    if (e && this.OwnerCharacter) {
      this.CharacterInteraction = new SceneCharacterInteraction_1.default();
      this.CharacterInteraction.Start(this.OwnerCharacter, e, t);
    }
  }
  UnpossCharacter() {
    if (this.CharacterInteraction) {
      this.CharacterInteraction.Destroy();
      this.CharacterInteraction = undefined;
    }
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdSceneInteraction;
  }
  GetStatName() {
    return "CharSceneInteraction";
  }
  GetInWater(e) {
    return !!this.CharacterInteraction && this.CharacterInteraction.GetInWater() && this.CharacterInteraction.GetWaterDepth() > e;
  }
}
exports.CharSceneInteraction = CharSceneInteraction;
//# sourceMappingURL=CharSceneInteraction.js.map