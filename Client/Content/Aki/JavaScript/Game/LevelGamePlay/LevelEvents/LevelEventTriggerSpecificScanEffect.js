"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventTriggerSpecificScanEffect = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTriggerSpecificScanEffect extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), this.vW1 = void 0
  }
  ExecuteNew(e, r, o) {
    e ? (1 === e.ScanEffect.Type && (this.vW1 = this.yW1(e.ScanEffect)), void 0 === this.vW1 ? Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "获取ChargeSlash扫描特效的触发位置失败") : ((e = new UE.TransformDouble).SetLocation(this.vW1.ToUeVector()), ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.StartChargeSlashScanEffect(e))) : this.Finish()
  }
  yW1(e) {
    var r, e = e.TriggerPosEntityId,
      o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (o) return r = Vector_1.Vector.Create(), (o = o.Transform?.Pos) && r.FromConfigVector(o), r;
    Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "获取ChargeSlash扫描特效的触发位置实体数据失败", ["pbDataId", e])
  }
}
exports.LevelEventTriggerSpecificScanEffect = LevelEventTriggerSpecificScanEffect;
//# sourceMappingURL=LevelEventTriggerSpecificScanEffect.js.map