"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewTimePointReward = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityTimePointRewardController_1 = require("./ActivityTimePointRewardController");
const TimePointRewardItem_1 = require("./TimePointRewardItem");
class ActivitySubViewTimePointReward extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityTimePointRewardData = undefined;
    this.LNe = undefined;
    this.Tei = undefined;
    this.iJs = undefined;
    this.sGe = () => {
      var e = new TimePointRewardItem_1.TimePointRewardItem();
      e.OnClickToGet = this.rJs;
      return e;
    };
    this.wNe = e => {
      if (this.ActivityBaseData.Id === e) {
        this.Z3e();
      }
    };
    this.rJs = e => {
      ActivityTimePointRewardController_1.ActivityTimePointRewardController.GetRewardById(this.ActivityTimePointRewardData.Id, e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnSetData() {
    this.ActivityTimePointRewardData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var e = [];
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    e.push(this.LNe.CreateThenShowByActorAsync(i.GetOwner()));
    this.Tei = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.sGe);
    var i = ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig.GetConfigByActivityId(this.ActivityBaseData.Id);
    this.iJs = new UiPanelBase_1.UiPanelBase();
    e.push(this.iJs.CreateThenShowByResourceIdAsync(i.UiPrefab, this.GetItem(4)));
    await Promise.all(e);
  }
  OnStart() {
    var e = this.ActivityTimePointRewardData.LocalConfig;
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var i = !StringUtils_1.StringUtils.IsEmpty(e?.DescTheme);
    this.LNe.SetSubTitleVisible(i);
    if (i) {
      this.LNe.SetSubTitleByTextId(e.DescTheme);
    }
    var i = this.GetText(1);
    var t = !StringUtils_1.StringUtils.IsEmpty(e?.Desc);
    i.SetUIActive(t);
    if (t) {
      i.ShowTextNew(e.Desc);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  async OnBeforeShowSelfAsync() {
    await this.Z3e();
  }
  async Z3e() {
    var e = this.ActivityTimePointRewardData.GetRewardDataList();
    await this.Tei.RefreshByDataAsync(e);
  }
  OnTimer(e) {
    this.FNe();
  }
  FNe() {
    var [e, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e);
    if (e) {
      this.LNe.SetTimeTextByText(i);
    }
  }
}
exports.ActivitySubViewTimePointReward = ActivitySubViewTimePointReward;
//# sourceMappingURL=ActivitySubViewTimePointReward.js.map