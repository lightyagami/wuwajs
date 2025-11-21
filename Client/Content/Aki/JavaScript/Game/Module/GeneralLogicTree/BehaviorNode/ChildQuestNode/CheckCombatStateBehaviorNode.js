"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckCombatStateBehaviorNode = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TickBehaviorNode_1 = require("./TickBehaviorNode");
class CheckCombatStateBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments);
    this.UXt = 0;
    this.AXt = 0;
    this.PXt = [];
    this.Foa = true;
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.DetectCombatState && !(this.AXt = e.EntityId, this.PXt = [e.EntityId], this.AXt ? (this.UXt = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State), this.UXt ? (this.Foa = e.Compare !== "Ne", 0) : (Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "行为树检测的GameplayTag不存在", ["tag", e.State]), 1)) : (Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "行为树检测实体的GameplayTag时，实体不存在"), 1));
  }
  OnTick() {
    if (!this.Submitting && this.UXt) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.AXt);
      if (t?.IsInit) {
        let e = t.Entity.GetComponent(209);
        if (e = e || t.Entity.GetComponent(200)) {
          if (e.HasTag(this.UXt)) {
            if (this.Foa) {
              this.SubmitNode();
            }
          } else if (!this.Foa) {
            this.SubmitNode();
          }
        }
      }
    }
  }
}
exports.CheckCombatStateBehaviorNode = CheckCombatStateBehaviorNode;
//# sourceMappingURL=CheckCombatStateBehaviorNode.js.map