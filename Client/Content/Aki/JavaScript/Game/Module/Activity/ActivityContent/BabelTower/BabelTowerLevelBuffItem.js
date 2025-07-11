"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerLevelBuffItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerLevelBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eHr = 0;
    this.OnClickBtnCallBack = undefined;
    this.nqe = () => {
      this.OnClickBtnCallBack?.(this.eHr);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  OnStart() {
    this.GetItem(8).SetUIActive(false);
  }
  RefreshItem(e, i) {
    this.eHr = i;
    this.GetItem(1).SetUIActive(e || !i);
    this.GetItem(2).SetUIActive(!e && i !== 0);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "BabelBuffDisableTips");
      this.GetButton(0).SetSelfInteractive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "BabelBuffSelectTips");
      if (i) {
        e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerBuff(i);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.NameText);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.DesText);
        this.SetTextureByPath(e.Texture, this.GetTexture(4));
      }
    }
  }
}
exports.BabelTowerLevelBuffItem = BabelTowerLevelBuffItem;
//# sourceMappingURL=BabelTowerLevelBuffItem.js.map