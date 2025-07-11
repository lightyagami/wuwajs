"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookCommonTypeItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
class HandBookCommonTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.HandBookCommonItemDataList = [];
    this.HandBookCommonItemList = [];
    this.Tei = undefined;
    this.GZt = undefined;
    this.Lei = 0;
    this.Dei = (t, i, e) => {
      var s = new HandBookCommonItem_1.HandBookCommonItem();
      s.Initialize(i.GetOwner());
      s.Refresh(t, false, 0);
      s.BindOnExtendToggleStateChanged(this.OnToggleClick);
      this.HandBookCommonItemList.push(s);
      return {
        Key: e,
        Value: s
      };
    };
    this.OnToggleClick = t => {
      var i = t.Data;
      if (this.GZt) {
        t = t.MediumItemGrid;
        this.GZt(i, t);
      }
    };
  }
  Initialize(t = undefined) {
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout]];
  }
  InitGridLayout() {
    if (this.Tei) {
      this.Tei.ClearChildren();
      this.Tei = undefined;
    }
    this.HandBookCommonItemList = [];
    this.Tei = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(1), this.Dei);
    this.Tei.RebuildLayoutByDataNew(this.HandBookCommonItemDataList);
  }
  InitTitle() {
    if (this.HandBookCommonItemDataList.length !== 0) {
      this.GetText(0).SetText(this.HandBookCommonItemDataList[0].Title);
    }
  }
  SetToggleChecked() {
    var t;
    if (this.HandBookCommonItemList.length > 0) {
      (t = this.HandBookCommonItemList[0]).SetSelected(true);
      t.OnSelected(true);
      return t;
    }
  }
  ResetAllToggleState() {
    var i = this.HandBookCommonItemList.length;
    for (let t = 0; t < i; t++) {
      this.HandBookCommonItemList[t].SetSelected(false);
    }
  }
  Refresh(t, i, e) {
    this.Lei = e;
    this.HandBookCommonItemDataList = t;
    this.InitGridLayout();
    this.InitTitle();
  }
  GetGirdIndex() {
    return this.Lei;
  }
  GetHandBookCommonItemList() {
    return this.HandBookCommonItemList;
  }
  BindToggleCallback(t) {
    this.GZt = t;
  }
  OnBeforeDestroy() {
    if (this.Tei) {
      this.Tei.ClearChildren();
      this.Tei = undefined;
    }
  }
}
exports.HandBookCommonTypeItem = HandBookCommonTypeItem;
//# sourceMappingURL=HandBookCommonTypeItem.js.map