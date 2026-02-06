"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerBuffItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class WheelTowerBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yrf = () => {
      this.Srf();
    };
    this.s8c = () => {
      this.Srf();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.yrf], [1, this.s8c]];
  }
  Refresh(e) {
    var i = e > 0;
    this.GetButton(1)?.RootUIComp.SetUIActive(i);
    this.GetButton(0)?.RootUIComp.SetUIActive(!i);
    if (i) {
      i = ConfigManager_1.ConfigManager.WheelTowerConfig.GetBuffConfigById(e);
      this.GetText(3)?.ShowTextNew(i.Name);
      this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(2));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Desc, ...i.DescParam);
    }
  }
  Srf() {
    UiManager_1.UiManager.OpenView("WheelTowerBuffSelectView");
  }
}
exports.WheelTowerBuffItem = WheelTowerBuffItem;
//# sourceMappingURL=WheelTowerBuffItem.js.map