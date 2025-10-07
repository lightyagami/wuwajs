"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevPhantomData = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevPhantomDataUtils_1 = require("./RoleDevPhantomDataUtils");
const RoleDevPhantomViewItemDataBase_1 = require("./RoleDevPhantomViewItemDataBase");
class ObtainedRoleDevPhantomData extends RoleDevPhantomViewItemDataBase_1.RoleDevPhantomViewItemDataBase {
  constructor() {
    super(...arguments);
    this.tCd = [];
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
    return this.tCd;
  }
  RefreshSuitDataList() {
    var t;
    var e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.RoleId);
    if (e && this.RoleDevViewModelInternal) {
      RoleDevPhantomDataUtils_1.RoleDevPhantomDataUtils.SortRecommendInfo(e);
      t = this.RoleDevViewModelInternal.GetRoleRecommendFetterGroupId(this.RoleId);
      this.tCd = RoleDevPhantomDataUtils_1.RoleDevPhantomDataUtils.RefreshSuitDataListByRecommendInfo(this.RoleId, e, t);
    }
  }
}
exports.ObtainedRoleDevPhantomData = ObtainedRoleDevPhantomData;
//# sourceMappingURL=ObtainedRoleDevPhantomData.js.map