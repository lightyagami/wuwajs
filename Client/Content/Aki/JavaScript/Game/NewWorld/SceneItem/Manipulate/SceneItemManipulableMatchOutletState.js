"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableMatchOutletState = undefined;
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const SceneItemDynamicAttachTargetComponent_1 = require("../Common/Component/SceneItemDynamicAttachTargetComponent");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableMatchOutletState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  OnEnter() {
    this.SceneItem.ClearCastDestroyTimer();
    this.SceneItem.TryAddTagById(1370513573);
    if (!FNameUtil_1.FNameUtil.IsNothing(this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设)) {
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设);
    }
    this.SceneItem.IsCanBeHeld = true;
    this.OpenPhysicsSplit();
    this.PropComp.IsMoving = false;
    this.ysr();
  }
  OnExit() {
    this.SceneItem.TryRemoveTagById(1370513573);
    this.ClosePhysicsSplit();
    this.PropComp.IsMoving = true;
    this.Isr();
  }
  ysr() {
    var t;
    var e;
    var a;
    var i = this.SceneItem.Entity.GetComponent(125);
    var s = this.SceneItem.ActivatedOutlet;
    if (i && s?.GetIsNeedAttach()) {
      t = s.GetSocketLocationOffset(this.SceneItem.Entity);
      e = s.GetMatchSequenceOffset(this.SceneItem.Entity);
      (a = new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType = 2;
      a.PosAttachOffset = t.Addition(e, Vector_1.Vector.Create());
      a.PosAbsolute = false;
      a.RotAttachType = 2;
      a.RotAttachOffset = s.GetSocketRotatorOffset(this.SceneItem.Entity);
      a.RotAbsolute = false;
      i.RegEntityTarget(s.Entity.GetComponent(0).GetPbDataId(), s.GetSocketName(this.SceneItem.Entity), a, "[MatchOutletState] TryAttachToOutlet");
    }
  }
  Isr() {
    var t = this.SceneItem.Entity.GetComponent(125);
    if (t) {
      t.UnRegTarget("[MatchOutletState] TryDetachFromOutlet");
    }
  }
}
exports.SceneItemManipulableMatchOutletState = SceneItemManipulableMatchOutletState;
//# sourceMappingURL=SceneItemManipulableMatchOutletState.js.map