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
    return !!e && !!UE.KuroStaticLibrary.IsImplementInterface(e.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) && !(e = e, !(e = EntitySystem_1.EntitySystem.Get(e.GetEntityId()))) && !(e.GetComponent(83)?.StartProcess(t), e.GetComponent(70)?.ShowScanEffect(), 0);
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
        var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner();
        if (!r && t) {
          LevelGamePlayController.ShowFakeErrorCodeTips();
        }
        return r;
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
    Net_1.Net.Register(27083, LevelGamePlayController._Ue);
    Net_1.Net.Register(16532, LevelGamePlayController.uUe);
    Net_1.Net.Register(26965, LevelGamePlayController.cUe);
    Net_1.Net.Register(15456, LevelGamePlayController.dUe);
    Net_1.Net.Register(29213, LevelGamePlayController.OnEnableNearbyTrackingNotify);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.Rku);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemVisionCaptureAddFinish, this.wku);
    this.fUe = new Map();
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(27083);
    Net_1.Net.UnRegister(16532);
    Net_1.Net.UnRegister(26965);
    Net_1.Net.UnRegister(15456);
    Net_1.Net.UnRegister(29213);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.Rku);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.aXt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemVisionCaptureAddFinish, this.wku);
    return !(this.fUe = undefined);
  }
  static ThrowDamageChangeRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Dms.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    r.I5n = MathUtils_1.MathUtils.NumberToLong(t);
    Net_1.Net.Call(24784, r, e => {
      switch (e.Q4n) {
        case Protocol_1.Aki.Protocol.Q4n.KRs:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrThrowDamageEntityNotExit:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrThrowDamageReqEntityIsAlreadyDead:
          break;
        default:
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27580);
      }
    });
  }
  static ManipulatableBeCastOrDrop2Server(e, t) {
    var r = Protocol_1.Aki.Protocol.Uds.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    r.vul = t;
    Net_1.Net.Call(26442, r, e => {
      switch (e.Q4n) {
        case Protocol_1.Aki.Protocol.Q4n.KRs:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBeControlledEntityNotExist:
          break;
        default:
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27580);
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
    var t = await Net_1.Net.CallAsync(20784, t);
    this.fUe.delete(e);
    return !!t && (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28868), false) : (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenTreasureBox, e), true));
  }
  static ElevatorStateChangeRequest(e, t, r, o) {
    var a = Protocol_1.Aki.Protocol.WZn.create();
    a.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    a.L5n = t;
    a.Y4n = r;
    Net_1.Net.Call(18123, a, e => {
      o();
      if (e) {
        switch (e.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrElevatorLocked:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25895);
        }
      }
    });
  }
  static OnManipulatableItemExitAreaInternal(e, t, r = 0) {
    var o;
    var a;
    var l;
    var n = e instanceof EntityHandle_1.EntityHandle ? e.Entity : e;
    if (e && n) {
      a = n.GetComponent(206);
      l = n.GetComponent(162);
      if (!(o = n.GetComponent(160))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 31, "[Manipulate] 重置控物对象实体时找不到对应的控物组件");
        }
      }
      if (a && l && l.HasMoveAuthority() && (o?.ResetItemLocationAndRotation(r, true), a = n.GetComponent(170))) {
        a.StopTimerOnResetPos();
      }
      if (o && o.ControlledByLocalPlayer() && (l = t ?? "ResetPositionTip", ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(l), r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity) && (n = r.GetComponent(65)) && e.Id === n.GetHoldingEntity()?.Id) {
        n.StopManipulate();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "[Manipulate] 重置控物对象实体时找不到对应的Entity");
    }
  }
  static EntityFollowTrackRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Nds.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(18201, r, t);
  }
  static EntityBuffProducerRequest(e, t) {
    var r = Protocol_1.Aki.Protocol._es.create();
    r.D5n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(20960, r, t);
  }
  static ShootTargetHitGearStateChangeRequest(e, t, r, o, a) {
    var l = Protocol_1.Aki.Protocol.Lms.create();
    l.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e));
    l.yX_ = t;
    l.Mjn = r;
    if (o) {
      l.Ced = o;
    }
    Net_1.Net.Call(23053, l, a);
  }
  static OnEnableNearbyTrackingNotify(t) {
    for (const e of t.PSs) {
      const r = MathUtils_1.MathUtils.LongToNumber(e);
      WaitEntityTask_1.WaitEntityTask.Create("LevelGamePlayController.OnEnableNearbyTrackingNotify", r, e => {
        if ((e &&= ModelManager_1.ModelManager.CreatureModel.GetEntity(r)) && (e = e.Entity.GetComponent(164))) {
          e.EnableTracking = t.yIs;
        }
      }, 60000, true, true);
    }
  }
  static EntityAdsorbRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.Fes.create();
    r.F4n = e;
    Net_1.Net.Call(21060, r, t);
  }
  static RequestChairSit(e, t, r) {
    var o = Protocol_1.Aki.Protocol.rms.create();
    o.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    o.U5n = t;
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(0).GetCreatureDataId();
    if (e) {
      o.R5n = CombatMessage_1.CombatNet.CreateCombatCommon(e);
    }
    o.x5n = r;
    Net_1.Net.Call(23875, o, e => {
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
}
(exports.LevelGamePlayController = LevelGamePlayController).fUe = undefined;
LevelGamePlayController.lUe = 0;
LevelGamePlayController.cUe = e => {};
LevelGamePlayController.uUe = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("World", 17, "服务端通知耐久度变化", ["CreatureDataId", e.F4n], ["耐久度", e.jqs]);
  }
  var t;
  var r;
  var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.F4n));
  if (o?.Valid) {
    t = o.Entity.GetComponent(0);
    e = e.jqs;
    r = t.GetDurabilityValue();
    t.SetDurabilityValue(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAnySceneItemDurabilityChange, o, e, r);
  }
};
LevelGamePlayController._Ue = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.s5n);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (t) {
    t.Entity.GetComponent(0).UpdateEntityCommonTags(e.aSs);
    t.Entity.GetComponent(200).SyncTagsFromServer(e.aSs);
  }
};
LevelGamePlayController.dUe = e => {
  var t = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
  if (t) {
    var r = t.Entity.GetComponent(143);
    if (r) {
      switch (e.Pmu?.h5n) {
        case Protocol_1.Aki.Protocol.Gmu.dm1:
          var o = e.Pmu.Umu;
          if (o) {
            r.SetTargetFloorTeleport(e.P5n, o.Bmu ?? 0, o.Dmu ?? 0, o.kmu, o.Omu);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 79, "SetTargetFloorTeleport Failed, Proto_MoveTeleport is undefined", ["EntityId", e.F4n]);
          }
          break;
        case Protocol_1.Aki.Protocol.Gmu.Krd:
          o = e.Pmu.Krd;
          if (!o) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 79, "SetTargetFloorPathMove Failed, Proto_MoveTeleport is undefined", ["EntityId", e.F4n]);
            }
            return;
          }
          r.SetTargetFloorPathMove(e.P5n, o.Yrd, o.Xrd);
          break;
        default:
          Protocol_1.Aki.Protocol.Gmu.Proto_Default;
          r.SetTargetFloor(e.P5n);
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