"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyStateMeshDitherDetect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MeshDitherDetectConfig = undefined;
    this.MeshDitherDetectConfigId = -1;
  }
  Constructor() {
    this.MeshDitherDetectConfigId = -1;
  }
  K2_NotifyBegin(e, t, r) {
    var a;
    return !!this.MeshDitherDetectConfig && (e = e.GetOwner()) instanceof TsBaseCharacter_1.default && !!(a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId))?.Valid && !!(a = a.Entity.GetComponent(346))?.Valid && (this.MeshDitherDetectConfigId = a.EnableDetectDither(this.MeshDitherDetectConfig), Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 57, "[Mesh虚化检测]ANS开启角色Mesh检测并虚化", ["Name", e.GetName()]), true);
  }
  K2_NotifyEnd(e, t) {
    var r;
    return !!this.MeshDitherDetectConfig && (e = e.GetOwner()) instanceof TsBaseCharacter_1.default && !!(r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId))?.Valid && !!(r = r.Entity.GetComponent(346))?.Valid && (r.DisableDetectDither(this.MeshDitherDetectConfigId), Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 57, "[Mesh虚化检测]ANS关闭角色Mesh检测并虚化", ["Name", e.GetName()]), true);
  }
  GetNotifyName() {
    return "角色Mesh检测并虚化";
  }
}
exports.default = TsAnimNotifyStateMeshDitherDetect;
//# sourceMappingURL=TsAnimNotifyStateMeshDitherDetect.js.map