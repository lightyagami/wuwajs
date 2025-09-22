"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevTagItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class RoleDevTagItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  SetData(e) {
    let t = "";
    switch (e) {
      case 0:
        t = "RoleProject_Prospect";
        break;
      case 1:
        t = "RoleProject_Review";
        break;
      case 2:
        t = "RoleProject_Popular";
        break;
      default:
        this.SetUiActive(false);
        return;
    }
    this.SetUiActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
  }
}
exports.RoleDevTagItem = RoleDevTagItem;
//# sourceMappingURL=RoleDevTagItem.js.map