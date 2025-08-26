"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectGroup = exports.SelectItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class SelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.CallbackClickItem = undefined;
    this.CallbackGetState = undefined;
    this.Kwi = t => {
      this.CallbackClickItem?.(t, this.Pe.Value);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIText]];
  }
  OnStart() {
    this.GetExtendToggle(0).OnStateChange.Add(this.Kwi);
  }
  OnDestroy() {
    this.GetExtendToggle(0).OnStateChange.Clear();
  }
  Refresh(t, e, i) {
    this.Pe = t;
    this.P5e();
    this.Kbe();
    this.RefreshToggleState();
  }
  P5e() {
    var t = this.Pe.Name;
    this.GetText(4).SetText(t);
  }
  Kbe() {
    var t;
    var e;
    var i = this.Pe.IconPath;
    var s = this.GetItem(1);
    if (StringUtils_1.StringUtils.IsBlank(i)) {
      s.SetUIActive(false);
    } else {
      s.SetUIActive(true);
      s = i.includes("Atlas");
      (t = this.GetTexture(2)).SetUIActive(!s);
      (e = this.GetSprite(3)).SetUIActive(s);
      if (s) {
        this.SetSpriteByPath(i, e, false);
        e.SetChangeColor(this.Pe.NeedChangeColor, e.changeColor);
      } else {
        this.SetTextureByPath(i, t);
        t.SetChangeColor(this.Pe.NeedChangeColor, t.changeColor);
      }
    }
  }
  RefreshToggleState() {
    var t;
    if (this.CallbackGetState) {
      t = this.CallbackGetState(this.Pe.Value) ? 1 : 0;
      this.GetExtendToggle(0).SetToggleState(t, false);
    }
  }
  GetKey(t, e) {
    return this.Pe.Value;
  }
}
exports.SelectItem = SelectItem;
class SelectGroup extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.eGe = undefined;
    this.oGu = new Map();
    this.qGe = [];
    this.nGu = () => {
      var t = new SelectItem();
      t.CallbackClickItem = this.Kwi;
      t.CallbackGetState = this.GetSelectState;
      return t;
    };
    this.GetSelectState = t => this.oGu.has(t);
    this.sGu = t => {
      if (t === 1) {
        for (const i of this.eGe.GetLayoutItemMap().keys()) {
          var e = i;
          this.oGu.set(e, e);
        }
      } else if (t === 0) {
        this.ResetSelect();
      }
      this.RefreshGroupItem();
    };
    this.Kwi = (t, e) => {
      if (t === 1) {
        this.oGu.set(e, e);
      } else {
        this.oGu.delete(e);
      }
      this.RefreshToggleAll();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UILayoutBase], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.sGu]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetLayoutBase(3), this.nGu, this.GetItem(4).GetOwner());
  }
  Refresh(t, e, i) {
    this.Pe = t;
    this.yLr();
    var s = this.Pe.FilterRuleId;
    var s = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(s);
    this.GetText(0).ShowTextNew(s.Title);
    var s = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t.FilterId);
    this.GetItem(1).SetUIActive(s.IsSupportSelectAll);
    this.RefreshToggleAll();
    this.eGe.RefreshByData(this.qGe);
  }
  yLr() {
    var t = [];
    var e = this.Pe;
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(e.FilterId);
    var s = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(e.FilterRuleId);
    var r = s.IdList;
    var h = s.FilterType;
    var a = ModelManager_1.ModelManager.FilterModel.GetFilterDataFuncByFilterType(h);
    for (const n of r) {
      var o = a([n])[0];
      var o = {
        FilterId: e.FilterId,
        FilterRuleId: e.FilterRuleId,
        Value: n,
        Name: o.Content,
        IconPath: o.GetIconPath(),
        IsShowIcon: i.IsShowIcon,
        NeedChangeColor: s.NeedChangeColor
      };
      if (e.ValueList.includes(n)) {
        this.oGu.set(n, n);
      }
      t.push(o);
    }
    this.qGe = t;
  }
  RefreshToggleAll() {
    var t = this.Pe.FilterId;
    if (ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t).IsSupportSelectAll) {
      t = this.oGu.size === this.qGe.length ? 1 : 0;
      this.GetExtendToggle(2).SetToggleState(t, false);
    }
  }
  RefreshGroupItem() {
    var t;
    for ([, t] of this.eGe.GetLayoutItemMap()) {
      t.RefreshToggleState();
    }
  }
  ResetSelect() {
    var t;
    this.oGu.clear();
    for ([, t] of this.eGe.GetLayoutItemMap()) {
      t.RefreshToggleState();
    }
    this.RefreshToggleAll();
  }
  GetSelectValueList() {
    return Array.from(this.oGu.values());
  }
  GetKey(t, e) {
    return this.Pe.FilterRuleId;
  }
  GetRuleId() {
    return this.Pe.FilterRuleId;
  }
}
exports.SelectGroup = SelectGroup;
//# sourceMappingURL=PhantomManageConfigSelectGroup.js.map