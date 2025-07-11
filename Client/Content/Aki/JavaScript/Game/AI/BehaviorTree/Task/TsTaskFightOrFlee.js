"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskFightOrFlee extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.FightOrFlee = "";
    this.IsInitTsVariables = false;
    this.TsFightOrFlee = "";
    this.FightProbability = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsFightOrFlee = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsFightOrFlee = this.FightOrFlee;
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var r = e.AiController;
    if (r) {
      var r = r.CharActorComp;
      var s = r.Entity.Id;
      if (!this.FightProbability) {
        var r = r.CreatureData;
        var i = r.GetPbEntityInitData().ComponentsData;
        var i = (0, IComponent_1.getComponent)(i, "AnimalComponent");
        if (!i || i.AnimalAttackRange === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 29, "缺少战斗概率配置", ["EntityConfigId", r.GetPbDataId()]);
          }
          this.FinishExecute(false);
          return;
        }
        this.FightProbability = i.AnimalAttackRange;
      }
      r = MathUtils_1.MathUtils.GetRandomRange(0, 100) < this.FightProbability;
      ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(s, this.TsFightOrFlee, r);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskFightOrFlee;
//# sourceMappingURL=TsTaskFightOrFlee.js.map