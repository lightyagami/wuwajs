"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevPhantomData = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevPhantomDataUtils_1 = require("./RoleDevPhantomDataUtils");
const RoleDevPhantomViewItemDataBase_1 = require("./RoleDevPhantomViewItemDataBase");
class NotObtainedRoleDevPhantomData extends RoleDevPhantomViewItemDataBase_1.RoleDevPhantomViewItemDataBase {
  constructor() {
    super(...arguments);
    this.Mvd = [];
  }
  InitByRoleType(t) {
    var e;
    if (this.RoleDevViewModelInternal && !this.RoleDevViewModelInternal.CheckRoleIdIsCreated(this.RoleId)) {
      e = RoleDevPhantomDataUtils_1.RoleDevPhantomDataUtils.GetDefaultRecommendFetterGroupId(this.RoleId);
      this.RoleDevViewModelInternal.SetRoleRecommendFetterGroupId(this.RoleId, e);
    }
    this.RefreshSuitDataList();
  }
  GetSuitDataList() {
    return this.Mvd;
  }
  RefreshSuitDataList() {
    var t;
    var e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.RoleId);
    if (e && this.RoleDevViewModelInternal) {
      RoleDevPhantomDataUtils_1.RoleDevPhantomDataUtils.SortRecommendInfo(e);
      t = this.RoleDevViewModelInternal.GetRoleRecommendFetterGroupId(this.RoleId);
      this.Mvd = RoleDevPhantomDataUtils_1.RoleDevPhantomDataUtils.RefreshSuitDataListByRecommendInfo(this.RoleId, e, t);
    }
  }
}
exports.NotObtainedRoleDevPhantomData = NotObtainedRoleDevPhantomData;
//# sourceMappingURL=NotObtainedRoleDevPhantomData.js.map