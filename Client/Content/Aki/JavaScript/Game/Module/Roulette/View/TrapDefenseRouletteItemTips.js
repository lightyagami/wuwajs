"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRouletteItemTips = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TrapDefenseRouletteItemTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Tips = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  async OnBeforeHideAsync() {
    this.Sequence.StopSequenceByKey("UiIn", false, true);
    var e = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("UiOut", e);
  }
  OnDestroy() {
    this.Sequence.Clear();
  }
  RefreshTips(e) {
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
      this.SetActive(true);
      if (this.Tips) {
        this.Sequence.PlaySequencePurely("UiSwitch");
      } else {
        this.Sequence.PlaySequencePurely("UiIn");
      }
    } else {
      this.SetActive(false);
    }
    this.Tips = e;
  }
}
exports.TrapDefenseRouletteItemTips = TrapDefenseRouletteItemTips;
//# sourceMappingURL=TrapDefenseRouletteItemTips.js.map