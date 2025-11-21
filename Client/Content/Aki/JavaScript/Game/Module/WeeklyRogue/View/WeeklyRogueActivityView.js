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
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PowerController_1 = require("../../Power/PowerController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeekyRogueScoreItem_1 = require("../Components/WeekyRogueScoreItem");
const WeeklyRogueController_1 = require("../WeeklyRogueController");
class WeeklyRogueActivityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.lqe = undefined;
    this.eel = undefined;
    this.ZAt = undefined;
    this.j3 = undefined;
    this.eHu = 0;
    this.RJd = () => {
      this.eel?.RefreshScore();
    };
    this.oEc = () => {
      var e = () => {
        this.CloseMe();
      };
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(278);
      t.FunctionMap.set(1, e);
      t.FunctionMap.set(0, e);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.Qho = () => {
      var e;
      var t;
      if (ModelManager_1.ModelManager.WeeklyRogueModel.HasLastInfo()) {
        e = this.ActivityBaseData.LastInstInfo;
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(135)).IsEscViewTriggerCallBack = false;
        t.SetTextArgs(e.iqs.toString(), e.rqs.toString());
        t.FunctionMap.set(1, () => {
          WeeklyRogueController_1.WeeklyRogueController.Instance.InstanceSettleRequest(e => {
            if (e) {
              this.ZGe();
            }
          });
        });
        t.FunctionMap.set(2, () => {
          if (ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial()) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
          } else {
            WeeklyRogueController_1.WeeklyRogueController.Instance.RogueWeeklyStartRequest([]);
          }
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        UiManager_1.UiManager.OpenView("WeeklyRogueRoleSelectView", undefined, (e, t) => {
          if (e && UiManager_1.UiManager.IsViewShow("WeeklyRogueActivityView")) {
            UiManager_1.UiManager.GetViewByName("WeeklyRogueActivityView")?.AddChildViewById(t);
          }
        });
      }
    };
    this.SY_ = () => {
      var e = this.ActivityBaseData.GetCycleConfig();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e.HelpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityDataNew;
    if (e) {
      this.ActivityBaseData = e;
      this.eHu = e.CycleId;
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
      this.eel = new WeekyRogueScoreItem_1.WeeklyRogueScoreItem();
      this.AddChild(this.eel);
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.lqe.SetHelpCallBack(this.SY_);
      e = this.ActivityBaseData.GetCycleConfig();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.CycleName);
      this.GetText(8).SetText(this.ActivityBaseData.GetCycleBlackFlowerCost().toString());
      this.GetText(1).SetText(this.ActivityBaseData.GetTitle());
      this.ZAt = new ButtonItem_1.ButtonItem();
      this.ZAt.SetFunction(this.Qho);
      await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.eel.CreateByActorAsync(this.GetItem(6).GetOwner()), this.ZAt.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.SetTextureAsync(e.ViewBackground, this.GetTexture(7)), WeeklyRogueController_1.WeeklyRogueController.Instance?.RogueWeeklyLastInfoRequest()]);
      await this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Power]);
      this.lqe.SetCurrencyItemBtnFunction(ItemDefines_1.EItemId.Power, () => {
        PowerController_1.PowerController.OpenPowerView();
      });
    }
  }
  OnStart() {
    var e = this.ActivityBaseData.GetCycleConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.BuffDesc, ...e.BuffDescParam);
    this.ActivityBaseData.SaveFirstCheckRedDotState();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueRefreshScoreRedDot, this.RJd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueRefreshScoreRedDot, this.RJd);
  }
  OnBeforeShow() {
    if (this.eHu !== this.ActivityBaseData.CycleId) {
      this.oEc();
    }
    this.u3e();
    this.tGo();
    this.ZGe();
  }
  OnBeforeHide() {
    this.cG();
  }
  u3e() {
    var e = this.ActivityBaseData.GetCycleCountDownData();
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
  ZGe() {
    if (ModelManager_1.ModelManager.WeeklyRogueModel.HasLastInfo()) {
      this.ZAt.SetLocalTextNew("WeRougeHomePageButtonTextContinue");
    } else {
      this.ZAt.SetLocalTextNew("WeRougeHomePageButtonTextStart");
    }
  }
}
exports.WeeklyRogueActivityView = WeeklyRogueActivityView;
//# sourceMappingURL=WeeklyRogueActivityView.js.map