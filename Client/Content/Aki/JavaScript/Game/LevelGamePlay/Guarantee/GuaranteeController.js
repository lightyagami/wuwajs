"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GuaranteeController = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine"),
  GuaranteeActionCenter_1 = require("./GuaranteeActionCenter");
class GuaranteeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddGuaranteeAction, this.rIe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemGuaranteeAction, this.nIe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.ExecSceneGuaranteeActions), !0
  }
  static OnClear() {
    return EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddGuaranteeAction, this.rIe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemGuaranteeAction, this.nIe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.ExecSceneGuaranteeActions), !0
  }
  static ExecuteActions(e, t) {
    if (t)
      for (const o of e) {
        var n = o.Name,
          r = GuaranteeActionCenter_1.GuaranteeActionCenter.GetGuaranteeAction(n);
        r && (Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 39, "执行保底行为：", ["actionName", n], ["ActionInfo", o]), r.Execute(o, t))
      }
  }
}
exports.GuaranteeController = GuaranteeController, (_a = GuaranteeController).ExecSceneGuaranteeActions = () => {
  var e = ModelManager_1.ModelManager.LevelGeneralModel?.RemoveSceneGuaranteeActionInfos();
  e && 0 < e.length && (e = e.reverse(), _a.ExecuteActions(e, LevelGeneralContextDefine_1.GuaranteeContext.Create()), Log_1.Log.CheckInfo()) && Log_1.Log.Info("LevelEvent", 39, "场景保底行为已全部完成", ["保底行为列表", e])
}, GuaranteeController.rIe = (e, t, n, r = !1) => {
  _a.aIe(e, t, !0, n, r)
}, GuaranteeController.nIe = (e, t, n, r = !1) => {
  _a.aIe(e, t, !1, n, r)
}, GuaranteeController.aIe = (e, t, n, r, o) => {
  var a;
  t && 7 !== t.Type && r && r.Name && (t = GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(r.Name), a = ModelManager_1.ModelManager.LevelGeneralModel, n ? a.HasSceneGuaranteeActionInfo(r, t) || (a.AddSceneGuaranteeActionInfo(r), Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 39, "添加场景保底行为：" + r.Name, ["触发行为", e], ["ActionInfo", r])) : (a.PopSceneGuaranteeActionInfo(r), Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 39, "移除场景保底行为：" + r.Name, ["触发行为", e], ["ActionInfo", r])))
};
//# sourceMappingURL=GuaranteeController.js.map