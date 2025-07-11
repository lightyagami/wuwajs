"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalHotKeyType = undefined;
const UE = require("ue");
const HotKeyItemFactory_1 = require("../HotKeyItemFactory");
const HotKeyTypeBase_1 = require("./HotKeyTypeBase");
class NormalHotKeyType extends HotKeyTypeBase_1.HotKeyTypeBase {
  constructor() {
    super(...arguments);
    this.HotKeyComponent = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.HotKeyComponent = await HotKeyItemFactory_1.HotKeyItemFactory.CreateHotKeyComponent(this.GetItem(0).GetOwner(), e[0], this);
  }
  OnClear() {
    this.HotKeyComponent.Clear();
  }
  GetHotKeyComponents() {
    return [this.HotKeyComponent];
  }
  KeyItemNotifySetActive(e) {
    if (this.IsMultiKeyItem) {
      this.SetActive(e);
    }
  }
}
exports.NormalHotKeyType = NormalHotKeyType;
//# sourceMappingURL=NormalHotKeyType.js.map