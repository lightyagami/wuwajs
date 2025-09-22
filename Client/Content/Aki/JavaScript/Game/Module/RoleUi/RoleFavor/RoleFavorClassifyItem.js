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
    this.vcd = undefined;
    this.ContentGenericLayout = undefined;
    this.ycd = [];
    this.Scd = () => {
      var t = new RoleFavorContentItem_1.RoleFavorContentItem();
      this.ycd.push(t);
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIText]];
  }
  OnStart() {
    this.ContentGenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.Scd);
  }
  OnBeforeDestroy() {
    this.vcd = undefined;
  }
  Refresh(t, e, i) {
    this.vcd = t;
    this.GridIndex = i;
    this.DisplayIndex = i;
    t = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(t, this.vcd.TitleTableId);
    i = this.vcd.GetContentDataList();
    this.ContentGenericLayout.RefreshByData(i);
  }
  GetContentItemList() {
    return this.ycd;
  }
}
exports.RoleFavorClassifyItem = RoleFavorClassifyItem;
//# sourceMappingURL=RoleFavorClassifyItem.js.map