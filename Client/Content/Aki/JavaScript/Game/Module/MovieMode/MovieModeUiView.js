"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieModeUiView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const PhotographController_1 = require("../Photograph/PhotographController");
class MovieModeUiView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.a7m = undefined;
    this.h7m = undefined;
    this.l7m = undefined;
    this.LDe = -1;
    this.K1f = 0;
    this.X1f = false;
    this.m7m = true;
    this.TDe = undefined;
    this.UFf = false;
    this.aRo = () => {
      ControllerHolder_1.ControllerHolder.MovieModeController.ResetMovieModeHideUi(false);
    };
    this.Wgf = e => {
      this.Qgf(e);
    };
    this.DSi = () => {
      var e = {
        BlendTime: CommonParamById_1.configCommonParamById.GetIntConfig("ExitMovieModeTimeThreshold") ?? 1
      };
      ControllerHolder_1.ControllerHolder.MovieModeController.ExitMovieMode(e);
    };
    this.NI1 = () => {
      PhotographController_1.PhotographController.ScreenShot({
        ScreenShot: true,
        PrepareFullScreenShot: false,
        IsHiddenBattleView: true,
        HandBookPhotoData: undefined,
        GachaData: undefined,
        FragmentMemory: undefined,
        RoleSkinData: undefined
      });
    };
    this.OnTick = e => {
      this.Y1f(e);
    };
    this.rAt = (e, t) => {
      if (e) {
        this.t91();
        this.UFf = true;
        ControllerHolder_1.ControllerHolder.MovieModeController.ResetMovieModeHideUi(false);
      } else if (this.UFf) {
        this.ActivateTimer();
        this.UFf = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UISprite], [4, UE.UIItem]];
  }
  OnStart() {
    this.Ore();
    this.z1f();
    this.w7m();
    this.A7m();
    this.J1f();
    this.Z1f();
    this.v0t();
  }
  z1f() {
    var e = this.OpenParam;
    this.K1f = e.DelayDuration ?? 0;
    this.K1f *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.X1f = this.K1f === 0;
  }
  w7m() {
    this.l7m = this.GetButton(0);
    this.l7m?.OnClickCallBack.Bind(this.aRo);
  }
  Qgf(e) {
    if (this.m7m !== e) {
      this.m7m = e;
      this.M7m();
    }
  }
  A7m() {
    this.a7m = this.GetButton(1);
    this.a7m?.OnClickCallBack.Bind(this.DSi);
  }
  J1f() {
    this.GetItem(4).GetAnchorOffset();
    this.x7m();
  }
  x7m() {
    this.h7m = this.GetButton(2);
    this.h7m?.OnClickCallBack.Bind(this.NI1);
  }
  Y1f(e) {
    if (!this.X1f) {
      this.K1f -= e;
      if (this.K1f <= 0) {
        this.X1f = true;
        ControllerHolder_1.ControllerHolder.MovieModeController.ResetMovieModeHideUi(false);
      }
    }
  }
  v0t() {
    this.LDe = ControllerHolder_1.ControllerHolder.MovieModeController.AddTick(this.OnTick);
  }
  S0t() {
    ControllerHolder_1.ControllerHolder.MovieModeController.RemoveTick(this.LDe);
    this.LDe = -1;
  }
  Z1f() {
    var e;
    var t;
    var i = ControllerHolder_1.ControllerHolder.MovieModeController.GetAspectOffset();
    if (i) {
      e = this.GetButton(1).RootUIComp.GetAnchorOffset();
      t = this.GetItem(4).GetAnchorOffset();
      if (i.IsWidthBlend) {
        this.GetButton(1)?.RootUIComp.SetAnchorOffsetX(e.X - i.Offset);
        this.GetItem(4)?.SetAnchorOffsetX(t.X - i.Offset);
      } else {
        this.GetButton(1)?.RootUIComp.SetAnchorOffsetY(e.Y - i.Offset);
        this.GetItem(4)?.SetAnchorOffsetY(t.Y + i.Offset);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MovieMode", 87, "MovieModeUiView:MovieModeController.GetAspectOffset is undefined");
    }
  }
  M7m() {
    this.G7m();
    this.F7m();
    this.u0f();
  }
  G7m() {
    var e = this.OpenParam.IsEnableEsc ?? false;
    this.a7m?.RootUIComp?.SetUIActive(!this.m7m && e && this.X1f);
  }
  F7m() {
    var e = this.OpenParam.IsEnablePhoto ?? false;
    this.h7m?.RootUIComp?.SetUIActive(!this.m7m && e && this.X1f);
  }
  u0f() {
    this.l7m?.RootUIComp.SetUIActive(this.m7m);
  }
  xFf() {
    this.TDe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      ControllerHolder_1.ControllerHolder.MovieModeController.ResetMovieModeHideUi(true);
      this.t91();
    }, ModelManager_1.ModelManager.MovieModeModel.MovieModeHideUiTimeThreshold);
  }
  t91() {
    if (this.TDe && TimerSystem_1.GameplayTimerSystem.Has(this.TDe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeHideUiChange, this.Wgf);
  }
  ActivateTimer() {
    this.t91();
    this.xFf();
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeHideUiChange, this.Wgf);
  }
  OnBeforeDestroy() {
    this.S0t();
    this.kre();
    this.t91();
  }
}
exports.MovieModeUiView = MovieModeUiView;
//# sourceMappingURL=MovieModeUiView.js.map