"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerResultRoundItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class WheelTowerResultRoundItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ujr = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.ujr = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.ujr?.Clear();
  }
  Refresh(e, t, s) {
    this.SetUiActive(true);
    e = e ? "WheelBattleResult_Endless" : "WheelBattleResult_Normal";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t, s);
    this.ujr?.PlaySequencePurely("Start");
  }
}
exports.WheelTowerResultRoundItem = WheelTowerResultRoundItem;
//# sourceMappingURL=WheelTowerResultRoundItem.js.map