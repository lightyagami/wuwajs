"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TsDecoratorCoolDown extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.Id = 0;
    this.RandomCdTime = undefined;
    this.ReturnTrueFirstTime = false;
    this.IsInitTsVariables = false;
    this.TsId = 0;
    this.TsRandomCdTime = undefined;
    this.TsReturnTrueFirstTime = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsId = 0;
    this.TsRandomCdTime = undefined;
    this.TsReturnTrueFirstTime = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsId = this.Id;
      this.TsRandomCdTime = new MathUtils_1.FastUeFloatRange(this.RandomCdTime);
      this.TsReturnTrueFirstTime = this.ReturnTrueFirstTime;
    }
  }
  PerformConditionCheckAI(t, i) {
    var t = t.AiController;
    this.InitTsVariables();
    var s = ModelManager_1.ModelManager.GameModeModel.IsMulti ? TimeUtil_1.TimeUtil.GetServerTimeStamp() : Time_1.Time.WorldTime;
    let e = t.GetCoolDownTime(this.TsId);
    if (e === 0) {
      e = s + MathUtils_1.MathUtils.GetRandomRange(this.TsRandomCdTime.LowerBoundValue, this.TsRandomCdTime.UpperBoundValue);
      t.SetCoolDownTime(this.TsId, e, true, "行为树");
      return this.TsReturnTrueFirstTime;
    } else {
      return !(e > s) && !(e = s + MathUtils_1.MathUtils.GetRandomRange(this.TsRandomCdTime.LowerBoundValue, this.TsRandomCdTime.UpperBoundValue), t.SetCoolDownTime(this.TsId, e, true, "行为树"), 0);
    }
  }
}
exports.default = TsDecoratorCoolDown;
//# sourceMappingURL=TsDecoratorCoolDown.js.map