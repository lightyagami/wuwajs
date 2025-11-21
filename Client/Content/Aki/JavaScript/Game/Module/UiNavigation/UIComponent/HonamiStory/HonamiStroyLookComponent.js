"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLookComponent = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ClickBtnInsideReleaseComponent_1 = require("../ClickBtnInsideReleaseComponent");
class HonamiStoryLookComponent extends ClickBtnInsideReleaseComponent_1.ClickBtnInsideReleaseComponent {
  OnRefreshSelfHotKeyState(e) {
    var o = ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic();
    if (o) {
      this.SetVisibleMode(2, !o.GetSelectItem());
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.HonamiStoryLookComponent = HonamiStoryLookComponent;
//# sourceMappingURL=HonamiStroyLookComponent.js.map