"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridRoleRightBottomTag = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridRoleRightBottomTag extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetResourceId() {
    return "UiItem_ItemTeanTag";
  }
  OnRefresh(e) {
    this.GetItem(0).SetUIActive(e.IsRecommendRole);
    this.GetItem(1).SetUIActive(e.IsTrialRole);
    this.SetActive(e.IsRecommendRole || e.IsTrialRole);
  }
}
exports.MediumItemGridRoleRightBottomTag = MediumItemGridRoleRightBottomTag;
//# sourceMappingURL=MediumItemGridRoleRightBottomTag.js.map