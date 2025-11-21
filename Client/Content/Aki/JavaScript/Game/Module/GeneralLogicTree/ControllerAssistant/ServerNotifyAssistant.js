"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerNotifyAssistant = undefined;
const Log_1 = require("../../../../Core/Common/Log");
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
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (r) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "行为树节点状态更新", ["树Id", r.TreeConfigId], ["节点Id", e.b5n], ["节点状态", GeneralLogicTreeDefine_1.btNodeStatusLogString[e.H6n]]);
        }
        r.UpdateNodeState(0, e.b5n, e.H6n);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
      }
    };
    this.$$t = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (r) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Quest", 18, "行为树节点进度更新", ["树Id", r.TreeConfigId], ["节点Id", e.b5n]);
        }
        r.UpdateNodeProgress(e.b5n, e.nvs);
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
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (r) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GeneralLogicTree", 18, "服务器通知行为树回退", ["treeConfigId", r.TreeConfigId]);
        }
        var t = ModelManager_1.ModelManager.GeneralLogicTreeModel;
        var i = r.IsTracking();
        t.RemoveBehaviorTree(o, 1);
        const n = t.CreateBehaviorTree(e.$Es);
        if (i) {
          if (r.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay) {
            ModelManager_1.ModelManager.LevelPlayModel.SetTrackLevelPlayId(0);
          } else {
            n.SetTrack(true);
          }
        }
        t = new ActionTask_1.ActionTask("OnRollbackInfoNotify", () => {
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(2);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreePrepareRollbackFinish, n?.TreeConfigId ?? 0);
          return true;
        });
        TaskSystem_1.TaskSystem.AddTask(t);
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
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (r) {
        r.UpdateOccupations(e.b5n, e._Es, e.uEs);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到服务器挂起通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
      }
    };
    this.iYt = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (r) {
        r.UpdateTimer(e.HEs);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知更新定时器时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
      }
    };
    this.oYt = e => {
      var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 31, "服务器通知更新变量时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", o]);
        }
      }
      r.UpdateTreeVars(e);
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
        for (const r of e) {
          var o = MathUtils_1.MathUtils.LongToBigInt(r);
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
        const t = e.K4s;
        if (t) {
          switch (t.uS_) {
            case Protocol_1.Aki.Protocol.tw_.Proto_ActionOpenSystem:
              var r = t.dS_;
              if (r) {
                (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(r.cS_)).FunctionMap.set(1, () => {
                  this.OpenSystemBoardResultRequest(0, t.w5n);
                });
                r.FunctionMap.set(2, () => {
                  this.OpenSystemBoardResultRequest(1, t.w5n);
                });
                ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(r);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("GeneralLogicTree", 18, "ActionOpenSystemBoardNotify:打开带返回值的确认框时，服务端下发参数为空");
              }
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_SoaringChallenge:
              r = t.mS_;
              if (!r) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 18, "ActionOpenSystemBoardNotify:打开翱翔结算时，服务端下发参数为空");
                }
                return;
              }
              r = new GeneralLogicTreeDefine_1.FlySettlementViewParams(r.SMs, r.aS_, r.hS_, r.lS_, ModelManager_1.ModelManager.GeneralLogicTreeModel.HistorySoarScore, t.w5n);
              UiManager_1.UiManager.OpenView("FlySettlementView", r);
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_FishingHandIn:
              r = t.fS_;
              if (!r) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 10, "ActionOpenSystemBoardNotify:打开捕鱼交付界面时，服务端下发参数为空");
                }
                return;
              }
              ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardInteractView(r._S_, t.w5n);
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_GreatSwordChallenge:
              r = t.j$c;
              if (!r) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 88, "ActionOpenSystemBoardNotify:打开大剑挑战时，服务端下发参数为空");
                }
                return;
              }
              ControllerHolder_1.ControllerHolder.GreatSwordController.RequestGreatSwordInfoAndOpenView(r.s5n, t.w5n);
          }
        }
      }
    };
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(18424, this.X$t);
    Net_1.Net.Register(18729, this.$$t);
    Net_1.Net.Register(29641, this.Y$t);
    Net_1.Net.Register(18166, this.J$t);
    Net_1.Net.Register(19525, this.z$t);
    Net_1.Net.Register(29840, this.Z$t);
    Net_1.Net.Register(25590, this.eYt);
    Net_1.Net.Register(21387, this.iYt);
    Net_1.Net.Register(21186, this.oYt);
    Net_1.Net.Register(27019, this.rYt);
    Net_1.Net.Register(28787, this.nYt);
    Net_1.Net.Register(28297, this.sYt);
    Net_1.Net.Register(20385, this.uMa);
    Net_1.Net.Register(25954, this.Ahl);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18424);
    Net_1.Net.UnRegister(18729);
    Net_1.Net.UnRegister(29641);
    Net_1.Net.UnRegister(18166);
    Net_1.Net.UnRegister(29840);
    Net_1.Net.UnRegister(25590);
    Net_1.Net.UnRegister(21387);
    Net_1.Net.UnRegister(21186);
    Net_1.Net.UnRegister(27019);
    Net_1.Net.UnRegister(28787);
    Net_1.Net.UnRegister(28297);
    Net_1.Net.UnRegister(20385);
    Net_1.Net.UnRegister(25954);
  }
  OpenSystemBoardResultRequest(e, o) {
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var r = Protocol_1.Aki.Protocol.mm_.create({
      W5n: r,
      j7n: e,
      w5n: o
    });
    Net_1.Net.Call(16596, r, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 20997, undefined, false);
      }
    });
  }
}
exports.ServerNotifyAssistant = ServerNotifyAssistant;
//# sourceMappingURL=ServerNotifyAssistant.js.map