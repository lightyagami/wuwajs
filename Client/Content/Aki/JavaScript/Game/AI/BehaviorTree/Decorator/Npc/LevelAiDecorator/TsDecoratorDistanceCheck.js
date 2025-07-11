"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../../../Global");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SELF_TOKEN_ID = -1;
const PLAYER_TOKEN_ID = -2;
class TsDecoratorDistanceCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckType = 0;
    this.SourcePbDataId = 0;
    this.TargetPbDataId = 0;
    this.Distance = 0;
    this.IgnoreZ = false;
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsSourcePbDataId = 0;
    this.TsTargetPbDataId = 0;
    this.TsDistance = 0;
    this.TsIgnoreZ = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsSourcePbDataId = 0;
    this.TsTargetPbDataId = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsCheckType = this.CheckType;
      this.TsSourcePbDataId = this.SourcePbDataId;
      this.TsTargetPbDataId = this.TargetPbDataId;
      this.TsDistance = this.Distance;
      this.TsIgnoreZ = this.IgnoreZ;
    }
  }
  PerformConditionCheckAI(t, e) {
    var s = t.AiController;
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    t = this.GetActorCompByConfig(this.TsSourcePbDataId, s);
    s = this.GetActorCompByConfig(this.TsTargetPbDataId, s);
    if (!t || !s) {
      return false;
    }
    var r = this.TsIgnoreZ ? Vector_1.Vector.Dist2D(t.ActorLocationProxy, s.ActorLocationProxy) : Vector_1.Vector.Dist(t.ActorLocationProxy, s.ActorLocationProxy);
    switch (this.TsCheckType) {
      case 0:
        return r === this.TsDistance;
      case 1:
        return r !== this.TsDistance;
      case 2:
        return r < this.TsDistance;
      case 3:
        return r <= this.TsDistance;
      case 4:
        return r > this.TsDistance;
      case 5:
        return r >= this.TsDistance;
      default:
        return false;
    }
  }
  GetActorCompByConfig(t, e) {
    switch (t) {
      case 0:
        return;
      case SELF_TOKEN_ID:
        return e?.CharActorComp;
      case PLAYER_TOKEN_ID:
        return Global_1.Global.BaseCharacter?.CharacterActorComponent;
      default:
        return ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.TsTargetPbDataId)?.Entity?.GetComponent(1);
    }
  }
}
exports.default = TsDecoratorDistanceCheck;
//# sourceMappingURL=TsDecoratorDistanceCheck.js.map