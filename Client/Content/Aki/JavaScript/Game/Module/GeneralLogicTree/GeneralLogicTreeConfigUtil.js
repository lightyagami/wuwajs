"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneralLogicTreeConfigUtil = undefined;
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const IQuest_1 = require("../../../UniverseEditor/Interface/IQuest");
const ModelManager_1 = require("../../Manager/ModelManager");
const configNodesFilter = {
  Action: true,
  ActionWithResult: true,
  ChildQuest: true,
  QuestFailed: true,
  ParallelSelect: true,
  Start: false,
  QuestSucceed: true,
  AlwaysTrue: false,
  AlwaysFalse: true,
  Sequence: true,
  Select: false,
  Condition: false,
  ConditionSelector: true,
  Repeater: false
};
class GeneralLogicTreeConfigUtil {
  static InitConfig(e, t) {
    var r = ue_1.KuroStaticLibrary.GetFilesRecursive(e, "*.json", true, false);
    for (let e = 0; e < r.Num(); e++) {
      var i;
      var s;
      var a = r.Get(e);
      if (ue_1.BlueprintPathsLibrary.FileExists(a) && (s = (i = "", puerts_1.$ref)(""), ue_1.KuroStaticLibrary.LoadFileToString(s, a), i = (0, puerts_1.$unref)(s))) {
        t(i);
      }
    }
  }
  static InitBehaviorNodeConfig(e, t, r) {
    let i = e.get(t);
    if (!i) {
      i = new Map();
      e.set(t, i);
    }
    e = (0, IQuest_1.flatBehaviorTree)(r);
    if (e) {
      i.clear();
      for (var [s, a] of e) {
        if (configNodesFilter[a.Type]) {
          i.set(s, a);
        }
      }
    }
  }
  static IsAlwaysFalseChildNode(e, t) {
    var r;
    return !!t && !!(r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e)) && !!(r = r.GetNodeConfig(t)) && (r.Type === "AlwaysFalse" || this.IsAlwaysFalseChildNode(e, r?.ParentNodeId));
  }
}
exports.GeneralLogicTreeConfigUtil = GeneralLogicTreeConfigUtil;
//# sourceMappingURL=GeneralLogicTreeConfigUtil.js.map