"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewMotorDevelopMonsterItem = exports.ActivitySubViewMotorDevelop = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityMotoDevelopController_1 = require("./ActivityMotoDevelopController");
class ActivitySubViewMotorDevelop extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.TaskGenericLayout = undefined;
    this.PanelLock = undefined;
    this.ActivityData = undefined;
    this.TitleComponent = undefined;
    this.g5m = () => {
      var t = ConfigManager_1.ConfigManager.ActivityMotorDevelopConfig.GetActivityDataById(ActivityMotoDevelopController_1.ActivityMotorDevelopController.ActivityId);
      if (t) {
        ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.OpenMotorDevelopTechTreeTabView(t.SkillTreeId);
      }
    };
    this.RefreshTaskLayout = (t = false) => {
      var e = ActivityMotoDevelopController_1.ActivityMotorDevelopController.GetActivityData();
      if (e) {
        this.TaskGenericLayout.RefreshByDataAsync(e.GetMotorDevelopTaskList() ?? [], t);
      }
    };
    this.V2e = () => new ActivitySubViewMotorDevelopMonsterItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.g5m]];
  }
  async OnBeforeStartAsync() {
    this.TaskGenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.V2e);
    var t = [];
    var e = this.GetItem(0);
    this.TitleComponent = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    t.push(this.TitleComponent.CreateThenShowByActorAsync(e.GetOwner()));
    var e = this.GetItem(3);
    this.PanelLock = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    t.push(this.PanelLock.CreateThenShowByActorAsync(e.GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    ActivityMotoDevelopController_1.ActivityMotorDevelopController.RefreshFirstUnlockUnReadRedDot();
    this.TitleComponent.SetActivityBaseData(this.ActivityBaseData);
    this.TitleComponent.SetTitleByText(this.ActivityBaseData.GetTitle());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorDevelopTaskUpdate, this.RefreshTaskLayout);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorDevelopTaskUpdate, this.RefreshTaskLayout);
  }
  OnRefreshView() {
    this.RefreshTimerText();
    this.RefreshTaskLayout(true);
    this._Fe();
  }
  OnTimer(t) {
    this.RefreshTimerText();
  }
  _Fe() {
    var t = this.ActivityBaseData.IsUnLock();
    this.GetItem(3).SetUIActive(!t);
    this.GetButton(4).RootUIComp.SetUIActive(t);
    if (!t) {
      t = this.ActivityBaseData.ConditionGroupId;
      if (t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t)) {
        this.PanelLock.SetTextByTextId(t);
      }
      this.PanelLock.ButtonCallBack = () => {
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(this.ActivityBaseData.Id);
      };
    }
  }
  RefreshTimerText() {
    var [t, e] = this.GetTimeVisibleAndRemainTime();
    this.TitleComponent.SetTimeTextVisible(t);
    if (t) {
      this.TitleComponent.SetTimeTextByText(e);
    }
  }
}
exports.ActivitySubViewMotorDevelop = ActivitySubViewMotorDevelop;
class ActivitySubViewMotorDevelopMonsterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.RewardItem = undefined;
    this.H2e = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UITexture]];
    this.BtnBindInfo = [[0, this.H2e]];
  }
  OnStart() {
    this.RewardItem = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.RewardItem.Initialize(this.GetItem(1).GetOwner());
    this.RewardItem.BindOnExtendTogglePress(t => {
      var e = this.Data.s5n;
      switch (this.Data.H6n) {
        case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskTaken:
        case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskRunning:
          break;
        case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskFinish:
          ActivityMotoDevelopController_1.ActivityMotorDevelopController.RewardReceiveRequest([e]);
      }
    });
  }
  Refresh(t, e, i) {
    this.Data = t;
    var o = ConfigManager_1.ConfigManager.ActivityMotorDevelopConfig.GetMotorDevelopTaskById(t.s5n);
    if (o) {
      var r = Array.from(o.TaskRewardShow.keys())[0];
      var s = o.TaskRewardShow.get(r);
      this.RewardItem.Refresh([{
        IncId: 0,
        ItemId: r
      }, s]);
      this.RewardItem.SetReceivedVisible(t.H6n === Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskTaken);
      this.RewardItem.SetLockVisible(t.H6n === Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskRunning);
      this.RewardItem.SetReceivableVisible(t.H6n === Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskFinish);
      var n = this.GetTexture(5);
      var l = this.GetTexture(4);
      n.SetUIActive(false);
      l.SetUIActive(false);
      switch (t.H6n) {
        case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskRunning:
          break;
        case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskFinish:
          n.SetUIActive(true);
          break;
        case Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskTaken:
          l.SetUIActive(true);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), o.TaskName);
      this.GetText(3).SetText(`(${t.lMs}/${t.j6n})`);
    }
  }
}
exports.ActivitySubViewMotorDevelopMonsterItem = ActivitySubViewMotorDevelopMonsterItem;
//# sourceMappingURL=ActivitySubViewMotorDevelop.js.map