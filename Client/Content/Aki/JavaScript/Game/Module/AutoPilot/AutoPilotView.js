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
    this.ZZf = undefined;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.i7m = undefined;
    this.vKt = undefined;
    this.o7m = undefined;
    this.s7m = undefined;
    this.a7m = undefined;
    this.PhotoBtn = undefined;
    this.IsMovieModeHideUi = false;
    this.UiItemOffsetConfig = [];
    this.Yxf = false;
    this.zxf = 0;
    this.Jxf = 0;
    this.Zxf = 0;
    this.eBf = 0;
    this.kkf = false;
    this.Ogf = false;
    this.J_ = e => {
      if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsCanShowSkipBtn()) {
        this.qkf();
      }
      this.Okf();
      this.sBf(e);
    };
    this.$Ht = () => {
      this.HandleClickSkipBtn();
    };
    this.DSi = () => {
      this.ekf();
    };
    this.p7m = () => {
      this.EnterMovieMode();
    };
    this.v7m = () => {
      if (!ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode()) {
        this.ExitMovieMode();
      }
    };
    this.iBf = () => {
      this.Yxf = true;
    };
    this.rBf = () => {
      this.Yxf = false;
    };
    this.eHf = async () => {
      if (ModelManager_1.ModelManager.ShipTogetherModel?.RiderSharingState && (ModelManager_1.ModelManager.AutoPilotModel.ExitMovieModeWithRideShareQuitPromise = new CustomPromise_1.CustomPromise(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, false, false), await ModelManager_1.ModelManager.AutoPilotModel.ExitMovieModeWithRideShareQuitPromise.Promise)) {
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
    this.E7m = (e, t) => !!ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode() || e !== InputMappingsDefine_1.actionMappings.地图;
    this.I7m = (e, t) => {
      if (t !== 0) {
        ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("ExitAutoPilotByInput");
      }
    };
    this.jgf = e => {
      if (!ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode()) {
        this.oBf(e.Progress);
        this.RootItem?.SetAlpha(1 - e.Progress);
        ModelManager_1.ModelManager.BattleUiModel.SetBattleUiAlpha(1 - e.Progress);
      }
    };
    this.Wgf = e => {
      this.Qgf(e);
    };
    this.r0f = (t, i) => {
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
  set B7m(e) {
    if (this.kkf !== e && (this.kkf = e, this.k7m(), e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "ShowAutoPilotMovieBtn");
    }
  }
  get B7m() {
    return this.kkf;
  }
  set kgf(e) {
    if (this.Ogf !== e) {
      this.Ogf = e;
      this.Gkf();
    }
  }
  get kgf() {
    return this.Ogf;
  }
  async OnBeforeStartAsync() {
    this.ZZf = new AutoPilotStateView_1.AutoPilotStateView();
    await this.ZZf.CreateByResourceIdAsync("UiItem_MotorAutoCruise", this.RootItem);
    this.AddChild(this.ZZf);
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
    this.Kgf();
    this.A7m();
    this.D7m();
    this.U7m();
    this.x7m();
  }
  Ore() {
    InputManager_1.InputManager.RegisterLockShortcutKeyReason("AutoPilotView", this.E7m);
    if (ModelManager_1.ModelManager.AutoPilotModel.IsAllowExitByMove) {
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MotorMoveForward, this.I7m);
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MotorMoveRight, this.I7m);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeAspectOffsetUpdate, this.jgf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeHideUiChange, this.Wgf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeAspectOffsetApply, this.r0f);
    InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.RegisterExtraRefreshData("AutoPilotView", this);
  }
  kre() {
    InputManager_1.InputManager.RemoveLockShortcutKeyReason("AutoPilotView");
    if (ModelManager_1.ModelManager.AutoPilotModel.IsAllowExitByMove) {
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MotorMoveForward, this.I7m);
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MotorMoveRight, this.I7m);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeAspectOffsetUpdate, this.jgf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeHideUiChange, this.Wgf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeAspectOffsetApply, this.r0f);
    InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData("AutoPilotView");
  }
  Kgf() {
    this.vKt = this.GetButton(this.GetSkipBtnCompId());
    if (this.vKt) {
      if (ModelManager_1.ModelManager.AutoPilotModel.GetIsCanShowSkipBtn()) {
        this.vKt.OnClickCallBack.Bind(this.$Ht);
      } else {
        this.vKt.RootUIComp.SetUIActive(false);
      }
    }
  }
  U7m() {
    this.s7m = this.GetButton(this.GetRideShareBtnCompId());
    this.s7m?.OnPointDownCallBack.Bind(this.iBf);
    this.s7m?.OnPointUpCallBack.Bind(this.rBf);
    this.s7m?.OnPointExitCallBack.Bind(this.rBf);
    this.Jxf = CommonParamById_1.configCommonParamById.GetIntConfig("AutoPilotMovieModeRideShareLongPressTime") ?? 1;
    this.Jxf *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
  }
  A7m() {
    this.a7m = this.GetButton(this.GetExitBtnCompId());
    if (this.a7m) {
      this.a7m.OnClickCallBack.Bind(this.DSi);
    }
  }
  D7m() {
    this.o7m = this.GetButton(this.GetMovieBtnCompId());
    this.o7m?.OnPointDownCallBack.Bind(this.p7m);
    this.o7m?.OnPointUpCallBack.Bind(this.v7m);
    this.o7m?.OnPointExitCallBack.Bind(this.v7m);
    this.i7m = this.GetTexture(this.GetMovieBtnProgressCompId());
    this.oBf(0);
    this.Zxf = CommonParamById_1.configCommonParamById.GetIntConfig("EnterMovieModeTimeThreshold") ?? 1;
    this.eBf = CommonParamById_1.configCommonParamById.GetIntConfig("ExitMovieModeTimeThreshold") ?? 1;
  }
  x7m() {
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
  async ekf() {
    if (ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode()) {
      await this.ExitMovieMode();
    } else {
      ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("OnClickExitBtn");
    }
  }
  Hgf() {
    ControllerHolder_1.ControllerHolder.MovieModeController.ResetMovieModeHideUi(true);
    ModelManager_1.ModelManager.MovieModeModel?.FreezeUi("EnterRideShareMode");
    if (ModelManager_1.ModelManager.ShipTogetherModel.IsInMovieRideSharingMode) {
      this.Ygf();
    } else {
      this.zgf();
    }
  }
  async zgf() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3, ModelManager_1.ModelManager.ShipTogetherModel?.MotorSharingRideBlackScreenLoad);
    await this.Zgf();
    await this.Jgf();
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(0);
    this.L_g();
  }
  async Ygf() {
    if (!ControllerHolder_1.ControllerHolder.MovieModeController.IsPlayingSpecialMovieCamera(ModelManager_1.ModelManager.ShipTogetherModel.MotorSharingMovieCameraConfig)) {
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3, ModelManager_1.ModelManager.ShipTogetherModel?.MotorSharingRideBlackScreenLoad);
      await this.Jgf();
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(0);
    }
    this.L_g();
  }
  L_g() {
    UiManager_1.UiManager.OpenView("MotorcycleTogetherView", undefined, e => {
      if (!e) {
        ModelManager_1.ModelManager.MovieModeModel?.UnFreezeUi("EnterRideShareMode");
        this.UpdateRideShareProgress(0);
      }
    });
  }
  async Jgf() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "播放共乘镜头（开始）");
    }
    await ControllerHolder_1.ControllerHolder.MovieModeController.PlaySpecialMovieCamera(ModelManager_1.ModelManager.ShipTogetherModel.MotorSharingMovieCameraConfig);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AutoPilot", 87, "播放共乘镜头（结束）");
    }
  }
  async Zgf() {
    if (ModelManager_1.ModelManager.ShipTogetherModel?.RiderSharingState && (ModelManager_1.ModelManager.AutoPilotModel.EnterRideSharePromise = new CustomPromise_1.CustomPromise(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMovieMotorRideSharingModeChangeRequest, true, false), await ModelManager_1.ModelManager.AutoPilotModel.EnterRideSharePromise.Promise)) {
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
      BlendTime: this.Zxf,
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
      BlendTime: e ?? this.eBf,
      BlackFadeInTime: this.eBf
    };
    e.AfterBlackFadeInCallbackAsync = this.eHf;
    await ControllerHolder_1.ControllerHolder.MovieModeController.ExitMovieMode(e, e => {
      if (e) {
        this.oBf(0);
        ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(15, [4, 17, 37, 40], true);
        ModelManager_1.ModelManager.AutoPilotModel?.SetIsInMovieMode(false);
        this.RefreshUiByIsInMovieMode();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
      }
    });
  }
  Okf() {
    if (ModelManager_1.ModelManager.AutoPilotModel.GetAutoPilotTime() < ModelManager_1.ModelManager.AutoPilotModel.GetEnterMovieModeTimeThreshold()) {
      this.B7m = false;
    } else {
      var e = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
      if (e) {
        var t = ModelManager_1.ModelManager.AutoPilotModel.GetEnterMovieModeDistanceThreshold();
        if (e.GetDistSquaredPlayerToEndPoint() < t) {
          this.B7m = false;
          return;
        }
      }
      this.B7m = true;
    }
  }
  qkf() {
    if (ModelManager_1.ModelManager.AutoPilotModel.GetAutoPilotTime() < ModelManager_1.ModelManager.AutoPilotModel.GetCanSkipTimeThreshold()) {
      this.kgf = false;
    }
    var e;
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
    if (t && (e = ModelManager_1.ModelManager.AutoPilotModel.GetCanSkipDistanceThreshold(), t.GetDistSquaredPlayerToEndPoint() < e)) {
      this.kgf = false;
    }
    this.kgf = true;
  }
  k7m() {
    var e = ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode();
    this.o7m?.RootUIComp?.SetUIActive(this.B7m && !e);
  }
  Gkf() {
    this.vKt?.RootUIComp?.SetUIActive(!this.IsMovieModeHideUi && this.kgf);
  }
  G7m() {
    this.a7m?.RootUIComp?.SetUIActive(!this.IsMovieModeHideUi);
  }
  RefreshPhotoBtnVisible() {
    this.PhotoBtn?.RootUIComp?.SetUIActive(!this.IsMovieModeHideUi);
  }
  t0f() {
    var e = ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode() && !this.IsMovieModeHideUi;
    this.s7m?.RootUIComp?.SetUIActive(e);
  }
  eeg() {
    var e = ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode();
    this.ZZf?.SetUiActive(!e);
  }
  RefreshUiVisible() {
    this.t0f();
    this.k7m();
    this.Gkf();
    this.G7m();
    this.RefreshPhotoBtnVisible();
  }
  RefreshUiByIsMovieModeHideUi() {
    this.Gkf();
    this.G7m();
    this.RefreshPhotoBtnVisible();
    this.t0f();
  }
  RefreshUiByIsInMovieMode() {
    this.k7m();
    this.t0f();
    this.eeg();
  }
  async Qgf(e) {
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
  sBf(e) {
    if (ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode() && !this.IsMovieModeHideUi) {
      if (this.zxf >= this.Jxf) {
        if (ModelManager_1.ModelManager.ShipTogetherModel.CanEnterMotorcycleMovieRideSharingMode(true)) {
          this.Hgf();
        }
        this.zxf = 0;
        this.Yxf = false;
        this.UpdateRideShareProgress(0);
      } else {
        if (this.Yxf) {
          this.zxf = Math.min(this.zxf + e, this.Jxf);
        } else {
          if (!(this.zxf > 0)) {
            return;
          }
          this.zxf = Math.max(this.zxf - e, 0);
        }
        e = this.zxf / this.Jxf;
        this.UpdateRideShareProgress(e);
      }
    }
  }
  UpdateRideShareProgress(e) {
    ModelManager_1.ModelManager.AutoPilotModel.RideShareBtnProgress = e;
  }
  oBf(e) {
    this.i7m?.SetFillAmount(e);
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