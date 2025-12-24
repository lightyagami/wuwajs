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
const InfrastructureController_1 = require("../../Infrastructure/InfrastructureController");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
const ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class ServerNotifyAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.X$t = e => {
      var r = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r);
      if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "行为树节点状态更新", ["树Id", o.TreeConfigId], ["节点Id", e.b5n], ["节点状态", GeneralLogicTreeDefine_1.btNodeStatusLogString[e.H6n]]);
        }
        o.UpdateNodeState(0, e.b5n, e.H6n);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", r]);
      }
    };
    this.$$t = e => {
      var r = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r);
      if (o) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Quest", 18, "行为树节点进度更新", ["树Id", o.TreeConfigId], ["节点Id", e.b5n]);
        }
        o.UpdateNodeProgress(e.b5n, e.nvs);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到节点进度更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", r]);
      }
    };
    this.Y$t = e => {
      var r = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r);
      if (r) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "行为树ChildQuest节点状态更新", ["树Id", r.TreeConfigId], ["节点Id", e.b5n], ["ChildQuest子节点状态", GeneralLogicTreeDefine_1.btChildQuestNodeStatusLogString[e.H6n]]);
        }
        r.UpdateChildQuestNodeState(e.b5n, e.H6n, 0);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到子任务节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", e.C9n]);
      }
    };
    this.J$t = e => {
      var r = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r);
      if (r) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GeneralLogicTree", 18, "服务器通知客户端做回退准备", ["treeConfigId", r.TreeConfigId]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreePrepareRollback, r.TreeConfigId);
        r.PrepareRollback(e.NEs, e.kEs);
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
      var r = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r);
      if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GeneralLogicTree", 18, "服务器通知行为树回退", ["treeConfigId", o.TreeConfigId]);
        }
        var t = ModelManager_1.ModelManager.GeneralLogicTreeModel;
        var n = o.IsTracking();
        t.RemoveBehaviorTree(r, 1);
        const i = t.CreateBehaviorTree(e.$Es);
        if (n) {
          if (o.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay) {
            ModelManager_1.ModelManager.LevelPlayModel.SetTrackLevelPlayId(0);
          } else {
            i.SetTrack(true);
          }
        }
        t = new ActionTask_1.ActionTask("OnRollbackInfoNotify", () => {
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(2);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreePrepareRollbackFinish, i?.TreeConfigId ?? 0);
          return true;
        });
        TaskSystem_1.TaskSystem.AddTask(t);
        TaskSystem_1.TaskSystem.Run();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "收到服务器回退通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", r]);
        }
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(2);
      }
    };
    this.Ahl = e => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestRedDotStateChange, e.B5n);
    };
    this.eYt = e => {
      var r = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r);
      if (o) {
        o.UpdateOccupations(e.b5n, e._Es, e.uEs);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "收到服务器挂起通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", r]);
      }
    };
    this.iYt = e => {
      var r = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r);
      if (o) {
        o.UpdateTimer(e.HEs);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知更新定时器时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", r]);
      }
    };
    this.oYt = e => {
      var r = MathUtils_1.MathUtils.LongToBigInt(e.C9n);
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r);
      if (!o) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 31, "服务器通知更新变量时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序", ["treeId", r]);
        }
      }
      o.UpdateTreeVars(e);
    };
    this.rYt = e => {
      e = e.cEs;
      if (e && e.length !== 0) {
        for (const r of e) {
          ModelManager_1.ModelManager.GeneralLogicTreeModel.CreateBehaviorTree(r);
        }
      }
    };
    this.nYt = e => {
      e = e.dEs;
      if (e && e.length !== 0) {
        for (const o of e) {
          var r = MathUtils_1.MathUtils.LongToBigInt(o);
          ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(r);
        }
      }
    };
    this.sYt = e => {
      ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip = e.C2s;
      ModelManager_1.ModelManager.AutoRunModel.SetAutoRunMode(e.C2s ? "ServerControlledSkip" : "Disabled");
      ModelManager_1.ModelManager.AutoRunModel.SetAutoRunState(e.C2s ? "Running" : "Stopped");
    };
    this.uMa = e => {
      var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      if (!r || e.W5n === r) {
        const t = e.K4s;
        if (t) {
          switch (t.uS_) {
            case Protocol_1.Aki.Protocol.tw_.Proto_ActionOpenSystem:
              var o = t.dS_;
              if (o) {
                (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o.cS_)).FunctionMap.set(1, () => {
                  this.OpenSystemBoardResultRequest(0, t.w5n);
                });
                o.FunctionMap.set(2, () => {
                  this.OpenSystemBoardResultRequest(1, t.w5n);
                });
                ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(o);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("GeneralLogicTree", 18, "ActionOpenSystemBoardNotify:打开带返回值的确认框时，服务端下发参数为空");
              }
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_SoaringChallenge:
              o = t.mS_;
              if (!o) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 18, "ActionOpenSystemBoardNotify:打开翱翔结算时，服务端下发参数为空");
                }
                return;
              }
              o = new GeneralLogicTreeDefine_1.FlySettlementViewParams(o.SMs, o.aS_, o.hS_, o.lS_, ModelManager_1.ModelManager.GeneralLogicTreeModel.HistorySoarScore, t.w5n);
              UiManager_1.UiManager.OpenView("FlySettlementView", o);
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_FishingHandIn:
              o = t.fS_;
              if (!o) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 10, "ActionOpenSystemBoardNotify:打开捕鱼交付界面时，服务端下发参数为空");
                }
                return;
              }
              ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardInteractView(o._S_, t.w5n);
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_GreatSwordChallenge:
              o = t.j$c;
              if (!o) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 88, "ActionOpenSystemBoardNotify:打开大剑挑战时，服务端下发参数为空");
                }
                return;
              }
              ControllerHolder_1.ControllerHolder.GreatSwordController.RequestGreatSwordInfoAndOpenView(o.s5n, t.w5n);
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_InfrHandIn:
              o = t.vNm;
              if (!o) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Infrastructure", 86, "ActionOpenSystemBoardNotify:打开基建交付时，服务端下发参数为空");
                }
                return;
              }
              if (ModelManager_1.ModelManager.CreatureModel.GetIsLoadingScene()) {
                ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.OpenSystemBoardResultRequest(0, t.w5n);
                return;
              }
              InfrastructureController_1.InfrastructureController.OpenMaterialDelivery(o.h5n, o.s5n, t.w5n, 1);
              break;
            case Protocol_1.Aki.Protocol.tw_.Proto_MotorRaceChallenge:
              o = t.FTf;
              if (!o) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("GeneralLogicTree", 71, "ActionOpenSystemBoardNotify:打开摩托模拟赛结算时，服务端下发参数为空");
                }
                return;
              }
              o = new GeneralLogicTreeDefine_1.MotorSettlementViewParams(o.SMs, o.aS_, o.hS_, o.lS_, t.w5n);
              UiManager_1.UiManager.OpenView("MotorRaceSettlementView", o);
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
  OpenSystemBoardResultRequest(e, r) {
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var o = Protocol_1.Aki.Protocol.mm_.create({
      W5n: o,
      j7n: e,
      w5n: r
    });
    Net_1.Net.Call(16596, o, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 20997, undefined, false);
      }
    });
  }
}
exports.ServerNotifyAssistant = ServerNotifyAssistant;
//# sourceMappingURL=ServerNotifyAssistant.js.map