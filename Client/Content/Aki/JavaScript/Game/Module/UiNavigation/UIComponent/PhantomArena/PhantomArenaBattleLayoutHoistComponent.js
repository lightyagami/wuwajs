"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleLayoutHoistComponent = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomArenaBattleComponentBase_1 = require("./PhantomArenaBattleComponentBase");
class PhantomArenaBattleLayoutHoistComponent extends PhantomArenaBattleComponentBase_1.PhantomArenaBattleComponentBase {
  OnPress() {
    if (this.Proxy) {
      this.Proxy.GamepadLogic.SwitchCardLayoutHoist();
      ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
    }
  }
  OnRefreshSelfHotKeyStateIsMainInVisible() {
    this.SetVisibleMode(2, true);
  }
}
exports.PhantomArenaBattleLayoutHoistComponent = PhantomArenaBattleLayoutHoistComponent;
//# sourceMappingURL=PhantomArenaBattleLayoutHoistComponent.js.map