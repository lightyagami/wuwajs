"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevPhantomData = undefined;
const RoleDevPhantomViewItemDataBase_1 = require("./RoleDevPhantomViewItemDataBase");
class ForecastRoleDevPhantomData extends RoleDevPhantomViewItemDataBase_1.RoleDevPhantomViewItemDataBase {
  constructor() {
    super(...arguments);
    this.tCd = [];
  }
  InitByRoleType(e) {
    this.RefreshSuitDataList();
  }
  GetSuitDataList() {
    return this.tCd;
  }
  RefreshSuitDataList() {
    this.tCd = [];
  }
}
exports.ForecastRoleDevPhantomData = ForecastRoleDevPhantomData;
//# sourceMappingURL=ForecastRoleDevPhantomData.js.map