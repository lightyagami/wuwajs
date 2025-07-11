"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonBaseCardItem = undefined;
const UE = require("ue");
const CardItemBase_1 = require("../CardItemBase");
class CommonBaseCardItem extends CardItemBase_1.CardItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIItem], [13, UE.UIItem]];
  }
  GetCardRootItem() {
    return this.GetItem(0);
  }
  GetContentRootItem() {
    return this.GetItem(2);
  }
  GetSpineRootItem() {
    return this.GetItem(13);
  }
}
exports.CommonBaseCardItem = CommonBaseCardItem;
//# sourceMappingURL=CommonBaseCardItem.js.map