"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideTutorialTipsView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const TutorialController_1 = require("../../Tutorial/TutorialController");
const TutorialDefine_1 = require("../../Tutorial/TutorialDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
class GuideTutorialTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.TutorialInfo = undefined;
    this.vZt = undefined;
    this.MZt = 0;
    this.EZt = undefined;
    this.SZt = (i, e = 1) => {
      if (e && this.RootItem?.bIsUIActive && !ModelManager_1.ModelManager.LoadingModel.IsLoadingView) {
        this.TutorialInfo.ClickToPopState();
        this.UiViewSequence.PlaySequence("CloseTips", true);
      }
    };
    this.cZt = () => {
      this.TutorialInfo.TipState = 1;
      UiManager_1.UiManager.CloseView(this.Info.Name, () => {
        ModelManager_1.ModelManager.GuideModel.TryShowTutorial();
      });
    };
    this.yZt = () => {
      if (this.TutorialInfo.TipState === 2) {
        this.CloseMe(() => {
          ModelManager_1.ModelManager.GuideModel.TryShowGuideTutorialView(true);
        });
      } else {
        this.IZt();
      }
    };
    this.TZt = () => {
      this.SetActive(UiManager_1.UiManager.IsViewShow("BattleView"));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIButtonComponent], [3, UE.UISprite], [4, UE.UIText]];
    this.BtnBindInfo = [[2, this.SZt]];
  }
  async OnCreateAsync() {
    this.TutorialInfo = this.OpenParam;
    if (this.TutorialInfo.OwnerStep) {
      const t = new CustomPromise_1.CustomPromise();
      this.vZt = this.TutorialInfo.OwnerStep.ViewData.ViewConf;
      this.MZt = this.TutorialInfo.OwnerStep.Config.Duration;
      var i = this.vZt.TutorialType;
      var e = TutorialDefine_1.TutorialUtils.GetTutorialTypeIconPath(i);
      if (e) {
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, i => {
          if (i.IsValid()) {
            this.EZt = i;
          }
          t.SetResult(true);
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, `图文教程引导组${this.TutorialInfo.OwnerStep.Id}的教程分类组id不合法，找不到对应图标`, ["不合法的分类组Id", i]);
      }
      await t.Promise;
    } else {
      this.IZt();
    }
  }
  OnStart() {
    var i;
    var e = this.GetText(0);
    if (this.vZt) {
      i = this.vZt.GroupName;
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i);
      if (this.EZt) {
        this.GetSprite(1).SetSprite(this.EZt);
      }
      e = TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(this.vZt.TutorialType);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
      this.GetSprite(3).SetFillAmount(1);
      this.UiViewSequence.AddSequenceFinishEvent("StartTips", this.cZt);
      this.UiViewSequence.AddSequenceFinishEvent("CloseTips", this.yZt);
      if (!GuideTutorialTipsView.Lua) {
        GuideTutorialTipsView.Lua = true;
        TutorialController_1.TutorialController.OnTutorialTipExistChanged(true);
      }
      GuideTutorialTipsView.Dua?.Remove();
      GuideTutorialTipsView.Dua = undefined;
    } else if (!this.WaitToDestroy) {
      this.IZt();
    }
  }
  OnAfterShow() {
    if (this.TutorialInfo.TipState === 0) {
      this.UiViewSequence.PlaySequence("StartTips");
    } else {
      this.UiViewSequence.PlaySequence("StartAtOnce");
    }
  }
  OnBeforeDestroy() {
    if (this.TutorialInfo.TipState === 0) {
      GuideTutorialTipsView.Dua = TimerSystem_1.GameplayTimerSystem.Delay(GuideTutorialTipsView.Aua, GuideTutorialTipsView.Rua);
    } else {
      GuideTutorialTipsView.Aua();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideHUD, this.TZt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowHUD, this.TZt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HideHUD, this.TZt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowHUD, this.TZt);
  }
  OnTick(i) {
    var e;
    if (this.IsShow && (e = this.TutorialInfo.Duration / this.MZt, this.GetSprite(3)?.SetFillAmount(e), this.TutorialInfo.Duration <= 0) && this.UiViewSequence.CurrentSequenceName !== "CloseTips") {
      this.UiViewSequence.StopPrevSequence(false);
      this.UiViewSequence.PlaySequence("CloseTips", true);
    }
  }
  IZt() {
    UiManager_1.UiManager.CloseView(this.Info.Name, () => {
      TutorialController_1.TutorialController.TryOpenAwardUiViewPending();
      ModelManager_1.ModelManager.GuideModel.TryShowTutorial();
    });
  }
}
(exports.GuideTutorialTipsView = GuideTutorialTipsView).Lua = false;
GuideTutorialTipsView.Rua = 5000;
GuideTutorialTipsView.Dua = undefined;
GuideTutorialTipsView.Aua = () => {
  if (GuideTutorialTipsView.Lua) {
    TutorialController_1.TutorialController.OnTutorialTipExistChanged(false);
    GuideTutorialTipsView.Lua = false;
  }
  GuideTutorialTipsView.Dua?.Remove();
  GuideTutorialTipsView.Dua = undefined;
}; //# sourceMappingURL=GuideTutorialTipsView.js.map