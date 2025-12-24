"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDetailsFieldItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class PhantomArenaBattleDetailsFieldItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Proxy = undefined;
    this.eTt = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.eTt]];
  }
  Refresh(e) {}
  RegisterProxy(e) {
    this.Proxy = e;
  }
}
exports.PhantomArenaBattleDetailsFieldItem = PhantomArenaBattleDetailsFieldItem;
//# sourceMappingURL=PhantomArenaBattleDetailsFieldItem.js.map