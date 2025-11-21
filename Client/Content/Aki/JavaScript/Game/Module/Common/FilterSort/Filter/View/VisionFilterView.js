"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionFilterView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const GenericScrollView_1 = require("../../../../Util/ScrollView/GenericScrollView");
const CommonSearchComponent_1 = require("../../../InputView/CommonSearchComponent");
const FilterGroup_1 = require("./FilterGroup");
class VisionFilterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Scroll = undefined;
    this.SearchScroll = undefined;
    this.C0t = undefined;
    this.gGe = "";
    this.MDt = undefined;
    this.BDt = undefined;
    this.dqe = undefined;
    this.bDt = false;
    this.qDt = () => {
      this.gGe = "";
      this.GDt(false);
      for (const i of this.Scroll.GetScrollItemList()) {
        i.SetSelectedDataMap(this.MDt);
        i.InitFilterSetData();
        i.RefreshGroupItem();
        i.RefreshSelectAllToggleState();
      }
    };
    this.NDt = i => {
      this.gGe = i;
      this.MDt.clear();
      this.Og();
    };
    this.Mbe = i => {
      this.NDt(i);
    };
    this.Tqe = () => {
      this.qDt();
    };
    this.IDt = (i, e, t) => {
      var e = new FilterGroup_1.FilterItem(e);
      e.SetToggleFunction(this.TDt);
      var s = this.MDt.has(i.FilterId);
      e.ShowTemp(i, s);
      return {
        Key: i,
        Value: e
      };
    };
    this.TDt = (i, e, t) => {
      if (i === 1) {
        this.MDt.set(e, t);
      } else {
        this.MDt.delete(e);
      }
    };
    this.wDt = (i, e, t) => {
      e = new FilterGroup_1.FilterGroup(e);
      e.SetSelectedDataMap(this.MDt);
      e.SetToggleFunction(this.TDt);
      e.SetOnSelectAllFunction(this.TDt);
      e.ShowTemp(i, this.C0t.UniqueId);
      i = e.GetFilterType();
      return {
        Key: i,
        Value: e
      };
    };
    this.Z9e = () => {
      this.MDt.clear();
      if (this.bDt) {
        for (const i of this.SearchScroll.GetScrollItemList()) {
          i.SetToggleState(false);
        }
      } else {
        for (const e of this.Scroll.GetScrollItemList()) {
          e.ResetTempFilterDataMap();
          e.RefreshGroupItem();
          e.RefreshSelectAllToggleState();
        }
      }
    };
    this.xDt = () => {
      const s = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.C0t.UniqueId);
      s.ClearSelectRuleData();
      this.MDt.forEach((i, e) => {
        var t = this.BDt.get(e);
        s.AddSingleRuleData(t, e, i);
      });
      this.C0t.ConfirmFunction?.();
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Z9e], [2, this.xDt]];
  }
  OnStart() {
    this.C0t = this.OpenParam;
    this.ODt();
    this.dqe = new CommonSearchComponent_1.CommonSearchComponent(this.GetItem(4), this.Mbe, this.Tqe);
  }
  ODt() {
    this.Scroll = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.wDt);
    this.SearchScroll = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(3), this.IDt);
  }
  kDt() {
    var i = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.C0t.UniqueId);
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(i.ConfigId);
    this.Scroll.RefreshByData(i.RuleList);
    this.GDt(false);
  }
  FDt() {
    const e = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.C0t.UniqueId);
    var i;
    var t;
    var s = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(e.ConfigId);
    const r = new Array();
    s.RuleList.forEach(i => {
      ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(i, e.ConfigId).forEach(i => {
        if (i.Content.includes(this.gGe)) {
          r.push(i);
        }
      });
    });
    for (const h of this.Scroll.GetScrollItemList()) {
      for ([i, t] of h.GetTempFilterDataMap()) {
        this.MDt.set(i, t);
      }
    }
    this.SearchScroll.RefreshByData(r);
    this.GDt(true);
  }
  GDt(i) {
    this.GetScrollViewWithScrollbar(0).RootUIComp.SetUIActive(!i);
    this.GetScrollViewWithScrollbar(3).RootUIComp.SetUIActive(i);
    this.bDt = i;
  }
  Og() {
    if (StringUtils_1.StringUtils.IsEmpty(this.gGe)) {
      this.kDt();
    } else {
      this.FDt();
    }
  }
  OnBeforeShow() {
    this.BDt = new Map();
    const t = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.C0t.UniqueId);
    ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t.ConfigId).RuleList.forEach(i => {
      const e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(i).FilterType;
      ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(i, t.ConfigId).forEach(i => {
        this.BDt.set(i.FilterId, e);
      });
    });
    this.MDt = new Map();
    var i = t?.GetSelectRuleData();
    if (i) {
      i.forEach(i => {
        i.forEach((i, e) => {
          this.MDt?.set(e, i);
        });
      });
    }
    this.Og();
  }
  OnBeforeDestroy() {
    this.dqe.Destroy();
  }
}
exports.VisionFilterView = VisionFilterView;
//# sourceMappingURL=VisionFilterView.js.map