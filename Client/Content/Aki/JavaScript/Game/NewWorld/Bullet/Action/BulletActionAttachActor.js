"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionAttachActor = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const BulletConstant_1 = require("../BulletConstant");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAttachActor extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var t = this.ActionInfo;
    if (t.IsParentActor) {
      this.BulletInfo.Actor.K2_AttachToActor(t.Actor, t.SocketName, t.LocationRule, t.RotationRule, t.ScaleRule, t.WeldSimulatedBodies);
      this.BulletInfo.ActorComponent.NeedDetach = true;
      this.BulletInfo.ActorComponent.NeedDetachForBaseMovement = false;
      if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Bullet", 20, "BulletActionAttachActor", ["Bullet", this.BulletInfo.BulletRowName], ["Actor", t.Actor?.GetName()], ["NeedDetach", this.BulletInfo.ActorComponent.NeedDetach]);
      }
      if (t.RelativeLocation) {
        this.BulletInfo.Actor.D_K2_SetActorRelativeLocation(t.RelativeLocation, true, undefined, true);
      }
      if (t.RelativeRotation) {
        this.BulletInfo.Actor.K2_SetActorRelativeRotation(t.RelativeRotation, true, undefined, true);
      }
    } else {
      t.Actor.K2_AttachToActor(this.BulletInfo.Actor, t.SocketName, t.LocationRule, t.RotationRule, t.ScaleRule, t.WeldSimulatedBodies);
      this.BulletInfo.ActorComponent.ChildrenAttached.push(t.Actor);
      if (t.RelativeLocation) {
        t.Actor.D_K2_SetActorRelativeLocation(t.RelativeLocation, true, undefined, true);
      }
      if (t.RelativeRotation) {
        t.Actor.K2_SetActorRelativeRotation(t.RelativeRotation, true, undefined, true);
      }
    }
  }
}
exports.BulletActionAttachActor = BulletActionAttachActor;
//# sourceMappingURL=BulletActionAttachActor.js.map