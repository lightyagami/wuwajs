"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomViewItemDataBase = undefined;
class RoleDevPhantomViewItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.RoleTypeInternal = 0;
  }
  InitByRoleId(t, e) {
    this.RoleIdInternal = t;
    this.RoleTypeInternal = e;
    this.InitByRoleType(t);
  }
  get RoleId() {
    return this.RoleIdInternal;
  }
  get RoleType() {
    return this.RoleTypeInternal;
  }
  get SuitDataList() {
    return this.GetSuitDataList();
  }
  get IsRoleObtained() {
    return this.RoleType === 0;
  }
  get IsForecast() {
    return this.RoleType === 2;
  }
  get IsNotObtained() {
    return this.RoleType === 1;
  }
  RefreshByFetterGroupId(t) {
    this.RefreshSuitDataListByFetterGroupId(t);
  }
}
exports.RoleDevPhantomViewItemDataBase = RoleDevPhantomViewItemDataBase;
//# sourceMappingURL=RoleDevPhantomViewItemDataBase.js.map