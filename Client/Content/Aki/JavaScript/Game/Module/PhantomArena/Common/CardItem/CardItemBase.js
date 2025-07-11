"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardItemBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CardItemDefine_1 = require("./CardItemDefine");
class CardItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ComponentsRegisterInfoByItem = [];
    this.ComponentsRegisterInfoByResourceId = [];
    this.S1 = new Map();
  }
  YS1() {
    this.OnRegisterCardComponent();
  }
  OnRegisterCardComponent() {}
  async OnBeforeStartAsync() {
    this.YS1();
    var e = [];
    for (const n of this.ComponentsRegisterInfoByItem) {
      var [t, r] = n;
      var t = this.zS1(t).CreateByActorAsync(r.GetOwner());
      e.push(t);
    }
    for (const o of this.ComponentsRegisterInfoByResourceId) {
      var [s, a, i] = o;
      var s = this.zS1(s).CreateByResourceIdAsync(a, i);
      e.push(s);
    }
    await Promise.all(e);
    await this.OnBeforeChildStartAsync();
  }
  zS1(e) {
    var t = this.GetComponent(e);
    if (t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "重复添加组件");
      }
    } else {
      t = new CardItemDefine_1.cardItemCreatorMap[e]();
      this.S1.set(e, t);
    }
    return t;
  }
  GetComponent(e) {
    return this.S1.get(e);
  }
  async OnBeforeChildStartAsync() {}
}
exports.CardItemBase = CardItemBase;
//# sourceMappingURL=CardItemBase.js.map