"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const InfrastructureController_1 = require("./InfrastructureController");
const InfrastructureDefine_1 = require("./InfrastructureDefine");
const InfrastructureLoadingPanel_1 = require("./View/Main/InfrastructureLoadingPanel");
class InfrastructureModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.b0f = 0;
    this.uyf = undefined;
    this.i5m = new Map();
    this.r5m = 0;
    this.o5m = 0;
    this.NeedHighlightTrackedRoadInner = false;
    this.n5m = 0;
    this.s5m = 0;
    this.a5m = 0;
    this.h5m = Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock;
    this.l5m = 0;
    this.tQm = 0;
    this._5m = new Map();
    this.u5m = new Map();
    this.iQm = [];
    this.CNe = undefined;
  }
  get TracedRoadId() {
    return this.r5m;
  }
  get RecommendRoadId() {
    return this.o5m;
  }
  get FireExp() {
    return this.n5m;
  }
  get FireLevel() {
    if (this.s5m > 0) {
      return this.s5m;
    } else {
      return 1;
    }
  }
  get FireLevelReachTime() {
    return this.a5m;
  }
  get FireStatus() {
    return this.h5m;
  }
  get MoneyCount() {
    return this.l5m;
  }
  get MoneyHistorySpent() {
    return this.tQm;
  }
  get NeedHighlightTrackedRoad() {
    return this.NeedHighlightTrackedRoadInner;
  }
  SetNeedHighlightTrackedRoad(e) {
    this.NeedHighlightTrackedRoadInner = e;
  }
  GetInfrRecordObservatoryLevel() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrRecordObservatoryLevel) ?? 1;
  }
  GetShopHasNewRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrRecordObservatoryLevel) ?? 1;
    return this.FireLevel > e;
  }
  RefreshShopHasNewRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrRecordObservatoryLevel, this.FireLevel);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureShopRedDotUpdate);
    if (this.CNe) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.CNe.Id);
    }
  }
  GetLibraryTaskRedDot() {
    for (const e of this._5m.values()) {
      if (e.Status === Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskFinish) {
        return true;
      }
    }
    return false;
  }
  GetPhoneTaskRedDot() {
    for (const e of this.u5m.values()) {
      if (e.Status === Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskFinish) {
        return true;
      }
    }
    return false;
  }
  GetUnreadArchives() {
    return this.iQm;
  }
  SetArchiveRead(t) {
    this.iQm = this.iQm.filter(e => !t.includes(e));
  }
  GetArchiveIsUnRead(e) {
    return this.iQm.includes(e);
  }
  get InteractingRoadId() {
    return this.b0f;
  }
  SetInteractingRoadId(e) {
    this.b0f = e;
  }
  OnInit() {
    return true;
  }
  SetInfrastructureData(e) {
    this.SetRoadData(e.$3m);
    this.SetFireData(e.j3m);
    this.SetLibraryData(e.X3m);
  }
  GetRoadDataByRoadId(e) {
    return this.i5m.get(e);
  }
  SetRoadData(e) {
    this.i5m.clear();
    e.pom.forEach(e => {
      this.i5m.set(e.N3m, {
        RoadId: e.N3m,
        Status: e.H6n,
        CompleteTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.i4m)),
        TotalGiftCount: Number(MathUtils_1.MathUtils.LongToBigInt(e.r4m)),
        LastGiftTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.o4m))
      });
    });
    this.r5m = e.e4m;
    this.o5m = e.t4m;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureRoadDataUpdate);
  }
  ChangeTraceRoad(e) {
    this.r5m = e;
  }
  GetHasUnlockRoadAndNotPlaySeqMark() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrRoadMarkUnlockRecord) ?? new Set();
    var t = [];
    for (const r of this.i5m.values()) {
      if (r.Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress && !e.has(r.RoadId)) {
        t.push(r.RoadId);
      }
    }
    return t;
  }
  SetUnlockRoadMarkPlaySeq(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrRoadMarkUnlockRecord) ?? new Set();
    t.add(e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrRoadMarkUnlockRecord, t);
  }
  GetRoadMaterialEnough(e) {
    e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(e);
    e = Array.from(e.Requirement.entries());
    const r = ModelManager_1.ModelManager.InventoryModel;
    return e.every(([e, t]) => r.GetItemCountByConfigId(e) >= t);
  }
  GetCompleteRoadIds() {
    return Array.from(this.i5m.keys()).filter(e => this.i5m.get(e).Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete);
  }
  SetFireData(e) {
    this.n5m = Number(MathUtils_1.MathUtils.LongToBigInt(e.Y3m));
    this.s5m = e.z3m;
    this.a5m = Number(MathUtils_1.MathUtils.LongToBigInt(e.J3m));
    this.h5m = e.Z3m;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureFireDataUpdate);
  }
  AddFireLevel(e) {
    this.SetFireData(e.j3m);
  }
  SetFireShopCoinData(e) {
    this.l5m = Number(MathUtils_1.MathUtils.LongToBigInt(e.K3m));
    this.tQm = Number(MathUtils_1.MathUtils.LongToBigInt(e.iKm));
  }
  SetLibraryData(e) {
    this.SetArchiveTaskData(e.W3m);
    this.SetPhoneTaskData(e.Q3m);
    this.SetUnreadArchives(e.rKm);
  }
  SetArchiveTaskData(e) {
    this._5m.clear();
    e.forEach(e => {
      this._5m.set(e.gps, {
        TaskId: e.gps,
        Target: e.j6n,
        Status: e.H6n
      });
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureArchiveTaskUpdate);
  }
  SetPhoneTaskData(e) {
    this.u5m.clear();
    e.forEach(e => {
      this.u5m.set(e.gps, {
        TaskId: e.gps,
        Target: e.j6n,
        Status: e.H6n
      });
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructurePhoneTaskUpdate);
  }
  SetUnreadArchives(e) {
    this.iQm = e;
  }
  SetLibraryTaskData(e) {
    this.SetArchiveTaskData(e.W3m);
    this.SetPhoneTaskData(e.Q3m);
  }
  GetLibraryTaskDataByTaskId(e) {
    return this._5m.get(e);
  }
  GetLibraryTaskDataByTaskState(t) {
    return [...this._5m.values()].filter(e => e.Status === t);
  }
  GetLibraryTaskData() {
    return [...this._5m.values()];
  }
  GetPhoneTaskDataByTaskId(e) {
    return this.u5m.get(e);
  }
  GetPhoneTaskDataByTaskState(t) {
    return [...this.u5m.values()].filter(e => e.Status === t);
  }
  GetPhoneTaskData() {
    return [...this.u5m.values()];
  }
  GetShopDataList(e) {
    e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(219, e);
    if (ModelManager_1.ModelManager.PayShopModel.ReadShopItemCheckFlag(219)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureFireShopRefresh);
    }
    return e;
  }
  GetAllShopCurrencyNum() {
    let e = 0;
    for (const r of ConfigManager_1.ConfigManager.InfrastructureConfig.GetAllLevelConfigs().map(e => e.Level).filter(e => e > 1).flatMap(e => this.GetShopDataList(e))) {
      var t = r.GetPriceData();
      if (t.CurrencyId === InfrastructureDefine_1.INFR_SHOP_CURRENCY_ID) {
        e += t.NowPrice * r.GetGoodsData().BuyLimit;
      }
    }
    return e;
  }
  SetActivityData(e) {
    this.CNe = e;
  }
  GetActivityData() {
    if (this.CNe) {
      return this.CNe;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Infrastructure", 86, "InfrastructureActivityData is undefined");
    }
  }
  GetOpenShopId() {
    return 219;
  }
  UpdateActivityTaskData(e) {
    this.CNe?.UpdateActivityTaskData(e.T$s);
    if (this.CNe) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.CNe.Id);
    }
  }
  GetScoreRewardData() {
    return {
      DataPageList: [this.c5m(), this.d5m()],
      Source: "Infrastructure",
      TitleTextId: "PrefabTextItem_1336900617_Text"
    };
  }
  c5m() {
    const a = [];
    ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrArchiveTaskList().forEach(e => {
      var t = this.GetLibraryTaskDataByTaskId(e.TaskId);
      var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.TaskReward);
      var t = t?.Status ?? Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskRunning;
      var e = {
        Id: e.TaskId,
        NameText: "",
        NameTextId: "BuildArchives_GeneralTask",
        NameTextArgs: [e.Target.toString()],
        RewardList: r,
        RewardState: InfrastructureDefine_1.infrTaskStateToRewardStateResolver[t],
        RewardButtonTextId: InfrastructureDefine_1.infrTaskStateToRewardText[t],
        RewardButtonRedDot: t === Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskTaken,
        ClickFunction: () => {
          InfrastructureController_1.InfrastructureController.RequestInfrastructureArchiveTaskReward();
        }
      };
      a.push(e);
    });
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BuildRoadFile_RecordsPage");
    return {
      TabName: e,
      DataList: a
    };
  }
  d5m() {
    const a = [];
    ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrPhoneTaskList().forEach(e => {
      var t = this.GetPhoneTaskDataByTaskId(e.TaskId);
      var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.TaskReward);
      var t = t?.Status ?? Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskRunning;
      var e = {
        Id: e.TaskId,
        NameText: "",
        NameTextId: "BuildArchives_GeneralCommunication",
        NameTextArgs: [e.Target.toString()],
        RewardList: r,
        RewardState: InfrastructureDefine_1.infrTaskStateToRewardStateResolver[t],
        RewardButtonTextId: InfrastructureDefine_1.infrTaskStateToRewardText[t],
        RewardButtonRedDot: t === Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskTaken,
        ClickFunction: () => {
          InfrastructureController_1.InfrastructureController.RequestInfrastructurePhoneTaskReward();
        }
      };
      a.push(e);
    });
    var e = {
      TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BuildRoadFile_MessagePage"),
      DataList: a
    };
    return e;
  }
  GetArchiveRedDot() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrArchiveTaskList();
    var t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrPhoneTaskList();
    var e = e.some(e => {
      return this.GetLibraryTaskDataByTaskId(e.TaskId)?.Status === Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskFinish;
    });
    var t = t.some(e => {
      return this.GetPhoneTaskDataByTaskId(e.TaskId)?.Status === Protocol_1.Aki.Protocol.f4m.Proto_InfrTaskFinish;
    });
    return e || t;
  }
  GetCurrentQuestId() {
    var t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(this.FireLevel);
    if (t.QuestIds.length === 0) {
      return 0;
    }
    let r = 0;
    for (let e = 0; e < t.QuestIds.length; e++) {
      var a = t.QuestIds[e];
      var a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(a);
      if (a && a.CanShowInUiPanel()) {
        r = e;
        break;
      }
    }
    return t.QuestIds[r];
  }
  CreateLoadingPanel() {
    if (this.uyf && (this.DestroyLoadingPanel(), Log_1.Log.CheckError())) {
      Log_1.Log.Error("Infrastructure", 86, "LoadingPanel is not undefined");
    }
    this.uyf = new InfrastructureLoadingPanel_1.InfrastructureLoadingPanel();
    return this.uyf;
  }
  CloseLoadingPanel() {
    this.uyf?.CloseSelf();
  }
  DestroyLoadingPanel() {
    this.uyf?.Destroy();
    this.uyf = undefined;
  }
}
exports.InfrastructureModel = InfrastructureModel;
//# sourceMappingURL=InfrastructureModel.js.map