"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMachineTipsPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseMachineTipsPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Data = undefined;
    this.IsMobileRouletteVisible = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  InitializeTemp() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  OnBeforeShow() {
    this.Sequence.PlaySequencePurely("Start");
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("Close", e);
  }
  OnCheckBattleChildViewPanelShowCondition() {
    return this.Xud;
  }
  Yud() {
    if (this.Xud) {
      this.ShowBattleChildViewPanel();
    } else {
      this.HideBattleChildViewPanel();
    }
  }
  SetMachineItem(e) {
    var i;
    var t;
    if (e !== this.Data) {
      if (e?.IsBuilding && ([i, t] = e.GetDesc(), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.GetName()), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i, ...t), this.Data?.IsBuilding)) {
        this.Sequence.PlaySequencePurely("Switch");
      }
      this.Data = e;
      this.Yud();
    }
  }
  RefreshMachineStateByRoulette(e) {
    this.IsMobileRouletteVisible = e;
    this.Yud();
  }
  get Xud() {
    return !this.IsMobileRouletteVisible && (this.Data?.IsBuilding ?? false);
  }
}
exports.TrapDefenseMachineTipsPanel = TrapDefenseMachineTipsPanel;
//# sourceMappingURL=TrapDefenseMachineTipsPanel.js.map