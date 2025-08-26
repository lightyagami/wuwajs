"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardElementCountItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const CardElementItem_1 = require("./CardElementItem");
class CardElementCountItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.zeu = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.zeu = new CardElementItem_1.CardElementItem();
    await this.zeu.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(t, e = 0, r) {
    this.Pe = t;
    this.Hxt();
    this.d7s();
  }
  Hxt() {
    this.zeu.Refresh(this.Pe.ElementId);
    this.zeu.SetActive(this.Pe.ElementId !== 0);
  }
  d7s() {
    var t = this.Pe.Count.toString();
    var e = this.Pe.All.toString();
    this.GetText(1).SetText(StringUtils_1.StringUtils.Format("{0}/{1}", t, e));
  }
}
exports.CardElementCountItem = CardElementCountItem;
//# sourceMappingURL=CardElementCountItem.js.map