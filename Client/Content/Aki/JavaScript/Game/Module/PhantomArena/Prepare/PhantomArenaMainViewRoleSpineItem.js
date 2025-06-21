"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaMainViewRoleSpineItem = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PhantomArenaMainViewRoleSpineItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent],
      [1, UE.SpineSkeletonAnimationComponent]
    ]
  }
  OnStart() {
    this.GetSpine(0).SetAnimation(0, "idle", !0), this.GetSpine(1).SetAnimation(0, "idle", !0)
  }
}
exports.PhantomArenaMainViewRoleSpineItem = PhantomArenaMainViewRoleSpineItem;
//# sourceMappingURL=PhantomArenaMainViewRoleSpineItem.js.map