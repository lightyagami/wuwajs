"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalBirthAttachItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const MIN_ALPHA = 0.5;
const MAX_ALPHA = 1;
class PersonalBirthAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.kG = new UE.Vector(0);
    this.wst = 0;
    this.q6e = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeDestroy() {
    this.wst = undefined;
  }
  OnRefreshItem(t) {
    this.wst = t;
    this.GetText(0).SetText(String(this.wst));
  }
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    var t = MathUtils_1.MathUtils.Lerp(MAX_ALPHA, MIN_ALPHA, t);
    this.kG.X = 1;
    this.kG.Y = 1;
    this.kG.Z = 1;
    this.RootItem.SetUIItemScale(this.kG);
    this.GetText(0).SetAlpha(t);
  }
  BindOnSelected(t) {
    this.q6e = t;
  }
  OnSelect() {
    if (this.q6e) {
      this.q6e(this.wst);
    }
  }
  OnUnSelect() {}
}
exports.PersonalBirthAttachItem = PersonalBirthAttachItem;
//# sourceMappingURL=PersonalBirthAttachItem.js.map