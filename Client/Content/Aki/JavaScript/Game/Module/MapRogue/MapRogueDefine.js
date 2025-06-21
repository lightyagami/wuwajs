"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueGameInfo = exports.popupModelBaseGenerator = exports.MapGridData = void 0;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  GridPathFinder_1 = require("./Utils/GridPathFinder/GridPathFinder"),
  MapRogueActorPool_1 = require("./Utils/MapRogueActorPool"),
  GridPopupView_1 = require("./View/Popup/GridPopupView"),
  GridPopupViewModelBattle_1 = require("./View/Popup/GridPopupViewModelBattle"),
  GridPopupViewModelBlank_1 = require("./View/Popup/GridPopupViewModelBlank"),
  GridPopupViewModelBoss_1 = require("./View/Popup/GridPopupViewModelBoss"),
  GridPopupViewModelEvent_1 = require("./View/Popup/GridPopupViewModelEvent"),
  TYPE_EVENT_WEIGHT = 1e6;

function gridLocationToIndex(t, i, s) {
  return i * s + t
}

function indexToGridLocation(t, i) {
  return {
    X: t % i,
    Y: Math.floor(t / i)
  }
}

function parseNumbers(t, i = "#") {
  t = t.split(i).map(t => {
    t = Number(t);
    return isNaN(t) ? void 0 : t
  });
  return t.some(t => void 0 === t) ? [] : t
}

function inAxisAlignedDiamond([t, i], s) {
  return Math.abs(t - s.CenterX) / s.RadiusX + Math.abs(i - s.CenterY) / s.RadiusY <= 1
}
class MapGridData {
  constructor() {
    this.GridId = 0, this.GridIndex = 0, this.GridTypeId = 0, this.GroundPathIndex = 0, this.ExtraPathIndex = -1, this.GridEventId = 0, this.GridEventType = 0, this.EventType = -1, this.Cost = 1, this.WalkCost = 0, this.EventCost = 0, this.IsExplore = !1, this.HasVision = !1, this.IsBlock = !1, this.Walkable = !0, this.Lv = 0, this.OccupiedEffectIdList = [], this.RewardItemIdList = [], this.ConditionInfo = void 0
  }
  RefreshByServer(t) {
    this.GridId = t.v9n, this.WalkCost = t.N2s, this.EventCost = t.z_1, this.IsExplore = t.sIc, this.HasVision = t.aIc, this.IsBlock = t.nkc, this.Walkable = t.aIc && !t.nkc, this.GridTypeId = t.skc, this.GridEventId = t.J2s, this.Lv = t.Kr1, this.OccupiedEffectIdList = t.Xr1, this.RewardItemIdList = t.RI1, this.ConditionInfo = t.LI1;
    t = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridEventConfigById(this.GridEventId);
    this.EventType = t?.EventType ?? -1, this.GridEventType = t?.ShowType ?? 0, this.Cost = this.HasEvent() ? TYPE_EVENT_WEIGHT : 1
  }
  HasEvent(t = this.HasVision) {
    return !!t && !this.IsExplore && 0 !== this.GridEventId
  }
  IsValid() {
    return 0 !== this.GridId
  }
  NeedTriggerEvent() {
    return !this.IsExplore && 0 !== this.GridEventId
  }
  IsUnlock() {
    return !this.ConditionInfo || 0 === this.ConditionInfo.s5n || this.ConditionInfo.lMs >= this.ConditionInfo.j6n
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
  return new GridPopupView_1.GridPopupView(t)
}
exports.popupModelBaseGenerator = popupModelBaseGenerator;
class MapRogueGameInfo {
  constructor() {
    this.InstanceId = 0, this.RandomSeed = 0, this.Yzt = void 0, this.WGc = void 0, this.QGc = 0, this.CurHoverIndex = -1, this.CurSelectedIndex = -1, this.fc1 = 0, this.MapGrids = [], this.MapWidth = 0, this.MapHeight = 0, this.Center = {
      X: 0,
      Y: 0
    }, this.so1 = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueRoleMoveSpeed") ?? 100, this.JB1 = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().FocusTime, this.ao1 = 1, this.fP1 = 1, this.gc1 = !1, this.Op1 = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueLvItemId") ?? 0, this.ACr = new Set, this.IsEnd = !1, this.EnterBattleFlag = !1, this.ActorPool = void 0, this.C71 = void 0, this.GR1 = new Set, this.ZB1 = new Set, this.Path = [], this.MoodMin = 0, this.MoodMax = 0, this.KGc = 0, this.QC1 = 0, this.MoodItemId = CommonParamById_1.configCommonParamById.GetIntConfig("MapRogueMoodItemId") ?? 0, this.CurOp = void 0, this.ViewOpenPromise = void 0, this.ViewShowPromise = void 0, this.ViewLoadPromise = void 0, this.XGc = 0, this.ho1 = 0, this.lo1 = 0, this.KC1 = [], this.TriggerGuideEventOnFocusStart = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueMapMoveTweenStarOrEnd, !0)
    }, this.TriggerGuideEventOnFocusEnd = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueMapMoveTweenStarOrEnd, !1)
    }
  }
  get TeamLv() {
    return this.ao1
  }
  SetTeamLv(t, i) {
    var s = t - this.ao1;
    this.ao1 = t, this.Yzt?.RefreshTeamLv(), i && ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().ShowLvChangeEventType.includes(i) && this.PushGetItemData(this.Op1, s)
  }
  get TeamLvAnim() {
    var t = this.fP1;
    return this.fP1 = this.ao1, t
  }
  get InBattle() {
    return this.gc1
  }
  set InBattle(t) {
    this.gc1 = t
  }
  get PlayerGridIndex() {
    return this.fc1
  }
  set PlayerGridIndex(t) {
    this.fc1 = t, this.Yzt?.MapModule?.SetRolePos(this.PlayerGridIndex), this.FR1(this.PlayerGridIndex)
  }
  get CenterIndex() {
    return gridLocationToIndex(this.Center.X, this.Center.Y, this.MapWidth)
  }
  GetGridPos(t) {
    return indexToGridLocation(t, this.MapWidth)
  }
  GetGridIndex(t, i) {
    return gridLocationToIndex(t, i, this.MapWidth)
  }
  Refresh(t) {
    this.InstanceId = t.InstanceId, this.RandomSeed = t.RandomSeed, this.MapGrids = t.MapGrids, this.MapWidth = t.MapWidth, this.MapHeight = t.MapHeight, this.Center.X = Math.floor(this.MapWidth / 2), this.Center.Y = Math.floor(this.MapHeight / 2), this.fc1 = t.PlayerGridIndex, this.ao1 = t.TeamLv, this.fP1 = t.TeamLv, this.gc1 = t.InBattle, this.QC1 = t.MoodRuleId, this.MoodMin = t.MoodMin, this.MoodMax = t.MoodMax, this.KGc = t.InitMood;
    t = {
      Matrix: this.MapGrids,
      Width: this.MapWidth,
      Height: this.MapHeight
    };
    this.WGc = new GridPathFinder_1.GridPathFinder(t), this.ActorPool = new MapRogueActorPool_1.MapRogueActorPool, this.IsEnd = !1, this.p71(), this.v71()
  }
  Clear() {
    this.CurHoverIndex = -1, this.CurSelectedIndex = -1, this.KGc = 0, this.MapGrids.length = 0, this.Path.length = 0, this.WGc = void 0, this.KC1.length = 0, this.y71(), this.ActorPool && (this.ActorPool.Clear(), this.ActorPool = void 0)
  }
  BindView(t) {
    this.Yzt = t, this.Yzt ? this.FR1(this.PlayerGridIndex) : this.v71()
  }
  get HasBindView() {
    return void 0 !== this.Yzt
  }
  get GameStage() {
    return this.QGc
  }
  set GameStage(t) {
    if (this.GameStage !== t) {
      var i = this.GameStage;
      switch (this.QGc = t) {
        case 1:
          this.Yzt?.MapModule?.ResetAllPath(), this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, !1), this.CurSelectedIndex = -1, this.CurHoverIndex = -1, this.tk1(), this.SetInteractAvailable(1, !0);
          break;
        case 2:
          this.SetInteractAvailable(1, !1);
          break;
        case 3:
          this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Run"), this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(!1)
      }
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] GameStageChange", ["CurStage", this.QGc], ["LastStage", i]), this.Yzt?.ChangeGameStagePerformance(i, this.QGc)
    }
  }
  get IsStageAvailable() {
    return 1 === this.GameStage
  }
  SetInteractAvailable(t, i) {
    i ? this.ACr.delete(t) : this.ACr.add(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] SetInteractAvailable", ["Tag", t], ["TagAvailable", i], ["Available", 0 === this.ACr.size]), this.Yzt?.SetInteractAvailable(0 === this.ACr.size)
  }
  get CanInteract() {
    return 0 === this.ACr.size
  }
  SetTipsItemProxy(t, i) {
    this.Yzt?.SetTipsItem(t, i)
  }
  p71() {
    this.y71(), this.C71 = TimerSystem_1.TimerSystem.Forever(() => {
      this.ActorPool?.Tick(MapRogueActorPool_1.PROCESSING_INTERVAL)
    }, MapRogueActorPool_1.PROCESSING_INTERVAL)
  }
  y71() {
    TimerSystem_1.TimerSystem.Has(this.C71) && (TimerSystem_1.TimerSystem.Remove(this.C71), this.C71 = void 0)
  }
  RefreshGrid(t, i) {
    t = this.MapGrids[t];
    this.WGc?.UpdateGrid(t), this.Yzt?.MapModule?.RefreshMapGrid(t), i && (this.Yzt?.RefreshProgress(), t.IsExplore) && ((i = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()).GridTakeTipsEventType.includes(t.EventType) && ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(0, "RogueRes_Event_Rewards_1"), i.GridTakeSpineEventType.includes(t.EventType)) && this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Cheer", !1)
  }
  SetGridVisionProxy(t, i) {
    this.Yzt?.MapModule?.SetMapGridBgVision(t, i)
  }
  SetMapGridBgStateProxy(t, i, s) {
    this.Yzt?.MapModule?.SetMapGridBgState(t, i, s)
  }
  CanGridCheck(t) {
    return this.MapGrids[t].Walkable && t !== this.PlayerGridIndex
  }
  sFc(t) {
    return 0 <= t.X && t.X < this.MapWidth && 0 <= t.Y && t.Y < this.MapHeight
  }
  NR1(t) {
    var i = new Set,
      t = this.GetGridPos(t);
    for (const s of [{
        X: t.X - 1,
        Y: t.Y
      }, {
        X: t.X - 1,
        Y: t.Y + 1
      }, {
        X: t.X,
        Y: t.Y + 1
      }]) this.sFc(s) && i.add(this.GetGridIndex(s.X, s.Y));
    return i
  }
  tk1() {
    for (const t of this.ZB1) this.Yzt?.MapModule?.SetPerspectiveMode(t, !1);
    this.ZB1.clear()
  }
  ik1(t) {
    var t = this.NR1(t),
      i = new Set([...t].filter(t => this.ZB1.has(t)));
    for (const s of this.ZB1) i.has(s) || this.Yzt?.MapModule?.SetPerspectiveMode(s, !1);
    for (const e of t) i.has(e) || this.Yzt?.MapModule?.SetPerspectiveMode(e, !0);
    this.ZB1 = t
  }
  FR1(t) {
    var t = this.NR1(t),
      i = new Set([...t].filter(t => this.GR1.has(t)));
    for (const s of this.GR1) i.has(s) || this.Yzt?.MapModule?.SetPerspectiveMode(s, !1);
    for (const e of t) i.has(e) || this.Yzt?.MapModule?.SetPerspectiveMode(e, !0);
    this.GR1 = t
  }
  IsPosInGridRange(t, i, s) {
    s = this.Yzt?.MapModule?.GetGridRangeInfo(s);
    return !!s && inAxisAlignedDiamond([t, i], s)
  }
  FocusOnGrid(t, i = !0) {
    this.Yzt?.MapModule?.FocusOnGrid(t, i)
  }
  get MoveState() {
    return this.CurSelectedIndex < 0 ? 1 : this.MapGrids[this.CurSelectedIndex].Walkable ? this.MapGrids[this.CurSelectedIndex].IsUnlock() ? 0 === this.Path.length ? 2 : this.XC1(this.Path) ? 3 : 0 : 5 : 4
  }
  XC1(i) {
    for (let t = 0; t < i.length - 1; t++)
      if (this.MapGrids[i[t]].NeedTriggerEvent()) return !0;
    return !1
  }
  HoverOnTarget(t, i = !0) {
    this.HasBindView && (this.CanGridCheck(t) ? (i && (this.CurHoverIndex = t, this.ik1(this.CurHoverIndex)), this.YGc(t, i)) : (this.CurHoverIndex = -1, this.Yzt?.MapModule?.SetInteractState(!1, !1), this.ResetAllPath(), this.tk1()))
  }
  UnHoverOnTarget(t) {
    this.IsStageAvailable && this.CurHoverIndex === t && (this.CurHoverIndex = -1)
  }
  BlankPlaneEnter() {
    this.Yzt?.MapModule?.SetInteractState(!1, !1), this.CurHoverIndex = -1, this.ResetAllPath(), this.tk1()
  }
  YGc(t, i, s = this.PlayerGridIndex) {
    var e;
    !this.MapGrids[t].IsUnlock() || (s = this.GetGridPos(s), e = this.GetGridPos(t), 0 === (s = this.WGc.FindPath(s, e)).length) ? (this.ResetAllPath(), this.Yzt?.MapModule?.SetInteractState(!1, !0, t), this.Yzt?.MapModule?.SetMapGridMoveEnable(t, !1)) : this.XC1(s) ? (this.ResetAllPath(), this.Path = s, this.Yzt?.MapModule?.SetInteractState(!1, !0, t), this.Yzt?.MapModule?.SetMapGridMoveEnable(t, !1)) : (this.Yzt?.MapModule?.SetInteractState(!0, !0, t), this.Yzt?.MapModule?.SetMapGridMoveEnable(t, !0), i && (this.CurSelectedIndex = s[s.length - 1], this.Yzt?.MapModule?.CreateAllMapGridPath(this.Path, s), this.Path = s, this.PreviewMoodValueByPath()))
  }
  async CreateGridPathAsync(t) {
    this.CurSelectedIndex = t[t.length - 1], this.Yzt?.MapModule?.SetMapGridMoveEnable(this.CurSelectedIndex, !0), this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, !0), this.Yzt?.MapModule?.FocusOnGrid(this.CurSelectedIndex, !0), await this.Yzt?.MapModule?.CreateAllMapGridPathAsync(this.Path, t), this.Path = t, this.PreviewMoodValueByPath()
  }
  ResetAllPath() {
    for (const t of this.Path) this.zGc(t);
    this.Path.length = 0, this.Yzt?.MoodBar?.ClosePreviewValue()
  }
  zGc(t) {
    this.Yzt?.MapModule?.ResetPath(t)
  }
  SetMood(t, i, s, e) {
    var h = t - this.KGc;
    this.KGc = t, void 0 !== s && void 0 !== e && (this.MoodMin = s, this.MoodMax = e, this.Yzt?.MoodBar?.SetLimit(this.MoodMin, this.MoodMax)), this.Yzt?.MoodBar?.SetCurrentValue(t), i && ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().ShowMoodChangeEventType.includes(i) && this.PushGetItemData(this.MoodItemId, h)
  }
  get Mood() {
    return this.KGc
  }
  set MoodRuleId(t) {
    if (this.QC1 !== t) {
      this.QC1 = t;
      var i = ConfigManager_1.ConfigManager.MapRogueConfig.GetMoodRuleById(t);
      if (i) switch (this.Yzt?.MoodBar?.SetMoodRuleId(t), this.Yzt?.RefreshMoodMusicState(), i.Type) {
        case 1:
          ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(0, i.FloatTips);
          break;
        case 2:
          ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueTipsView(1, i.FloatTips)
      }
    }
  }
  get MoodRuleId() {
    return this.QC1
  }
  PreviewMoodValueByPath() {
    let i = 0;
    for (let t = 1; t < this.Path.length; t++) {
      var s = this.MapGrids[this.Path[t]];
      i -= s.WalkCost
    }
    this.Yzt?.MoodBar?.ShowPreviewValue(i)
  }
  v71() {
    this.ViewOpenPromise && this.ViewOpenPromise.SetResult(), this.ViewOpenPromise = new CustomPromise_1.CustomPromise, this.ViewLoadPromise && this.ViewLoadPromise.SetResult(), this.ViewLoadPromise = new CustomPromise_1.CustomPromise, this.ViewShowPromise && this.ViewShowPromise.SetResult(), this.ViewShowPromise = new CustomPromise_1.CustomPromise
  }
  OnTick(t) {
    3 === this.GameStage && (this.XGc += t, this.XGc < this.so1 ? (t = this.XGc / this.so1, this.Yzt?.MapModule?.SetRolePosByGrid(t, this.ho1, this.lo1)) : (this.Yzt?.MapModule?.SetRolePosByGrid(1, this.ho1, this.lo1), this.CurOp?.Execute(this)))
  }
  OnCheck(t) {
    this.IsStageAvailable && (this.CurSelectedIndex = t, 1 === (t = this.MoveState) || 4 === t ? this.CurSelectedIndex = -1 : (this.Yzt?.MapModule?.FocusOnGrid(this.CurSelectedIndex), this.GameStage = 2, t = this.MapGrids[this.CurSelectedIndex], this.Yzt?.OpenPopupView(t)))
  }
  OnMove(t = this.CurHoverIndex) {
    this.IsStageAvailable && (this.CurSelectedIndex = t, 0 !== this.MoveState ? this.CurSelectedIndex = -1 : (this.Yzt?.MapModule?.SetMapGridBgState(this.CurSelectedIndex, !0), this.RequestMove()))
  }
  RequestMove() {
    this.GameStage = 2, ControllerHolder_1.ControllerHolder.MapRogueController.RequestMove(this.Path.slice(1), t => {
      t || (this.GameStage = 1)
    })
  }
  MoveOneStep(t, i) {
    this.zGc(i), this.XGc = 0, this.ho1 = t, this.lo1 = i, this.Yzt?.MapModule?.RolePanel.SetRoleDirection(t < i), this.FR1(i)
  }
  EndMove() {
    this.CurOp = void 0, this.Path.length = 0, this.Yzt?.MapModule?.RolePanel.SetRoleAnim("Idle"), this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(!0)
  }
  async TeleportFlow(t, i) {
    this.SetInteractAvailable(2, !1);
    for (const e of i) this.SetGridVisionProxy(e, !0);
    this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(!1), await this.Yzt.MapModule.PlaySequence("Disappear"), this.Yzt?.MapModule?.SetRolePos(t), this.Yzt?.MapModule?.FocusOnGrid(t);
    const s = new CustomPromise_1.CustomPromise;
    TimerSystem_1.TimerSystem.Delay(() => {
      s.SetResult()
    }, this.JB1), await s.Promise, this.Yzt?.MapModule?.RolePanel.SetRolePosItemVisible(!0), this.FR1(t), await this.Yzt.MapModule.PlaySequence("Appear"), this.SetInteractAvailable(2, !0)
  }
  RoleAnimProxy(t, i = !0) {
    this.Yzt?.MapModule?.RolePanel.SetRoleAnim(t, i)
  }
  PushGetItemData(t, i) {
    0 !== i && this.KC1.push({
      ItemId: t,
      ChangeCount: i
    })
  }
  ShiftGetItemData() {
    return this.KC1.shift()
  }
  IsGetItemDataEmpty() {
    return 0 === this.KC1.length
  }
  ExplorationCurrentProgress() {
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetExploreByInstId(this.InstanceId);
    if (!t) return 0;
    var i, s = new Map;
    for (const a of this.MapGrids) a.EventType <= 0 || a.IsExplore && (i = s.get(a.EventType) ?? 0, s.set(a.EventType, i + 1));
    let e = 0,
      h = 0;
    for (const n of t.FinishCountType) {
      var [r, o] = parseNumbers(n), r = s.get(r) ?? 0;
      e += r, h += o
    }
    return Math.ceil(e / h * 100)
  }
  GetAllExplorationData() {
    var e = [],
      h = ConfigManager_1.ConfigManager.MapRogueConfig.GetExploreByInstId(this.InstanceId);
    if (h) {
      let t = 0;
      var r, o = new Map,
        a = h.ScoreMap;
      for (const _ of this.MapGrids) _.EventType <= 0 || (_.IsExplore && (r = o.get(_.EventType) ?? 0, o.set(_.EventType, r + 1)), r = a.get(_.EventType), _.IsExplore && r && (t += r));
      var n = {
        TitleId: "RogueResExplore_1",
        ValueTxt: t.toString()
      };
      e.push(n);
      let i = 0,
        s = 0;
      for (const g of h.FinishCountType) {
        var [d, u] = parseNumbers(g), d = o.get(d) ?? 0;
        i += d, s += u
      }
      n = Math.ceil(i / s * 100);
      e.push({
        TitleId: "RogueResExplore_2",
        ValueTxt: n + "%"
      });
      for (let t = 0; t < h.CountTypeA.length; t++) {
        var [p, l] = parseNumbers(h.CountTypeA[t]), p = o.get(p) ?? 0, p = {
          TitleId: h.DescA.at(t) ?? "",
          ValueTxt: p + "/" + l
        };
        e.push(p)
      }
      for (let t = 0; t < h.CountTypeB.length; t++) {
        var v = h.CountTypeB[t],
          v = o.get(v) ?? 0,
          v = {
            TitleId: h.DescB.at(t) ?? "",
            ValueTxt: v.toString()
          };
        e.push(v)
      }
    }
    return e
  }
}
exports.MapRogueGameInfo = MapRogueGameInfo;
//# sourceMappingURL=MapRogueDefine.js.map