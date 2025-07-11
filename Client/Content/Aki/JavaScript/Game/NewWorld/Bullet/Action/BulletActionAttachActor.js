"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionAttachActor = undefined;
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAttachActor extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var t = this.ActionInfo;
    if (t.IsParentActor) {
      this.BulletInfo.Actor.K2_AttachToActor(t.Actor, t.SocketName, t.LocationRule, t.RotationRule, t.ScaleRule, t.WeldSimulatedBodies);
      this.BulletInfo.ActorComponent.NeedDetach = true;
      if (t.AttachLocationOffset) {
        this.BulletInfo.Actor.D_K2_SetActorRelativeLocation(t.AttachLocationOffset, true, undefined, true);
      }
    } else {
      t.Actor.K2_AttachToActor(this.BulletInfo.Actor, t.SocketName, t.LocationRule, t.RotationRule, t.ScaleRule, t.WeldSimulatedBodies);
      this.BulletInfo.ActorComponent.ChildrenAttached.push(t.Actor);
      if (t.AttachLocationOffset) {
        t.Actor.D_K2_SetActorRelativeLocation(t.AttachLocationOffset, true, undefined, true);
      }
    }
  }
}
exports.BulletActionAttachActor = BulletActionAttachActor;
//# sourceMappingURL=BulletActionAttachActor.js.map