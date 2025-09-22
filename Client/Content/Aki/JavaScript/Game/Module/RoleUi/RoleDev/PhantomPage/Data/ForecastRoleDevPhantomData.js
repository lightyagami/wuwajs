"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevPhantomData = undefined;
const RoleDevPhantomDataUtils_1 = require("./RoleDevPhantomDataUtils");
const RoleDevPhantomViewItemDataBase_1 = require("./RoleDevPhantomViewItemDataBase");
class ForecastRoleDevPhantomData extends RoleDevPhantomViewItemDataBase_1.RoleDevPhantomViewItemDataBase {
  constructor() {
    super(...arguments);
    this.tCd = [];
  }
  InitByRoleType(t) {
    this.iCd();
  }
  GetSuitDataList() {
    return this.tCd;
  }
  RefreshSuitDataListByFetterGroupId(t) {
    this.tCd = RoleDevPhantomDataUtils_1.RoleDevPhantomDataUtils.RefreshSuitDataListByFetterGroupId(this.RoleId, t);
  }
  iCd() {
    this.tCd = [];
  }
}
exports.ForecastRoleDevPhantomData = ForecastRoleDevPhantomData;
//# sourceMappingURL=ForecastRoleDevPhantomData.js.map