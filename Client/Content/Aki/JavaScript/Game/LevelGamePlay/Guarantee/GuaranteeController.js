"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const GuaranteeActionCenter_1 = require("./GuaranteeActionCenter");
class GuaranteeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddGuaranteeAction, this.rIe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemGuaranteeAction, this.nIe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.ExecSceneGuaranteeActions);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddGuaranteeAction, this.rIe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemGuaranteeAction, this.nIe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.ExecSceneGuaranteeActions);
    var e = ModelManager_1.ModelManager.LevelGeneralModel?.GetEntityGuaranteeActionInfos();
    if (e) {
      for (const n of e.keys()) {
        if (n?.Valid && EventSystem_1.EventSystem.HasWithTarget(n, EventDefine_1.EEventName.RemoveEntity, this.ExecEntityGuaranteeActions)) {
          EventSystem_1.EventSystem.RemoveWithTarget(n, EventDefine_1.EEventName.RemoveEntity, this.ExecEntityGuaranteeActions);
        }
      }
      ModelManager_1.ModelManager.LevelGeneralModel?.ClearEntityGuaranteeActionInfos();
    }
    return true;
  }
  static ExecuteActions(e, n) {
    if (n) {
      for (const r of e) {
        var t = r.Name;
        var o = GuaranteeActionCenter_1.GuaranteeActionCenter.GetGuaranteeAction(t);
        if (o) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 39, "执行保底行为：", ["actionName", t], ["ActionInfo", r]);
          }
          o.Execute(r, n);
        }
      }
    }
  }
}
exports.GuaranteeController = GuaranteeController;
(_a = GuaranteeController).ExecSceneGuaranteeActions = () => {
  var e = ModelManager_1.ModelManager.LevelGeneralModel?.RemoveSceneGuaranteeActionInfos();
  if (e && e.length > 0 && (e = e.reverse(), _a.ExecuteActions(e, LevelGeneralContextDefine_1.GuaranteeContext.Create()), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("LevelEvent", 39, "场景保底行为已全部完成", ["保底行为列表", e]);
  }
};
GuaranteeController.ExecEntityGuaranteeActions = (e, n) => {
  var t = ModelManager_1.ModelManager.LevelGeneralModel?.RemoveEntityGuaranteeActionInfos(n);
  if (n?.Valid && EventSystem_1.EventSystem.HasWithTarget(n, EventDefine_1.EEventName.RemoveEntity, _a.ExecEntityGuaranteeActions)) {
    EventSystem_1.EventSystem.RemoveWithTarget(n, EventDefine_1.EEventName.RemoveEntity, _a.ExecEntityGuaranteeActions);
  }
  if (t && t.length > 0 && (t = t.reverse(), _a.ExecuteActions(t, LevelGeneralContextDefine_1.GuaranteeContext.Create()), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("LevelEvent", 93, "实体保底行为已全部完成", ["保底行为列表", t], ["触发保底实体", n.Id]);
  }
};
GuaranteeController.rIe = (e, n, t, o = false) => {
  _a.aIe(e, n, true, t, o);
};
GuaranteeController.nIe = (e, n, t, o = false) => {
  _a.aIe(e, n, false, t, o);
};
GuaranteeController.aIe = (e, n, t, o, r) => {
  if (n && n.Type !== 7 && o && o.Name) {
    if (n.Type === 1) {
      if (!n.EntityId) {
        return;
      }
      const v = GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(o.Name);
      var a = ModelManager_1.ModelManager.LevelGeneralModel;
      if (t) {
        if (!a.HasEntityGuaranteeActionInfo(n.EntityId, o, v)) {
          a.AddEntityGuaranteeActionInfo(n.EntityId, o);
          if ((_ = ModelManager_1.ModelManager.CharacterModel.GetHandle(n.EntityId))?.Valid && !EventSystem_1.EventSystem.HasWithTarget(_, EventDefine_1.EEventName.RemoveEntity, _a.ExecEntityGuaranteeActions)) {
            EventSystem_1.EventSystem.AddWithTarget(_, EventDefine_1.EEventName.RemoveEntity, _a.ExecEntityGuaranteeActions);
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("LevelEvent", 93, "添加实体保底行为：" + o.Name, ["触发行为", e], ["ActionInfo", o], ["实体", n.EntityId]);
          }
        }
      } else {
        if ((_ = ModelManager_1.ModelManager.CharacterModel.GetHandle(n.EntityId))?.Valid && EventSystem_1.EventSystem.HasWithTarget(_, EventDefine_1.EEventName.RemoveEntity, _a.ExecEntityGuaranteeActions)) {
          EventSystem_1.EventSystem.RemoveWithTarget(_, EventDefine_1.EEventName.RemoveEntity, _a.ExecEntityGuaranteeActions);
        }
        a.PopEntityGuaranteeActionInfo(n.EntityId, o);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 93, "移除实体保底行为：" + o.Name, ["触发行为", e], ["ActionInfo", o], ["实体", n.EntityId]);
        }
      }
    } else {
      const v = GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(o.Name);
      var _ = ModelManager_1.ModelManager.LevelGeneralModel;
      if (t) {
        if (!_.HasSceneGuaranteeActionInfo(o, v)) {
          _.AddSceneGuaranteeActionInfo(o);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 39, "添加场景保底行为：" + o.Name, ["触发行为", e], ["ActionInfo", o]);
          }
        }
      } else {
        _.PopSceneGuaranteeActionInfo(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 39, "移除场景保底行为：" + o.Name, ["触发行为", e], ["ActionInfo", o]);
        }
      }
    }
  }
}; //# sourceMappingURL=GuaranteeController.js.map