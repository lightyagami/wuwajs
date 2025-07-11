"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressQuestionnaireView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const RegressDefine_1 = require("../Base/RegressDefine");
const ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
const ActivityRegressQuestionnaireLayoutItem_1 = require("./ActivityRegressQuestionnaireLayoutItem");
class ActivityRegressQuestionnaireView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.M_1 = undefined;
    this.E_1 = undefined;
    this.I_1 = () => new ActivityRegressQuestionnaireLayoutItem_1.ActivityRegressQuestionnaireLayoutItem();
    this.R_1 = () => {
      var e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressQuestionnaireRewardDataList(RegressDefine_1.ERegressQuestionnaireType.Type1);
      this.M_1.RefreshByData(e);
      var e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressQuestionnaireRewardDataList(RegressDefine_1.ERegressQuestionnaireType.Type2);
      this.E_1.RefreshByData(e);
      this.GetItem(6).SetUIActive(ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsQuestionnaireUnlock(RegressDefine_1.ERegressQuestionnaireType.Type2));
    };
    this.T_1 = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.OpenQuestionnaire(RegressDefine_1.ERegressQuestionnaireType.Type1);
      var e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(RegressDefine_1.ERegressQuestionnaireType.Type1);
      if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetQuestionnaireRewardState(e.Id) === 0) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestQuestionOpen(RegressDefine_1.ERegressQuestionnaireType.Type1);
        ActivityRegressHelper_1.ActivityRegressHelper.ReportRegressLog1061(e.QuestionnaireId);
      }
    };
    this.b_1 = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.OpenQuestionnaire(RegressDefine_1.ERegressQuestionnaireType.Type2);
      var e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(RegressDefine_1.ERegressQuestionnaireType.Type2);
      if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetQuestionnaireRewardState(e.Id) === 0) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestQuestionOpen(RegressDefine_1.ERegressQuestionnaireType.Type2);
        ActivityRegressHelper_1.ActivityRegressHelper.ReportRegressLog1061(e.QuestionnaireId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[2, this.T_1], [5, this.b_1]];
  }
  OnStart() {
    this.M_1 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.I_1);
    this.E_1 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.I_1);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetQuestionnaireRedDotChecked();
    this.R_1();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.R_1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.R_1);
  }
  OnBeforeDestroy() {
    this.M_1.ClearChildren();
    this.E_1.ClearChildren();
  }
}
exports.ActivityRegressQuestionnaireView = ActivityRegressQuestionnaireView;
//# sourceMappingURL=ActivityRegressQuestionnaireView.js.map