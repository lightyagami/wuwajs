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
    this.n6m = undefined;
    this.s6m = undefined;
    this.a6m = undefined;
    this.LDe = -1;
    this.Phf = 0;
    this.Ahf = false;
    this.c6m = true;
    this.TDe = undefined;
    this.Hxf = false;
    this.aRo = () => {
      ControllerHolder_1.ControllerHolder.MovieModeController.ResetMovieModeHideUi(false);
    };
    this.Rmf = e => {
      this.wmf(e);
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
      this.Dhf(e);
    };
    this.rAt = (e, t) => {
      if (e) {
        this.t91();
        this.Hxf = true;
        ControllerHolder_1.ControllerHolder.MovieModeController.ResetMovieModeHideUi(false);
      } else if (this.Hxf) {
        this.ActivateTimer();
        this.Hxf = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UISprite], [4, UE.UIItem]];
  }
  OnStart() {
    this.Ore();
    this.Uhf();
    this.b6m();
    this.L6m();
    this.xhf();
    this.Bhf();
    this.v0t();
  }
  Uhf() {
    var e = this.OpenParam;
    this.Phf = e.DelayDuration ?? 0;
    this.Phf *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
    this.Ahf = this.Phf === 0;
  }
  b6m() {
    this.a6m = this.GetButton(0);
    this.a6m?.OnClickCallBack.Bind(this.aRo);
  }
  wmf(e) {
    if (this.c6m !== e) {
      this.c6m = e;
      this.y6m();
    }
  }
  L6m() {
    this.n6m = this.GetButton(1);
    this.n6m?.OnClickCallBack.Bind(this.DSi);
  }
  xhf() {
    this.GetItem(4).GetAnchorOffset();
    this.D6m();
  }
  D6m() {
    this.s6m = this.GetButton(2);
    this.s6m?.OnClickCallBack.Bind(this.NI1);
  }
  Dhf(e) {
    if (!this.Ahf) {
      this.Phf -= e;
      if (this.Phf <= 0) {
        this.Ahf = true;
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
  Bhf() {
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
  y6m() {
    this.q6m();
    this.O6m();
    this.Wmf();
  }
  q6m() {
    var e = this.OpenParam.IsEnableEsc ?? false;
    this.n6m?.RootUIComp?.SetUIActive(!this.c6m && e && this.Ahf);
  }
  O6m() {
    var e = this.OpenParam.IsEnablePhoto ?? false;
    this.s6m?.RootUIComp?.SetUIActive(!this.c6m && e && this.Ahf);
  }
  Wmf() {
    this.a6m?.RootUIComp.SetUIActive(this.c6m);
  }
  jxf() {
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeHideUiChange, this.Rmf);
  }
  ActivateTimer() {
    this.t91();
    this.jxf();
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeHideUiChange, this.Rmf);
  }
  OnBeforeDestroy() {
    this.S0t();
    this.kre();
    this.t91();
  }
}
exports.MovieModeUiView = MovieModeUiView;
//# sourceMappingURL=MovieModeUiView.js.map