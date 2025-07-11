"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingFullTipItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class FishingFullTipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetTxtInfo(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, i);
  }
  PlayTipSequence(e, i = "Start", t = true) {
    this.SetActive(true);
    this.LevelSequencePlayer.PlaySequenceAsync(i, new CustomPromise_1.CustomPromise(), t).finally(() => {
      this.SetActive(false);
      e?.();
    });
  }
}
exports.FishingFullTipItem = FishingFullTipItem;
//# sourceMappingURL=FishingFullTipItem.js.map