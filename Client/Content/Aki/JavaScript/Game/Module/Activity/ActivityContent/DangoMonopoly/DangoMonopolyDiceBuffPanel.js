"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyDiceBuffPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class DangoMonopolyDiceBuffPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Promise = undefined;
  }
  async Init(e) {
    await this.CreateByResourceIdAsync("UiItem_DiceNum", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  UpdateShowType(e) {
    this.SetActive(true);
    var s = this.GetExtendToggle(0);
    if (e === 0) {
      s.SetToggleStateForce(0);
    } else {
      s.SetToggleStateForce(1);
    }
  }
  async PlaySequence(e) {
    await this.Promise?.Promise;
    this.Promise = new CustomPromise_1.CustomPromise();
    await this.Sequence?.PlaySequenceAsync(e, this.Promise);
    this.Promise = undefined;
  }
}
exports.DangoMonopolyDiceBuffPanel = DangoMonopolyDiceBuffPanel;
//# sourceMappingURL=DangoMonopolyDiceBuffPanel.js.map