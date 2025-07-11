"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const PI = 3.14;
class TsTaskFindPositionInRange extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.RangeCenterKey = "";
    this.RangeRadius = 0;
    this.BlackboardKey = "";
    this.IsInitTsVariables = false;
    this.TsRangeCenterKey = "";
    this.TsRangeRadius = 0;
    this.TsBlackboardKey = "";
    this.RangeCenter = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsRangeCenterKey = "";
    this.TsRangeRadius = 0;
    this.TsBlackboardKey = "";
    this.RangeCenter = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsRangeCenterKey = this.RangeCenterKey;
      this.TsRangeRadius = this.RangeRadius;
      this.TsBlackboardKey = this.BlackboardKey;
    }
  }
  ReceiveExecuteAI(t, e) {
    this.InitTsVariables();
    var s = t.AiController;
    if (s) {
      s = s.CharActorComp;
      if (s?.Valid) {
        var s = s.Entity;
        var i = s.Id;
        if (this.TsRangeCenterKey) {
          var r = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(i, this.TsRangeCenterKey);
          if (!r) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("BehaviorTree", 29, "不存在BlackboardKey", ["Key", this.TsRangeCenterKey]);
            }
            this.FinishExecute(false);
            return;
          }
          this.RangeCenter = Vector_1.Vector.Create(r);
        } else {
          r = s.GetComponent(0).GetInitLocation();
          this.RangeCenter = Vector_1.Vector.Create(r.X, r.Y, r.Z);
        }
        s = Vector_1.Vector.Create();
        r = this.RandomPointInCircle(this.TsRangeRadius);
        s.X = this.RangeCenter.X + r.X;
        s.Y = this.RangeCenter.Y + r.Y;
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(i, this.TsBlackboardKey, s.X, s.Y, s.Z);
        this.FinishExecute(true);
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  RandomPointInCircle(t) {
    var e;
    if (t <= 0) {
      return {
        X: 0,
        Y: 0
      };
    } else {
      t = MathUtils_1.MathUtils.GetRandomRange(0, t * t);
      e = MathUtils_1.MathUtils.GetRandomRange(0, PI * 2);
      return {
        X: (t = Math.sqrt(t)) * Math.cos(e),
        Y: t * Math.sin(e)
      };
    }
  }
}
exports.default = TsTaskFindPositionInRange;
//# sourceMappingURL=TsTaskFindPositionInRange.js.map