"use strict";

var _a;
var __decorate = this && this.__decorate || function (e, o, t, a) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? o : a === null ? a = Object.getOwnPropertyDescriptor(o, t) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, o, t, a);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (r = e[l]) {
        n = (s < 3 ? r(n) : s > 3 ? r(o, t, n) : r(o, t)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(o, t, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombatMessageController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const NetDefine_1 = require("../../../Core/Define/Net/NetDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const StatDefine_1 = require("../../Common/StatDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const CombatLog_1 = require("../../Utils/CombatLog");
const BlackboardController_1 = require("../../World/Controller/BlackboardController");
const WorldGlobal_1 = require("../../World/WorldGlobal");
const CombatMessage_1 = require("./CombatMessage");
const CharacterActorComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterActorComponent");
const VehicleActorComponent_1 = require("../../NewWorld/Vehicle/Common/VehicleActorComponent");
const notifyMessageCacheSet = new Set([NetDefine_1.ECombatNotifyDataMessage.DFn, NetDefine_1.ECombatNotifyDataMessage.LFn, NetDefine_1.ECombatNotifyDataMessage.AFn, NetDefine_1.ECombatNotifyDataMessage.wFn, NetDefine_1.ECombatNotifyDataMessage.PFn, NetDefine_1.ECombatNotifyDataMessage.BFn]);
const MAX_AI_INFO_COUNT = 100;
const IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : undefined;
class CombatMessageController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.CombatMessageModel;
  }
  static OnInit() {
    Net_1.Net.Register(19529, CombatMessageController.Zyt);
    Net_1.Net.Register(21062, CombatMessageController.eIt);
    Net_1.Net.Register(19982, CombatMessageController.tIt);
    Net_1.Net.Register(21058, CombatMessageController.sMa);
    Net_1.Net.Register(19361, CombatMessageController.oIt);
    Net_1.Net.Register(22917, CombatMessageController.PreAiControlSwitchNotify);
    Net_1.Net.Register(17181, this.rIt);
    Net_1.Net.Register(27740, CombatMessageController.Ei_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.RegisterAiHateEntity);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(19529);
    Net_1.Net.UnRegister(21062);
    Net_1.Net.UnRegister(19982);
    Net_1.Net.UnRegister(21058);
    Net_1.Net.UnRegister(19361);
    Net_1.Net.UnRegister(22917);
    Net_1.Net.UnRegister(17181);
    Net_1.Net.UnRegister(27740);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.RegisterAiHateEntity);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    return true;
  }
  static sIt(e) {
    let o = this.aIt.get(e);
    if (!o) {
      o = Stats_1.Stat.CreateNoFlameGraph(e, "", StatDefine_1.BATTLESTAT_GROUP);
      this.aIt.set(e, o);
    }
    return o;
  }
  static hIt(e, o) {
    var t = [["Message", o.kFs], ["CombatCommon", e]];
    if (o.kFs) {
      var a = o[o.kFs];
      var r = NetDefine_1.ECombatNotifyDataMessage[o.kFs];
      if (a && r) {
        const C = MathUtils_1.MathUtils.LongToNumber(e.F4n);
        var s = ModelManager_1.ModelManager.CreatureModel.GetEntity(C);
        if (!s || s.IsInit || notifyMessageCacheSet.has(r)) {
          CombatDebugController_1.CombatDebugController.CombatInfoMessage("Notify", o.kFs, e);
          var n = s?.Entity;
          if (n) {
            var l = CombatMessage_1.CombatNet.NotifyMap.get(r);
            if (l) {
              switch (l.Type) {
                case 0:
                  {
                    const C = MathUtils_1.MathUtils.LongToNumber(e.Y8n);
                    var i = CombatMessageController.Model?.GetMessageBuffer(C);
                    var _ = l.Preprocessor;
                    if (_ && !_(n, a, e)) {
                      break;
                    }
                    if (l.IsSync && i && ModelManager_1.ModelManager.GameModeModel.IsMulti) {
                      i.AddToQueue(r, n, e, a);
                    } else {
                      l?.Listener?.(n, a, e);
                    }
                    break;
                  }
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("MultiplayerCombat", 19, "协议找不到对应的监听器", ...t);
            }
          } else {
            CombatLog_1.CombatLog.Warn("Notify", C, "服务器下发打包协议找不到实体", ...t, ["msg", o]);
          }
        } else {
          CombatLog_1.CombatLog.Warn("Notify", C, "协议丢弃，实体未加载完成", ...t);
        }
      } else {
        CombatLog_1.CombatLog.Error("Message", undefined, "无法解析协议数据", ...t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiplayerCombat", 19, "无法解析协议类型", ...t);
    }
  }
  static lIt(e, o) {
    var t = CombatMessage_1.CombatNet.RequestMap;
    var a = o.W8n;
    if (t.has(a)) {
      var r = t.get(a);
      var s = o[o.kFs];
      t.delete(a);
      if (s) {
        try {
          r?.(s);
        } catch (e) {
          if (e instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("CombatInfo", 14, "战斗协议执行response异常", e, ["response", o.kFs], ["error", e.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("CombatInfo", 14, "战斗协议执行response异常", ["response", o.kFs], ["stack", e]);
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MultiplayerCombat", 19, "unexpected null combat response", ["messageType", o.kFs]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiplayerCombat", 19, "unexpected response RPC id from server", ["messageType", o.kFs]);
    }
  }
  static Process(e, o, t, a) {
    var r = CombatMessage_1.CombatNet.NotifyMap.get(e);
    if (r && r.Type === 0) {
      r.Listener?.(o, t, a);
    } else {
      this.sX.get(e)?.(o, t);
    }
  }
  static RegisterPreTick(e, o) {
    if (this.Y7.has(e)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("CombatInfo", 14, "[CombatMessageController.RegisterPreTick] 当前Comp已经注册过PreTick", ["Comp", e.toString()]);
      }
    } else {
      this.Y7.set(e, o);
    }
  }
  static UnregisterPreTick(e) {
    if (this.Y7.has(e)) {
      this.Y7.delete(e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("CombatInfo", 14, "[CombatMessageController.RegisterPreTick] 当前Comp未注册过PreTick", ["Comp", e.toString()]);
    }
  }
  static RegisterAfterTick(e, o) {
    if (this._It.has(e)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("CombatInfo", 14, "[CombatMessageController.RegisterAfterTick] 当前Comp已经注册过AfterTick", ["Comp", e.toString()]);
      }
    } else {
      this._It.set(e, o);
    }
  }
  static UnregisterAfterTick(e) {
    if (this._It.has(e)) {
      this._It.delete(e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("CombatInfo", 14, "[CombatMessageController.UnregisterAfterTick] 当前Comp未注册过AfterTick", ["Comp", e.toString()]);
    }
  }
  static AfterTick(e) {
    if (Net_1.Net.IsServerConnected() && ModelManager_1.ModelManager.GameModeModel.MapDone) {
      for (var [o, t] of this._It) {
        try {
          if (o.Entity?.Valid) {
            if ((o.Entity.Active || this.cIt.has(o.Entity)) && (t(e), o.Entity.Active)) {
              this.cIt.add(o.Entity);
            } else {
              this.cIt.delete(o.Entity);
            }
          }
        } catch (e) {
          if (e instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("CombatInfo", 14, "处理方法执行异常", e, ["comp", o.toString()], ["error", e.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("CombatInfo", 14, "处理方法执行异常", ["comp", o.toString()], ["error", e]);
          }
        }
      }
      if (Time_1.Time.NowSeconds > this.mIt + this.dIt || this.Model.AnyHateChange) {
        this.CIt.Start();
        let e = false;
        for (const m of this.WC1) {
          if (m.IsInit) {
            if (!e) {
              n = m.Entity.GetComponent(175);
              e = n?.IsInFightState();
            }
            var a;
            var r;
            var s = Protocol_1.Aki.Protocol.Ai.Te_.create();
            var n = ModelManager_1.ModelManager.GameModeModel.IsMulti || this.Model.AnyHateChange;
            if (n) {
              for ([a, r] of m.Entity.GetComponent(47).AiController.AiHateList.GetHatredMap()) {
                var l = Protocol_1.Aki.Protocol.Ai.eNs.create();
                l.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(a));
                l.Z8n = r.HatredValue;
                s.ISs.push(l);
              }
            }
            if (s.ISs.length > MAX_AI_INFO_COUNT && Log_1.Log.CheckError()) {
              Log_1.Log.Error("MultiplayerCombat", 19, "仇恨数据过大", ["CreatureData", m.CreatureDataId], ["HateList", s.ISs.length]);
            }
            if (n) {
              CombatMessage_1.CombatNet.Send(25111, m.Entity, s);
            }
          }
        }
        this.mIt = Time_1.Time.NowSeconds;
        this.CIt.Stop();
      }
      this.Model.AnyHateChange = false;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti && BlackboardController_1.BlackboardController.PendingBlackboardParams.size > 0) {
        for (const c of this.WC1) {
          var i;
          var _;
          if (c.IsInit && (i = Protocol_1.Aki.Protocol.Ai.Ee_.create(), (_ = BlackboardController_1.BlackboardController.PendingBlackboardParams.get(c.CreatureDataId)) && (i.eVn = [..._.values()], CombatMessage_1.CombatNet.Send(20517, c.Entity, i)), i.eVn.length > MAX_AI_INFO_COUNT) && Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiplayerCombat", 19, "黑板数据过大", ["CreatureData", c.CreatureDataId], ["AiBlackboards", i.eVn.length]);
          }
        }
        BlackboardController_1.BlackboardController.PendingBlackboardParams.clear();
      }
      if ((!ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode || !ModelManager_1.ModelManager.GameModeModel.IsMulti) && ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove) {
        var C;
        var g = Protocol_1.Aki.Protocol.Yus.create();
        g.uhh = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
        for (const b of ModelManager_1.ModelManager.CombatMessageModel.MoveSyncSet) {
          var M = b.CollectPendingMoveInfos();
          if (M) {
            g.WRs.push(M);
          }
        }
        if (g.WRs.length > 0) {
          Net_1.Net.Send(29722, g);
        }
        if (Info_1.Info.IsBuildDevelopmentOrDebug) {
          C = {
            scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
            instance_id: ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
            msg_id: 29722,
            sub_count: g.WRs.length,
            is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
            ed: IS_WITH_EDITOR,
            br: LogAnalyzer_1.LogAnalyzer.GetBranch()
          };
          C = JSON.stringify(C);
          CombatDebugController_1.CombatDebugController.DataReport("COMBAT_MESSAGE_COUNT", C);
        }
        ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = false;
      }
      this.FlushMessagePack();
      if (ModelManager_1.ModelManager.CombatMessageModel.SkillDirtySet.size > 0) {
        for (const f of ModelManager_1.ModelManager.CombatMessageModel.SkillDirtySet) {
          ModelManager_1.ModelManager.CombatMessageModel?.TryClearSkillCount(f);
        }
        ModelManager_1.ModelManager.CombatMessageModel.SkillDirtySet.clear();
      }
    }
  }
  static FlushMessagePack() {
    var e = [];
    var o = this.Model.MessagePack;
    o.ORs = ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
    if (o.R5n.length > 0) {
      if (ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendPendingTime) {
        if (Time_1.Time.SystemNowSeconds >= ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendPendingTime + ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendInterval) {
          for (const a of o.R5n) {
            var t = a.x5n;
            if (t) {
              CombatDebugController_1.CombatDebugController.CombatContextInfoMessage("Request", t.kFs, t);
              e.push(t.kFs);
            }
          }
          Net_1.Net.Call(18787, o, e => {
            if (e.XLs) {
              this.rIt(e.XLs);
            }
          });
          if (Info_1.Info.IsBuildDevelopmentOrDebug) {
            o = {
              scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
              instance_id: ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
              msg_id: 18787,
              sub_count: o.R5n.length,
              is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
              sub_msg: e,
              frame: Time_1.Time.Frame,
              ed: IS_WITH_EDITOR,
              br: LogAnalyzer_1.LogAnalyzer.GetBranch()
            };
            o = JSON.stringify(o);
            CombatDebugController_1.CombatDebugController.DataReport("COMBAT_MESSAGE_COUNT", o);
          }
          this.Model.MessagePack = Protocol_1.Aki.Protocol.CombatMessage.sZn.create();
          ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendPendingTime = 0;
        }
      } else {
        ModelManager_1.ModelManager.CombatMessageModel.CombatMessageSendPendingTime = Time_1.Time.SystemNowSeconds;
      }
    }
  }
  static pga(e, o) {
    var t;
    var a;
    var r = Vector_1.Vector.Create(o.ADs);
    var s = e.Entity.GetComponent(0);
    var n = e.Entity.GetComponent(1);
    if (e.IsInit) {
      if (n instanceof CharacterActorComponent_1.CharacterActorComponent) {
        n.FixBornLocation("ResetLocationForZRangeNotify", true, r, false, true);
      } else if (n instanceof VehicleActorComponent_1.VehicleActorComponent) {
        n.FixBornLocation(r, "ResetLocationForZRangeNotify");
      } else {
        n.SetActorLocation(r.ToUeVector(), "ResetLocationForZRangeNotify", false);
      }
      if (o.PDs) {
        a = WorldGlobal_1.WorldGlobal.ToUeRotator(o.g8n);
        n.SetActorRotation(a, "ResetLocationForZRangeNotify");
      }
      a = e.Entity.GetComponent(178);
      t = e.Entity.GetComponent(236);
      a?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      t?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      e.Entity.GetComponent(67)?.ClearReplaySamples();
      e.Entity.GetComponent(156)?.ResetManipulatableState();
    } else {
      s.SetLocation(r);
      if (o.PDs) {
        a = WorldGlobal_1.WorldGlobal.ToUeRotator(o.g8n);
        s.SetRotation(a);
      }
    }
    if (o.UDs) {
      s.SetInitLocation(r);
      e.Entity.GetComponent(3)?.SetInitLocation(r);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 14, "ResetLocationForZRangeNotify 重置实体位置", ["CreatureDataId", e.CreatureDataId], ["PbDataId", e.PbDataId], ["EntityId", e.Entity.Id], ["ChangeInitPos", o.UDs], ["IsInit", e.IsInit], ["Location", r.ToString()], ["FinalLocation", n?.ActorLocationProxy]);
    }
  }
  static gIt(e) {
    var o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    var a = MathUtils_1.MathUtils.LongToNumber(e.Y8n);
    if (CombatMessageController.IsDebugMessageLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MultiplayerCombat", 14, "[CombatMessageController.ReceiveNotify]", ["Originator", a]);
    }
    if (t) {
      if (e.iVn.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiplayerCombat", 14, "[CombatMessageController.MoveInfosHandle], MoveInfos 是空的", ["Originator", a]);
        }
      } else {
        var r = e.iVn[0].J8n;
        if (t.Entity.Active) {
          var s = CombatMessageController.Model.GetMessageBuffer(a);
          if (s) {
            n = t.Entity.GetComponent(0);
            CombatMessageController.Model.SetEntityMap(t.Id, a);
            s.RecordMessageTime(r, n.GetPbDataId(), true);
          }
          const l = t.Entity.GetComponent(67);
          if (l) {
            l.ReceiveMoveInfos(e.iVn, Number(a), r);
          } else {
            CombatLog_1.CombatLog.Warn("Move", t.Entity, "entity不存在组件CharacterMovementSyncComponent", ["creatureDataId", o]);
          }
        } else {
          if (!t.IsInit) {
            return;
          }
          const l = t.Entity.GetComponent(67);
          var n;
          var s = t.Entity.GetComponent(229);
          if (!s || !(s.Seat >= 0)) {
            n = e.iVn[e.iVn.length - 1];
            CombatMessageController.fIt(n.P5n, CombatMessageController.pIt);
            CombatMessageController.vIt(n.g8n, CombatMessageController.MIt);
            t.Entity.GetComponent(3)?.SetActorLocationAndRotation(CombatMessageController.pIt, CombatMessageController.MIt, "MoveInfosHandle", false);
          }
          l?.ClearReplaySamples();
        }
      }
    }
  }
  static EntityIsVisibleNotify(e, o) {
    if (e) {
      if (e.IsInit) {
        CombatLog_1.CombatLog.Info("Actor", e, "Entity通知设置显隐", ["v", o.rVn]);
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e, o.rVn, "CombatMessageController.EntityIsVisibleNotify");
      } else {
        e.GetComponent(0)?.SetVisible(o.rVn);
      }
    }
  }
  static ActorIsVisibleNotify(e, o) {
    if (e && (CombatLog_1.CombatLog.Info("Actor", e, "Actor通知设置显隐", ["v", o.oVn]), ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(e, o.oVn, o.oVn, o.oVn, "ActorIsVisibleNotify"), e = e.GetComponent(0))) {
      e.ActorVisible = o.oVn;
    }
  }
  static EIt(e) {
    var o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    if (t) {
      if (t = t.Entity.GetComponent(47)) {
        t.OnSyncAiInformation(e);
      } else {
        CombatLog_1.CombatLog.Warn("Ai", o, "OnSyncAiInformation 不存在CharacterAiComponent");
      }
    } else {
      CombatLog_1.CombatLog.Warn("Ai", o, "OnSyncAiInformation 不存在实体");
    }
  }
  static EntityLoadCompleteNotify(e, o) {
    var t = o.W5n;
    for (const r of o.PSs) {
      var a = MathUtils_1.MathUtils.LongToNumber(r);
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      if (a) {
        a.Entity.GetComponent(47)?.SetLoadCompletePlayer(t);
      }
    }
  }
  static PlayerRebackSceneNotify(e, o) {
    o = MathUtils_1.MathUtils.LongToNumber(o.NDs);
    o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    if (o) {
      o.Entity.GetComponent(68).ClearReplaySamples();
    }
  }
  static MaterialNotify(e, o) {
    if (o.sVn.nVn.length <= 0 || o.sVn.nVn === "None") {
      CombatLog_1.CombatLog.Warn("Material", e, "材质同步失败，参数非法");
    } else {
      const t = e?.GetComponent(2)?.Actor;
      if (t) {
        if (o.sVn.aVn) {
          ResourceSystem_1.ResourceSystem.LoadAsync(o.sVn.nVn, UE.PD_CharacterControllerDataGroup_C, e => {
            if (e) {
              t.CharRenderingComponent.AddMaterialControllerDataGroup(e);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 4, "无法找到材质效果", ["data.MaterialInfo.AssetName", o.sVn.nVn]);
            }
          });
        } else {
          ResourceSystem_1.ResourceSystem.LoadAsync(o.sVn.nVn, UE.PD_CharacterControllerData_C, e => {
            if (e) {
              t.CharRenderingComponent.AddMaterialControllerData(e);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 4, "无法找到材质效果组", ["data!.MaterialInfo.AssetName", o.sVn.nVn]);
            }
          });
        }
      } else {
        CombatLog_1.CombatLog.Warn("Material", e, "材质同步失败，Actor为空");
      }
    }
  }
  static fIt(e, o) {
    o.X = e.X;
    o.Y = e.Y;
    o.Z = e.Z;
  }
  static vIt(e, o) {
    o.Pitch = e.Pitch;
    o.Roll = e.Roll;
    o.Yaw = e.Yaw;
  }
}
(_a = CombatMessageController).IsTickEvenPausedInternal = true;
CombatMessageController.IsDebugMessageLog = false;
CombatMessageController.IsDebugMoveMessage = false;
CombatMessageController.StartTime = 0;
CombatMessageController.MoveData = 0;
CombatMessageController.MoveDataCount = 0;
CombatMessageController.StateData = 0;
CombatMessageController.StateDataCount = 0;
CombatMessageController.sX = new Map();
CombatMessageController.SIt = Stats_1.Stat.Create("CombatPackNotify.CombatReceivePackNotifyStat", "", StatDefine_1.BATTLESTAT_GROUP);
CombatMessageController.aIt = new Map();
CombatMessageController.rIt = e => {
  _a.SIt.Start();
  for (const a of e.R5n) {
    var o;
    var t;
    if (a.KLs) {
      o = a.KLs;
      (t = _a.sIt(o.kFs))?.Start();
      _a.hIt(o.K8n, o);
      t?.Stop();
    } else if (a.QLs) {
      o = a.QLs;
      (t = _a.sIt(o.kFs))?.Start();
      _a.lIt(o.K8n, o);
      t?.Stop();
    }
  }
  _a.SIt.Stop();
};
CombatMessageController.mIt = 0;
CombatMessageController.dIt = 1;
CombatMessageController.uIt = Stats_1.Stat.Create("CombatMessageBuffer");
CombatMessageController.CIt = Stats_1.Stat.Create("CombatMessageHatred");
CombatMessageController.Y7 = new Map();
CombatMessageController._It = new Map();
CombatMessageController.WC1 = new Set();
CombatMessageController.RegisterAiHateEntity = (e, o) => {
  if (o.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Monster || o.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
    if (_a.WC1.has(o)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("CombatInfo", 14, "[CombatMessageController.RegisterAiHateEntity] 当前已经注册过Monster");
      }
    } else {
      _a.WC1.add(o);
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(_a, o, EventDefine_1.EEventName.RemoveEntity, _a.UnregisterMonster);
    }
  }
};
CombatMessageController.UnregisterMonster = (e, o) => {
  if (o.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Monster || o.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
    if (_a.WC1.delete(o)) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(_a, o, EventDefine_1.EEventName.RemoveEntity, _a.UnregisterMonster);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("CombatInfo", 14, "[CombatMessageController.RegisterAiHateEntity] 当前Monster未被注册");
    }
  }
};
CombatMessageController.cIt = new Set();
CombatMessageController.TickPriority1 = e => {
  if (Net_1.Net.IsServerConnected() && ModelManager_1.ModelManager.GameModeModel.MapDone) {
    var o;
    var t;
    var a = e * MathUtils_1.MathUtils.MillisecondToSecond;
    _a.uIt.Start();
    for (const r of _a.Model.CombatMessageBufferMap.values()) {
      r.OnTick(a);
    }
    _a.uIt.Stop();
    for ([o, t] of _a.Y7) {
      try {
        if (o.Entity?.Valid) {
          t(e);
        }
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("CombatInfo", 14, "处理方法执行异常", e, ["comp", o.toString()], ["error", e.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CombatInfo", 14, "处理方法执行异常", ["comp", o.toString()], ["error", e]);
        }
      }
    }
  }
};
CombatMessageController.Zyt = e => {
  var o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
  if (t?.Valid) {
    CombatMessageController.pga(t, e);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Level", 31, "[ResetLocationForZRangeNotify] 找不到对应的Entity", ["id", o]);
  }
};
CombatMessageController.eIt = e => {
  for (const o of e.WRs) {
    _a.gIt(o);
  }
};
CombatMessageController.tIt = e => {
  for (const o of e.WRs) {
    _a.gIt(o);
  }
};
CombatMessageController.sMa = e => {
  var o = MathUtils_1.MathUtils.LongToNumber(e.M0a.F4n);
  var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
  if (o &&= o.Entity.GetComponent(128)) {
    o.HandleMoveToTarget(e);
  }
};
CombatMessageController.oIt = e => {
  for (const o of e.ASs) {
    CombatMessageController.EIt(o);
  }
};
CombatMessageController.PreAiControlSwitchNotify = e => {
  for (const a of e.PSs) {
    var o = MathUtils_1.MathUtils.LongToNumber(a);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    if (t) {
      if (t = t.Entity.GetComponent(47)) {
        t.AiController.PreSwitchControl();
      }
    } else {
      CombatLog_1.CombatLog.Warn("Ai", o, "PreAiControlSwitchNotify 不存在实体", ["id", o]);
    }
  }
};
CombatMessageController.Ei_ = e => {
  var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.F4n));
  if (o?.IsInit) {
    if (o = o.Entity.GetComponent(243)) {
      o.HandleSplineMoveNotify(e.Ii_, e.Ti_);
    }
  } else {
    CombatLog_1.CombatLog.Warn("Notify", undefined, "SplineMoveNotify实体不存在", ["id", e.F4n]);
  }
};
CombatMessageController.pIt = new UE.VectorDouble();
CombatMessageController.MIt = new UE.Rotator();
__decorate([CombatMessage_1.CombatNet.Listen("BFn", true)], CombatMessageController, "EntityIsVisibleNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("p3n", true)], CombatMessageController, "ActorIsVisibleNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("UFn", false)], CombatMessageController, "EntityLoadCompleteNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("bFn", false)], CombatMessageController, "PlayerRebackSceneNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("PFn", true)], CombatMessageController, "MaterialNotify", null);
exports.CombatMessageController = CombatMessageController; //# sourceMappingURL=CombatMessageController.js.map