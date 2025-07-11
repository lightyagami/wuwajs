"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGamePlayModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const FloroRanchCurrencyData_1 = require("./Data/FloroRanchCurrencyData");
const FloroRanchEntityActionSystem_1 = require("./Entity/FloroRanchEntityActionSystem");
const FloroRanchEntityCreateSystem_1 = require("./Entity/FloroRanchEntityCreateSystem");
const FloroRanchDailyInStageState_1 = require("./FSM/Stage/FloroRanchDailyInStageState");
const FloroRanchStageFsm_1 = require("./FSM/Stage/FloroRanchStageFsm");
class FloroRanchGamePlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ActivityId = 0;
    this.SubInstanceId = 0;
    this.Races = [];
    this.SkillId = 0;
    this.CurStage = 0;
    this.RemindDay = 0;
    this.StageTarget = 0;
    this.StageDayCount = 0;
    this.TotalDayCount = 0;
    this.EnableToyCount = 0;
    this.NSu = 0;
    this.Dlu = false;
    this.IsEndlessMode = false;
    this.CoinData = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(1);
    this.DiamondData = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(2);
    this.AOu = 0;
    this.ShowEntityDebugInfo = true;
    this.Blu = [];
    this.klu = [];
    this.Olu = [];
    this.DungeonEntity = undefined;
    this.RoleEntity = undefined;
    this.N9o = new Map();
    this.lgu = [];
    this.P2i = [];
    this.qlu = undefined;
    this.ZLu = [];
    this.ActionInfoList = [];
    this.NeedReStart = false;
    this.NeedSettle = false;
    this.IsPause = false;
    this.$Ge = (t, i) => {
      var e = this.ZLu.length;
      if (e > 0 && this.ZLu[e - 1] === i) {
        this.ZLu.pop();
      }
    };
    this.FloroRanchTimerSystem = new TimerSystem_1.TimerSystemInstance();
    this.TDe = undefined;
    this.s1t = 1;
    this.uHc = false;
    this.J_ = t => {
      if (!this.IsPause) {
        this.FloroRanchTimerSystem.Tick(t * this.s1t);
      }
    };
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    return true;
  }
  InitGame(t, i, e) {
    this.ActivityId = t;
    this.Races = i;
    this.SkillId = e;
  }
  EnterGame(t) {
    if (this.Dlu) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch进入游戏失败：游戏已经开始");
      }
    } else {
      this.InitData(t.bru);
      this.RefreshDailyTaskData(t.Whu);
      this.ZFu();
      this.InitStateMachine();
      this.ChangeState(1);
    }
  }
  InitStateMachine() {
    this.qlu = new FloroRanchStageFsm_1.FloroRanchStageFsm();
    this.qlu.Init();
  }
  CanFsmInsertDailyTask() {
    var t;
    return this.qlu.GetCurrentStateType() === 2 && !!(t = this.qlu.GetCurrentState()) && !!(t instanceof FloroRanchDailyInStageState_1.FloroRanchDailyInStageState) && !t.IsExecutingTask();
  }
  EnterDailyStage() {
    this.qlu.ChangeState(2);
  }
  ChangeState(t) {
    this.qlu.ChangeState(t);
  }
  PauseGame() {
    if (this.Dlu) {
      if (this.IsPause) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch暂停游戏失败：游戏已经暂停");
        }
      } else {
        this.IsPause = true;
        for (const t of this.GetShowCardEntityList()) {
          t.GetUiItemComponent().Pause();
        }
        this.RoleEntity?.GetUiItemComponent().Pause();
        FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.Pause();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch暂停游戏失败：游戏未开始");
    }
  }
  ResumeGame() {
    if (this.Dlu) {
      if (this.IsPause) {
        this.IsPause = false;
        for (const t of this.GetShowCardEntityList()) {
          t.GetUiItemComponent().Resume();
        }
        this.RoleEntity?.GetUiItemComponent().Resume();
        FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.Resume();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch恢复游戏失败：游戏未暂停");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch恢复游戏失败：游戏未开始");
    }
  }
  ExitGame(t) {
    if (this.Dlu) {
      if (!(this.NeedSettle = t)) {
        ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().SetSavedStage(this.CurStage);
      }
      this.ChangeState(5);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch退出游戏失败：游戏未开始");
    }
  }
  ReStartGame() {
    if (this.Dlu) {
      this.NeedReStart = true;
      this.ChangeState(5);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch退出游戏失败：游戏未开始");
    }
  }
  GameEnd() {
    if (this.Dlu) {
      this.eNu();
      this.ClearData();
      this.CloseAllRecordView();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch退出游戏失败：游戏未开始");
    }
  }
  InitData(t) {
    this.Dlu = true;
    this.RefreshBasicData(t);
    this.InitEntityData(t);
  }
  RefreshBasicData(t) {
    this.SubInstanceId = t.Qiu;
    this.CurStage = t.cru;
    this.CoinData.SetTotal(Number(MathUtils_1.MathUtils.LongToBigInt(t.lru)));
    this.CoinData.SetAmount(Number(MathUtils_1.MathUtils.LongToBigInt(t.xhu)));
    this.DiamondData.SetTotal(Number(MathUtils_1.MathUtils.LongToBigInt(t._ru)));
    this.DiamondData.SetAmount(Number(MathUtils_1.MathUtils.LongToBigInt(t.Uhu)));
    this.StageTarget = Number(MathUtils_1.MathUtils.LongToBigInt(t.Dhu));
    this.EnableToyCount = t.qgu;
    this.IsEndlessMode = t.hUu;
    this.StageDayCount = t.UUu;
    this.TotalDayCount = t.wOu;
    this.RemindDay = t.tGu;
    this.ActionInfoList.length = 0;
  }
  InitEntityData(t) {
    this.N9o.clear();
    this.Blu.length = 0;
    this.klu.length = 0;
    this.Olu.length = 0;
    this.AddEntityList(t.aru);
    this.AddEntityList(t.hru);
    this.AddEntityList(t.uru);
    if (t.xPu) {
      this.DungeonEntity = FloroRanchEntityCreateSystem_1.FloroRanchEntityCreateSystem.CreateFloroRanchEntity(t.xPu);
      this.N9o.set(this.DungeonEntity.EntityId, this.DungeonEntity);
    }
    if (t.RUs) {
      this.RoleEntity = FloroRanchEntityCreateSystem_1.FloroRanchEntityCreateSystem.CreateFloroRanchEntity(t.RUs);
      this.N9o.set(this.RoleEntity.EntityId, this.RoleEntity);
    }
  }
  OnDayStart(t) {
    this.CurStage = t._Uu;
    this.IsEndlessMode = t.s1u;
    this.TotalDayCount = t.wOu;
    this.RemindDay = t.tGu;
  }
  OnStageStart(t) {
    this.StageTarget = Number(MathUtils_1.MathUtils.LongToBigInt(t.j6n));
    this.StageDayCount = t.Ohu;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh);
  }
  AddEntityList(t) {
    for (const i of t) {
      this.AddEntity(i);
    }
  }
  AddEntity(t) {
    var i;
    var e;
    if (!this.N9o.has(t.Ziu)) {
      i = FloroRanchEntityCreateSystem_1.FloroRanchEntityCreateSystem.CreateFloroRanchEntity(t);
      this.N9o.set(i.EntityId, i);
      this.GUu(i.EntityType, i);
      if (i.EntityType === 1) {
        e = this.AOu + 1;
        this.SetOwnCardEntityCount(e);
      }
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch实体Id重复", ["entityId", t.Ziu]);
    }
  }
  RefreshEntityList(t) {
    for (const e of t) {
      var i = this.GetEntity(e.Ziu);
      if (i) {
        i.RefreshEntityData(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch刷新实体数据失败：实体不存在", ["entityId", e.Ziu]);
      }
    }
  }
  RefreshRemoveEntityList(t) {
    for (const i of t) {
      this.GetEntity(i).CheckGetComponent(0).IsRemove = true;
    }
  }
  CheckEntityIsExist(t) {
    return this.N9o.has(t);
  }
  GetEntity(t) {
    if (t <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch获取实体数据失败：实体Id错误", ["entityId", t]);
    }
    if (this.N9o.has(t)) {
      return this.N9o.get(t);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch获取实体数据失败：实体不存在", ["entityId", t]);
    }
  }
  RemoveOwnEntityData(t) {
    t.CheckGetComponent(0).IsRemove = true;
    var i = this.FUu(t.EntityType, t);
    if (i && t.EntityType === 1) {
      i = this.AOu - 1;
      this.SetOwnCardEntityCount(i);
    }
  }
  ClearRemoveEntity() {
    for (const t of this.N9o.values()) {
      if (t.CheckGetComponent(0).IsRemove) {
        this.N9o.delete(t.EntityId);
      }
    }
  }
  OnShopItemPurchased(t) {
    this.OnCurrencyChange(Number(MathUtils_1.MathUtils.LongToBigInt(t.xhu)), Number(MathUtils_1.MathUtils.LongToBigInt(t.Uhu)));
    let i = undefined;
    switch (t.h5n) {
      case Protocol_1.Aki.Protocol.Vcu.Proto_BuyCard:
        i = t.Gcu;
        FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.AddEntity([i.kcu]);
        break;
      case Protocol_1.Aki.Protocol.Vcu.Proto_BuyGardGroup:
        i = t.Fcu;
        this.OpenAndRecordView("FloroRanchCardGroupSelectView", i.Eru);
        break;
      case Protocol_1.Aki.Protocol.Vcu.Proto_BuyToy:
        var e = (i = t.Ncu).qcu;
        if (this.CheckEntityIsExist(e.Ziu)) {
          this.GetEntity(e.Ziu).RefreshEntityData(e);
        } else {
          FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.AddEntity([e]);
        }
    }
  }
  OnTributeResult(t) {
    this.RemindDay = t.tGu;
    this.CurStage = t._Uu;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh);
    var i = Number(MathUtils_1.MathUtils.LongToBigInt(t.xhu));
    var t = Number(MathUtils_1.MathUtils.LongToBigInt(t.Uhu));
    this.OnCurrencyChange(i, t);
  }
  OnCurrencyChange(t, i) {
    this.CoinData.SetAmount(t);
    this.DiamondData.SetAmount(i);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchCurrencyChange);
  }
  OpenAndRecordView(s, t, h) {
    UiManager_1.UiManager.OpenView(s, t, (t, i) => {
      var e;
      if (t) {
        t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
        e = UiManager_1.UiManager.GetView(i);
        t.AddChild(e);
        this.ZLu.push(i);
        h?.();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch打开界面失败", ["viewName", s]);
      }
    });
  }
  ShowRecordView() {
    for (const i of this.ZLu) {
      var t = UiManager_1.UiManager.GetView(i);
      if (t) {
        t.SetActive(true);
      }
    }
    UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView").SetShowButtonActive(false);
  }
  HideRecordView() {
    for (const i of this.ZLu) {
      var t = UiManager_1.UiManager.GetView(i);
      if (t) {
        t.SetActive(false);
      }
    }
    UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView").SetShowButtonActive(true);
  }
  CloseAllRecordView() {
    for (const t of this.ZLu) {
      UiManager_1.UiManager.CloseViewById(t);
    }
    this.ZLu.length = 0;
  }
  get OwnCardEntityCount() {
    return this.AOu;
  }
  SetOwnCardEntityCount(t) {
    this.AOu = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange);
  }
  ClearData() {
    this.Dlu = false;
    this.ActivityId = 0;
    this.SubInstanceId = 0;
    this.Races.length = 0;
    this.SkillId = 0;
    this.CurStage = 0;
    this.RemindDay = 0;
    this.Blu.length = 0;
    this.klu.length = 0;
    this.Olu.length = 0;
    this.DungeonEntity = undefined;
    this.RoleEntity = undefined;
    this.P2i.length = 0;
    this.qlu = undefined;
    this.IsPause = false;
    this.ZLu.length = 0;
    this.NSu = 0;
    this.lgu.length = 0;
    this.AOu = 0;
    this.NeedReStart = false;
    this.ActionInfoList.length = 0;
    this.N9o.clear();
  }
  RefreshDailyTaskData(t) {
    this.P2i = t;
  }
  GetDailyTaskList() {
    var t = [...this.P2i];
    this.P2i.length = 0;
    return t;
  }
  GUu(t, i) {
    switch (t) {
      case 0:
        this.Blu.push(i);
        break;
      case 1:
        this.klu.push(i);
        break;
      case 2:
        this.Olu.push(i);
        break;
      case 3:
        if (this.DungeonEntity) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch添加实体失败：DungeonEntity已存在 不可重复添加", ["entityId", i.EntityId]);
          }
        } else {
          this.DungeonEntity = i;
        }
        break;
      case 4:
        if (this.RoleEntity) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch添加实体失败：RoleEntity已存在 不可重复添加", ["entityId", i.EntityId]);
          }
        } else {
          this.RoleEntity = i;
        }
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch添加实体失败：EntityType错误", ["type", t]);
        }
    }
  }
  FUu(t, i) {
    let e = -1;
    switch (t) {
      case 0:
        if ((e = this.Blu.indexOf(i)) !== -1) {
          this.Blu.splice(e, 1);
        }
        break;
      case 1:
        if ((e = this.klu.indexOf(i)) !== -1) {
          this.klu.splice(e, 1);
        }
        break;
      case 2:
        if ((e = this.Olu.indexOf(i)) !== -1) {
          this.Olu.splice(e, 1);
        }
        break;
      case 3:
        this.DungeonEntity = undefined;
        break;
      case 4:
        this.RoleEntity = undefined;
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch移除实体失败：EntityType错误", ["type", t]);
        }
    }
    var s = e !== -1;
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch移除实体失败：实体不存在", ["entityId", i.EntityId]);
      }
    }
    return s;
  }
  GetShowCardEntityList() {
    var t = [];
    for (const e of this.klu) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point !== -1) {
        t.push(e);
      }
    }
    return t;
  }
  GetShowToyEntityList() {
    var t = [];
    for (const e of this.Olu) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point !== -1) {
        t.push(e);
      }
    }
    return t;
  }
  GetCurToyCount() {
    return this.GetShowToyEntityList().length;
  }
  GetShowTerrainEntityList() {
    var t = [];
    for (const e of this.Blu) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point !== -1) {
        t.push(e);
      }
    }
    return t;
  }
  GetCardEntityByPoint(t) {
    for (const e of this.klu) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point === t) {
        return e;
      }
    }
  }
  GetTerrainEntityByPoint(t) {
    for (const e of this.Blu) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point === t) {
        return e;
      }
    }
  }
  GetToyEntityByPoint(t) {
    for (const e of this.Olu) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point === t) {
        return e;
      }
    }
  }
  ClearLastDayIncome() {
    this.NSu = 0;
    for (const t of this.N9o.values()) {
      t.CheckGetComponent(0).Income = 0;
    }
  }
  RefreshLastIncomeEntityList() {
    this.lgu.length = 0;
    for (const t of this.N9o.values()) {
      this.lgu.push(t);
    }
    this.lgu.sort((t, i) => {
      t = t.CheckGetComponent(0);
      i = i.CheckGetComponent(0);
      if (i.Income !== t.Income) {
        return i.Income - t.Income;
      } else if (i.Point !== -1 != (t.Point !== -1)) {
        if (i.Point !== -1) {
          return 1;
        } else {
          return -1;
        }
      } else if (i.EntityType !== t.EntityType) {
        return i.EntityType - t.EntityType;
      } else if (i.EntityId !== t.EntityId) {
        return i.EntityId - t.EntityId;
      } else {
        return t.EntityId - i.EntityId;
      }
    });
  }
  GetLastIncomeEntityList(e, t, s) {
    let i = this.lgu;
    let h = (i = i.filter(t => {
      var i = t.EntityType;
      return !!this.CheckEntityTypeIsVisible(i) && !(t = t.GetPoint(), !s && t === -1) && (e.FilterTypeId < 0 || e.FilterTypeId === i);
    })).map((t, i) => ({
      EntityData: t,
      Rank: i + 1
    }));
    return h = t ? h : h.slice().reverse();
  }
  GetLastDayIncome() {
    return this.NSu;
  }
  AddLastDayIncome(t) {
    this.NSu += t;
  }
  SetStageTarget(t) {
    this.StageTarget = t;
  }
  GetStageTarget() {
    return this.StageTarget;
  }
  CheckEntityTypeIsVisible(t) {
    return t === 1 || t === 2 || t === 0;
  }
  ZFu() {
    if (this.TDe) {
      this._1o();
    }
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME);
    this.s1t = 1;
    this.uHc = false;
  }
  eNu() {
    this._1o();
    this.s1t = 1;
    this.uHc = false;
  }
  _1o() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.TDe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  SetTimeDilation(t) {
    this.s1t = t;
  }
  GetTimeDilation() {
    return this.s1t;
  }
  get IsSkip() {
    return this.uHc;
  }
  set IsSkip(t) {
    this.uHc = t;
  }
}
exports.FloroRanchGamePlayModel = FloroRanchGamePlayModel;
//# sourceMappingURL=FloroRanchGamePlayModel.js.map