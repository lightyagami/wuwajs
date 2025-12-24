"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const WorldNavigation_1 = require("../Common/WorldNavigation");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const MapLogger_1 = require("../Map/Misc/MapLogger");
const QuestController_1 = require("../QuestNew/Controller/QuestController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const TeleportMisc_1 = require("../Teleport/TeleportMisc");
const WorldMapDefine_1 = require("./WorldMapDefine");
class WorldMapController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    InputManager_1.InputManager.RegisterOpenViewFunc("WorldMapView", WorldMapController._ki);
    return true;
  }
  static OnLeaveLevel() {
    if (this.l3o !== undefined && TimerSystem_1.GameplayTimerSystem.Has(this.l3o)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.l3o);
    }
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this._3o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.u3o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsOpenWorldMapView, this.nkf);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this._3o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.u3o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsOpenWorldMapView, this.nkf);
  }
  static TryTeleport(e, r) {
    var o;
    if (ModelManager_1.ModelManager.TeleportModel.AllowTeleportByUi) {
      if ((o = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(e)) === undefined) {
        MapLogger_1.MapLogger.Error(63, "[地图系统]传送失败,找不到传送配置", ["teleportId", e]);
      } else {
        o = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(o.TeleportEntityConfigId, o.MapId);
        if (QuestController_1.QuestNewController.IsTrackPositionOutFailRange(o)) {
          (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(220)).FunctionMap.set(2, () => {
            TeleportMisc_1.TeleportMisc.SendTeleportTransferRequest(e);
            r?.();
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
        } else {
          TeleportMisc_1.TeleportMisc.SendTeleportTransferRequest(e);
          r?.();
        }
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleTransmitLimit");
    }
  }
  static TryTeleportByEntityId(e, r) {
    if (ModelManager_1.ModelManager.TeleportModel.AllowTeleportByUi) {
      if (ConfigManager_1.ConfigManager.MapConfig.GetInstEntityTeleportConfigById(e) === undefined) {
        MapLogger_1.MapLogger.Error(86, "[地图系统]传送失败,找不到传送配置", ["InstEntityTeleportId", e]);
      } else {
        TeleportMisc_1.TeleportMisc.SendTeleportTransferRequestByEntityId(e);
        r?.();
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleTransmitLimit");
    }
  }
  static MapOpenPush(e) {
    var r = new Protocol_1.Aki.Protocol.fas();
    r.vjn = e;
    Net_1.Net.Send(27877, r);
  }
  static OpenView(o, e, r, t) {
    if (ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId !== undefined) {
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange, this.Uct)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange, this.Uct);
      }
      ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId = undefined;
    }
    ModelManager_1.ModelManager.WorldMapModel.IsBattleViewOpen = e;
    const a = () => {
      UiManager_1.UiManager.OpenView("WorldMapView", r, (e, r) => {
        if (e) {
          WorldMapController.MapOpenPush(o);
        }
        ModelManager_1.ModelManager.WorldMapModel.IsBattleViewOpen = false;
        t?.(e, r);
      });
    };
    if (UiManager_1.UiManager.IsViewOpen("WorldMapView") || UiManager_1.UiManager.IsViewHide("WorldMapView")) {
      UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(() => {
        a();
      });
    } else {
      a();
    }
  }
  static FocalMarkItem(e, r) {
    var o = ModelManager_1.ModelManager.WorldMapModel;
    var t = o.CurrentFocalMarkType;
    var a = o.CurrentFocalMarkId;
    if (t !== e || a !== r) {
      if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
      if (UiManager_1.UiManager.IsViewShow("CommonRewardView")) {
        UiManager_1.UiManager.CloseView("CommonRewardView");
      }
    }
    o.CurrentFocalMarkType = e;
    o.CurrentFocalMarkId = r;
    if (UiManager_1.UiManager.IsViewShow("WorldMapView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWorldMapTrackMarkItem, e, r);
    } else {
      t = {
        MarkType: e,
        MarkId: r,
        OpenFogId: 0
      };
      WorldMapController.OpenView(1, false, t);
    }
  }
  static ClearFocalMarkItem() {
    var e = ModelManager_1.ModelManager.WorldMapModel;
    e.CurrentFocalMarkType = undefined;
    e.CurrentFocalMarkId = undefined;
  }
  static CloseWorldMap() {
    if (UiManager_1.UiManager.IsViewShow("WorldMapView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles);
      UiManager_1.UiManager.ResetToBattleView();
    } else if (UiManager_1.UiManager.IsViewShow("FunctionView")) {
      UiManager_1.UiManager.CloseView("FunctionView");
    }
  }
  static OnClear() {
    if (this.l3o !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.l3o);
      this.l3o = undefined;
    }
    this.iUi.ClearData();
    return true;
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("WorldMapView", WorldMapController.iVe, "WorldMapController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("WorldMapView", WorldMapController.iVe);
  }
  static FocusNearestTargetOnWorldMap(e) {
    e = {
      MarkId: e.Info?.MarkId ?? e.TargetMarkId,
      MarkType: e.Info?.MarkType ?? e.TargetMarkType
    };
    ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e);
  }
  static vdl() {
    var e = ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo?.InstanceDungeonId ?? 0;
    var r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (ModelManager_1.ModelManager.MapModel.CurrentInWorld || ModelManager_1.ModelManager.WorldMapModel.InstIsType(r, Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance, 12)) {
      ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo = undefined;
    } else if (e !== r) {
      this.Mdl(r);
    }
  }
  static Mdl(r) {
    var e = Protocol_1.Aki.Protocol.wg_.create();
    Net_1.Net.Call(25652, e, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 22296);
      }
      e = {
        InstanceDungeonId: r,
        Position: Vector_1.Vector.Create(e.D7n, e.A7n, e.L7n)
      };
      ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo = e;
    });
  }
  static SkipToExploreAreaDetailView(e, r) {
    if (UiManager_1.UiManager.IsViewShow("WorldMapView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap, e, r);
    } else {
      e = {
        MarkId: undefined,
        MarkType: 0,
        SkipToExploreAreaDetailView: [e, r]
      };
      WorldMapController.OpenView(2, false, e);
    }
  }
  static StartListenChildQuestNodeStatusChangedAndOpenWorldMap(e) {
    ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId = e;
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange, this.Uct)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange, this.Uct);
    }
  }
  static RequestNavigationFindPath(e, r, o) {
    var t = Protocol_1.Aki.Protocol.JU1.create();
    t.R71 = {
      X: e.X,
      Y: e.Y,
      Z: e.Z
    };
    t.L71 = {
      X: r.X,
      Y: r.Y,
      Z: r.Z
    };
    t.w7n = o;
    Net_1.Net.Call(27173, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16633);
      }
    });
  }
  static EnableWorldNavigationDebug(e) {
    WorldNavigation_1.WorldNavigation.SetEnableDebug(e);
  }
  static OpenExtraUi(e, r, o) {
    if (UiManager_1.UiManager.IsViewShow("WorldMapView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
        MarkId: r.MarkId,
        MarkType: r.MarkType,
        Focal: false
      });
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenExtraUiFromMap, e, o);
    } else {
      this.OpenView(2, false, r);
    }
  }
}
exports.WorldMapController = WorldMapController;
(_a = WorldMapController).l3o = undefined;
WorldMapController.m3o = undefined;
WorldMapController.iUi = new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper();
WorldMapController._ki = () => {
  WorldMapController.OpenView(0, true);
};
WorldMapController._3o = (e, r) => {
  if (e === "FunctionOpenView") {
    _a.m3o = ModelManager_1.ModelManager.FunctionModel?.GetNewOpenFunctionIdList();
  }
};
WorldMapController.u3o = (r, e) => {
  if (r === "FunctionOpenView") {
    let e = undefined;
    for (const o of _a.m3o) {
      if (e = ConfigManager_1.ConfigManager.MapConfig.GetMapMarkFuncTypeConfigByFuncId(o)) {
        break;
      }
    }
    if (e !== undefined) {
      r = {
        MarkType: 0,
        MarkId: 0,
        StartWorldPosition: Vector2D_1.Vector2D.Create(e.Position.X, e.Position.Y),
        StartScale: e.Scale,
        OpenFogId: 0
      };
      if (!ModelManager_1.ModelManager.LoadingModel.IsLoading) {
        _a.OpenView(2, false, r);
        r = {
          State: true,
          Data: {
            RelativeType: 1,
            RelativeSubType: e.Id
          }
        };
        ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap?.set(0, r);
      }
    }
  }
};
WorldMapController.iVe = e => {
  if (ModelManager_1.ModelManager.WorldMapModel.LevelEventDisableFlag) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DisableMapView");
    return false;
  } else if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10015)) {
    return !ModelManager_1.ModelManager.FunctionModel.IsLockByBehaviorTree(10015) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("UnableSystem"), false);
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomLock");
    return false;
  }
};
WorldMapController.nye = () => {
  _a.vdl();
};
WorldMapController.Uct = e => {
  const r = ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId;
  if (r === undefined) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 63, "【疑难杂症】地图聚焦行为->任务id被提前清空了", ["questId", r]);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange, _a.Uct);
  } else if (e.Type === 6 && e.TreeConfigId === ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId) {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange, _a.Uct);
    const r = ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId;
    ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId = undefined;
    var e = ModelManager_1.ModelManager.MapModel.GetMarkByQuestId(r);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 63, "地图聚焦行为失败->任务仍没有创建标记", ["questId", r]);
      }
    } else {
      e = {
        MarkId: e.MarkId,
        MarkType: e.MarkType
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e, () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapOpenedForQuestMapFocus, r);
      });
    }
  }
};
WorldMapController.nkf = (e, r, o) => {
  e = {
    MarkType: e,
    MarkId: r,
    OpenFogId: 0,
    IsNotFocusTween: o
  };
  UiManager_1.UiManager.OpenView("WorldMapView", e);
}; //# sourceMappingURL=WorldMapController.js.map