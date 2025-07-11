"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneGameplayItemRewardView = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const CommonResultButtonData_1 = require("../Common/ResultView/CommonResultButtonData");
const CommonResultView_1 = require("../Common/ResultView/CommonResultView");
const ItemHintController_1 = require("../ItemHint/ItemHintController");
class SceneGameplayItemRewardView extends CommonResultView_1.CommonResultView {
  constructor() {
    super(...arguments);
    this.evi = () => {
      this.SetActive(false);
    };
    this.tvi = () => {
      this.SetActive(true);
    };
    this.L1i = () => {
      if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
        this.CloseMe();
      }
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.evi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.tvi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.evi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.tvi);
  }
  OnStart() {
    super.OnStart();
    this.FTt();
  }
  FTt() {
    this.Yli();
  }
  Yli() {
    var e = ModelManager_1.ModelManager.ItemHintModel.ShiftItemRewardListFirst();
    var e = ItemHintController_1.ItemHintController.CombineAllShowItems(e.ItemReward, true);
    var e = ItemHintController_1.ItemHintController.ConvertRewardListToItem(e);
    this.RewardLayout.RebuildLayoutByDataNew(e);
  }
  SetupButtonFormat() {
    var e = this.z1i();
    this.RefreshButtonList(e);
  }
  z1i() {
    var e = new Array();
    e.push(this.Z1i());
    return e;
  }
  Z1i() {
    var e = new CommonResultButtonData_1.CommonResultButtonData();
    e.SetRefreshCallBack(e => {
      e.SetBtnText("ButtonTextConfirm");
    });
    e.SetClickCallBack(this.L1i);
    return e;
  }
}
exports.SceneGameplayItemRewardView = SceneGameplayItemRewardView;
//# sourceMappingURL=SceneGameplayItemRewardView.js.map