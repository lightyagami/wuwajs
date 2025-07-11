"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableMatchJigsawBaseState = undefined;
const SceneItemManipulableMatchOutletState_1 = require("./SceneItemManipulableMatchOutletState");
class SceneItemManipulableMatchJigsawBaseState extends SceneItemManipulableMatchOutletState_1.SceneItemManipulableMatchOutletState {
  OnEnter() {
    this.SceneItem.TryAddTagById(this.Ssr() ? 741712776 : 1488947861);
    this.SceneItem.IsCanBeHeld = true;
    this.OpenPhysicsSplit();
  }
  OnExit() {
    this.SceneItem.TryRemoveTagById(741712776);
    this.SceneItem.TryRemoveTagById(1488947861);
    this.ClosePhysicsSplit();
  }
  Ssr() {
    return this.SceneItem.ActivatedOutlet.GetIsCorrect(this.SceneItem.Entity, this.SceneItem.PutIndex);
  }
}
exports.SceneItemManipulableMatchJigsawBaseState = SceneItemManipulableMatchJigsawBaseState;
//# sourceMappingURL=SceneItemManipulableMatchJigsawBaseState.js.map