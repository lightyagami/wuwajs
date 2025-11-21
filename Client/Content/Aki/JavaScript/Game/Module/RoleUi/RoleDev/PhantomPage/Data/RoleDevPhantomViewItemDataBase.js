"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomViewItemDataBase = undefined;
class RoleDevPhantomViewItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.RoleTypeInternal = 0;
    this.RoleDevViewModelInternal = undefined;
  }
  InitByRoleId(t, e, s) {
    this.RoleIdInternal = t;
    this.RoleTypeInternal = e;
    this.RoleDevViewModelInternal = s;
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
  get RoleDevViewModel() {
    return this.RoleDevViewModelInternal;
  }
}
exports.RoleDevPhantomViewItemDataBase = RoleDevPhantomViewItemDataBase;
//# sourceMappingURL=RoleDevPhantomViewItemDataBase.js.map