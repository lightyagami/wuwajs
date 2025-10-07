"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueRewardView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const SurvivorsActivityController_1 = require("../../Activity/SurvivorsActivityController");
const SurvivorsActivityDefine_1 = require("../../Activity/SurvivorsActivityDefine");
const SurvivorsRewardTabItem_1 = require("../Components/SurvivorsRewardTabItem");
const SurvivorsRewardTaskItem_1 = require("../Components/SurvivorsRewardTaskItem");
const SurvivorsScoreProgressPanel_1 = require("../Components/SurvivorsScoreProgressPanel");
class SurvivorsRogueRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ActivityDataBase = undefined;
    this.Nkd = -1;
    this.B7t = undefined;
    this.qoh = undefined;
    this.hfl = undefined;
    this.Ftl = "";
    this.JSi = e => {
      if (this.ActivityDataBase.Id === e) {
        for (const i of this.B7t.GetLayoutItemList()) {
          i.RefreshRedDot();
        }
        this.Ooh();
        this.dx_();
      }
    };
    this.Hwn = () => {
      return new SurvivorsRewardTabItem_1.SurvivorsRewardTabItem();
    };
    this.HEu = e => {
      if (this.Nkd !== e.Type && this.Nkd !== -1) {
        this.B7t.GetLayoutItemByKey(this.Nkd)?.SetToggleState(false, false);
      }
      this.B7t.SelectGridProxy(e.Index);
      this.Nkd = e.Type;
      this.Ooh();
    };
    this.Vkd = e => this.ActivityDataBase.GetTypeRedDotState(e.Type);
    this.VOe = () => {
      var e = new SurvivorsRewardTaskItem_1.SurvivorsRewardTaskItem();
      e.OnGetBtnClick = this.W9u;
      return e;
    };
    this.W9u = () => {
      var e = this.ActivityDataBase.GetAvailableGetTaskRewardIdsByType(this.Nkd);
      if (e.length > 0) {
        SurvivorsActivityController_1.SurvivorsActivityController.RequestGetRewardTask(e);
      }
    };
    this.dx_ = () => {
      const e = this.ActivityDataBase.GetAllMilestoneReward();
      const i = this.ActivityDataBase.GetMilestoneItemCount();
      var t = new UiAsyncTask_1.UiAsyncTask("SurvivorsRogueRewardView.RefreshProgressItem", async () => {
        await this.hfl.RefreshProgressItem(i, e);
      });
      this.RunAsyncTask(t);
    };
    this.mx_ = () => {
      var e = this.ActivityDataBase.GetAllAvailableGetMilestoneRewardIds();
      if (e.length > 0) {
        SurvivorsActivityController_1.SurvivorsActivityController.RequestGetRewardScore(e);
      }
    };
    this.$Eu = () => {
      var e = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRogueActivityConfig()?.TaskDisplayItemId;
      if (e) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText]];
    this.BtnBindInfo = [[3, this.$Eu]];
  }
  async OnBeforeStartAsync() {
    this.ActivityDataBase = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    var e = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    e.SetCloseCallBack(this.AMo);
    e.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.OpenRogueHelp();
    });
    this.B7t = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.Hwn);
    this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.VOe);
    var e = [];
    this.hfl = new SurvivorsScoreProgressPanel_1.SurvivorsScoreProgressPanel();
    e.push(this.hfl.CreateByActorAsync(this.GetItem(6).GetOwner()));
    this.hfl.OnClickToGet = this.mx_;
    this.AddChild(this.hfl);
    e.push(this.B7t.RefreshByDataAsync(this.jkd()));
    await Promise.all(e);
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    this.dx_();
    this.sSt();
    this.B7t.GetLayoutItemByIndex(0)?.SetToggleState(true, true);
  }
  OnBeforeShow() {
    SurvivorsActivityController_1.SurvivorsActivityController.CheckIsActivityClose();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.JSi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.JSi);
  }
  jkd() {
    var e = [];
    var i = Array.from(this.ActivityDataBase.RewardType2TaskIdList.keys()).sort((e, i) => e - i);
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsActivityConfigByActivityId(this.ActivityDataBase.Id);
    let r = 0;
    for (const o of i) {
      var s = new SurvivorsActivityDefine_1.SurvivorRewardTaskTabData();
      s.Type = o;
      s.Index = r;
      s.NameTextId = t?.TaskType.get(o);
      s.ClickedCallback = this.HEu;
      s.RefreshRedDot = this.Vkd;
      e.push(s);
      r++;
    }
    return e;
  }
  Ooh() {
    var e = this.ActivityDataBase.GetRewardTaskDataListByTypeId(this.Nkd);
    this.qoh.RefreshByData(e, () => {
      this.qoh.ScrollToTop(0);
    }, true);
  }
  sSt() {
    var e;
    if (this.ActivityDataBase?.CheckIfInOpenTime()) {
      e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.ActivityDataBase.EndOpenTime, this.Ftl);
      this.GetText(7)?.SetText(e);
    }
  }
}
exports.SurvivorsRogueRewardView = SurvivorsRogueRewardView;
//# sourceMappingURL=SurvivorsRogueRewardView.js.map