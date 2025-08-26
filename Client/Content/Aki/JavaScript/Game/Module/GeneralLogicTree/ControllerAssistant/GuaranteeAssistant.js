"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeAssistant = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GuaranteeActionCenter_1 = require("../../../LevelGamePlay/Guarantee/GuaranteeActionCenter");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class GuaranteeAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.rIe = (e, t, n, r = 0) => {
      var o;
      var s;
      if (t && t.Type === 6 && t.TreeIncId && (o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.TreeIncId))) {
        s = GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(n.Name);
        o.AddGuaranteeActionInfo(e, t.NodeId, n, s);
      }
    };
    this.nIe = (e, t, n, r = 0) => {
      if (t && t.Type === 6 && t.TreeIncId && (t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.TreeIncId))) {
        t.PopGuaranteeActionInfo(e, n);
      }
    };
    this.DQt = (e, t, n) => {
      if (e.Type === 6 && e.TreeIncId) {
        var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e.TreeIncId);
        if (r) {
          var o = r.GetRollbackPoint();
          switch (n) {
            case Protocol_1.Aki.Protocol.BNs._5n:
              if (o && e.NodeId === o) {
                r.ClearGuaranteeActions();
              }
              break;
            case Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess:
            case Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed:
              if (!o) {
                r.ClearGuaranteeActions(e.NodeId);
              }
          }
        }
      }
    };
    this.HQe = e => {
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
      if (t && (t.ExecuteTreeGuaranteeActions(), ModelManager_1.ModelManager.GeneralLogicTreeModel.GuaranteeActionsWhenLogicTreeRemove?.has(e)) && (t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GuaranteeActionsWhenLogicTreeRemove.get(e), ModelManager_1.ModelManager.GeneralLogicTreeModel.GuaranteeActionsWhenLogicTreeRemove.delete(e), t) && t.length !== 0) {
        ControllerHolder_1.ControllerHolder.GuaranteeController.ExecuteActions(t, LevelGeneralContextDefine_1.GuaranteeContext.Create());
      }
    };
    this.jro = (e, t, n) => {
      e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
      if (e) {
        for (const r of e.GetBlackBoard().GetCurrentExecuteActions()) {
          ControllerHolder_1.ControllerHolder.LevelGeneralController.StopActionsExecute(r);
        }
        e.ExecuteTreeGuaranteeActions();
      }
    };
  }
  OnDestroy() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddGuaranteeAction, this.rIe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemGuaranteeAction, this.nIe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, this.HQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.DQt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.jro);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddGuaranteeAction, this.rIe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemGuaranteeAction, this.nIe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, this.HQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.DQt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.jro);
  }
}
exports.GuaranteeAssistant = GuaranteeAssistant;
//# sourceMappingURL=GuaranteeAssistant.js.map