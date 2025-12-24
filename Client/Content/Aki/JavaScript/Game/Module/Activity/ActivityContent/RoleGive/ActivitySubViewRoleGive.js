"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewRoleGive = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const RoleDescribeComponent_1 = require("../../../Gacha/GachaMainView/RoleDescribeComponent");
const RoleController_1 = require("../../../RoleUi/RoleController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRoleGiveController_1 = require("./ActivityRoleGiveController");
class ActivitySubViewRoleGive extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.ANe = undefined;
    this.jUa = undefined;
    this.U2i = undefined;
    this.Pe = undefined;
    this.DFe = () => {
      var i;
      var t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MoonChasing", 34, "点击领取奖励");
      }
      if (this.Pe?.RedPointShowState) {
        i = this.Pe?.GetExtraConfig();
        t = ModelManager_1.ModelManager.MoonChasingModel?.GetPopularityValue();
        if (!!i && !!t && !(t < i.PopularityNeed)) {
          ActivityRoleGiveController_1.ActivityRoleGiveController.TrackMoonActivityRewardRequest();
        }
      } else {
        ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity).forEach(i => {
          var t = i;
          if (t.ActivityFlowState === 0) {
            if (t.GetPreGuideQuestFinishState()) {
              i = {
                MarkId: ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(i.Id).FocusMarkId,
                MarkType: 6
              };
              ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, i);
            } else {
              UiManager_1.UiManager.OpenView("QuestView", t.GetUnFinishPreGuideQuestId());
            }
          }
        });
      }
    };
    this.aFo = () => {
      RoleController_1.RoleController.OpenRoleMainView(1, 0, [this.Pe.GetExtraConfig().RoleTrialId]);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [3, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UISprite]];
    this.BtnBindInfo = [[3, this.aFo]];
  }
  OnSetData() {
    this.Pe = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(4);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.Pe);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
    this.jUa = new RoleDescribeComponent_1.RoleDescribeComponent();
    var i = this.GetItem(2);
    await this.jUa.CreateThenShowByActorAsync(i.GetOwner());
    this.U2i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    var i = this.GetItem(5);
    await this.U2i.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i;
    var t;
    var e = this.Pe.LocalConfig;
    var r = this.Pe.GetExtraConfig();
    if (e && r) {
      t = e.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(t);
      this.LNe.SetSubTitleVisible(i);
      if (i) {
        this.LNe.SetSubTitleByTextId(t);
      }
      this.LNe.SetActivityBaseData(this.ActivityBaseData);
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      i = e.Desc;
      this.DNe.SetContentByTextId(i);
      this.ANe.FunctionButton?.SetFunction(this.DFe);
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
      this.ANe.FunctionButton.SetText(t);
      e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(r.RoleTrialId);
      this.jUa?.Update(e.ParentId);
      this.U2i?.RefreshByConfigId(e.ParentId);
      this.OnRefreshView();
    }
  }
  OnTimer(i) {
    this.OnRefreshView();
  }
  OnRefreshView() {
    this.RefreshCondition();
    this.FNe();
    this.BNe();
    this.Nqe();
  }
  Nqe() {
    var t = this.Pe.GetExtraConfig();
    if (t) {
      let i = ModelManager_1.ModelManager.MoonChasingModel?.GetPopularityValue();
      i = i || 0;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Moonfiesta_PopularityProgress", i, t.PopularityNeed);
      this.GetSprite(7)?.SetFillAmount(i / t.PopularityNeed);
    }
  }
  FNe() {
    var [, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextByText(i);
  }
  RefreshCondition() {
    var i = this.Pe.GetExtraConfig();
    if (i) {
      if (this.ActivityBaseData.IsUnLock()) {
        if (this.Pe?.IsGetReward) {
          this.ANe.FunctionButton?.SetUiActive(false);
          this.ANe.SetActivatePanelConditionVisible(true);
        } else {
          this.ANe.FunctionButton?.SetUiActive(true);
          this.ANe.SetActivatePanelConditionVisible(false);
        }
        this.ANe.SetPanelConditionVisible(false);
        if (!this.Pe?.IsGetReward && ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue() >= i.PopularityNeed) {
          this.ANe.FunctionButton?.SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_state_CanRecive"));
        } else {
          this.ANe.FunctionButton?.SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead"));
        }
      } else {
        this.ANe.FunctionButton?.SetUiActive(false);
        this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
      }
    }
  }
  BNe() {
    this.ANe?.SetFunctionRedDotVisible(this.Pe.RedPointShowState);
  }
}
exports.ActivitySubViewRoleGive = ActivitySubViewRoleGive;
//# sourceMappingURL=ActivitySubViewRoleGive.js.map