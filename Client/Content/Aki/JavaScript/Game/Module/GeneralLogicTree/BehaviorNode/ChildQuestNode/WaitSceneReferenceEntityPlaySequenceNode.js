"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitSceneReferenceEntityPlaySequenceNode = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TickBehaviorNode_1 = require("./TickBehaviorNode");
class WaitSceneReferenceEntityPlaySequenceNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments);
    this.wDe = 0;
    this.$Pe = "";
    this.YJc = false;
    this.PXt = undefined;
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.WaitUntilLevelSequenceReachMark && (this.wDe = e.EntityId, this.PXt = [this.wDe], this.$Pe = e.Mark, true);
  }
  OnStart(e) {
    super.OnStart(e);
    this.YJc = false;
  }
  OnTick(e) {
    var t;
    if (!this.YJc) {
      if ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.wDe))?.Entity?.Valid) {
        if (t = t.Entity.GetComponent(164)) {
          if (t.IsPlayToMarkFinished(this.$Pe)) {
            this.SubmitNode();
          }
        } else {
          this.RemoveTimer();
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("GeneralLogicTree", 18, "WaitSceneReferenceEntityPlaySequenceNode.OnTick:找不到实体身上的SceneItemReferenceComponent组件", ["treeConfigId", this.TreeConfigId], ["nodeId", this.NodeId], ["pbDataId", this.wDe]);
          }
        }
      }
    }
  }
  OnAfterSubmit(e) {
    super.OnAfterSubmit(e);
    this.YJc = e;
  }
}
exports.WaitSceneReferenceEntityPlaySequenceNode = WaitSceneReferenceEntityPlaySequenceNode;
//# sourceMappingURL=WaitSceneReferenceEntityPlaySequenceNode.js.map