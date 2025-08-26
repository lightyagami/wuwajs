"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMissionPanel = undefined;
const UE = require("ue");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const MissionPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/MissionPanel");
class TrapDefenseMissionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.MissionPanel = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async InitializeAsync() {
    this.MissionPanel = new MissionPanel_1.MissionPanel();
    this.MissionPanel.OpenParam = 5;
    await this.MissionPanel.CreateThenShowByResourceIdAsync("UiItem_Mission", this.GetItem(0));
  }
  OnShowBattleChildViewPanel() {
    this.MissionPanel.ShowBattleChildViewPanel();
  }
  OnHideBattleChildViewPanel() {
    this.MissionPanel.HideBattleChildViewPanel();
  }
  OnTickBattleChildViewPanel(e) {
    this.MissionPanel.OnTickBattleChildViewPanel(e);
  }
  Reset() {
    this.MissionPanel.Reset();
  }
}
exports.TrapDefenseMissionPanel = TrapDefenseMissionPanel;
//# sourceMappingURL=TrapDefenseMissionPanel.js.map