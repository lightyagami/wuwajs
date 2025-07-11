"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardCheckComponent = undefined;
const UE = require("ue");
const CardComponentBase_1 = require("../CardComponentBase");
class CardCheckComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this._V1 = undefined;
    this.OnCheckBtnClick = () => {
      this._V1?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.OnCheckBtnClick]];
  }
  Refresh(e) {
    this.Data = e;
    this.RefreshLeftCount();
    this._V1 = e.OnCheckBtnClick;
  }
  RefreshLeftCount() {
    this.GetText(0).SetText(this.Data.LeftCount + "/" + this.Data.MaxCount);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.GetButton(1)?.RootUIComp;
    if (t) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.CardCheckComponent = CardCheckComponent;
//# sourceMappingURL=CardCheckComponent.js.map