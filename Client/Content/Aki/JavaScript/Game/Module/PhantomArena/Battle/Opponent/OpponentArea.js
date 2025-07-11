"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpponentArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const PhantomArenaAiManager_1 = require("../Ai/PhantomArenaAiManager");
const PhantomArenaRoleHpTween_1 = require("../Area/Hand/PhantomArenaRoleHpTween");
const PhantomArenaRoleItem_1 = require("../View/Panel/PhantomArenaRoleItem");
const OpponentFunctionArea_1 = require("./OpponentFunctionArea");
const OpponentHandArea_1 = require("./OpponentHandArea");
class OpponentArea {
  constructor() {
    this.ViewProxy = undefined;
    this.FunctionalArea = undefined;
    this.HandArea = undefined;
    this.RoleItem = undefined;
    this.T01 = undefined;
    this.DrawCardCurveX = undefined;
    this.DrawCardCurveY = undefined;
    this.DiscardCardCurveX = undefined;
    this.DiscardCardCurveY = undefined;
    this.MoveLocationCurve = undefined;
    this.RecycleCurve = undefined;
    this.RoleHpTween = undefined;
  }
  async Pi1(e) {
    this.FunctionalArea = new OpponentFunctionArea_1.OpponentFunctionArea();
    this.FunctionalArea.RegisterBattleArea(this);
    await this.FunctionalArea.CreateThenShowByActorAsync(e.GetOwner());
  }
  async nFe(e) {
    this.RoleItem = new PhantomArenaRoleItem_1.PhantomArenaRoleItem();
    this.RoleItem.IsOwn = false;
    this.RoleItem.RegisterViewProxy(this.ViewProxy);
    await this.RoleItem.CreateThenShowByActorAsync(e.GetOwner());
    e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e);
    this.RoleItem.RefreshHeadIcon(e.NpcHead);
    this.RoleItem.SetBarActive(false);
    this.LCu();
  }
  async Ai1(e) {
    this.HandArea = new OpponentHandArea_1.OpponentHandArea();
    this.HandArea.RegisterBattleArea(this);
    await this.HandArea.CreateThenShowByActorAsync(e.GetOwner());
  }
  async Ytu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.DrawCardCurveX = await e.Promise;
  }
  async _iu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCCurveY");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.DrawCardCurveY = await e.Promise;
  }
  async uiu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX_1");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.DiscardCardCurveX = await e.Promise;
  }
  async ciu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCCurveY_1");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.DiscardCardCurveY = await e.Promise;
  }
  async Bsu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCPlayCurve");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.MoveLocationCurve = await e.Promise;
  }
  async Hau() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCRecycle");
    var e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.RecycleCurve = await e.Promise;
  }
  async Jtu() {
    await Promise.all([this.Ytu(), this._iu(), this.uiu(), this.ciu(), this.Bsu(), this.Hau()]);
  }
  async Ppu() {
    this.RoleHpTween = new PhantomArenaRoleHpTween_1.PhantomArenaRoleHpTween();
    await this.RoleHpTween.InitCurveDamage();
  }
  async InitArea(e, a, i) {
    await Promise.all([this.Ai1(e), this.Pi1(a), this.nFe(i), this.Jtu(), this.Ppu()]);
    this.RoleHpTween.SetRoleItem(this.RoleItem);
  }
  RegisterViewProxy(e) {
    this.ViewProxy = e;
    this.T01 = new PhantomArenaAiManager_1.PhantomArenaAiManager(e);
  }
  async StartAiOperation() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    await e.InitPromise?.Promise;
    var e = e.GetNpcAiOperationList();
    this.T01.ClearAllOperation();
    this.T01.SetOperationList(e);
    await this.T01.ExecuteAllOperation();
    if (this.T01.IsClear) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "已经退出副本,不执行后续逻辑");
      }
    } else {
      await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleNpcShowOverRequest();
    }
  }
  LCu() {
    this.wCu();
    this.RefreshTask();
  }
  wCu() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetPrevShowLife(e);
    this.RoleItem.RefreshLifeNum(e, a);
  }
  RefreshAll() {
    this.TryDoLifeChangeShow();
    this.RefreshTask();
  }
  RefreshLifeNumWithEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    this.RoleItem.PlayAddHpEffect(e);
    this.RoleItem.RefreshLifeNum(e, a);
  }
  TryDoLifeChangeShow() {
    const e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.PrevShowLife;
    const a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    if (e !== a) {
      const i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetPrevShowLife(a);
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.RoleHpTween.PlayHpTween(e, a, i);
        if (e > a) {
          this.RoleItem.PlayHitAnim();
        }
      }, 300);
    }
  }
  RefreshTask() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.TaskData;
    if (!e || e.IsAllFinish) {
      this.RoleItem.SetPhantomBtnActive(false);
    } else {
      this.RoleItem.SetPhantomBtnActive(true);
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.TaskCardConfigId);
      this.RoleItem.RefreshMonsterIcon(e.TaskBg);
    }
  }
  Clear() {
    this.RoleHpTween.Clear();
    this.T01.Clear();
  }
}
exports.OpponentArea = OpponentArea;
//# sourceMappingURL=OpponentArea.js.map