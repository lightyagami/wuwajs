"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonWorldClickComponent = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class InstanceDungeonWorldClickComponent extends HotKeyComponent_1.HotKeyComponent {
  OnIsOccupancyFightInput() {
    return !UiManager_1.UiManager.IsViewShow("InteractionHintView");
  }
  OnPress(e) {
    if (!UiManager_1.UiManager.IsViewShow("InteractionHintView")) {
      UiNavigationNewController_1.UiNavigationNewController.ClickButton(e.BindButtonTag);
    }
  }
}
exports.InstanceDungeonWorldClickComponent = InstanceDungeonWorldClickComponent;
//# sourceMappingURL=InstanceDungeonWorldClickComponent.js.map