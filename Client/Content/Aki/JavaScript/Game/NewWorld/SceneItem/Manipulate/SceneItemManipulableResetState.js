"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableResetState = undefined;
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableResetState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  OnEnter() {
    super.OnEnter();
    this.SceneItem.TryAddTagById(-293539602);
    if (!FNameUtil_1.FNameUtil.IsNothing(this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设)) {
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设);
    }
    this.OpenPhysicsSplit();
    this.PropComp.IsMoving = false;
    if (this.SceneItem.FinishCheckInitAttach && this.SceneItem.EnableDynamicAttach) {
      this.SceneItem.TryReqAttachToFloor();
    }
  }
  OnExit() {
    super.OnExit();
    this.SceneItem.TryRemoveTagById(-293539602);
    this.ClosePhysicsSplit();
    this.PropComp.IsMoving = true;
  }
}
exports.SceneItemManipulableResetState = SceneItemManipulableResetState;
//# sourceMappingURL=SceneItemManipulableResetState.js.map