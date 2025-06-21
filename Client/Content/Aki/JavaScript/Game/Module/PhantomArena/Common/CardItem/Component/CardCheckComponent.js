"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardCheckComponent = void 0;
const UE = require("ue"),
  CardComponentBase_1 = require("../CardComponentBase");
class CardCheckComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments), this.Data = void 0, this.D41 = void 0, this.OnCheckBtnClick = () => {
      this.D41?.()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [1, this.OnCheckBtnClick]
    ]
  }
  Refresh(e) {
    this.Data = e, this.RefreshLeftCount(), this.D41 = e.OnCheckBtnClick
  }
  RefreshLeftCount() {
    this.GetText(0).SetText(this.Data.LeftCount + "/" + this.Data.MaxCount)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.GetButton(1)?.RootUIComp;
    return t ? [t, t] : void 0
  }
}
exports.CardCheckComponent = CardCheckComponent;
//# sourceMappingURL=CardCheckComponent.js.map