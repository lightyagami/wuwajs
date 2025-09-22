"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevRecommendItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WeaponController_1 = require("../../../Weapon/WeaponController");
class RoleDevRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fOe = undefined;
    this.G0d = undefined;
    this.sft = undefined;
    this.Pe = undefined;
    this.OWd = 0;
    this.y8i = () => {
      if (this.Pe?.GachaId) {
        this.F0d();
      }
    };
    this.IOe = () => {
      if (this.Pe) {
        if (this.Pe.HasRole) {
          this.N0d();
        } else {
          this.V0d();
        }
        let t = 7;
        switch (this.ItemIndex) {
          case 0:
            t = 7;
            break;
          case 1:
            t = 8;
            break;
          case 2:
            t = 9;
            break;
          default:
            t = 7;
        }
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 2, t);
      }
    };
    this.j0d = () => {
      if (this.Pe?.WeaponJumpGroupConfig && this.Pe.WeaponJumpGroupConfig.JumpType === 3) {
        this.H0d(this.Pe.WeaponJumpGroupConfig.JumpPath);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[2, this.y8i]];
  }
  async OnBeforeStartAsync() {
    this.fOe = new ButtonItem_1.ButtonItem();
    this.G0d = new ButtonItem_1.ButtonItem();
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(0).GetOwner());
    this.sft.SetExtendToggleEnable(false);
    this.sft.SetToggleInteractive(false);
    await Promise.all([this.fOe.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.G0d.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())]);
  }
  OnStart() {
    this.wad();
    this._wd();
  }
  wad() {
    this.GetItem(4)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
  }
  _wd() {
    this.fOe.SetFunction(this.IOe);
    this.fOe.SetLocalTextNew("RoleProject_Tips02");
    this.G0d.SetFunction(this.j0d);
    this.G0d.SetLocalTextNew("RoleProject_Button04");
  }
  Refresh(t, e, i) {
    this.Pe = t;
    this.OWd = i;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.WeaponName);
    this.PKt(t);
  }
  get ItemIndex() {
    return this.OWd;
  }
  PKt(t) {
    this.GetItem(7)?.SetUIActive(t.IsEquipped);
    this.GetButton(2).RootUIComp.SetUIActive(!t.IsEquipped && t.IsCall && !t.NotObtained);
    this.o9i(t);
    this.$0d(t);
    this.GetNotObtainedButtonState(t);
    this.ssc(t);
  }
  ssc(t) {
    t = {
      Type: 4,
      ItemConfigId: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(t.WeaponId).ItemId,
      Data: t
    };
    this.sft.Apply(t);
  }
  o9i(t) {
    if (this.fOe) {
      if (t.NotObtained || t.IsEquipped) {
        this.fOe.SetUiActive(false);
      } else {
        t = t.HasRole ? "RoleProject_Button05" : "RoleProject_Button06";
        this.fOe.SetLocalTextNew(t);
        t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.Pe.WeaponId);
        this.fOe.SetUiActive(t > 0);
      }
    }
  }
  $0d(t) {
    if (!(ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.WeaponId) > 0)) {
      if (t.NotObtained && t.WeaponJumpGroupConfig?.PathDescribe !== undefined) {
        t = t.WeaponJumpGroupConfig?.PathDescribe;
        this.G0d.SetLocalTextNew(t);
        this.G0d.SetUiActive(true);
      } else {
        this.G0d.SetUiActive(false);
      }
    }
  }
  GetNotObtainedButtonState(t) {
    var e;
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.WeaponId);
    if (!this.xpd(t) || i > 0) {
      this.GetItem(4)?.SetUIActive(false);
      this.G0d.SetUiActive(false);
    } else {
      i = t.WeaponJumpGroupConfig;
      e = this.GetItem(4);
      if (i && i.JumpType === 3) {
        if (t.IsCall) {
          this.G0d.SetUiActive(true);
          e?.SetUIActive(false);
        } else {
          this.G0d.SetUiActive(i.PathDescribe !== undefined);
          e?.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "RoleProject_Access_None");
        }
      } else {
        this.G0d.SetUiActive(false);
        e?.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "RoleProject_Access_01");
      }
    }
  }
  xpd(t) {
    return t.WeaponQuality === 5;
  }
  N0d() {
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.Pe.RoleId).GetIncId();
    var e = this.Pe.WeaponId;
    WeaponController_1.WeaponController.OpenWeaponReplaceView(this.Pe.RoleId, t, false, e);
  }
  V0d() {
    UiManager_1.UiManager.OpenView("InventoryView", this.Pe.WeaponId);
  }
  H0d(t) {
    this.MSd(t);
  }
  MSd(t, e) {
    SkipTaskManager_1.SkipTaskManager.RunByConfigId(t, e);
  }
  F0d() {
    UiManager_1.UiManager.OpenView("GachaMainView", this.Pe.GachaId);
  }
}
exports.RoleDevRecommendItem = RoleDevRecommendItem;
//# sourceMappingURL=RoleDevRecommendItem.js.map