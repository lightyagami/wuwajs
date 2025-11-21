"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTopButtonPanel = undefined;
const UE = require("ue");
const BattleEntranceButton_1 = require("../BattleChildView/BattleEntranceButton");
class CommonTopButtonPanel extends BattleEntranceButton_1.BattleEntranceButton {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UISprite]];
    this.BtnBindInfo = [[0, this.OnClickedOnlineButton]];
  }
  Initialize(t) {
    if (t) {
      if (t.IconPath) {
        this.SetSpriteByPath(t.IconPath, this.GetSprite(2), false);
      }
      super.Initialize(t);
    }
  }
}
exports.CommonTopButtonPanel = CommonTopButtonPanel;
//# sourceMappingURL=CommonTopButtonPanel.js.map