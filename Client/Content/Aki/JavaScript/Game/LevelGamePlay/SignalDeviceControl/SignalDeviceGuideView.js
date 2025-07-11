"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDeviceGuideView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GuideTutorialPagePanel_1 = require("../../Module/Guide/Views/GuideTutorialPagePanel");
const TutorialPageItem_1 = require("../../Module/Tutorial/SubView/TutorialPageItem");
const GenericLayoutNew_1 = require("../../Module/Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const TWEEN_TIME = 0.3;
const GUIDE_ID = 34033;
class SignalDeviceGuideView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.IsPopView = true;
    this.ZAe = undefined;
    this.ePe = 0;
    this.tPe = undefined;
    this.iPe = undefined;
    this.oPe = undefined;
    this.rPe = undefined;
    this.nPe = () => {
      var i;
      var t;
      var s;
      if (!this.rPe && this.ePe > 0) {
        t = (i = this.iPe.GetRootItem()).RelativeLocation;
        (s = this.GetItem(12)).SetUIRelativeLocation(new UE.Vector(-s.Width, s.RelativeLocation.Y, s.RelativeLocation.Z));
        this.sPe();
        this.oPe.GetRootItem().SetUIRelativeLocation(new UE.Vector(i.Width, t.Y, t.Z));
        this.Og(this.ePe - 1);
        this.rPe = UE.LTweenBPLibrary.LocalPositionXTo(s, 0, TWEEN_TIME, 0, 6);
        this.rPe.OnCompleteCallBack.Bind(() => {
          this.rPe = undefined;
        });
      }
    };
    this.aPe = () => {
      var i;
      var t;
      var s;
      if (!this.rPe && this.ePe < this.ZAe.length - 1) {
        t = (i = this.iPe.GetRootItem()).RelativeLocation;
        (s = this.GetItem(12)).SetUIRelativeLocation(new UE.Vector(s.Width, s.RelativeLocation.Y, s.RelativeLocation.Z));
        this.sPe();
        this.oPe.GetRootItem().SetUIRelativeLocation(new UE.Vector(-i.Width, t.Y, t.Z));
        this.Og(this.ePe + 1);
        this.rPe = UE.LTweenBPLibrary.LocalPositionXTo(s, 0, TWEEN_TIME, 0, 6);
        this.rPe.OnCompleteCallBack.Bind(() => {
          this.rPe = undefined;
        });
      }
    };
    this.hPe = (i, t, s) => {
      var e = undefined;
      (e = new TutorialPageItem_1.TutorialPageItem(t)).Init();
      e.UpdateShow(false);
      return {
        Key: s,
        Value: e
      };
    };
    this.lPe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [14, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[2, this.lPe], [7, this.nPe], [8, this.aPe]];
  }
  OnBeforeDestroy() {
    if (this.tPe) {
      this.tPe.ClearChildren();
      this.tPe = undefined;
    }
    this.iPe.Destroy();
    this.iPe = undefined;
    if (this.oPe) {
      this.oPe.Destroy();
      this.oPe = undefined;
    }
    if (this.rPe) {
      this.rPe.Kill();
      this.rPe = undefined;
    }
  }
  _Pe() {
    this.UiViewSequence.PlaySequence("StartAtOnce");
  }
  sPe() {
    var i;
    if (!this.oPe) {
      i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), this.GetItem(12));
      this.oPe = new GuideTutorialPagePanel_1.GuideTutorialPagePanel();
      this.oPe.Init(i);
    }
    this.iPe.PlayAnime(true);
    this.oPe.PlayAnime(false);
  }
  async OnBeforeStartAsync() {
    this.iPe = new GuideTutorialPagePanel_1.GuideTutorialPagePanel();
    await this.iPe.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    this.tPe = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(5), this.hPe, this.GetItem(6));
    this.ZAe = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPageIds(GUIDE_ID);
    if (this.ZAe.length <= 1) {
      this.GetButton(7).RootUIComp.SetUIActive(false);
      this.GetButton(8).RootUIComp.SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
    } else {
      this.GetButton(7).RootUIComp.SetUIActive(true);
      this.GetButton(8).RootUIComp.SetUIActive(true);
      this.GetItem(4).SetUIActive(true);
      this.tPe.RebuildLayoutByDataNew(this.ZAe);
    }
    this.GetText(14).SetUIActive(false);
    this.Og(0);
  }
  OnBeforeShow() {
    this._Pe();
  }
  Og(i) {
    if (this.ZAe.length > 1 && (this.tPe.GetLayoutItemByIndex(this.ePe).UpdateShow(false), this.tPe.GetLayoutItemByIndex(i).UpdateShow(true), this.GetButton(7).SetSelfInteractive(i > 0), this.GetButton(8).SetSelfInteractive(i < this.ZAe.length - 1), this.oPe)) {
      t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(this.ZAe[this.ePe]);
      this.oPe.RefreshPage(t);
    }
    this.ePe = i;
    var t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(this.ZAe[this.ePe]);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title);
    this.iPe.RefreshPage(t);
  }
}
exports.SignalDeviceGuideView = SignalDeviceGuideView;
//# sourceMappingURL=SignalDeviceGuideView.js.map