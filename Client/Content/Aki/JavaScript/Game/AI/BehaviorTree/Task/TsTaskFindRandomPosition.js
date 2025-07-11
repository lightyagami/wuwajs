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
class TsTaskFindRandomPosition extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.StartPositionOffset = undefined;
    this.MinRange = 0;
    this.MaxRange = 0;
    this.UseFullRange = false;
    this.SaveBlackBoardKey = "";
    this.IsInitTsVariables = false;
    this.TsStartPositionOffset = undefined;
    this.TsMinRange = 0;
    this.TsMaxRange = 0;
    this.TsUseFullRange = false;
    this.TsSaveBlackBoardKey = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsStartPositionOffset = undefined;
    this.TsMinRange = 0;
    this.TsMaxRange = 0;
    this.TsUseFullRange = false;
    this.TsSaveBlackBoardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsStartPositionOffset = Vector_1.Vector.Create(this.StartPositionOffset);
      this.TsMinRange = this.MinRange;
      this.TsMaxRange = this.MaxRange;
      this.TsUseFullRange = this.UseFullRange;
      this.TsSaveBlackBoardKey = this.SaveBlackBoardKey;
    }
  }
  ReceiveExecuteAI(t, s) {
    this.InitTsVariables();
    var i;
    var e = t.AiController;
    if (e) {
      e = e.CharActorComp;
      if (this.TsSaveBlackBoardKey) {
        i = this.CalculateTargetPosition(e);
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(e.Entity.Id, this.TsSaveBlackBoardKey, i.X, i.Y, i.Z);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  CalculateTargetPosition(t) {
    var s = t.ActorLocationProxy;
    var t = t.ActorForwardProxy;
    var i = MathUtils_1.MathUtils.GetRandomFloatNumber(0, MathUtils_1.PI_DEG_DOUBLE);
    var t = Vector_1.Vector.Create(t);
    t.RotateAngleAxis(i, Vector_1.Vector.UpVectorProxy, t);
    var i = Vector_1.Vector.Create(this.TsStartPositionOffset);
    i.AdditionEqual(s);
    var s = t.MultiplyEqual(this.TsUseFullRange ? this.TsMaxRange : MathUtils_1.MathUtils.GetRandomFloatNumber(this.TsMinRange, this.TsMaxRange));
    return i.AdditionEqual(s);
  }
}
exports.default = TsTaskFindRandomPosition;
//# sourceMappingURL=TsTaskFindRandomPosition.js.map