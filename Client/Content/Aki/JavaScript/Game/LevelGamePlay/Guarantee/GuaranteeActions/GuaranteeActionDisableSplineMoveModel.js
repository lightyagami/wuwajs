"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionDisableSplineMoveModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Global_1 = require("../../../Global");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionDisableSplineMoveModel extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(o) {
    if (o) {
      var a = o.Config;
      let e = undefined;
      switch (a.Target.Type) {
        case "Triggered":
          break;
        case "Player":
          if (!Global_1.Global.BaseCharacter?.IsValid()) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 18, "EnableSplineMoveModel.BaseCharacter InValid", ["Type", a.Target.Type]);
            }
            return;
          }
          e = Global_1.Global.BaseCharacter.GetEntityNoBlueprint();
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel不接受此对象类型", ["Type", a.Target.Type]);
          }
          return;
      }
      o = e?.GetComponent(115);
      if (o?.Valid) {
        o.EndSplineMove(a.SplineEntityId);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 18, "EnableSplineMoveModel保底行为执行失败，参数错误");
    }
  }
}
exports.GuaranteeActionDisableSplineMoveModel = GuaranteeActionDisableSplineMoveModel;
//# sourceMappingURL=GuaranteeActionDisableSplineMoveModel.js.map