"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPackageDownLoadVersionTipsView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BG_ITEM_OFFSETX = 45;
const BG_ITEM_OFFSETZ = 20;
class SubPackageDownLoadVersionTipsView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fRm = new UE.VectorDouble();
    this.aRo = () => {
      this.SetUiActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.aRo]];
  }
  RefreshItem(e, i) {
    e = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadVersionByVersion(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.HelpTitle);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.HelpDesc);
      this.fRm.X = i.X + BG_ITEM_OFFSETX;
      this.fRm.Z = i.Z + BG_ITEM_OFFSETZ;
      this.GetItem(1).D_K2_SetWorldLocation(this.fRm, false, undefined, false);
    }
  }
}
exports.SubPackageDownLoadVersionTipsView = SubPackageDownLoadVersionTipsView;
//# sourceMappingURL=SubPackageDownLoadVersionTipsView.js.map