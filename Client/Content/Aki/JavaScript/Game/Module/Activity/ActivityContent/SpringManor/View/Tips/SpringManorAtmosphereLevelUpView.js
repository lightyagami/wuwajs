"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorAtmosphereLevelUpView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const SpringManorDefine_1 = require("../../SpringManorDefine");
const BAR_ANIM_TIME = 750;
class SpringManorAtmosphereLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PAt = 0;
    this.UQa = 0;
    this.YVg = 0;
    this.zVl = 0;
    this.JVg = 0;
    this.zVg = 0;
    this.ZVg = 0;
    this.e8g = 0;
    this.t8g = 0;
    this.i8g = 0;
    this.nJa = (t, i) => {
      if (i === "Max") {
        this.GetText(2)?.ShowTextNew(SpringManorDefine_1.TEXT_ID_ATMOSPHERER_MAX);
      } else if (i === "LevelChange") {
        this.GetText(0)?.SetText(this.zVl.toString());
      }
    };
    this.$An = t => {
      if (t === "TipsChange") {
        this.o4l();
      }
    };
    this.TickHandle = undefined;
    this.RunBarAnim = false;
    this.RunBarAnimTime = 0;
    this.StartValue = 0;
    this.TargetValue = 0;
    this.EndValue = 0;
    this.BarAnimPromise = new CustomPromise_1.CustomPromise();
    this.Refresh = t => {
      if (this.RunBarAnim && (this.RunBarAnimTime += t, t = MathUtils_1.MathUtils.Lerp(this.StartValue, this.TargetValue, this.RunBarAnimTime / BAR_ANIM_TIME), this.n4l(t, this.EndValue), this.RunBarAnimTime >= BAR_ANIM_TIME)) {
        this.s4l();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIText]];
  }
  OnStart() {
    var t = this.OpenParam;
    this.UQa = t.OldLevel;
    this.zVl = t.NewLevel;
    this.YVg = t.OldAtmosphere;
    this.JVg = t.NewAtmosphere;
    this.zVg = t.MaxAtmosphere;
    var t = ConfigManager_1.ConfigManager.SpringManorConfig;
    var i = t.GetLevelConfigById(this.UQa);
    this.ZVg = i.AtmosphereNeed;
    this.e8g = i.AtmosphereNext;
    var i = t.GetLevelConfigById(this.zVl);
    this.t8g = i.AtmosphereNeed;
    this.i8g = i.AtmosphereNext;
    var t = this.zVl > this.UQa;
    this.PAt = t ? 1 : 0;
    (this.GetText(0)?.GetOwner()).OnSequencePlayEvent.Bind(this.nJa);
    (this.GetText(2)?.GetOwner()).OnSequencePlayEvent.Bind(this.nJa);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnBeforeShow() {
    this.TickHandle = TimerSystem_1.GameplayTimerSystem.Forever(this.Refresh, TimerSystem_1.MIN_TIME);
    this.n4l(0, 1);
    this.eCo(this.UQa);
    this.a4l(this.JVg, this.zVg);
    switch (this.PAt) {
      case 1:
      case 0:
        this.n4l(this.YVg - this.ZVg, this.e8g);
    }
  }
  OnAfterShow() {
    switch (this.PAt) {
      case 1:
        this.l4l();
        break;
      case 0:
        this._4l();
    }
  }
  OnBeforeDestroy() {
    this.S0t();
  }
  async _4l() {
    var t = this.JVg >= this.zVg;
    await this.c4l(this.YVg - this.t8g, this.JVg - this.t8g, this.i8g);
    if (t) {
      await this.UiViewSequence.PlaySequenceAsync("Full", new CustomPromise_1.CustomPromise());
    }
    this.CloseMe();
  }
  async l4l() {
    await this.c4l(this.YVg - this.ZVg, this.e8g, this.e8g);
    this.UiViewSequence.PlaySequence("LevelUp");
    this.n4l(0, this.i8g);
    await this.c4l(0, this.JVg - this.t8g, this.i8g);
    if (this.JVg >= this.zVg) {
      await this.UiViewSequence.PlaySequenceAsync("Full", new CustomPromise_1.CustomPromise());
    }
    this.CloseMe();
  }
  async c4l(t, i, s) {
    this.StartValue = t;
    this.TargetValue = Math.min(i, s);
    this.EndValue = s;
    this.RunBarAnim = true;
    this.RunBarAnimTime = 0;
    this.BarAnimPromise.SetResult();
    this.BarAnimPromise = new CustomPromise_1.CustomPromise();
    await this.BarAnimPromise.Promise;
  }
  s4l() {
    this.RunBarAnim = false;
    this.BarAnimPromise.SetResult();
  }
  S0t() {
    if (this.TickHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TickHandle);
      this.TickHandle = undefined;
    }
  }
  n4l(t, i) {
    t = MathUtils_1.MathUtils.Clamp(t / i, 0, 1);
    this.GetSprite(1).SetFillAmount(t);
  }
  h4l(t) {
    this.GetText(2).SetUIActive(t);
  }
  a4l(t, i) {
    this.GetText(2)?.SetText(t + "/" + i);
  }
  o4l() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "MapTravelLevelCanUp_Text");
    this.h4l(true);
  }
  eCo(t) {
    this.GetText(0).SetText(t.toString());
  }
}
exports.SpringManorAtmosphereLevelUpView = SpringManorAtmosphereLevelUpView;
//# sourceMappingURL=SpringManorAtmosphereLevelUpView.js.map