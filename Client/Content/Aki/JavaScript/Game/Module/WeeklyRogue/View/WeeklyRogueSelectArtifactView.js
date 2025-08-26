"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueSelectArtifactView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const WeeklyRogueArtifactItem_1 = require("../Components/WeeklyRogueArtifactItem");
const WeeklyRogueCaptionItem_1 = require("../Components/WeeklyRogueCaptionItem");
const WeeklyRogueController_1 = require("../WeeklyRogueController");
class WeeklyRogueSelectArtifactView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lV_ = undefined;
    this.lqe = undefined;
    this.oEc = () => {
      var e = () => {
        UiManager_1.UiManager.ResetToBattleView();
      };
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(278);
      t.FunctionMap.set(1, e);
      t.FunctionMap.set(0, e);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.tV_ = () => {
      var e = new WeeklyRogueArtifactItem_1.WeeklyRogueArtifactItem();
      e.OnSelectedChange = this.ELt;
      return e;
    };
    this.ELt = e => {
      if (e === undefined) {
        this.lV_?.DeselectCurrentGridProxy();
        this.GetButton(3).SetSelfInteractive(false);
      } else {
        this.lV_?.SelectGridProxy(e);
        this.GetButton(3).SetSelfInteractive(true);
      }
    };
    this.ilo = () => {
      UiLayer_1.UiLayer.SetShowMaskLayer("WeeklyRogueSelectArtifactView.SelectArtifactRequest", true);
      WeeklyRogueController_1.WeeklyRogueController.Instance?.SelectArtifactRequest().then(e => {
        if (e) {
          e = ModelManager_1.ModelManager.WeeklyRogueModel.SelectRoleIdList;
          WeeklyRogueController_1.WeeklyRogueController.Instance?.RogueWeeklyStartRequest(e);
        }
      }).finally(() => {
        UiLayer_1.UiLayer.SetShowMaskLayer("WeeklyRogueSelectArtifactView.SelectArtifactRequest", false);
      });
    };
    this.tlo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.ilo]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.lV_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.tV_);
    this.lqe = new WeeklyRogueCaptionItem_1.WeeklyRogueCaptionItem(false);
    this.lqe.SetCloseCallBack(this.tlo);
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.lV_.RefreshByDataAsync(e)]);
    this.GetButton(3).SetSelfInteractive(false);
  }
  OnBeforeShow() {
    this.lV_.PlayGridAnim();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
  }
}
exports.WeeklyRogueSelectArtifactView = WeeklyRogueSelectArtifactView;
//# sourceMappingURL=WeeklyRogueSelectArtifactView.js.map