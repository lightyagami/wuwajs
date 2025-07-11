"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerUnlockView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class TowerUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.mRo = false;
    this.Vgt = () => {
      if (this.mRo) {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Vgt]];
  }
  OnStart() {
    var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(this.OpenParam);
    this.GetText(1)?.SetText(e);
  }
  OnAfterPlayStartSequence() {
    this.mRo = true;
  }
}
exports.TowerUnlockView = TowerUnlockView;
//# sourceMappingURL=TowerUnlockView.js.map