"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGamePlayController = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Net_1 = require("../../Core/Net/Net");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CombatMessage_1 = require("../Module/CombatMessage/CombatMessage");
const EntityHandle_1 = require("../NewWorld/Character/EntityHandle");
const WaitEntityTask_1 = require("../World/Define/WaitEntityTask");
const SHOW_FAKE_ERROR_CODE_TIPS_INTERVAL = 1000;
class LevelGamePlayController extends ControllerBase_1.ControllerBase {
  static HandleScanResponse(e, t = 0) {
    return !!e && !!UE.KuroStaticLibrary.IsImplementInterface(e.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) && !(e = e, !(e = EntitySystem_1.EntitySystem.Get(e.GetEntityId()))) && !(e.GetComponent(88)?.StartProcess(t), e.GetComponent(75)?.ShowScanEffect(), 0);
  }
  static HandleScanEntityResponse(e, t = 0) {
    e.GetComponent(88)?.StartProcess(t);
    e.GetComponent(75)?.ShowScanEffect();
  }
  static HandleClearAllScanEffect() {}
  static MultiplayerLimitTypeCheck(e, t = true) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return true;
    }
    switch (e) {
      case 2:
        if (t) {
          LevelGamePlayController.ShowFakeErrorCodeTips();
        }
        return false;
      case 0:
        var a = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
        if (!a && t) {
          LevelGamePlayController.ShowFakeErrorCodeTips();
        }
        return a;
      case 1:
        return true;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 7, "[MultiplayerCommonCheck] 不支持的联机限制类型");
        }
        return false;
    }
  }
  static ShowFakeErrorCodeTips(e = 600064) {
    if (!(Time_1.Time.Now - this.lUe < SHOW_FAKE_ERROR_CODE_TIPS_INTERVAL)) {
      this.lUe = Time_1.Time.Now;
      e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e);
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
    }
  }
  static OnInit() {
    Net_1.Net.Register(20934, LevelGamePlayController._Ue);
    Net_1.Net.Register(20373, LevelGamePlayController.uUe);
    Net_1.Net.Register(20349, LevelGamePlayController.cUe);
    Net_1.Net.Register(25669, LevelGamePlayController.dUe);
    Net_1.Net.Register(23448, LevelGamePlayController.OnEnableNearbyTrackingNotify);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.Rku);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureAddFinish, this.wku);
    this.fUe = new Map();
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(20934);
    Net_1.Net.UnRegister(20373);
    Net_1.Net.UnRegister(20349);
    Net_1.Net.UnRegister(25669);
    Net_1.Net.UnRegister(23448);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.Rku);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureAddFinish, this.wku);
    return !(this.fUe = undefined);
  }
  static ThrowDamageChangeRequest(e, t) {
    var a = Protocol_1.Aki.Protocol.Dms.create();
    a.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    a.I5n = MathUtils_1.MathUtils.NumberToLong(t);
    Net_1.Net.Call(26201, a, e => {
      switch (e.Q4n) {
        case Protocol_1.Aki.Protocol.Q4n.KRs:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrThrowDamageEntityNotExit:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrThrowDamageReqEntityIsAlreadyDead:
          break;
        default:
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29677);
      }
    });
  }
  static ManipulatableBeCastOrDrop2Server(e, t) {
    var a = Protocol_1.Aki.Protocol.Uds.create();
    a.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    a.vul = t;
    Net_1.Net.Call(27477, a, e => {
      switch (e.Q4n) {
        case Protocol_1.Aki.Protocol.Q4n.KRs:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBeControlledEntityNotExist:
          break;
        default:
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29677);
      }
    });
  }
  static async GetRewardTreasureBoxRequest(e) {
    if (this.fUe?.get(e)) {
      return false;
    }
    this.fUe.set(e, true);
    var t = Protocol_1.Aki.Protocol.wms.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    var t = await Net_1.Net.CallAsync(15722, t);
    this.fUe.delete(e);
    return !!t && (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 27127), false) : (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenTreasureBox, e), true));
  }
  static ElevatorStateChangeRequest(e, t, a, r) {
    var o = Protocol_1.Aki.Protocol.WZn.create();
    o.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    o.L5n = t;
    o.Y4n = a;
    Net_1.Net.Call(26945, o, e => {
      r();
      if (e) {
        switch (e.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrElevatorLocked:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22908);
        }
      }
    });
  }
  static OnManipulatableItemExitAreaInternal(e, t, a = 0) {
    var r;
    var o;
    var l;
    var n = e instanceof EntityHandle_1.EntityHandle ? e.Entity : e;
    if (e && n) {
      o = n.GetComponent(214);
      l = n.GetComponent(169);
      if (!(r = n.GetComponent(167))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 31, "[Manipulate] 重置控物对象实体时找不到对应的控物组件");
        }
      }
      if (o && l && l.HasMoveAuthority() && (r?.ResetItemLocationAndRotation(a, true), o = n.GetComponent(177))) {
        o.StopTimerOnResetPos();
      }
      if (r && r.ControlledByLocalPlayer() && (l = t ?? "ResetPositionTip", ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(l), a = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity) && (n = a.GetComponent(70)) && e.Id === n.GetHoldingEntity()?.Id) {
        n.StopManipulate();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "[Manipulate] 重置控物对象实体时找不到对应的Entity");
    }
  }
  static EntityFollowTrackRequest(e, t) {
    var a = Protocol_1.Aki.Protocol.Nds.create();
    a.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(20705, a, t);
  }
  static EntityBuffProducerRequest(e, t) {
    var a = Protocol_1.Aki.Protocol._es.create();
    a.D5n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(29306, a, t);
  }
  static ShootTargetHitGearStateChangeRequest(e, t, a, r, o) {
    var l = Protocol_1.Aki.Protocol.Lms.create();
    l.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    l.yX_ = t;
    l.Mjn = a;
    if (r) {
      l.Ced = r;
    }
    Net_1.Net.Call(20490, l, o);
  }
  static OnEnableNearbyTrackingNotify(t) {
    for (const e of t.PSs) {
      const a = MathUtils_1.MathUtils.LongToNumber(e);
      WaitEntityTask_1.WaitEntityTask.Create("LevelGamePlayController.OnEnableNearbyTrackingNotify", a, e => {
        if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(a)) && (e = e.Entity.GetComponent(171))) {
          e.EnableTracking = t.yIs;
        }
      }, 60000, true, true);
    }
  }
  static EntityAdsorbRequest(e, t) {
    var a = Protocol_1.Aki.Protocol.Fes.create();
    a.F4n = e;
    Net_1.Net.Call(23228, a, t);
  }
  static RequestChairSit(e, t, a) {
    var r = Protocol_1.Aki.Protocol.rms.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    r.U5n = t;
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(0).GetCreatureDataId();
    if (e) {
      r.R5n = CombatMessage_1.CombatNet.CreateCombatCommon(e);
    }
    r.x5n = a;
    Net_1.Net.Call(23227, r, e => {
      Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(29)?.OnResponseSit(t, e.Q4n);
    });
  }
  static ClientAddTagToTarget(e, t) {
    ModelManager_1.ModelManager.ClientTagModel.ClientAddTagToTarget(e.Id, t);
    EventSystem_1.EventSystem.OnceWithTarget(e, EventDefine_1.EEventName.RemoveEntity, () => {
      ModelManager_1.ModelManager.ClientTagModel.ClearTargetTagAdded(e.Id);
    });
  }
  static ClientRemoveTagFromTarget(e, t) {
    return ModelManager_1.ModelManager.ClientTagModel.ClientRemoveTagFromTarget(e, t);
  }
  static ConstraintProcessedValue(e, t) {
    let a = t;
    switch (e.Type) {
      case "Constant":
        a = e.Value;
        break;
      case "Constraint":
        switch (e.Value.Type) {
          case "Clamp":
            a = MathUtils_1.MathUtils.Clamp(a, e.Value.MinValue, e.Value.MaxValue);
            break;
          case "Max":
            a = Math.min(a, e.Value.MaxValue);
            break;
          case "Min":
            a = Math.max(a, e.Value.MinValue);
        }
    }
    return a;
  }
}
(exports.LevelGamePlayController = LevelGamePlayController).fUe = undefined;
LevelGamePlayController.lUe = 0;
LevelGamePlayController.UseNewScanSystem = true;
LevelGamePlayController.cUe = e => {};
LevelGamePlayController.uUe = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("World", 17, "服务端通知耐久度变化", ["CreatureDataId", e.F4n], ["耐久度", e.jqs]);
  }
  var t;
  var a;
  var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.F4n));
  if (r?.Valid) {
    t = r.Entity.GetComponent(0);
    e = e.jqs;
    a = t.GetDurabilityValue();
    t.SetDurabilityValue(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAnySceneItemDurabilityChange, r, e, a);
  }
};
LevelGamePlayController._Ue = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.s5n);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (t) {
    t.Entity.GetComponent(0).UpdateEntityCommonTags(e.aSs);
    t.Entity.GetComponent(208).SyncTagsFromServer(e.aSs);
  }
};
LevelGamePlayController.dUe = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (t) {
    var a = t.Entity.GetComponent(150);
    if (a) {
      switch (e.Pmu?.h5n) {
        case Protocol_1.Aki.Protocol.Gmu.dm1:
          var r = e.Pmu.Umu;
          if (r) {
            a.SetTargetFloorTeleport(e.P5n, r.Bmu ?? 0, r.Dmu ?? 0, r.kmu, r.Omu);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 79, "SetTargetFloorTeleport Failed, Proto_MoveTeleport is undefined", ["EntityId", e.F4n]);
          }
          break;
        case Protocol_1.Aki.Protocol.Gmu.Krd:
          r = e.Pmu.Krd;
          if (!r) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 79, "SetTargetFloorPathMove Failed, Proto_MoveTeleport is undefined", ["EntityId", e.F4n]);
            }
            return;
          }
          a.SetTargetFloorPathMove(e.P5n, r.Yrd, r.Xrd);
          break;
        default:
          Protocol_1.Aki.Protocol.Gmu.Proto_Default;
          a.SetTargetFloor(e.P5n);
      }
    }
  } else if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("SceneItem", 35, "OnElevatorMoveNotify No Entity", ["id", e.F4n]);
  }
};
LevelGamePlayController.Rku = (e, t) => {
  ModelManager_1.ModelManager.VisionCaptureModel?.AddVisionCapture(e, t);
};
LevelGamePlayController.aXt = e => {
  ModelManager_1.ModelManager.VisionCaptureModel?.RemoveVisionCapture(e);
};
LevelGamePlayController.wku = (e, t) => {
  ModelManager_1.ModelManager.VisionCaptureModel?.AddVisionCaptureFinish(e, t);
}; //# sourceMappingURL=LevelGamePlayController.js.map