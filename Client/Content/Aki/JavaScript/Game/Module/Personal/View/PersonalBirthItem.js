"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalBirthItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem");
const MIN_ALPHA = 0.5;
const MAX_ALPHA = 1;
class PersonalBirthItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments);
    this.Dates = undefined;
    this.kG = new UE.Vector(0);
    this.wst = undefined;
    this.q6e = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeDestroy() {
    this.wst = undefined;
  }
  RefreshItem() {
    this.wst = this.Dates[this.GetShowItemIndex()];
    this.GetText(0).SetText(String(this.wst));
  }
  SetData(t) {
    this.Dates = t;
  }
  OnMoveItem(t) {
    var i = this.GetAttachItem().ExhibitionView.ItemActor.GetHeight();
    var e = this.GetRootItem();
    var e = Math.abs(e.GetAnchorOffsetY()) / (i / 2);
    var i = MathUtils_1.MathUtils.Lerp(MAX_ALPHA, MIN_ALPHA, e);
    this.kG.X = 1;
    this.kG.Y = 1;
    this.kG.Z = 1;
    this.RootItem.SetUIItemScale(this.kG);
    this.GetText(0).SetAlpha(i);
  }
  BindOnSelected(t) {
    this.q6e = t;
  }
  OnSelect() {
    if (this.q6e) {
      this.q6e(this.wst);
    }
  }
}
exports.PersonalBirthItem = PersonalBirthItem;
//# sourceMappingURL=PersonalBirthItem.js.map