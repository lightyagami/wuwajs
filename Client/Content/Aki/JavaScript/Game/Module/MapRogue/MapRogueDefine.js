"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGameInfo = exports.popupModelBaseGenerator = exports.MapGridData = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const GridPathFinder_1 = require("./Utils/GridPathFinder/GridPathFinder");
const MapRogueActorPool_1 = require("./Utils/MapRogueActorPool");
const GridPopupView_1 = require("./View/Popup/GridPopupView");
const GridPopupViewModelBattle_1 = require("./View/Popup/GridPopupViewModelBattle");
const GridPopupViewModelBlank_1 = require("./View/Popup/GridPopupViewModelBlank");
const GridPopupViewModelBoss_1 = require("./View/Popup/GridPopupViewModelBoss");
const GridPopupViewModelEvent_1 = require("./View/Popup/GridPopupViewModelEvent");
const TYPE_EVENT_WEIGHT = 1000000;
const THOUSANDTH_RATIO = 1000;
function gridLocationToIndex(t, i, e) {
  return i * e + t;
}
function indexToGridLocation(t, i) {
  return {
    X: t % i,
    Y: Math.floor(t / i)
  };
}
function parseNumbers(t, i = "#") {
  t = t.split(i).map(t => {
    t = Number(t);
    if (isNaN(t)) {
      return undefined;
    } else {
      return t;
    }
  });
  if (t.some(t => t === undefined)) {
    return [];
  } else {
    return t;
  }
}
function inAxisAlignedDiamond([t, i], e) {
  return Math.abs(t - e.CenterX) / e.RadiusX + Math.abs(i - e.CenterY) / e.RadiusY <= 1;
}
class MapGridData {
  constructor() {
    this.GridId = 0;
    this.GridIndex = 0;
    this.GridTypeId = 0;
    this.GroundPathIndex = 0;
    this.ExtraPathIndex = -1;
    this.GridEventId = 0;
    this.GridEventType = 0;
    this.EventType = -1;
    this.Cost = 1;
    this.WalkCost = 0;
    this.EventCost = 0;
    this.IsExplore = false;
    this.HasVision = false;
    this.IsBlock = false;
    this.Walkable = true;
    this.Lv = 0;
    this.ToleranceLv = 0;
    this.SkipBattleLv = 0;
    this.CanSkipBattle = false;
    this.OccupiedEffectIdList = [];
    this.RewardItemIdList = [];
    this.ConditionInfo = undefined;
  }
  RefreshByServer(t) {
    this.GridId = t.v9n;
    this.WalkCost = t.N2s;
    this.EventCost = t.Bl1;
    this.IsExplore = t.sIc;
    this.HasVision = t.aIc;
    this.IsBlock = t.nkc;
    this.Walkable = t.aIc && !t.nkc;
    this.GridTypeId = t.skc;
    this.GridEventId = t.J2s;
    this.Lv = t.mo1;
    this.OccupiedEffectIdList = t.fo1;
    this.RewardItemIdList = t.JI1;
    this.ConditionInfo = t.ZI1;
    this.ToleranceLv = t.Sxu;
    this.SkipBattleLv = t._$c;
    this.CanSkipBattle = t.l$c;
    t = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridEventConfigById(this.GridEventId);
    this.EventType = t?.EventType ?? -1;
    this.GridEventType = t?.ShowType ?? 0;
    this.Cost = this.HasEvent() ? TYPE_EVENT_WEIGHT : 1;
  }
  HasEvent(t = this.HasVision) {
    return !!t && !this.IsExplore && this.GridEventId !== 0;
  }
  IsValid() {
    return this.GridId !== 0;
  }
  NeedTriggerEvent() {
    return !this.IsExplore && this.GridEventId !== 0;
  }
  IsUnlock() {
    return !this.ConditionInfo || this.ConditionInfo.s5n === 0 || this.ConditionInfo.lMs >= this.ConditionInfo.j6n;
  }
}
exports.MapGridData = MapGridData;
const popupType2ModelBaseType = {
  [0]: GridPopupViewModelBlank_1.GridPopupViewModelBlank,
  1: GridPopupViewModelEvent_1.GridPopupViewModelEvent,
  2: GridPopupViewModelBattle_1.GridPopupViewModelBattle,
  3: GridPopupViewModelBoss_1.GridPopupViewModelBoss
};
function popupModelBaseGenerator(t, i) {
  t = new popupType2ModelBaseType[t.GridEventType](t, i);
  return new GridPopupView_1.GridPopupView(t);
}
exports.popupModelBaseGenerator = popupModelBaseGenerator;
class MapRogueGameInfo {
  constructor() {
    this.InstanceId = 0;
    this.RandomSeed = 0;
    this.Yzt = undefined;
    this.WGc = undefined;
    this.QGc = 0;
    this.CurHoverIndex = -1;
    this.CurSelectedIndex = -1;
    this.qc1 = 0;
    this.MapGrids = [];
    this.MapWidth = 0;
    this.MapHeight = 0;
    this.Center = {
      X: 0,
      Y: 0
    };
    this.MoveTimeGap = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueRoleMoveSpeed") ?? 100;
    this.wk1 = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().FocusTime;
    this.Lo1 = 1;
    this.jP1 = 1;
    this.Gc1 = false;
    this.sv1 = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueLvItemId") ?? 0;
    this.ACr = new Set();
    this.IsEnd = false;
    this.EnterBattleFlag = false;
    this.wxu = false;
    this.m$c = false;
    this.IsSkipBattle = false;
    this.NotTipsInactiveLink = false;
    this.MapScale = 1;
    this.ActorPool = undefined;
    this.J71 = undefined;
    this.uL1 = new Set();
    this.Ak1 = new Set();
    this.Path = [];
    this.MoodMin = 0;
    this.MoodMax = 0;
    this.KGc = 0;
    this.g01 = 0;
    this.MoodItemId = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueMoodItemId") ?? 0;
    this.CurOp = undefined;
    this.ViewOpenPromise = undefined;
    this.ViewShowPromise = undefined;
    this.ViewLoadPromise = undefined;
    this.XGc = 0;
    this.Ro1 = 0;
    this.wo1 = 0;
    this.C01 = [];
    this.TriggerGuideEventOnFocusStart = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueMapMoveTweenStarOrEnd, true);
    };
    this.TriggerGuideEventOnFocusEnd = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueMapMoveTweenStarOrEnd, false);
    };
  }
  get TeamLv() {
    return this.Lo1;
  }
  SetTeamLv(t, i) {
    var e = t - this.Lo1;
    this.Lo1 = t;
    this.Yzt?.RefreshTeamLv();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResTeamLvChange, t);
    if (i && ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().ShowLvChangeEventType.includes(i)) {
      this.PushGetItemData(this.sv1, e);
    }
  }
  get TeamLvAnim() {
    var t = this.jP1;
    this.jP1 = this.Lo1;
    return t;
  }
  get InBattle() {
    return this.Gc1;
  }
  set InBattle(t) {
    this.Gc1 = t;
  }
  get PlayerGridIndex() {
    return this.qc1;
  }
  set PlayerGridIndex(t) {
    this.qc1 = t;
    this.Yzt?.MapModule?.SetRolePos(this.PlayerGridIndex);
    this.cL1(this.PlayerGridIndex);
  }
  get CenterIndex() {
    return gridLocationToIndex(this.Center.X, this.Center.Y, this.MapWidth);
  }
  GetGridPos(t) {
    return indexToGridLocation(t, this.MapWidth);
  }
  GetGridIndex(t, i) {
    return gridLocationToIndex(t, i, this.MapWidth);
  }
  Refresh(t) {
    this.InstanceId = t.InstanceId;
    this.RandomSeed = t.RandomSeed;
    this.MapGrids = t.MapGrids;
    this.MapWidth = t.MapWidth;
    this.MapHeight = t.MapHeight;
    this.Center.X = Math.floor(this.MapWidth / 2);
    this.Center.Y = Math.floor(this.MapHeight / 2);
    this.qc1 = t.PlayerGridIndex;
    this.Lo1 = t.TeamLv;
    this.jP1 = t.TeamLv;
    this.Gc1 = t.InBattle;
    this.g01 = t.MoodRuleId;
    this.MoodMin = t.MoodMin;
    this.MoodMax = t.MoodMax;
    this.KGc = t.InitMood;
    t = {
      Matrix: this.MapGrids,
      Width: this.MapWidth,
      Height: this.MapHeight
    };
    this.WGc = new GridPathFinder_1.GridPathFinder(t);
    this.ActorPool = new MapRogueActorPool_1.MapRogueActorPool();
    this.IsEnd = false;
    this.Z71();
    this.e91();
    this.MapScale = this.f$c();
  }
  f$c() {
    var t;
    var i = ConfigManager_1.ConfigManager.MapRogueConfig.GetInsGridConfigByInstId(this.InstanceId);
    if (i) {
      i = i.MapInitScale / THOUSANDTH_RATIO;
      return (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResMapScale)) && t.get(this.InstanceId) || i;
    } else {
      return 1;
    }
  }
  g$c() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResMapScale) ?? new Map();
    t.set(this.InstanceId, this.MapScale);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResMapScale, t);
  }
  Clear() {
    this.g$c();
    this.CurHoverIndex = -1;
    this.CurSelectedIndex = -1;
    this.KGc = 0;
    this.MapGrids.length = 0;
    this.Path.length = 0;
    this.WGc = undefined;
    this.C01.length = 0;
    this.t91();
    if (this.ActorPool) {
      this.ActorPool.Clear();
      this.ActorPool = undefined;
    }
  }
  BindView(t) {
    this.Yzt = t;
    if (this.Yzt) {
      this.cL1(this.PlayerGridIndex);
    } else {
      this.e91();
    }
  }
  get HasBindView() {
    return this.Yzt !== undefined;
  }
  get GameStage() {
    return this.QGc;
  }
  set GameStage(t) {
    if (this.GameStage !== t) {
      var i = this.GameStage;
      switch (this.QGc = t) {
        case 1:
          this.Yzt?.MapModule?.ResetAllPath();
          this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, false);
          this.CurSelectedIndex = -1;
          this.CurHoverIndex = -1;
          this.xk1();
          this.SetInteractAvailable(1, true);
          break;
        case 2:
          this.SetInteractAvailable(1, false);
          break;
        case 3:
          this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Run");
          this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(false);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] GameStageChange", ["CurStage", this.QGc], ["LastStage", i]);
      }
      this.Yzt?.ChangeGameStagePerformance(i, this.QGc);
    }
  }
  get IsStageAvailable() {
    return this.GameStage === 1;
  }
  SetInteractAvailable(t, i) {
    if (i) {
      this.ACr.delete(t);
    } else {
      this.ACr.add(t);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] SetInteractAvailable", ["Tag", t], ["TagAvailable", i], ["Available", this.ACr.size === 0]);
    }
    this.Yzt?.SetInteractAvailable(this.ACr.size === 0);
  }
  get CanInteract() {
    return this.ACr.size === 0;
  }
  SetTipsItemProxy(t, i) {
    this.Yzt?.SetTipsItem(t, i);
  }
  Z71() {
    this.t91();
    this.J71 = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.ActorPool?.Tick(MapRogueActorPool_1.PROCESSING_INTERVAL);
    }, MapRogueActorPool_1.PROCESSING_INTERVAL);
  }
  t91() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.J71)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.J71);
      this.J71 = undefined;
    }
  }
  RefreshGrid(t, i) {
    t = this.MapGrids[t];
    this.WGc?.UpdateGrid(t);
    this.Yzt?.MapModule?.RefreshMapGrid(t);
    if (i && (this.Yzt?.RefreshProgress(), t.IsExplore) && ((i = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()).GridTakeTipsEventType.includes(t.EventType) && ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(0, "RogueRes_Event_Rewards_1"), i.GridTakeSpineEventType.includes(t.EventType))) {
      this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Cheer", false);
    }
  }
  SetGridData(t, i) {
    var e = new MapGridData();
    e.RefreshByServer(i);
    e.GridIndex = t;
    this.Yzt?.MapModule?.RefreshMapGrid(e);
  }
  SetGridVisionProxy(t, i) {
    this.Yzt?.MapModule?.SetMapGridBgVision(t, i);
  }
  SetMapGridBgStateProxy(t, i, e) {
    this.Yzt?.MapModule?.SetMapGridBgState(t, i, e);
  }
  CanGridCheck(t) {
    return this.MapGrids[t].Walkable && t !== this.PlayerGridIndex;
  }
  sFc(t) {
    return t.X >= 0 && t.X < this.MapWidth && t.Y >= 0 && t.Y < this.MapHeight;
  }
  dL1(t) {
    var i = new Set();
    var t = this.GetGridPos(t);
    for (const e of [{
      X: t.X - 1,
      Y: t.Y
    }, {
      X: t.X - 1,
      Y: t.Y + 1
    }, {
      X: t.X,
      Y: t.Y + 1
    }]) {
      if (this.sFc(e)) {
        i.add(this.GetGridIndex(e.X, e.Y));
      }
    }
    return i;
  }
  xk1() {
    for (const t of this.Ak1) {
      this.Yzt?.MapModule?.SetPerspectiveMode(t, false);
    }
    this.Ak1.clear();
  }
  Dk1(t) {
    var t = this.dL1(t);
    var i = new Set([...t].filter(t => this.Ak1.has(t)));
    for (const e of this.Ak1) {
      if (!i.has(e)) {
        this.Yzt?.MapModule?.SetPerspectiveMode(e, false);
      }
    }
    for (const s of t) {
      if (!i.has(s)) {
        this.Yzt?.MapModule?.SetPerspectiveMode(s, true);
      }
    }
    this.Ak1 = t;
  }
  cL1(t) {
    var t = this.dL1(t);
    var i = new Set([...t].filter(t => this.uL1.has(t)));
    for (const e of this.uL1) {
      if (!i.has(e)) {
        this.Yzt?.MapModule?.SetPerspectiveMode(e, false);
      }
    }
    for (const s of t) {
      if (!i.has(s)) {
        this.Yzt?.MapModule?.SetPerspectiveMode(s, true);
      }
    }
    this.uL1 = t;
  }
  IsPosInGridRange(t, i, e) {
    e = this.Yzt?.MapModule?.GetGridRangeInfo(e);
    return !!e && inAxisAlignedDiamond([t, i], e);
  }
  FocusOnGrid(t, i = true, e, s) {
    this.Yzt?.MapModule?.FocusOnGrid(t, i, e, s);
  }
  IsOverEventRecommendLv(t) {
    var i;
    return !this.MapGrids[t].HasEvent(true) || (i = this.MapGrids[t].Lv, t = this.MapGrids[t].ToleranceLv, this.TeamLv >= i - t);
  }
  IsGridCanSkipBattle(t) {
    var i = this.MapGrids[t];
    return !!i.HasEvent(true) && !!i.CanSkipBattle && (i = this.MapGrids[t].Lv, t = this.MapGrids[t].SkipBattleLv, this.TeamLv >= i + t);
  }
  get MoveState() {
    if (this.CurSelectedIndex < 0) {
      return 1;
    } else if (this.MapGrids[this.CurSelectedIndex].Walkable) {
      if (this.MapGrids[this.CurSelectedIndex].IsUnlock()) {
        if (this.Path.length === 0) {
          return 2;
        } else if (this.p01(this.Path)) {
          return 3;
        } else {
          return 0;
        }
      } else {
        return 5;
      }
    } else {
      return 4;
    }
  }
  p01(i) {
    for (let t = 0; t < i.length - 1; t++) {
      if (this.MapGrids[i[t]].NeedTriggerEvent()) {
        return true;
      }
    }
    return false;
  }
  HoverOnTarget(t, i = true) {
    if (this.HasBindView) {
      if (this.CanGridCheck(t)) {
        if (i) {
          this.CurHoverIndex = t;
          this.Dk1(this.CurHoverIndex);
        }
        this.YGc(t, i);
      } else {
        this.CurHoverIndex = -1;
        this.Yzt?.MapModule?.SetInteractState(false, false);
        this.ResetAllPath();
        this.xk1();
      }
    }
  }
  UnHoverOnTarget(t) {
    if (this.IsStageAvailable && this.CurHoverIndex === t) {
      this.CurHoverIndex = -1;
    }
  }
  BlankPlaneEnter() {
    this.Yzt?.MapModule?.SetInteractState(false, false);
    this.CurHoverIndex = -1;
    this.ResetAllPath();
    this.xk1();
  }
  YGc(t, i, e = this.PlayerGridIndex) {
    var s;
    if (!this.MapGrids[t].IsUnlock() || (e = this.GetGridPos(e), s = this.GetGridPos(t), (e = this.WGc.FindPath(e, s)).length === 0)) {
      this.ResetAllPath();
      this.Yzt?.MapModule?.SetInteractState(false, true, t);
      this.Yzt?.MapModule?.SetMapGridMoveEnable(t, false);
    } else if (this.p01(e)) {
      this.ResetAllPath();
      this.Path = e;
      this.Yzt?.MapModule?.SetInteractState(false, true, t);
      this.Yzt?.MapModule?.SetMapGridMoveEnable(t, false);
    } else {
      this.Yzt?.MapModule?.SetInteractState(true, true, t);
      this.Yzt?.MapModule?.SetMapGridMoveEnable(t, true);
      if (i) {
        this.CurSelectedIndex = e[e.length - 1];
        this.Yzt?.MapModule?.CreateAllMapGridPath(this.Path, e);
        this.Path = e;
      }
    }
  }
  async CreateGridPathAsync(t) {
    this.CurSelectedIndex = t[t.length - 1];
    this.Yzt?.MapModule?.SetMapGridMoveEnable(this.CurSelectedIndex, true);
    this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, true);
    this.Yzt?.MapModule?.FocusOnGrid(this.CurSelectedIndex, true);
    await this.Yzt?.MapModule?.CreateAllMapGridPathAsync(this.Path, t);
    this.Path = t;
  }
  ResetAllPath() {
    for (const t of this.Path) {
      this.zGc(t);
    }
    this.Path.length = 0;
    this.Yzt?.MoodBar?.ClosePreviewValue();
  }
  zGc(t) {
    this.Yzt?.MapModule?.ResetPath(t);
  }
  SetMood(t, i, e, s, h = false) {
    var r = t - this.KGc;
    this.KGc = t;
    if (e !== undefined && s !== undefined) {
      this.MoodMin = e;
      this.MoodMax = s;
      this.Yzt?.MoodBar?.SetLimit(this.MoodMin, this.MoodMax);
    }
    this.Yzt?.MoodBar?.SetCurrentValue(t);
    if (!h) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResMoodChange, t, this.MoodMin, this.MoodMax);
    }
    if (i && ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().ShowMoodChangeEventType.includes(i)) {
      this.PushGetItemData(this.MoodItemId, r);
    }
  }
  get Mood() {
    return this.KGc;
  }
  set MoodRuleId(t) {
    if (this.g01 !== t) {
      this.g01 = t;
      var i = ConfigManager_1.ConfigManager.MapRogueConfig.GetMoodRuleById(t);
      if (i) {
        this.Yzt?.MoodBar?.SetMoodRuleId(t);
        this.Yzt?.RefreshMoodMusicState();
        switch (i.Type) {
          case 1:
            ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(0, i.FloatTips);
            break;
          case 2:
            ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(1, i.FloatTips);
        }
      }
    }
  }
  get MoodRuleId() {
    return this.g01;
  }
  e91() {
    if (this.ViewOpenPromise) {
      this.ViewOpenPromise.SetResult();
    }
    this.ViewOpenPromise = new CustomPromise_1.CustomPromise();
    if (this.ViewLoadPromise) {
      this.ViewLoadPromise.SetResult();
    }
    this.ViewLoadPromise = new CustomPromise_1.CustomPromise();
    if (this.ViewShowPromise) {
      this.ViewShowPromise.SetResult();
    }
    this.ViewShowPromise = new CustomPromise_1.CustomPromise();
  }
  SetMoveTimeGap(t) {
    var i = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueRoleMoveMaxDuration");
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueRoleMoveSpeed");
    this.MoveTimeGap = i < t * e ? Math.floor(i / t) : e;
  }
  OnTick(t) {
    if (this.GameStage === 3) {
      this.XGc += t;
      if (this.XGc < this.MoveTimeGap) {
        t = this.XGc / this.MoveTimeGap;
        this.Yzt?.MapModule?.SetRolePosByGrid(t, this.Ro1, this.wo1);
      } else {
        this.Yzt?.MapModule?.SetRolePosByGrid(1, this.Ro1, this.wo1);
        this.CurOp?.Execute(this);
      }
    }
  }
  OnCheck(t) {
    if (this.IsStageAvailable) {
      this.CurSelectedIndex = t;
      if ((t = this.MoveState) === 1 || t === 4) {
        this.CurSelectedIndex = -1;
      } else {
        this.Yzt?.MapModule?.FocusOnGrid(this.CurSelectedIndex);
        this.GameStage = 2;
        t = this.MapGrids[this.CurSelectedIndex];
        this.Yzt?.OpenPopupView(t);
      }
    }
  }
  OnMove(t = this.CurHoverIndex) {
    if (this.IsStageAvailable) {
      this.CurSelectedIndex = t;
      if (this.MoveState !== 0) {
        this.CurSelectedIndex = -1;
      } else {
        this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, true);
        this.RequestMove(t => {
          if (!t) {
            this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, false);
          }
        });
      }
    }
  }
  RequestMove(t) {
    var i = () => {
      t?.(false);
    };
    const e = () => {
      t?.(true);
      this.GameStage = 2;
      ControllerHolder_1.ControllerHolder.MapRogueController.RequestMove(this.Path.slice(1), t => {
        if (!t) {
          this.GameStage = 1;
        }
      });
    };
    var s;
    var h = () => {
      this.IsSkipBattle = false;
      e();
    };
    var r = () => {
      this.IsSkipBattle = true;
      e();
    };
    if (this.wxu || this.IsOverEventRecommendLv(this.CurSelectedIndex)) {
      if (!this.m$c && this.IsGridCanSkipBattle(this.CurSelectedIndex)) {
        (s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(349)).HasToggle = true;
        s.ToggleTextKey = "RogueRes_FightSweepConfirm_Hint";
        s.IsEscViewTriggerCallBack = false;
        s.FunctionMap.set(0, i);
        s.FunctionMap.set(1, h);
        s.FunctionMap.set(2, r);
        s.SetToggleFunction(t => {
          this.m$c = t;
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s);
      } else {
        e();
      }
    } else {
      (h = new ConfirmBoxDefine_1.ConfirmBoxDataNew(309)).HasToggle = true;
      h.ToggleTextKey = "RogueRes_LvlHint_Desc";
      h.FunctionMap.set(1, i);
      h.FunctionMap.set(2, e);
      h.SetToggleFunction(t => {
        this.wxu = t;
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(h);
    }
  }
  MoveOneStep(t, i) {
    this.zGc(i);
    this.XGc = 0;
    this.Ro1 = t;
    this.wo1 = i;
    this.Yzt?.MapModule?.RolePanel.SetRoleDirection(t < i);
    this.cL1(i);
  }
  EndMove() {
    this.CurOp = undefined;
    this.Path.length = 0;
    this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Idle");
    this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(true);
  }
  async TeleportFlow(t, i) {
    this.SetInteractAvailable(2, false);
    for (const s of i) {
      this.SetGridVisionProxy(s, true);
    }
    this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(false);
    await this.Yzt.MapModule.PlaySequence("Disappear");
    this.Yzt?.MapModule?.SetRolePos(t);
    this.Yzt?.MapModule?.FocusOnGrid(t);
    const e = new CustomPromise_1.CustomPromise();
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      e.SetResult();
    }, this.wk1);
    await e.Promise;
    this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(true);
    this.cL1(t);
    await this.Yzt.MapModule.PlaySequence("Appear");
    this.SetInteractAvailable(2, true);
  }
  RoleAnimProxy(t, i = true) {
    this.Yzt?.MapModule?.RolePanel.SetRoleAnim(t, i);
  }
  PushGetItemData(t, i) {
    if (i !== 0) {
      this.C01.push({
        ItemId: t,
        ChangeCount: i
      });
    }
  }
  ShiftGetItemData() {
    return this.C01.shift();
  }
  IsGetItemDataEmpty() {
    return this.C01.length === 0;
  }
  ExplorationCurrentProgress() {
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetExploreByInstId(this.InstanceId);
    if (!t) {
      return 0;
    }
    var i;
    var e = new Map();
    for (const a of this.MapGrids) {
      if (!(a.EventType <= 0)) {
        if (a.IsExplore) {
          i = e.get(a.EventType) ?? 0;
          e.set(a.EventType, i + 1);
        }
      }
    }
    let s = 0;
    let h = 0;
    for (const n of t.FinishCountType) {
      var [r, o] = parseNumbers(n);
      var r = e.get(r) ?? 0;
      s += r;
      h += o;
    }
    return Math.ceil(s / h * 100);
  }
  GetAllExplorationData() {
    var s = [];
    var h = ConfigManager_1.ConfigManager.MapRogueConfig.GetExploreByInstId(this.InstanceId);
    if (h) {
      let t = 0;
      var r;
      var o = new Map();
      var a = h.ScoreMap;
      for (const v of this.MapGrids) {
        if (!(v.EventType <= 0)) {
          if (v.IsExplore) {
            r = o.get(v.EventType) ?? 0;
            o.set(v.EventType, r + 1);
          }
          r = a.get(v.EventType);
          if (v.IsExplore && r) {
            t += r;
          }
        }
      }
      var n = {
        TitleId: "RogueResExplore_1",
        ValueTxt: t.toString()
      };
      s.push(n);
      let i = 0;
      let e = 0;
      for (const m of h.FinishCountType) {
        var [d, u] = parseNumbers(m);
        var d = o.get(d) ?? 0;
        i += d;
        e += u;
      }
      n = Math.ceil(i / e * 100);
      s.push({
        TitleId: "RogueResExplore_2",
        ValueTxt: n + "%"
      });
      for (let t = 0; t < h.CountTypeA.length; t++) {
        var [l, p] = parseNumbers(h.CountTypeA[t]);
        var l = o.get(l) ?? 0;
        var l = {
          TitleId: h.DescA.at(t) ?? "",
          ValueTxt: l + "/" + p
        };
        s.push(l);
      }
      for (let t = 0; t < h.CountTypeB.length; t++) {
        var _ = h.CountTypeB[t];
        var _ = o.get(_) ?? 0;
        var _ = {
          TitleId: h.DescB.at(t) ?? "",
          ValueTxt: _.toString()
        };
        s.push(_);
      }
    }
    return s;
  }
}
exports.MapRogueGameInfo = MapRogueGameInfo;
//# sourceMappingURL=MapRogueDefine.js.map