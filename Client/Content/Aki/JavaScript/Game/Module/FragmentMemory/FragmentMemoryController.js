"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FragmentMemoryController = exports.INFO_FRAGMENTMEMORYITEM = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const FragmentMemoryActivityData_1 = require("./FragmentMemoryActivityData");
exports.INFO_FRAGMENTMEMORYITEM = 70140004;
class FragmentMemoryController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSpecialItemUse, this.e9e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateViewInstance, this.AHe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSpecialItemUse, this.e9e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateViewInstance, this.AHe);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28813, this.ewn);
    Net_1.Net.Register(16999, this.twn);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28813);
    Net_1.Net.UnRegister(16999);
  }
  static t6i() {
    if (ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId !== 0 && !UiManager_1.UiManager.IsViewShow("ObtainFragmentView") && UiManager_1.UiManager.IsViewShow("BattleView")) {
      if (ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId === ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackFragmentId) {
        ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity();
      }
      UiManager_1.UiManager.OpenView("ObtainFragmentView", ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId);
    }
  }
  static RequestPhotoMemory() {
    Net_1.Net.Call(26596, Protocol_1.Aki.Protocol.Afs.create(), e => {
      ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryResponse(e);
    });
  }
  static RequestMemoryReward(e) {
    var t = Protocol_1.Aki.Protocol.xfs.create();
    t.QVn = e;
    Net_1.Net.Call(29495, t, e => {
      if (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 18306);
      }
    });
  }
  static OpenFragmentMemoryView() {
    UiManager_1.UiManager.OpenView("MemoryDetailView");
  }
}
exports.FragmentMemoryController = FragmentMemoryController;
(_a = FragmentMemoryController).xkt = () => {
  _a.RequestPhotoMemory();
};
FragmentMemoryController.ewn = e => {
  const t = ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectedIds();
  ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryUpdate(e);
  e = ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectedIds().filter(e => !t.includes(e));
  if (e.length > 0) {
    ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId = e[0];
  }
  _a.t6i();
  for (const r of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
    if (r instanceof FragmentMemoryActivityData_1.FragmentMemoryActivityData) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, r.Id);
    }
  }
};
FragmentMemoryController.JDe = () => {
  _a.t6i();
};
FragmentMemoryController.twn = e => {
  ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryCollectUpdate(e);
  ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity();
};
FragmentMemoryController.e9e = (e, t) => {
  if (e === exports.INFO_FRAGMENTMEMORYITEM) {
    _a.OpenFragmentMemoryView();
  }
};
FragmentMemoryController.AHe = e => {
  if (e.Info.Name === "CommonActivityView") {
    ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation = "";
  }
}; //# sourceMappingURL=FragmentMemoryController.js.map