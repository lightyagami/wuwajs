"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalStepSubEndingItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CiacconaGalStepSubEndingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Hea = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  PlayStart() {
    this.Hea?.PlayLevelSequenceByName("Start");
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Desc);
  }
}
exports.CiacconaGalStepSubEndingItem = CiacconaGalStepSubEndingItem;
//# sourceMappingURL=CiacconaGalStepSubEndingItem.js.map