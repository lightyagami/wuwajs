"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestToServerAssistant = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../Core/Net/Net");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const TaskSystem_1 = require("../../../World/Task/TaskSystem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const TimeOfDayController_1 = require("../../TimeOfDay/TimeOfDayController");
const QuestFailedBehaviorNode_1 = require("../BehaviorNode/QuestFailedBehaviorNode");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil");
const ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class RequestToServerAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.ikn = new Map();
    this.rkn = new Map();
    this.pct = false;
    this.zpe = (e, o) => {
      var r;
      var t;
      if (o.ConfigType === Protocol_1.Aki.Protocol.rLs.F6n) {
        r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        this.okn(r, o.PbDataId);
        t = this.GetEntityPos(o, true);
        this.nkn(r, o.PbDataId, t);
      }
    };
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
  }
  OnDestroy() {
    this.ikn.clear();
    this.rkn.clear();
  }
  RequestSubmitNode(e, r, o = 0) {
    var t;
    var i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetNodeConfig(e.BtType, e.TreeConfigId, e.NodeId);
    if (i) {
      if (i.Type !== "ChildQuest") {
        r(false);
      } else if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(i.Condition.PreConditions, undefined, e)) {
        TimeOfDayController_1.TimeOfDayController.SyncServerGameTime(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second);
        i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(e.TreeIncId);
        (t = Protocol_1.Aki.Protocol.rJn.create()).d9n = i ?? 0;
        t.C9n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId);
        t.b5n = e.NodeId;
        Net_1.Net.Call(29594, t, e => {
          var o;
          if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && e.BEs !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrTreeNodeNotActive && (o = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.BEs), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("GeneralLogicTree", 18, o);
          }
          r(e.BEs === Protocol_1.Aki.Protocol.Q4n.KRs);
        });
      } else {
        i = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(Protocol_1.Aki.Protocol.Q4n.Proto_ErrPreCondition);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("GeneralLogicTree", 18, i);
        }
        r(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "提交节点失败,找不到节点配置", ["TreeType", GeneralLogicTreeDefine_1.btTypeLogString[e.BtType]], ["TreeId", e.TreeConfigId], ["NodeId", e.NodeId]);
      }
      r(false);
    }
  }
  RequestSubmitAwakeAndLoadEntityNode(e, r) {
    var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(e.TreeIncId);
    var t = Protocol_1.Aki.Protocol.Rf_.create();
    t.d9n = o ?? 0;
    t.C9n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId);
    t.b5n = e.NodeId;
    Net_1.Net.Call(20083, t, e => {
      var o;
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && (o = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("GeneralLogicTree", 18, o);
      }
      r(e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs);
    });
  }
  RequestSetTimerInfo(o, e, r, t, i) {
    var _ = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(o);
    var _ = Protocol_1.Aki.Protocol.aJn.create({
      d9n: _,
      C9n: MathUtils_1.MathUtils.BigIntToLong(o),
      b5n: e,
      c9n: r,
      f9n: t,
      W4n: i
    });
    Net_1.Net.Call(23620, _, e => {
      if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 16791);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged, o, r, t, i);
    });
  }
  RequestGiveUp(o, r) {
    var e;
    var t = ModelManager_1.ModelManager.GeneralLogicTreeModel;
    var i = t.GetBehaviorTree(o);
    if (i && (e = i.GetProcessingCanGiveupFailedNode()) && i.CheckCanGiveUp()) {
      i = t.GetBehaviorTreeOwnerId(o);
      t = Protocol_1.Aki.Protocol.fJn.create({
        d9n: i,
        C9n: MathUtils_1.MathUtils.BigIntToLong(o),
        b5n: e.NodeId
      });
      Net_1.Net.Call(24272, t, e => {
        if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (e.BEs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTreeNotFailedNode) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree:请求放弃失败,不是失败节点", ["TreeIncId", o]);
            }
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 28647);
          }
          r(false);
        } else {
          r(true);
        }
      });
    } else {
      r(false);
    }
  }
  async RequestRollback(o, r) {
    var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
    if (t) {
      let e = undefined;
      if (t.FailNodeId !== 0 && t.GetNode(t.FailNodeId) instanceof QuestFailedBehaviorNode_1.QuestFailedBehaviorNode) {
        e = t.GetNode(t.FailNodeId);
      }
      t.ClearFailNodeId();
      if (!e) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("GeneralLogicTree", 45, "服务器下发的失败回退节点并没在之前被保存，已走保底检测第一个失败节点，确认是否有问题", ["treeId", o]);
        }
        e = t.GetProcessingCanGiveupFailedNode();
      }
      if (e?.NeedSecondaryConfirm) {
        if (r === Protocol_1.Aki.Protocol.NEs.Proto_TransferFail) {
          this.Q$t(o, false);
        } else {
          await TaskSystem_1.TaskSystem.Run();
          await ModelManager_1.ModelManager.SubLevelLoadingModel.LoadSubLevelPromise?.Promise;
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(77)).FunctionMap.set(1, () => {
            this.Q$t(o, false);
          });
          t.FunctionMap.set(2, () => {
            this.Q$t(o, true);
          });
          t.FinishOpenFunction = e => {
            if (!e) {
              this.Q$t(o, false);
            }
          };
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
        }
      } else if (e?.IsFadeInScreen()) {
        ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(2, 3, () => {
          this.Q$t(o, true);
        }, 1);
      } else {
        this.Q$t(o, true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GeneralLogicTree", 18, "请求回退失败，行为树不存在", ["treeId", o]);
    }
  }
  Q$t(e, o) {
    var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    if (r) {
      r.SetRollbackWaiting(false);
      r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(e);
      r = Protocol_1.Aki.Protocol.MJn.create({
        d9n: r,
        C9n: MathUtils_1.MathUtils.BigIntToLong(e),
        p9n: o ? 1 : 2
      });
      Net_1.Net.Call(29369, r, e => {
        if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && (ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(2), e.BEs !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrSaveNewNotRollback)) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 15187, undefined, false);
        }
      });
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "请求回退失败，行为树不存在, 并离开黑幕", ["treeId", e]);
      }
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(2);
    }
  }
  RequestTimerEnd(e, o) {
    var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(e);
    var r = Protocol_1.Aki.Protocol.PJn.create({
      d9n: r,
      C9n: MathUtils_1.MathUtils.BigIntToLong(e),
      c9n: o
    });
    Net_1.Net.Call(24242, r, e => {
      if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs && (e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.BEs), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("GeneralLogicTree", 18, e);
      }
    });
  }
  RequestFinishUiGameplay(e, o) {
    var r = Protocol_1.Aki.Protocol.wJn.create();
    r.a5n = o;
    r.h5n = e;
    Net_1.Net.Call(29133, r, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Quest", 18, "GeneralLogicTree:RequestFinishUiGameplay", ["gameplayId", o]);
      }
    });
  }
  RequestForcedOccupation(o, r) {
    var e = Protocol_1.Aki.Protocol.CJn.create({
      C9n: MathUtils_1.MathUtils.BigIntToLong(o)
    });
    Net_1.Net.Call(23949, e, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Quest", 18, "GeneralLogicTree:RequestForcedOccupation", ["treeId", o]);
      }
      r();
    });
  }
  RequestEntityPosition(o, r, e) {
    var e = e ?? Vector_1.Vector.Create();
    var t = this.skn(o, r);
    if (t) {
      e.Set(t.X, t.Y, t.Z);
    } else {
      if (t = this.akn(o, r)) {
        e.Set(t.X, t.Y, t.Z);
      }
      if (!this.pct) {
        t = Protocol_1.Aki.Protocol.Nfs.create({
          v9n: r,
          M9n: o
        });
        this.pct = true;
        Net_1.Net.Call(23712, t, e => {
          if (e?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            e = Vector_1.Vector.Create(e.l8n);
            this.hkn(o, r, e);
          }
          this.pct = false;
        });
      }
    }
    return e;
  }
  GetEntityPos(e, o, r) {
    var r = r ?? Vector_1.Vector.Create();
    var t = ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(e);
    var e = e.Entity.GetComponent(0);
    if (e) {
      if (t && ObjectUtils_1.ObjectUtils.IsValid(t.Owner)) {
        var i = Vector_1.Vector.Create(0, 0, 0);
        if (t.SkeletalMesh) {
          r.FromUeVector(t.SkeletalMesh.D_K2_GetComponentLocation());
          const _ = e?.GetPbModelConfig();
          if (_) {
            r.Set(r.X, r.Y, r.Z);
            i.Set(0, 0, _.HalfHeight);
            GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(t, i);
            r.AdditionEqual(i);
          }
        } else {
          r.FromUeVector(t.Owner.D_K2_GetActorLocation());
        }
        if (o) {
          const _ = e.GetPbModelConfig();
          if (_) {
            if (_.TrackHeight) {
              i.Set(0, 0, _.TrackHeight);
              GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(t, i);
              r.AdditionEqual(i);
            } else if ((0, RegisterComponent_1.isComponentInstance)(t, 3)) {
              i.Set(0, 0, t.ScaledHalfHeight);
              GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(t, i);
              r.AdditionEqual(i);
            }
          }
        }
      } else {
        o = e.GetLocation();
        r.Set(o.X, o.Y, o.Z);
      }
    }
    return r;
  }
  skn(e, o) {
    e = this.ikn.get(e);
    if (e) {
      return e.get(o);
    }
  }
  okn(e, o) {
    e = this.ikn.get(e);
    if (e) {
      e.delete(o);
    }
  }
  hkn(e, o, r) {
    let t = this.ikn.get(e);
    if (!t) {
      t = new Map();
      this.ikn.set(e, t);
    }
    t.set(o, r);
  }
  akn(e, o) {
    e = this.rkn.get(e);
    if (e) {
      return e.get(o);
    }
  }
  nkn(e, o, r) {
    let t = this.rkn.get(e);
    if (!t) {
      t = new Map();
      this.rkn.set(e, t);
    }
    t.set(o, r);
  }
}
exports.RequestToServerAssistant = RequestToServerAssistant;
//# sourceMappingURL=RequestToServerAssistant.js.map