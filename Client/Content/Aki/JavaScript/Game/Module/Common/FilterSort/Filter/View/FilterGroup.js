"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterGroup = exports.FilterItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../../Util/Layout/GenericLayoutNew");
class FilterItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Pe = undefined;
    this.j5e = undefined;
    this.gDt = t => {
      this.j5e?.(t, this.Pe.FilterId, this.Pe.Content);
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.gDt]];
  }
  fDt() {
    var t = this.Pe.Content;
    this.GetText(4).SetText(t);
  }
  Ost() {
    var t;
    var i;
    var e = this.Pe.GetIconPath();
    var s = this.GetItem(1);
    if (StringUtils_1.StringUtils.IsBlank(e)) {
      s.SetUIActive(false);
    } else {
      s.SetUIActive(true);
      s = e.includes("Atlas");
      (t = this.GetTexture(2)).SetUIActive(!s);
      (i = this.GetSprite(3)).SetUIActive(s);
      if (s) {
        this.SetSpriteByPath(e, i, false);
        i.SetChangeColor(this.Pe.NeedChangeColor, i.changeColor);
      } else {
        this.SetTextureByPath(e, t);
        t.SetChangeColor(this.Pe.NeedChangeColor, t.changeColor);
      }
    }
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, false);
  }
  ShowTemp(t, i) {
    this.Pe = t;
    this.fDt();
    this.Ost();
    this.SetToggleState(i);
  }
}
exports.FilterItem = FilterItem;
class FilterGroup extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.pDt = 0;
    this.vDt = 2;
    this.MDt = undefined;
    this.j5e = undefined;
    this.EDt = undefined;
    this.Mne = 0;
    this.wTt = 0;
    this.Layout = undefined;
    this.CurrentSelectedDataMap = undefined;
    this.SDt = undefined;
    this.yDt = e => {
      if (e === 1) {
        for (const i of this.Layout.GetLayoutItemMap().keys()) {
          var t = i;
          this.MDt.set(t.FilterId, t.Content);
          this.EDt?.(e, t.FilterId, t.Content);
        }
      } else if (e === 0) {
        this.MDt.forEach((t, i) => {
          this.EDt?.(e, i, t);
        });
        this.ResetTempFilterDataMap();
      }
      this.RefreshGroupItem();
    };
    this.IDt = (t, i, e) => {
      var i = new FilterItem(i);
      i.SetToggleFunction(this.TDt);
      var s = this.MDt.has(t.FilterId);
      i.ShowTemp(t, s);
      return {
        Key: t,
        Value: i
      };
    };
    this.TDt = (t, i, e) => {
      if (t === 1) {
        this.MDt.set(i, e);
      } else {
        this.MDt.delete(i);
      }
      this.RefreshSelectAllToggleState();
      this.j5e?.(t, i, e);
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UILayoutBase], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.yDt]];
  }
  OnStart() {
    this.Layout = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(3), this.IDt, this.GetItem(4));
  }
  OnBeforeDestroy() {}
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetOnSelectAllFunction(t) {
    this.EDt = t;
  }
  mDt() {
    var t = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.wTt);
    this.Mne = t.ConfigId;
  }
  qCm() {
    this.SDt = ModelManager_1.ModelManager.FilterModel.GetFilterItemDataList(this.pDt, this.Mne);
  }
  LDt() {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(this.pDt);
    this.vDt = t.FilterType;
  }
  DDt() {
    this.MDt = new Map();
    var t = ModelManager_1.ModelManager.FilterModel.GetFilterResultData(this.wTt).GetSelectRuleDataById(this.vDt);
    if (t) {
      for (var [i, e] of t) {
        this.MDt.set(i, e);
      }
    }
  }
  AddCurrentSelectedFilterData() {
    this.SDt.forEach(t => {
      var t = t.FilterId;
      var i = this.CurrentSelectedDataMap?.get(t);
      if (i) {
        this.MDt.set(t, i);
      }
    });
  }
  RDt() {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(this.pDt);
    this.GetText(0).ShowTextNew(t.Title);
  }
  UDt() {
    this.Layout.RebuildLayoutByDataNew(this.SDt);
  }
  ADt() {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.Mne);
    this.GetItem(1).SetUIActive(t.IsSupportSelectAll);
  }
  RefreshSelectAllToggleState() {
    var t;
    if (ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(this.Mne).IsSupportSelectAll) {
      t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(this.pDt);
      t = this.MDt.size === t.IdList.length ? 1 : 0;
      this.GetExtendToggle(2).SetToggleState(t, false);
    }
  }
  SetSelectedDataMap(t) {
    this.CurrentSelectedDataMap = t;
  }
  InitFilterSetData() {
    this.DDt();
    this.AddCurrentSelectedFilterData();
  }
  ShowTemp(t, i) {
    this.pDt = t;
    this.wTt = i;
    this.mDt();
    this.qCm();
    this.LDt();
    this.InitFilterSetData();
    this.RDt();
    this.ADt();
    this.RefreshSelectAllToggleState();
    this.UDt();
  }
  RefreshGroupItem() {
    var t;
    var i;
    for ([t, i] of this.Layout.GetLayoutItemMap()) {
      var e = t;
      i.SetToggleState(this.MDt.has(e.FilterId));
    }
  }
  GetTempFilterDataMap() {
    return this.MDt;
  }
  ResetTempFilterDataMap() {
    this.MDt.clear();
  }
  GetFilterType() {
    return this.vDt;
  }
}
exports.FilterGroup = FilterGroup;
//# sourceMappingURL=FilterGroup.js.map