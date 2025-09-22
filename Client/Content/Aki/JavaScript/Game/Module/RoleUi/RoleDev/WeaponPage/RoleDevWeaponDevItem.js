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
    this.nhd = undefined;
    this.dFe = undefined;
    this.Pe = undefined;
    this.T1d = undefined;
    this.b1d = undefined;
    this.OnClickBtnSwitch = undefined;
    this.ahd = () => new RoleDevDetailItem_1.RoleDevDetailItem();
    this.uko = () => {
      var t;
      var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.dFe);
      if (e) {
        t = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(e.GetRoleId());
        e = {
          WeaponIncId: e.GetIncId(),
          WeaponSkinId: t,
          IsFromRoleRootView: true
        };
        UiManager_1.UiManager.OpenView("WeaponRootView", e);
      }
    };
    this.Qad = () => {
      if (this.OnClickBtnSwitch) {
        this.OnClickBtnSwitch();
      }
    };
    this.Wpd = () => {
      var t = this.Pe.WeaponLevel === this.Pe.WeaponGoalUpgradeLevel && !this.Pe.WeaponIsMaxLevel || this.Pe.WeaponIsMaxLevel;
      ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.dFe, 2, t ? 15 : 11);
      this.uko();
    };
    this.y8i = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Qad], [11, this.y8i]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(4).GetOwner());
    this.sft.SetExtendToggleEnable(false);
    this.sft.SetToggleInteractive(false);
    this.nhd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.ahd);
    this.T1d = new ButtonItem_1.ButtonItem();
    t.push(this.T1d.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.T1d.SetFunction(this.Wpd);
    this.b1d = new ButtonItem_1.ButtonItem();
    t.push(this.b1d.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.b1d.SetFunction(this.Wpd);
    await Promise.all(t);
  }
  Refresh(t) {
    this.Pe = t;
    this.dFe = t.RoleId;
    this.RefreshWeaponViewItem(t);
  }
  RefreshWeaponViewItem(t) {
    this.L8d(t);
    this.Qpd(t);
    this.nhd.RefreshByData(t.DetailItems);
  }
  L8d(t) {
    switch (t.RoleType) {
      case 0:
        this.P8d(t);
        break;
      case 1:
        this.A8d(t);
        break;
      case 2:
        this.D8d(t);
    }
  }
  A8d(t) {
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(t.RoleId);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e.WeaponType);
    this.U8d(e.WeaponTypeIcon, e.WeaponTypeDescribe);
    this.x8d(t);
  }
  P8d(t) {
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(t.WeaponConfigId);
    this.B8d(e, t);
    this.k8d(t.WeaponName);
    this.O8d(t);
  }
  D8d(t) {
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(t.RoleId);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e.WeaponType);
    this.U8d(e.WeaponTypeIcon, e.WeaponTypeDescribe);
    this.x8d(t);
  }
  U8d(t, e) {
    this.sft.SetIconByPath(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
    this.sft.SetBottomTextVisible(false);
    this.sft.SetQuality();
  }
  x8d(t) {
    t = t.RoleType === 2;
    this.GetItem(11).SetUIActive(false);
    this.GetItem(0).SetUIActive(!t);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
  }
  B8d(t, e) {
    t = {
      Type: 4,
      ItemConfigId: t.ItemId,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [e.WeaponLevel],
      Data: e
    };
    this.sft.Apply(t);
  }
  k8d(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t);
  }
  O8d(t) {
    this.GetItem(11).SetUIActive(t.IsCall);
    this.Kpd(t);
    t = t.IsHighQuality;
    this.GetItem(0).SetUIActive(t);
  }
  Qpd(t) {
    var e = this.GetText(6);
    if (t.WeaponLevel !== t.WeaponGoalUpgradeLevel || t.WeaponIsMaxLevel) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RoleProject_TargetLevel", [t.WeaponGoalUpgradeLevel]);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RoleProject_Tips04");
    }
    e.SetUIActive(true);
  }
  Kpd(t) {
    var e = t.WeaponLevel === t.WeaponGoalUpgradeLevel && !t.WeaponIsMaxLevel || t.WeaponIsMaxLevel;
    var i = e ? "RoleProject_Button02" : "RoleProject_Button01";
    this.T1d?.SetLocalTextNew(i);
    this.b1d?.SetLocalTextNew(i);
    if (e) {
      this.T1d?.SetUiActive(false);
      this.b1d?.SetUiActive(true);
    } else {
      this.T1d?.SetUiActive(!t.IsAllMaterialEnough);
      this.b1d?.SetUiActive(t.IsAllMaterialEnough);
    }
    this.T1d?.SetFunction(this.Wpd);
    this.b1d?.SetFunction(this.Wpd);
  }
}
exports.RoleDevWeaponDevItem = RoleDevWeaponDevItem;
//# sourceMappingURL=RoleDevWeaponDevItem.js.map