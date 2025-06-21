"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpponentArea = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  PhantomArenaAiManager_1 = require("../Ai/PhantomArenaAiManager"),
  PhantomArenaRoleHpTween_1 = require("../Area/Hand/PhantomArenaRoleHpTween"),
  PhantomArenaRoleItem_1 = require("../View/Panel/PhantomArenaRoleItem"),
  OpponentFunctionArea_1 = require("./OpponentFunctionArea"),
  OpponentHandArea_1 = require("./OpponentHandArea");
class OpponentArea {
  constructor() {
    this.ViewProxy = void 0, this.FunctionalArea = void 0, this.HandArea = void 0, this.RoleItem = void 0, this.i01 = void 0, this.DrawCardCurveX = void 0, this.DrawCardCurveY = void 0, this.DiscardCardCurveX = void 0, this.DiscardCardCurveY = void 0, this.MoveLocationCurve = void 0, this.RecycleCurve = void 0, this.RoleHpTween = void 0
  }
  async ci1(e) {
    this.FunctionalArea = new OpponentFunctionArea_1.OpponentFunctionArea, this.FunctionalArea.RegisterBattleArea(this), await this.FunctionalArea.CreateThenShowByActorAsync(e.GetOwner())
  }
  async nFe(e) {
    this.RoleItem = new PhantomArenaRoleItem_1.PhantomArenaRoleItem, this.RoleItem.IsOwn = !1, this.RoleItem.RegisterViewProxy(this.ViewProxy), await this.RoleItem.CreateThenShowByActorAsync(e.GetOwner());
    e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId, e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e);
    this.RoleItem.RefreshHeadIcon(e.NpcHead), this.RoleItem.SetBarActive(!1), this.o_u()
  }
  async _i1(e) {
    this.HandArea = new OpponentHandArea_1.OpponentHandArea, this.HandArea.RegisterBattleArea(this), await this.HandArea.CreateThenShowByActorAsync(e.GetOwner())
  }
  async ttu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX"),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.DrawCardCurveX = await e.Promise
  }
  async ftu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCCurveY"),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.DrawCardCurveY = await e.Promise
  }
  async gtu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX_1"),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.DiscardCardCurveX = await e.Promise
  }
  async Ctu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCCurveY_1"),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.DiscardCardCurveY = await e.Promise
  }
  async aru() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCPlayCurve"),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.MoveLocationCurve = await e.Promise
  }
  async iou() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCRecycle"),
      e = new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.CurveFloat, 102);
    this.RecycleCurve = await e.Promise
  }
  async rtu() {
    await Promise.all([this.ttu(), this.ftu(), this.gtu(), this.Ctu(), this.aru(), this.iou()])
  }
  async o1u() {
    this.RoleHpTween = new PhantomArenaRoleHpTween_1.PhantomArenaRoleHpTween, await this.RoleHpTween.InitCurveDamage()
  }
  async InitArea(e, a, i) {
    await Promise.all([this._i1(e), this.ci1(a), this.nFe(i), this.rtu(), this.o1u()]), this.RoleHpTween.SetRoleItem(this.RoleItem)
  }
  RegisterViewProxy(e) {
    this.ViewProxy = e, this.i01 = new PhantomArenaAiManager_1.PhantomArenaAiManager(e)
  }
  async StartAiOperation() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData,
      e = (await e.InitPromise?.Promise, e.GetNpcAiOperationList());
    this.i01.ClearAllOperation(), this.i01.SetOperationList(e), await this.i01.ExecuteAllOperation(), this.i01.IsClear ? Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "已经退出副本,不执行后续逻辑") : await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleNpcShowOverRequest()
  }
  o_u() {
    this.n_u(), this.RefreshTask()
  }
  n_u() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife),
      a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetPrevShowLife(e), this.RoleItem.RefreshLifeNum(e, a)
  }
  RefreshAll() {
    this.TryDoLifeChangeShow(), this.RefreshTask()
  }
  RefreshLifeNumWithEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife),
      a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife);
    this.RoleItem.PlayAddHpEffect(e), this.RoleItem.RefreshLifeNum(e, a)
  }
  TryDoLifeChangeShow() {
    const e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.PrevShowLife,
      a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife);
    if (e !== a) {
      const i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife);
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetPrevShowLife(a), TimerSystem_1.TimerSystem.Delay(() => {
        this.RoleHpTween.PlayHpTween(e, a, i), e > a && this.RoleItem.PlayHitAnim()
      }, 300)
    }
  }
  RefreshTask() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.TaskData;
    !e || e.IsAllFinish ? this.RoleItem.SetPhantomBtnActive(!1) : (this.RoleItem.SetPhantomBtnActive(!0), e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.TaskCardConfigId), this.RoleItem.RefreshMonsterIcon(e.TaskBg))
  }
  Clear() {
    this.RoleHpTween.Clear(), this.i01.Clear()
  }
}
exports.OpponentArea = OpponentArea;
//# sourceMappingURL=OpponentArea.js.map