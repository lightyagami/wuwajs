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
    Net_1.Net.Register(15504, InfrastructureController.z4m);
    Net_1.Net.Register(22186, InfrastructureController.J4m);
    Net_1.Net.Register(15976, InfrastructureController.Z4m);
    Net_1.Net.Register(17799, InfrastructureController.t5m);
    Net_1.Net.Register(22231, InfrastructureController.LKm);
    Net_1.Net.Register(26149, InfrastructureController.cig);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15504);
    Net_1.Net.UnRegister(22186);
    Net_1.Net.UnRegister(15976);
    Net_1.Net.UnRegister(17799);
    Net_1.Net.UnRegister(22231);
    Net_1.Net.UnRegister(26149);
  }
  static async RequestInfrastructureInfoRequest() {
    var e = Protocol_1.Aki.Protocol.c3m.create();
    var e = await Net_1.Net.CallAsync(22166, e);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 18097) && (ModelManager_1.ModelManager.InfrastructureModel.SetInfrastructureData(e.F3m), true);
  }
  static async RequestInfrastructureArchiveTaskReward() {
    var e;
    var r = ModelManager_1.ModelManager.InfrastructureModel;
    var t = r.GetLibraryTaskDataByTaskState(Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskFinish).map(e => e.TaskId);
    return t.length !== 0 && ((e = Protocol_1.Aki.Protocol.m3m.create()).FLd = t, t = await Net_1.Net.CallAsync(15623, e), !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(t, 19721)) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureArchiveTaskUpdate), UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, r.GetScoreRewardData()), true);
  }
  static async RequestInfrastructurePhoneTaskReward() {
    var e;
    var r = ModelManager_1.ModelManager.InfrastructureModel;
    var t = r.GetPhoneTaskDataByTaskState(Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskFinish).map(e => e.TaskId);
    return t.length !== 0 && ((e = Protocol_1.Aki.Protocol.x3m.create()).FLd = t, t = await Net_1.Net.CallAsync(25729, e), !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(t, 29967)) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructurePhoneTaskUpdate), UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, r.GetScoreRewardData()), true);
  }
  static async RequestInfrastructureLevelUp() {
    var e = Protocol_1.Aki.Protocol.T3m.create();
    var e = await Net_1.Net.CallAsync(15575, e);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 15875);
  }
  static async RequestInfrastructureRoadBuild(e) {
    var r = Protocol_1.Aki.Protocol.R3m.create();
    r.N3m = e;
    var e = await Net_1.Net.CallAsync(27535, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 18499);
  }
  static async RequestInfrastructureManualSwitchTraceRoad(e) {
    var r = Protocol_1.Aki.Protocol.p3m.create();
    r.N3m = e;
    var r = await Net_1.Net.CallAsync(22471, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(r, 19082) && (ModelManager_1.ModelManager.InfrastructureModel.ChangeTraceRoad(e), true);
  }
  static async RequestInfrManualCancelTraceRoadRequest() {
    var e = Protocol_1.Aki.Protocol.YQm.create();
    var e = await Net_1.Net.CallAsync(15699, e);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 22753) && (ModelManager_1.ModelManager.InfrastructureModel.ChangeTraceRoad(0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureTraceRoadUpdate), true);
  }
  static async RequestInfrastructureFireNotice() {
    var e = Protocol_1.Aki.Protocol.y3m.create();
    var e = await Net_1.Net.CallAsync(22457, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureRoadNoticeUpdate, e?.V3m?.map(e => ({
      RoadId: e.N3m,
      PasserId: e.n4m,
      GiftCount: e.s4m,
      CreateTime: e.aws
    })) ?? []);
    return e;
  }
  static async RequestInfrArchiveReadRequest(e) {
    var r = Protocol_1.Aki.Protocol.JQm.create();
    r.tKm = e;
    var r = await Net_1.Net.CallAsync(26618, r);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(r, 16702) && (ModelManager_1.ModelManager.InfrastructureModel.SetArchiveRead(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureArchiveReadUpdate), true);
  }
  static async RequestInfrLimitTaskRewardRequest(e, r) {
    var t = Protocol_1.Aki.Protocol.D3m.create();
    t.gps = r;
    var r = await Net_1.Net.CallAsync(21304, t);
    return !ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(r, 23024);
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
(exports.InfrastructureController = InfrastructureController).LKm = e => {
  ModelManager_1.ModelManager.InfrastructureModel.SetFireShopCoinData(e);
};
InfrastructureController.cig = e => {
  ModelManager_1.ModelManager.InfrastructureModel.UpdateActivityTaskData(e);
};
InfrastructureController.z4m = e => {
  ModelManager_1.ModelManager.InfrastructureModel.AddFireLevel(e);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureFireExpAdd, e.H3m);
};
InfrastructureController.J4m = e => {
  ModelManager_1.ModelManager.InfrastructureModel.SetFireData(e.j3m);
};
InfrastructureController.Z4m = e => {
  ModelManager_1.ModelManager.InfrastructureModel.SetRoadData(e.$3m);
};
InfrastructureController.t5m = e => {
  ModelManager_1.ModelManager.InfrastructureModel.SetArchiveTaskData(e.W3m);
  ModelManager_1.ModelManager.InfrastructureModel.SetPhoneTaskData(e.Q3m);
  e = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData();
  if (e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
  }
}; //# sourceMappingURL=InfrastructureController.js.map