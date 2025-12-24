"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPermanentTaskView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryPermanentTaskItem_1 = require("./HonamiStoryPermanentTaskItem");
const HonamiStoryProfitPanel_1 = require("./Items/HonamiStoryProfitPanel");
const LguiUtil_1 = require("../../Util/LguiUtil");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
class HonamiStoryPermanentTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.lqe = undefined;
    this.T8e = undefined;
    this.Vwm = undefined;
    this.VOe = () => {
      var e = new HonamiStoryPermanentTaskItem_1.HonamiStoryPermanentTaskItem();
      e.OnClickToGet = this.qim;
      return e;
    };
    this.qim = e => {
      var i = this.CNe.GetPermanentTaskIdsByState(0);
      HonamiStoryController_1.HonamiStoryController.SendHonamiStoryPermanentTaskRewardRequest(i, () => {
        this.Oim();
      });
    };
    this.pcr = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_MAIN);
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.CNe = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.VOe, this.GetItem(2).GetOwner());
    this.Vwm = new HonamiStoryProfitPanel_1.HonamiStoryProfitPanel();
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Vwm.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.Gim()]);
    this.lqe.SetHelpCallBack(this.pcr);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.Vwm.RefreshNormal(false);
    var e = this.CNe.IsUnLock();
    this.GetItem(3).SetUIActive(e);
    var i = this.GetText(4);
    var t = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, "HonamiStory_ProfilePictureName");
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "HonamiStory_RewardPrompt");
    t.SetUIActive(e);
    this.GetScrollViewWithScrollbar(1).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
  }
  Oim() {
    new UiAsyncTask_1.UiAsyncTask("RefreshProgress", async () => {
      await this.Gim();
    }).Run();
  }
  async Gim() {
    var e = this.CNe.GetPermanentTaskDataList();
    await this.T8e.RefreshByDataAsync(e, true);
  }
}
exports.HonamiStoryPermanentTaskView = HonamiStoryPermanentTaskView;
//# sourceMappingURL=HonamiStoryPermanentTaskView.js.map