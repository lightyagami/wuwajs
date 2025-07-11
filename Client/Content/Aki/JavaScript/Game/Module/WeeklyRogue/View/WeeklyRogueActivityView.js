"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueActivityView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PowerController_1 = require("../../Power/PowerController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeekyRogueScoreItem_1 = require("../Components/WeekyRogueScoreItem");
const WeeklyRogueController_1 = require("../WeeklyRogueController");
class WeeklyRogueActivityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.UNe = undefined;
    this.lqe = undefined;
    this.eel = undefined;
    this.j3 = undefined;
    this.oEc = () => {
      var e = () => {
        this.CloseMe();
      };
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(278);
      i.FunctionMap.set(1, e);
      i.FunctionMap.set(0, e);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.Qho = () => {
      var e;
      var i = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.LastInstInfo;
      if (i && i.r6n !== 0) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(135)).IsEscViewTriggerCallBack = false;
        e.SetTextArgs(i.iqs.toString(), i.rqs.toString());
        e.FunctionMap.set(1, () => {
          WeeklyRogueController_1.WeeklyRogueController.Instance.InstanceSettleRequest();
          ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.LastInstInfo = undefined;
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        });
        e.FunctionMap.set(2, () => {
          if (ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial()) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
          } else {
            WeeklyRogueController_1.WeeklyRogueController.Instance.RogueWeeklyStartRequest([]);
          }
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        i = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig();
        ControllerHolder_1.ControllerHolder.EditBattleTeamController.OpenEditBattleTeamView(i.InstId);
      }
    };
    this.oV_ = () => {
      var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e.BlackFlowerHelpId);
    };
    this.SY_ = () => {
      var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e.HelpId);
    };
    this.fH_ = () => {
      UiManager_1.UiManager.OpenView("WeeklyRogueEnvironmentTips");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UIText]];
    this.BtnBindInfo = [[6, this.Qho], [10, this.oV_], [9, this.fH_]];
  }
  async OnBeforeStartAsync() {
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.eel = new WeekyRogueScoreItem_1.WeeklyRogueScoreItem();
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetHelpCallBack(this.SY_);
    var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.CycleName);
    this.GetText(11).SetText(ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleBlackFlowerCost().toString());
    this.GetText(1).SetText(ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetTitle());
    await Promise.all([this.UNe.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.eel.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.SetTextureAsync(e.ViewBackground, this.GetTexture(8)), WeeklyRogueController_1.WeeklyRogueController.Instance?.RogueWeeklyLastInfoRequest()]);
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(e.BlackFlowerAward, ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.WorldLevel));
    await this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Power]);
    this.lqe.SetCurrencyItemBtnFunction(ItemDefines_1.EItemId.Power, () => {
      PowerController_1.PowerController.OpenPowerView();
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
  }
  OnBeforeShow() {
    this.u3e();
    this.tGo();
  }
  OnBeforeHide() {
    this.cG();
  }
  u3e() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleCountDownData();
    this.GetText(3).SetText(e.CountDownText);
  }
  tGo() {
    if (this.j3) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
    this.j3 = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.u3e();
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  cG() {
    if (this.j3) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
}
exports.WeeklyRogueActivityView = WeeklyRogueActivityView;
//# sourceMappingURL=WeeklyRogueActivityView.js.map