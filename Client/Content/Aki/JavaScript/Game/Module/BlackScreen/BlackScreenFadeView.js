"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackScreenFadeView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const PlotModel_1 = require("../Plot/PlotModel");
const LguiUtil_1 = require("../Util/LguiUtil");
const BlackScreenFadeController_1 = require("./BlackScreenFadeController");
const BlackScreenViewData_1 = require("./BlackScreenViewData");
const GUARANTEED_TIME = 10000;
const MAX_FADE_VALUE = 0.9;
class BlackScreenFadeView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this._0t = 0;
    this.u0t = 0;
    this.c0t = 0;
    this.Iii = 0;
    this.$Cl = 0;
    this.a1e = true;
    this.m0t = TickSystem_1.TickSystem.InvalidId;
    this.d0t = TickSystem_1.TickSystem.InvalidId;
    this.C0t = new BlackScreenViewData_1.BlackScreenViewData();
    this.g0t = undefined;
    this.XCl = undefined;
    this.f0t = () => {
      if (this.a1e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 45, "黑幕FadeIn结束");
        }
        ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 45, "黑幕FadeOut结束");
        }
        ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraHidePromise();
        this.SetActive(false);
        BlackScreenFadeController_1.BlackScreenFadeController.NeedInputDis = false;
        ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 45, "黑幕输入恢复", ["BlackScreenFadeController.NeedInputDis", BlackScreenFadeController_1.BlackScreenFadeController.NeedInputDis]);
        }
        UiManager_1.UiManager.RemoveOpenViewCheckFunction("All", BlackScreenFadeController_1.BlackScreenFadeController.CheckCanOpen);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBlackFadeScreenFinish);
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("BlackScreen");
      }
    };
    this.p0t = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BlackScreen", 45, "开始显示黑屏");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBlackFadeScreenStart);
      this.v0t(this.m0t);
      this.SetActive(true);
      this.yAl();
    };
    this.M0t = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BlackScreen", 45, "开始隐藏黑屏");
      }
      this.SetActive(true);
      this.v0t(this.m0t);
      this.yAl();
      ModelManager_1.ModelManager.PlotModel.LastPlotColor = PlotModel_1.INVALID_NUM;
    };
    this.E0t = e => {
      var i;
      var t;
      var s;
      if (this.Iii > 0) {
        i = MathUtils_1.MathUtils.GetRangePct(0, this.$Cl, this.$Cl - this.Iii);
        t = ModelManager_1.ModelManager.PlotModel.BlackScreenLastAspect;
        s = ModelManager_1.ModelManager.PlotModel.BlackScreenNowAspect;
        this.ZCl(t + (s - t) * i);
        this.SetFadeTime(0);
        this.Iii -= e;
      }
      if (this.u0t > 0) {
        this.u0t -= e;
        if (this.u0t <= 0) {
          this.u0t = 0;
        }
        this.y0t();
      }
      if (this.u0t <= 0) {
        this.u0t = 0;
      }
      if (this.Iii <= 0) {
        this.Iii = 0;
      }
      if (this.u0t === 0 && this.Iii === 0) {
        if (this.a1e) {
          Global_1.Global.CharacterCameraManager.FadeAmount = 0;
        }
        this.f0t();
        this.S0t(this.m0t);
      }
    };
    this.I0t = e => {
      this._0t += e;
      if (this._0t > GUARANTEED_TIME) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BlackScreen", 45, "触发保底机制,内部隐藏黑屏");
        }
        this.HideItem();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  OnStart() {
    this.C0t.RegisterStateDelegate(2, this.p0t);
    this.C0t.RegisterStateDelegate(4, this.M0t);
    this.g0t = this.GetTexture(1);
    this.XCl = this.GetTexture(0);
    LguiUtil_1.LguiUtil.SetActorIsPermanent(this.RootActor, true, true);
    this.C0t.TriggerCurrentStateDelegate();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise = undefined;
    ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise = undefined;
    this.a1e = true;
    this.c0t = 0;
    this.u0t = 0;
    this.g0t = undefined;
    this.XCl = undefined;
    this.S0t(this.m0t);
    this.S0t(this.d0t);
  }
  yAl() {
    if (ModelManager_1.ModelManager.PlotModel.LastPlotColor === PlotModel_1.COLOR_BLACK) {
      this.g0t?.SetUIActive(false);
    } else {
      this.g0t?.SetUIActive(true);
    }
  }
  v0t(e) {
    if (e === TickSystem_1.TickSystem.InvalidId) {
      if (e === this.m0t) {
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
        this.m0t = TickSystem_1.TickSystem.Add(this.E0t, "BlackScreenTransitionView", 0, true, undefined, true).Id;
      } else if (e === this.d0t) {
        this.d0t = TickSystem_1.TickSystem.Add(this.I0t, "BlackScreenTransitionView", 0, true, undefined, true).Id;
      }
    }
  }
  S0t(e) {
    if (e !== TickSystem_1.TickSystem.InvalidId) {
      if (e === this.m0t) {
        TickSystem_1.TickSystem.Remove(this.m0t);
        this.m0t = TickSystem_1.TickSystem.InvalidId;
        if (!this.a1e) {
          InputDistributeController_1.InputDistributeController.RefreshInputTag();
        }
      } else if (e === this.d0t) {
        TickSystem_1.TickSystem.Remove(this.d0t);
        this.d0t = TickSystem_1.TickSystem.InvalidId;
      }
    }
  }
  ShowItem() {
    this.C0t.SwitchState(2);
  }
  HideItem() {
    var e = this.C0t.SwitchState(4);
    ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise = new CustomPromise_1.CustomPromise();
    if (!e) {
      ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise();
      ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraHidePromise();
    }
  }
  UpdateScreenColor(e) {
    switch (e) {
      case IAction_1.EFadeInScreenShowType.Black:
        this.g0t?.SetColor(ColorUtils_1.ColorUtils.ColorBlack);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BlackScreen", 45, "改变黑幕颜色为黑色");
        }
        ModelManager_1.ModelManager.PlotModel.LastPlotColor = PlotModel_1.COLOR_BLACK;
        break;
      case IAction_1.EFadeInScreenShowType.White:
        this.g0t?.SetColor(ColorUtils_1.ColorUtils.ColorWhile);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BlackScreen", 45, "改变黑幕颜色为白色");
        }
        ModelManager_1.ModelManager.PlotModel.LastPlotColor = PlotModel_1.COLOR_WHITE;
    }
    this.XCl?.SetColor(ColorUtils_1.ColorUtils.ColorBlack);
  }
  UpdateScreenColorAndChangeVisible(e) {
    switch (e) {
      case IAction_1.EFadeInScreenShowType.Black:
        this.g0t?.SetColor(ColorUtils_1.ColorUtils.ColorBlack);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BlackScreen", 45, "改变黑幕颜色为黑色");
        }
        ModelManager_1.ModelManager.PlotModel.LastPlotColor = PlotModel_1.COLOR_BLACK;
        break;
      case IAction_1.EFadeInScreenShowType.White:
        this.g0t?.SetColor(ColorUtils_1.ColorUtils.ColorWhile);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BlackScreen", 45, "改变黑幕颜色为白色");
        }
        ModelManager_1.ModelManager.PlotModel.LastPlotColor = PlotModel_1.COLOR_WHITE;
    }
    this.XCl?.SetColor(ColorUtils_1.ColorUtils.ColorBlack);
    this.yAl();
  }
  ChangeAspect(e, i) {
    var t = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
    if (!(t < 1)) {
      if (i) {
        ModelManager_1.ModelManager.PlotModel.BlackScreenLastAspect = ModelManager_1.ModelManager.PlotModel.BlackScreenNowAspect;
      } else if (ModelManager_1.ModelManager.PlotModel.BlackScreenNowAspect > 2.3 != e > 2.3 && ModelManager_1.ModelManager.PlotModel.LastPlotAspect !== PlotModel_1.INVALID_NUM && ModelManager_1.ModelManager.PlotModel.LastPlotColor === PlotModel_1.COLOR_WHITE) {
        ModelManager_1.ModelManager.PlotModel.BlackScreenLastAspect = ModelManager_1.ModelManager.PlotModel.BlackScreenNowAspect;
        ModelManager_1.ModelManager.PlotModel.BlackScreenNowAspect = e > 2.3 ? e : t;
        i = CommonParamById_1.configCommonParamById.GetIntConfig("BlackScreenFadeLerpFullTime") ?? 3;
        this.Iii = i * 1000;
        this.$Cl = i * 1000;
        this.g0t?.SetUIActive(true);
        return true;
      }
      ModelManager_1.ModelManager.PlotModel.BlackScreenNowAspect = e > 2.3 ? e : t;
      this.ZCl(ModelManager_1.ModelManager.PlotModel.BlackScreenNowAspect);
    }
    return false;
  }
  ZCl(e) {
    e = UiLayer_1.UiLayer.UiRootItem.GetWidth() / e;
    this.g0t?.SetHeight(e);
    this.g0t?.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth());
  }
  y0t() {
    var e = this.T0t();
    this.XCl?.SetAlpha(e);
    this.g0t?.SetAlpha(e);
  }
  T0t() {
    if (this.a1e) {
      if (Global_1.Global.CharacterCameraManager.FadeAmount >= MAX_FADE_VALUE || this.c0t === 0) {
        return 1;
      } else {
        return 1 - MathUtils_1.MathUtils.GetRangePct(0, this.c0t, this.u0t);
      }
    } else if (this.c0t === 0) {
      return 0;
    } else {
      return MathUtils_1.MathUtils.GetRangePct(0, this.c0t, this.u0t);
    }
  }
  SetFadeTime(e) {
    this.u0t = e;
    this.c0t = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BlackScreen", 45, "现在的Fade时间为：", ["this.FadeTime", this.u0t], ["this.FullFadeTime", this.c0t]);
    }
  }
  SetIsFadeIn(e) {
    this.a1e = e;
  }
}
exports.BlackScreenFadeView = BlackScreenFadeView;
//# sourceMappingURL=BlackScreenFadeView.js.map