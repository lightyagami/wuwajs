"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrLimitTaskMainView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const InfrastructureController_1 = require("../../InfrastructureController");
const InfrLimitTaskItem_1 = require("./InfrLimitTaskItem");
class InfrLimitTaskMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.OOe = undefined;
    this.VOe = () => {
      var e = new InfrLimitTaskItem_1.InfrLimitTaskItem();
      e.SetOnClickRewardCb(this.qim);
      return e;
    };
    this.x5m = () => {
      var e = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData();
      if (e) {
        this.OOe.RefreshByData(e.GetActivityTaskDataList());
      }
    };
    this.qim = () => {
      var e;
      var r = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData();
      if (r && (e = r.GetActivityTaskDataListByStatus(Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)).length !== 0) {
        InfrastructureController_1.InfrastructureController.RequestInfrLimitTaskRewardRequest(r.Id, e.map(e => e.ConfigId));
      }
    };
    this.pcr = () => {
      var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetHelpIdActivity();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate, this.x5m);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate, this.x5m);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.pHm()]);
  }
  async pHm() {
    this.OOe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(4).GetOwner(), this.VOe);
    var e = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData()?.GetActivityTaskDataList() ?? [];
    await this.OOe.RefreshByDataAsync(e, false, true);
  }
  OnStart() {
    this.lqe.SetHelpCallBack(this.pcr);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.u3e();
  }
  u3e() {
    var e;
    var r = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData();
    if (r && (e = r.GetActivityCountDownData(), this.GetText(5).SetText(e.CountDownText ?? ""), r.EndOpenTime <= 0)) {
      this.GetItem(6).SetUIActive(false);
    }
  }
}
exports.InfrLimitTaskMainView = InfrLimitTaskMainView;
//# sourceMappingURL=InfrLimitTaskMainView.js.map