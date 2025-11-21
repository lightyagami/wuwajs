"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLimitTaskView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryLimitTaskItem_1 = require("./HonamiStoryLimitTaskItem");
const HonamiStoryLimitTaskProItem_1 = require("./HonamiStoryLimitTaskProItem");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
class HonamiStoryLimitTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.lqe = undefined;
    this.hfl = undefined;
    this.T8e = undefined;
    this.VOe = () => {
      var i = new HonamiStoryLimitTaskItem_1.HonamiStoryLimitTaskItem();
      i.OnClickToGet = this.oem;
      return i;
    };
    this.oem = i => {
      var e = this.CNe.GetFinishedLimitTaskIds();
      HonamiStoryController_1.HonamiStoryController.SendHonamiStoryLimitTaskRewardRequest(e, () => {
        this.nem();
        this.dx_();
      });
    };
    this.mx_ = () => {
      var i = this.CNe.GetFinishedScoreRewardIds();
      HonamiStoryController_1.HonamiStoryController.SendHonamiStoryScoreRewardRequest(i, () => {
        this.dx_();
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.CNe = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.hfl = new HonamiStoryLimitTaskProItem_1.HonamiStoryLimitTaskProItem();
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.VOe, this.GetItem(2).GetOwner());
    var i = [this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.hfl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())];
    await Promise.all(i);
    this.hfl.OnClickToGet = this.mx_;
    var i = [this.sem(), this.aem()];
    await Promise.all(i);
    this.lqe.SetHelpCallBack(this.pcr);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.GetScrollViewWithScrollbar(1).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
  }
  nem() {
    new UiAsyncTask_1.UiAsyncTask("RefreshProgress", async () => {
      await this.sem();
    }).Run();
  }
  async sem() {
    var i = this.CNe.GetLimitTaskDataList();
    await this.T8e.RefreshByDataAsync(i, true);
  }
  dx_() {
    new UiAsyncTask_1.UiAsyncTask("RefreshProgress", async () => {
      await this.aem();
    }).Run();
  }
  async aem() {
    var i = this.CNe.GetScoreRewardDataList();
    var e = this.CNe.GetCurrentScore();
    await this.hfl.RefreshAsync(e, i);
  }
}
exports.HonamiStoryLimitTaskView = HonamiStoryLimitTaskView;
//# sourceMappingURL=HonamiStoryLimitTaskView.js.map