"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalStepSubEndingItem = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class CiacconaGalStepSubEndingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Hea = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  PlayStart() {
    this.Hea?.PlayLevelSequenceByName("Start")
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Desc)
  }
}
exports.CiacconaGalStepSubEndingItem = CiacconaGalStepSubEndingItem;
//# sourceMappingURL=CiacconaGalStepSubEndingItem.js.map