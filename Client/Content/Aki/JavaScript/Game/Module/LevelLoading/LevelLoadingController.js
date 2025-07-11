"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelLoadingController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGeneralContextUtil_1 = require("../../LevelGamePlay/LevelGeneralContextUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const GameAudioController_1 = require("../Audio/GameAudioController");
const BlackScreenFadeController_1 = require("../BlackScreen/BlackScreenFadeController");
const LoadingController_1 = require("../Loading/LoadingController");
const PlotModel_1 = require("../Plot/PlotModel");
const VideoLauncher_1 = require("../Video/VideoLauncher");
const WorldMapController_1 = require("../WorldMap/WorldMapController");
const CameraFadeLoading_1 = require("./CameraFadeLoading");
class PendingProcess {
  constructor(e) {
    this.ProcessType = e;
    this.ProcessId = 0;
    this.ProcessId = ++PendingProcess.Id;
  }
}
PendingProcess.Id = 0;
class OpenLoadingProcess extends PendingProcess {
  constructor(e, o, r, ...a) {
    super(0);
    this.Reason = 0;
    this.Perform = undefined;
    this.Callback = undefined;
    this.Params = undefined;
    this.Reason = e;
    this.Perform = o;
    this.Callback = r;
    this.Params = a;
  }
}
class CloseLoadingProcess extends PendingProcess {
  constructor(e, o, r) {
    super(1);
    this.Reason = 0;
    this.Callback = undefined;
    this.Duration = 0;
    this.Reason = e;
    this.Callback = o;
    this.Duration = r ?? 1;
  }
}
class LevelLoadingController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    LevelLoadingController.CameraFade = new CameraFadeLoading_1.CameraFadeLoading();
    LevelLoadingController.UYt = [];
    Net_1.Net.Register(20150, this.Cvu);
    return true;
  }
  static OnClear() {
    LevelLoadingController.CameraFade = undefined;
    LevelLoadingController.UYt = undefined;
    Net_1.Net.UnRegister(20150);
    return true;
  }
  static OnTick(e) {
    if (LevelLoadingController.UYt && LevelLoadingController.UYt.length !== 0 && !LevelLoadingController.QZe) {
      LevelLoadingController.QZe = LevelLoadingController.UYt[0];
      switch (LevelLoadingController.QZe.ProcessType) {
        case 0:
          LevelLoadingController.hpi(LevelLoadingController.QZe.Reason, LevelLoadingController.QZe.Perform, ...LevelLoadingController.QZe.Params).finally(LevelLoadingController.QZe.Callback);
          break;
        case 1:
          LevelLoadingController.lpi(LevelLoadingController.QZe.Reason, LevelLoadingController.QZe.Duration).finally(LevelLoadingController.QZe.Callback);
      }
    }
  }
  static OpenLoading(e, o, r, ...a) {
    LevelLoadingController.UYt.push(new OpenLoadingProcess(e, o, () => {
      LevelLoadingController.HDe();
      r?.();
    }, ...a));
  }
  static CloseLoading(e, o, r) {
    LevelLoadingController.UYt.push(new CloseLoadingProcess(e, () => {
      LevelLoadingController.HDe();
      o?.();
    }, r));
  }
  static async WaitOpenLoading(e, o, ...r) {
    const a = new CustomPromise_1.CustomPromise();
    LevelLoadingController.UYt.push(new OpenLoadingProcess(e, o, () => {
      LevelLoadingController.HDe();
      a.SetResult();
    }, ...r));
    await a.Promise;
  }
  static async WaitCloseLoading(e, o) {
    const r = new CustomPromise_1.CustomPromise();
    LevelLoadingController.UYt.push(new CloseLoadingProcess(e, () => {
      LevelLoadingController.HDe();
      r.SetResult();
    }, o));
    await r.Promise;
  }
  static async hpi(e, o, ...r) {
    var a = ModelManager_1.ModelManager.LevelLoadingModel;
    var n = a.GetPerformByReason(e);
    if (n === undefined) {
      a.SetLoadingState(true);
      a.AddLoadingReason(e, o);
      if (e === 15) {
        this.Xpl = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueLevelLoadingLockTimeDilation);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 18, "LevelLoading:打开流程开始", ["perfrom", o]);
      }
      GameAudioController_1.GameAudioController.UpdateLoadingType(o);
      n = LevelLoadingController.CheckIsOpen(o);
      if (n) {
        if (o === 3 && (a = r)[5] === true) {
          BlackScreenFadeController_1.BlackScreenFadeController.ChangeColorByForce(a[1]);
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Loading", 45, "LevelLoading:打开流程准备开启黑幕", ["perfrom", o]);
        }
        switch (o) {
          case 1:
            await this.upi();
            break;
          case 2:
            await this.cpi();
            break;
          case 3:
            await this.mpi(...r);
            ControllerHolder_1.ControllerHolder.QuestNewController.RequestSetFocusModeDeterCondition(false);
            break;
          case 0:
            await this.Cpi(...r);
            break;
          case 5:
            await this.yq1(...r);
        }
      }
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(4);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 18, "LevelLoading:打开流程结束", ["perfrom", o]);
      }
    }
    return true;
  }
  static async upi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenLoadingView(undefined, () => {
      e.SetResult(true);
      WorldMapController_1.WorldMapController.CloseWorldMap();
    });
    await e.Promise;
  }
  static async cpi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenFadeLoadingView(() => {
      e.SetResult(true);
      WorldMapController_1.WorldMapController.CloseWorldMap();
    });
    await e.Promise;
  }
  static async mpi(e, o, r, a, n, t) {
    const i = new CustomPromise_1.CustomPromise();
    this.CameraFade.EnterInterlude(e, r, a, n, o, () => {
      i.SetResult(true);
    });
    await i.Promise;
  }
  static async Cpi(e) {
    const o = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenVideoCenterView(() => {
      o.SetResult(true);
      WorldMapController_1.WorldMapController.CloseWorldMap();
    }, e);
    await o.Promise;
  }
  static async yq1(e, o, r = false) {
    var a = new CustomPromise_1.CustomPromise();
    await VideoLauncher_1.VideoLauncher.ShowVideoCgAsync(e, () => {
      o();
    }, undefined, undefined, r);
    a.SetResult(true);
    await a.Promise;
  }
  static CheckIsOpen(e) {
    let o = false;
    switch (e) {
      case 1:
        o = ModelManager_1.ModelManager.LoadingModel.IsLoadingView;
        break;
      case 2:
        o = UiManager_1.UiManager.IsViewOpen("FadeLoadingView");
        break;
      case 3:
        o = this.CameraFade.IsInFade();
        break;
      case 0:
        o = UiManager_1.UiManager.IsViewOpen("PlotTransitionView");
        break;
      case 5:
        o = UiManager_1.UiManager.IsViewOpen("VideoView");
    }
    return o;
  }
  static async lpi(e, o) {
    var r = ModelManager_1.ModelManager.LevelLoadingModel;
    var a = r.GetPerformByReason(e);
    r.RemoveLoadingReason(e);
    if (!r.CheckLoadingPerformExist(a)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 18, "LevelLoading:关闭流程开始");
      }
      await LevelLoadingController.gpi(a, o);
      if (r.CheckLoadingPerformsEmpty()) {
        r.SetLoadingState(false);
        if (this.Xpl) {
          this.Xpl = false;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueLevelLoadingUnlockTimeDilation);
        }
        GameAudioController_1.GameAudioController.UpdateLoadingType(undefined);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Loading", 18, "LevelLoading:关闭流程结束");
      }
    }
  }
  static async gpi(e, o) {
    if (LevelLoadingController.CheckIsOpen(e)) {
      switch (e) {
        case 1:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭Loading界面(开始)");
          }
          await this.fpi();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭Loading界面(完成)");
          }
          break;
        case 2:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭黑幕Loading(开始)");
          }
          await this.ppi();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭黑幕Loading(完成)");
          }
          break;
        case 3:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:相机淡出(开始)");
          }
          await this.vpi(o);
          ControllerHolder_1.ControllerHolder.QuestNewController.RequestSetFocusModeDeterCondition(true);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:相机淡出(完成)");
          }
          break;
        case 0:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭黑底白字Loading(开始)");
          }
          await this.Mpi();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭黑底白字Loading(完成)");
          }
          break;
        case 5:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭CG(开始)");
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭CG(完成)");
          }
      }
    }
  }
  static async fpi() {
    await LoadingController_1.LoadingController.CloseLoadingView();
  }
  static async ppi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.CloseFadeLoadingView(() => {
      e.SetResult(true);
    });
    await e.Promise;
  }
  static async vpi(e) {
    const o = new CustomPromise_1.CustomPromise();
    this.CameraFade.ExitInterlude(e, () => {
      o.SetResult(true);
    });
    await o.Promise;
  }
  static async Mpi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.CloseVideoCenterView(() => {
      e.SetResult(true);
    });
    await e.Promise;
  }
  static CloseAllBlackScreenLoading() {
    LevelLoadingController.CloseLoading(0);
    LevelLoadingController.CloseLoading(2);
    LevelLoadingController.CloseLoading(8);
    ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise();
  }
}
(exports.LevelLoadingController = LevelLoadingController).IsTickEvenPausedInternal = true;
LevelLoadingController.CameraFade = undefined;
LevelLoadingController.UYt = undefined;
LevelLoadingController.QZe = undefined;
LevelLoadingController.Xpl = false;
LevelLoadingController.Cvu = e => {
  const o = e.W5n;
  const r = e.w5n;
  const a = e.h5n;
  var n = e.C6n;
  var e = e.cvs;
  var t = LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(e);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("BlackScreen", 45, "[黑幕]Proto_ActionOperationScreenNotify 服务端下发黑幕操作", ["playerId:", o], ["incId:", r], ["type:", a], ["inParam:", n]);
  }
  function i() {
    var e = Protocol_1.Aki.Protocol.B0u.create({
      W5n: o,
      w5n: r,
      h5n: a
    });
    Net_1.Net.Call(29261, e, e => {
      if (!e || e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 45, "[黑幕]Proto_ActionOperationScreenSuccessRequest 超时", ["playerId:", o], ["incId:", r], ["type:", a === 0 ? "关闭" : "开启"], ["response!.Proto_Code:", e.Cvs]);
        }
      }
    });
  }
  if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
    i();
  } else {
    switch (a) {
      case Protocol_1.Aki.Protocol.uvu.Proto_Close:
        var l = JSON.parse(n);
        ModelManager_1.ModelManager.PlotModel.IsFadeIn = false;
        if (!l) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BlackScreen", 45, "[黑幕]Params 为空");
          }
          Global_1.Global.CharacterCameraManager.FadeAmount = 0;
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, () => {
            i();
            ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0;
            ModelManager_1.ModelManager.PlotModel.LastPlotAspect = PlotModel_1.INVALID_NUM;
            ModelManager_1.ModelManager.PlotModel.LastPlotColor = PlotModel_1.INVALID_NUM;
          }, 1);
          return;
        }
        if (ModelManager_1.ModelManager.PlotModel.BlackScreenType === 1) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, false, () => {
            i();
          });
        } else {
          Global_1.Global.CharacterCameraManager.FadeAmount = 0;
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, () => {
            i();
            ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0;
            ModelManager_1.ModelManager.PlotModel.LastPlotAspect = PlotModel_1.INVALID_NUM;
            ModelManager_1.ModelManager.PlotModel.LastPlotColor = PlotModel_1.INVALID_NUM;
          }, l.Ease?.Duration);
          l = {
            Name: "ActionBlackScreenFadeOut"
          };
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, "LevelEventFadeInScreen", t, l);
        }
        break;
      case Protocol_1.Aki.Protocol.uvu.V2_:
        {
          var d;
          var l = JSON.parse(n);
          ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 1;
          ModelManager_1.ModelManager.PlotModel.IsFadeIn = true;
          if (!l) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("BlackScreen", 45, "[黑幕]Params 为空");
            }
            ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
              i();
            }, 1, IAction_1.EFadeInScreenShowType.Black, true, true);
            return;
          }
          let e = undefined;
          if (!l.KeepFadeAfterTreeEnd && t && t.Type === 6 && (d = t) && d.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay && (e = d.TreeConfigId, Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("BlackScreen", 45, "玩法内开启黑幕：", ["treeId", d.TreeConfigId]);
          }
          ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent?.ExitCameraHook(false);
          if (l.TypeOverride) {
            ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, true, () => {
              i();
            });
          } else {
            ModelManager_1.ModelManager.PlotModel.BlackScreenType = 0;
            if (l.ScreenType === IAction_1.EFadeInScreenShowType.White) {
              ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 2;
            } else {
              IAction_1.EFadeInScreenShowType.Black;
              ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 1;
            }
            ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
              i();
            }, l.Ease?.Duration, l.ScreenType, true, true, e);
          }
          if (l.KeepFadeAfterTreeEnd) {
            d = {
              Name: "ActionBlackScreenFadeOut"
            };
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, "LevelEventFadeInScreen", t, d);
          } else {
            l = {
              Name: "ActionBlackScreenFadeOut"
            };
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, "LevelEventFadeInScreen", t, l);
          }
          break;
        }
    }
  }
};
LevelLoadingController.HDe = () => {
  LevelLoadingController.UYt.shift();
  LevelLoadingController.QZe = undefined;
}; //# sourceMappingURL=LevelLoadingController.js.map