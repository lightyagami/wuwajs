"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueQuicklyMoveComponent = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const HotKeyComponent_1 = require("./HotKeyComponent");
class MapRogueQuicklyMoveComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    ModelManager_1.ModelManager.MapRogueModel.GameInfo?.OnMove();
  }
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, true);
  }
}
exports.MapRogueQuicklyMoveComponent = MapRogueQuicklyMoveComponent;
//# sourceMappingURL=MapRogueQuicklyMoveComponent.js.map