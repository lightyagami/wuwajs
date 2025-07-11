"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../Controller/TsAiController");
const MAX_ERROR = 10;
class TsDecoratorBlackboardDistanceCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CompareType = 0;
    this.OtherLocationKey = "";
    this.CompareValue = 0;
    this.LocationCache = Vector_1.Vector.Create();
    this.OtherLocationCache = Vector_1.Vector.Create();
    this.IsInitTsVariables = false;
    this.TsCompareType = 0;
    this.TsOtherLocationKey = "";
    this.TsCompareValue = 0;
  }
  Constructor() {
    this.LocationCache = Vector_1.Vector.Create();
    this.OtherLocationCache = Vector_1.Vector.Create();
    this.IsInitTsVariables = false;
    this.TsCompareType = 0;
    this.TsOtherLocationKey = "";
    this.TsCompareValue = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsCompareType = this.CompareType;
      this.TsOtherLocationKey = this.OtherLocationKey;
      this.TsCompareValue = this.CompareValue;
      this.LocationCache = Vector_1.Vector.Create();
      this.OtherLocationCache = Vector_1.Vector.Create();
    }
  }
  PerformConditionCheckAI(r, t) {
    if (!(r instanceof TsAiController_1.default)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", r.GetClass().GetName()]);
      }
      return false;
    }
    var e = r.GetEntity();
    if (!e) {
      return false;
    }
    this.InitTsVariables();
    var s = r.AiController.CharActorComp;
    this.LocationCache.DeepCopy(s.ActorLocationProxy);
    if (this.TsOtherLocationKey) {
      e = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(e.Id, this.TsOtherLocationKey);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 29, "不存在BlackboardKey", ["Key", this.TsOtherLocationKey], ["Tree", this.TreeAsset?.GetName()]);
        }
        return false;
      }
      this.OtherLocationCache.DeepCopy(e);
    } else {
      e = s.CreatureData.GetInitLocation();
      if (!e) {
        return false;
      }
      this.OtherLocationCache.DeepCopy(e);
    }
    if (!this.LocationCache || !this.OtherLocationCache) {
      return false;
    }
    var i = Vector_1.Vector.DistSquared(this.LocationCache, this.OtherLocationCache);
    var o = this.TsCompareValue * this.TsCompareValue;
    switch (this.TsCompareType) {
      case 0:
        return Math.abs(i - o) <= MAX_ERROR;
      case 1:
        return Math.abs(i - o) > MAX_ERROR;
      case 2:
        return i < o;
      case 3:
        return i <= o;
      case 4:
        return o < i;
      case 5:
        return o <= i;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 29, "不支持的比较类型", ["Type", r.GetClass().GetName()]);
        }
        return false;
    }
  }
}
exports.default = TsDecoratorBlackboardDistanceCompare;
//# sourceMappingURL=TsDecoratorBlackboardDistanceCompare.js.map