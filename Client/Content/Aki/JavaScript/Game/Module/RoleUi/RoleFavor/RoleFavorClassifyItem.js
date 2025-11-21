"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorClassifyItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleFavorContentItem_1 = require("./RoleFavorContentItem");
class RoleFavorClassifyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.mcd = undefined;
    this.ContentGenericLayout = undefined;
    this.fcd = [];
    this.gcd = () => {
      var t = new RoleFavorContentItem_1.RoleFavorContentItem();
      this.fcd.push(t);
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIText]];
  }
  OnStart() {
    this.ContentGenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.gcd);
  }
  OnBeforeDestroy() {
    this.mcd = undefined;
  }
  Refresh(t, e, i) {
    this.mcd = t;
    this.GridIndex = i;
    this.DisplayIndex = i;
    t = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(t, this.mcd.TitleTableId);
    i = this.mcd.GetContentDataList();
    this.ContentGenericLayout.RefreshByData(i);
  }
  GetContentItemList() {
    return this.fcd;
  }
}
exports.RoleFavorClassifyItem = RoleFavorClassifyItem;
//# sourceMappingURL=RoleFavorClassifyItem.js.map