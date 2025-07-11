"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventTriggerSpecificScanEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTriggerSpecificScanEffect extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.iQ1 = undefined;
  }
  ExecuteNew(e, r, o) {
    if (e) {
      if (e.ScanEffect.Type === 1) {
        this.iQ1 = this.rQ1(e.ScanEffect);
      }
      if (this.iQ1 === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 31, "获取ChargeSlash扫描特效的触发位置失败");
        }
      } else {
        (e = new UE.TransformDouble()).SetLocation(this.iQ1.ToUeVector());
        ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.StartChargeSlashScanEffect(e);
      }
    } else {
      this.Finish();
    }
  }
  rQ1(e) {
    var r;
    var e = e.TriggerPosEntityId;
    var o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (o) {
      r = Vector_1.Vector.Create();
      if (o = o.Transform?.Pos) {
        r.FromConfigVector(o);
      }
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 31, "获取ChargeSlash扫描特效的触发位置实体数据失败", ["pbDataId", e]);
    }
  }
}
exports.LevelEventTriggerSpecificScanEffect = LevelEventTriggerSpecificScanEffect;
//# sourceMappingURL=LevelEventTriggerSpecificScanEffect.js.map