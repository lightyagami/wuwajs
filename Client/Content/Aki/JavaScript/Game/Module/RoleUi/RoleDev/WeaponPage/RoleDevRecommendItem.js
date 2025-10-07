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
const SortViewData_1 = require("../../../Common/FilterSort/Sort/Model/SortViewData");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevUtils_1 = require("../RoleDevUtils");
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
    this.G0d.SetRedDotVisible(false);
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
    this.GetButton(2).RootUIComp.SetUIActive(!t.IsEquipped && t.IsCall);
    this.o9i(t);
    this.$0d(t);
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
      if (t.IsObtained && !t.IsEquipped) {
        t = t.HasRole ? "RoleProject_Button05" : "RoleProject_Button06";
        this.fOe.SetLocalTextNew(t);
        t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.Pe.WeaponId);
        this.fOe.SetUiActive(t > 0);
      } else {
        this.fOe.SetUiActive(false);
      }
    }
  }
  $0d(t) {
    var e = this.GetItem(4);
    if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.WeaponId) > 0) {
      this.G0d.SetUiActive(false);
      e.SetUIActive(false);
    } else if (t.WeaponJumpGroupConfig.JumpPath !== 0) {
      this.G0d.SetLocalTextNew(t.WeaponJumpGroupConfig.PathDescribe);
      this.G0d.SetUiActive(true);
      e.SetUIActive(false);
    } else {
      this.G0d.SetUiActive(false);
      e.SetUIActive(true);
      if (t.IsCall || t.WeaponJumpGroupConfig.JumpType !== 1) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.WeaponJumpGroupConfig.PathDescribe);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "RoleProject_Access_None");
      }
    }
  }
  N0d() {
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.Pe.RoleId);
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponListFromReplace(t.GetWeaponConfig().WeaponType);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(3);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(e);
    var i = new SortViewData_1.SortResultData();
    i.SetConfigId(e.Id);
    i.SetIsAscending(false);
    var r = e.BaseSortList[0];
    var a = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(r, e.DataId);
    i.SetSelectBaseSort([r, a]);
    ModelManager_1.ModelManager.SortModel.SortDataList(t, e.Id, i);
    let s = -1;
    let o = -1;
    for (const h of t) {
      if (h.GetConfigId() === this.Pe.WeaponId) {
        var n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(h.GetUniqueId());
        if (n) {
          if (n.GetRoleId() === 0) {
            o = h.GetUniqueId();
            break;
          }
          if (s < 0) {
            s = h.GetUniqueId();
          }
        }
      }
    }
    if (o < 0) {
      o = s;
    }
    RoleDevUtils_1.RoleDevUtils.OpenWeaponReplaceView(this.Pe.RoleId, o);
  }
  V0d() {
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.Pe.WeaponId);
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponListFromReplace(t.WeaponType);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(3);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(e);
    var i = new SortViewData_1.SortResultData();
    i.SetConfigId(e.Id);
    i.SetIsAscending(false);
    var r = e.BaseSortList[0];
    var a = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(r, e.DataId);
    i.SetSelectBaseSort([r, a]);
    ModelManager_1.ModelManager.SortModel.SortDataList(t, e.Id, i);
    let s = undefined;
    for (const o of t) {
      if (o.GetConfigId() === this.Pe.WeaponId) {
        s = o.GetUniqueId();
        break;
      }
    }
    UiManager_1.UiManager.OpenView("InventoryView", s);
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