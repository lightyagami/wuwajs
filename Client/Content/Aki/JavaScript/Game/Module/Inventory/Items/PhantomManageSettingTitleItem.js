"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageSettingTitleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiManager_1 = require("../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InventoryDefine_1 = require("../InventoryDefine");
const PhantomManageSettingGrid_1 = require("./PhantomManageSettingGrid");
class PhantomManageSettingTitleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Wqu = 1;
    this.s4e = undefined;
    this.fTu = t => {
      if (t === 2 || t === 3 || t === 4) {
        this.RefreshByViewModelAsync();
      }
    };
    this.hJs = (t, e) => {
      if (this.Wqu === 1) {
        PhantomManageSettingTitleItem.ViewModel.SetEditDataById(t.RuleId, t.Value, e);
      } else if (e) {
        e = this.RB_(t);
        UiManager_1.UiManager.OpenView("PhantomManageConfigSelectView", e);
      } else {
        PhantomManageSettingTitleItem.ViewModel.SetEditDataById(t.RuleId, t.Value, false);
      }
    };
    this.zqu = t => {
      for (var [e, i] of t) {
        PhantomManageSettingTitleItem.ViewModel.SetEditDataByIdList(e, i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIVerticalLayout]];
  }
  OnStart() {
    PhantomManageSettingTitleItem.ViewModel.Bind(this.fTu);
  }
  OnBeforeDestroy() {
    PhantomManageSettingTitleItem.ViewModel.UnBind(this.fTu);
  }
  async RefreshAsync(t, e, i) {
    this.Pe = t;
    this.Jqu();
    await this.RefreshByViewModelAsync();
  }
  async RefreshByViewModelAsync() {
    if (!this.s4e) {
      await this.Zqu(this.Pe.FilterRuleId);
    }
    var t = this.eGu();
    await this.s4e.RefreshAsync(t);
  }
  Refresh(t, e, i) {
    var a = new UiAsyncTask_1.UiAsyncTask("RefreshAsync", async () => {
      await this.RefreshAsync(t, e, i);
    });
    this.RunAsyncTask(a);
  }
  Jqu() {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(this.Pe.FilterRuleId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
  }
  RefreshByView() {
    this.RefreshByViewModelAsync();
  }
  GetKey(t, e) {
    return t.FilterRuleId;
  }
  async Zqu(t) {
    var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(t).FilterType;
    this.Wqu = InventoryDefine_1.recFilterRuleToGirdType[e];
    var e = this.Wqu === 1 ? "UiItem_Inventory_EchoSetGroup02_Prefab" : "UiItem_Inventory_EchoSetGroup04_Prefab";
    this.s4e = new PhantomManageSettingGrid_1.SettingGridLayout(t, this.Wqu);
    this.s4e.CallbackOnClicked = this.hJs;
    var t = this.GetVerticalLayout(1);
    await this.s4e.CreateThenShowByResourceIdAsync(e, t.GetRootComponent());
  }
  RB_(t) {
    var e = PhantomManageSettingTitleItem.ViewModel.GetEditDataByRuleId(t.RuleId);
    return {
      GridType: ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.Pe.FilterId).GridType,
      FilterId: this.Pe.FilterId,
      RuleIdList: [t.RuleId],
      ValueMap: e,
      CallbackConfirm: this.zqu
    };
  }
  eGu() {
    var t = this.Pe.FilterRuleId;
    var e = PhantomManageSettingTitleItem.ViewModel.GetSelectConfig();
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(t);
    var a = i.IdList;
    var n = PhantomManageSettingTitleItem.ViewModel.GetEditState();
    let r = [];
    var s = PhantomManageSettingTitleItem.ViewModel.GetEditDataByRuleId(t);
    var s = (r = s && n ? s.get(t) : e.GetValueListByRuleId(t)).length === 0;
    var e = i.FilterType;
    var i = InventoryDefine_1.recFilterRuleToGirdType[e];
    var h = [];
    h.push({
      IsFirst: true,
      IsEmpty: !n && s,
      IsAdd: i === 2 && n,
      IsSelect: false,
      IsEditing: n,
      RuleId: t,
      Value: 0
    });
    for (const g of a) {
      var o = {
        IsFirst: false,
        IsEmpty: false,
        IsAdd: false,
        IsSelect: r.includes(g),
        IsEditing: n,
        RuleId: t,
        Value: g
      };
      h.push(o);
    }
    return h;
  }
}
(exports.PhantomManageSettingTitleItem = PhantomManageSettingTitleItem).ViewModel = undefined;
//# sourceMappingURL=PhantomManageSettingTitleItem.js.map