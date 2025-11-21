"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevPhantomData = undefined;
const RoleDevPhantomViewItemDataBase_1 = require("./RoleDevPhantomViewItemDataBase");
class ForecastRoleDevPhantomData extends RoleDevPhantomViewItemDataBase_1.RoleDevPhantomViewItemDataBase {
  constructor() {
    super(...arguments);
    this.Mvd = [];
  }
  InitByRoleType(e) {
    this.RefreshSuitDataList();
  }
  GetSuitDataList() {
    return this.Mvd;
  }
  RefreshSuitDataList() {
    this.Mvd = [];
  }
}
exports.ForecastRoleDevPhantomData = ForecastRoleDevPhantomData;
//# sourceMappingURL=ForecastRoleDevPhantomData.js.map