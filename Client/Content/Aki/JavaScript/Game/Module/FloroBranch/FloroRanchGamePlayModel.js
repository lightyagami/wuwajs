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
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const FloroRanchCurrencyData_1 = require("./Data/FloroRanchCurrencyData");
const FloroRanchEntityActionSystem_1 = require("./Entity/FloroRanchEntityActionSystem");
const FloroRanchEntityCreateSystem_1 = require("./Entity/FloroRanchEntityCreateSystem");
const FloroRanchDefine_1 = require("./FloroRanchDefine");
const FloroRanchDailyInStageState_1 = require("./FSM/Stage/FloroRanchDailyInStageState");
const FloroRanchStageFsm_1 = require("./FSM/Stage/FloroRanchStageFsm");
class FloroRanchGamePlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ActivityId = 0;
    this.SubInstanceId = 0;
    this.Races = [];
    this.SkillId = 0;
    this.IsOver = false;
    this.CurStage = 0;
    this.RemindDay = 0;
    this.StageTarget = 0;
    this.StageDayCount = 0;
    this.TotalDayCount = 0;
    this.EnableToyCount = 0;
    this.F7c = 0;
    this.C_u = false;
    this.IsEndlessMode = false;
    this.CoinData = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(1);
    this.DiamondData = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(2);
    this.dOu = 0;
    this.ShowEntityDebugInfo = true;
    this.p_u = [];
    this.v_u = [];
    this.y_u = [];
    this.DungeonEntity = undefined;
    this.RoleEntity = undefined;
    this.N9o = new Map();
    this.sCu = [];
    this.P2i = [];
    this.S_u = undefined;
    this.bAu = [];
    this.ActionInfoList = [];
    this.NeedReStart = false;
    this.NeedSettle = false;
    this.IsPause = false;
    this.IsExit = false;
    this.$Ge = (t, i) => {
      var e = this.bAu.length;
      if (e > 0 && this.bAu[e - 1] === i) {
        this.bAu.pop();
      }
    };
    this.FloroRanchTimerSystem = new TimerSystem_1.TimerSystemInstance();
    this.TDe = undefined;
    this.s1t = 1;
    this.TKu = false;
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
  InitGame(t, i, e, s) {
    this.ActivityId = t;
    this.Races = i;
    this.SkillId = e;
    this.IsOver = s;
  }
  EnterGame(t) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ConnectBan");
    } else if (this.C_u) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch进入游戏失败：游戏已经开始");
      }
    } else {
      this.InitData(t.Zru);
      this.RefreshDailyTaskData(t.vlu);
      this.mOu();
      this.InitStateMachine();
      this.ChangeState(1);
    }
  }
  InitStateMachine() {
    this.S_u = new FloroRanchStageFsm_1.FloroRanchStageFsm();
    this.S_u.Init();
  }
  CanFsmInsertSkillTask() {
    var t;
    return this.S_u.GetCurrentStateType() === 2 && !!(t = this.S_u.GetCurrentState()) && !!(t instanceof FloroRanchDailyInStageState_1.FloroRanchDailyInStageState) && !t.IsExecutingTask();
  }
  ChangeState(t) {
    this.S_u.ChangeState(t);
  }
  PauseGame() {
    if (this.C_u) {
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
    if (this.C_u) {
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
    if (this.C_u) {
      if (!(this.NeedSettle = t)) {
        ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().SetSavedStage(this.CurStage);
      }
      this.IsExit = true;
      this.ChangeState(5);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch退出游戏失败：游戏未开始");
    }
  }
  ReStartGame() {
    if (this.C_u) {
      this.NeedReStart = true;
      this.IsExit = true;
      this.ChangeState(5);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch退出游戏失败：游戏未开始");
    }
  }
  GameEnd() {
    if (this.C_u) {
      this.fOu();
      this.ExitAllEntity();
      this.ClearData();
      this.CloseAllRecordView();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch退出游戏失败：游戏未开始");
    }
  }
  InitData(t) {
    this.C_u = true;
    this.RefreshBasicData(t);
    this.InitEntityData(t);
  }
  RefreshBasicData(t) {
    this.SubInstanceId = t.vru;
    this.CurStage = t.Gru;
    this.CoinData.SetTotal(Number(MathUtils_1.MathUtils.LongToBigInt(t.kru)));
    this.CoinData.SetAmount(Number(MathUtils_1.MathUtils.LongToBigInt(t.nlu)));
    this.DiamondData.SetTotal(Number(MathUtils_1.MathUtils.LongToBigInt(t.Oru)));
    this.DiamondData.SetAmount(Number(MathUtils_1.MathUtils.LongToBigInt(t.slu)));
    this.StageTarget = Number(MathUtils_1.MathUtils.LongToBigInt(t.alu));
    this.EnableToyCount = t.kCu;
    this.IsEndlessMode = t.ZUu;
    this.StageDayCount = t.uDu;
    this.TotalDayCount = t.GBu;
    this.RemindDay = t.FBu;
    this.ActionInfoList.length = 0;
  }
  InitEntityData(t) {
    this.N9o.clear();
    this.p_u.length = 0;
    this.v_u.length = 0;
    this.y_u.length = 0;
    this.AddEntityList(t.Dru);
    this.AddEntityList(t.Bru);
    this.AddEntityList(t.qru);
    if (t.sxu) {
      this.DungeonEntity = FloroRanchEntityCreateSystem_1.FloroRanchEntityCreateSystem.CreateFloroRanchEntity(t.sxu);
      this.N9o.set(this.DungeonEntity.EntityId, this.DungeonEntity);
    }
    if (t.RUs) {
      this.RoleEntity = FloroRanchEntityCreateSystem_1.FloroRanchEntityCreateSystem.CreateFloroRanchEntity(t.RUs);
      this.N9o.set(this.RoleEntity.EntityId, this.RoleEntity);
    }
  }
  OnDayStart(t) {
    this.CurStage = t.tDu;
    this.IsEndlessMode = t.j1u;
    this.TotalDayCount = t.GBu;
    this.RemindDay = t.FBu;
  }
  OnStageStart(t) {
    this.StageTarget = Number(MathUtils_1.MathUtils.LongToBigInt(t.j6n));
    this.StageDayCount = t._lu;
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
    if (!this.N9o.has(t.Tru)) {
      i = FloroRanchEntityCreateSystem_1.FloroRanchEntityCreateSystem.CreateFloroRanchEntity(t);
      this.N9o.set(i.EntityId, i);
      this.CDu(i.EntityType, i);
      if (i.EntityType === 1) {
        e = this.dOu + 1;
        this.SetOwnCardEntityCount(e);
      }
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch实体Id重复", ["entityId", t.Tru]);
    }
  }
  RefreshEntityList(t) {
    for (const i of t) {
      this.GetEntity(i.Tru).RefreshEntityData(i);
    }
  }
  RefreshRemoveEntityList(t) {
    for (const i of t) {
      this.GetEntity(i).CheckGetComponent(0).Remove();
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
    var i = t.CheckGetComponent(0);
    if (i.IsValid) {
      i.Remove();
      if (this.pDu(t.EntityType, t) && t.EntityType === 1) {
        i = this.dOu - 1;
        this.SetOwnCardEntityCount(i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch移除实体数据失败：实体重复移除", ["entityId", t.EntityId]);
    }
  }
  ClearRemoveEntity() {
    for (const t of this.N9o.values()) {
      if (!t.CheckGetComponent(0).IsValid) {
        this.N9o.delete(t.EntityId);
      }
    }
  }
  OnShopItemPurchased(t) {
    this.OnCurrencyChange(Number(MathUtils_1.MathUtils.LongToBigInt(t.nlu)), Number(MathUtils_1.MathUtils.LongToBigInt(t.slu)));
    let i = undefined;
    switch (t.h5n) {
      case Protocol_1.Aki.Protocol.Idu.Proto_BuyCard:
        i = t.Sdu;
        FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.AddEntity(i.pdu);
        break;
      case Protocol_1.Aki.Protocol.Idu.Proto_BuyGardGroup:
        i = t.Mdu;
        this.OpenAndRecordView("FloroRanchCardGroupSelectView", i.Yru);
        break;
      case Protocol_1.Aki.Protocol.Idu.Proto_BuyToy:
        var e = (i = t.Edu).ydu;
        if (this.CheckEntityIsExist(e.Tru)) {
          this.GetEntity(e.Tru).RefreshEntityData(e);
        } else {
          FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.AddEntity(e);
        }
    }
  }
  OnTributeResult(t) {
    this.RemindDay = t.FBu;
    this.CurStage = t.tDu;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh);
    var i = Number(MathUtils_1.MathUtils.LongToBigInt(t.nlu));
    var t = Number(MathUtils_1.MathUtils.LongToBigInt(t.slu));
    this.OnCurrencyChange(i, t);
  }
  OnCurrencyChange(t, i) {
    this.CoinData.SetAmount(t);
    this.DiamondData.SetAmount(i);
    this.GetGamePlayView().RefreshCurrencyInfo();
  }
  OpenAndRecordView(s, t, o) {
    UiManager_1.UiManager.OpenView(s, t, (t, i) => {
      var e;
      if (t) {
        t = this.GetGamePlayView();
        e = UiManager_1.UiManager.GetView(i);
        t.AddChild(e);
        this.bAu.push(i);
        o?.();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanch打开界面失败", ["viewName", s]);
      }
    });
  }
  ShowRecordView() {
    for (const i of this.bAu) {
      var t = UiManager_1.UiManager.GetView(i);
      if (t) {
        t.SetActive(true);
      }
    }
    this.GetGamePlayView().SetShowButtonActive(false);
  }
  HideRecordView() {
    for (const i of this.bAu) {
      var t = UiManager_1.UiManager.GetView(i);
      if (t) {
        t.SetActive(false);
      }
    }
    this.GetGamePlayView().SetShowButtonActive(true);
  }
  CloseAllRecordView() {
    for (const t of this.bAu) {
      UiManager_1.UiManager.CloseViewById(t);
    }
    this.bAu.length = 0;
  }
  get OwnCardEntityCount() {
    return this.dOu;
  }
  SetOwnCardEntityCount(t) {
    this.dOu = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange);
  }
  ExitAllEntity() {
    for (const i of this.N9o.values()) {
      var t = i.GetUiItemComponent();
      if (t) {
        t.Exit();
      }
    }
  }
  ClearData() {
    this.C_u = false;
    this.ActivityId = 0;
    this.SubInstanceId = 0;
    this.Races.length = 0;
    this.SkillId = 0;
    this.CurStage = 0;
    this.RemindDay = 0;
    this.p_u.length = 0;
    this.v_u.length = 0;
    this.y_u.length = 0;
    this.DungeonEntity = undefined;
    this.RoleEntity = undefined;
    this.P2i.length = 0;
    this.S_u = undefined;
    this.IsPause = false;
    this.bAu.length = 0;
    this.F7c = 0;
    this.sCu.length = 0;
    this.dOu = 0;
    this.NeedReStart = false;
    this.IsExit = false;
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
  CDu(t, i) {
    switch (t) {
      case 0:
        this.p_u.push(i);
        break;
      case 1:
        this.v_u.push(i);
        break;
      case 2:
        this.y_u.push(i);
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
  pDu(t, i) {
    let e = -1;
    switch (t) {
      case 0:
        if ((e = this.p_u.indexOf(i)) !== -1) {
          this.p_u.splice(e, 1);
        }
        break;
      case 1:
        if ((e = this.v_u.indexOf(i)) !== -1) {
          this.v_u.splice(e, 1);
        }
        break;
      case 2:
        if ((e = this.y_u.indexOf(i)) !== -1) {
          this.y_u.splice(e, 1);
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
          Log_1.Log.Error("FloroRanchGamePlay", 78, "RemoveEntityByType失败：EntityType错误", ["type", t]);
        }
    }
    var s = e !== -1;
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "RemoveEntityByType失败：实体不存在", ["entityId", i.EntityId]);
      }
    }
    return s;
  }
  GetShowCardEntityList() {
    var t = [];
    for (const e of this.v_u) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point !== -1) {
        t.push(e);
      }
    }
    return t;
  }
  GetShowToyEntityList() {
    var t = [];
    for (const e of this.y_u) {
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
    for (const e of this.p_u) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point !== -1) {
        t.push(e);
      }
    }
    return t;
  }
  GetCardEntityByPoint(t) {
    for (const e of this.v_u) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point === t) {
        return e;
      }
    }
  }
  GetTerrainEntityByPoint(t) {
    for (const e of this.p_u) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point === t) {
        return e;
      }
    }
  }
  GetToyEntityByPoint(t) {
    for (const e of this.y_u) {
      var i = e.CheckGetComponent(0);
      if (i.IsValid && i.Point === t) {
        return e;
      }
    }
  }
  ClearLastDayIncome() {
    this.F7c = 0;
    for (const t of this.N9o.values()) {
      t.CheckGetComponent(0).Income = 0;
    }
  }
  RefreshLastIncomeEntityList() {
    this.sCu.length = 0;
    for (const t of this.N9o.values()) {
      this.sCu.push(t);
    }
    this.sCu.sort((t, i) => {
      var e;
      var s;
      var o = t.CheckGetComponent(0);
      var h = i.CheckGetComponent(0);
      if (h.Income !== o.Income) {
        return h.Income - o.Income;
      } else if (o.IsValid !== (e = h.IsValid)) {
        if (e) {
          return 1;
        } else {
          return -1;
        }
      } else {
        e = FloroRanchDefine_1.entityTypePriority[o.EntityType] ?? 0;
        if ((s = FloroRanchDefine_1.entityTypePriority[h.EntityType] ?? 0) !== e) {
          return e - s;
        } else if ((e = t.GetRace()) !== (s = i.GetRace())) {
          return e - s;
        } else if ((e = t.GetRarity()) !== (s = i.GetRarity())) {
          return s - e;
        } else {
          return o.EntityId - h.EntityId;
        }
      }
    });
  }
  GetLastIncomeEntityList(e, t, s) {
    let i = this.sCu;
    let o = (i = i.filter(t => {
      var i = t.EntityType;
      return !!this.CheckEntityTypeIsVisible(i) && !(t = t.GetPoint(), !s && t === -1) && (e.FilterTypeId < 0 || e.FilterTypeId === i);
    })).map((t, i) => ({
      EntityData: t,
      Rank: i + 1
    }));
    return o = t ? o : o.slice().reverse();
  }
  GetLastDayIncome() {
    return this.F7c;
  }
  AddLastDayIncome(t) {
    this.F7c += t;
  }
  SetStageTarget(t) {
    this.StageTarget = t;
  }
  GetStageTarget() {
    return this.StageTarget;
  }
  GetGamePlayView() {
    var t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "GetGamePlayView失败：view不存在");
    }
  }
  CheckEntityTypeIsVisible(t) {
    return t === 1 || t === 2 || t === 0;
  }
  mOu() {
    if (this.TDe) {
      this._1o();
    }
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME);
    this.s1t = 1;
    this.TKu = false;
  }
  fOu() {
    this._1o();
    this.s1t = 1;
    this.TKu = false;
    this.FloroRanchTimerSystem.Clear();
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
    return this.TKu;
  }
  set IsSkip(t) {
    this.TKu = t;
  }
  GetPopupRewardStayTime() {
    if (FloroRanchDefine_1.floroRanchSpeedTimeMap[this.s1t] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "GetPopupRewardStayTime失败：TimeDilation错误", ["TimeDilation", this.s1t]);
      }
      return FloroRanchDefine_1.FLORO_RANCH_REWARD_POPUP_STAY_TIME;
    } else {
      return FloroRanchDefine_1.floroRanchSpeedTimeMap[this.s1t].PopupRewardStayTime;
    }
  }
  GetPopupRewardWaitTime() {
    if (FloroRanchDefine_1.floroRanchSpeedTimeMap[this.s1t] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "GetPopupRewardWaitTime失败：TimeDilation错误", ["TimeDilation", this.s1t]);
      }
      return FloroRanchDefine_1.FLORO_RANCH_REWARD_POPUP_WAIT_TIME;
    } else {
      return FloroRanchDefine_1.floroRanchSpeedTimeMap[this.s1t].PopupRewardWaitTime;
    }
  }
  GetBezierCurveTime() {
    if (FloroRanchDefine_1.floroRanchSpeedTimeMap[this.s1t] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "GetBezierCurveTime失败：TimeDilation错误", ["TimeDilation", this.s1t]);
      }
      return FloroRanchDefine_1.FLORO_RANCH_REWARD_COIN_BEZIER_TIME;
    } else {
      return FloroRanchDefine_1.floroRanchSpeedTimeMap[this.s1t].BezierCurveTime;
    }
  }
  GetWageSettleWaitTime() {
    if (FloroRanchDefine_1.floroRanchSpeedTimeMap[this.s1t] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "GetWageSettleWaitTime失败：TimeDilation错误", ["TimeDilation", this.s1t]);
      }
      return FloroRanchDefine_1.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME;
    } else {
      return FloroRanchDefine_1.floroRanchSpeedTimeMap[this.s1t].WageSettleWaitTime;
    }
  }
}
exports.FloroRanchGamePlayModel = FloroRanchGamePlayModel;
//# sourceMappingURL=FloroRanchGamePlayModel.js.map