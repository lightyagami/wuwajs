"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiHotKeyType = undefined;
const UE = require("ue");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const HotKeyItemFactory_1 = require("../HotKeyItemFactory");
const HotKeyTypeBase_1 = require("./HotKeyTypeBase");
class MultiHotKeyType extends HotKeyTypeBase_1.HotKeyTypeBase {
  constructor() {
    super(...arguments);
    this.Layout = undefined;
    this.xqo = [];
    this.wqo = (e, t, s) => {
      return {
        Key: e,
        Value: HotKeyItemFactory_1.HotKeyItemFactory.CreateHotKeyComponent(t.GetOwner(), e, this)
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILayoutBase]];
  }
  async OnBeforeStartAsync() {
    this.Layout = new GenericLayoutNew_1.GenericLayoutNew(this.GetLayoutBase(1), this.wqo, this.GetItem(0));
    var e = this.OpenParam;
    this.Layout.RebuildLayoutByDataNew(e);
    this.xqo = await Promise.all(this.Layout.GetLayoutItemList());
  }
  OnClear() {
    for (const e of this.xqo) {
      e.Clear();
    }
  }
  GetHotKeyComponents() {
    return this.xqo;
  }
  KeyItemNotifySetActive(e) {
    let t = false;
    for (const s of this.GetHotKeyComponents()) {
      if (s.IsHotKeyActive()) {
        t = true;
        break;
      }
    }
    this.SetActive(t);
  }
}
exports.MultiHotKeyType = MultiHotKeyType;
//# sourceMappingURL=MultiHotKeyType.js.map