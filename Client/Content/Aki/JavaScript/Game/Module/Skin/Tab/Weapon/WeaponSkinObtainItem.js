"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkinObtainItem = undefined;
const UE = require("ue");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class WeaponSkinObtainItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.eTt = () => {
      if (this.Pe.Type === 2) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.Id, this.Pe.ConfigId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  Refresh(i, t, s) {
    this.Pe = i;
    i = this.Pe.Type === 2;
    this.GetItem(1)?.SetUIActive(i);
    this.GetItem(2)?.SetUIActive(!i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.Text);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.Pe.Text);
  }
}
exports.WeaponSkinObtainItem = WeaponSkinObtainItem;
//# sourceMappingURL=WeaponSkinObtainItem.js.map