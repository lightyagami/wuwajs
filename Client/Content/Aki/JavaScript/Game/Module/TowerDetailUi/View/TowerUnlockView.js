"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerUnlockView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerData_1 = require("../TowerData");
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
    var e = this.OpenParam;
    if (e === TowerData_1.OVERLOCK_RISK_DIFFICULTY) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "PrefabTextItem_2260577568_Text");
    } else {
      e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(e);
      this.GetText(1)?.SetText(e);
    }
  }
  OnAfterPlayStartSequence() {
    this.mRo = true;
  }
}
exports.TowerUnlockView = TowerUnlockView;
//# sourceMappingURL=TowerUnlockView.js.map