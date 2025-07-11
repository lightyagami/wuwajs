"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMainViewRoleSpineItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PhantomArenaMainViewRoleSpineItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent], [1, UE.SpineSkeletonAnimationComponent]];
  }
  OnStart() {
    this.GetSpine(0).SetAnimation(0, "idle", true);
    this.GetSpine(1).SetAnimation(0, "idle", true);
  }
}
exports.PhantomArenaMainViewRoleSpineItem = PhantomArenaMainViewRoleSpineItem;
//# sourceMappingURL=PhantomArenaMainViewRoleSpineItem.js.map