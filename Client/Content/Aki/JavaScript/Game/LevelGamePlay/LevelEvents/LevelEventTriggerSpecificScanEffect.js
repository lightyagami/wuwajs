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
      this.iQ1 = this.yjd(e.ScanEffect);
      if (this.iQ1 === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 31, "获取ChargeSlash扫描特效的触发位置失败");
        }
      } else {
        var t = new UE.TransformDouble();
        t.SetLocation(this.iQ1.ToUeVector());
        switch (e.ScanEffect.Type) {
          case 1:
            ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.StartChargeSlashScanEffect(t);
            break;
          case 2:
            ControllerHolder_1.ControllerHolder.FlyingFeatherController.StartFlyingFeatherScanEffect(t);
        }
      }
    } else {
      this.Finish();
    }
  }
  yjd(e) {
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