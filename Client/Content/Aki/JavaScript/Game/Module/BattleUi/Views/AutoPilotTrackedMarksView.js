"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotTrackedMarksView = undefined;
const AutoPilotTrackMark_1 = require("./AutoPilotTrackMark");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
class AutoPilotTrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.N6m = undefined;
  }
  Initialize(t) {
    super.Initialize(t);
    this.N6m = new AutoPilotTrackMark_1.AutoPilotTrackMark();
    this.N6m.Initialize(this.RootItem);
  }
  Reset() {
    super.Reset();
    this.N6m?.Destroy();
    this.N6m = undefined;
  }
  OnShowBattleChildViewPanel() {
    this.N6m?.OnUiShow();
  }
  Update(t) {
    this.N6m?.Update(t);
  }
  OnHideBattleChildViewPanel() {
    this.N6m?.OnUiHide();
  }
  DestroyOverride() {
    return true;
  }
}
exports.AutoPilotTrackedMarksView = AutoPilotTrackedMarksView;
//# sourceMappingURL=AutoPilotTrackedMarksView.js.map