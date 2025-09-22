"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigSelectView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const PhantomManageConfigSelectGroup_1 = require("./PhantomManageConfigSelectGroup");
class PhantomManageConfigSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Scroll = undefined;
    this.C0t = undefined;
    this.sft = undefined;
    this.eGu = () => {
      return new PhantomManageConfigSelectGroup_1.SelectGroup();
    };
    this.tGu = () => {
      for (const e of this.Scroll.GetScrollItemList()) {
        e.ResetSelect();
      }
    };
    this.iGu = () => {
      var e = this.rGu();
      this.C0t.CallbackConfirm(e);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.tGu], [2, this.iGu]];
  }
  OnBeforeCreate() {
    this.C0t = this.OpenParam;
  }
  async OnCreateAsync() {
    var e = this.C0t.GridType;
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    var t = await this.LoadPrefabAsync(i, undefined);
    if (t?.IsValid()) {
      this.sft = t.GetUIItem();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Filter", 75, "动态加载筛选格子失败", ["GridType", e], ["路径", i]);
    }
  }
  OnStart() {
    this.sft.SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem);
    this.Scroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.eGu, this.sft.GetOwner());
    var e = this.oGu();
    this.Scroll.RefreshByData(e);
  }
  oGu() {
    var e = this.C0t;
    var i = e.RuleIdList;
    var t = e.FilterId;
    var r = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t).IsSupportSelectAll;
    var a = [];
    for (const n of i) {
      var o = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(n);
      var s = e.ValueMap.get(n) ?? [];
      var o = {
        FilterId: t,
        FilterRuleId: n,
        HasSelectAll: r,
        NeedChangeColor: o.NeedChangeColor,
        ValueList: s
      };
      a.push(o);
    }
    return a;
  }
  rGu() {
    var e = this.Scroll.GetScrollItemList();
    var i = new Map();
    for (const a of e) {
      var t = a.GetRuleId();
      var r = a.GetSelectValueList();
      i.set(t, r);
    }
    return i;
  }
}
exports.PhantomManageConfigSelectView = PhantomManageConfigSelectView;
//# sourceMappingURL=PhantomManageConfigSelectView.js.map