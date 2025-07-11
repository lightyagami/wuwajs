"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const GenericScrollView_1 = require("../../../../Util/ScrollView/GenericScrollView");
const FilterGroup_1 = require("./FilterGroup");
class FilterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Scroll = undefined;
    this.C0t = undefined;
    this.PDt = undefined;
    this.Z9e = () => {
      for (const e of this.Scroll.GetScrollItemList()) {
        e.ResetTempFilterDataMap();
        e.RefreshGroupItem();
        e.RefreshSelectAllToggleState();
      }
    };
    this.xDt = () => {
      var e;
      var i;
      var r = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.C0t.ConfigId);
      for ([e, i] of this.Scroll.GetScrollItemMap()) {
        var t = i.GetTempFilterDataMap();
        r.SetSelectRuleData(e, t);
      }
      this.C0t.ConfirmFunction?.();
      this.CloseMe();
    };
    this.wDt = (e, i, r) => {
      i = new FilterGroup_1.FilterGroup(i);
      i.ShowTemp(e, this.C0t.ConfigId);
      e = i.GetFilterType();
      return {
        Key: e,
        Value: i
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Z9e], [2, this.xDt]];
  }
  OnBeforeCreate() {
    this.C0t = this.OpenParam;
  }
  async OnCreateAsync() {
    var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.C0t.ConfigId);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.GridType);
    var i = await this.LoadPrefabAsync(e, undefined);
    if (i?.IsValid()) {
      this.PDt = i.GetUIItem();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Filter", 10, "动态加载筛选格子失败", ["配置项id", this.C0t.ConfigId], ["路径", e]);
    }
  }
  OnStart() {
    this.PDt.SetUIParent(this.GetScrollViewWithScrollbar(0).ContentUIItem);
    this.UDt();
  }
  OnBeforeDestroy() {
    this.Scroll.ClearChildren();
  }
  UDt() {
    this.Scroll = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.wDt, this.PDt);
    var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.C0t.ConfigId);
    this.Scroll.RefreshByData(e.RuleList);
  }
}
exports.FilterView = FilterView;
//# sourceMappingURL=FilterView.js.map