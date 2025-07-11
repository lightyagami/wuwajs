"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardModel = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../GlobalData");
const CHECK_GROUND_PROFILE_KEY = "RewardModel_CheckGroundHit";
const CHECK_WATER_PROFILE_KEY = "RewardModel_CheckWaterHit";
class RewardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.vao = undefined;
    this.Mao = undefined;
  }
  koe() {
    this.vao = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.vao.WorldContextObject = GlobalData_1.GlobalData.World;
    this.vao.bIsSingle = true;
    this.vao.bIgnoreSelf = true;
    this.vao.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.Mao = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.Mao.WorldContextObject = GlobalData_1.GlobalData.World;
    this.Mao.bIsSingle = true;
    this.Mao.bIgnoreSelf = true;
    this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  CheckGroundHit(e, t, i) {
    if (!this.vao) {
      this.koe();
    }
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.vao, e);
    this.vao.SetEndLocation(e.X, e.Y, e.Z + i);
    this.vao.Radius = t;
    let r = false;
    e = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.vao, CHECK_GROUND_PROFILE_KEY);
    return r = e && this.vao.HitResult.bBlockingHit ? true : r;
  }
  CheckWaterHit(e, t, i, r) {
    if (!this.Mao) {
      this.koe();
    }
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, e);
    this.Mao.SetEndLocation(t.X, t.Y, t.Z - i);
    let s = false;
    e = TraceElementCommon_1.TraceElementCommon.LineTrace(this.Mao, CHECK_WATER_PROFILE_KEY);
    return s = e && this.Mao.HitResult.bBlockingHit ? true : s;
  }
}
exports.RewardModel = RewardModel;
//# sourceMappingURL=RewardModel.js.map