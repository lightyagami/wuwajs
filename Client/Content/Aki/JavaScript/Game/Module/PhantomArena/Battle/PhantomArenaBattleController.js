"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleController = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const TeleportController_1 = require("../../Teleport/TeleportController");
const PhantomArenaController_1 = require("../PhantomArenaController");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const PhantomArenaAssetManager_1 = require("./PhantomArenaAssetManager");
const PhantomArenaDefine_2 = require("./PhantomArenaDefine");
class PhantomArenaBattleController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, PhantomArenaBattleController.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Ecu);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, PhantomArenaBattleController.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ecu);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17836, PhantomArenaBattleController.OD1);
    Net_1.Net.Register(20971, PhantomArenaBattleController.qD1);
    Net_1.Net.Register(29135, PhantomArenaBattleController.GD1);
    Net_1.Net.Register(26390, PhantomArenaBattleController.FD1);
    Net_1.Net.Register(27912, PhantomArenaBattleController.ND1);
    Net_1.Net.Register(28696, PhantomArenaBattleController.VD1);
    Net_1.Net.Register(20065, PhantomArenaBattleController.jD1);
    Net_1.Net.Register(22880, PhantomArenaBattleController.PhantomBattleDealCardNotify);
    Net_1.Net.Register(26562, PhantomArenaBattleController.$D1);
    Net_1.Net.Register(18151, PhantomArenaBattleController.WD1);
    Net_1.Net.Register(27723, PhantomArenaBattleController.q31);
    Net_1.Net.Register(24809, PhantomArenaBattleController.G31);
    Net_1.Net.Register(22328, PhantomArenaBattleController.KD1);
    Net_1.Net.Register(15445, PhantomArenaBattleController.XD1);
    Net_1.Net.Register(27047, PhantomArenaBattleController.YD1);
    Net_1.Net.Register(26521, PhantomArenaBattleController.PhantomBattleBoardSettleNotify);
    Net_1.Net.Register(21974, PhantomArenaBattleController._G1);
    Net_1.Net.Register(28127, PhantomArenaBattleController.uG1);
    Net_1.Net.Register(17356, PhantomArenaBattleController.cG1);
    Net_1.Net.Register(22563, PhantomArenaBattleController.a41);
    Net_1.Net.Register(26459, PhantomArenaBattleController.uY1);
    Net_1.Net.Register(16725, PhantomArenaBattleController.vhu);
    Net_1.Net.Register(20510, PhantomArenaBattleController.Hhu);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17836);
    Net_1.Net.UnRegister(20971);
    Net_1.Net.UnRegister(29135);
    Net_1.Net.UnRegister(26390);
    Net_1.Net.UnRegister(27912);
    Net_1.Net.UnRegister(28696);
    Net_1.Net.UnRegister(20065);
    Net_1.Net.UnRegister(22880);
    Net_1.Net.UnRegister(26562);
    Net_1.Net.UnRegister(18151);
    Net_1.Net.UnRegister(27723);
    Net_1.Net.UnRegister(24809);
    Net_1.Net.UnRegister(22328);
    Net_1.Net.UnRegister(15445);
    Net_1.Net.UnRegister(27047);
    Net_1.Net.UnRegister(26521);
    Net_1.Net.UnRegister(21974);
    Net_1.Net.UnRegister(28127);
    Net_1.Net.UnRegister(17356);
    Net_1.Net.UnRegister(22563);
    Net_1.Net.UnRegister(26459);
    Net_1.Net.UnRegister(16725);
    Net_1.Net.UnRegister(20510);
  }
  static OnLeaveLevel() {
    PhantomArenaAssetManager_1.PhantomArenaAssetManager.Clear();
    return true;
  }
  static OnClear() {
    return true;
  }
  static s2u() {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    if (e) {
      for (const t of [35, 77, 18, 189, 178, 81, 32, 65, 57, 220, 115]) {
        e.GetComponent(t)?.Disable(PhantomArenaDefine_2.ENTITY_COMPONENT_DISABLE_KEY);
      }
      var o = Global_1.Global.BaseCharacter.CharacterActorComponent.Actor;
      o.CapsuleComponent.SetCollisionResponseToAllChannels(0);
      o.Mesh.SetCollisionResponseToAllChannels(0);
      o.CapsuleComponent.SetCollisionResponseToChannel(0, 2);
      o.Mesh.SetCollisionResponseToChannel(0, 2);
    }
  }
  static TestBattleSettleResultForGm(e) {
    ModelManager_1.ModelManager.PhantomArenaBattleModel.SetTurnCountResultEnd(true);
    this.PhantomBattleBoardSettleNotify(e);
  }
  static G3u(e, o) {
    return o === 0 && e === 2 || o === 1 && e === 1;
  }
  static F3u(e) {
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (!this.G3u(o.Type, t)) {
      o = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData();
      if (o) {
        o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(o.Id).MainRoleSexChange.get(e);
        if (o !== undefined) {
          var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(o);
          if (this.G3u(a.Type, t)) {
            return o;
          }
        }
      }
    }
    return e;
  }
  static async RequestEnterPhantomArenaBattleAsync(o, t, a) {
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(o);
    if (r) {
      let e = t;
      t = {
        e8n: o,
        Ng1: e = r.CardGroupId > 0 ? this.F3u(r.CardRoleId) : e,
        wC1: a
      };
      ModelManager_1.ModelManager.PhantomArenaBattleModel.InitData();
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId = e;
      ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId = o;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "进入道馆数据", ["卡牌角色id", e], ["挑战id", o]);
      }
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.AC1 = t;
      ModelManager_1.ModelManager.PhantomArenaBattleModel.LoadingConfig = t;
      ModelManager_1.ModelManager.PhantomArenaBattleModel.InstId = r.InstId;
      await ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(r.InstId, []);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 43, "找不到对应的声骸竞技场挑战配置");
    }
  }
  static OpenPhantomArenaChangeCardView() {
    UiManager_1.UiManager.OpenView("PhantomArenaChangeCardView");
  }
  static OpenPhantomArenaBattleLoading() {
    UiManager_1.UiManager.OpenView("PhantomArenaBattleLoading");
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.InstId;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    var o = Vector_1.Vector.Create(e.BornPosition[0], e.BornPosition[1], e.BornPosition[2]);
    var e = Rotator_1.Rotator.Create(e.BornRotation[0], e.BornRotation[2], e.BornRotation[1]);
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(o.ToUeVector(), e.ToUeRotator(), "OnPhantomBvbStart");
  }
  static OpenPhantomArenaCoreCardView(e) {
    e = {
      Callback: e
    };
    UiManager_1.UiManager.OpenView("PhantomArenaCoreCardView", e);
  }
  static OpenPhantomArenaStartView(e) {
    UiManager_1.UiManager.OpenView("PhantomArenaStartView", e);
  }
  static SwitchPhantomArenaBattleViewState(e) {
    var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
    if (o) {
      o.OpenParam.ProcessManager.SetState(e);
    }
  }
  static ShowTimeEndConfirm(e) {
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(323);
    o.ToggleTextKey = "PhantomBattle_1113";
    o.HasToggle = true;
    o.FunctionMap.set(2, e);
    o.SetToggleFunction(this.E_u);
    PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(o);
  }
  static RequestPhantomBattleStart() {
    var e = Protocol_1.Aki.Protocol.zx1.create();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场开始对局");
    }
    Net_1.Net.Call(29578, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21076);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "声骸竞技场开始对局返回成功");
        }
      }
    });
  }
  static RequestPhantomBattleDealCardReplace(e) {
    var o = Protocol_1.Aki.Protocol.$f1.create();
    o.RC1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌替换选择", ["卡牌id", e]);
    }
    Net_1.Net.Call(19491, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16376);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.SetReplaceCardToHandCard(e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌替换选择返回成功");
          }
        }
      }
    });
  }
  static async RequestPhantomBattleEnterSlot(e, o) {
    var t = Protocol_1.Aki.Protocol.Qf1.create();
    t.$g1 = e;
    t.Qg1 = o;
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
    a.RequestCardId = e;
    const r = a.GetHandCardDataByCardId(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌上阵", ["卡牌id", e], ["位置", o]);
    }
    const n = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(19733, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21980);
          n.SetResult(false);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.HandCardToFightCard(r, e.cC1);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌上阵返回成功");
          }
          n.SetResult(true);
        }
      } else {
        n.SetResult(false);
      }
    });
    return n.Promise;
  }
  static async RequestPhantomBattleLeaveSlot(e) {
    var o = Protocol_1.Aki.Protocol.FM1.create();
    o.Qg1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌下阵", ["位置", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(22133, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20602);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FightCardToHandCard(e.tC1);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌下阵返回成功");
          }
        }
      }
      t.SetResult();
    });
    return t.Promise;
  }
  static async RequestPhantomBattleSlotInstead(e, o) {
    var t = Protocol_1.Aki.Protocol.og1.create();
    t.lE1 = e;
    t._E1 = o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场卡牌替换交换", ["位置A", e], ["位置B", o]);
    }
    const a = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(28197, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18771);
          a.SetResult(false);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.ExchangeBattleCardData(e._E1, e.lE1);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场卡牌替换交换返回成功");
          }
          a.SetResult(true);
        }
      } else {
        a.SetResult(false);
      }
    });
    return a.Promise;
  }
  static async RequestPhantomBattleEvolve(e, o) {
    var t = Protocol_1.Aki.Protocol.Xf1.create();
    t.$g1 = e;
    t.Qg1 = o;
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
    a.RequestCardId = e;
    const r = a.GetHandCardDataByCardId(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌进化", ["卡牌id", e], ["位置", o]);
    }
    const n = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(29212, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27931);
          n.SetResult(false);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.EvolveBattleCardData(r, e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌进化返回成功");
          }
          n.SetResult(true);
        }
      } else {
        n.SetResult(false);
      }
    });
    return n.Promise;
  }
  static async RequestPhantomBattleSelectTarget(e) {
    var o = Protocol_1.Aki.Protocol.jM1.create();
    o.uE1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场选择目标", ["目标id", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(20641, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23894);
          t.SetResult(false);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场选择目标返回成功");
          }
          t.SetResult(true);
        }
      } else {
        t.SetResult(false);
      }
    });
    return t.Promise;
  }
  static async RequestPhantomBattleBackLibrary(e) {
    var o = Protocol_1.Aki.Protocol.zf1.create();
    o.$g1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌放回牌库", ["卡牌id", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(20618, o, e => {
      var o;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22936);
          t.SetResult(false);
        } else {
          (o = ModelManager_1.ModelManager.PhantomArenaBattleModel).OwnData.RefreshCardLibraryNum(e.aE1);
          o.OwnData.HandCardToRecycle(e.$g1);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场手牌放回牌库返回成功");
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState);
          t.SetResult(true);
        }
      } else {
        t.SetResult(false);
      }
    });
    return t.Promise;
  }
  static async RequestPhantomBattleBackSlotCardLibrary(e) {
    var o = Protocol_1.Aki.Protocol.jou.create();
    o.$g1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场上阵卡牌放回牌库", ["卡牌id", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(26956, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26285);
          t.SetResult(false);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FightCardToRecycle(e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场上阵卡牌放回牌库返回成功");
          }
          t.SetResult(true);
        }
      } else {
        t.SetResult(false);
      }
    });
    return t.Promise;
  }
  static async RequestPhantomBattleRoundOver() {
    var e = Protocol_1.Aki.Protocol.ig1.create();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场结束回合请求");
    }
    const o = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(18711, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15144);
          o.SetResult(false);
        } else {
          (e = ModelManager_1.ModelManager.PhantomArenaBattleModel).IsBattleLoading = true;
          e.CurrentLoading = 0;
          e.OwnData.ClearHandData();
          e.OpponentData.ClearHandData();
          e.BattleData.CreatePrepareLoadingPromise();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场结束回合请求返回成功");
          }
          o.SetResult(true);
        }
      } else {
        o.SetResult(false);
      }
    });
    return o.Promise;
  }
  static async RequestPhantomBattleNpcShowOverRequest() {
    var e = Protocol_1.Aki.Protocol.Hx1.create();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场Npc战报播放完成请求");
    }
    const o = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(21984, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29051);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "声骸竞技场Npc战报播放完成请求返回成功");
        }
      }
      o.SetResult();
    });
    return o.Promise;
  }
  static RequestBvbLoadingFinish() {
    var e = Protocol_1.Aki.Protocol.Qx1.create();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场Bvb战斗请求");
    }
    Net_1.Net.Call(27442, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18339);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "声骸竞技场Bvb战斗请求返回成功");
        }
      }
    });
  }
  static async RequestBattleCardRoleSkill(e, o) {
    var t = Protocol_1.Aki.Protocol.lI1.create();
    t.r5n = e;
    t.hC1 = o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "使用角色技能请求", ["技能id", e], ["目标id", o]);
    }
    const a = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(22736, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17633);
          a.SetResult(false);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "使用角色技能请求返回成功");
          }
          ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkill(e.eE1);
          a.SetResult(true);
        }
      } else {
        a.SetResult(false);
      }
    });
    return a.Promise;
  }
  static async RequestBattleCardSkill(o, e) {
    var t = Protocol_1.Aki.Protocol.uI1.create();
    t.uC1 = o;
    t.hC1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象", ["卡牌id", o], ["目标id", e]);
    }
    const a = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(20672, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24061);
          a.SetResult(false);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象返回成功");
          }
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RemoveHandCardByCardId(o);
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshCardLibraryNum(e.ztu);
          ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkill(e.eE1);
          a.SetResult(true);
        }
      } else {
        a.SetResult(false);
      }
    });
    return a.Promise;
  }
  static async RequestPhantomBattleDiscardCard(e) {
    var o = Protocol_1.Aki.Protocol.Q21.create();
    o.rG1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场弃牌请求", ["卡牌id", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(27092, o, e => {
      var o;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19696);
          t.SetResult(false);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场弃牌请求返回成功");
          }
          (o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).RefreshCardLibraryNum(e.aE1);
          o.RemoveHandDataList(e.rG1);
          t.SetResult(true);
        }
      } else {
        t.SetResult(false);
      }
    });
    return t.Promise;
  }
  static async RequestPhantomBattleCardTargetInfo(e, o) {
    var t = Protocol_1.Aki.Protocol.KG1.create();
    t.uC1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "获取技能目标信息", ["卡牌id", e]);
    }
    const a = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(18480, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15818);
          a.SetResult(false);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.SetCardSkillTriggerInfo(e.eF1, e.uE1, e.D8n, e.uC1, o);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "获取技能目标信息返回成功");
          }
          a.SetResult(true);
        }
      } else {
        a.SetResult(false);
      }
    });
    return a.Promise;
  }
  static async RequestPhantomBattleCardRoleTargetInfo(e) {
    var o = Protocol_1.Aki.Protocol.YG1.create();
    o.r5n = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "获取角色技能目标信息", ["技能id", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(28187, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28787);
          t.SetResult(false);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.SetRoleSkillTriggerInfo(e.eF1, e.uE1, e.D8n, e.r5n);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "获取角色技能目标信息返回成功");
          }
          t.SetResult(true);
        }
      } else {
        t.SetResult(false);
      }
    });
    return t.Promise;
  }
  static async RequestPhantomBattleCardSelect(e) {
    var o = Protocol_1.Aki.Protocol.SG1.create();
    o.$g1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "选择卡牌请求", ["卡牌id", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(15943, o, e => {
      var o;
      if (e) {
        if (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 25706);
          t.SetResult(false);
        } else {
          (o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).RefreshCardLibraryNum(e.aE1);
          o.AddHandDataList(e.Jg1);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "选择卡牌请求返回成功");
          }
          t.SetResult(true);
        }
      } else {
        t.SetResult(false);
      }
    });
    return t.Promise;
  }
  static async RequestPhantomBattleSelectReserveCard(e) {
    var o = Protocol_1.Aki.Protocol.Qau.create();
    o.Jau = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "选择保留卡牌请求", ["卡牌id", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(21424, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29070);
          t.SetResult(false);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "选择保留卡牌请求返回成功");
          }
          t.SetResult(true);
        }
      } else {
        t.SetResult(false);
      }
    });
    return t.Promise;
  }
  static async RequestPhantomBattleSlotCardSkill(o, e) {
    var t = Protocol_1.Aki.Protocol.Dhu.create();
    t.uC1 = o;
    t.hC1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象", ["卡牌id", o], ["目标id", e]);
    }
    const a = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(29062, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17723);
          a.SetResult(false);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象返回成功");
          }
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FightCardToFunctional(o);
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshCardLibraryNum(e.ztu);
          ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkill(e.eE1);
          a.SetResult(true);
        }
      } else {
        a.SetResult(false);
      }
    });
    return a.Promise;
  }
}
exports.PhantomArenaBattleController = PhantomArenaBattleController;
(_a = PhantomArenaBattleController).FWe = () => {
  var e;
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.InstSubType === 36) {
    if (e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView")) {
      e.OpenParam.RefreshByWorldDone();
    }
    _a.s2u();
  }
};
PhantomArenaBattleController.OD1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "游戏开始,通知棋盘数据");
  }
  var o;
  var t = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  t.ChallengeId = e.e8n;
  for (const a of e.cC1) {
    if (a.qg1) {
      o = a.kg1;
      if (a.qg1.Fg1 === 0) {
        t.OpponentData.FightId = o;
        t.OpponentData.InitPlayerData(a.qg1);
      } else if (a.qg1.Fg1 === 1) {
        t.OwnData.FightId = o;
        t.OwnData.InitPlayerData(a.qg1);
      }
    }
  }
  t.InitTaskData(e.z21);
};
PhantomArenaBattleController.qD1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "回合切换,通知玩家数据");
  }
  var o;
  var t = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  t.SetRound(e.Zg1);
  for (const a of e.cC1) {
    if (a.qg1) {
      o = a.kg1;
      if (a.qg1.Fg1 === 0) {
        t.OpponentData.FightId = o;
        t.OpponentData.InitPlayerData(a.qg1);
      } else if (a.qg1.Fg1 === 1) {
        t.OwnData.FightId = o;
        t.OwnData.InitPlayerData(a.qg1);
      }
    }
  }
  t.OpponentData.CreateInitPromise();
};
PhantomArenaBattleController.GD1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "手牌更新,同步手牌状态");
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.AddHandDataList(e.tC1);
};
PhantomArenaBattleController.FD1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "Npc战斗信息通知", ["操作数量", e.bC1.length]);
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.InitNpcAiOperationData(e.bC1);
};
PhantomArenaBattleController.ND1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "玩家进入部署");
  }
};
PhantomArenaBattleController.VD1 = e => {
  if (e.Fg1 === 0) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "Npc战斗资源变化通知");
    }
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshBattleStatus(e.Vg1);
  } else if (e.Fg1 === 1) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "玩家战斗资源变化通知");
    }
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshBattleStatus(e.Vg1);
  }
};
PhantomArenaBattleController.jD1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "卡牌战斗属性变化通知");
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.RefreshFighterAttr(e.gC1, e.Vg1);
};
PhantomArenaBattleController.PhantomBattleDealCardNotify = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场发牌");
  }
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  if (o.GetTurnCountResultEnd()) {
    o.OwnData.RefreshCardLibraryNum(e.aE1);
    o.OwnData.InitHandData(e.Jg1);
    AudioSystem_1.AudioSystem.SetState("arena_battle", "none");
    UiManager_1.UiManager.CloseView("PhantomArenaBattleDetailsView", () => {
      PhantomArenaBattleController.SwitchPhantomArenaBattleViewState(1);
    });
  } else {
    o.SetDealCardNotify(e);
  }
};
PhantomArenaBattleController.$D1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场发牌替换通知");
  }
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  o.ReplaceCardData.ReplaceNum = e.hE1;
  if (e.hE1 === 0) {
    o.SetReplaceCardToHandCardWithoutChange(e.Jg1);
  } else {
    o.ReplaceCardData.SetReplaceCardData(e.Jg1);
  }
  PhantomArenaBattleController.SwitchPhantomArenaBattleViewState(1);
};
PhantomArenaBattleController.WD1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场目标选择通知");
  }
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  if (o) {
    o.OpenParam.TriggerPassiveSkillInteract(e);
  }
};
PhantomArenaBattleController.q31 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场被动技能触发通知");
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkillList(e.dE1, 27723);
};
PhantomArenaBattleController.G31 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场卡牌buff触发通知");
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataByEffectList(e.pC1, 24809);
};
PhantomArenaBattleController.KD1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "BVB部署完成 通知loading");
  }
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData;
  o.Clear();
  o.SetNpcMonsterEntityData(e.rD1);
  o.SetPlayerEntityData(e.oD1);
  o.FinishPrepareLoadingPromise();
};
PhantomArenaBattleController.XD1 = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "唤醒实体AI");
  }
  UiManager_1.UiManager.OpenView("PhantomArenaBattleFloatTips");
  ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(true);
  for (const t of ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetAllEntityIdList()) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    var o = e?.Entity;
    if (e?.Valid && o?.IsStart) {
      if (!o.GetComponent(47)?.EnableAi("PhantomArenaBattle")) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 77, "唤醒实体AI失败");
        }
      }
    }
  }
};
PhantomArenaBattleController.YD1 = e => {
  ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(false);
  UiManager_1.UiManager.CloseView("PhantomArenaBattleFloatTips");
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "BVB结算");
  }
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData;
  o.NpcDeduceLife = e.hD1;
  o.NpcCurLife = e.lD1;
  o.PlayerDeduceLife = e.sD1;
  o.PlayerCurLife = e.aD1;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaStartTurnResult, e.nD1, o.NpcDeduceLife, o.NpcCurLife, o.PlayerDeduceLife, o.PlayerCurLife);
};
PhantomArenaBattleController.PhantomBattleBoardSettleNotify = o => {
  ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(false);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "BVB结算同步");
  }
  if (ModelManager_1.ModelManager.PhantomArenaBattleModel.GetTurnCountResultEnd()) {
    const t = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.qnu(o);
    };
    if (o.DS_ && o.DS_.b51 !== 0) {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.Gnu(o, () => {
        var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCardItemIdInBattleResult(o.DS_);
        if (e.length <= 0) {
          t();
        } else {
          ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.Bau(e, t);
        }
      });
    } else {
      t();
    }
  } else {
    ModelManager_1.ModelManager.PhantomArenaBattleModel.SetPhantomBattleBoardSettleNotify(o);
  }
};
PhantomArenaBattleController.Gnu = (e, o) => {
  e = {
    Result: e,
    CallbackOnClose: o
  };
  UiManager_1.UiManager.OpenView("PhantomArenaBattleResultView", e);
};
PhantomArenaBattleController.Bau = (e, o) => {
  e = {
    CardIdList: e,
    CallbackOnClose: o
  };
  UiManager_1.UiManager.OpenView("PhantomArenaCardsRewardView", e);
};
PhantomArenaBattleController.qnu = e => {
  var o = {
    ButtonTextId: "Text_Confirm_Text",
    DescriptionTextId: undefined,
    IsTimeDownCloseView: false,
    IsClickedCloseView: true,
    OnClickedCallback: () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OnClickExitButtonConfirm();
    }
  };
  var o = {
    ConfigId: e.nD1 ? PhantomArenaDefine_1.INSTANCE_SUCCESS : PhantomArenaDefine_1.INSTANCE_FAIL,
    IsSuccess: e.nD1,
    ButtonInfoList: [o],
    IsBagFull: false
  };
  var e = ModelManager_1.ModelManager.PhantomArenaModel.GetRewardItemDataInBattleResult(e.DS_);
  if (e.length > 0) {
    o.RewardItemDataList = e;
  }
  ControllerHolder_1.ControllerHolder.ItemRewardController.OpenExploreRewardViewNew(o);
};
PhantomArenaBattleController._G1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场弃牌通知");
  }
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  if (o) {
    o.OpenParam.ServerActionQueue.PushDiscardCardAction(e);
  }
};
PhantomArenaBattleController.uG1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "任务更新");
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.RefreshTaskData(e.z21);
};
PhantomArenaBattleController.cG1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "任务卡牌发牌");
  }
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  if (o) {
    o = o.OpenParam;
    if (o.ProcessManager.IsInOwnPlaying) {
      o.ServerActionQueue.PushFourTaskAction(e.tC1);
      return;
    }
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.AddFourCostCard(e.tC1);
};
PhantomArenaBattleController.a41 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "卡牌数据更新通知");
  }
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  var t = o.OpponentData.GetCardDataByFightId(e.uC1);
  if (t = t || o.OwnData.GetCardDataByFightId(e.uC1)) {
    t.NotifyRefreshCardData(e.YM1, e.__u);
  }
};
PhantomArenaBattleController.uY1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "卡牌位置交换");
  }
  var o = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  (e.Fg1 === 0 ? o.OpponentData : o.OwnData).NotifyExchangeBattleCard(e.cX1);
};
PhantomArenaBattleController.vhu = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场选择卡牌保留");
  }
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  if (o) {
    o.OpenParam.ServerActionQueue.PushReserveCardAction(e);
  }
};
PhantomArenaBattleController.Hhu = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场开始燃血buff");
  }
  ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(PhantomArenaDefine_1.BVB_SPEEDUP_TIPS);
};
PhantomArenaBattleController.E_u = e => {
  ModelManager_1.ModelManager.PhantomArenaBattleModel.IsNeedShowTimeEndConfirm = !e;
};
PhantomArenaBattleController.Ecu = (e, o, t) => {
  var a;
  if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsBattleLoading) {
    ModelManager_1.ModelManager.PhantomArenaBattleModel.CurrentLoading++;
    a = o.Entity;
    if (o?.Valid && a?.IsStart) {
      if (o = a.GetComponent(47)) {
        o.SetAllAiSenseEnableWithoutForbidAllSense(false);
        o.AddOrRemoveAiScene(PhantomArenaDefine_2.AI_SENSE_ID, true);
        o.SetAiHateConfig(PhantomArenaDefine_2.AI_HATE_ID);
        o.DisableAi("PhantomArenaBattle");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "找不到实体,无法设置仇恨以及感知信息");
    }
  }
}; //# sourceMappingURL=PhantomArenaBattleController.js.map