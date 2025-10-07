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
  InitByRoleType(e) {
    this.iCd();
  }
  GetSuitDataList() {
    return this.tCd;
  }
  RefreshSuitDataListByFetterGroupId(e) {
    this.tCd = RoleDevPhantomDataUtils_1.RoleDevPhantomDataUtils.RefreshSuitDataListByFetterGroupId(this.RoleId, e);
  }
  iCd() {
    var e = ModelManager_1.ModelManager.VisionRecommendModel?.GetRoleFetterRecommendInfo(this.RoleId);
    this.tCd = RoleDevPhantomDataUtils_1.RoleDevPhantomDataUtils.RefreshSuitDataListByRecommendInfo(this.RoleId, e ?? []);
  }
}
exports.ObtainedRoleDevPhantomData = ObtainedRoleDevPhantomData;
//# sourceMappingURL=ObtainedRoleDevPhantomData.js.map