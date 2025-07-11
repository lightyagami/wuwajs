"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerNotifyAssistant = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ActionTask_1 = require("../../../World/Task/ActionTask");
const DelayTask_1 = require("../../../World/Task/DelayTask");
const TaskSystem_1 = require("../../../World/Task/TaskSystem");
const ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
const ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class ServerNotifyAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.X$t = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "行为树节点状态更新", ["树Id", t.TreeConfigId], ["节点Id", e.b5n], ["节点状态", GeneralLogicTreeDefine_1.btNodeStatusLogString[e.H6n]]);
        }
        t.UpdateNodeState(0, e.b5n, e.H6n);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
      }
    };
    this.$$t = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Quest", 18, "行为树节点进度更新", ["树Id", t.TreeConfigId], ["节点Id", e.b5n]);
        }
        t.UpdateNodeProgress(e.b5n, e.nvs);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到节点进度更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
      }
    };
    this.Y$t = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "行为树ChildQuest节点状态更新", ["树Id", o.TreeConfigId], ["节点Id", e.b5n], ["ChildQuest子节点状态", GeneralLogicTreeDefine_1.btChildQuestNodeStatusLogString[e.H6n]]);
        }
        o.UpdateChildQuestNodeState(e.b5n, e.H6n, 0);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到子任务节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", e.C9n]);
      }
    };
    this.J$t = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GeneralLogicTree", 18, "服务器通知客户端做回退准备", ["treeConfigId", o.TreeConfigId]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreePrepareRollback, o.TreeConfigId);
        o.PrepareRollback(e.NEs, e.kEs);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知回退准备时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", e.C9n]);
      }
    };
    this.z$t = e => {
      if (e.FEs || e.VEs) {
        e = new DelayTask_1.DelayTask("OnBtRollbackStartNotify", undefined, () => {
          ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(2, 3);
          return true;
        });
        TaskSystem_1.TaskSystem.AddTask(e);
        TaskSystem_1.TaskSystem.Run();
      }
    };
    this.Z$t = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GeneralLogicTree", 18, "服务器通知行为树回退", ["treeConfigId", t.TreeConfigId]);
        }
        var r = ModelManager_1.ModelManager.GeneralLogicTreeModel;
        var i = t.IsTracking();
        r.RemoveBehaviorTree(o);
        const n = r.CreateBehaviorTree(e.$Es);
        if (i) {
          if (t.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay) {
            ModelManager_1.ModelManager.LevelPlayModel.SetTrackLevelPlayId(0);
          } else {
            n.SetTrack(true);
          }
        }
        r = new ActionTask_1.ActionTask("OnRollbackInfoNotify", () => {
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(2);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreePrepareRollbackFinish, n?.TreeConfigId ?? 0);
          return true;
        });
        TaskSystem_1.TaskSystem.AddTask(r);
        TaskSystem_1.TaskSystem.Run();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "收到服务器回退通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
        }
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(2);
      }
    };
    this.Ahl = e => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestRedDotStateChange, e.B5n);
    };
    this.eYt = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (t) {
        t.UpdateOccupations(e.b5n, e._Es, e.uEs);
        t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeName(o);
        e = "TaskOccupyGeneralDes_1004";
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)?.replace("{0}", "" + t) ?? e;
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [t]);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到服务器挂起通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
      }
    };
    this.iYt = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (t) {
        t.UpdateTimer(e.HEs);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知更新定时器时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
      }
    };
    this.oYt = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 31, "服务器通知更新变量时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
        }
      }
      t.UpdateTreeVars(e);
    };
    this.rYt = e => {
      e = e.cEs;
      if (e && e.length !== 0) {
        for (const o of e) {
          ModelManager_1.ModelManager.GeneralLogicTreeModel.CreateBehaviorTree(o);
        }
      }
    };
    this.nYt = e => {
      e = e.dEs;
      if (e && e.length !== 0) {
        for (const t of e) {
          var o = MathUtils_1.MathUtils.LongToBigInt(t);
          ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(o);
        }
      }
    };
    this.sYt = e => {
      ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip = e.C2s;
      ModelManager_1.ModelManager.AutoRunModel.SetAutoRunMode(e.C2s ? "ServerControlledSkip" : "Disabled");
      ModelManager_1.ModelManager.AutoRunModel.SetAutoRunState(e.C2s ? "Running" : "Stopped");
    };
    this.uMa = e => {
      var o = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      if (!o || e.W5n === o) {
        const r = e.K4s;
        if (r) {
          switch (r.uS_) {
            case Protocol_1.Aki.Protocol.tw_.Proto_ActionOpenSystem:
              var t = r.dS_;
              if (t) {
                (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t.cS_)).FunctionMap.set(1, () => {
                  this.OpenSystemBoardResultRequest(0, r.w5n);
                });
                t.FunctionMap.set(2, () => {
                  this.OpenSystemBoardResultRequest(1, r.w5n);
                });
                ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("GeneralLogicTree", 18, "ActionOpenSystemBoardNotify:打开带返回值的确认框时，服务端下发参数为空");
              }
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_SoaringChallenge:
              t = r.mS_;
              if (!t) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 18, "ActionOpenSystemBoardNotify:打开翱翔结算时，服务端下发参数为空");
                }
                return;
              }
              t = new GeneralLogicTreeDefine_1.FlySettlementViewParams(t.SMs, t.aS_, t.hS_, t.lS_, ModelManager_1.ModelManager.GeneralLogicTreeModel.HistorySoarScore, r.w5n);
              UiManager_1.UiManager.OpenView("FlySettlementView", t);
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_FishingHandIn:
              t = r.fS_;
              if (!t) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 10, "ActionOpenSystemBoardNotify:打开捕鱼交付界面时，服务端下发参数为空");
                }
                return;
              }
              ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardInteractView(t._S_, r.w5n);
          }
        }
      }
    };
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(24338, this.X$t);
    Net_1.Net.Register(19716, this.$$t);
    Net_1.Net.Register(18029, this.Y$t);
    Net_1.Net.Register(17231, this.J$t);
    Net_1.Net.Register(27108, this.z$t);
    Net_1.Net.Register(29659, this.Z$t);
    Net_1.Net.Register(15193, this.eYt);
    Net_1.Net.Register(26501, this.iYt);
    Net_1.Net.Register(17161, this.oYt);
    Net_1.Net.Register(24725, this.rYt);
    Net_1.Net.Register(20336, this.nYt);
    Net_1.Net.Register(29592, this.sYt);
    Net_1.Net.Register(21472, this.uMa);
    Net_1.Net.Register(18838, this.Ahl);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24338);
    Net_1.Net.UnRegister(19716);
    Net_1.Net.UnRegister(18029);
    Net_1.Net.UnRegister(17231);
    Net_1.Net.UnRegister(29659);
    Net_1.Net.UnRegister(15193);
    Net_1.Net.UnRegister(26501);
    Net_1.Net.UnRegister(17161);
    Net_1.Net.UnRegister(24725);
    Net_1.Net.UnRegister(20336);
    Net_1.Net.UnRegister(29592);
    Net_1.Net.UnRegister(21472);
    Net_1.Net.UnRegister(18838);
  }
  OpenSystemBoardResultRequest(e, o) {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var t = Protocol_1.Aki.Protocol.mm_.create({
      W5n: t,
      j7n: e,
      w5n: o
    });
    Net_1.Net.Call(22808, t, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 22484, undefined, false);
      }
    });
  }
}
exports.ServerNotifyAssistant = ServerNotifyAssistant;
//# sourceMappingURL=ServerNotifyAssistant.js.map