"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseComboPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
class TrapDefenseComboPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.DurationTime = 0;
    this.RemainTime = 0;
    this.AdvancedPerformanceThreshold = 0;
    this.Sequence = undefined;
    this.ComboNumSequence = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.ComboNumSequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(2));
    this.DurationTime = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseComboDuration();
    this.AdvancedPerformanceThreshold = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseComboAdvancedPerformanceThreshold();
  }
  OnBeforeShow() {
    this.Sequence.PlaySequencePurely("Start");
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("Close", e);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
    this.ComboNumSequence.Clear();
  }
  OnCheckBattleChildViewPanelShowCondition() {
    return this.RemainTime > 0;
  }
  OnTickBattleChildViewPanel(e) {
    if (!(this.RemainTime <= 0)) {
      this.RemainTime -= e;
      if (this.RemainTime <= 0) {
        this.HideBattleChildViewPanel();
      }
    }
  }
  RefreshComboNum(e) {
    this.GetArtText(0).SetText(e.toString());
    this.ComboNumSequence.PlaySequencePurely("Up");
    this.GetItem(1).SetUIActive(e >= this.AdvancedPerformanceThreshold);
    this.RemainTime = this.DurationTime * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.ShowBattleChildViewPanel();
  }
  HideComboPanel() {
    if (this.RemainTime > 0) {
      this.RemainTime = 0;
      this.HideBattleChildViewPanel();
    }
  }
}
exports.TrapDefenseComboPanel = TrapDefenseComboPanel;
//# sourceMappingURL=TrapDefenseComboPanel.js.map