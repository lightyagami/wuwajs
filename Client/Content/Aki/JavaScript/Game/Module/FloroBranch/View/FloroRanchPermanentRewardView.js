"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchPermanentRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchTaskItem_1 = require("./Item/FloroRanchTaskItem");
class FloroRanchPermanentRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.qoh = undefined;
    this.zja = e => {
      var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
      if (t.Id === e) {
        e = t.GetPermanentTaskData();
        this.qoh.RefreshByData(e, undefined, true);
      }
    };
    this.VOe = () => {
      var e = new FloroRanchTaskItem_1.FloroRanchTaskItem();
      e.OnGetBtnClick = this.W9u;
      return e;
    };
    this.W9u = () => {
      var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchReceivableTaskIds(false);
      FloroRanchController_1.FloroRanchController.RequestTaskReward(e);
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    t.SetTitle(e.GetTitle());
    t.SetHelpBtnActive(false);
    t.SetCloseCallBack(this.AMo);
    this.qoh = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.VOe);
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetPermanentTaskData();
    await this.qoh.RefreshByDataAsync(e, true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zja);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zja);
  }
}
exports.FloroRanchPermanentRewardView = FloroRanchPermanentRewardView;
//# sourceMappingURL=FloroRanchPermanentRewardView.js.map