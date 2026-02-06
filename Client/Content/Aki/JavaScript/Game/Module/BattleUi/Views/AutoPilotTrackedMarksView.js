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
    this.j7m = undefined;
  }
  Initialize(t) {
    super.Initialize(t);
    this.j7m = new AutoPilotTrackMark_1.AutoPilotTrackMark();
    this.j7m.Initialize(this.RootItem);
  }
  Reset() {
    super.Reset();
    this.j7m?.Destroy();
    this.j7m = undefined;
  }
  OnShowBattleChildViewPanel() {
    this.j7m?.OnUiShow();
  }
  Update(t) {
    this.j7m?.Update(t);
  }
  OnHideBattleChildViewPanel() {
    this.j7m?.OnUiHide();
  }
  DestroyOverride() {
    return true;
  }
}
exports.AutoPilotTrackedMarksView = AutoPilotTrackedMarksView;
//# sourceMappingURL=AutoPilotTrackedMarksView.js.map