"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponRecommendItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDevRecommendItem_1 = require("./RoleDevRecommendItem");
class RoleDevWeaponRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.sft = undefined;
    this.nhd = undefined;
    this.T1d = undefined;
    this.b1d = undefined;
    this.OnClickBtnSwitch = undefined;
    this.Pe = undefined;
    this.ahd = () => {
      return new RoleDevRecommendItem_1.RoleDevRecommendItem();
    };
    this.Qad = () => {
      if (this.OnClickBtnSwitch) {
        this.OnClickBtnSwitch();
      }
    };
    this.IOe = () => {
      var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.Pe.RoleId).GetIncId();
      RoleDevUtils_1.RoleDevUtils.OpenWeaponReplaceView(this.Pe.RoleId, t);
      ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 2, 6);
    };
    this.y8i = () => {
      UiManager_1.UiManager.OpenView("GachaMainView", this.Pe.GachaId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Qad], [12, this.y8i]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(3).GetOwner());
    this.sft.SetExtendToggleEnable(false);
    this.sft.SetToggleInteractive(false);
    this.nhd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.ahd);
    this.T1d = new ButtonItem_1.ButtonItem();
    t.push(this.T1d.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.T1d.SetFunction(this.IOe);
    this.T1d.SetLocalTextNew("RoleProject_Button04");
    this.b1d = new ButtonItem_1.ButtonItem();
    t.push(this.b1d.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.b1d.SetFunction(this.IOe);
    this.b1d.SetLocalTextNew("RoleProject_Button04");
    await Promise.all(t);
  }
  Refresh(t) {
    this.Pe = t;
    this.zkd(t);
    this.RefreshWeaponViewItem(t);
    this.nhd.RefreshByData(t.SubRecommendItems);
  }
  zkd(t) {
    t = !t.IsRoleObtained || t.IsWeaponHighQuality;
    this.GetItem(11).SetUIActive(t);
  }
  RefreshWeaponViewItem(t) {
    var e;
    if (t.IsRoleObtained) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.WeaponName);
      if (t.IsWeaponHighQuality) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "RoleProject_Tips01");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "RoleProject_Tips08");
      }
      e = {
        Type: 4,
        ItemConfigId: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(t.WeaponConfigId).ItemId,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [t.WeaponLevel],
        Data: t
      };
      this.sft.Apply(e);
      this.GetItem(6).SetUIActive(true);
      this.GetButton(12).RootUIComp.SetUIActive(t.IsCall);
    } else {
      e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(t.RoleId);
      t = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e.WeaponType);
      this.sft.SetIconByPath(t.WeaponTypeIcon);
      this.sft.SetBottomTextVisible(false);
      this.sft.SetQuality();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.WeaponTypeDescribe);
      this.GetText(5)?.SetUIActive(false);
      this.GetItem(6).SetUIActive(false);
      this.GetButton(12).RootUIComp.SetUIActive(false);
    }
    this.T1d.SetUiActive(true);
    this.b1d.SetUiActive(false);
  }
  SetSwitchBtnVisible(t) {
    this.GetItem(11)?.SetUIActive(t);
  }
}
exports.RoleDevWeaponRecommendItem = RoleDevWeaponRecommendItem;
//# sourceMappingURL=RoleDevWeaponRecommendItem.js.map