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
    this.vpm = undefined;
    this.ypm = undefined;
    this.OnClickBtnSwitch = undefined;
    this.hJs = () => {
      var t;
      var e;
      if (this.Pe) {
        t = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.dFe)?.GetIncId() ?? 0;
        e = this.Pe?.WeaponConfigId;
        if (t > 0) {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(t, e);
        } else {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
        }
      }
    };
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
    this.pnd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.vnd);
    this.vpm = new ButtonItem_1.ButtonItem();
    t.push(this.vpm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.vpm.SetFunction(this.dSd);
    this.ypm = new ButtonItem_1.ButtonItem();
    t.push(this.ypm.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.ypm.SetFunction(this.dSd);
    await Promise.all(t);
  }
  Refresh(t) {
    this.Pe = t;
    this.dFe = t.RoleId;
    this.RefreshItemGrid(t);
    this.RefreshWeaponViewItem(t);
  }
  RefreshItemGrid(t) {
    t = t.WeaponConfigId ?? 0;
    this.sft?.SetExtendToggleEnable(t > 0);
    this.sft?.SetToggleInteractive(t > 0);
    if (t > 0) {
      this.sft?.BindOnExtendToggleClicked(this.hJs);
    }
  }
  RefreshWeaponViewItem(t) {
    this.TYd(t);
    this.mSd(t);
    this.pnd.RefreshByData(t.DetailItems);
  }
  TYd(t) {
    switch (t.RoleType) {
      case 0:
        this.bYd(t);
        break;
      case 1:
        this.RYd(t);
        break;
      case 2:
        this.wYd(t);
    }
  }
  RYd(t) {
    this.GetItem(12).SetUIActive(false);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(t.RoleId);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e.WeaponType);
    this.LYd(e.WeaponTypeIcon, e.WeaponTypeDescribe);
    this.PYd(t);
  }
  bYd(t) {
    this.GetItem(12).SetUIActive(true);
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(t.WeaponConfigId);
    this.AYd(e, t);
    this.DYd(t.WeaponName);
    this.UYd(t);
  }
  wYd(t) {
    this.GetItem(12).SetUIActive(false);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(t.RoleId);
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e.WeaponType);
    this.LYd(e.WeaponTypeIcon, e.WeaponTypeDescribe);
    this.PYd(t);
  }
  LYd(t, e) {
    this.sft.SetIconByPath(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
    this.sft.SetBottomTextVisible(false);
    this.sft.SetQuality();
  }
  PYd(t) {
    t = t.RoleType === 2;
    this.GetButton(11).RootUIComp.SetUIActive(false);
    this.GetItem(0).SetUIActive(!t);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
  }
  AYd(t, e) {
    t = {
      Type: 4,
      ItemConfigId: t.ItemId,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [e.WeaponLevel],
      Data: e
    };
    this.sft.Apply(t);
  }
  DYd(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t);
  }
  UYd(t) {
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
    this.vpm?.SetLocalTextNew(i);
    this.ypm?.SetLocalTextNew(i);
    if (e) {
      this.vpm?.SetUiActive(true);
      this.ypm?.SetUiActive(false);
    } else {
      this.vpm?.SetUiActive(!t.IsAllMaterialEnough);
      this.ypm?.SetUiActive(t.IsAllMaterialEnough);
    }
    this.vpm?.SetFunction(this.dSd);
    this.ypm?.SetFunction(this.dSd);
  }
}
exports.RoleDevWeaponDevItem = RoleDevWeaponDevItem;
//# sourceMappingURL=RoleDevWeaponDevItem.js.map