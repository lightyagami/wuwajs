"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingHandbookView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const CommonRewardPopup_1 = require("../../../../../Common/CommonRewardPopup");
const LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView");
const ActivityMoonChasingController_1 = require("../../Activity/ActivityMoonChasingController");
const HandbookDisplayGrid_1 = require("./HandbookDisplayGrid");
const HandbookRewardPanel_1 = require("./HandbookRewardPanel");
class MoonChasingHandbookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.u7s = undefined;
    this.KTt = undefined;
    this.S2t = undefined;
    this.c7s = () => new HandbookDisplayGrid_1.HandbookDisplayGrid();
    this.m7s = e => {
      this.S2t.Refresh(e);
    };
    this.OnTrackMoonHandbookUpdate = () => {
      this.S2t.SetActive(false);
      this.KTt.RefreshLayout();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.u7s = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.c7s);
    var e = this.GetItem(4);
    this.KTt = new HandbookRewardPanel_1.HandbookRewardPanel();
    await this.KTt.CreateThenShowByActorAsync(e.GetOwner());
    this.S2t = new CommonRewardPopup_1.CommonRewardPopup(this.RootItem);
  }
  OnBeforeShow() {
    this.v4e();
    this.d7s();
    this.KTt.RefreshLayout();
    ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMoonHandbookUpdate, this.OnTrackMoonHandbookUpdate);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMoonHandbookUpdate, this.OnTrackMoonHandbookUpdate);
  }
  d7s() {
    var e = ModelManager_1.ModelManager.MoonChasingModel.GetHandbookUnlockCount();
    this.GetText(3).SetText(e.toString());
  }
  v4e() {
    var e = ModelManager_1.ModelManager.MoonChasingModel.GetHandbookGridList();
    this.u7s.RefreshByData(e, false, undefined, true);
  }
}
exports.MoonChasingHandbookView = MoonChasingHandbookView;
//# sourceMappingURL=MoonChasingHandbookView.js.map