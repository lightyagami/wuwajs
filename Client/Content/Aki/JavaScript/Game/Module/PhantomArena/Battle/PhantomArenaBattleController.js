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
    Net_1.Net.Register(28668, PhantomArenaBattleController.OD1);
    Net_1.Net.Register(18073, PhantomArenaBattleController.qD1);
    Net_1.Net.Register(28894, PhantomArenaBattleController.GD1);
    Net_1.Net.Register(24412, PhantomArenaBattleController.FD1);
    Net_1.Net.Register(28692, PhantomArenaBattleController.ND1);
    Net_1.Net.Register(26654, PhantomArenaBattleController.VD1);
    Net_1.Net.Register(23800, PhantomArenaBattleController.jD1);
    Net_1.Net.Register(25775, PhantomArenaBattleController.PhantomBattleDealCardNotify);
    Net_1.Net.Register(27160, PhantomArenaBattleController.$D1);
    Net_1.Net.Register(26316, PhantomArenaBattleController.WD1);
    Net_1.Net.Register(26523, PhantomArenaBattleController.q31);
    Net_1.Net.Register(18027, PhantomArenaBattleController.G31);
    Net_1.Net.Register(15026, PhantomArenaBattleController.KD1);
    Net_1.Net.Register(29385, PhantomArenaBattleController.XD1);
    Net_1.Net.Register(21460, PhantomArenaBattleController.YD1);
    Net_1.Net.Register(27954, PhantomArenaBattleController.zD1);
    Net_1.Net.Register(23960, PhantomArenaBattleController._G1);
    Net_1.Net.Register(20849, PhantomArenaBattleController.uG1);
    Net_1.Net.Register(29031, PhantomArenaBattleController.cG1);
    Net_1.Net.Register(19802, PhantomArenaBattleController.a41);
    Net_1.Net.Register(18477, PhantomArenaBattleController.uY1);
    Net_1.Net.Register(28599, PhantomArenaBattleController.vhu);
    Net_1.Net.Register(29118, PhantomArenaBattleController.Hhu);
    Net_1.Net.Register(16258, PhantomArenaBattleController.PBm);
    Net_1.Net.Register(28493, PhantomArenaBattleController.FNm);
    Net_1.Net.Register(16992, PhantomArenaBattleController.inf);
    Net_1.Net.Register(27936, PhantomArenaBattleController.b8f);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28668);
    Net_1.Net.UnRegister(18073);
    Net_1.Net.UnRegister(28894);
    Net_1.Net.UnRegister(24412);
    Net_1.Net.UnRegister(28692);
    Net_1.Net.UnRegister(26654);
    Net_1.Net.UnRegister(23800);
    Net_1.Net.UnRegister(25775);
    Net_1.Net.UnRegister(27160);
    Net_1.Net.UnRegister(26316);
    Net_1.Net.UnRegister(26523);
    Net_1.Net.UnRegister(18027);
    Net_1.Net.UnRegister(15026);
    Net_1.Net.UnRegister(29385);
    Net_1.Net.UnRegister(21460);
    Net_1.Net.UnRegister(27954);
    Net_1.Net.UnRegister(23960);
    Net_1.Net.UnRegister(20849);
    Net_1.Net.UnRegister(29031);
    Net_1.Net.UnRegister(19802);
    Net_1.Net.UnRegister(18477);
    Net_1.Net.UnRegister(28599);
    Net_1.Net.UnRegister(29118);
    Net_1.Net.UnRegister(16258);
    Net_1.Net.UnRegister(28493);
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
      for (const t of [37, 82, 18, 200, 188, 86, 34, 70, 62, 232, 125]) {
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
    this.zD1(e);
  }
  static TriggerPhantomBattleBoardSettle() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.GetPhantomBattleSettleNotify();
    if (e) {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.SetTurnCountResultEnd(true);
      this.zD1(e);
    }
  }
  static TriggerPhantomBattleResultShow(o) {
    const e = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.qnu(o);
    };
    const t = () => {
      if (ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.length <= 0) {
        e();
      } else {
        UiManager_1.UiManager.OpenView("PhantomArenaRoleUnlockView", e);
      }
    };
    if (o.DS_ && o.DS_.b51 !== 0) {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.Gnu(o, () => {
        var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCardItemIdInBattleResult(o.DS_);
        if (e.length <= 0) {
          t();
        } else {
          ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.PhantomBattleResultShowCards(e, t);
        }
      });
    } else {
      t();
    }
  }
  static PhantomBattleResultShowCards(e, o) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e[0]).ActivityId;
    var e = {
      CardIdList: e,
      CallbackOnClose: o,
      IsNewPhantomArenaActivity: ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(t)
    };
    UiManager_1.UiManager.OpenView("PhantomArenaCardsRewardView", e);
  }
  static G3u(e, o) {
    return o === 0 && e === 2 || o === 1 && e === 1;
  }
  static F3u(e) {
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (!this.G3u(o.Type, t)) {
      o = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData(o.ActivityId);
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
      ModelManager_1.ModelManager.PhantomArenaBattleModel.SetChallengeId(o);
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
    var e = !ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb;
    PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(o, e);
  }
  static RequestPhantomBattleStart() {
    var e = Protocol_1.Aki.Protocol.zx1.create();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场开始对局");
    }
    Net_1.Net.Call(21367, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24827);
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
    Net_1.Net.Call(17631, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24867);
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
    Net_1.Net.Call(22184, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24328);
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
    Net_1.Net.Call(16386, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25164);
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
    Net_1.Net.Call(23149, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25983);
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
    Net_1.Net.Call(22412, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18975);
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
    Net_1.Net.Call(28564, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20793);
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
    Net_1.Net.Call(24694, o, e => {
      var o;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20173);
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
    Net_1.Net.Call(22746, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21916);
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
    Net_1.Net.Call(23598, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18827);
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
    Net_1.Net.Call(28699, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22853);
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
    Net_1.Net.Call(17146, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17528);
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
    Net_1.Net.Call(29074, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18130);
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
  static NNm(e) {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FieldData?.CardData?.CardId === e && (e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"))) {
      e.OpenParam.ServerActionQueue.PushFieldSkillEffectAction();
    }
  }
  static async RequestBattleCardSkill(o, e) {
    var t = Protocol_1.Aki.Protocol.uI1.create();
    t.uC1 = o;
    t.hC1 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象", ["卡牌id", o], ["目标id", e]);
    }
    const a = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(24798, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16827);
          a.SetResult(false);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "卡牌技能效果选择对象返回成功");
          }
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.HandleFunctionalAreaCard(e);
          PhantomArenaBattleController.NNm(o);
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
    Net_1.Net.Call(21759, o, e => {
      var o;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19992);
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
  static async RequestPhantomBattleCallCard(e, o, t) {
    var a = Protocol_1.Aki.Protocol.Qxm.create();
    a.dBm = e;
    a.CBm = o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场召唤卡牌请求", ["效果id", e], ["卡牌id", o]);
    }
    const r = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(24672, a, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20522);
          r.SetResult([]);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场召唤卡牌请求返回成功");
          }
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.CallCardListToFight(e.cC1, t);
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshCardLibraryNum(e.rBm);
          r.SetResult(e.cC1);
        }
      } else {
        r.SetResult([]);
      }
    });
    return r.Promise;
  }
  static async RequestPhantomBattleReconstructCard(e, o) {
    var t = Protocol_1.Aki.Protocol.Qof.create();
    t.dBm = e;
    t.CBm = o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场重构卡牌请求", ["效果id", e], ["卡牌id", o]);
    }
    const a = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(22950, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20522);
          a.SetResult([]);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "声骸竞技场重构卡牌请求返回成功");
          }
          ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RemoveHandCardListToRecycle(e.CBm);
          a.SetResult(e.CBm);
        }
      } else {
        a.SetResult([]);
      }
    });
    return a.Promise;
  }
  static async RequestPhantomBattleCardTargetInfo(e, o, t, a) {
    var r = Protocol_1.Aki.Protocol.KG1.create();
    r.uC1 = e;
    r.r5n = o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "获取技能目标信息", ["卡牌id", e], ["技能id", o]);
    }
    const n = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(29350, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20405);
          n.SetResult(false);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.SetCardSkillTriggerInfo(e.eF1, e.uE1, e.D8n, e.uC1, t, o, a);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "获取技能目标信息返回成功");
          }
          n.SetResult(true);
        }
      } else {
        n.SetResult(false);
      }
    });
    return n.Promise;
  }
  static async RequestPhantomBattleCardRoleTargetInfo(e) {
    var o = Protocol_1.Aki.Protocol.YG1.create();
    o.r5n = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "获取角色技能目标信息", ["技能id", e]);
    }
    const t = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(21951, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20105);
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
    Net_1.Net.Call(20578, o, e => {
      var o;
      if (e) {
        if (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 23905);
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
    Net_1.Net.Call(18440, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25085);
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
  static async RequestPhantomBattleSlotCardSkill(o, e, t, a) {
    var r = Protocol_1.Aki.Protocol.Dhu.create();
    r.uC1 = o;
    r.hC1 = e;
    r.r5n = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "卡牌主动使用技能效果选择对象", ["卡牌id", o], ["目标id", e], ["技能id", t]);
    }
    const n = new CustomPromise_1.CustomPromise();
    Net_1.Net.Call(29206, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15440);
          n.SetResult(false);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "卡牌主动使用技能效果选择对象返回成功");
          }
          if (!a) {
            ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FightCardToFunctional(o);
            ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshCardLibraryNum(e.ztu);
          }
          ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkill(e.eE1);
          n.SetResult(true);
        }
      } else {
        n.SetResult(false);
      }
    });
    return n.Promise;
  }
  static OpenPhantomArenaMapEntrance(e, o) {
    let t = undefined;
    if (t = e ? {
      ChallengeId: e,
      MarkId: ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e).MarkId
    } : ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentDefaultChallengeIdAndMarkId()) {
      if (t.MarkId === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 87, "打开声骇竞技场地图入口失败, 对应Challenge没有配置markId");
        }
      } else {
        e = {
          ChallengeId: t.ChallengeId,
          IsNeedSelect: o
        };
        o = {
          MarkId: t.MarkId,
          MarkType: 45,
          IsNotFocal: true,
          IsNotFocusTween: true,
          SkipToExtraUiName: "PhantomArenaMapEntrance",
          SkipToExtraUiParam: e
        };
        ControllerHolder_1.ControllerHolder.WorldMapController.OpenExtraUi("PhantomArenaMapEntrance", o, e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "打开声骇竞技场地图入口失败, 找不到默认challengeId");
    }
  }
  static TryTeleportChallenge(e, o) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallenge(e);
    if (t) {
      if (ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeStateById(e) === 2) {
        this.MPf(t.TeleporterId, t.ReChallengeQuestId, o);
      } else {
        this.s9f(t.TeleporterId, t.QuestId, o);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "PhantomArenaMapEntranceDetailPanel:获取挑战信息失败", ["ChallengeId", e]);
    }
  }
  static s9f(e, o, t) {
    var a = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(o);
    if (a === 1 || a === 2) {
      ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(o, true, 2);
      a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, a.Tree.BtType, a.Tree.TreeIncId);
    }
    ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(e, t);
  }
  static MPf(e, o, t) {
    var o = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(o);
    if (o === 1 || o === 2) {
      (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(423)).FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(e, t);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
    } else {
      ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(e, t);
    }
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
    ModelManager_1.ModelManager.PhantomArenaBattleModel.SetPhantomBattleBoardSettleNotify(undefined);
  }
};
PhantomArenaBattleController.OD1 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "游戏开始,通知棋盘数据", ["ChallengeId", e.e8n]);
  }
  var o;
  var t = ModelManager_1.ModelManager.PhantomArenaBattleModel;
  t.SetChallengeId(e.e8n);
  for (const a of e.cC1) {
    if (a.qg1) {
      o = a.kg1;
      if (a.qg1.Fg1 === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterNpc) {
        t.OpponentData.FightId = o;
        t.OpponentData.IsFieldActive = e.wng;
        t.OpponentData.InitPlayerData(a.qg1);
      } else if (a.qg1.Fg1 === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
        t.OwnData.FightId = o;
        t.OwnData.IsFieldActive = e.Png;
        t.OwnData.InitPlayerData(a.qg1);
      }
    }
  }
  t.InitTaskData(e.z21);
  if (!t.IsOldBvb) {
    t.InitFieldData();
    t.InitRecycleData();
  }
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
      if (a.qg1.Fg1 === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterNpc) {
        t.OpponentData.FightId = o;
        t.OpponentData.InitPlayerData(a.qg1);
      } else if (a.qg1.Fg1 === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
        t.OwnData.FightId = o;
        t.OwnData.InitPlayerData(a.qg1);
      }
    }
  }
  t.OpponentData.CreateInitPromise();
  if (!t.IsOldBvb) {
    t.RefreshFieldAndRecycleLockData(e.wvm);
  }
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
  var o;
  var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetCardDataByFightId(e.gC1);
  if (e && e.LastEffectCount !== e.CurEffectCount && (o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"))) {
    o.OpenParam.ServerActionQueue.PushCountSkillEffectAction(e.CardId, e.CurEffectCount);
  }
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
    o.OpenParam.ServerActionQueue.PushTriggerPassiveSkillInteractAction(e);
  }
};
PhantomArenaBattleController.q31 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场被动技能触发通知");
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataBySkillList(e.dE1, 26523);
};
PhantomArenaBattleController.G31 = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场卡牌buff触发通知");
  }
  ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataByEffectList(e.pC1, 18027);
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
      if (!o.GetComponent(50)?.EnableAi("PhantomArenaBattle")) {
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
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomArenaStartTurnResult, e);
};
PhantomArenaBattleController.zD1 = e => {
  var o;
  ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(false);
  if (ModelManager_1.ModelManager.PhantomArenaBattleModel.GetTurnCountResultEnd()) {
    if ((o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView")) && o.IsShowOrShowing) {
      o.OpenParam.ServerActionQueue.PushBattleResultAction(e);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "BVB结算同步");
      }
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.TriggerPhantomBattleResultShow(e);
    }
  } else {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "BVB结算同步, 未到显示时机");
    }
    ModelManager_1.ModelManager.PhantomArenaBattleModel.SetPhantomBattleBoardSettleNotify(e);
  }
};
PhantomArenaBattleController.Gnu = (e, o) => {
  o = {
    Result: e,
    CallbackOnClose: o
  };
  e = e.dGm;
  e = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(e) ? "PhantomArenaBattleResultViewNew" : "PhantomArenaBattleResultView";
  UiManager_1.UiManager.OpenView(e, o);
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
  var e = ModelManager_1.ModelManager.PhantomArenaModel.GetRewardItemDataInBattleResult(e.DS_, e.dGm);
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
    t.NotifyRefreshCardData(e.YM1, e.y1f, e.__u);
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
PhantomArenaBattleController.PBm = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场召唤卡通知");
  }
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  if (o) {
    o.OpenParam.ServerActionQueue.PushBattleCallCardAction(e);
  }
};
PhantomArenaBattleController.FNm = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场卡牌耐久空通知");
  }
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  if (o) {
    o.OpenParam.ServerActionQueue.PushCardDurableEmptyAction(e);
  }
};
PhantomArenaBattleController.inf = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("PhantomArena", 10, "声骸竞技场重构卡牌通知");
  }
  var o = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
  if (o) {
    o.OpenParam.ServerActionQueue.PushReconstructCardAction(e);
  }
};
PhantomArenaBattleController.b8f = e => {
  if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "声骸竞技场技能效果失败通知");
    }
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27936);
  }
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
      if (o = a.GetComponent(50)) {
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