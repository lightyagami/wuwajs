"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskDailyTask = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
const DEFAULT_TASK_ID = "0";
class SkipTaskDailyTask extends SkipTask_1.SkipTask {
  OnRun(a) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10023005)) {
      let r = undefined;
      var l = ModelManager_1.ModelManager.DailyTaskModel.GetAllDailyQuest();
      if (a !== DEFAULT_TASK_ID) {
        r = l.get(parseInt(a))?.TreeId;
      } else {
        let o = new Map();
        l.forEach(e => {
          var r = e.TreeId;
          var a = e.GetCurrentActiveChildQuestNode();
          if (a) {
            e = e.GetTrackDistance(a.NodeId);
            o.set(e, r);
          }
        });
        o = new Map([...o.entries()].sort((e, r) => e[0] - r[0]));
        r = o.values().next().value;
      }
      a = ModelManager_1.ModelManager.MapModel.GetAllDynamicMarks().get(12);
      if (a) {
        let e = undefined;
        for (const o of a.values()) {
          if (o.TreeId === r) {
            e = o;
            break;
          }
        }
        if (e) {
          l = {
            MarkId: e.MarkId,
            MarkType: 12,
            OpenFogId: 0
          };
          WorldMapController_1.WorldMapController.OpenView(2, false, l);
          this.Finish();
        }
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
    }
  }
}
exports.SkipTaskDailyTask = SkipTaskDailyTask;
//# sourceMappingURL=SkipTaskDailyTask.js.map