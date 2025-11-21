"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseRewardItem_1 = require("./TrapDefenseRewardItem");
const TrapDefenseRewardTabItem_1 = require("./TrapDefenseRewardTabItem");
const TrapDefenseSpecialRewardItem_1 = require("./TrapDefenseSpecialRewardItem");
class TrapDefenseRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Z51 = undefined;
    this.lqe = undefined;
    this.h9u = undefined;
    this.pcl = undefined;
    this.o0d = false;
    this.a9u = e => {
      if (this.o0d) {
        this.h9u.GetGenericLayout().GetUiAnimController().StartTime = 0;
      }
      this.h9u.RefreshByData(ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetRewardListByType(e), undefined, true);
    };
    this.lXc = () => {
      var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelReward.CurSelectRewardType;
      var e = ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetRewardListByType(e);
      this.Z51.RefreshByData(ModelManager_1.ModelManager.TrapDefenseModel.ViewModelReward.GetRewardTypeDataList());
      this.h9u.RefreshByData(e);
      this.pcl.Refresh(ModelManager_1.ModelManager.TrapDefenseModel.RewardData.SpecialRewardData);
    };
    this.yJc = e => {
      ModelManager_1.ModelManager.TrapDefenseModel.RewardData.RequestClaimRewardByType(e.Type);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.h9u = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), () => {
      var e = new TrapDefenseRewardItem_1.TrapDefenseRewardItem();
      e.OnClaimRewardCallback = this.yJc;
      return e;
    });
    this.pcl = new TrapDefenseSpecialRewardItem_1.TrapDefenseSpecialRewardItem();
    e.push(this.pcl.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.Z51 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), () => new TrapDefenseRewardTabItem_1.TrapDefenseRewardTabItem());
    e.push(this.Z51.RefreshByDataAsync(ModelManager_1.ModelManager.TrapDefenseModel.ViewModelReward.GetRewardTypeDataList(), true));
    await Promise.all(e);
  }
  OnStart() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelReward.RegisterOnSelectRewardTypeChange(this.a9u);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetHelpCallBack(() => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdFixedReward();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    });
    this.pcl.Refresh(ModelManager_1.ModelManager.TrapDefenseModel.RewardData.SpecialRewardData);
    this.Z51.SelectGridProxy(0);
    this.o0d = true;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseRewardUpdate, this.lXc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseRewardUpdate, this.lXc);
  }
  OnTick(e) {
    var r = ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetLimitRewardRemainTimeStr();
    this.GetText(3).SetText(r);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelReward.UnregisterOnSelectRewardTypeChange(this.a9u);
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelReward.Clear();
  }
}
exports.TrapDefenseRewardView = TrapDefenseRewardView;
//# sourceMappingURL=TrapDefenseRewardView.js.map