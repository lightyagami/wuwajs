"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardItemBase = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CardItemDefine_1 = require("./CardItemDefine");
class CardItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ComponentsRegisterInfoByItem = [], this.ComponentsRegisterInfoByResourceId = [], this.S1 = new Map
  }
  bS1() {
    this.OnRegisterCardComponent()
  }
  OnRegisterCardComponent() {}
  async OnBeforeStartAsync() {
    this.bS1();
    var e = [];
    for (const n of this.ComponentsRegisterInfoByItem) {
      var [t, r] = n, t = this.RS1(t).CreateByActorAsync(r.GetOwner());
      e.push(t)
    }
    for (const o of this.ComponentsRegisterInfoByResourceId) {
      var [s, a, i] = o, s = this.RS1(s).CreateByResourceIdAsync(a, i);
      e.push(s)
    }
    await Promise.all(e), await this.OnBeforeChildStartAsync()
  }
  RS1(e) {
    var t = this.GetComponent(e);
    return t ? Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "重复添加组件") : (t = new CardItemDefine_1.cardItemCreatorMap[e], this.S1.set(e, t)), t
  }
  GetComponent(e) {
    return this.S1.get(e)
  }
  async OnBeforeChildStartAsync() {}
}
exports.CardItemBase = CardItemBase;
//# sourceMappingURL=CardItemBase.js.map