"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaGuideSubView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../../Activity/View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../Activity/View/SubView/ActivitySubViewGeneralInfo");
const PhantomArenaGuideController_1 = require("../../PhantomArenaGuideController");
class PhantomArenaGuideSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.Q6a = undefined;
    this.wYm = e => {
      if (this.ActivityBaseData.Id === e) {
        this.A3d();
      }
    };
    this.p5t = e => {
      var i = this.ActivityBaseData.GetQuestId();
      if (ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(i)) {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaMapEntrance();
      } else {
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.YDo = () => {
      PhantomArenaGuideController_1.PhantomArenaGuideController.RequestReward(this.ActivityBaseData.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.SpineSkeletonAnimationComponent], [2, UE.UIHorizontalLayout], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.YDo]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wYm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wYm);
  }
  async OnBeforeStartAsync() {
    this.Q6a = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.Q6a.SetData(this.ActivityBaseData);
    this.Q6a.SetClickFunc(this.p5t);
    await Promise.all([this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 ? "IdleF" : "IdleM";
    this.GetSpine(1).SetAnimation(0, e, true);
    var e = this.ActivityBaseData.GetExDataRedPointShowState();
    this.Q6a?.SetFunctionRedDotVisible(e);
  }
  OnRefreshView() {
    var e = this.ActivityBaseData.GetQuestId();
    var e = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
    this.Q6a.SetBtnText(e ? "Activity_107200001_Challenge" : "Activity_107200001_Mission");
    this.Q6a.RefreshFunction();
    this.A3d();
  }
  A3d() {
    var e = this.ActivityBaseData.IsUnLock();
    var i = this.ActivityBaseData.GetTargetNum();
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetFinishedChallengeCount(this.ActivityBaseData.GetPhantomArenaActivityId());
    var r = i <= t && !this.ActivityBaseData.GetIsReceiveReward();
    this.GetSprite(3)?.SetUIActive(!e);
    this.GetText(4)?.SetUIActive(e && !r);
    this.GetButton(5)?.RootUIComp?.SetUIActive(e && r);
    this.GetText(4).SetText(t + "/" + i);
  }
}
exports.PhantomArenaGuideSubView = PhantomArenaGuideSubView;
//# sourceMappingURL=PhantomArenaGuideSubView.js.map