"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../GlobalData");
const TsAiController_1 = require("../../Controller/TsAiController");
const PROFILE_KEY = "TsDecoratorCheckInbound";
const MIN_CEHCK_TIME_INTERVAL = 200;
class TsDecoratorCheckInbound extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.SocketHeight = undefined;
    this.IsInitTsVariables = false;
    this.SocketHeightInternal = undefined;
    this.TsTraceElement = undefined;
    this.LastCheckResult = false;
    this.LastCheckTimeStamp = -0;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.SocketHeightInternal = undefined;
    this.TsTraceElement = undefined;
    this.LastCheckResult = false;
    this.LastCheckTimeStamp = -0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.LastCheckResult = true;
      this.LastCheckTimeStamp = 0;
      this.InitData();
    }
  }
  PerformConditionCheckAI(e, t) {
    if (!(e instanceof TsAiController_1.default)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    this.InitTraceElement();
    if (Time_1.Time.WorldTime < this.LastCheckTimeStamp + MIN_CEHCK_TIME_INTERVAL) {
      return this.LastCheckResult;
    }
    this.LastCheckTimeStamp = Time_1.Time.WorldTime;
    var i;
    var r;
    var o = e.AiController.CharActorComp.SkeletalMesh;
    var s = Vector_1.Vector.Create();
    let h = true;
    for ([i, r] of this.SocketHeightInternal) {
      s.FromUeVector(o.D_GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(i)));
      h = h && this.CheckInbound(s, r);
    }
    return this.LastCheckResult = h;
  }
  InitTraceElement() {
    if (!this.TsTraceElement) {
      this.TsTraceElement = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.TsTraceElement.bIsSingle = true;
      this.TsTraceElement.bIgnoreSelf = true;
      this.TsTraceElement.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    }
    this.TsTraceElement.WorldContextObject = this.GetWorld();
  }
  InitData() {
    if (!this.SocketHeightInternal) {
      this.SocketHeightInternal = new Map();
      var t = this.SocketHeight.Num();
      if (t > 0) {
        for (let e = 0; e < t; e++) {
          var i = this.SocketHeight.GetKey(e);
          var r = this.SocketHeight.Get(i);
          this.SocketHeightInternal.set(i, r);
        }
      }
    }
  }
  CheckInbound(e, t) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.TsTraceElement, e);
    var i = Vector_1.Vector.Create();
    Vector_1.Vector.DownVectorProxy.Multiply(t, i);
    i.AdditionEqual(e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.TsTraceElement, i);
    var t = TraceElementCommon_1.TraceElementCommon.LineTrace(this.TsTraceElement, PROFILE_KEY);
    return !!t && !!this.TsTraceElement.HitResult.bBlockingHit;
  }
}
exports.default = TsDecoratorCheckInbound;
//# sourceMappingURL=TsDecoratorCheckInbound.js.map