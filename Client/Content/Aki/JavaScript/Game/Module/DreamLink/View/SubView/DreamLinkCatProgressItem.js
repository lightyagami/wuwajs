"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkCatProgressItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const DreamLinkController_1 = require("../../DreamLinkController");
class DreamLinkCatProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.kcl = undefined;
    this.cLl = undefined;
    this.Delegate = undefined;
    this.EffectDelegate = undefined;
    this.MaxValue = 0;
    this.YFo = t => {
      this.GetSprite(0).SetFillAmount(t / this.MaxValue);
      this.GetSprite(1).SetFillAmount(1 - t / this.MaxValue);
      this.GetText(2).SetText(Math.floor(t).toString());
      this.GetText(3).SetText(Math.floor(this.MaxValue - t).toString());
    };
    this.mLl = t => {
      this.GetSprite(5).SetFillAmount(t / this.MaxValue);
      this.GetSprite(4).SetFillAmount(t / this.MaxValue);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIItem]];
  }
  OnBeforeShow() {
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.YFo);
    this.EffectDelegate = (0, puerts_1.toManualReleaseDelegate)(this.mLl);
    this.RefreshView();
  }
  OnBeforeDestroy() {
    if (this.kcl?.IsValid()) {
      this.kcl.Kill();
      this.kcl = undefined;
    }
    if (this.cLl?.IsValid()) {
      this.cLl.Kill();
      this.cLl = undefined;
    }
    if (this.Delegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
      this.Delegate = undefined;
    }
    if (this.EffectDelegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.mLl);
      this.EffectDelegate = undefined;
    }
  }
  RefreshView() {
    var t;
    var i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (i && (t = i.GetActivityConfig())) {
      this.MaxValue = t.DungeonMaxProgress;
      t = i.DungeonProgressRecord;
      this.GetSprite(0).SetFillAmount(t / this.MaxValue);
      this.GetText(2).SetText(t.toString());
      this.GetText(3).SetText((this.MaxValue - t).toString());
      this.GetSprite(1).SetFillAmount(1 - t / this.MaxValue);
    }
  }
  PlayAddProgressAnim() {
    var t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (t) {
      var i = t.DungeonProgressRecord;
      var t = t.GetCurrentCatProgress();
      if (i !== t) {
        var s = i / this.MaxValue * 360;
        var s = Rotator_1.Rotator.Create(0, -s, 0);
        var e = this.GetSprite(4).GetOwner();
        var h = this.GetSprite(5).GetOwner();
        e.GetUIItem().SetUIRelativeRotation(s.ToUeRotator());
        h.GetUIItem().SetUIRelativeRotation(s.ToUeRotator());
        this.GetSprite(5).SetAlpha(1);
        this.GetSprite(4).SetAlpha(1);
        var r = this.GetItem(6).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
        for (let t = 0; t < r.Num(); t++) {
          r.Get(t).Play();
        }
        DreamLinkController_1.DreamLinkController.RoguelikeSetDungeonProgressRequest(t);
        this.kcl = UE.LTweenBPLibrary.FloatTo(this.RootActor, this.Delegate, i, t, 1, 0, 0);
        this.cLl = UE.LTweenBPLibrary.FloatTo(this.RootActor, this.EffectDelegate, 0, t - i, 1, 0, 0);
      }
    }
  }
}
exports.DreamLinkCatProgressItem = DreamLinkCatProgressItem;
//# sourceMappingURL=DreamLinkCatProgressItem.js.map