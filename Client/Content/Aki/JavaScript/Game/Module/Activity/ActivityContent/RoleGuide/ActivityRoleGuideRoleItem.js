"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleGuideRoleItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityRoleGuideRoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent]];
  }
  OnBeforeShow() {
    this.GetSpine(0)?.SetAnimation(0, "idle", true);
  }
}
exports.ActivityRoleGuideRoleItem = ActivityRoleGuideRoleItem;
//# sourceMappingURL=ActivityRoleGuideRoleItem.js.map