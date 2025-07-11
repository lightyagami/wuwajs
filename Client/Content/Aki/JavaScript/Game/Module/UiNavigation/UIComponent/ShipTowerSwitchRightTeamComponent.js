"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerSwitchRightTeamComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiNavigationViewManager_1 = require("../New/UiNavigationViewManager");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ShipTowerSwitchRightTeamComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    var r = this.oZ_();
    if (r) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.InteractClickByListener(r);
    }
  }
  oZ_() {
    var e = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    var r = this.GetBindButtonTag();
    return e.GetActiveListenerListByTag(r)?.find(e => {
      return e.GetSelectableComponent().GetToggleState() !== 1;
    });
  }
  OnRefreshSelfHotKeyState(e) {
    var r = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(r)) {
      r = ModelManager_1.ModelManager.ShipTowerModel.IsShowLeftTeamPanel;
      this.SetVisibleMode(2, r);
    }
  }
}
exports.ShipTowerSwitchRightTeamComponent = ShipTowerSwitchRightTeamComponent;
//# sourceMappingURL=ShipTowerSwitchRightTeamComponent.js.map