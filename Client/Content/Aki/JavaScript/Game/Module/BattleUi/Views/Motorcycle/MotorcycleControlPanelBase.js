"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleControlPanelBase = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
class MotorcycleControlPanelBase extends BattleVisibleChildView_1.BattleVisibleChildView {
  Tick(e) {}
  async Init(e, t) {
    await this.CreateByResourceIdAsync(t, e);
    this.Initialize();
    await this.InitializeAsync();
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
      this.ShowBattleVisibleChildView();
    }
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.Reset();
  }
}
exports.MotorcycleControlPanelBase = MotorcycleControlPanelBase;
//# sourceMappingURL=MotorcycleControlPanelBase.js.map