"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewRoleGrowing = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewRoleGrowing extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.UOe = () => {
      UiManager_1.UiManager.OpenView("RoleGrowingMainView");
    };
    this.AOe = () => {
      this.BNe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.CommonInfoPanel.SetClickFunc(this.UOe);
    var e = [this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())];
    await Promise.all(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LongShanUpdate, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LongShanUpdate, this.AOe);
  }
  OnStart() {}
  OnBeforeShow() {
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join01");
    this.BNe();
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityTab, this.ActivityBaseData.Id);
    this.CommonInfoPanel?.OnRefreshView();
    this.AOe();
  }
  BNe() {
    var e = this.ActivityBaseData.CheckAnyStageRed();
    this.CommonInfoPanel?.SetFunctionRedDotVisible(e);
  }
}
exports.ActivitySubViewRoleGrowing = ActivitySubViewRoleGrowing;
//# sourceMappingURL=ActivitySubViewRoleGrowing.js.map