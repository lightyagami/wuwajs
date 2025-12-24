"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsWeaponAttributeView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SurvivorsWeaponAttributeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.XJd = undefined;
    this.mvt = () => new SurvivorsWeaponAttributeItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem]];
  }
  OnStart() {
    var i = this.OpenParam;
    if (i) {
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.lqe.SetHelpBtnActive(false);
      this.XJd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.mvt);
      this.XJd.RefreshByData(i.GetWeaponSpecialAttributeList());
    }
  }
}
exports.SurvivorsWeaponAttributeView = SurvivorsWeaponAttributeView;
class SurvivorsWeaponAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem]];
  }
  Refresh(i, e, t) {
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponLv(i.WeaponLvId);
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(i.AttrId);
    if (i && r) {
      this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(0));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r.Describe);
      this.GetItem(2).SetUIActive(t % 2 == 0);
    }
  }
}
//# sourceMappingURL=SurvivorsWeaponAttributeView.js.map