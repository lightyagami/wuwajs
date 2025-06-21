"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardElementCountItem = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  CardElementItem_1 = require("./CardElementItem");
class CardElementCountItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.AZ1 = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    this.AZ1 = new CardElementItem_1.CardElementItem, await this.AZ1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
  }
  Refresh(t, e = 0, r) {
    this.Pe = t, this.Hxt(), this.d7s()
  }
  Hxt() {
    this.AZ1.Refresh(this.Pe.ElementId), this.AZ1.SetActive(0 !== this.Pe.ElementId)
  }
  d7s() {
    var t = this.Pe.Count.toString(),
      e = this.Pe.All.toString();
    this.GetText(1).SetText(StringUtils_1.StringUtils.Format("{0}/{1}", t, e))
  }
}
exports.CardElementCountItem = CardElementCountItem;
//# sourceMappingURL=CardElementCountItem.js.map