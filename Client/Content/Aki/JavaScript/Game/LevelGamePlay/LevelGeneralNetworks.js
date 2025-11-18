"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGeneralNetworks = exports.WAIT_ENTITY_ERROR_TIME = undefined;
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Log_1 = require("../../Core/Common/Log");
const EntitySelfEventConfigByKey_1 = require("../../Core/Define/ConfigQuery/EntitySelfEventConfigByKey");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const Net_1 = require("../../Core/Net/Net");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const IComponent_1 = require("../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const GeneralLogicTreeDefine_1 = require("../Module/GeneralLogicTree/Define/GeneralLogicTreeDefine");
const TsInteractionUtils_1 = require("../Module/Interaction/TsInteractionUtils");
const SceneItemDynamicAttachTargetComponent_1 = require("../NewWorld/SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent");
const SceneItemJigsawBaseComponent_1 = require("../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const SceneItemUtility_1 = require("../NewWorld/SceneItem/Util/SceneItemUtility");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
const CombatLog_1 = require("../Utils/CombatLog");
const WaitEntityTask_1 = require("../World/Define/WaitEntityTask");
const AlertAreaController_1 = require("./AlertArea/AlertAreaController");
const LevelGamePlayUtils_1 = require("./LevelGamePlayUtils");
const LevelGeneralCommons_1 = require("./LevelGeneralCommons");
const LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine");
const LevelGeneralContextUtil_1 = require("./LevelGeneralContextUtil");
exports.WAIT_ENTITY_ERROR_TIME = 90000;
class LevelGeneralNetworks {
  static Register() {
    Net_1.Net.Register(24942, this.QUe);
    Net_1.Net.Register(15046, LevelGeneralNetworks.XUe);
    Net_1.Net.Register(19171, LevelGeneralNetworks.$Ue);
    Net_1.Net.Register(28300, LevelGeneralNetworks.YUe);
    Net_1.Net.Register(20267, LevelGeneralNetworks.JUe);
    Net_1.Net.Register(28018, this.zUe);
    Net_1.Net.Register(29566, this.XTl);
    Net_1.Net.Register(20574, this.ZUe);
    Net_1.Net.Register(25706, this.Iqn);
    Net_1.Net.Register(20725, this.eAe);
    Net_1.Net.Register(23397, this.tAe);
    Net_1.Net.Register(28791, this.iAe);
    Net_1.Net.Register(22953, this.mza);
    Net_1.Net.Register(17733, this.dza);
    Net_1.Net.Register(29714, this.rAe);
    Net_1.Net.Register(17762, this.nAe);
    Net_1.Net.Register(28170, this.sAe);
    Net_1.Net.Register(24421, this.HPl);
    Net_1.Net.Register(26599, this.aAe);
    Net_1.Net.Register(15823, this.hAe);
    Net_1.Net.Register(26205, this.lAe);
    Net_1.Net.Register(26489, this._Ae);
    Net_1.Net.Register(17454, this.uAe);
    Net_1.Net.Register(29933, this.URn);
    Net_1.Net.Register(26011, this.Pm1);
    Net_1.Net.Register(24523, this.sQs);
    Net_1.Net.Register(19896, this.mla);
    Net_1.Net.Register(27997, this.u3a);
    Net_1.Net.Register(27455, this.$Ja);
    Net_1.Net.Register(23715, this.$rh);
    Net_1.Net.Register(18361, this.xal);
    Net_1.Net.Register(22505, this.yMl);
    Net_1.Net.Register(26326, this.rEl);
    Net_1.Net.Register(23958, this.oEl);
    Net_1.Net.Register(23961, this.nEl);
    Net_1.Net.Register(24313, this.FTl);
    Net_1.Net.Register(22363, this.mwl);
    Net_1.Net.Register(15317, this.ujl);
    Net_1.Net.Register(23545, this.R2_);
    Net_1.Net.Register(29389, this.A2_);
    Net_1.Net.Register(27824, this.kZ_);
    Net_1.Net.Register(17387, this.Flc);
    Net_1.Net.Register(29441, this.XS1);
    Net_1.Net.Register(27252, this.ob1);
    Net_1.Net.Register(17161, this.B5u);
    Net_1.Net.Register(15971, this.Xjd);
  }
  static UnRegister() {
    Net_1.Net.UnRegister(24942);
    Net_1.Net.UnRegister(15046);
    Net_1.Net.UnRegister(19171);
    Net_1.Net.UnRegister(28300);
    Net_1.Net.UnRegister(28018);
    Net_1.Net.UnRegister(20574);
    Net_1.Net.UnRegister(25706);
    Net_1.Net.UnRegister(20725);
    Net_1.Net.UnRegister(28791);
    Net_1.Net.UnRegister(22953);
    Net_1.Net.UnRegister(17733);
    Net_1.Net.UnRegister(29714);
    Net_1.Net.UnRegister(28170);
    Net_1.Net.UnRegister(26599);
    Net_1.Net.UnRegister(26205);
    Net_1.Net.UnRegister(26489);
    Net_1.Net.UnRegister(17454);
    Net_1.Net.UnRegister(29933);
    Net_1.Net.UnRegister(26011);
    Net_1.Net.UnRegister(19896);
    Net_1.Net.UnRegister(27997);
    Net_1.Net.UnRegister(27455);
    Net_1.Net.UnRegister(23715);
    Net_1.Net.UnRegister(18361);
    Net_1.Net.UnRegister(22505);
    Net_1.Net.UnRegister(26326);
    Net_1.Net.UnRegister(23958);
    Net_1.Net.UnRegister(23961);
    Net_1.Net.UnRegister(24313);
    Net_1.Net.UnRegister(22363);
    Net_1.Net.UnRegister(15317);
    Net_1.Net.UnRegister(23545);
    Net_1.Net.UnRegister(29389);
    Net_1.Net.UnRegister(27824);
    Net_1.Net.UnRegister(17387);
    Net_1.Net.UnRegister(17161);
    Net_1.Net.UnRegister(15971);
  }
  static cAe(e) {
    var t;
    var o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Entity?.GetComponent(160);
    if (o) {
      t = MathUtils_1.MathUtils.LongToNumber(e.bDs);
      o.SetControllerId(t);
      if (e.BDs) {
        o.ResetItemLocationAndRotation();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[ControllerIdModifyNotify] 找不到Entity对应的SceneItemManipulatableComponent");
    }
  }
  static Tqn(e, t) {
    var o;
    var r = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e);
    if (r?.Valid) {
      if (o = r?.Entity?.GetComponent(162)) {
        o.SetAutonomousId(t);
      } else {
        CombatLog_1.CombatLog.Error("Move", r?.Entity, "[ControllerIdModifyNotify] 场景物找不到移动同步组件", ["entityId", e], ["PbDataId", r.PbDataId], ["posSender", t]);
      }
    } else {
      CombatLog_1.CombatLog.Error("Move", r?.Entity, "[ControllerIdModifyNotify] 场景物找不到对应的实体", ["entityId", e], ["posSender", t]);
    }
  }
  static mAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.xDs);
    var o = MathUtils_1.MathUtils.LongToNumber(e.wDs);
    var e = e.BIs - 1;
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
    if (r?.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(r.Entity, EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation, o, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "BeControlledPosInFoundationNotify下发的Id找不到对应的Entity", ["EntityConfigId", t]);
    }
  }
  static dAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    var o = MathUtils_1.MathUtils.LongToNumber(e.bDs);
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    var r = o?.Entity?.GetComponent(3);
    if (r && !r.IsRoleAndCtrlByMe) {
      r = o.Entity.GetComponent(65);
      if (e.q5n) {
        r.ActiveHandFX(t.Entity);
      } else {
        r.DeactiveHandFx();
      }
    }
  }
  static Cza(e) {
    var t;
    var o;
    var r = MathUtils_1.MathUtils.LongToNumber(e.DI_);
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
    var a = r.Entity.GetComponent(141);
    var r = r.Entity.GetComponent(165);
    if (r && r.Valid) {
      r = r.Config.Config.Type;
      t = MathUtils_1.MathUtils.LongToNumber(e.nLs.iLs);
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t).Entity.GetComponent(142);
      o = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.nLs.l8n.N5n, e.nLs.l8n.F5n);
      t.Rotation = e.nLs.l8n.V5n;
      a.PutDownItem(t, o, r);
    }
  }
  static gza(e) {
    var t;
    var o;
    var r = MathUtils_1.MathUtils.LongToNumber(e.DI_);
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
    var a = r.Entity.GetComponent(141);
    var r = r.Entity.GetComponent(165);
    if (r && r.Valid) {
      r = r.Config.Config.Type;
      t = MathUtils_1.MathUtils.LongToNumber(e.nLs.iLs);
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t).Entity.GetComponent(142);
      o = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.nLs.l8n.N5n, e.nLs.l8n.F5n);
      t.Rotation = e.nLs.l8n.V5n;
      a.PickUpItem(t, o, r);
    }
  }
  static gAe(e) {
    var t = MathUtils_1.MathUtils.LongToNumber(e.G5n);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t).Entity.GetComponent(141);
    var o = MathUtils_1.MathUtils.LongToNumber(e.O5n);
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o).Entity.GetComponent(142);
    var r = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.k5n.N5n, e.k5n.F5n);
    o.Rotation = e.k5n.V5n;
    t.PickUpItem(o, r, IComponent_1.EItemFoundation.BuildingBlock);
    t.PutDownItem(o, r, IComponent_1.EItemFoundation.BuildingBlock);
  }
  static fAe(e) {
    e = MathUtils_1.MathUtils.LongToNumber(e.j5n);
    ModelManager_1.ModelManager.CreatureModel.GetEntity(e).Entity.GetComponent(141).OnFinish();
  }
  static pAe(r, a, n, l) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "执行EntityGroupAction，等待创建Entity", ["CreatureDataId", a], ["PlayerId", r.W5n], ["SessionId", r.w5n], ["StartIndex", r.K5n], ["EndIndex", r.mvs]);
    }
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.HandleEntityGroupActionByServerNotify", a, t => {
      if (t) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
        if (t) {
          var o = t.Entity.GetComponent(0)?.GetPbEntityInitData();
          if (o) {
            o = (0, IComponent_1.getComponent)(o.ComponentsData, "EntityGroupComponent");
            if (o && o?.StateTriggers?.length) {
              let e = o.StateTriggers[l]?.SuccessActions;
              if ((e = n ? e : o.StateTriggers[l]?.FailActions)?.length) {
                if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("LevelEvent", 7, "执行EntityGroupAction，Entity创建完毕", ["CreatureDataId", a], ["PlayerId", r.W5n], ["SessionId", r.w5n], ["StartIndex", r.K5n], ["EndIndex", r.mvs]);
                }
                ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, LevelGeneralContextDefine_1.EntityContext.Create(t.Id), r.W5n, r.w5n, r.K5n, r.mvs, r.sS_);
              }
            }
          }
        }
      }
    }, exports.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static R2l(o, r) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "执行EntityGroupFailureAction，等待创建Entity", ["CreatureDataId", r], ["PlayerId", o.W5n], ["SessionId", o.w5n], ["StartIndex", o.K5n], ["EndIndex", o.mvs]);
    }
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.HandleEntityGroupFailureActionByServerNotify", r, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) && (t = e.Entity.GetComponent(0)?.GetPbEntityInitData()) && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "EntityGroupComponent")?.FailureState?.FailureOperations.Actions)?.length) {
        if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 7, "执行EntityGroupFailureAction，Entity创建完毕", ["CreatureDataId", r], ["PlayerId", o.W5n], ["SessionId", o.w5n], ["StartIndex", o.K5n], ["EndIndex", o.mvs]);
        }
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), o.W5n, o.w5n, o.K5n, o.mvs, o.sS_);
      }
    }, exports.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static lR1(o, r, a) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "执行ntityConditionListenerAction，等待创建Entity", ["CreatureDataId", r], ["PlayerId", o.W5n], ["SessionId", o.w5n], ["StartIndex", o.K5n], ["EndIndex", o.mvs]);
    }
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.HandleEntityConditionListenerActionByServerNotify", r, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) && (t = e.Entity.GetComponent(0)?.GetPbEntityInitData()) && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "ConditionListenerComponent"))?.Listeners?.length && (t = t.Listeners[a]?.Actions)?.length) {
        if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 7, "执行EntityConditionListenerAction，Entity创建完毕", ["CreatureDataId", r], ["PlayerId", o.W5n], ["SessionId", o.w5n], ["StartIndex", o.K5n], ["EndIndex", o.mvs]);
        }
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), o.W5n, o.w5n, o.K5n, o.mvs, o.sS_);
      }
    }, exports.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static OId(o, r, a, n) {
    if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 18, "执行ntityConditionListenerAction，等待创建Entity", ["CreatureDataId", r], ["PlayerId", o.W5n], ["SessionId", o.w5n], ["StartIndex", o.K5n], ["EndIndex", o.mvs]);
    }
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.HandleEntityConditionListenerActionByServerNotify", r, e => {
      var t;
      if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) && (t = e.Entity.GetComponent(0)?.GetPbEntityInitData()) && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "ConditionListenerComponent"))?.Listeners?.length && (t = t.Listeners[a]?.ConditionAction[n].Action)?.length) {
        if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 18, "执行EntityConditionListenerAction，Entity创建完毕", ["CreatureDataId", r], ["PlayerId", o.W5n], ["SessionId", o.w5n], ["StartIndex", o.K5n], ["EndIndex", o.mvs]);
        }
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(t, LevelGeneralContextDefine_1.EntityContext.Create(e.Id), o.W5n, o.w5n, o.K5n, o.mvs, o.sS_);
      }
    }, exports.WAIT_ENTITY_ERROR_TIME, true, true);
  }
  static RequestSceneItemStateChange(e, t) {
    var o = Protocol_1.Aki.Protocol.fms.create();
    o.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    o.Q5n = t;
    Net_1.Net.Call(20368, o, e => {});
  }
  static RequestActiveOrDeactiveManipulateFx(e, t) {
    var o = Protocol_1.Aki.Protocol.Dds.create();
    o.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    o.q5n = t;
    Net_1.Net.Call(23913, o, e => {});
  }
  static RequestAwakePbEntity(e, t) {}
  static RequestSpawnPbEntity(e, t) {
    t(true);
  }
  static RequestChangeEntityState(t, e) {
    var o = Protocol_1.Aki.Protocol.pds.create();
    o.F4n = t.EntityId;
    o.X5n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.State);
    Net_1.Net.Call(24618, o, e => {
      if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Level", 7, "[ControllerHolder.LevelGeneralController.RequestChangeEntityState] 请求实体状态改变成功", ["PbDataId:", t.EntityId], ["TargetState:", t.State]);
      }
    });
  }
  static RequestEntitySendEvent(t, o) {
    var e;
    if (EntitySelfEventConfigByKey_1.configEntitySelfEventConfigByKey.GetConfig(o) === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 64, "[ControllerHolder.LevelGeneralController.RequestEntitySendEvent] 不能获取实体事件配置，请在s.实体自身事件文件夹中添加配置", ["creatureDataId:", t], ["eventKey:", o]);
      }
    } else {
      (e = Protocol_1.Aki.Protocol.tts.create()).F4n = t;
      e.$5n = o;
      Net_1.Net.Call(29845, e, e => {
        if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Level", 35, "[ControllerHolder.LevelGeneralController.EntitySendEventResponse] 请求实体监听事件成功", ["creatureDataId:", t], ["eventKey:", o]);
        }
      });
    }
  }
  static RequestDoAction(e, t) {}
  static RequestSetInitTagRequest(e) {
    var t;
    if (e) {
      (t = Protocol_1.Aki.Protocol.Vds.create()).F4n = MathUtils_1.MathUtils.NumberToLong(e);
      Net_1.Net.Call(24591, t, e => {});
    }
  }
  static RequestActionsFinish(e, t, o, r, a) {
    var n = Protocol_1.Aki.Protocol.d$n.create();
    n.W5n = e;
    n.w5n = t;
    n.K5n = o;
    n.J5n = r;
    Net_1.Net.Call(27403, n, a);
  }
  static RequestEntityInteractOption(e, t, o, r) {
    var a = Protocol_1.Aki.Protocol.Res.create();
    a.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    a.z5n = t;
    if (r) {
      a.Z5n = r;
    }
    Net_1.Net.Call(15250, a, o);
  }
  static RequestEntityDynamicInteractOption(e, t, o) {
    var r = Protocol_1.Aki.Protocol.Ues.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    r.e6n = t;
    Net_1.Net.Call(17213, r, o);
  }
  static RequestEntityRandomInteractOption(e, t, o) {
    var r = Protocol_1.Aki.Protocol.Aes.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    r.z5n = t;
    Net_1.Net.Call(26064, r, o);
  }
  static RequestClientTeleportByClientTrigger(e, t, o, r, a, n, l) {
    var i = Protocol_1.Aki.Protocol.Gg_.create();
    i.P5n = o;
    i.g8n = r;
    i.mpl = Protocol_1.Aki.Protocol.Xw_.dpl;
    var o = Protocol_1.Aki.Protocol.Yw_.create();
    var r = Protocol_1.Aki.Protocol.Cpl.create();
    r.c5n = a;
    var a = Protocol_1.Aki.Protocol.IOs.create();
    a.fvs = Protocol_1.Aki.Protocol.TOs.Proto_ClientTriggerActionCtx;
    var _ = Protocol_1.Aki.Protocol.aw_.create();
    _.SDs = n;
    var n = Protocol_1.Aki.Protocol.DOs.create();
    n.v9n = t;
    n.w5n = e;
    _.eps = n;
    a.dpl = _;
    r.gpl = a;
    o.Cpl = r;
    i.ppl = o;
    Net_1.Net.Call(21488, i, l);
  }
  static RequestClientTeleportByNoRenderPortal(e, t, o, r) {
    var a = Protocol_1.Aki.Protocol.Gg_.create();
    a.P5n = Protocol_1.Aki.Protocol.Gks.create();
    a.P5n.X = t.X;
    a.P5n.Y = t.Y;
    a.P5n.Z = t.Z;
    a.g8n = Protocol_1.Aki.Protocol.D2s.create();
    a.g8n.Roll = o.Roll;
    a.g8n.Pitch = o.Pitch;
    a.g8n.Yaw = o.Yaw;
    a.mpl = Protocol_1.Aki.Protocol.Xw_.Proto_NoRenderPortalComponent;
    a.ppl = Protocol_1.Aki.Protocol.Yw_.create();
    a.ppl.MIl = Protocol_1.Aki.Protocol.MIl.create();
    a.ppl.MIl.A5n = e;
    Net_1.Net.Call(21488, a, r);
  }
  static IsEntityEnableAwake(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && ModelManager_1.ModelManager.PlayerInfoModel.GetId() !== ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) {
      for (const t of e) {
        ModelManager_1.ModelManager.CreatureModel.GetEntityData(t);
      }
    }
    return true;
  }
  static CheckCurrentPlayerIsParticipator(e) {
    if (!e) {
      return false;
    }
    let t = false;
    switch (e.Type) {
      case 2:
        t = LevelGeneralNetworks.vAe(e.QuestId);
        break;
      case 3:
        t = LevelGeneralNetworks.MAe(e.LevelPlayId);
        break;
      case 4:
        t = LevelGeneralNetworks.EAe(e.InstanceDungeonId);
        break;
      case 6:
        t = LevelGeneralNetworks.SAe(e.BtType, e.TreeConfigId);
        break;
      case 1:
        t = true;
    }
    return t;
  }
  static SAe(e, t) {
    let o = false;
    switch (e) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        o = LevelGeneralNetworks.vAe(t);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        o = LevelGeneralNetworks.MAe(t);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        o = LevelGeneralNetworks.EAe(t);
    }
    return o;
  }
  static vAe(e) {
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (!e) {
      return false;
    }
    let t = false;
    switch (e.OnlineType) {
      case "SingleHangUpOnline":
        t = !ModelManager_1.ModelManager.GameModeModel.IsMulti;
        break;
      case "SingleNotHangUpOnline":
        t = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
    }
    return t;
  }
  static MAe(e) {
    e = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(e);
    if (!e) {
      return false;
    }
    let t = false;
    switch (e.OnlineType) {
      case "Local":
        t = !ModelManager_1.ModelManager.GameModeModel.IsMulti;
        break;
      case "SingleOnline":
        t = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
        break;
      case "Multiplayer":
        t = true;
    }
    return t;
  }
  static EAe(e) {
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === e;
  }
  static RequestPlayerAccessEffectArea(e, t) {
    var o = Protocol_1.Aki.Protocol.Ugs.create();
    o.zWn = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    o.i6n = t ? Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter : Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave;
    Net_1.Net.Call(28654, o, e => {});
  }
  static aQs(e, t, o) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity?.GetComponent(231);
    if (e) {
      if (o) {
        e.ServerConnectEntities(t);
      } else {
        e.ServerDisconnectEntities(t);
      }
    }
  }
  static PushEntityTimeDilation(e, t) {
    var o = Protocol_1.Aki.Protocol.Cm_.create();
    o.F4n = e;
    o.dKn = t;
    Net_1.Net.Send(23518, o);
  }
  static CheckEntityCanPushTimeDilation(e) {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti && e === 1;
  }
  static RequestEntityCameraAlertStateChange(o, r) {
    var e = Protocol_1.Aki.Protocol.Xp_.create();
    e.F4n = o;
    e.eOl = r;
    Net_1.Net.Call(22742, e, e => {
      var t = !r && e?.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_CameraAlertHasNotAlert || r && e?.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_CameraAlertHasAlert;
      if (!e || !t && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 35, "[LevelGeneralNetworks.RequestEntityCameraAlertStateChange] 请求摄像头预警触发状态变更失败", ["CreatureDataId", o], ["IsAlert", r]);
        }
      }
    });
  }
  static Rqu(e) {
    var e = MathUtils_1.MathUtils.LongToNumber(e);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (t?.Valid && t.Entity?.Valid) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 72, "ActionRelatedEntityInfoNotify Entity不存在", ["CreatureDataId", e]);
    }
  }
  static Nlc(t) {
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnCreateVehicleEntity", t, e => {
      if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid && e.Entity?.Valid) {
        ControllerHolder_1.ControllerHolder.GongduolaSummonController.PlaySummonAnim(e.Entity);
      }
    });
  }
  static Vlc(a, n, l, i) {
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnReplaceVehicleEntity", a, e => {
      if (e) {
        const o = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
        if (o?.Valid && o.Entity?.Valid) {
          e = o.Entity.GetComponent(1);
          if (e?.Valid) {
            var t = o.Entity.GetComponent(240);
            if (t?.Valid) {
              const r = e.Owner;
              if (r instanceof TsBaseVehicle_1.default) {
                if (r.WasRecentlyRenderedOnScreen(0.5)) {
                  ControllerHolder_1.ControllerHolder.GongduolaSummonController.PlayCancelSummonAnim(o.Entity, n, l, i);
                } else {
                  ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(o.Entity, false, "GongduolaSummonController.BeforePlaySummonAnim", false);
                  if (!i.IsZero()) {
                    t.SetGravityDirect(i);
                  }
                  TimerSystem_1.TimerSystem.Delay(() => {
                    r.VehicleActorComponent.SetActorLocationAndRotation(n.ToUeVector(), l.ToUeRotator(), "TsAnimNotifySummonGongduolaSetLocAndRot");
                    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r.VehicleActorComponent.Entity, true, "GongduolaSummonController.BeforePlaySummonAnim", false);
                    ModelManager_1.ModelManager.GongduolaSummonModel.SummonLocation = undefined;
                    ModelManager_1.ModelManager.GongduolaSummonModel.SummonRotation = undefined;
                    ControllerHolder_1.ControllerHolder.GongduolaSummonController.PlaySummonAnim(o.Entity);
                    if (Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("Temp", 31, "[ChTest]TsAnimNotifySummonGongduolaSetLocAndRot");
                    }
                  }, 100);
                }
              }
            }
          }
        }
      }
    });
  }
  static async k5u(e, t) {
    if (e) {
      ModelManager_1.ModelManager.GameModeModel.EnableHLODStreaming(1);
    } else {
      ModelManager_1.ModelManager.GameModeModel.DisableHLODStreaming(1);
    }
    ModelManager_1.ModelManager.GameModeModel.ForceClientTravel = true;
    this.n8u = new CustomPromise_1.CustomPromise();
    EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.ForceClientTravelModify, this.s8u);
    ModelManager_1.ModelManager.LoadingModel.LoadingTexturePathOverride = t;
    e = await this.n8u.Promise;
    ModelManager_1.ModelManager.GameModeModel.ForceClientTravel = false;
    ModelManager_1.ModelManager.LoadingModel.LoadingTexturePathOverride = undefined;
    this.n8u = undefined;
    t = Protocol_1.Aki.Protocol.R5u.create();
    t = await Net_1.Net.CallAsync(18342, t);
    if (!t || t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 72, "[LevelGeneralNetworks] LowMemoryChangeSceneFinish response", ["ErrorCode", t?.Q4n], ["FromForceClientTravel", e]);
      }
    }
  }
  static PushCharacterMoveToPointEnd(e, t) {
    var o = Protocol_1.Aki.Protocol.Bjd.create();
    o.F4n = e;
    o.LAc = t;
    Net_1.Net.Send(20593, o);
  }
  static HandleRecvCharacterMoveToPoint(e, t) {
    const o = e.GetComponent(0).GetCreatureDataId();
    const r = e.GetComponent(0).GetEntityType();
    var a = t.CIl;
    var a = {
      Points: [{
        Index: 0,
        Position: Vector_1.Vector.Create(a?.X ?? 0, a?.Y ?? 0, a?.Z ?? 0)
      }],
      Navigation: t.Pmu === 1,
      IsFly: false,
      DebugMode: true,
      Loop: false,
      ReturnFalseWhenNavigationFailed: false,
      ReturnTimeoutFailed: 10,
      Callback: e => {
        e = e !== 1;
        if (r === Protocol_1.Aki.Protocol.kks.Proto_Player) {
          LevelGamePlayUtils_1.LevelGamePlayUtils.TogglePlayerControl(true, "CharacterMoveToPoint:End");
        }
        LevelGeneralNetworks.PushCharacterMoveToPointEnd(o, e);
      }
    };
    switch (r) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
        if (e.Id !== Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 39, "[CharacterMoveToPoint] 试图让非主控角色移动", ["CreatureDataId", o], ["EntityId", e.Id], ["EntityType", r]);
          }
          return;
        }
        LevelGamePlayUtils_1.LevelGamePlayUtils.TogglePlayerControl(false, "CharacterMoveToPoint:Start");
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 39, "[CharacterMoveToPoint] 不支持的实体类型", ["CreatureDataId", o], ["EntityId", e.Id], ["EntityType", r]);
        }
        return;
    }
    t = e.GetComponent(45);
    if (t?.IsMovingToLocation()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 39, "[CharacterMoveToPoint]正在移动中，先停止当前移动并触发回调", ["CreatureDataId", o], ["EntityId", e.Id], ["EntityType", r]);
      }
      t.MoveToLocationEnd(2);
    }
    t?.MoveAlongPath(a);
  }
  static HandleRecvChracterMoveToPointEnd(e, t) {
    e = e.GetComponent(45);
    if (e?.IsMovingToLocation()) {
      if (t) {
        e.MoveToLocationEnd(2);
      } else {
        e.MoveToLocationEnd(1);
      }
    }
  }
}
exports.LevelGeneralNetworks = LevelGeneralNetworks;
(_a = LevelGeneralNetworks).XUe = o => {
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnEntityAddDynamicInteractNotify", MathUtils_1.MathUtils.LongToNumber(o.F4n), e => {
    var t;
    if (e) {
      if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(o.F4n)))?.Valid) {
        t = LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(o.cvs);
        ModelManager_1.ModelManager.InteractionModel.AddInteractOption(e.Entity, o.e6n, t, o.DIs, o.XCa);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 36, "[EntityAddDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）", ["id", MathUtils_1.MathUtils.LongToBigInt(o.F4n)]);
    }
  }, exports.WAIT_ENTITY_ERROR_TIME, true, true);
};
LevelGeneralNetworks.$Ue = t => {
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnEntityRemoveDynamicInteractNotify", MathUtils_1.MathUtils.LongToNumber(t.F4n), e => {
    if (e) {
      if (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t.F4n))) {
        ModelManager_1.ModelManager.InteractionModel.RemoveInteractOption(e.Entity, t.e6n);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 36, "[EntityRemoveDynamicInteractNotify] 等待实体创建时，实体被移除（可能因为加载失败）", ["id", MathUtils_1.MathUtils.LongToNumber(t.F4n)]);
    }
  }, exports.WAIT_ENTITY_ERROR_TIME, true, true);
};
LevelGeneralNetworks.YUe = t => {
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnEntityChangeDynamicInteractTextNotify", MathUtils_1.MathUtils.LongToNumber(t.F4n), e => {
    if (e) {
      if (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t.F4n))) {
        ModelManager_1.ModelManager.InteractionModel.ChangeOptionText(e.Entity, t.e6n, t.DIs);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 36, "[OnEntityChangeDynamicInteractTextNotify] 等待实体创建时，实体被移除（可能因为加载失败）", ["id", MathUtils_1.MathUtils.LongToNumber(t.F4n)]);
    }
  }, exports.WAIT_ENTITY_ERROR_TIME, true, true);
};
LevelGeneralNetworks.JUe = t => {
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnEntityInteractNotify", MathUtils_1.MathUtils.LongToNumber(t.F4n), e => {
    if (e) {
      if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t.F4n)))?.Valid) {
        ModelManager_1.ModelManager.InteractionModel.LockInteraction(e.Entity, t.gTs);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 36, "[EntityInteractFinishNotify] 等待实体创建时，实体被移除（可能因为加载失败）", ["id", MathUtils_1.MathUtils.LongToBigInt(t.F4n)]);
    }
  }, exports.WAIT_ENTITY_ERROR_TIME, true, true);
};
LevelGeneralNetworks.zUe = e => {
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.F4n));
  if (t) {
    t.Entity.GetComponent(137)?.UpdateState(e.m5n, e.CTs);
  }
};
LevelGeneralNetworks.XTl = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t);
  if (o?.Valid && o.Entity) {
    o.Entity.GetComponent(162)?.ModifyBlackboardFromRemote(e.C6n, e.GI_);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Level", 19, "SceneItemBlackboardNotify下发的Id找不到对应的Entity", ["Entity Id", t]);
  }
};
LevelGeneralNetworks.ZUe = t => {
  var e = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  var o = MathUtils_1.MathUtils.LongToNumber(t.bDs);
  const r = new Array();
  r.push(e);
  if (o !== 0) {
    r.push(o);
  }
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnManipulatableSceneItemControllerIdModifyNotify", r, e => {
    if (e) {
      LevelGeneralNetworks.cAe(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[ControllerIdModifyNotify] 等待之后还是找不到对应的Entity", ["ids", r]);
    }
  });
};
LevelGeneralNetworks.Iqn = e => {
  const t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  const o = MathUtils_1.MathUtils.LongToNumber(e.wIs);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnSceneItemAutonomousModifyNotify", t, e => {
    if (e) {
      LevelGeneralNetworks.Tqn(t, o);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[ControllerIdModifyNotify] 等待之后还是找不到对应的Entity", ["entityId", t]);
    }
  });
};
LevelGeneralNetworks.eAe = t => {
  var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
  if (e === t.r6n) {
    const o = new Array();
    o.push(MathUtils_1.MathUtils.LongToNumber(t.xDs));
    if (t.wDs !== 0) {
      o.push(MathUtils_1.MathUtils.LongToNumber(t.wDs));
    }
    WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelGeneralNetworks.OnManipulatableSceneItemPosInFoundationNotify", o, e => {
      if (e) {
        LevelGeneralNetworks.mAe(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 31, "[RelationIdModifyNotif] 等待之后还是找不到对应的Entity", ["ids", o]);
      }
    });
  }
};
LevelGeneralNetworks.xal = t => {
  var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
  if (e === t.r6n) {
    const o = new Array();
    o.push(MathUtils_1.MathUtils.LongToNumber(t.rT_));
    if (t.wDs !== 0) {
      o.push(MathUtils_1.MathUtils.LongToNumber(t.wDs));
    }
    WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelGeneralNetworks.OnItemRelateFoundationNotify", o, e => {
      if (e) {
        LevelGeneralNetworks.Pal(t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 31, "[ItemRelateFoundationNotify] 等待之后还是找不到对应的Entity", ["ids", o]);
      }
    });
  }
};
LevelGeneralNetworks.Pal = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.rT_);
  var o = MathUtils_1.MathUtils.LongToNumber(e.wDs);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
  var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
  if (r?.Valid) {
    if (r = r.Entity.GetComponent(272)) {
      r.EntityInSocket = t?.Entity;
      if (e.x9n === Protocol_1.Aki.Protocol.tR_.Proto_ItemRelateFoundationReason_Init) {
        r.InitMatch(o);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "ItemRelateFoundationNotify指定的Entity缺少SceneItemGenericOutletComponent", ["EntityConfigId", o]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Level", 31, "ItemRelateFoundationNotify下发的Id找不到对应的Entity", ["EntityConfigId", o]);
  }
};
LevelGeneralNetworks.tAe = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (o?.Valid) {
    var r = o?.Entity?.GetComponent(129);
    if (r) {
      var a = new SceneItemDynamicAttachTargetComponent_1.AttachParam();
      a.PosAttachType = 2;
      a.PosAttachOffset = e.o6n;
      a.PosAbsolute = false;
      a.RotAttachType = 2;
      a.RotAttachOffset = e.n6n;
      a.RotAbsolute = false;
      switch (e.s6n) {
        case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetEntity:
          if (r.IsRegTarget()) {
            r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetEntity");
          }
          r.RegEntityTarget(e.h6n.a6n, e.h6n.l6n, a, "[EntityAttachChangeNotify] AttachTargetEntity");
          break;
        case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetActorPath:
          if (r.IsRegTarget()) {
            r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetActorPath");
          }
          r.RegRefActorTarget(e._6n, a, "[EntityAttachChangeNotify] AttachTargetActorPath");
          break;
        case Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetNone:
          r.UnRegTarget("[EntityAttachChangeNotify] AttachTargetNone");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 39, "EntityAttachChangeNotify指定的Entity缺少DynamicAttachComp", ["EntityConfigId", t]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Level", 39, "EntityAttachChangeNotify下发的EntityId找不到对应的Entity", ["EntityConfigId", t]);
  }
};
LevelGeneralNetworks.iAe = t => {
  var e = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  var o = MathUtils_1.MathUtils.LongToNumber(t.bDs);
  const r = new Array();
  r.push(e);
  r.push(o);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnManipulateFxShowNotify", r, e => {
    if (e) {
      LevelGeneralNetworks.dAe(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[FxShowNotify] 等待之后还是找不到对应的Entity", ["ids", r]);
    }
  });
};
LevelGeneralNetworks.mza = t => {
  var e = MathUtils_1.MathUtils.LongToNumber(t.DI_);
  var o = MathUtils_1.MathUtils.LongToNumber(t.nLs.iLs);
  const r = new Array();
  r.push(e);
  r.push(o);
  WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelGeneralNetworks.OnAddPlacementNotify", r, e => {
    if (e) {
      LevelGeneralNetworks.Cza(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[OnAddPlacementNotify] 等待之后还是找不到对应的Entity", ["ids", r]);
    }
  });
};
LevelGeneralNetworks.dza = t => {
  var e = MathUtils_1.MathUtils.LongToNumber(t.DI_);
  var o = MathUtils_1.MathUtils.LongToNumber(t.nLs.iLs);
  const r = new Array();
  r.push(e);
  r.push(o);
  WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelGeneralNetworks.OnRemovePlacementFromBoardNotify", r, e => {
    if (e) {
      LevelGeneralNetworks.gza(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[OnRemovePlacementFromBoardNotify] 等待之后还是找不到对应的Entity", ["ids", r]);
    }
  });
};
LevelGeneralNetworks.rAe = t => {
  var e = MathUtils_1.MathUtils.LongToNumber(t.G5n);
  var o = MathUtils_1.MathUtils.LongToNumber(t.O5n);
  const r = new Array();
  r.push(e);
  r.push(o);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnMovePlacementNotify", r, e => {
    if (e) {
      LevelGeneralNetworks.gAe(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity", ["ids", r]);
    }
  });
};
LevelGeneralNetworks.nAe = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.j5n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnCommitBoardSuccessNotify", o, e => {
    if (e) {
      _a.fAe(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 31, "[OnPlaceItemOnBoardNotify] 等待之后还是找不到对应的Entity", ["baseId", o]);
    }
  });
};
LevelGeneralNetworks.QUe = t => {
  var o = t.cvs;
  var r = t.w5n;
  if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen) {
    let e = "";
    try {
      e = JSON.stringify(o);
    } catch {
      e = "Context序列化解析失败";
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组", ["Context", e], ["PlayerId", t.W5n], ["SessionId", r], ["Total", t.dvs], ["StartIndex", t.K5n], ["EndIndex", t.mvs], ["NeedFinishReq", t.sS_]);
    }
  }
  switch (o.fvs) {
    case Protocol_1.Aki.Protocol.TOs.Svs:
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（动态交互）");
      }
      TsInteractionUtils_1.TsInteractionUtils.HandleEntityDynamicInteractByServerNotify(t, o.Svs.e6n);
      break;
    case Protocol_1.Aki.Protocol.TOs.Avs:
      var e = o.Avs._ps;
      var a = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(e);
      if (a) {
        if ((n = a.LevelPlayOpenAction) && n.length !== 0) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneGameplay", 18, "开始执行玩法开启/刷新动作");
          }
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(n, LevelGeneralContextDefine_1.LevelPlayContext.Create(a.Id), t.W5n, t.w5n, t.K5n, t.mvs, t.sS_);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug", ["treeType", GeneralLogicTreeDefine_1.btTypeLogString[Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay]], ["treeId", e]);
      }
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_LeaveInstEscActionCtx:
      var n = o.$ma?.Xma;
      var a = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
      if (a) {
        if ((e = a.FinishEscAction) && e.length !== 0) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneGameplay", 18, "开始执行副本玩法执行ESC退出行为");
          }
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, LevelGeneralContextDefine_1.InstanceDungeonContext.Create(n), t.W5n, t.w5n, t.K5n, t.mvs, t.sS_);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 7, "服务器通知副本玩法执行ESC退出行为时：对应的行为数据不存在或者长度为0，联系程序检查Bug", ["treeType", GeneralLogicTreeDefine_1.btTypeLogString[Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst]], ["treeId", n]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 7, "服务器通知玩法执行ESC退出行为时：对应的副本玩法不存在，联系程序检查Bug", ["treeType", GeneralLogicTreeDefine_1.btTypeLogString[Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst]], ["treeId", n]);
      }
      break;
    case Protocol_1.Aki.Protocol.TOs.Pvs:
      a = o.Pvs._ps;
      e = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(a);
      if (e) {
        if ((n = e.AfterGetRewardAction) && n.length !== 0) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneGameplay", 18, "开始执行玩法开启/刷新动作");
          }
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(n, LevelGeneralContextDefine_1.LevelPlayContext.Create(e.Id), t.W5n, t.w5n, t.K5n, t.mvs, t.sS_);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知玩法执行行为时：对应的玩法不存在，联系程序检查Bug", ["treeType", GeneralLogicTreeDefine_1.btTypeLogString[Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay]], ["treeId", a]);
      }
      break;
    case Protocol_1.Aki.Protocol.TOs.Uvs:
      n = o.Uvs.B5n;
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(n);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug", ["treeType", GeneralLogicTreeDefine_1.btTypeLogString[Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest]], ["treeId", n]);
        }
        return;
      }
      a = e.ActiveActions;
      if (a && a.length !== 0) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(a, LevelGeneralContextDefine_1.QuestContext.Create(n), t.W5n, t.w5n, t.K5n, t.mvs, t.sS_);
      }
      break;
    case Protocol_1.Aki.Protocol.TOs.wvs:
      e = o.wvs.B5n;
      a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (!a) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug", ["treeType", GeneralLogicTreeDefine_1.btTypeLogString[Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest]], ["treeId", e]);
        }
        return;
      }
      n = a.AcceptActions;
      if (n && n.length !== 0) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(n, LevelGeneralContextDefine_1.QuestContext.Create(e), t.W5n, t.w5n, t.K5n, t.mvs, t.sS_);
      }
      break;
    case Protocol_1.Aki.Protocol.TOs.xvs:
      a = o.xvs.B5n;
      n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(a);
      if (!n) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug", ["treeType", GeneralLogicTreeDefine_1.btTypeLogString[Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest]], ["treeId", a]);
        }
        return;
      }
      e = n.FinishActions;
      if (e && e.length !== 0) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, LevelGeneralContextDefine_1.QuestContext.Create(a), t.W5n, t.w5n, t.K5n, t.mvs, t.sS_);
      }
      break;
    case Protocol_1.Aki.Protocol.TOs.Yvs:
      n = o.Yvs.B5n;
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(n);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "服务器通知任务执行行为时：对应的任务不存在，联系程序检查Bug", ["treeType", GeneralLogicTreeDefine_1.btTypeLogString[Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest]], ["treeId", n]);
        }
        return;
      }
      a = e.TerminateActions;
      if (a && a.length !== 0) {
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(a, LevelGeneralContextDefine_1.QuestContext.Create(n), t.W5n, t.w5n, t.K5n, t.mvs, t.sS_);
      }
      break;
    case Protocol_1.Aki.Protocol.TOs.bvs:
    case Protocol_1.Aki.Protocol.TOs.Bvs:
    case Protocol_1.Aki.Protocol.TOs.qvs:
    case Protocol_1.Aki.Protocol.TOs.Gvs:
    case Protocol_1.Aki.Protocol.TOs.Ovs:
    case Protocol_1.Aki.Protocol.TOs.$vs:
    case Protocol_1.Aki.Protocol.TOs.R3u:
    case Protocol_1.Aki.Protocol.TOs.Proto_ChildQuestNodeStuckCheckAction:
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BehaviorTreeStartActionSession, t);
      break;
    case Protocol_1.Aki.Protocol.TOs.Mvs:
      e = MathUtils_1.MathUtils.LongToNumber(o.Mvs.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（EntityInteractAction）", ["CreatureDataId", e]);
      }
      TsInteractionUtils_1.TsInteractionUtils.HandleEntityInteractByServerNotify(t, e, o.Mvs.z5n);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_EntityStateChangeAction:
      a = MathUtils_1.MathUtils.LongToNumber(o.yvs.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（EntityStateChangeAction）", ["CreatureDataId", a]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateActionByServerNotify(t, a, o.yvs.tps);
      break;
    case Protocol_1.Aki.Protocol.TOs.Ivs:
      n = MathUtils_1.MathUtils.LongToNumber(o.Ivs.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（EntityGroupAction）", ["CreatureDataId", n]);
      }
      LevelGeneralNetworks.pAe(t, n, o.Ivs.u6n, o.Ivs.ips);
      break;
    case Protocol_1.Aki.Protocol.TOs.zvs:
      e = MathUtils_1.MathUtils.LongToNumber(o.zvs.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（EntityGroupFailureAction）", ["CreatureDataId", e]);
      }
      LevelGeneralNetworks.R2l(t, e);
      break;
    case Protocol_1.Aki.Protocol.TOs.Tvs:
      a = MathUtils_1.MathUtils.LongToNumber(o.Tvs.eps.w5n);
      n = MathUtils_1.MathUtils.LongToNumber(o.Tvs.rps);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（EntityTriggerAction）", ["CreatureDataId", a]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleTriggerStateActionByServerNotify(t, a, n);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_EntityLeaveTrigger:
      e = MathUtils_1.MathUtils.LongToNumber(o.Lvs.eps.w5n);
      a = MathUtils_1.MathUtils.LongToNumber(o.Lvs.rps);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（EntityLeaveTriggerAction）", ["CreatureDataId", e]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleExitTriggerStateActionByServerNotify(t, e, a);
      break;
    case Protocol_1.Aki.Protocol.TOs.Hvs:
      n = MathUtils_1.MathUtils.LongToNumber(o.Hvs.eps.w5n);
      SceneItemUtility_1.SceneItemUtility.HandleExploreInteractActionByServerNotify(t, n);
      break;
    case Protocol_1.Aki.Protocol.TOs.Rvs:
      e = MathUtils_1.MathUtils.LongToNumber(o.Rvs.eps.w5n);
      SceneItemUtility_1.SceneItemUtility.HandleSceneItemDestructibleActionByServerNotify(t, e);
      break;
    case Protocol_1.Aki.Protocol.TOs.Dvs:
      a = MathUtils_1.MathUtils.LongToNumber(o.Dvs.eps.w5n);
      SceneItemUtility_1.SceneItemUtility.HandleTimeTrackControlActionByServerNotify(t, a, o.Dvs);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_SceneItemLifeCycleComponentCreate:
      n = MathUtils_1.MathUtils.LongToNumber(o.Kvs.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（LifeCycleCreateAction）", ["CreatureDataId", n]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(t, n, true);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_SceneItemLifeCycleComponentDetroy:
      e = MathUtils_1.MathUtils.LongToNumber(o.Qvs.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（LifeCycleDestroyAction）", ["CreatureDataId", e]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleLifeCycleStageActionByServerNotify(t, e, false);
      break;
    case Protocol_1.Aki.Protocol.TOs.Jvs:
      a = MathUtils_1.MathUtils.LongToNumber(o.Jvs.eps.w5n);
      n = o.Jvs.c6n;
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 39, "服务端驱动执行行为组（EntityBeamReceiveAction）", ["CreatureDataId", a], ["ReceiveType", n]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleBeamReceiveActionByServerNotify(t, a, n);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_TrampleActiveActionCtx:
      e = MathUtils_1.MathUtils.LongToNumber(o.Wga.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 39, "服务端驱动执行行为组（TrampleActiveAction）", ["CreatureDataId", e]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleTrampleActivateActionByServerNotify(t, e, true);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_TrampleDeActiveActionCtx:
      a = MathUtils_1.MathUtils.LongToNumber(o.Qga.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 39, "服务端驱动执行行为组（TrampleDeActiveAction）", ["CreatureDataId", a]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleTrampleActivateActionByServerNotify(t, a, false);
      break;
    case Protocol_1.Aki.Protocol.TOs.Wvs:
      {
        n = o.Wvs.m6n;
        let e = undefined;
        try {
          e = JSON.parse(n);
        } catch {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Gm", 39, "GM驱动行为列表: 行为列表解析失败", ["JsonStr", n]);
          }
          break;
        }
        if (!Array.isArray(e) || e.length === 0) {
          break;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Gm", 39, "开始执行GM驱动行为列表");
        }
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, LevelGeneralContextDefine_1.GmLevelActionContext.Create(), t.W5n, t.w5n, t.K5n, t.mvs, t.sS_);
        break;
      }
    case Protocol_1.Aki.Protocol.TOs.Proto_EntityStateChangeConditionAction:
      e = MathUtils_1.MathUtils.LongToNumber(o.Zvs.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（EntityStateChangeConditionAction）", ["CreatureDataId", e]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleSceneItemStateChangeConditionActionByServerNotify(t, e, o.Zvs.tps, o.Zvs.t5n);
      break;
    case Protocol_1.Aki.Protocol.TOs.kvs:
      a = MathUtils_1.MathUtils.LongToNumber(o.kvs.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行行为组（EntityConditionListeningAction）", ["CreatureDataId", a]);
      }
      LevelGeneralNetworks.lR1(t, a, o.kvs.aps);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_HookLockPointActionCtx:
      n = MathUtils_1.MathUtils.LongToNumber(o.IS_.eps.w5n);
      e = o.IS_.AS_;
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 39, "服务端驱动执行行为组（HookLockPointActionCtx）", ["CreatureDataId", n], ["ActionType", e]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleHookLockPointActionByServerNotify(t, n, e);
      break;
    case Protocol_1.Aki.Protocol.TOs.TS_:
      a = MathUtils_1.MathUtils.LongToNumber(o.TS_.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 31, "服务端驱动执行行为组（ExploreSkillCustomAction）", ["CreatureDataId", a]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleExploreSkillCustomActionByServerNotify(t, a);
      break;
    case Protocol_1.Aki.Protocol.TOs.Rm1:
      n = MathUtils_1.MathUtils.LongToNumber(o.Rm1.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 31, "服务端驱动执行行为组（TemplateSpawnerAction）", ["CreatureDataId", n]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleTemplateSpawnerActionByServerNotify(t, n);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_TargetGearHitPart:
      e = MathUtils_1.MathUtils.LongToNumber(o.fed.eps.w5n);
      a = o.fed.ged;
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "服务端驱动执行行为组（TargetGearHitPart）", ["CreatureDataId", e]);
      }
      SceneItemUtility_1.SceneItemUtility.HandleTargetGearHitPartByServerNotify(t, e, a);
      break;
    case Protocol_1.Aki.Protocol.TOs.Proto_EntityAfterConditionActionCtx:
      n = MathUtils_1.MathUtils.LongToNumber(o.DId.eps.w5n);
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.LevelEventLogOpen && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 18, "服务端驱动执行行为组（TargetGearHitPart）", ["CreatureDataId", n]);
      }
      LevelGeneralNetworks.OId(t, n, o.DId.xId, o.DId.BId);
  }
};
LevelGeneralNetworks.sAe = n => {
  const l = MathUtils_1.MathUtils.LongToNumber(n.j5n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnBoardGridDynamicConfigChangeNotify", l, e => {
    if (e) {
      e = ModelManager_1.ModelManager.CreatureModel.GetEntity(l);
      if (e) {
        var t = e.Entity.GetComponent(141);
        if (t) {
          for (const a of n.aLs) {
            var o = new SceneItemJigsawBaseComponent_1.JigsawIndex(a.zTs, a.ZTs);
            var r = MathUtils_1.MathUtils.LongToNumber(a.eLs);
            t.DynamicModifySocketState(o, r);
          }
        }
      }
    }
  });
};
LevelGeneralNetworks.HPl = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.j5n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnBoardCanMovePlacementNotify", o, e => {
    if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(o)) && (e = e.Entity.GetComponent(141))) {
      e.OnBoardCanMovePlacementNotify(t.gI_);
    }
  });
};
LevelGeneralNetworks.aAe = e => {
  for (const t of e.KEs) {
    ModelManager_1.ModelManager.FunctionModel?.UpdateFunctionOpenLockByBehaviorTree(t.d6n, !t.Sps);
  }
};
LevelGeneralNetworks.$Ja = e => {
  for (const t of e.KEs) {
    if (t.h5n === Protocol_1.Aki.Protocol.Uw_.Proto_TeleportDungeon) {
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.UpdateForbidDungeon(t.yIs, t.XE_?.KE_);
    }
  }
};
LevelGeneralNetworks.hAe = e => {
  if (e.gvs) {
    LevelGamePlayUtils_1.LevelGamePlayUtils.ReleaseOperationRestriction();
  } else if (e.C6n) {
    LevelGamePlayUtils_1.LevelGamePlayUtils.LevelOperationRestriction(e.C6n);
  }
};
LevelGeneralNetworks.lAe = e => {
  const t = MathUtils_1.MathUtils.LongToNumber(e.g2s);
  const o = e.i6n === Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter;
  const r = [];
  for (const a of e.HKs) {
    r.push(MathUtils_1.MathUtils.LongToNumber(a));
  }
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnEntityAccessRangeNotify", t, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid && (e = e.Entity.GetComponent(86))) {
      e.ServerUpdateEntitiesInRangeOnline(o, r);
    }
  });
};
LevelGeneralNetworks._Ae = e => {
  const t = MathUtils_1.MathUtils.LongToNumber(e.g2s);
  const o = e.i6n === Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter;
  const r = e.f2s;
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnPlayerAccessRangeNotify", t, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid && (e = e.Entity.GetComponent(86))) {
      e.ServerUpdatePlayerInRangeOnline(o, r);
    }
  });
};
LevelGeneralNetworks.uAe = e => {
  const t = MathUtils_1.MathUtils.LongToNumber(e.v2s);
  const o = e.p2s === Protocol_1.Aki.Protocol.p2s.Proto_Up;
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnTrampleGearTransitionNotify", t, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid && (e = e.Entity.GetComponent(156))) {
      e.ChangeTransition(o);
    }
  });
};
LevelGeneralNetworks.URn = e => {
  var t;
  if (e.WEs && (t = MathUtils_1.MathUtils.LongToNumber(e.F4n), t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t))) {
    t.Entity?.GetComponent(0)?.UpdateVar(e.jEs, e.WEs);
  }
};
LevelGeneralNetworks.Pm1 = e => {
  var t;
  var o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(o);
  if (o) {
    (t = o.Entity?.GetComponent(0))?.SetEntityConditionalName(e.Hh1);
    t?.SetEntityEntityConditionSecondName(e.Wh1);
    t?.SetEntityEntityConditionFunctionPath(e.$h1);
    EventSystem_1.EventSystem.EmitWithTarget(o.Entity, EventDefine_1.EEventName.OnEntityNameChanged);
  }
};
LevelGeneralNetworks.sQs = e => {
  if (e.f$s) {
    const t = [];
    const o = [];
    for (const r of e.f$s) {
      const a = MathUtils_1.MathUtils.LongToNumber(r.d$s);
      t.push(a);
      for (const n of r.YQa) {
        o.push(MathUtils_1.MathUtils.LongToNumber(n.CVn));
        t.push(MathUtils_1.MathUtils.LongToNumber(n.CVn));
      }
      WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnConnectorConnectEntityNotify", t, e => {
        if (e) {
          LevelGeneralNetworks.aQs(a, o, r.C$s);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 31, "[OnConnectorConnectEntityNotify] 等待之后还是找不到对应的Entity", ["ids", t]);
        }
      });
    }
  }
};
LevelGeneralNetworks.mla = e => {
  const a = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  if (a) {
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnFirecrackerEntityCreatedNotify", a, e => {
      var t;
      var o;
      var r;
      if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))?.Valid && (t = (r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity)?.GetComponent(65), r = r?.GetComponent(1), t?.Valid) && r?.Valid && t.CanManipulate()) {
        (o = MathUtils_1.MathUtils.CommonTempVector).Set(100, 0, 0);
        r = r.ActorTransform.TransformPositionNoScale(o.ToUeVector());
        e.Entity.GetComponent(206)?.SetActorLocation(r);
        t.TryManipulateSpecificItem(e.Entity);
      }
    });
  }
};
LevelGeneralNetworks.u3a = e => {
  const a = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  if (a) {
    const n = MathUtils_1.MathUtils.LongToNumber(e.tT_);
    if (n) {
      WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnPortalReplaceNotify", n, e => {
        var t;
        var o;
        var r;
        if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))?.Valid && e.Entity?.Valid && e.Entity?.IsInit && (t = e.Entity.GetComponent(1))?.Valid && (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(n))?.Valid && o.Entity?.Valid && o?.IsInit && (o = o.Entity.GetComponent(1))?.Valid && (r = e.Entity.GetComponent(219))?.Valid) {
          r.GetPortalEffectActor()?.Stop("移动传送门到新位置之前", true);
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, false, "移动传送门到新位置之前", false);
          t.SetActorLocationAndRotation(o.ActorLocation, o.ActorRotation, "OnPortalReplaceNotify", false);
          e.Entity.GetComponent(0)?.SetOwnerIncId(n);
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, true, "移动传送门到新位置之后", false);
        }
      });
    }
  }
};
LevelGeneralNetworks.$rh = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  if (o) {
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnSceneItemAttributeChangeNotify", o, e => {
      if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.IsInit && (e = e.Entity?.GetComponent(134))) {
        e.HandleAttributeChanged(t.EI_, t.lWn);
      }
    });
  }
};
LevelGeneralNetworks.yMl = e => {
  AlertAreaController_1.AlertAreaController.UpdateAlertDataByServerNotify(e);
};
LevelGeneralNetworks.oEl = e => {
  const t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnSceneItemAiDisableNotify", t, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid && (e = e.Entity.GetComponent(140))) {
      e.ModifyAiEnableState(false);
    }
  });
};
LevelGeneralNetworks.rEl = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnSceneItemAiEnableNotify", o, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && (e = e.Entity.GetComponent(140))) {
      e.ModifyAiEnableState(true, t.tVn?.RI_);
    }
  });
};
LevelGeneralNetworks.nEl = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnSceneItemAiPatrolPointNotify", o, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && (e = e.Entity.GetComponent(140))) {
      e.UpdateLastPassIndex(t.AI_);
    }
  });
};
LevelGeneralNetworks.FTl = r => {
  const a = MathUtils_1.MathUtils.LongToNumber(r.F4n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnAnimalCollectStateNotify", a, e => {
    var t;
    var o;
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a))?.Valid && (t = e.Entity.GetComponent(175))) {
      o = "Collected" + r.jjn;
      if (r.xI_ === Protocol_1.Aki.Protocol.$w_.Proto_SlotRefreshed) {
        t.ShowPart(r.jjn);
        ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(e.Id, o, false);
      } else {
        t.HidePart(r.jjn);
        ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(e.Id, o, true);
      }
    }
  });
};
LevelGeneralNetworks.mwl = e => {
  for (const r of e.vS_) {
    var t;
    if (r.yS_ && (t = LevelGeneralNetworks.Rqu(r.F4n))) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, false, "ActionRelatedEntityInfoNotify", true);
    }
  }
  for (const a of e.pS_) {
    var o = LevelGeneralNetworks.Rqu(a.F4n);
    if (o) {
      o = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(o);
      LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(o, a.X5n, "ActionRelatedEntityInfoNotify");
    }
  }
};
LevelGeneralNetworks.ujl = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.oT_);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnHookLockPointInfoNotify", o, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && (e = e.Entity.GetComponent(85))) {
      e.UpdateHookPointInfoByNotify(t);
    }
  });
};
LevelGeneralNetworks.R2_ = e => {
  const o = MathUtils_1.MathUtils.LongToNumber(e.bx_);
  const r = MathUtils_1.MathUtils.LongToNumber(e.Lx_);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.AddHackingEntityNotify", [o, r], e => {
    var t;
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))?.Valid && (e = e.Entity.GetComponent(285))) {
      ControllerHolder_1.ControllerHolder.FollowShooterHackController.AddRelationship(o, r);
      e.AddHackEntity(t.Entity);
    }
  });
};
LevelGeneralNetworks.A2_ = e => {
  const o = MathUtils_1.MathUtils.LongToNumber(e.bx_);
  const r = MathUtils_1.MathUtils.LongToNumber(e.Lx_);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.RemoveHackingEntityNotify", [o, r], e => {
    var t;
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r))?.Valid && (e = e.Entity.GetComponent(285))) {
      ControllerHolder_1.ControllerHolder.FollowShooterHackController.RemoveRelationship(o, r);
      e.RemoveHackEntity(t.Entity);
    }
  });
};
LevelGeneralNetworks.kZ_ = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnGravityFlipUpdateTypeNotify", o, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && (e = e.Entity.GetComponent(289))) {
      e.OnNotifyUpdateGravityDirection(t.wY_);
    }
  });
};
LevelGeneralNetworks.Flc = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var o = !e.Avl;
  var r = Vector_1.Vector.Create(e.P5n);
  var a = Rotator_1.Rotator.Create(e.g8n);
  var e = Vector_1.Vector.Create(e.ZE_);
  if (o) {
    _a.Nlc(t);
  } else {
    _a.Vlc(t, r, a, e);
  }
};
LevelGeneralNetworks.XS1 = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.s5n);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (t?.Valid && t.Entity?.Valid && e.Fp1) {
    t.Entity.GetComponent(0)?.UpdateRewardState(e.Fp1);
  }
};
LevelGeneralNetworks.ob1 = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnTemplateEntitySpawnerContentNotify", o, e => {
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid && (e = e.Entity.GetComponent(300))) {
      e.OnNotifyUpdateContent(t.Pv1);
    }
  });
};
LevelGeneralNetworks.s8u = (e, t) => {
  if (_a.n8u) {
    _a.n8u.SetResult(e && !t);
  }
};
LevelGeneralNetworks.n8u = undefined;
LevelGeneralNetworks.B5u = e => {
  _a.k5u(!e.D5u, e.U5u);
};
LevelGeneralNetworks.Xjd = o => {
  const r = MathUtils_1.MathUtils.LongToNumber(o.F4n);
  const a = o.V41;
  if (a?.CIl) {
    WaitEntityTask_1.WaitEntityTask.Create("LevelGeneralNetworks.OnCharacterMoveToPointNotify", r, e => {
      if (e) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
        if (t?.Valid) {
          switch (o.bAc) {
            case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving:
              _a.HandleRecvCharacterMoveToPoint(t.Entity, a);
              break;
            case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt:
              _a.HandleRecvChracterMoveToPointEnd(t.Entity, true);
              break;
            case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop:
              _a.HandleRecvChracterMoveToPointEnd(t.Entity, false);
          }
        }
      }
    });
  }
}; //# sourceMappingURL=LevelGeneralNetworks.js.map