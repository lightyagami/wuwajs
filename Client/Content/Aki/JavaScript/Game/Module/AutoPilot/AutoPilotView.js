"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotView = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const InputExtraShowCursorCenter_1 = require("../../Ui/Input/InputExtraShowCursorCenter");
const InputManager_1 = require("../../Ui/Input/InputManager");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../Ui/UiManager");
const MovieModeUtil_1 = require("../MovieMode/MovieModeUtil");
const AutoPilotDefine_1 = require("./AutoPilotDefine");
const AutoPilotStateView_1 = require("./AutoPilotStateView");
class AutoPilotView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.x9f = undefined;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.z8m = undefined;
    this.vKt = undefined;
    this.Z8m = undefined;
    this.o6m = undefined;
    this.n6m = undefined;
    this.PhotoBtn = undefined;
    this.IsMovieModeHideUi = false;
    this.ymf = undefined;
    this.Smf = undefined;
    this.UiItemOffsetConfig = [];
    this.GRf = false;
    this.FRf = 0;
    this.NRf = 0;
    this.VRf = 0;
    this.HRf = 0;
    this._Pf = false;
    this.vmf = false;
    this.J_ = e => {
      if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsCanShowSkipBtn()) {
        this.uPf();
      }
      this.cPf();
      this.XRf(e);
    };
    this.$Ht = () => {
      this.HandleClickSkipBtn();
    };
    this.DSi = () => {
      this.NLf();
    };
    this.g6m = () => {
      this.EnterMovieMode();
    };
    this.C6m = () => {
      if (!ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode()) {
        this.ExitMovieMode();
      }
    };
    this.$Rf = () => {
      this.GRf = true;
    };
    this.WRf = () => {
      this.GRf = false;
    };
    this.gNf = async () => {
      if (ModelManager_1.ModelManager.ShipTogetherModel?.RiderSharingState && (this.ymf = new CustomPromise_1.CustomPromise(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, false, false), await this.ymf.Promise)) {
        await TimerSystem_1.GameplayTimerSystem.Wait(ModelManager_1.ModelManager.ShipTogetherModel.MotorSharingRideBlackScreenQuit * MathUtils_1.MathUtils.SecondToMillisecond);
      }
    };
    this.OnClickPhotoBtn = () => {
      ControllerHolder_1.ControllerHolder.PhotographController.ScreenShot({
        ScreenShot: true,
        PrepareFullScreenShot: false,
        IsHiddenBattleView: true,
        HandBookPhotoData: undefined,
        GachaData: undefined,
        FragmentMemory: undefined,
        RoleSkinData: undefined
      });
    };
    this.S6m = (e, t) => !!ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode() || e !== InputMappingsDefine_1.actionMappings.地图;
    this.M6m = (e, t) => {
      if (t !== 0) {
        ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("ExitAutoPilotByInput");
      }
    };
    this.Tmf = e => {
      if (!ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode()) {
        this.QRf(e.Progress);
        this.RootItem?.SetAlpha(1 - e.Progress);
        ModelManager_1.ModelManager.BattleUiModel.SetBattleUiAlpha(1 - e.Progress);
      }
    };
    this.bmf = (e, t) => {
      (e ? this.Smf : this.ymf)?.SetResult(t);
    };
    this.Rmf = e => {
      this.wmf(e);
    };
    this.Omf = (t, i) => {
      this.UiItemOffsetConfig.forEach(e => {
        MovieModeUtil_1.MovieModeUtil.ApplyAspectOffsetToUi(e, t, i);
      });
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AutoPilot", 87, "AutoPilotView:ApplyAspectOffset", ["isApply", t]);
      }
    };
    this.$Ge = (e, t) => {
      if (e === "MotorcycleTogetherView") {
        ModelManager_1.ModelManager.MovieModeModel?.UnFreezeUi("EnterRideShareMode");
        this.UpdateRideShareProgress(0);
      }
    };
  }
  set U6m(e) {
    if (this._Pf !== e && (this._Pf = e, this.x6m(), e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "ShowAutoPilotMovieBtn");
    }
  }
  get U6m() {
    return this._Pf;
  }
  set Cmf(e) {
    if (this.vmf !== e) {
      this.vmf = e;
      this.dPf();
    }
  }
  get Cmf() {
    return this.vmf;
  }
  async OnBeforeStartAsync() {
    this.x9f = new AutoPilotStateView_1.AutoPilotStateView();
    await this.x9f.CreateThenShowByResourceIdAsync("UiItem_MotorAutoCruise", this.RootItem);
  }
  OnStart() {
    this.v0t();
    this.InitUi();
    this.InitUiItemAspectOffsetConfig();
    this.RefreshUiVisible();
    this.Ore();
  }
  InitUiItemAspectOffsetConfig() {}
  InitUi() {
    this.Lmf();
    this.L6m();
    this.P6m();
    this.A6m();
    this.D6m();
  }
  Ore() {
    InputManager_1.InputManager.RegisterLockShortcutKeyReason("AutoPilotView", this.S6m);
    if (ModelManager_1.ModelManager.AutoPilotModel.IsAllowExitByMove) {
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MotorMoveForward, this.M6m);
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MotorMoveRight, this.M6m);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeAspectOffsetUpdate, this.Tmf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, this.bmf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeHideUiChange, this.Rmf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeAspectOffsetApply, this.Omf);
    InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.RegisterExtraRefreshData("AutoPilotView", this);
  }
  kre() {
    InputManager_1.InputManager.RemoveLockShortcutKeyReason("AutoPilotView");
    if (ModelManager_1.ModelManager.AutoPilotModel.IsAllowExitByMove) {
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MotorMoveForward, this.M6m);
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MotorMoveRight, this.M6m);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeAspectOffsetUpdate, this.Tmf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeResponse, this.bmf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeHideUiChange, this.Rmf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeAspectOffsetApply, this.Omf);
    InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData("AutoPilotView");
  }
  Lmf() {
    this.vKt = this.GetButton(this.GetSkipBtnCompId());
    if (this.vKt) {
      if (ModelManager_1.ModelManager.AutoPilotModel.GetIsCanShowSkipBtn()) {
        this.vKt.OnClickCallBack.Bind(this.$Ht);
      } else {
        this.vKt.RootUIComp.SetUIActive(false);
      }
    }
  }
  A6m() {
    this.o6m = this.GetButton(this.GetRideShareBtnCompId());
    this.o6m?.OnPointDownCallBack.Bind(this.$Rf);
    this.o6m?.OnPointUpCallBack.Bind(this.WRf);
    this.o6m?.OnPointExitCallBack.Bind(this.WRf);
    this.NRf = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotMovieModeRideShareLongPressTime") ?? 1;
    this.NRf *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
  }
  L6m() {
    this.n6m = this.GetButton(this.GetExitBtnCompId());
    if (this.n6m) {
      this.n6m.OnClickCallBack.Bind(this.DSi);
    }
  }
  P6m() {
    this.Z8m = this.GetButton(this.GetMovieBtnCompId());
    this.Z8m?.OnPointDownCallBack.Bind(this.g6m);
    this.Z8m?.OnPointUpCallBack.Bind(this.C6m);
    this.Z8m?.OnPointExitCallBack.Bind(this.C6m);
    this.z8m = this.GetTexture(this.GetMovieBtnProgressCompId());
    this.QRf(0);
    this.VRf = CommonParamById_1.configCommonParamById.GetIntConfig("EnterMovieModeTimeThreshold") ?? 1;
    this.HRf = CommonParamById_1.configCommonParamById.GetIntConfig("ExitMovieModeTimeThreshold") ?? 1;
  }
  D6m() {
    this.PhotoBtn = this.GetButton(this.GetPhotoBtnCompId());
    this.PhotoBtn?.OnClickCallBack.Bind(this.OnClickPhotoBtn);
  }
  v0t() {
    this.sKe = TickSystem_1.TickSystem.Add(this.J_, "AutoPilotView", 0, true, undefined, true).Id;
  }
  OnBeforeShow() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Resume(this.sKe);
    }
    this.UpdateRideShareProgress(0);
  }
  OnAfterHide() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Pause(this.sKe);
    }
  }
  async NLf() {
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode()) {
      await this.ExitMovieMode();
    } else {
      ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("OnClickExitBtn");
    }
  }
  Imf() {
    ControllerHolder_1.ControllerHolder.MovieModeController.ResetMovieModeHideUi(true);
    ModelManager_1.ModelManager.MovieModeModel?.FreezeUi("EnterRideShareMode");
    if (ModelManager_1.ModelManager.ShipTogetherModel.IsInMovieRideSharingMode) {
      this.Amf();
    } else {
      this.Dmf();
    }
  }
  async Dmf() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3, ModelManager_1.ModelManager.ShipTogetherModel?.MotorSharingRideBlackScreenLoad);
    await this.xmf();
    await this.Umf();
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(0);
    this.pXf();
  }
  async Amf() {
    if (!ControllerHolder_1.ControllerHolder.MovieModeController.IsPlayingSpecialMovieCamera(ModelManager_1.ModelManager.ShipTogetherModel.MotorSharingMovieCameraConfig)) {
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3, ModelManager_1.ModelManager.ShipTogetherModel?.MotorSharingRideBlackScreenLoad);
      await this.Umf();
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(0);
    }
    this.pXf();
  }
  pXf() {
    UiManager_1.UiManager.OpenView("MotorcycleTogetherView", undefined, e => {
      if (!e) {
        ModelManager_1.ModelManager.MovieModeModel?.UnFreezeUi("EnterRideShareMode");
        this.UpdateRideShareProgress(0);
      }
    });
  }
  async Umf() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "播放共乘镜头（开始）");
    }
    await ControllerHolder_1.ControllerHolder.MovieModeController.PlaySpecialMovieCamera(ModelManager_1.ModelManager.ShipTogetherModel.MotorSharingMovieCameraConfig);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "播放共乘镜头（结束）");
    }
  }
  async xmf() {
    if (ModelManager_1.ModelManager.ShipTogetherModel?.RiderSharingState && (this.Smf = new CustomPromise_1.CustomPromise(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, true, false), await this.Smf.Promise)) {
      await TimerSystem_1.GameplayTimerSystem.Wait(ModelManager_1.ModelManager.ShipTogetherModel.MotorSharingRideBlackScreenQuit * MathUtils_1.MathUtils.SecondToMillisecond);
    }
  }
  EnterMovieMode() {
    var e = {
      Type: "Common",
      RowName: ModelManager_1.ModelManager.AutoPilotModel.AutoPilotMovieCameraRowName,
      SpecElementIndex: ModelManager_1.ModelManager.AutoPilotModel?.AutoPilotMovieCameraInitialIndex
    };
    var e = {
      BlendTime: this.VRf,
      MovieCameraConfig: {
        MovieCameraType: e
      },
      Parent: this
    };
    ControllerHolder_1.ControllerHolder.MovieModeController.EnterMovieMode(e, e => {
      if (e) {
        ModelManager_1.ModelManager.BattleUiModel?.SetBattleUiAlpha(1);
        ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(15, [4, 17, 40], false);
        ModelManager_1.ModelManager.AutoPilotModel?.SetIsInMovieMode(true);
        this.RefreshUiByIsInMovieMode();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
      }
    });
  }
  async ExitMovieMode(e) {
    e = {
      BlendTime: e ?? this.HRf,
      BlackFadeInTime: this.HRf
    };
    e.AfterBlackFadeInCallbackAsync = this.gNf;
    await ControllerHolder_1.ControllerHolder.MovieModeController.ExitMovieMode(e, e => {
      if (e) {
        this.QRf(0);
        ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(15, [4, 17, 37, 40], true);
        ModelManager_1.ModelManager.AutoPilotModel?.SetIsInMovieMode(false);
        this.RefreshUiByIsInMovieMode();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
      }
    });
  }
  cPf() {
    if (ModelManager_1.ModelManager.AutoPilotModel.GetAutoPilotTime() < ModelManager_1.ModelManager.AutoPilotModel.GetEnterMovieModeTimeThreshold()) {
      this.U6m = false;
    } else {
      var e = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
      if (e) {
        var t = ModelManager_1.ModelManager.AutoPilotModel.GetEnterMovieModeDistanceThreshold();
        if (e.GetDistSquaredPlayerToEndPoint() < t) {
          this.U6m = false;
          return;
        }
      }
      this.U6m = true;
    }
  }
  uPf() {
    if (ModelManager_1.ModelManager.AutoPilotModel.GetAutoPilotTime() < ModelManager_1.ModelManager.AutoPilotModel.GetCanSkipTimeThreshold()) {
      this.Cmf = false;
    }
    var e;
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    if (t && (e = ModelManager_1.ModelManager.AutoPilotModel.GetCanSkipDistanceThreshold(), t.GetDistSquaredPlayerToEndPoint() < e)) {
      this.Cmf = false;
    }
    this.Cmf = true;
  }
  x6m() {
    var e = ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode();
    this.Z8m?.RootUIComp?.SetUIActive(this.U6m && !e);
  }
  dPf() {
    this.vKt?.RootUIComp?.SetUIActive(!this.IsMovieModeHideUi && this.Cmf);
  }
  q6m() {
    this.n6m?.RootUIComp?.SetUIActive(!this.IsMovieModeHideUi);
  }
  RefreshPhotoBtnVisible() {
    this.PhotoBtn?.RootUIComp?.SetUIActive(!this.IsMovieModeHideUi);
  }
  kmf() {
    var e = ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode() && !this.IsMovieModeHideUi;
    this.o6m?.RootUIComp?.SetUIActive(e);
  }
  B9f() {
    var e = ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode();
    this.x9f?.SetUiActive(!e);
  }
  RefreshUiVisible() {
    this.kmf();
    this.x6m();
    this.dPf();
    this.q6m();
    this.RefreshPhotoBtnVisible();
  }
  RefreshUiByIsMovieModeHideUi() {
    this.dPf();
    this.q6m();
    this.RefreshPhotoBtnVisible();
    this.kmf();
  }
  RefreshUiByIsInMovieMode() {
    this.x6m();
    this.kmf();
    this.B9f();
  }
  async wmf(e) {
    var t;
    if (this.IsMovieModeHideUi !== e || !ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode()) {
      this.IsMovieModeHideUi = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
      ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(15, [37], !e);
      t = this.RootItem?.GetAlpha() ?? 0;
      if (e) {
        if (t > 0) {
          this.RootItem?.PlayUIItemAlphaTween(1, 0, AutoPilotDefine_1.MOVIEMODE_UIVISIBLE_ANIM_TIME);
          await TimerSystem_1.GameplayTimerSystem.Wait(AutoPilotDefine_1.MOVIEMODE_UIVISIBLE_ANIM_TIME * MathUtils_1.MathUtils.SecondToMillisecond);
        }
        this.RefreshUiByIsMovieModeHideUi();
      } else {
        this.RefreshUiByIsMovieModeHideUi();
        this.RootItem?.PlayUIItemAlphaTween(0, 1, AutoPilotDefine_1.MOVIEMODE_UIVISIBLE_ANIM_TIME);
      }
    }
  }
  XRf(e) {
    if (ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode() && !this.IsMovieModeHideUi) {
      if (this.FRf >= this.NRf) {
        if (ModelManager_1.ModelManager.ShipTogetherModel.CanEnterMotorcycleMovieRideSharingMode(true)) {
          this.Imf();
        }
        this.FRf = 0;
        this.GRf = false;
        this.UpdateRideShareProgress(0);
      } else {
        if (this.GRf) {
          this.FRf = Math.min(this.FRf + e, this.NRf);
        } else {
          if (!(this.FRf > 0)) {
            return;
          }
          this.FRf = Math.max(this.FRf - e, 0);
        }
        e = this.FRf / this.NRf;
        this.UpdateRideShareProgress(e);
      }
    }
  }
  UpdateRideShareProgress(e) {
    ModelManager_1.ModelManager.AutoPilotModel.RideShareBtnProgress = e;
  }
  QRf(e) {
    this.z8m?.SetFillAmount(e);
  }
  IsShowCursor() {
    return ModelManager_1.ModelManager.InputDistributeModel.GetNotAllowFightInputViewNameSet().size > 0 || ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode() && !this.IsMovieModeHideUi;
  }
  S0t() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.BattleUiModel.SetBattleUiAlpha(1);
    ModelManager_1.ModelManager.MovieModeModel?.UnFreezeUi("EnterRideShareMode");
    this.S0t();
    this.kre();
  }
}
exports.AutoPilotView = AutoPilotView;
//# sourceMappingURL=AutoPilotView.js.map