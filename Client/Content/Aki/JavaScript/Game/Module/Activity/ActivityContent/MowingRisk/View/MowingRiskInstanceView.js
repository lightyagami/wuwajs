"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingRiskInstanceView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const MowingRiskInstanceDetailView_1 = require("./MowingRiskInstanceDetailView");
class MowingRiskInstanceView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.G9a = undefined;
    this.k9a = () => {
      UiManager_1.UiManager.OpenView("MowingBuffView", 0);
    };
    this.N9a = () => {
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.MowingRiskModel.BuildActivityRewardViewData());
    };
  }
  get ResourceId() {
    return ModelManager_1.ModelManager.MowingRiskModel.InstanceSubViewResourceId;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[4, this.k9a], [6, this.N9a]];
  }
  async OnBeforeStartAsync() {
    await this.F9a();
    RedDotController_1.RedDotController.BindRedDot("RedDotMowingRiskBuffAll", this.GetItem(5));
    RedDotController_1.RedDotController.BindRedDot("RedDotMowingRiskReward", this.GetItem(7));
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotMowingRiskBuffAll", this.GetItem(5));
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotMowingRiskReward", this.GetItem(7));
  }
  OnStart() {
    this.V9a();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot);
  }
  async RefreshExternalAsync() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    var i = e.BuildInstanceDetailDataByInstanceId(e.CurrentInstanceId);
    await this.G9a.RefreshExternalByDataAsync(i);
    var i = e.BuildInstanceRecommendDataByInstanceId(e.CurrentInstanceId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.TextId, i.TextArgs);
    this.GetText(8)?.SetText(e.BuildInstanceTotalScore());
  }
  RefreshOnTick() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    var e = e.BuildInstanceDetailLockDataByInstanceId(e.CurrentInstanceId);
    this.G9a.RefreshLockItemExternalByData(e);
  }
  async F9a() {
    var e = new MowingRiskInstanceDetailView_1.MowingRiskInstanceDetailView();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.G9a = e;
  }
  V9a() {
    this.GetItem(1)?.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(true);
  }
}
exports.MowingRiskInstanceView = MowingRiskInstanceView;
//# sourceMappingURL=MowingRiskInstanceView.js.map