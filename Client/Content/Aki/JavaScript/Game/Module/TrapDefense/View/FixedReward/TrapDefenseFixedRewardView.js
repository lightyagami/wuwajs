"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseFixedRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseRewardItem_1 = require("../Reward/TrapDefenseRewardItem");
class TrapDefenseFixedRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ViewModel = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelFixedReward;
    this.PopupCaption = undefined;
    this.ScrollFixedReward = undefined;
    this.OnBtnHelp = () => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdFixedReward();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    };
    this.OnBtnClose = () => {
      this.CloseMe();
    };
    this.CreateItemReward = () => {
      var e = new TrapDefenseRewardItem_1.TrapDefenseRewardItem();
      e.OnClaimRewardCallback = this.vYc;
      return e;
    };
    this.EventTrapDefenseRewardUpdate = () => {
      this.UpdateData();
    };
    this.vYc = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.RewardData.RequestFixedReward();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this.OnBtnClose);
    this.PopupCaption.SetHelpBtnActive(true);
    this.PopupCaption.SetHelpCallBack(this.OnBtnHelp);
    var e = this.GetScrollViewWithScrollbar(1);
    var t = this.GetItem(2).GetOwner();
    this.ScrollFixedReward = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.CreateItemReward, t);
  }
  OnStart() {
    this.UpdateData();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseRewardUpdate, this.EventTrapDefenseRewardUpdate);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseRewardUpdate, this.EventTrapDefenseRewardUpdate);
  }
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateData() {
    this.ScrollFixedReward.RefreshByData(this.ViewModel.GetFixedRewardDataList(), undefined, true);
  }
}
exports.TrapDefenseFixedRewardView = TrapDefenseFixedRewardView;
//# sourceMappingURL=TrapDefenseFixedRewardView.js.map