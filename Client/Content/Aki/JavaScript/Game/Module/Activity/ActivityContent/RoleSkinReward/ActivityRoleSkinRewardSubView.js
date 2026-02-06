"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleSkinRewardSubView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRoleSkinRewardController_1 = require("./ActivityRoleSkinRewardController");
class ActivityRoleSkinRewardSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.b1g = false;
    this.vef = false;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.l8f = undefined;
    this.InitGridItem = () => {
      var i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      i.ShowReceivedCallBack = () => this.vef;
      return i;
    };
    this.R1g = () => {
      var i = this.GetRoleSkinConfig();
      var t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i.MaleSkinId);
      if (t && (i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i.FemaleSkinId))) {
        ControllerHolder_1.ControllerHolder.SkinController.OpenBuyRoleSkinPreviewDetailViewByActivityRoleSkinData([t, i], this.b1g);
      }
    };
    this.L1g = () => {
      var i = this.GetRoleSkinConfig();
      var t = ActivityRoleSkinRewardController_1.ActivityRoleSkinRewardController.GetSkinRewardData().CheckTransitionCondition(i.Id);
      if (t) {
        if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i.TargetQuestID) === 0) {
          ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(i.DirectTrainActivityId);
        } else {
          for (const e of i.PathQuestArray) {
            if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 2) {
              UiManager_1.UiManager.OpenView("QuestView", e);
            }
          }
        }
      }
    };
    this.w1g = () => {
      var i = this.GetRoleSkinConfig();
      var t = Protocol_1.Aki.Protocol.Nag.create();
      t.N6n = i.Id;
      Net_1.Net.Call(29646, t, i => {
        if (i && i.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(i.Q4n, 29141);
        }
      });
    };
    this.P1g = i => {
      if (i === 1) {
        this.l8f?.StopCurrentSequence(false, true);
        this.l8f.PlayLevelSequenceByName("Switch");
        this.b1g = false;
        this.OnRefreshView();
      }
    };
    this.A1g = i => {
      if (i === 1) {
        this.l8f?.StopCurrentSequence(false, true);
        this.l8f.PlayLevelSequenceByName("Switch");
        this.b1g = true;
        this.OnRefreshView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIExtendToggle], [5, UE.UIExtendToggle], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UIText], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem]];
    this.BtnBindInfo = [[6, this.R1g], [8, this.L1g], [9, this.w1g], [4, this.P1g], [5, this.A1g]];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(15);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(16);
    this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(17);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    this.UNe.InitGridLayout(this.InitGridItem);
    var i = this.GetItem(18);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnRefreshView() {
    var i = this.GetRoleSkinConfig();
    this.vef = ActivityRoleSkinRewardController_1.ActivityRoleSkinRewardController.GetSkinRewardData().CheckRewarded(i.Id);
    this.jqe();
    this.D1g();
    this.Pqe();
    this.zao();
    this.BNe();
  }
  OnStart() {
    var i = this.ActivityBaseData.LocalConfig;
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.LNe.SetSubTitleVisible(!StringUtils_1.StringUtils.IsEmpty(i?.DescTheme));
    var [t, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t);
    if (t) {
      this.LNe.SetTimeTextByText(e);
    }
    if (i?.DescTheme) {
      this.LNe.SetSubTitleByTextId(i.DescTheme);
    }
    this.DNe.SetContentByText(this.ActivityBaseData.GetTitle());
    this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc));
    if (i?.Desc) {
      this.DNe.SetContentByTextId(i.Desc);
    }
    this.ANe.FunctionButton.SetFunction(this.w1g);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.b1g = t === 0;
    this.l8f = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.OnRefreshView();
  }
  OnBeforeDestroy() {
    this.l8f?.Clear();
    this.l8f = undefined;
  }
  jqe() {
    var i = this.ActivityBaseData.GetPreviewReward();
    if (i && i.length > 0) {
      this.UNe.RefreshItemLayout(i);
    }
  }
  Pqe() {
    var i = this.GetRoleSkinConfig();
    var i = this.b1g ? i.FemaleSkinId : i.MaleSkinId;
    var i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i);
    var t = i.GetTitleName();
    var i = i.GetSubTitle();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t);
  }
  D1g() {
    this.GetItem(0).SetUIActive(!this.b1g);
    this.GetItem(1).SetUIActive(this.b1g);
    this.GetItem(2)?.SetUIActive(!this.b1g);
    this.GetItem(3)?.SetUIActive(this.b1g);
    this.GetExtendToggle(4)?.SetToggleState(this.b1g ? 0 : 1);
    this.GetExtendToggle(5)?.SetToggleState(this.b1g ? 1 : 0);
  }
  BNe() {
    var i = this.GetRoleSkinConfig();
    var i = ActivityRoleSkinRewardController_1.ActivityRoleSkinRewardController.GetSkinRewardData().GetSkinRewardState(i.Id) === Protocol_1.Aki.Protocol.Wag.Proto_TaskComplete;
    this.ANe.FunctionButton.SetRedDotVisible(i);
  }
  zao() {
    var i = this.GetRoleSkinConfig();
    var i = ActivityRoleSkinRewardController_1.ActivityRoleSkinRewardController.GetSkinRewardData().CheckTransitionCondition(i.Id);
    this.GetButton(8).RootUIComp.SetUIActive(i);
    this.GetButton(9).RootUIComp.SetUIActive(!i);
    this.GetButton(9).SetSelfInteractive(!this.vef);
    var i = this.vef ? "RoverSkinEvent_Received" : "RoverSkinEvent_Receive";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "RoverSkinEvent_Go");
  }
  GetRoleSkinConfig() {
    var i = ActivityRoleSkinRewardController_1.ActivityRoleSkinRewardController.ActivityId;
    return ConfigManager_1.ConfigManager.ActivityRoleSkinRewardConfig.GetActivityConfig(i);
  }
}
exports.ActivityRoleSkinRewardSubView = ActivityRoleSkinRewardSubView;
//# sourceMappingURL=ActivityRoleSkinRewardSubView.js.map