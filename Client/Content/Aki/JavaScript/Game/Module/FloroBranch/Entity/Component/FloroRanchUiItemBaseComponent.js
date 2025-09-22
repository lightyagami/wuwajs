"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiItemBaseComponent = undefined;
const FloroRanchEntityComponentBase_1 = require("./FloroRanchEntityComponentBase");
class FloroRanchUiItemBaseComponent extends FloroRanchEntityComponentBase_1.FloroRanchEntityComponentBase {
  constructor() {
    super(...arguments);
    this.Tdd = false;
  }
  async ShowUiItem() {}
  async HideUiItem() {}
  Pause() {}
  Resume() {}
  Exit() {}
  OnExit() {
    this.Tdd = true;
  }
  CheckIsExit() {
    return this.Tdd;
  }
  async MoveToTarget(n) {}
  async MoveToOriginalPosition() {}
  async PlayEatAnim() {}
  async PlayBeEatAnim() {}
  async PlaySacrificeAnim() {}
  async PlayFusionHideAnim() {}
  async PlayFusionShowAnim() {}
  async PlayEvolveUpAnim() {}
  async PlaySkillAnim() {}
  PlayVideo() {}
}
exports.FloroRanchUiItemBaseComponent = FloroRanchUiItemBaseComponent;
//# sourceMappingURL=FloroRanchUiItemBaseComponent.js.map