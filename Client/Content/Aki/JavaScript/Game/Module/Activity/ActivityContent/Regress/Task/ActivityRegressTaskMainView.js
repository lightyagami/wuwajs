"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTaskMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonTabComponentData_1 = require("../../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../../Common/TabComponent/CommonTabTitleData");
const CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase");
const ActivityRegressDefine_1 = require("../ActivityRegressDefine");
const ActivityRegressMainCaptionListPanel_1 = require("../Panels/ActivityRegressMainCaptionListPanel");
const ActivityRegressTabItemPanel_1 = require("../Panels/ActivityRegressTabItemPanel");
const ActivityRegressTaskDefine_1 = require("./ActivityRegressTaskDefine");
const ActivityRegressTaskSubView_1 = require("./ConstantTask/ActivityRegressTaskSubView");
const ActivityRegressCultivateTaskSubView_1 = require("./Cultivate/ActivityRegressCultivateTaskSubView");
const ActivityRegressDoubleDropSubView_1 = require("./DoubleDrop/ActivityRegressDoubleDropSubView");
class ActivityRegressTaskMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.cda = undefined;
    this.uSc = undefined;
    this.L_1 = new Map();
    this.sma = undefined;
    this.TDa = e => {
      var i = this.L_1.get(this.uSc);
      if (i && this.uSc === 0 && e === ActivityRegressDefine_1.RECALL_SCORE_ITEM_ID) {
        i.Update();
      }
    };
    this.TTi = () => {
      this.L_1.get(this.uSc)?.Update();
    };
    this.yqe = e => {
      e = ActivityRegressTaskDefine_1.taskSubViewTabDataMap.get(e);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.IconName);
      return new CommonTabData_1.CommonTabData(e, undefined);
    };
    this.jdi = (e, i) => {
      return new ActivityRegressTabItemPanel_1.ActivityRegressTabItemPanel();
    };
    this.zno = e => {
      var i = new UiAsyncTask_1.UiAsyncTask("ActivityRegressTaskSubViewBase.OnTabSelected", async () => {
        await this.mda(e);
      });
      this.RunAsyncTask(i);
    };
    this.kOe = e => {
      this.mGe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    await this.sso();
    this.cda.SelectToggleByIndex(e, true);
    this.cda.SetPnlListUiActive(true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.TTi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.TTi);
  }
  OnBeforeShow() {
    this.mGe();
    this.TTi();
    this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  OnAfterHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    this.Cda();
  }
  async sso() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.jdi, this.zno, this.yqe);
    this.cda = new ActivityRegressMainCaptionListPanel_1.ActivityRegressMainCaptionListPanel();
    var i = this.GetItem(0).GetOwner();
    this.cda.Init(e);
    await this.cda.CreateThenShowByActorAsync(i);
    await this.Tfa();
    this.cda.BindTabTitleCallBack(() => {
      UiManager_1.UiManager.CloseView("ActivityRegressTaskMainView");
    });
  }
  async Tfa() {
    var i = new Array();
    var t = ActivityRegressTaskDefine_1.taskSubViewTabDataMap.size;
    for (let e = 0; e < t; ++e) {
      var s = new CommonTabItemBase_1.CommonTabItemData();
      s.Index = e;
      s.Data = this.cda.GetTabComponentData(e);
      i.push(s);
      var a = ActivityRegressTaskDefine_1.taskSubViewTabDataMap.get(e);
      s.RedDotName = a.RedDotName;
    }
    await this.cda.RefreshTabItemByDataAsync(i);
  }
  async mda(e) {
    if (e !== this.uSc) {
      if (this.uSc !== undefined) {
        await this.pda(this.uSc);
      }
      await this.gda(e);
      this.uSc = e;
      this.qEi();
    }
  }
  qEi() {
    var e = ActivityRegressTaskDefine_1.taskSubViewTabDataMap.get(this.uSc);
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.IconName);
    this.cda.UpdateTitle(i, new CommonTabTitleData_1.CommonTabTitleData(e.TitleKey));
  }
  async vda(e) {
    let i = undefined;
    var t = this.GetItem(2);
    switch (e) {
      case 0:
        await (i = new ActivityRegressTaskSubView_1.ActivityRegressTaskSubView()).CreateThenShowByResourceIdAsync("UiItem_CircumfluenceMission", t);
        break;
      case 1:
        await (i = new ActivityRegressCultivateTaskSubView_1.ActivityRegressRoleCultivateSubView()).CreateThenShowByResourceIdAsync("UiItem_RoleDevelop", t);
        break;
      case 2:
        await (i = new ActivityRegressDoubleDropSubView_1.ActivityRegressDoubleDropSubView()).CreateThenShowByResourceIdAsync("UiItem_CircumfluenceChallenge", t);
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("ActivityRecall", 63, "回流活动->未定义的子任务界面类型!", ["viewType", e]);
        }
    }
    return i;
  }
  async gda(e) {
    var i;
    if (!this.L_1.has(e)) {
      if (i = await this.vda(e)) {
        this.L_1.set(e, i);
      }
    }
    await this.L_1.get(e).ShowAsync();
  }
  async pda(e) {
    await this.L_1.get(e)?.HideAsync();
  }
  Cda() {
    for (var [, e] of this.L_1) {
      e.CloseMeAsync();
    }
    this.L_1.clear();
  }
  mGe() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData;
    var [e, i] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(e);
    this.GetText(4).SetUIActive(e);
    if (e) {
      this.GetText(4).SetText(i);
    }
  }
  jm() {
    if (TimerSystem_1.RealTimeTimerSystem.Has(this.sma)) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.sma);
      this.sma = undefined;
    }
  }
}
exports.ActivityRegressTaskMainView = ActivityRegressTaskMainView;
//# sourceMappingURL=ActivityRegressTaskMainView.js.map