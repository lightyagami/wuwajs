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
    this.lff = 0;
    this.RCf = undefined;
    this.q3m = new Map();
    this.O3m = 0;
    this.G3m = 0;
    this.NeedHighlightTrackedRoadInner = false;
    this.F3m = 0;
    this.N3m = 0;
    this.V3m = 0;
    this.j3m = Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock;
    this.H3m = 0;
    this.r$m = 0;
    this.$3m = new Map();
    this.W3m = new Map();
    this.o$m = [];
    this.CNe = undefined;
  }
  get TracedRoadId() {
    return this.O3m;
  }
  get RecommendRoadId() {
    return this.G3m;
  }
  get FireExp() {
    return this.F3m;
  }
  get FireLevel() {
    if (this.N3m > 0) {
      return this.N3m;
    } else {
      return 1;
    }
  }
  get FireLevelReachTime() {
    return this.V3m;
  }
  get FireStatus() {
    return this.j3m;
  }
  get MoneyCount() {
    return this.H3m;
  }
  get MoneyHistorySpent() {
    return this.r$m;
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
    for (const e of this.$3m.values()) {
      if (e.Status === Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskFinish) {
        return true;
      }
    }
    return false;
  }
  GetPhoneTaskRedDot() {
    for (const e of this.W3m.values()) {
      if (e.Status === Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskFinish) {
        return true;
      }
    }
    return false;
  }
  GetUnreadArchives() {
    return this.o$m;
  }
  SetArchiveRead(t) {
    this.o$m = this.o$m.filter(e => !t.includes(e));
  }
  GetArchiveIsUnRead(e) {
    return this.o$m.includes(e);
  }
  get InteractingRoadId() {
    return this.lff;
  }
  SetInteractingRoadId(e) {
    this.lff = e;
  }
  OnInit() {
    return true;
  }
  SetInfrastructureData(e) {
    this.SetRoadData(e.bNm);
    this.SetFireData(e.INm);
    this.SetLibraryData(e.PNm);
  }
  GetRoadDataByRoadId(e) {
    return this.q3m.get(e);
  }
  SetRoadData(e) {
    this.q3m.clear();
    e.pom.forEach(e => {
      this.q3m.set(e.MNm, {
        RoadId: e.MNm,
        Status: e.H6n,
        CompleteTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.qNm)),
        TotalGiftCount: Number(MathUtils_1.MathUtils.LongToBigInt(e.ONm)),
        LastGiftTime: Number(MathUtils_1.MathUtils.LongToBigInt(e.GNm))
      });
    });
    this.O3m = e.BNm;
    this.G3m = e.kNm;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureRoadDataUpdate);
  }
  ChangeTraceRoad(e) {
    this.O3m = e;
  }
  GetHasUnlockRoadAndNotPlaySeqMark() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrRoadMarkUnlockRecord) ?? new Set();
    var t = [];
    for (const r of this.q3m.values()) {
      if (r.Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress && !e.has(r.RoadId)) {
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
    return Array.from(this.q3m.keys()).filter(e => this.q3m.get(e).Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete);
  }
  SetFireData(e) {
    this.F3m = Number(MathUtils_1.MathUtils.LongToBigInt(e.ANm));
    this.N3m = e.DNm;
    this.V3m = Number(MathUtils_1.MathUtils.LongToBigInt(e.UNm));
    this.j3m = e.xNm;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureFireDataUpdate);
  }
  AddFireLevel(e) {
    this.SetFireData(e.INm);
  }
  SetFireShopCoinData(e) {
    this.H3m = Number(MathUtils_1.MathUtils.LongToBigInt(e.LNm));
    this.r$m = Number(MathUtils_1.MathUtils.LongToBigInt(e.hWm));
  }
  SetLibraryData(e) {
    this.SetArchiveTaskData(e.RNm);
    this.SetPhoneTaskData(e.wNm);
    this.SetUnreadArchives(e.lWm);
  }
  SetArchiveTaskData(e) {
    this.$3m.clear();
    e.forEach(e => {
      this.$3m.set(e.gps, {
        TaskId: e.gps,
        Target: e.j6n,
        Status: e.H6n
      });
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructureArchiveTaskUpdate);
  }
  SetPhoneTaskData(e) {
    this.W3m.clear();
    e.forEach(e => {
      this.W3m.set(e.gps, {
        TaskId: e.gps,
        Target: e.j6n,
        Status: e.H6n
      });
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InfrastructurePhoneTaskUpdate);
  }
  SetUnreadArchives(e) {
    this.o$m = e;
  }
  SetLibraryTaskData(e) {
    this.SetArchiveTaskData(e.RNm);
    this.SetPhoneTaskData(e.wNm);
  }
  GetLibraryTaskDataByTaskId(e) {
    return this.$3m.get(e);
  }
  GetLibraryTaskDataByTaskState(t) {
    return [...this.$3m.values()].filter(e => e.Status === t);
  }
  GetLibraryTaskData() {
    return [...this.$3m.values()];
  }
  GetPhoneTaskDataByTaskId(e) {
    return this.W3m.get(e);
  }
  GetPhoneTaskDataByTaskState(t) {
    return [...this.W3m.values()].filter(e => e.Status === t);
  }
  GetPhoneTaskData() {
    return [...this.W3m.values()];
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
      DataPageList: [this.Q3m(), this.K3m()],
      Source: "Infrastructure",
      TitleTextId: "PrefabTextItem_1336900617_Text"
    };
  }
  Q3m() {
    const a = [];
    ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrArchiveTaskList().forEach(e => {
      var t = this.GetLibraryTaskDataByTaskId(e.TaskId);
      var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.TaskReward);
      var t = t?.Status ?? Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskRunning;
      var e = {
        Id: e.TaskId,
        NameText: "",
        NameTextId: "BuildArchives_GeneralTask",
        NameTextArgs: [e.Target.toString()],
        RewardList: r,
        RewardState: InfrastructureDefine_1.infrTaskStateToRewardStateResolver[t],
        RewardButtonTextId: InfrastructureDefine_1.infrTaskStateToRewardText[t],
        RewardButtonRedDot: t === Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskTaken,
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
  K3m() {
    const a = [];
    ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrPhoneTaskList().forEach(e => {
      var t = this.GetPhoneTaskDataByTaskId(e.TaskId);
      var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.TaskReward);
      var t = t?.Status ?? Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskRunning;
      var e = {
        Id: e.TaskId,
        NameText: "",
        NameTextId: "BuildArchives_GeneralCommunication",
        NameTextArgs: [e.Target.toString()],
        RewardList: r,
        RewardState: InfrastructureDefine_1.infrTaskStateToRewardStateResolver[t],
        RewardButtonTextId: InfrastructureDefine_1.infrTaskStateToRewardText[t],
        RewardButtonRedDot: t === Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskTaken,
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
      return this.GetLibraryTaskDataByTaskId(e.TaskId)?.Status === Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskFinish;
    });
    var t = t.some(e => {
      return this.GetPhoneTaskDataByTaskId(e.TaskId)?.Status === Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskFinish;
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
    if (this.RCf && (this.DestroyLoadingPanel(), Log_1.Log.CheckError())) {
      Log_1.Log.Error("Infrastructure", 86, "LoadingPanel is not undefined");
    }
    this.RCf = new InfrastructureLoadingPanel_1.InfrastructureLoadingPanel();
    return this.RCf;
  }
  CloseLoadingPanel() {
    this.RCf?.CloseSelf();
  }
  DestroyLoadingPanel() {
    this.RCf?.Destroy();
    this.RCf = undefined;
  }
}
exports.InfrastructureModel = InfrastructureModel;
//# sourceMappingURL=InfrastructureModel.js.map