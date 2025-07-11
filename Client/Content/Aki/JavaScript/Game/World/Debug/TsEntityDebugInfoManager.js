"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsEntityDebugInfoManager = undefined;
const UE = require("ue");
const EntityDebugUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/EntityDebugUtils");
class TsEntityDebugInfoManager extends UE.Object {
  Constructor() {}
  static GetInstance() {
    if (!this.Instance || !this.Instance.IsValid()) {
      this.Instance = UE.NewObject(UE.TsEntityDebugInfoManager_C.StaticClass());
    }
    return this.Instance;
  }
  GetDebugEntityNameList() {
    return EntityDebugUtils_1.EntityDebugUtils.GetDebugEntityNameList();
  }
  GetSelectedEntityId(t) {
    return EntityDebugUtils_1.EntityDebugUtils.GetSelectedEntityId(t);
  }
  GetEntityTimeScale(t) {
    return EntityDebugUtils_1.EntityDebugUtils.GetEntityTimeScale(t);
  }
  SetEntityTimeScale(t, e) {
    EntityDebugUtils_1.EntityDebugUtils.SetEntityTimeScale(t, e);
  }
  GetEntityPbDataId(t) {
    return EntityDebugUtils_1.EntityDebugUtils.GetEntityPbDataId(t);
  }
  GetInteractionDebugInfos(t) {
    return EntityDebugUtils_1.EntityDebugUtils.GetInteractionDebugInfos(t);
  }
  GetEntityCommonTagDebugString(t) {
    return EntityDebugUtils_1.EntityDebugUtils.GetEntityCommonTagDebugString(t);
  }
  GetDebugEntityActor(t) {
    return EntityDebugUtils_1.EntityDebugUtils.GetDebugEntityActor(t);
  }
  GetDebugBaseInfo(t) {
    return EntityDebugUtils_1.EntityDebugUtils.GetDebugBaseInfo(t);
  }
  GetDebugEntityName(t) {
    return EntityDebugUtils_1.EntityDebugUtils.GetDebugEntityName(t);
  }
}
exports.TsEntityDebugInfoManager = TsEntityDebugInfoManager;
exports.default = TsEntityDebugInfoManager; //# sourceMappingURL=TsEntityDebugInfoManager.js.map