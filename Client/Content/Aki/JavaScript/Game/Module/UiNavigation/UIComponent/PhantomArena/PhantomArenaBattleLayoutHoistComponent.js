"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleLayoutHoistComponent = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  PhantomArenaBattleComponentBase_1 = require("./PhantomArenaBattleComponentBase");
class PhantomArenaBattleLayoutHoistComponent extends PhantomArenaBattleComponentBase_1.PhantomArenaBattleComponentBase {
  OnPress() {
    this.Proxy && (this.Proxy.GamepadLogic.SwitchCardLayoutHoist(), ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove())
  }
  OnRefreshSelfHotKeyStateIsMainInVisible() {
    this.SetVisibleMode(2, !0)
  }
}
exports.PhantomArenaBattleLayoutHoistComponent = PhantomArenaBattleLayoutHoistComponent;
//# sourceMappingURL=PhantomArenaBattleLayoutHoistComponent.js.map