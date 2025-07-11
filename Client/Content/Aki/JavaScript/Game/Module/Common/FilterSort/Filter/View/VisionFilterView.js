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
    this.IDt = (i, t, e) => {
      var t = new FilterGroup_1.FilterItem(t);
      t.SetToggleFunction(this.TDt);
      var s = this.MDt.has(i.FilterId);
      t.ShowTemp(i, s);
      return {
        Key: i,
        Value: t
      };
    };
    this.TDt = (i, t, e) => {
      if (i === 1) {
        this.MDt.set(t, e);
      } else {
        this.MDt.delete(t);
      }
    };
    this.wDt = (i, t, e) => {
      t = new FilterGroup_1.FilterGroup(t);
      t.SetSelectedDataMap(this.MDt);
      t.SetToggleFunction(this.TDt);
      t.SetOnSelectAllFunction(this.TDt);
      t.ShowTemp(i, this.C0t.ConfigId);
      i = t.GetFilterType();
      return {
        Key: i,
        Value: t
      };
    };
    this.Z9e = () => {
      if (this.bDt) {
        this.MDt.clear();
        for (const i of this.SearchScroll.GetScrollItemList()) {
          i.SetToggleState(false);
        }
      } else {
        for (const t of this.Scroll.GetScrollItemList()) {
          t.ResetTempFilterDataMap();
          t.RefreshGroupItem();
          t.RefreshSelectAllToggleState();
        }
      }
    };
    this.xDt = () => {
      const s = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.C0t.ConfigId);
      s.ClearSelectRuleData();
      this.MDt.forEach((i, t) => {
        var e = this.BDt.get(t);
        s.AddSingleRuleData(e, t, i);
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
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.C0t.ConfigId);
    this.Scroll.RefreshByData(i.RuleList);
    this.GDt(false);
  }
  FDt() {
    var i;
    var t;
    var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.C0t.ConfigId);
    const s = new Array();
    e.RuleList.forEach(i => {
      ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(i, this.C0t.ConfigId).forEach(i => {
        if (i.Content.includes(this.gGe)) {
          s.push(i);
        }
      });
    });
    for (const r of this.Scroll.GetScrollItemList()) {
      for ([i, t] of r.GetTempFilterDataMap()) {
        this.MDt.set(i, t);
      }
    }
    this.SearchScroll.RefreshByData(s);
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
    ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.C0t.ConfigId).RuleList.forEach(i => {
      const t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(i).FilterType;
      ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(i, this.C0t.ConfigId).forEach(i => {
        this.BDt.set(i.FilterId, t);
      });
    });
    this.MDt = new Map();
    var i = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.C0t.ConfigId)?.GetSelectRuleData();
    if (i) {
      i.forEach(i => {
        i.forEach((i, t) => {
          this.MDt?.set(t, i);
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