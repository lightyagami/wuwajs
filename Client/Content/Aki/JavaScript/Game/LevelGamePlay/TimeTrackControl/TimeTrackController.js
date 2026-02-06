"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeTrackController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class TimeTrackController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CameraViewTargetChanged, this.OnViewTargetChanged)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraViewTargetChanged, this.OnViewTargetChanged);
    }
  }
  static OnRemoveEvents() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CameraViewTargetChanged, this.OnViewTargetChanged)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraViewTargetChanged, this.OnViewTargetChanged);
    }
  }
  static SafeRegisterEvents(e) {
    if (!EventSystem_1.EventSystem.HasWithTarget(e.Entity, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.AddWithTarget(e.Entity, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static SafeUnRegisterEvents(e) {
    if (EventSystem_1.EventSystem.HasWithTarget(e.Entity, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e.Entity, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  static OpenTimeTrackControlView(e, t, a) {
    var r;
    if (UiManager_1.UiManager.IsViewOpen("TimeTrackControlView")) {
      if (a) {
        a(false);
        this.B7 = undefined;
      }
    } else {
      ModelManager_1.ModelManager.TimeTrackControlModel.SetCurrentTimeTrackControl(e, t);
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
      this.SafeRegisterEvents(r);
      this.B7 = a;
      this.TimelineTraceStartRequest(e, t);
    }
  }
  static HandleTimeTrackControlViewClose() {
    this.TimelineTraceExitRequest();
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(ModelManager_1.ModelManager.TimeTrackControlModel.RefEntityId)?.Entity?.GetComponent(174);
    if (e) {
      e.ForceExitSeqCamera();
    }
    ModelManager_1.ModelManager.StaticSceneModel.IsNotAutoExitSceneCamera = false;
    ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi = false;
  }
  static TimelineTraceStartRequest(t, e) {
    var a = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId;
    if (a === undefined && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneGameplay", 7, "时间控制装置启动请求:当前没有有效的控制实体");
    }
    var r = Protocol_1.Aki.Protocol.NCs.create();
    r.F4n = MathUtils_1.MathUtils.NumberToLong(a);
    r.c5n = e;
    Net_1.Net.Call(22383, r, e => {
      if (e) {
        ModelManager_1.ModelManager.TimeTrackControlModel.InitControlInfo(e);
        ModelManager_1.ModelManager.StaticSceneModel.IsNotAutoExitSceneCamera = true;
        ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi = true;
        if (this.Gwe(e.PSs, t)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:HandleStaticSceneSeq成功", ["entityid", t]);
          }
        } else {
          TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
          this.HandleTimeTrackControlViewClose();
          this.FinishCallback(false);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:HandleStaticSceneSeq失败", ["entityid", t]);
          }
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:response请求失败", ["entityid", t]);
        }
        this.FinishCallback(false);
      }
    });
  }
  static TimelineTraceControlRequest(e) {
    var t = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId;
    if (t === undefined && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneGameplay", 7, "时间控制装置变更请求:当前没有有效的控制实体");
    }
    ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated = false;
    var a = Protocol_1.Aki.Protocol.VCs.create();
    a.f6n = e;
    a.F4n = MathUtils_1.MathUtils.NumberToLong(t);
    Net_1.Net.Call(21963, a, e => {
      var t;
      ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated = true;
      if (e) {
        if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTimelineMove) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTimeTrackControlUpdate, e.nps, e.Cvs);
        } else if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          t = ModelManager_1.ModelManager.TimeTrackControlModel.ControlPoint;
          ModelManager_1.ModelManager.TimeTrackControlModel.UpdateControlInfo(e.nps);
          this.Nwe(t, e.nps);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTimeTrackControlUpdate, e.nps, e.Cvs);
        }
      }
    });
  }
  static TimelineTraceExitRequest() {
    var e = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId;
    if (e === undefined && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneGameplay", 7, "时间控制装置退出请求:当前没有有效的控制实体");
    }
    var t = Protocol_1.Aki.Protocol.HCs.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(16536, t, e => {});
  }
  static Gwe(t, a) {
    if (t?.length) {
      for (let e = t.length - 1; e >= 0; e--) {
        var r = MathUtils_1.MathUtils.LongToNumber(t[e]);
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
        if (i?.Valid) {
          i = i.Entity?.GetComponent(174);
          if (i && i.ForceEnterSeqCamera()) {
            ModelManager_1.ModelManager.TimeTrackControlModel.RefEntityId = r;
            ModelManager_1.ModelManager.TimeTrackControlModel.RefTrueEntityId = a;
            return true;
          }
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，没找到合适的entityId", ["entityid", a]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，inId数组长度异常", ["entityid", a]);
    }
    this.FinishCallback(false);
    return false;
  }
  static Nwe(e, t) {
    var a = ModelManager_1.ModelManager.TimeTrackControlModel.ControllerEntity;
    if (a?.Valid) {
      a = a.Entity.GetComponent(145);
      if (!(ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigStatesCounts() < 2)) {
        if (t !== e) {
          a?.PlayActiveSeqForDuration(t < e, -1);
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneGameplay", 39, "时间控制装置自身表现变化:当前没有有效的控制实体");
    }
  }
  static FinishCallback(e) {
    if (this.B7) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:FinishCallback");
      }
      this.B7(e);
      this.B7 = undefined;
    }
  }
}
exports.TimeTrackController = TimeTrackController;
(_a = TimeTrackController).B7 = undefined;
TimeTrackController.VBn = () => {
  _a.FinishCallback(true);
};
TimeTrackController.OnViewTargetChanged = e => {
  if (ControllerHolder_1.ControllerHolder.CameraController.Model.IsToLockOnCameraMode() && _a.B7) {
    if (e <= 1) {
      TimerSystem_1.TimerSystem.Delay(_a.VBn, 1000);
    } else {
      TimerSystem_1.TimerSystem.Delay(_a.VBn, e * 1000);
    }
  }
};
TimeTrackController.zpe = (e, t) => {
  TimeTrackController.SafeUnRegisterEvents(t);
  if (UiManager_1.UiManager.IsViewOpen("TimeTrackControlView")) {
    UiManager_1.UiManager.CloseView("TimeTrackControlView");
  }
}; //# sourceMappingURL=TimeTrackController.js.map