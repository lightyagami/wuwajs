"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AwakeAndLoadEntityNode = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController");
const TickBehaviorNode_1 = require("./TickBehaviorNode");
class AwakeAndLoadEntityNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments);
    this.fLe = undefined;
    this.GAc = 0;
    this.lQa = e => {
      this.GAc = e ? 2 : 0;
    };
  }
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.AwakeAndLoadEntity && (this.fLe = e.EntityIds, this.IntervalTime = 1000, true);
  }
  OnTick() {
    if (this.GAc === 0) {
      if (this.fLe && this.fLe.length !== 0) {
        for (const t of this.fLe) {
          if (ModelManager_1.ModelManager.CreatureModel.GetEntityData(t)) {
            var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
            if (e) {
              if (!e.IsInit) {
                return;
              }
              var r = e.Entity.GetComponent(157);
              if (r && !r.LoadingBaseConfigFinish) {
                return;
              }
              r = e.Entity.GetComponent(203);
              if (r && r.CreatureData.GetVisible() && !r.GetIsSceneInteractionLoadCompleted()) {
                return;
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Entity", 18, "GeneralLogicTree.AwakeAndLoadEntityNode AOI范围外的实体", ["TreeConfigId", this.TreeConfigId], ["NodeId", this.NodeId], ["pbDataId", t]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 18, "GeneralLogicTree.AwakeAndLoadEntityNode 找不到实体配置", ["entityId", t]);
          }
        }
      }
      this._Qa();
    }
  }
  _Qa() {
    if (!this.Blackboard.ContainTag(6) && !this.Blackboard.IsSuspend()) {
      this.uQa();
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestSubmitAwakeAndLoadEntityNode(this.Context, this.lQa);
    }
  }
  uQa() {
    this.GAc = 1;
  }
}
exports.AwakeAndLoadEntityNode = AwakeAndLoadEntityNode;
//# sourceMappingURL=AwakeAndLoadEntityNode.js.map