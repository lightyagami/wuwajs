"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookFetterItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
class HandBookFetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.PhantomFetter = undefined;
    this.HandBookCommonItemDataList = [];
    this.ContentGenericLayout = undefined;
    this.Lei = 0;
    this.FetterToggleFunction = undefined;
    this.Gei = t => {
      if (this.FetterToggleFunction && t === 1) {
        this.FetterToggleFunction(this);
      }
    };
    this.GetPhantomFetter = () => this.PhantomFetter;
    this.Nei = (t, e, i) => {
      var s = new HandBookCommonItem_1.HandBookCommonItem();
      s.Initialize(e.GetOwner());
      s.Refresh(t, false, 0);
      s.SetToggleInteractive(false);
      return {
        Key: i,
        Value: s
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [4, UE.UIText], [3, UE.UIText], [5, UE.UISprite], [6, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[0, this.Gei]];
  }
  Refresh(t, e, i) {
    this.PhantomFetter = t;
    this.Lei = i;
    this.GetTexture(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetText(3).SetUIActive(false);
    this.GetSprite(5).SetUIActive(false);
    this.GetText(4).ShowTextNew(this.PhantomFetter.Name);
    if (this.ContentGenericLayout) {
      this.ContentGenericLayout.ClearChildren();
    }
    this.ContentGenericLayout = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(6), this.Nei);
    this.HandBookCommonItemDataList = [];
    this.ContentGenericLayout.RebuildLayoutByDataNew(this.HandBookCommonItemDataList);
    this.Oei(e);
  }
  GetGirdIndex() {
    return this.Lei;
  }
  BindFetterToggleCallback(t) {
    this.FetterToggleFunction = t;
  }
  Oei(t) {
    var e = this.GetExtendToggle(0);
    if (t) {
      e.SetToggleState(1, false);
    } else {
      e.SetToggleState(0, false);
    }
  }
  OnDeselected(t) {
    this.Oei(false);
  }
  SetToggleStateForce(t, e = false) {
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
  OnSelected(t) {
    if (t) {
      this.SetToggleStateForce(1);
      this.Gei(1);
    }
  }
  OnBeforeDestroy() {
    this.PhantomFetter = undefined;
    this.HandBookCommonItemDataList = [];
    if (this.ContentGenericLayout) {
      this.ContentGenericLayout.ClearChildren();
      this.ContentGenericLayout = undefined;
    }
    this.FetterToggleFunction = undefined;
  }
}
exports.HandBookFetterItem = HandBookFetterItem;
//# sourceMappingURL=HandBookFetterItem.js.map