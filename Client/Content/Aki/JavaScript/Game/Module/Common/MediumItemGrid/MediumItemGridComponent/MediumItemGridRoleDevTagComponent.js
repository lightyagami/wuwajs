"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridRoleDevTagComponent = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridRoleDevTagComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_RoleDevelopTag";
  }
  OnRefresh(e) {
    var t = e !== undefined;
    this.SetActive(t);
    if (t) {
      if (e === 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RoleProject_Prospect");
      } else if (e === 1) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RoleProject_Review");
      } else if (e === 2) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RoleProject_Popular");
      } else if (e === 3) {
        this.SetActive(false);
      }
    }
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.MediumItemGridRoleDevTagComponent = MediumItemGridRoleDevTagComponent;
//# sourceMappingURL=MediumItemGridRoleDevTagComponent.js.map