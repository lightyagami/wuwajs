"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleController = void 0;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  TeleportController_1 = require("../../Teleport/TeleportController"),
  PhantomArenaController_1 = require("../PhantomArenaController"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine"),
  PhantomArenaAssetManager_1 = require("./PhantomArenaAssetManager"),
  PhantomArenaDefine_2 = require("./PhantomArenaDefine"),
  PhantomArenaBattleDetailsViewProxy_1 = require("./View/Bvb/PhantomArenaBattleDetailsViewProxy");
class PhantomArenaBattleController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, PhantomArenaBattleController.FWe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.gsu)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, PhantomArenaBattleController.FWe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.gsu)
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(27549, PhantomArenaBattleController.hD1), Net_1.Net.Register(16322, PhantomArenaBattleController.lD1), Net_1.Net.Register(23003, PhantomArenaBattleController._D1), Net_1.Net.Register(29772, PhantomArenaBattleController.uD1), Net_1.Net.Register(15578, PhantomArenaBattleController.cD1), Net_1.Net.Register(28072, PhantomArenaBattleController.dD1), Net_1.Net.Register(18094, PhantomArenaBattleController.mD1), Net_1.Net.Register(28785, PhantomArenaBattleController.PhantomBattleDealCardNotify), Net_1.Net.Register(20319, PhantomArenaBattleController.gD1), Net_1.Net.Register(26777, PhantomArenaBattleController.CD1), Net_1.Net.Register(23422, PhantomArenaBattleController.s31), Net_1.Net.Register(27764, PhantomArenaBattleController.a31), Net_1.Net.Register(16084, PhantomArenaBattleController.vD1), Net_1.Net.Register(24738, PhantomArenaBattleController.yD1), Net_1.Net.Register(23923, PhantomArenaBattleController.SD1), Net_1.Net.Register(24175, PhantomArenaBattleController.PhantomBattleBoardSettleNotify), Net_1.Net.Register(19442, PhantomArenaBattleController.D21), Net_1.Net.Register(16340, PhantomArenaBattleController.U21), Net_1.Net.Register(28525, PhantomArenaBattleController.B21), Net_1.Net.Register(26840, PhantomArenaBattleController.A31), Net_1.Net.Register(18271, PhantomArenaBattleController.WK1), Net_1.Net.Register(29780, PhantomArenaBattleController.oou), Net_1.Net.Register(15454, PhantomArenaBattleController.wou)
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27549), Net_1.Net.UnRegister(16322), Net_1.Net.UnRegister(23003), Net_1.Net.UnRegister(29772), Net_1.Net.UnRegister(15578), Net_1.Net.UnRegister(28072), Net_1.Net.UnRegister(18094), Net_1.Net.UnRegister(28785), Net_1.Net.UnRegister(20319), Net_1.Net.UnRegister(26777), Net_1.Net.UnRegister(23422), Net_1.Net.UnRegister(27764), Net_1.Net.UnRegister(16084), Net_1.Net.UnRegister(24738), Net_1.Net.UnRegister(23923), Net_1.Net.UnRegister(24175), Net_1.Net.UnRegister(19442), Net_1.Net.UnRegister(16340), Net_1.Net.UnRegister(28525), Net_1.Net.UnRegister(26840), Net_1.Net.UnRegister(18271), Net_1.Net.UnRegister(29780), Net_1.Net.UnRegister(15454)
  }
  static OnLeaveLevel() {
    return PhantomArenaAssetManager_1.PhantomArenaAssetManager.Clear(), !0
  }
  static OnClear() {
    return !0
  }
  static _fu() {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    if (e) {
      for (const t of [35, 77, 18, 188, 177, 81, 32, 65, 57, 219, 114]) e.GetComponent(t)?.Disable(PhantomArenaDefine_2.ENTITY_COMPONENT_DISABLE_KEY);
      var o = Global_1.Global.BaseCharacter.CharacterActorComponent.Actor;
      o.CapsuleComponent.SetCollisionResponseToAllChannels(0), o.Mesh.SetCollisionResponseToAllChannels(0), o.CapsuleComponent.SetCollisionResponseToChannel(0, 2), o.Mesh.SetCollisionResponseToChannel(0, 2)
    }
  }
  static OpenPhantomArenaBattleDetailsView() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "BVB战斗开始");
    var e = new PhantomArenaBattleDetailsViewProxy_1.PhantomArenaBattleDetailsViewProxy;
    UiManager_1.UiManager.OpenView("PhantomArenaBattleDetailsView", e, () => {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(!0)
    })
  }
  static TestBattleSettleResultForGm(e) {
    ModelManager_1.ModelManager.PhantomArenaBattleModel.SetTurnCountResultEnd(!0), this.PhantomBattleBoardSettleNotify(e)
  }
  static dgu(e, o) {
    return 0 === o && 2 === e || 1 === o && 1 === e
  }
  static mgu(e) {
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e),
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (!this.dgu(o.Type, t)) {
      o = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData();
      if (o) {
        o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(o.Id).MainRoleSexChange.get(e);
        if (void 0 !== o) {
          var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(o);
          if (this.dgu(a.Type, t)) return o
        }
      }
    }
    return e
  }
  static async RequestEnterPhantomArenaBattleAsync(o, t, a) {
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(o);
    if (r) {
      let e = t;
      t = {
        e8n: o,
        pg1: e = 0 < r.CardGroupId ? this.mgu(r.CardRoleId) : e,
        sC1: a
      };
      ModelManager_1.ModelManager.PhantomArenaBattleModel.InitData(), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId = e, ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId = o, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "进入道馆数据", ["卡牌角色id", e], ["挑战id", o]), ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.aC1 = t, ModelManager_1.ModelManager.PhantomArenaBattleModel.LoadingConfig = t, ModelManager_1.ModelManager.PhantomArenaBattleModel.InstId = r.InstId, await ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(r.InstId, [])
    } else Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "找不到对应的声骸竞技场挑战配置")
  }
  static OpenPhantomArenaChangeCardView() {
    UiManager_1.UiManager.OpenView("PhantomArenaChangeCardView")
  }
  static OpenPhantomArenaBattleLoading() {
    UiManager_1.UiManager.OpenView("PhantomArenaBattleLoading");
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.InstId,
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e),
      o = Vector_1.Vector.Create(e.BornPosition[0], e.BornPosition[1], e.BornPosition[2]),
      e = Rotator_1.Rotator.Create(e.BornRotation[0], e.BornRotation[2], e.BornRotation[1]);
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(o.ToUeVector(), e.ToUeRotator(), "OnPhantomBvbStart")
  }
  static OpenPhantomArenaCoreCardView(e) {
    e = {
      Callback: e
    };
    UiManager_1.UiManager.OpenView("PhantomArenaCoreCardView", e)
  }
  static OpenPhantomArenaStartView(e) {
    UiManager_1.UiManager.OpenView("PhantomArenaStartView", e)
  }
  static SwitchPhantomArenaBattleViewState(e) {
    var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
    o && o.OpenParam.ProcessManager.SetState(e)
  }
  static ShowTimeEndConfirm(e) {
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(323);
    o.ToggleTextKey = "PhantomBattle_1113", o.HasToggle = !0, o.FunctionMap.set(2, e), o.SetToggleFunction(this.mnu), PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(o)
  }
  static RequestPhantomBattleStart() {
    var e = Protocol_1.Aki.Protocol.Mx1.create();
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场开始对局"), Net_1.Net.Call(20998, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21523) : Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场开始对局返回成功"))
    })
  }
  static RequestPhantomBattleDealCardReplace(e) {
    var o = Protocol_1.Aki.Protocol.Mf1.create();
    o.oC1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌替换选择", ["卡牌id", e]), Net_1.Net.Call(20910, o, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26282) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.SetReplaceCardToHandCard(e), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌替换选择返回成功")))
    })
  }
  static async RequestPhantomBattleEnterSlot(e, o) {
    var t = Protocol_1.Aki.Protocol.If1.create(),
      a = (t.Mg1 = e, t.Ig1 = o, ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData);
    a.RequestCardId = e;
    const r = a.GetHandCardDataByCardId(e),
      n = (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌上阵", ["卡牌id", e], ["位置", o]), new CustomPromise_1.CustomPromise);
    return Net_1.Net.Call(15534, t, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21347), n.SetResult(!1)) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.HandCardToFightCard(r, e.Vg1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌上阵返回成功"), n.SetResult(!0)) : n.SetResult(!1)
    }), n.Promise
  }
  static async RequestPhantomBattleLeaveSlot(e) {
    var o = Protocol_1.Aki.Protocol.gM1.create();
    o.Ig1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌下阵", ["位置", e]);
    const t = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(17019, o, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29849) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FightCardToHandCard(e.xg1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌下阵返回成功"))), t.SetResult()
    }), t.Promise
  }
  static async RequestPhantomBattleSlotInstead(e, o) {
    var t = Protocol_1.Aki.Protocol.Bf1.create();
    t.GM1 = e, t.FM1 = o, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场卡牌替换交换", ["位置A", e], ["位置B", o]);
    const a = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(20081, t, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20082), a.SetResult(!1)) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.ExchangeBattleCardData(e.FM1, e.GM1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场卡牌替换交换返回成功"), a.SetResult(!0)) : a.SetResult(!1)
    }), a.Promise
  }
  static async RequestPhantomBattleEvolve(e, o) {
    var t = Protocol_1.Aki.Protocol.bf1.create(),
      a = (t.Mg1 = e, t.Ig1 = o, ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData);
    a.RequestCardId = e;
    const r = a.GetHandCardDataByCardId(e),
      n = (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌进化", ["卡牌id", e], ["位置", o]), new CustomPromise_1.CustomPromise);
    return Net_1.Net.Call(23855, t, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19594), n.SetResult(!1)) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.EvolveBattleCardData(r, e), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌进化返回成功"), n.SetResult(!0)) : n.SetResult(!1)
    }), n.Promise
  }
  static async RequestPhantomBattleSelectTarget(e) {
    var o = Protocol_1.Aki.Protocol.vM1.create();
    o.VM1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场选择目标", ["目标id", e]);
    const t = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(20203, o, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21503), t.SetResult(!1)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场选择目标返回成功"), t.SetResult(!0)) : t.SetResult(!1)
    }), t.Promise
  }
  static async RequestPhantomBattleBackLibrary(e) {
    var o = Protocol_1.Aki.Protocol.Lf1.create();
    o.Mg1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌放回牌库", ["卡牌id", e]);
    const t = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(25326, o, e => {
      var o;
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23096), t.SetResult(!1)) : ((o = ModelManager_1.ModelManager.PhantomArenaBattleModel).OwnData.RefreshCardLibraryNum(e.OM1), o.OwnData.HandCardToRecycle(e.Mg1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌放回牌库返回成功"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState), t.SetResult(!0)) : t.SetResult(!1)
    }), t.Promise
  }
  static async RequestPhantomBattleBackSlotCardLibrary(e) {
    var o = Protocol_1.Aki.Protocol.wtu.create();
    o.Mg1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场上阵卡牌放回牌库", ["卡牌id", e]);
    const t = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(24932, o, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23663), t.SetResult(!1)) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FightCardToRecycle(e), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场上阵卡牌放回牌库返回成功"), t.SetResult(!0)) : t.SetResult(!1)
    }), t.Promise
  }
  static async RequestPhantomBattleRoundOver() {
    var e = Protocol_1.Aki.Protocol.Uf1.create();
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场结束回合请求");
    const o = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(21569, e, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24022), o.SetResult(!1)) : ((e = ModelManager_1.ModelManager.PhantomArenaBattleModel).IsBattleLoading = !0, e.CurrentLoading = 0, e.OwnData.ClearHandData(), e.OpponentData.ClearHandData(), e.BattleData.CreatePrepareLoadingPromise(), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场结束回合请求返回成功"), o.SetResult(!0)) : o.SetResult(!1)
    }), o.Promise
  }
  static async RequestPhantomBattleNpcShowOverRequest() {
    var e = Protocol_1.Aki.Protocol.fx1.create();
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场Npc战报播放完成请求");
    const o = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(17111, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28120) : Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场Npc战报播放完成请求返回成功")), o.SetResult()
    }), o.Promise
  }
  static RequestBvbLoadingFinish() {
    var e = Protocol_1.Aki.Protocol.px1.create();
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场Bvb战斗请求"), Net_1.Net.Call(23062, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18160) : Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场Bvb战斗请求返回成功"))
    })
  }
  static async RequestBattleCardRoleSkill(e, o) {
    var t = Protocol_1.Aki.Protocol.qE1.create();
    t.r5n = e, t.Gg1 = o, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "使用角色技能请求", ["技能id", e], ["目标id", o]);
    const a = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(16188, t, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23596), a.SetResult(!1)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "使用角色技能请求返回成功"), ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkill(e.AM1), a.SetResult(!0)) : a.SetResult(!1)
    }), a.Promise
  }
  static async RequestBattleCardSkill(o, e) {
    var t = Protocol_1.Aki.Protocol.FE1.create();
    t.jg1 = o, t.Gg1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象", ["卡牌id", o], ["目标id", e]);
    const a = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(17043, t, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16026), a.SetResult(!1)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象返回成功"), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RemoveHandCardByCardId(o), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshCardLibraryNum(e.meu), ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkill(e.AM1), a.SetResult(!0)) : a.SetResult(!1)
    }), a.Promise
  }
  static async RequestPhantomBattleDiscardCard(e) {
    var o = Protocol_1.Aki.Protocol.g21.create();
    o.b21 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场弃牌请求", ["卡牌id", e]);
    const t = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(23423, o, e => {
      var o;
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23594), t.SetResult(!1)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场弃牌请求返回成功"), (o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).RefreshCardLibraryNum(e.OM1), o.RemoveHandDataList(e.b21), t.SetResult(!0)) : t.SetResult(!1)
    }), t.Promise
  }
  static async RequestPhantomBattleCardTargetInfo(e, o) {
    var t = Protocol_1.Aki.Protocol.CG1.create();
    t.jg1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "获取技能目标信息", ["卡牌id", e]);
    const a = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(26604, t, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19198), a.SetResult(!1)) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.SetCardSkillTriggerInfo(e.EG1, e.VM1, e.D8n, e.jg1, o), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "获取技能目标信息返回成功"), a.SetResult(!0)) : a.SetResult(!1)
    }), a.Promise
  }
  static async RequestPhantomBattleCardRoleTargetInfo(e) {
    var o = Protocol_1.Aki.Protocol.vG1.create();
    o.r5n = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "获取角色技能目标信息", ["技能id", e]);
    const t = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(16328, o, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23420), t.SetResult(!1)) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.SetRoleSkillTriggerInfo(e.EG1, e.VM1, e.D8n, e.r5n), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "获取角色技能目标信息返回成功"), t.SetResult(!0)) : t.SetResult(!1)
    }), t.Promise
  }
  static async RequestPhantomBattleCardSelect(e) {
    var o = Protocol_1.Aki.Protocol.H21.create();
    o.Mg1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "选择卡牌请求", ["卡牌id", e]);
    const t = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(21937, o, e => {
      var o;
      e ? e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 29489), t.SetResult(!1)) : ((o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).RefreshCardLibraryNum(e.OM1), o.AddHandDataList(e.wg1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "选择卡牌请求返回成功"), t.SetResult(!0)) : t.SetResult(!1)
    }), t.Promise
  }
  static async RequestPhantomBattleSelectReserveCard(e) {
    var o = Protocol_1.Aki.Protocol.Uru.create();
    o.qru = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "选择保留卡牌请求", ["卡牌id", e]);
    const t = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(27219, o, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19557), t.SetResult(!1)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "选择保留卡牌请求返回成功"), t.SetResult(!0)) : t.SetResult(!1)
    }), t.Promise
  }
  static async RequestPhantomBattleSlotCardSkill(o, e) {
    var t = Protocol_1.Aki.Protocol.vou.create();
    t.jg1 = o, t.Gg1 = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象", ["卡牌id", o], ["目标id", e]);
    const a = new CustomPromise_1.CustomPromise;
    return Net_1.Net.Call(29615, t, e => {
      e ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23250), a.SetResult(!1)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象返回成功"), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FightCardToFunctional(o), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshCardLibraryNum(e.meu), ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkill(e.AM1), a.SetResult(!0)) : a.SetResult(!1)
    }), a.Promise
  }
}
exports.PhantomArenaBattleController = PhantomArenaBattleController, (_a = PhantomArenaBattleController).FWe = () => {
  var e;
  ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && 36 === ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.InstSubType && ((e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView")) && e.OpenParam.RefreshByWorldDone(), _a._fu())
}, PhantomArenaBattleController.hD1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "游戏开始,通知棋盘数据");
  var o, t = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  t.ChallengeId = e.e8n;
  for (const a of e.Vg1) a.fg1 && (o = a.dg1, 0 === a.fg1.Cg1 ? (t.OpponentData.FightId = o, t.OpponentData.InitPlayerData(a.fg1)) : 1 === a.fg1.Cg1 && (t.OwnData.FightId = o, t.OwnData.InitPlayerData(a.fg1)));
  t.InitTaskData(e.y21)
}, PhantomArenaBattleController.lD1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "回合切换,通知玩家数据");
  var o, t = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  t.SetRound(e.Ag1);
  for (const a of e.Vg1) a.fg1 && (o = a.dg1, 0 === a.fg1.Cg1 ? (t.OpponentData.FightId = o, t.OpponentData.InitPlayerData(a.fg1)) : 1 === a.fg1.Cg1 && (t.OwnData.FightId = o, t.OwnData.InitPlayerData(a.fg1)));
  t.OpponentData.CreateInitPromise()
}, PhantomArenaBattleController._D1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "手牌更新,同步手牌状态"), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.AddHandDataList(e.xg1)
}, PhantomArenaBattleController.uD1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "Npc战斗信息通知", ["操作数量", e.rC1.length]), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.InitNpcAiOperationData(e.rC1)
}, PhantomArenaBattleController.cD1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "玩家进入部署")
}, PhantomArenaBattleController.dD1 = e => {
  0 === e.Cg1 ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "Npc战斗资源变化通知"), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshBattleStatus(e.vg1)) : 1 === e.Cg1 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "玩家战斗资源变化通知"), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshBattleStatus(e.vg1))
}, PhantomArenaBattleController.mD1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌战斗属性变化通知"), ModelManager_1.ModelManager.PhantomArenaBattleModel.RefreshFighterAttr(e.Qg1, e.vg1)
}, PhantomArenaBattleController.PhantomBattleDealCardNotify = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场发牌");
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  o.GetTurnCountResultEnd() ? (o.OwnData.RefreshCardLibraryNum(e.OM1), o.OwnData.InitHandData(e.wg1), AudioSystem_1.AudioSystem.SetState("arena_battle", "none"), UiManager_1.UiManager.CloseView("PhantomArenaBattleDetailsView", () => {
    PhantomArenaBattleController.SwitchPhantomArenaBattleViewState(1)
  })) : o.SetDealCardNotify(e)
}, PhantomArenaBattleController.gD1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场发牌替换通知");
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  o.ReplaceCardData.ReplaceNum = e.qM1, 0 === e.qM1 ? o.SetReplaceCardToHandCardWithoutChange(e.wg1) : o.ReplaceCardData.SetReplaceCardData(e.wg1), PhantomArenaBattleController.SwitchPhantomArenaBattleViewState(1)
}, PhantomArenaBattleController.CD1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场目标选择通知");
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  o && o.OpenParam.TriggerPassiveSkillInteract(e)
}, PhantomArenaBattleController.s31 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场被动技能触发通知"), ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkillList(e.jM1, 23422)
}, PhantomArenaBattleController.a31 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场卡牌buff触发通知"), ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataByEffectList(e.Xg1, 27764)
}, PhantomArenaBattleController.vD1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "BVB部署完成 通知loading");
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData;
  o.Clear(), o.SetNpcMonsterEntityData(e.Lx1), o.SetPlayerEntityData(e.wx1), o.FinishPrepareLoadingPromise()
}, PhantomArenaBattleController.yD1 = () => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "唤醒实体AI"), UiManager_1.UiManager.OpenView("PhantomArenaBattleFloatTips");
  for (const t of ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetAllEntityIdList()) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      o = e?.Entity;
    e?.Valid && o?.IsStart && (o.GetComponent(47)?.EnableAi("PhantomArenaBattle") || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 77, "唤醒实体AI失败"))
  }
}, PhantomArenaBattleController.SD1 = e => {
  ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(!1), UiManager_1.UiManager.CloseView("PhantomArenaBattleFloatTips"), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "BVB结算");
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData;
  o.NpcDeduceLife = e.Dx1, o.NpcCurLife = e.Ux1, o.PlayerDeduceLife = e.Px1, o.PlayerCurLife = e.xx1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaStartTurnResult, e.Ax1, o.NpcDeduceLife, o.NpcCurLife, o.PlayerDeduceLife, o.PlayerCurLife)
}, PhantomArenaBattleController.PhantomBattleBoardSettleNotify = o => {
  if (ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(!1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "BVB结算同步"), ModelManager_1.ModelManager.PhantomArenaBattleModel.GetTurnCountResultEnd()) {
    const t = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.Ytu(o)
    };
    o.DS_ && 0 !== o.DS_.$61 ? ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.ztu(o, () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCardItemIdInBattleResult(o.DS_);
      e.length <= 0 ? t() : ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.yru(e, t)
    }) : t()
  } else ModelManager_1.ModelManager.PhantomArenaBattleModel.SetPhantomBattleBoardSettleNotify(o)
}, PhantomArenaBattleController.ztu = (e, o) => {
  e = {
    Result: e,
    CallbackOnClose: o
  };
  UiManager_1.UiManager.OpenView("PhantomArenaBattleResultView", e)
}, PhantomArenaBattleController.yru = (e, o) => {
  e = {
    CardIdList: e,
    CallbackOnClose: o
  };
  UiManager_1.UiManager.OpenView("PhantomArenaCardsRewardView", e)
}, PhantomArenaBattleController.Ytu = e => {
  var o = {
      ButtonTextId: "Text_Confirm_Text",
      DescriptionTextId: void 0,
      IsTimeDownCloseView: !1,
      IsClickedCloseView: !0,
      OnClickedCallback: () => {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon(), ModelManager_1.ModelManager.PhantomArenaBattleModel.OnClickExitButtonConfirm()
      }
    },
    o = {
      ConfigId: e.Ax1 ? PhantomArenaDefine_1.INSTANCE_SUCCESS : PhantomArenaDefine_1.INSTANCE_FAIL,
      IsSuccess: e.Ax1,
      ButtonInfoList: [o],
      IsBagFull: !1
    },
    e = ModelManager_1.ModelManager.PhantomArenaModel.GetRewardItemDataInBattleResult(e.DS_);
  0 < e.length && (o.RewardItemDataList = e), ControllerHolder_1.ControllerHolder.ItemRewardController.OpenExploreRewardViewNew(o)
}, PhantomArenaBattleController.D21 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场弃牌通知");
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  o && o.OpenParam.ServerActionQueue.PushDiscardCardAction(e)
}, PhantomArenaBattleController.U21 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "任务更新"), ModelManager_1.ModelManager.PhantomArenaBattleModel.RefreshTaskData(e.y21)
}, PhantomArenaBattleController.B21 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "任务卡牌发牌");
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  if (o) {
    o = o.OpenParam;
    if (o.ProcessManager.IsInOwnPlaying) return void o.ServerActionQueue.PushFourTaskAction(e.xg1)
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.AddFourCostCard(e.xg1)
}, PhantomArenaBattleController.A31 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌数据更新通知");
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel,
    t = o.OpponentData.GetCardDataByFightId(e.jg1);
  (t = t || o.OwnData.GetCardDataByFightId(e.jg1)) && t.NotifyRefreshCardData(e.bM1, e.cnu)
}, PhantomArenaBattleController.WK1 = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌位置交换");
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  (0 === e.Cg1 ? o.OpponentData : o.OwnData).NotifyExchangeBattleCard(e.fK1)
}, PhantomArenaBattleController.oou = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场选择卡牌保留");
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  o && o.OpenParam.ServerActionQueue.PushReserveCardAction(e)
}, PhantomArenaBattleController.wou = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "声骸竞技场开始燃血buff"), ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(PhantomArenaDefine_1.BVB_SPEEDUP_TIPS)
}, PhantomArenaBattleController.mnu = e => {
  ModelManager_1.ModelManager.PhantomArenaBattleModel.IsNeedShowTimeEndConfirm = !e
}, PhantomArenaBattleController.gsu = (e, o, t) => {
  var a;
  ModelManager_1.ModelManager.PhantomArenaBattleModel.IsBattleLoading && (ModelManager_1.ModelManager.PhantomArenaBattleModel.CurrentLoading++, a = o.Entity, o?.Valid && a?.IsStart ? (o = a.GetComponent(47)) && (o.SetAllAiSenseEnableWithoutForbidAllSense(!1), o.AddOrRemoveAiScene(PhantomArenaDefine_2.AI_SENSE_ID, !0), o.SetAiHateConfig(PhantomArenaDefine_2.AI_HATE_ID), o.DisableAi("PhantomArenaBattle")) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "找不到实体,无法设置仇恨以及感知信息"))
};
//# sourceMappingURL=PhantomArenaBattleController.js.map