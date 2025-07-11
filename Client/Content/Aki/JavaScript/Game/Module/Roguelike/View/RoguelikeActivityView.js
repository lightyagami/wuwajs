"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeActivityView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityRogueController_1 = require("../../Activity/ActivityContent/RougeActivity/ActivityRogueController");
const PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeController_1 = require("../RoguelikeController");
const RoguelikeBlackFlowerItem_1 = require("./RoguelikeBlackFlowerItem");
class RoguelikeActivityView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.Fho = undefined;
    this.TDe = undefined;
    this.Sgl = undefined;
    this.OnBtnShop = () => {
      var e;
      var i;
      if (this.Fho.GetRogueActivityState() === 2) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_End_Tip");
      } else if ((i = this.Fho.SeasonData) !== undefined) {
        i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(i.UHn);
        (e = new PayShopViewData_1.PayShopViewData()).ShowShopIdList = [i.ShopId];
        e.PayShopId = i.ShopId;
        ModelManager_1.ModelManager.RoguelikeModel?.RecordRoguelikeShopRedDot(true);
        i = TimeUtil_1.TimeUtil.GetNextDayTimeStamp();
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopNextTimeStamp, i);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeDataUpdate);
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(e);
      }
    };
    this.OnBtnSkillTreeClick = () => {
      var e;
      if (this.Fho.GetRogueActivityState() === 2) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_End_Tip");
      } else if (e = this.Fho?.SeasonData) {
        RoguelikeController_1.RoguelikeController.OpenRoguelikeSkillView(e.UHn);
      }
    };
    this.OnBtnDoorClick = () => {
      if (this.Fho.GetRogueActivityState() === 2) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_End_Tip");
      } else {
        UiManager_1.UiManager.OpenView("RoguelikeAchievementView");
      }
    };
    this.OnBtnConfirmClick = () => {
      if (ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
      } else if (this.Fho.GetRogueActivityState() === 2) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Function_End_Tip");
      } else {
        RoguelikeController_1.RoguelikeController.EnterCurrentRogueEntrance();
      }
    };
    this.RefreshUi = () => {
      var e;
      var i;
      var t = this.Fho?.SeasonData;
      if (t) {
        e = ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId()?.WeekTokenMaxCount ?? 1;
        i = t.yqs / e;
        this.GetSprite(8)?.SetFillAmount(i);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Roguelike_ActivityMain_Score", t.yqs, e);
      }
      this.RefreshRemainTime();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UITexture], [6, UE.UIButtonComponent], [7, UE.UIText], [9, UE.UIText], [8, UE.UISprite], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[2, this.OnBtnSkillTreeClick], [3, this.OnBtnDoorClick], [4, this.OnBtnConfirmClick], [6, this.OnBtnShop]];
  }
  async OnBeforeStartAsync() {
    var e;
    this.Fho = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
    if (this.Fho === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 58, "RoguelikeActivityView没有活动数据");
      }
    } else if ((e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData) === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Roguelike", 34, "肉鸽赛季数据不存在");
      }
    } else {
      await RoguelikeController_1.RoguelikeController.RoguelikeTalentInfoRequest(e.UHn);
      if (this.Fho.GetRogueActivityState() === 1) {
        await RoguelikeController_1.RoguelikeController.RoguelikeLastInfoRequestAsync();
      }
      this.Sgl = new RoguelikeBlackFlowerItem_1.RoguelikeBlackFlowerItem();
      await this.Sgl.CreateByActorAsync(this.GetItem(16).GetOwner());
      this.AddChild(this.Sgl);
    }
  }
  OnStart() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(() => {
      UiManager_1.UiManager.CloseView(this.Info.Name);
    });
    var e = this.Fho.LocalConfig;
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), e.DescTheme);
      this.RefreshUi();
      this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        this.RefreshRemainTime();
      }, TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  OnBeforeShow() {
    RedDotController_1.RedDotController.BindRedDot("RogueSkillUnlock", this.GetItem(10));
    RedDotController_1.RedDotController.BindRedDot("RoguelikeAchievement", this.GetItem(11));
    RedDotController_1.RedDotController.BindRedDot("RoguelikeShop", this.GetItem(12), e => {
      this.GetItem(12)?.SetUIActive(e);
    });
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindRedDot("RogueSkillUnlock");
    RedDotController_1.RedDotController.UnBindRedDot("RoguelikeAchievement");
    RedDotController_1.RedDotController.UnBindRedDot("RoguelikeShop");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoguelikeCurrencyUpdate, this.RefreshUi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoguelikeCurrencyUpdate, this.RefreshUi);
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
    }
  }
  RefreshRemainTime() {
    var e;
    var i = this.GetButton(4);
    var t = this.GetItem(15);
    var o = this.GetText(9);
    var r = this.GetText(14);
    var l = this.Fho.GetRogueActivityState();
    if (l === 0) {
      i.RootUIComp.SetUIActive(true);
      t.SetUIActive(false);
      o.SetUIActive(false);
      e = this.Fho.EndOpenTime - TimeUtil_1.TimeUtil.GetServerTime();
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e);
      r.SetText(e.CountDownText);
    } else {
      if (l === 1) {
        i.RootUIComp.SetUIActive(false);
        t.SetUIActive(true);
        o.SetUIActive(true);
        e = this.Fho.ReceiveEndOpenTime - TimeUtil_1.TimeUtil.GetServerTime();
        l = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e);
        o.SetText(l.CountDownText);
      } else {
        i.RootUIComp.SetUIActive(false);
        t.SetUIActive(true);
        o.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalText(o, "Rogue_Function_End_Tip");
      }
      LguiUtil_1.LguiUtil.SetLocalText(r, "Rogue_Function_End_Tip");
    }
  }
}
exports.RoguelikeActivityView = RoguelikeActivityView;
//# sourceMappingURL=RoguelikeActivityView.js.map