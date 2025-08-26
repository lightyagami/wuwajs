"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelWavePanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TrapDefenseLevelWavePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelData = undefined;
  }
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIArtText]];
  }
  UpdateData(e) {
    var s;
    this.SetActive(e.IsEndless);
    if ((this.LevelData = e).IsEndless && (s = e.MaxFinishWaveTimes > 0, this.GetItem(0)?.SetUIActive(!s), this.GetItem(1)?.SetUIActive(s), s)) {
      this.GetArtText(2)?.SetText(e.MaxFinishWaveTimes.toString());
    }
  }
}
exports.TrapDefenseLevelWavePanel = TrapDefenseLevelWavePanel;
//# sourceMappingURL=TrapDefenseLevelWavePanel.js.map