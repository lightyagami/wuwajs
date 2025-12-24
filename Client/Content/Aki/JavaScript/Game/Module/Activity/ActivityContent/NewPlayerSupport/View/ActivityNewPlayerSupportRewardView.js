"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportRewardView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const RewardItemList_1 = require("../../../../ItemReward/View/RewardItemList");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityNewPlayerSupportRewardRoleItem_1 = require("./ActivityNewPlayerSupportRewardRoleItem");
class ActivityNewPlayerSupportRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.tFe = undefined;
    this.sOe = undefined;
    this.I_1 = () => new ActivityNewPlayerSupportRewardRoleItem_1.ActivityNewPlayerSupportRewardRoleItem();
    this.tWt = () => {
      this.CloseMe();
    };
    this.dxl = () => {
      var e = this.OpenParam.TrialRoleList;
      var e = ConfigManager_1.ConfigManager.TrialRoleConfig.GetTrialRoleGroupId(e[e.length - 1]);
      this.CloseMe();
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController?.OpenTrialRoleView(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.tWt], [4, this.dxl]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.sOe = new RewardItemList_1.RewardItemList();
    await this.sOe.CreateThenShowByActorAsync(e.GetOwner(), e);
  }
  OnStart() {
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.I_1);
    this.j6a();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  OnBeforePlayCloseSequence() {
    this.UiViewSequence.StopSequenceByKey("Switch");
  }
  j6a() {
    var e = this.OpenParam;
    this.sOe.Refresh(e.RewardData.GetItemList());
    this.tFe.RefreshByData(e.TrialRoleList);
    this.UiViewSequence.StartSequenceName = "Start01";
  }
}
exports.ActivityNewPlayerSupportRewardView = ActivityNewPlayerSupportRewardView;
//# sourceMappingURL=ActivityNewPlayerSupportRewardView.js.map