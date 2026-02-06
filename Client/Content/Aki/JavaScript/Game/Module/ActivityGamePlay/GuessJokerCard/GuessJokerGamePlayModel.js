"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerGamePlayModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines");
const UiManager_1 = require("../../../Ui/UiManager");
const CreatureController_1 = require("../../../World/Controller/CreatureController");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const GuessJokerActionRunner_1 = require("./Data/GuessJokerActionRunner");
const GuessJokerCardData_1 = require("./Data/GuessJokerCardData");
const GuessJokerPlotActionRunner_1 = require("./Data/GuessJokerPlotActionRunner");
const GuessJokerRoleData_1 = require("./Data/GuessJokerRoleData");
const GuessJokerStageFsm_1 = require("./FSM/GuessJokerStageFsm");
const GuessJokerDefine_1 = require("./GuessJokerDefine");
const GuessJokerUtils_1 = require("./GuessJokerUtils");
class GuessJokerGamePlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.gLf = undefined;
    this.C_u = false;
    this.IsExit = false;
    this.oLf = undefined;
    this.lVg = undefined;
    this._Vg = undefined;
    this.yq = -1;
    this.DHg = "";
    this.dFe = -1;
    this.IsFinish = false;
    this.$2f = undefined;
    this.W2f = undefined;
    this.rnu = new Map();
    this.RoundNumber = 0;
    this.qkt = [];
    this.FirstPlayerTurn = 1;
    this.lLf = 1;
    this.Q9o = undefined;
    this.Rlg = undefined;
    this.ShowInitialNoPairTip = true;
    this.CTg = new Map();
    this.COg = undefined;
    this.LOg = undefined;
    this.wOg = undefined;
    this.x8g = new Map();
    this.IsShowAiCards = false;
    this.OnPlotSequenceEnd = () => {
      if (this.GetGamePlayView()) {
        this.OpenGamePlayView();
      }
    };
    this.uVg = e => {
      this.gLf.Tick(e);
      this.Q9o?.Tick(e);
      this.Rlg?.Tick(e);
    };
    this.cVg = e => {
      this.dVg();
    };
    this.JFg = new Set();
    this.mVg = new Set();
  }
  OnInit() {
    var e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelList();
    if (e.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker初始化失败：关卡配置表为空");
      }
      return false;
    } else {
      this.yq = e[0].Id;
      return true;
    }
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequenceEnd, this.OnPlotSequenceEnd);
    this.mVg.clear();
    return true;
  }
  InitGame() {
    this.C_u = true;
    this.rnu.clear();
    this.x8g.clear();
  }
  EnterGame(e, t, r) {
    if (ModelManager_1.ModelManager.SpringManorModel.ActivityData) {
      if (this.C_u) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker进入游戏失败：游戏已经开始");
        }
      } else {
        this.InitGame();
        this.InitData(e, t, r);
        this.InitStateMachine();
        this.ChangeState(1);
        this.EVu();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker进入游戏失败：活动数据不存在");
    }
  }
  NextRound() {
    this.RoundNumber++;
    this.x8g.clear();
  }
  async RematchGame(e, t, r) {
    if (this.oLf) {
      await this.CloseGamePlayViewAsync();
    }
    this.ClearData();
    this.EnterGame(e, t, r);
  }
  ExitGame() {
    if (!this.IsExit) {
      this.IsExit = true;
      this.ChangeState(6);
    }
  }
  GameEnd() {
    this.SetNpcPokerState(0);
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
    this.ClearData();
  }
  SettleGameClear() {
    this.C_u = false;
  }
  get InGame() {
    return this.C_u;
  }
  InitData(e, t, r) {
    this.yq = t;
    this.DHg = r;
    r = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(t);
    if (r) {
      this.dFe = r.AiRole;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, "GuessJoker初始化Npc roleId", ["levelId", t], ["RoleId", this.dFe]);
      }
      if (e.xXm && e.xXm.Yru) {
        for (const a of e.xXm.Yru) {
          var s = new GuessJokerCardData_1.GuessJokerCardData(a);
          s.SetBelongPlayerType(1);
          this.rnu.set(a, s);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GuessJokerCard", 78, "GuessJoker初始化AI手牌", ["cardIdList", e.xXm.Yru.join(",")]);
        }
      }
      if (e.BXm && e.BXm.Yru) {
        for (const o of e.BXm.Yru) {
          var i = new GuessJokerCardData_1.GuessJokerCardData(o);
          i.SetBelongPlayerType(0);
          this.rnu.set(o, i);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GuessJokerCard", 78, "GuessJoker初始化玩家手牌", ["cardIdList", e.BXm.Yru.join(",")]);
        }
      }
      this.RoundNumber = 0;
      this.FirstPlayerTurn = GuessJokerUtils_1.GuessJokerUtils.ServerPlayerTransToClient(e.Zpf);
      e = r.InitHP;
      this.$2f = new GuessJokerRoleData_1.GuessJokerRoleData(1, e);
      this.W2f = new GuessJokerRoleData_1.GuessJokerRoleData(0, e);
      r = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetGuessJokerGameData(this.yq);
      this.IsFinish = r?.FirstPass ?? false;
      this.ShowInitialNoPairTip = !this.B8g(1) || !this.B8g(0);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker初始化数据失败：关卡配置不存在", ["levelId", t]);
    }
  }
  GetBlankCardData() {
    for (const e of this.rnu.values()) {
      if (e.Type === 2) {
        return e;
      }
    }
  }
  GetJokerCardId() {
    for (const e of this.rnu.values()) {
      if (e.Type === 1) {
        return e.Id;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker获取鬼牌失败：鬼牌数据不存在");
    }
    return -1;
  }
  RemoveCardData(e) {
    for (const t of e) {
      if (this.rnu.get(t)) {
        this.rnu.delete(t);
      }
    }
  }
  ClearData() {
    this.C_u = false;
    this.IsExit = false;
    this.rnu.clear();
    this.Q9o?.Destroy();
    this.Q9o = undefined;
    this.Rlg?.Destroy();
    this.Rlg = undefined;
    this._1o();
    this.$2f = undefined;
    this.W2f = undefined;
    this.ShowInitialNoPairTip = true;
    this.dFe = -1;
    this.DHg = "";
    this.CTg.clear();
    this.COg?.Clear();
    this.COg = undefined;
    this.LOg = undefined;
    this.wOg = undefined;
    this.gLf = undefined;
  }
  EVu() {
    if (this.lVg) {
      this._1o();
    }
    this.lVg = TimerSystem_1.GameplayTimerSystem.Forever(this.uVg, TimerSystem_1.MIN_TIME);
  }
  _1o() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.lVg)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.lVg);
      this.lVg = undefined;
    }
    if (TimerSystem_1.GameplayTimerSystem.Has(this._Vg)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this._Vg);
      this._Vg = undefined;
    }
  }
  InitStateMachine() {
    this.gLf = new GuessJokerStageFsm_1.GuessJokerStageFsm();
    this.gLf.Init();
  }
  ChangeState(e) {
    this.gLf.ChangeState(e);
  }
  OpenGamePlayView(r) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
    UiManager_1.UiManager.OpenView("GuessJokerGamePlayView", this.EntityId, (e, t) => {
      if (e) {
        this.oLf = UiManager_1.UiManager.GetView(t);
        this.Q9o ||= new GuessJokerActionRunner_1.GuessJokerActionRunner();
        this.Rlg ||= new GuessJokerPlotActionRunner_1.GuessJokerPlotActionRunner();
        this.SetNpcPokerState(0);
        r?.();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker打开游戏界面失败");
        }
        this.ExitGame();
      }
    });
  }
  async CloseGamePlayViewAsync() {
    await UiManager_1.UiManager.CloseViewAsync("GuessJokerGamePlayView");
    this.GameEnd();
    this.oLf = undefined;
  }
  GetGamePlayView() {
    if (this.oLf) {
      return this.oLf;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker获取游戏界面失败：游戏界面未打开");
    }
  }
  PushActions(e) {
    if (this.Q9o) {
      this.Q9o.PushActions(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker PushActions Fail：ActionRunner is undefined");
    }
  }
  PushPlotActions(e) {
    if (this.Rlg) {
      this.Rlg.PushPlotActions(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker PushPlotActions Fail：PlotActionRunner is undefined");
    }
  }
  SetWinner(e) {
    this.lLf = GuessJokerUtils_1.GuessJokerUtils.ServerPlayerTransToClient(e);
  }
  GetWinner() {
    return this.lLf;
  }
  GetLevelId() {
    return this.yq;
  }
  UpdateTaskData(e) {
    this.qkt.length = 0;
    this.qkt.push(...e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GuessJokerCardUpdateTaskData);
  }
  GetTaskDataList() {
    var e = [...this.qkt];
    this.qkt.length = 0;
    return e;
  }
  B8g(e) {
    var e = this.GetHandCardsByPlayer(e);
    var t = new Set();
    for (const s of e) {
      var r = s.Value;
      if (t.has(r)) {
        return true;
      }
      t.add(r);
    }
    return false;
  }
  GetRoleId() {
    return this.dFe;
  }
  get EntityId() {
    var e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(this.dFe);
    if (e) {
      return e.NpcId;
    } else {
      return -1;
    }
  }
  GetRoleData(e) {
    if (e === 1) {
      return this.$2f || void (Log_1.Log.CheckError() && Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker获取角色数据失败：AI角色数据不存在"));
    } else {
      return this.W2f || void (Log_1.Log.CheckError() && Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker获取角色数据失败：玩家角色数据不存在"));
    }
  }
  UpdateHp(e, t) {
    this.GetRoleData(e).SetHp(t);
  }
  GetPlayerPlayCardIdList() {
    var e = this.GetHandCardsByPlayer(0);
    var t = new Map();
    for (const n of e) {
      var r = n.Value;
      if (!t.has(r)) {
        t.set(r, []);
      }
      t.get(r).push(n);
    }
    var s;
    var i;
    var a = [];
    for ([s, i] of t.entries()) {
      var o = i.length;
      if (!(o < 2)) {
        if (o > 2) {
          for (const h of i) {
            if (h.Type === 2) {
              i.splice(i.indexOf(h), 1);
            }
          }
        }
        o = i.map(e => e.Id);
        a.push({
          Value: s,
          CardIdList: o
        });
      }
    }
    return a;
  }
  GetAllCardDataList() {
    return Array.from(this.rnu.values());
  }
  GetCardDataById(e) {
    return this.rnu.get(e);
  }
  QueryCards(e) {
    var t = [];
    for (const r of this.rnu.values()) {
      if (e(r)) {
        t.push(r);
      }
    }
    return t;
  }
  GetHandCardsByPlayer(t) {
    return this.QueryCards(e => e.GetBelongPlayerType() === t);
  }
  GetAllCardsByPlayer(t) {
    return this.QueryCards(e => e.GetBelongPlayerType() === t);
  }
  UpdateCardBelongPlayerType(e, t = undefined) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("GuessJokerCard", 78, `更新卡牌归属玩家类型：${e.join(",")}, ${t}`);
    }
    for (const s of e) {
      var r = this.rnu.get(s);
      if (r) {
        r.SetBelongPlayerType(t);
      }
    }
  }
  GetLevelIdByNpcId(e) {
    e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelByNpcId(e);
    if (e === undefined) {
      return -1;
    } else {
      return e.Id;
    }
  }
  GetLastUsedPlotId(e) {
    return this.CTg.get(e) ?? undefined;
  }
  SetLastUsedPlotId(e, t) {
    this.CTg.set(e, t);
  }
  CheckBlankCardDisable() {
    for (const e of this.rnu.values()) {
      if (e.Type === 2) {
        return false;
      }
    }
    return true;
  }
  GetAiSkillId() {
    var e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(this.yq);
    if (e) {
      return e.AiCardSkill;
    } else {
      return -1;
    }
  }
  MarkRoundStartTipShown(e) {
    this.x8g.set(e, true);
  }
  HasShownRoundStartTip(e) {
    return this.x8g.get(e) === true;
  }
  IsInFirstTutorial() {
    var e;
    return !!this.C_u && this.yq === GuessJokerDefine_1.GUESS_JOKER_JINXI_LEVEL_ID && !!(e = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetGuessJokerGameData(this.yq)) && !e.FirstPass;
  }
  GetPlayerNameByType(e) {
    if (e === 0) {
      return ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    } else {
      e = this.GetRoleId();
      if (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)) {
        e = e.Name;
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? e;
      } else {
        return "";
      }
    }
  }
  EnterNpcPokerState(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (!e || !e.Entity) {
      return false;
    }
    e.Entity.GetComponent(110)?.SyncLinkGameplayAnimBlueprint(2);
    var t = e.Entity.GetComponent(48);
    if (!t) {
      return false;
    }
    t.IsRegionMoveMode = true;
    t = e.Entity.GetComponent(3)?.Actor?.Mesh;
    return !!t && !!(e = t.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY)) && (e.SetPokerState(0), true);
  }
  SetNpcPokerState(e) {
    var t;
    var r = this.GetNpcAnimInst(this.EntityId);
    return !!r && (e !== 1 && e !== 2 || (t = Math.floor(Math.random() * GuessJokerDefine_1.GUESS_JOKER_AI_BECHOOSE_CARD_EMOTION_COUNT), r.SetBeChooseEmotionIndex(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("GuessJokerCard", 78, "Set NPC Be Choose Emotion Index：" + t)), Log_1.Log.CheckDebug() && Log_1.Log.Debug("GuessJokerCard", 78, "Set NPC Poker State：" + (0, GuessJokerDefine_1.getPokerStateName)(e)), r.SetPokerState(e), true);
  }
  SetNpcEnterInteractiveStage(e) {
    var t = this.GetNpcAnimInst(this.EntityId);
    if (t) {
      t.SetPlayerInteractiveStage(e);
    }
  }
  UpdateNpcIdleState() {
    var e = this.GetHandCardsByPlayer(1);
    var t = this.GetHandCardsByPlayer(0);
    var r = e.length;
    var t = t.length;
    var e = e.some(e => e.Type === 1);
    let s = 0;
    s = t > GuessJokerDefine_1.GUESS_JOKER_CARD_PLAYER_CARDS_COUNT_LIMIT_ADVANTAGE ? 0 : t < GuessJokerDefine_1.GUESS_JOKER_CARD_PLAYER_CARDS_COUNT_LIMIT_ADVANTAGE && e ? 1 : r < GuessJokerDefine_1.GUESS_JOKER_CARD_AI_CARDS_COUNT_LIMIT_ADVANTAGE && e ? 2 : 0;
    this.SetNpcIdleState(s);
  }
  SetNpcIdleState(e) {
    var t = this.GetNpcAnimInst(this.EntityId);
    return !!t && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("GuessJokerCard", 78, "【action】Set NPC Idle State：" + (0, GuessJokerDefine_1.getPokerIdleStateName)(e)), t.SetPokerIdleState(e), true);
  }
  GetNpcAnimInst(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (t && t.Entity) {
      t = t.Entity.GetComponent(3)?.Actor?.Mesh;
      if (t) {
        t = t.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY);
        if (t) {
          return t;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker获取NPC动画实例失败：动画实例不存在", ["NpcId", e], ["AnimInstance", t ? "存在" : "不存在"]);
        }
      }
    }
  }
  GetLevelIdList() {
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelList()) {
      e.push(t.Id);
    }
    if (e.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker获取关卡ID列表失败：关卡配置表为空");
      }
      return [];
    } else {
      return e;
    }
  }
  SetActiveDialogLogic(e) {
    this.COg = e;
  }
  GetActiveDialogLogic() {
    return this.COg;
  }
  SetPlayerDrawnCard(e) {
    this.LOg = e;
  }
  SetAiDrawnCard(e) {
    this.wOg = e;
  }
  HasPlayerNewCardInHand() {
    var e;
    return this.LOg !== undefined && (e = this.rnu.get(this.LOg)) !== undefined && e.GetBelongPlayerType() === 0;
  }
  HasAiNewCardInHand() {
    var e;
    return this.wOg !== undefined && (e = this.rnu.get(this.wOg)) !== undefined && e.GetBelongPlayerType() === 1;
  }
  ClearPlayerDrawnCard() {
    this.LOg = undefined;
  }
  ClearAiDrawnCard() {
    this.wOg = undefined;
  }
  EnableGuessJokerNpcSit(e) {
    let t = 0;
    let r = 0;
    for (const s of ConfigManager_1.ConfigManager.GuessJokerConfig.GetNpcAndChairMatchInfo()) {
      if (s.NpcId === e || s.ChairId === e) {
        t = s.ChairId;
        r = s.NpcId;
        break;
      }
    }
    if (t !== 0 && r !== 0 && !(this.mVg.add(r), this._Vg)) {
      this._Vg = TimerSystem_1.GameplayTimerSystem.Forever(this.cVg, TimerSystem_1.MIN_TIME);
    }
  }
  dVg() {
    if (this.mVg.size !== 0) {
      for (const t of this.mVg) {
        var e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetNpcAndChairMatchInfo().find(e => e.NpcId === t)?.ChairId ?? 0;
        if (e) {
          if (this.fVg(t) && this.gVg(e)) {
            this.GuessJokerDoSitDown(t, e);
            this.mVg.delete(t);
          }
        } else {
          this.mVg.delete(t);
        }
      }
      if (this.mVg.size === 0 && this._Vg && TimerSystem_1.GameplayTimerSystem.Has(this._Vg)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this._Vg);
        this._Vg = undefined;
      }
    }
  }
  fVg(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity;
    return !!e && !!e?.GetComponent(98);
  }
  gVg(e) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity;
    return !!e && !!(e = e.GetComponent(209)) && !!(e = e.GetSubEntityInteractLogicController()) && !!e.IsSceneInteractionLoadCompleted();
  }
  GuessJokerDoSitDown(e, t) {
    var r;
    var s;
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity;
    if (i && (r = i?.GetComponent(98), t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity, r) && t && (s = t.GetComponent(209)?.GetSubEntityInteractLogicController()) && s.IsSceneInteractionLoadCompleted()) {
      s?.Possess(i);
      s?.IgnoreCollision();
      r.DoSitDownAction(t);
      if ((s = i.GetComponent(188)?.MainAnimInstance)?.LogicParams) {
        s.LogicParams.SitDownType = 1;
        s.LogicParams.bSitDown = true;
      }
      this.EnterNpcPokerState(e);
    }
  }
  GetAllGuessJokerNpcIds() {
    var e = [];
    for (const r of ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelList()) {
      var t = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(r.AiRole);
      if (t) {
        e.push(t.NpcId);
      }
    }
    return e;
  }
  CheckIsGuessJokerEntityId(e) {
    let t = false;
    for (const r of ConfigManager_1.ConfigManager.GuessJokerConfig.GetNpcAndChairMatchInfo()) {
      if (r.NpcId === e || r.ChairId === e) {
        t = true;
        break;
      }
    }
    return t;
  }
  HideAllGuessJokerNpc() {
    for (const e of this.GetAllGuessJokerNpcIds()) {
      this.HideGuessJokerNpc(e);
    }
  }
  ShowAllGuessJokerNpc() {
    for (const e of this.GetAllGuessJokerNpcIds()) {
      this.YGg(e);
    }
  }
  ShowOnlyGuessJokerNpc(e) {
    for (const t of this.GetAllGuessJokerNpcIds()) {
      if (t === e) {
        this.YGg(t);
      } else {
        this.HideGuessJokerNpc(t);
      }
    }
  }
  HideGuessJokerNpc(e) {
    var t;
    if (!this.JFg.has(e)) {
      if (this.GetAllGuessJokerNpcIds().includes(e) && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))?.Valid && t.Entity) {
        CreatureController_1.CreatureController.SetEntityEnable(t.Entity, false, "[GuessJoker] 隐藏猜鬼牌NPC");
        this.JFg.add(e);
      }
    }
  }
  YGg(e) {
    var t;
    if (this.JFg.has(e)) {
      if ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))?.Valid && t.Entity) {
        CreatureController_1.CreatureController.SetEntityEnable(t.Entity, true, "[GuessJoker] 显示猜鬼牌NPC");
      }
      this.JFg.delete(e);
    }
  }
  ClearHideJokerNpcRecord(e) {
    this.JFg.delete(e);
  }
  async OpenSelectRoleView(e = 0) {
    if (ModelManager_1.ModelManager.SpringManorModel.ActivityData) {
      this.ShowAllGuessJokerNpc();
      await UiManager_1.UiManager.OpenViewAsync("GuessJokerSelectRoleView", e === 0 ? this.yq : e);
    }
  }
  CheckRedDot() {
    var e = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    if (!e) {
      return false;
    }
    if (!e.IsFunctionUnlocked(1)) {
      return false;
    }
    let t = 0;
    let r = false;
    for (const a of ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelList()) {
      var s = e.GetGuessJokerGameData(a.Id);
      if (s) {
        if (s.FirstPass && !s.RewardGet) {
          r = true;
          break;
        }
        if (s.Unlock && !s.FirstPass) {
          t = a.Id;
          break;
        }
      }
    }
    var i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GuessJokerUnlockLevelClicked) ?? new Set();
    return r || t !== 0 && !i.has(t);
  }
  GetSkillEffectPlayStrategy(e) {
    e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerSkill(e);
    if (e && e.EffectPlayStrategy === 1) {
      return 1;
    } else {
      return 0;
    }
  }
  ShouldPlaySkillEffect(e) {
    switch (this.GetSkillEffectPlayStrategy(e)) {
      case 0:
        return true;
      case 1:
        return false;
      default:
        return true;
    }
  }
  ShowPlayGiveUpSkillTip(e) {
    e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerSkill(e);
    return !!e && e.ShowGiveUpTip;
  }
  GuessJokerExitSaveReport() {
    var e;
    var t;
    var r;
    if (this.C_u) {
      (e = new LogReportDefine_1.GuessJokerExitSaveReport()).i_level_id = this.yq;
      e.s_trace_id = this.DHg;
      e.i_turn_id = this.RoundNumber;
      t = this.GetRoleData(0)?.GetHp() ?? 0;
      r = this.GetRoleData(1)?.GetHp() ?? 0;
      e.i_role_hp = t;
      e.i_enemy_hp = r;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    }
  }
}
exports.GuessJokerGamePlayModel = GuessJokerGamePlayModel;
//# sourceMappingURL=GuessJokerGamePlayModel.js.map