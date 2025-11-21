"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponDevItem = undefined;
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
const RoleDevDetailItem_1 = require("../Item/RoleDevDetailItem");
class RoleDevWeaponDevItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.sft = undefined;
    this.pnd = undefined;
    this.dFe = undefined;
    this.Pe = undefined;
    this.Gdm = undefined;
    this.Fdm = undefined;
    this.OnClickBtnSwitch = undefined;
    this.vnd = () => new RoleDevDetailItem_1.RoleDevDetailItem();
    this.uko = () => {
      var t;
      var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.dFe);
      if (e) {
        t = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(e.GetRoleId());
        e = {
          WeaponIncId: e.GetIncId(),
          WeaponSkinId: t,
          IsFromRoleRootView: false
        };
        UiManager_1.UiManager.OpenView("WeaponRootView", e);
      }
    };
    this.oad = () => {
      if (this.OnClickBtnSwitch) {
        this.OnClickBtnSwitch();
      }
    };
    this.dSd = () => {
      var t = this.Pe.WeaponLevel === this.Pe.WeaponGoalUpgradeLevel && !this.Pe.WeaponIsMaxLevel || this.Pe.WeaponIsMaxLevel;
      ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.dFe, 2, t ? 15 : 11);
      this.uko();
    };
    this.y8i = () => {
      UiManager_1.UiManager.OpenView("GachaMainView", this.Pe.GachaId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIItem]];
    this.BtnBindInfo = [[1, this.oad], [11, this.y8i]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(4).GetOwner());
    this.sft.SetExtendToggleEnable(false);
    this.sft.SetToggleInteractive(false);
    this.pnd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.vnd);
    this.Gdm = new ButtonItem_1.ButtonItem();
    t.push(this.Gdm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Gdm.SetFunction(this.dSd);
    this.Fdm = new ButtonItem_1.ButtonItem();
    t.push(this.Fdm.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.Fdm.SetFunction(this.dSd);
    await Promise.all(t);
  }
  Refresh(t) {
    this.Pe = t;
    this.dFe = t.RoleId;
    this.RefreshWeaponViewItem(t);
  }
  RefreshWeaponViewItem(t) {
    this.QXd(t);
    this.mSd(t);
    this.pnd.RefreshByData(t.DetailItems);
  }
  QXd(t) {
    switch (t.RoleType) {
      case 0:
        this.KXd(t);
        break;
      case 1:
        this.XXd(t);
        break;
      case 2:
        this.YXd(t);
    }
  }
  XXd(t) {
    this.GetItem(12).SetUIActive(false);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(t.RoleId);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e.WeaponType);
    this.zXd(e.WeaponTypeIcon, e.WeaponTypeDescribe);
    this.JXd(t);
  }
  KXd(t) {
    this.GetItem(12).SetUIActive(true);
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(t.WeaponConfigId);
    this.ZXd(e, t);
    this.eYd(t.WeaponName);
    this.tYd(t);
  }
  YXd(t) {
    this.GetItem(12).SetUIActive(false);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(t.RoleId);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e.WeaponType);
    this.zXd(e.WeaponTypeIcon, e.WeaponTypeDescribe);
    this.JXd(t);
  }
  zXd(t, e) {
    this.sft.SetIconByPath(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
    this.sft.SetBottomTextVisible(false);
    this.sft.SetQuality();
  }
  JXd(t) {
    t = t.RoleType === 2;
    this.GetButton(11).RootUIComp.SetUIActive(false);
    this.GetItem(0).SetUIActive(!t);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
  }
  ZXd(t, e) {
    t = {
      Type: 4,
      ItemConfigId: t.ItemId,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [e.WeaponLevel],
      Data: e
    };
    this.sft.Apply(t);
  }
  eYd(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t);
  }
  tYd(t) {
    this.GetButton(11).RootUIComp.SetUIActive(t.IsCall);
    this.fSd(t);
    t = t.IsHighQuality;
    this.GetItem(0).SetUIActive(t);
  }
  mSd(t) {
    var e = this.GetText(6);
    if (t.WeaponLevel !== t.WeaponGoalUpgradeLevel || t.WeaponIsMaxLevel) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RoleProject_TargetLevel", [t.WeaponGoalUpgradeLevel]);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RoleProject_Tips04");
    }
    e.SetUIActive(!t.WeaponIsMaxLevel);
  }
  fSd(t) {
    var e = t.WeaponLevel === t.WeaponGoalUpgradeLevel && !t.WeaponIsMaxLevel || t.WeaponIsMaxLevel;
    var i = e ? "RoleProject_Button02" : "RoleProject_Button01";
    this.Gdm?.SetLocalTextNew(i);
    this.Fdm?.SetLocalTextNew(i);
    if (e) {
      this.Gdm?.SetUiActive(true);
      this.Fdm?.SetUiActive(false);
    } else {
      this.Gdm?.SetUiActive(!t.IsAllMaterialEnough);
      this.Fdm?.SetUiActive(t.IsAllMaterialEnough);
    }
    this.Gdm?.SetFunction(this.dSd);
    this.Fdm?.SetFunction(this.dSd);
  }
}
exports.RoleDevWeaponDevItem = RoleDevWeaponDevItem;
//# sourceMappingURL=RoleDevWeaponDevItem.js.map