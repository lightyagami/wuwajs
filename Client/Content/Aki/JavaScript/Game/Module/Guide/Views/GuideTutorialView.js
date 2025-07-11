"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideTutorialView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const TutorialPageItem_1 = require("../../Tutorial/SubView/TutorialPageItem");
const TutorialController_1 = require("../../Tutorial/TutorialController");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GuideTutorialPagePanel_1 = require("./GuideTutorialPagePanel");
const TWEEN_TIME = 0.3;
class GuideTutorialView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TutorialInfo = undefined;
    this.IsPopView = true;
    this.ZAe = undefined;
    this.ePe = 0;
    this.tPe = undefined;
    this.SPe = undefined;
    this.iPe = undefined;
    this.oPe = undefined;
    this.rPe = undefined;
    this.nPe = () => {
      var i;
      var t;
      var e;
      if (!this.rPe && this.ePe > 0) {
        t = (i = this.iPe.GetRootItem()).RelativeLocation;
        (e = this.GetItem(12)).SetUIRelativeLocation(new UE.Vector(-e.Width, e.RelativeLocation.Y, e.RelativeLocation.Z));
        this.sPe();
        this.oPe.GetRootItem().SetUIRelativeLocation(new UE.Vector(i.Width, t.Y, t.Z));
        this.Og(this.ePe - 1);
        this.rPe = UE.LTweenBPLibrary.LocalPositionXTo(e, 0, TWEEN_TIME, 0, 6);
        this.rPe.OnCompleteCallBack.Bind(() => {
          this.rPe = undefined;
        });
      }
    };
    this.aPe = () => {
      var i;
      var t;
      var e;
      if (!this.rPe && this.ePe < this.ZAe.length - 1) {
        t = (i = this.iPe.GetRootItem()).RelativeLocation;
        (e = this.GetItem(12)).SetUIRelativeLocation(new UE.Vector(e.Width, e.RelativeLocation.Y, e.RelativeLocation.Z));
        this.sPe();
        this.oPe.GetRootItem().SetUIRelativeLocation(new UE.Vector(-i.Width, t.Y, t.Z));
        this.Og(this.ePe + 1);
        this.rPe = UE.LTweenBPLibrary.LocalPositionXTo(e, 0, TWEEN_TIME, 0, 6);
        this.rPe.OnCompleteCallBack.Bind(() => {
          this.rPe = undefined;
        });
      }
    };
    this.hPe = (i, t, e) => {
      var s = undefined;
      (s = new TutorialPageItem_1.TutorialPageItem(t)).Init();
      s.UpdateShow(false);
      return {
        Key: e,
        Value: s
      };
    };
    this.K3t = i => {
      if (i === "Start") {
        this.SPe.PlayLevelSequenceByName("Close");
      } else if (i === "Close") {
        this._Pe();
      }
    };
    this.lPe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIButtonComponent], [14, UE.UIItem]];
    this.BtnBindInfo = [[2, this.lPe], [13, this.lPe], [7, this.nPe], [8, this.aPe]];
  }
  OnBeforeHide() {
    this.TutorialInfo?.OwnerStep?.OwnerGroup?.FinishPromise?.SetResult();
  }
  OnBeforeDestroy() {
    this.tPe?.ClearChildren();
    this.tPe = undefined;
    this.SPe?.Clear();
    this.SPe = undefined;
    if (this.TutorialInfo) {
      ModelManager_1.ModelManager.GuideModel?.ClipTipState();
      ModelManager_1.ModelManager.GuideModel?.RemoveCurrentTutorialInfo();
      ModelManager_1.ModelManager.GuideModel?.TryShowTutorial();
    }
    TutorialController_1.TutorialController.TryOpenAwardUiViewPending();
    this.iPe?.Destroy();
    this.iPe = undefined;
    this.oPe?.Destroy();
    this.oPe = undefined;
    this.rPe?.Kill();
    this.rPe = undefined;
  }
  LZt() {
    this.SPe.PlayLevelSequenceByName("Start", true);
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(9).SetUIActive(true);
  }
  _Pe() {
    this.UiViewSequence.PlaySequence("StartAtOnce", true);
    this.GetItem(10).SetUIActive(true);
    this.GetItem(11).SetUIActive(true);
    this.GetItem(9).SetUIActive(false);
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
    this.TutorialInfo = this.OpenParam;
    this.tPe = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(5), this.hPe, this.GetItem(6));
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(9));
    this.SPe.BindSequenceCloseEvent(this.K3t);
    this.ZAe = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPageIds(this.TutorialInfo.GuideId);
    this.DZt();
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
    var i = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(this.TutorialInfo.GuideId).RequireReadAll;
    this.GetButton(2).RootUIComp.SetUIActive(!i);
    this.GetButton(13).RootUIComp.SetUIActive(!i);
    this.GetItem(14).SetUIActive(i);
    this.Og(0);
  }
  OnBeforeShow() {
    if (this.TutorialInfo.TutorialTip) {
      this._Pe();
    } else {
      this.LZt();
    }
  }
  Og(i) {
    if (this.ZAe.length > 1 && (this.tPe.GetLayoutItemByIndex(this.ePe).UpdateShow(false), this.tPe.GetLayoutItemByIndex(i).UpdateShow(true), this.GetButton(7).SetSelfInteractive(i > 0), this.GetButton(8).SetSelfInteractive(i < this.ZAe.length - 1), this.oPe)) {
      t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(this.ZAe[this.ePe]);
      this.oPe.RefreshPage(t);
    }
    this.ePe = i;
    if (this.ePe === this.ZAe.length - 1) {
      this.GetButton(2).RootUIComp.SetUIActive(true);
      this.GetButton(13).RootUIComp.SetUIActive(true);
    }
    var t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(this.ZAe[this.ePe]);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title);
    this.iPe.RefreshPage(t);
  }
  DZt() {
    var i = ModelManager_1.ModelManager.TutorialModel.GetSavedDataById(this.TutorialInfo.GuideId);
    if (i?.HasRedDot) {
      TutorialController_1.TutorialController.RemoveRedDotTutorialId(i.TutorialId);
    }
  }
}
exports.GuideTutorialView = GuideTutorialView;
//# sourceMappingURL=GuideTutorialView.js.map