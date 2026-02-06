"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksMenuFlavorItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const TXT_FLAVOR_DRINKS = "{0}~{1}";
const TXT_FLAVOR_BATCHING = "+{0}";
class DrinksMenuFlavorItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.TasteItem1 = undefined;
    this.TasteItem2 = undefined;
    this.Id = 0;
    this.IsSelectOnCb = undefined;
    this.IsEnableCb = undefined;
    this.OnToggleStateChangeFunction = undefined;
    this.yXf = () => {
      this.GetExtendToggle(0).SetToggleState(0, true);
      this.GetButton(5).RootUIComp.SetUIActive(false);
    };
    this.EXu = () => {
      if (this.GetExtendToggle(0).GetToggleState() === 2) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Drinks_ConfirmBox_hit");
      }
    };
    this.Yai = i => {
      i = i === 1;
      this.GetButton(5).RootUIComp.SetUIActive(i);
      if (this.OnToggleStateChangeFunction) {
        this.OnToggleStateChangeFunction(this.GetExtendToggle(0), this.GetButton(5), this.Id, i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, this.yXf]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    this.TasteItem1 = new DrinksMenuFlavorTasteItem();
    i.push(this.TasteItem1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.TasteItem2 = new DrinksMenuFlavorTasteItem();
    i.push(this.TasteItem2.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    await Promise.all(i);
  }
  OnStart() {
    this.GetExtendToggle(0).OnStateChange.Add(this.Yai);
    this.GetExtendToggle(0).OnPointDownCallBack.Bind(this.EXu);
  }
  OnSelected(i) {
    if (this.IsSelectOnCb && this.Id !== 0) {
      this.Oei(this.IsSelectOnCb(this.Id));
    }
  }
  Refresh(i, t, e) {
    this.Id = i;
    var s = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    var r = this.GetExtendToggle(0);
    if (s === 2) {
      if (this.IsEnableCb) {
        if (this.IsEnableCb(i)) {
          if (this.IsSelectOnCb) {
            this.Oei(this.IsSelectOnCb(i));
          }
        } else {
          r.SetToggleState(2);
        }
      }
      r.bLockStateOnSelect = false;
      var h;
      var a;
      var n = [];
      var s = ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(i);
      for ([h, a] of s.Flavor) {
        var o = {
          Type: h,
          Key: TXT_FLAVOR_BATCHING,
          Value: [String(a)]
        };
        n.push(o);
      }
      this.TasteItem1.Refresh(n.length > 0 ? n[0] : undefined);
      this.TasteItem2.Refresh(n.length > 1 ? n[1] : undefined);
      this.GetText(2)?.ShowTextNew(s.Name);
      this.SetTextureByPath(s.Icon, this.GetTexture(1));
    } else {
      if (this.IsSelectOnCb) {
        this.Oei(this.IsSelectOnCb(i));
      }
      r.SetSelfInteractive(true);
      r.bLockStateOnSelect = true;
      s = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(i);
      this.GetText(2)?.ShowTextNew(s.DrinkName);
      this.SetTextureByPath(s.DrinkIcon, this.GetTexture(1));
      r = this.SXf(i);
      this.TasteItem1.Refresh(r.length > 0 ? r[0] : undefined);
      this.TasteItem2.Refresh(r.length > 1 ? r[1] : undefined);
    }
  }
  SXf(i) {
    var t;
    var e;
    var s;
    var i = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(i);
    var r = [];
    for ([t, [e, s]] of ModelManager_1.ModelManager.DrinksModel.GetDrinksFlavorRange(i.DrinkId)) {
      var h = {
        Type: t,
        Key: TXT_FLAVOR_DRINKS,
        Value: [String(e), String(s)]
      };
      r.push(h);
    }
    return r;
  }
  Oei(i, t = false) {
    this.GetExtendToggle(0).SetToggleState(i ? 1 : 0, t);
    t = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    this.GetButton(5).RootUIComp.SetUIActive(i && t === 2);
  }
}
exports.DrinksMenuFlavorItem = DrinksMenuFlavorItem;
class DrinksMenuFlavorTasteItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  Refresh(i) {
    var t;
    if (i) {
      this.RootItem?.SetUIActive(true);
      t = ConfigManager_1.ConfigManager.DrinksConfig.GetFlavorType(i.Type);
      this.SetTextureByPath(t.Icon, this.GetTexture(0));
      t = StringUtils_1.StringUtils.Format(i.Key, ...i.Value);
      this.GetText(1)?.SetText(t);
    } else {
      this.RootItem?.SetUIActive(false);
    }
  }
}
//# sourceMappingURL=DrinksMenuFlavorItem.js.map