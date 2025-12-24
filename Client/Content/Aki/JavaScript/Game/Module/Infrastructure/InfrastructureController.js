"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const InfrastructureActivityData_1 = require("./Data/InfrastructureActivityData");
const InfrActivityMainView_1 = require("./View/Activity/InfrActivityMainView");
class InfrastructureController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_InfrastructureActivityMain";
  }
  OnCreateSubPageComponent(e) {
    return new InfrActivityMainView_1.InfrActivityMainView();
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["InfrLimitTaskMainView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        return true;
      }
    }
    return false;
  }
  OnCreateActivityData(e) {
    var r = new InfrastructureActivityData_1.InfrastructureActivityData();
    ModelManager_1.ModelManager.InfrastructureModel.SetActivityData(r);
    return r;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(25638, InfrastructureController.D3m);
    Net_1.Net.Register(24081, InfrastructureController.U3m);
    Net_1.Net.Register(19308, InfrastructureController.x3m);
    Net_1.Net.Register(25983, InfrastructureController.k3m);
    Net_1.Net.Register(17165, InfrastructureController.BWm);
    Net_1.Net.Register(22983, InfrastructureController.ZHf);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25638);
    Net_1.Net.UnRegister(24081);
    Net_1.Net.UnRegister(19308);
    Net_1.Net.UnRegister(25983);
    Net_1.Net.UnRegister(17165);
    Net_1.Net.UnRegister(22983);
  }
  static async RequestInfrastructureInfoRequest() {
    var e = Protocol_1.Aki.Protocol.QFm.create();
    var e = await Net_1.Net.CallAsync(29715, e);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 19339) && (ModelManager_1.ModelManager.InfrastructureModel.SetInfrastructureData(e.SNm), true);
  }
  static async RequestInfrastructureArchiveTaskReward() {
    var e;
    var r = ModelManager_1.ModelManager.InfrastructureModel;
    var t = r.GetLibraryTaskDataByTaskState(Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskFinish).map(e => e.TaskId);
    return t.length !== 0 && ((e = Protocol_1.Aki.Protocol.XFm.create()).FLd = t, t = await Net_1.Net.CallAsync(16248, e), !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(t, 15453)) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureArchiveTaskUpdate), UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, r.GetScoreRewardData()), true);
  }
  static async RequestInfrastructurePhoneTaskReward() {
    var e;
    var r = ModelManager_1.ModelManager.InfrastructureModel;
    var t = r.GetPhoneTaskDataByTaskState(Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskFinish).map(e => e.TaskId);
    return t.length !== 0 && ((e = Protocol_1.Aki.Protocol.fNm.create()).FLd = t, t = await Net_1.Net.CallAsync(27820, e), !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(t, 16530)) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructurePhoneTaskUpdate), UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, r.GetScoreRewardData()), true);
  }
  static async RequestInfrastructureLevelUp() {
    var e = Protocol_1.Aki.Protocol.sNm.create();
    var e = await Net_1.Net.CallAsync(16242, e);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 23049);
  }
  static async RequestInfrastructureRoadBuild(e) {
    var r = Protocol_1.Aki.Protocol.hNm.create();
    r.MNm = e;
    var e = await Net_1.Net.CallAsync(24998, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 29507);
  }
  static async RequestInfrastructureManualSwitchTraceRoad(e) {
    var r = Protocol_1.Aki.Protocol.ZFm.create();
    r.MNm = e;
    var r = await Net_1.Net.CallAsync(18047, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(r, 21591) && (ModelManager_1.ModelManager.InfrastructureModel.ChangeTraceRoad(e), true);
  }
  static async RequestInfrManualCancelTraceRoadRequest() {
    var e = Protocol_1.Aki.Protocol.iWm.create();
    var e = await Net_1.Net.CallAsync(20116, e);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 18460) && (ModelManager_1.ModelManager.InfrastructureModel.ChangeTraceRoad(0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureTraceRoadUpdate), true);
  }
  static async RequestInfrastructureFireNotice() {
    var e = Protocol_1.Aki.Protocol.tNm.create();
    var e = await Net_1.Net.CallAsync(18967, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureRoadNoticeUpdate, e?.ENm?.map(e => ({
      RoadId: e.MNm,
      PasserId: e.FNm,
      GiftCount: e.NNm,
      CreateTime: e.aws
    })) ?? []);
    return e;
  }
  static async RequestInfrArchiveReadRequest(e) {
    var r = Protocol_1.Aki.Protocol.oWm.create();
    r.aWm = e;
    var r = await Net_1.Net.CallAsync(23952, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(r, 24062) && (ModelManager_1.ModelManager.InfrastructureModel.SetArchiveRead(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureArchiveReadUpdate), true);
  }
  static async RequestInfrLimitTaskRewardRequest(e, r) {
    var t = Protocol_1.Aki.Protocol.dNm.create();
    t.gps = r;
    var r = await Net_1.Net.CallAsync(19208, t);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(r, 28567);
  }
  static OpenMaterialDelivery(e, r, t, a) {
    e = {
      DeliveryType: e,
      RoadId: r,
      ActionId: t,
      OpenSource: a
    };
    ModelManager_1.ModelManager.InfrastructureModel.SetInteractingRoadId(r);
    UiManager_1.UiManager.OpenView("InfrMaterialsDeliveryView", e);
  }
  static async OpenInfrastructureMainView(e) {
    await ModelManager_1.ModelManager.InfrastructureModel.CreateLoadingPanel().CreateThenShowByResourceIdAsync("UiView_ActivityInfrastructureLoading", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.CG));
    return UiManager_1.UiManager.OpenViewAsync("InfrastructureMainView", e);
  }
  OnShowActivityFirstUnlockView(e) {
    UiManager_1.UiManager.OpenView("InfrOpeningTipsView");
  }
}
(exports.InfrastructureController = InfrastructureController).BWm = e => {
  ModelManager_1.ModelManager.InfrastructureModel.SetFireShopCoinData(e);
};
InfrastructureController.ZHf = e => {
  ModelManager_1.ModelManager.InfrastructureModel.UpdateActivityTaskData(e);
};
InfrastructureController.D3m = e => {
  ModelManager_1.ModelManager.InfrastructureModel.AddFireLevel(e);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureFireExpAdd, e.TNm);
};
InfrastructureController.U3m = e => {
  ModelManager_1.ModelManager.InfrastructureModel.SetFireData(e.INm);
};
InfrastructureController.x3m = e => {
  ModelManager_1.ModelManager.InfrastructureModel.SetRoadData(e.bNm);
};
InfrastructureController.k3m = e => {
  ModelManager_1.ModelManager.InfrastructureModel.SetArchiveTaskData(e.RNm);
  ModelManager_1.ModelManager.InfrastructureModel.SetPhoneTaskData(e.wNm);
  e = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData();
  if (e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
  }
}; //# sourceMappingURL=InfrastructureController.js.map