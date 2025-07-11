"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiInteractionActorController = undefined;
const Queue_1 = require("../../../Core/Container/Queue");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const AttachToActorController_1 = require("./AttachToActorController");
const MAX_DESTROY_TIME = 3;
class MultiInteractionActorController extends ControllerBase_1.ControllerBase {
  static OnTick() {
    if (!(this.Vfr.Size <= 0)) {
      let t = 0;
      while (t < MAX_DESTROY_TIME) {
        if (this.Vfr.Size <= 0) {
          return;
        }
        this.Vfr.Pop().DestroySelf();
        t++;
      }
    }
  }
  static OnClear() {
    this.Hfr();
    return true;
  }
  static OnLeaveLevel() {
    this.Hfr();
    return true;
  }
  static Hfr() {
    while (this.Vfr.Size > 0) {
      var t = this.Vfr.Pop();
      if (t?.IsValid()) {
        t.DestroySelf();
      }
    }
  }
  static AddWaitDestroyActor(t) {
    this.Vfr.Push(t);
    AttachToActorController_1.AttachToActorController.DetachActor(t, false, "MultiInteractionActorController.AddWaitDestroyActor", 1, 1, 1);
  }
}
(exports.MultiInteractionActorController = MultiInteractionActorController).Vfr = new Queue_1.Queue();
//# sourceMappingURL=MultiInteractionActorController.js.map