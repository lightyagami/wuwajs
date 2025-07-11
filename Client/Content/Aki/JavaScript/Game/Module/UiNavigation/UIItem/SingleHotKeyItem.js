"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleHotKeyItem = undefined;
const UE = require("ue");
const HotKeyItem_1 = require("./HotKeyItem");
const HotKeyTypeCreator_1 = require("./HotKeyType/HotKeyTypeCreator");
class SingleHotKeyItem extends HotKeyItem_1.HotKeyItem {
  constructor() {
    super(...arguments);
    this.Gqo = undefined;
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.Gqo = await HotKeyTypeCreator_1.HotKeyTypeCreator.CreateHotKeyType(this.GetRootActor(), e, false);
    this.Ynl();
  }
  Ynl() {
    var e = this.RootActor.GetComponentByClass(UE.TsUiHotKeyLinkListener_C.StaticClass());
    if (e) {
      for (const t of this.GetHotKeyComponentArray()) {
        t?.SetLinkComponent(e);
      }
    }
  }
  OnClear() {
    this.Gqo.Clear();
  }
  GetHotKeyComponentArray() {
    if (this.Gqo) {
      return this.Gqo.GetHotKeyComponents();
    } else {
      return [];
    }
  }
}
exports.SingleHotKeyItem = SingleHotKeyItem;
//# sourceMappingURL=SingleHotKeyItem.js.map