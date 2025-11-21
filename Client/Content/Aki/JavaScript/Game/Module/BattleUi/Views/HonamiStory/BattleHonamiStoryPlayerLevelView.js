"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleHonamiStoryPlayerLevelView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
class BattleHonamiStoryPlayerLevelView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
    this.$pt = undefined;
  }
  RefreshLevel(e, t, i = false) {
    this.GetText(0).SetText(t.toString());
    if (!i && e !== t && this.$pt) {
      this.$pt.StopPrevSequence(false, true);
      this.$pt.PlaySequencePurely(t < e ? "Down" : "Upd");
    }
  }
}
exports.BattleHonamiStoryPlayerLevelView = BattleHonamiStoryPlayerLevelView;
//# sourceMappingURL=BattleHonamiStoryPlayerLevelView.js.map