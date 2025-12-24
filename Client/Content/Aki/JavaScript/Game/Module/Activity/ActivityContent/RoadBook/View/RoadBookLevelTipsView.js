"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadBookLevelTipsView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiFloatTween_1 = require("../../../../Util/Lgui/LguiFloatTween");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class RoadBookLevelTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PAt = 0;
    this.UQa = 0;
    this.zVl = 0;
    this.JVl = 0;
    this.ZVl = 0;
    this.e4l = 0;
    this.t4l = 0;
    this.i4l = 0;
    this.r4l = 0;
    this.GLl = undefined;
    this.P9m = 0;
    this.A9m = undefined;
    this.D9m = 0;
    this.$An = t => {
      if (t === "TipsChange") {
        this.o4l();
      }
    };
    this.U9m = t => {
      this.GLl.GetRootUiItem()?.SetAnchorOffsetX(t);
    };
    this.x9m = () => {
      this.GLl.GetLayoutItemByIndex(this.zVl)?.PlayLevelUpAnim();
    };
    this.oWi = () => new LevelItemGrid();
    this.TickHandle = undefined;
    this.BarAnimTime = CommonParamById_1.configCommonParamById.GetIntConfig("TravelExpBarDisplayTime");
    this.RunBarAnim = false;
    this.RunBarAnimTime = 0;
    this.StartValue = 0;
    this.TargetValue = 0;
    this.EndValue = 0;
    this.BarAnimPromise = new CustomPromise_1.CustomPromise();
    this.Refresh = t => {
      if (this.RunBarAnim && (this.RunBarAnimTime += t, t = MathUtils_1.MathUtils.Lerp(this.StartValue, this.TargetValue, this.RunBarAnimTime / this.BarAnimTime), this.n4l(t, this.EndValue), this.RunBarAnimTime >= this.BarAnimTime)) {
        this.s4l();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite]];
  }
  OnStart() {
    this.A9m = new LguiFloatTween_1.LguiFloatTween();
    this.A9m.BindUpdateTween(this.U9m);
    this.A9m.BindCompleteTween(this.x9m);
    var t = this.OpenParam;
    this.UQa = t.LastTravelLevel;
    this.zVl = t.TravelLevel;
    this.JVl = t.LastExpCount;
    this.ZVl = t.GetExpItemCount();
    this.t4l = t.LastCurrentExpCount;
    var i = t.TravelLevelData.get(this.UQa);
    this.e4l = i.TargetExp;
    this.i4l = t.GetCurrentExp();
    this.r4l = t.GetCurrentTargetExp();
    var i = this.zVl > this.UQa;
    var s = this.ZVl > this.JVl;
    if (i) {
      this.PAt = s ? 2 : 1;
    } else if (s) {
      this.PAt = 0;
    } else {
      this.CloseMe();
    }
    this.GLl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.oWi);
    this.P9m = this.GetItem(3).Width;
    this.D9m = this.GetHorizontalLayout(2).Spacing;
    this.v4e(t.MaxTravelLevel);
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
    switch (this.PAt) {
      case 2:
        this.a4l(this.ZVl - this.JVl);
        this.h4l(true);
        this.n4l(this.t4l, this.e4l);
        break;
      case 0:
        this.a4l(this.i4l - this.t4l);
        this.h4l(true);
        this.n4l(this.t4l, this.r4l);
        break;
      case 1:
        this.h4l(false);
        this.n4l(this.t4l, this.e4l);
    }
  }
  OnAfterShow() {
    switch (this.PAt) {
      case 2:
        this.l4l();
        break;
      case 0:
        this._4l();
        break;
      case 1:
        this.l4l();
    }
  }
  OnBeforeDestroy() {
    this.S0t();
    this.A9m?.Destroy();
  }
  v4e(i) {
    var s = [];
    for (let t = 0; t <= i; t++) {
      s.push(t);
    }
    this.GLl.RefreshByData(s, () => {
      this.GLl.SelectGridProxy(this.UQa);
    });
    this.GLl.GetRootUiItem()?.SetAnchorOffsetX(this.B9m(this.UQa));
  }
  B9m(t) {
    return -(t * (this.P9m + this.D9m) + this.P9m * 0.5);
  }
  async _4l() {
    var t = this.i4l >= this.r4l;
    await this.c4l(this.t4l, this.i4l, this.r4l);
    if (t) {
      await this.UiViewSequence.PlaySequenceAsync("Full", new CustomPromise_1.CustomPromise());
    }
    this.CloseMe();
  }
  async l4l() {
    await this.c4l(this.t4l, this.e4l, this.e4l);
    this.UiViewSequence.PlaySequence("LevelChange");
    this.A9m?.PlayTween(this.GLl.GetRootUiItem().GetAnchorOffsetX(), this.B9m(this.zVl), 1);
    this.GLl.GetLayoutItemByIndex(this.UQa)?.PlaySmallAnim();
    this.GLl.GetLayoutItemByIndex(this.zVl)?.PlayBigAnim();
    this.n4l(0, this.r4l);
    await this.c4l(0, this.i4l, this.r4l);
    if (this.i4l >= this.r4l) {
      await this.UiViewSequence.PlaySequenceAsync("Full", new CustomPromise_1.CustomPromise());
    }
    await TimerSystem_1.TimerSystem.Wait(500);
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
    t = MathUtils_1.MathUtils.Clamp(i / s, 0, 1);
    this.GetSprite(4).SetFillAmount(t);
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
    this.GetSprite(5).SetFillAmount(t);
  }
  h4l(t) {
    this.GetText(1).SetUIActive(t);
  }
  a4l(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RoadBookLevelUpTipsExp_Text", t);
  }
  o4l() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RoadBookLevelCanUp_Text");
    this.h4l(true);
  }
}
exports.RoadBookLevelTipsView = RoadBookLevelTipsView;
class LevelItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIArtText], [2, UE.UIItem], [3, UE.UIArtText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(t, i, s) {
    this.GetArtText(1)?.SetText(t.toString());
    this.GetArtText(3)?.SetText(t.toString());
    this.SetIsCurrentLevelItem(i);
  }
  SetIsCurrentLevelItem(t) {
    this.GetItem(0)?.SetUIActive(t);
    this.GetItem(2)?.SetUIActive(!t);
  }
  OnSelected(t) {
    this.SetIsCurrentLevelItem(true);
  }
  PlayLevelUpAnim() {
    this.SPe?.PlayLevelSequenceByName("LevelUp");
  }
  PlayBigAnim() {
    this.GetItem(0)?.SetUIActive(true);
    this.GetItem(2)?.SetUIActive(true);
    this.SPe?.PlayLevelSequenceByName("TtoA");
  }
  PlaySmallAnim() {
    this.GetItem(0)?.SetUIActive(true);
    this.GetItem(2)?.SetUIActive(true);
    this.SPe?.PlayLevelSequenceByName("AtoT");
  }
}
//# sourceMappingURL=RoadBookLevelTipsView.js.map