"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomPlotController = undefined;
const InstanceRandomPlotAll_1 = require("../../../Core/Define/ConfigQuery/InstanceRandomPlotAll");
const RandomPlotById_1 = require("../../../Core/Define/ConfigQuery/RandomPlotById");
const RandomPlotTriggerByTriggerGroupId_1 = require("../../../Core/Define/ConfigQuery/RandomPlotTriggerByTriggerGroupId");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelConditionRegistry_1 = require("../../LevelGamePlay/LevelConditions/LevelConditionRegistry");
const ModelManager_1 = require("../../Manager/ModelManager");
const RandomPlotItem_1 = require("./RandomPlotItem");
class RandomPlotController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
    var e = InstanceRandomPlotAll_1.configInstanceRandomPlotAll.GetConfigList();
    if (e) {
      var o = ModelManager_1.ModelManager.RandomPlotModel.InstanceTriggerGroupMap;
      for (const n of e) {
        var r = [];
        for (const t of n.ActiveTriggerGroupIdList) {
          r.push(t);
        }
        o.set(n.InstId, r);
      }
    }
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstanceChange, this.jUc);
    this.yJd();
    ModelManager_1.ModelManager.RandomPlotModel.RandomPlotMap.clear();
    ModelManager_1.ModelManager.RandomPlotModel.InstanceTriggerGroupMap.clear();
    return true;
  }
  static OnLeaveLevel() {
    ModelManager_1.ModelManager.RandomPlotModel.RandomPlotMap.clear();
    return true;
  }
  static PlayRandomPlot(e) {
    let o = ModelManager_1.ModelManager.RandomPlotModel.RandomPlotMap.get(e);
    if (!o) {
      var r = RandomPlotById_1.configRandomPlotById.GetConfig(e);
      if (!r) {
        return;
      }
      o = RandomPlotItem_1.RandomPlotItem.Create(r);
      ModelManager_1.ModelManager.RandomPlotModel.RandomPlotMap.set(e, o);
    }
    o.PlayRandomPlot();
  }
  static yJd() {
    var e = ModelManager_1.ModelManager.RandomPlotModel.InstanceConditionMap;
    if (e) {
      for (const o of e.values()) {
        LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(o.ConditionGroupId, o.Callback);
      }
      e.clear();
    }
    ModelManager_1.ModelManager.RandomPlotModel.InstanceConditionMap = undefined;
  }
}
exports.RandomPlotController = RandomPlotController;
(_a = RandomPlotController).jUc = (e, o) => {
  if (e !== o) {
    _a.yJd();
    e = ModelManager_1.ModelManager.RandomPlotModel.InstanceTriggerGroupMap.get(o);
    if (e && !(e.length <= 0)) {
      ModelManager_1.ModelManager.RandomPlotModel.InstanceConditionMap = new Map();
      var r = ModelManager_1.ModelManager.RandomPlotModel.InstanceConditionMap;
      for (const i of e) {
        var n = RandomPlotTriggerByTriggerGroupId_1.configRandomPlotTriggerByTriggerGroupId.GetConfigList(i);
        if (n) {
          for (const d of n) {
            var t;
            var a;
            var l = d.Id;
            if (!r.has(l)) {
              t = d.TriggerCondition;
              a = d.ResetCondition;
              a = new LevelConditionRegistry_1.ConditionPassCallback(_a.SJd, [d.RandomPlotId, a, l]);
              LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(t, a);
              r.set(l, {
                ConditionGroupId: t,
                Callback: a
              });
            }
          }
        }
      }
    }
  }
};
RandomPlotController.SJd = e => {
  var o;
  if (e && (o = e[0], _a.PlayRandomPlot(o), e[1]) && (o = ModelManager_1.ModelManager.RandomPlotModel.InstanceConditionMap?.get(e[2]))) {
    e = o.ConditionGroupId;
    o = o.Callback;
    LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(e, o);
    LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(e, o);
  }
}; //# sourceMappingURL=RandomPlotController.js.map