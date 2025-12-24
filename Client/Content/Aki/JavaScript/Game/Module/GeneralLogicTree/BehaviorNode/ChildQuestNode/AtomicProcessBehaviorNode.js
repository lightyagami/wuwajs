"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AtomicProcessBehaviorNode = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AsyncTask_1 = require("../../../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../../../World/Task/TaskSystem");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class AtomicProcessBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.gqm = () => {
      this.SubmitNode();
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && e.Condition.Type === IQuest_1.EChildQuest.AtomicProcess;
  }
  OnStart(e) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelFlowFinished, this.gqm);
    ControllerHolder_1.ControllerHolder.LevelFlowController.InitTaskTreeInfo(this.TreeIncId, this.NodeId);
    ControllerHolder_1.ControllerHolder.LevelFlowController.StartLevelFlow();
  }
  OnEnd(e) {
    if (e) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelFlowFinished, this.gqm);
    } else {
      this.uZf();
    }
  }
  uZf() {
    var e;
    if (!ModelManager_1.ModelManager.LevelFlowModel.IsEnd) {
      e = new AsyncTask_1.AsyncTask("LevelFlowPrepareRollback", async () => {
        const r = new CustomPromise_1.CustomPromise();
        ModelManager_1.ModelManager.LevelFlowModel.RollBackLevelFlow(e => {
          r.SetResult();
        });
        await r.Promise;
        return true;
      });
      TaskSystem_1.TaskSystem.AddTask(e);
    }
  }
}
exports.AtomicProcessBehaviorNode = AtomicProcessBehaviorNode;
//# sourceMappingURL=AtomicProcessBehaviorNode.js.map