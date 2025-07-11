"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueTaskView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const RogueResTaskThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTaskThemeById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueResOutDefine_1 = require("../Define/RogueResOutDefine");
const RogueTaskItem_1 = require("./RogueTaskItem");
const RogueTaskRoleItem_1 = require("./RogueTaskRoleItem");
const RogueTaskTabItem_1 = require("./RogueTaskTabItem");
const MAX_ROLE_COUNT = 3;
class RogueTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabLayout = undefined;
    this.CurrentTypeIndex = 1;
    this.TabTypeList = [];
    this.ScrollView = undefined;
    this.lqe = undefined;
    this.ypt = [];
    this.GOe = undefined;
    this.Ftl = "";
    this.qKs = [];
    this.fqe = () => new RogueTaskTabItem_1.RogueTaskTabItem();
    this.ou_ = () => new RogueTaskItem_1.RogueTaskItem();
    this.l6c = i => {
      if (i === 4 && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().SaveFirstCheckRedDotState(1)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate);
        this.TabLayout.GetLayoutItemByIndex(this.TabTypeList.indexOf(i)).RefreshRedDot();
      }
      for (let e = 0; e < this.TabTypeList.length; e++) {
        this.TabLayout.GetLayoutItemByIndex(e).SetToggleState(i === this.TabTypeList[e], false);
      }
      this.CurrentTypeIndex = i;
      this.Esi(this.CurrentTypeIndex);
    };
    this.H5c = () => {
      this.TabLayout.GetLayoutItemByIndex(this.TabTypeList.indexOf(this.CurrentTypeIndex)).RefreshRedDot();
      this.Esi(this.CurrentTypeIndex);
    };
    this.a8c = () => {
      var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
      this.CloseMe();
      if (UiManager_1.UiManager.IsViewOpen("RogueSeasonEntranceView")) {
        UiManager_1.UiManager.NormalResetToView("RogueSeasonEntranceView");
      } else {
        UiManager_1.UiManager.OpenView("RogueSeasonEntranceView", e);
      }
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.kOe = () => {
      this.gxl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText]];
    this.BtnBindInfo = [[6, this.a8c]];
  }
  OnStart() {
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    this.gxl();
    this.TabLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.fqe);
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.ou_);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.Awe);
    this.lqe.SetHelpBtnActive(false);
  }
  OnBeforeDestroy() {
    this.lqe = undefined;
    this.ScrollView = undefined;
    this.TabLayout = undefined;
  }
  async OnBeforeShowAsyncImplement() {
    await this.h8c();
    await this.TabLayout.RefreshByDataAsync(this.cOn()).then(() => {
      this.l6c(this.CurrentTypeIndex);
    });
  }
  OnBeforeShow() {
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
    this.kOe();
  }
  OnAfterHide() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.GOe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.H5c);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.H5c);
  }
  async h8c() {
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskRoleList();
    var t = [7, 8, 9];
    if (i.length === MAX_ROLE_COUNT) {
      var s = [];
      for (let e = 0; e < i.length; e++) {
        var r = new RogueTaskRoleItem_1.RogueTaskRoleItem(i[e], false);
        this.qKs.push(r);
        s.push(r.CreateThenShowByActorAsync(this.GetItem(t[e]).GetOwner()));
      }
      await Promise.all(s);
    }
  }
  cOn() {
    var e;
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData();
    var t = RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(i.GetTaskThemeId());
    var s = [];
    this.TabTypeList = [];
    for (const r of t.TabNames) {
      if (i.GetTaskListByType(r[0]).length !== 0) {
        (e = new RogueResOutDefine_1.RogueTaskRewardTabData()).NameTextId = r[1];
        e.Index = r[0];
        e.ClickedCallback = this.l6c;
        e.RefreshRedDot = e => ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckTaskRedDot(e);
        s.push(e);
        this.TabTypeList.push(e.Index);
      }
    }
    this.CurrentTypeIndex = this.TabTypeList.length > 0 ? this.TabTypeList[0] : -1;
    return s;
  }
  Esi(e) {
    this.ypt.length = 0;
    this.ypt = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskDataListById(e).sort(ModelManager_1.ModelManager.ActivityPermanentRogueModel.SortTaskData);
    this.ScrollView.RefreshByDataAsync(this.ypt, true);
    e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskProgressByType(this.TabTypeList[e - 1]);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "RogueRes_Task_Progress", e.toFixed(0));
  }
  gxl() {
    var e = MathUtils_1.MathUtils.LongToNumber(ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskEndTime());
    var e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, this.Ftl);
    var i = this.GetText(10);
    i?.SetUIActive(e !== undefined);
    i?.SetText(e ?? "0");
  }
}
exports.RogueTaskView = RogueTaskView;
//# sourceMappingURL=RogueTaskView.js.map