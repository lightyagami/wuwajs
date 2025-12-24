"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpponentArea = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const PhantomArenaAiManager_1 = require("../Ai/PhantomArenaAiManager");
const PhantomArenaFieldArea_1 = require("../View/Field/PhantomArenaFieldArea");
const PhantomArenaOpponentRolePanel_1 = require("../View/Panel/PhantomArenaOpponentRolePanel");
const OpponentFunctionArea_1 = require("./OpponentFunctionArea");
const OpponentHandArea_1 = require("./OpponentHandArea");
class OpponentArea {
  constructor() {
    this.ViewProxy = undefined;
    this.FunctionalArea = undefined;
    this.HandArea = undefined;
    this.RolePanel = undefined;
    this.FiledArea = undefined;
    this.T01 = undefined;
    this.DrawCardCurveX = undefined;
    this.DrawCardCurveY = undefined;
    this.DiscardCardCurveX = undefined;
    this.DiscardCardCurveY = undefined;
    this.MoveLocationCurve = undefined;
    this.RecycleCurve = undefined;
  }
  async Pi1(a) {
    this.FunctionalArea = new OpponentFunctionArea_1.OpponentFunctionArea();
    this.FunctionalArea.RegisterBattleArea(this);
    await this.FunctionalArea.CreateThenShowByActorAsync(a.GetOwner());
  }
  async nFe(a) {
    this.RolePanel = new PhantomArenaOpponentRolePanel_1.PhantomArenaOpponentRolePanel();
    this.RolePanel.RegisterBattleArea(this);
    await this.RolePanel.CreateThenShowByActorAsync(a.GetOwner());
  }
  async Ai1(a) {
    this.HandArea = new OpponentHandArea_1.OpponentHandArea();
    this.HandArea.RegisterBattleArea(this);
    await this.HandArea.CreateThenShowByActorAsync(a.GetOwner());
  }
  async Miu() {
    var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX");
    var a = new LoadAsyncPromise_1.LoadAsyncPromise(a, UE.CurveFloat, 102);
    this.DrawCardCurveX = await a.Promise;
  }
  async kiu() {
    var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCCurveY");
    var a = new LoadAsyncPromise_1.LoadAsyncPromise(a, UE.CurveFloat, 102);
    this.DrawCardCurveY = await a.Promise;
  }
  async Oiu() {
    var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX_1");
    var a = new LoadAsyncPromise_1.LoadAsyncPromise(a, UE.CurveFloat, 102);
    this.DiscardCardCurveX = await a.Promise;
  }
  async qiu() {
    var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCCurveY_1");
    var a = new LoadAsyncPromise_1.LoadAsyncPromise(a, UE.CurveFloat, 102);
    this.DiscardCardCurveY = await a.Promise;
  }
  async hau() {
    var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCPlayCurve");
    var a = new LoadAsyncPromise_1.LoadAsyncPromise(a, UE.CurveFloat, 102);
    this.MoveLocationCurve = await a.Promise;
  }
  async Chu() {
    var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCRecycle");
    var a = new LoadAsyncPromise_1.LoadAsyncPromise(a, UE.CurveFloat, 102);
    this.RecycleCurve = await a.Promise;
  }
  async Iiu() {
    await Promise.all([this.Miu(), this.kiu(), this.Oiu(), this.qiu(), this.hau(), this.Chu()]);
  }
  async InitArea(a, e, i, t) {
    await Promise.all([this.Ai1(a), this.Pi1(e), this.nFe(i), this.Iiu(), this.yFm(t)]);
  }
  RegisterViewProxy(a) {
    this.ViewProxy = a;
    this.T01 = new PhantomArenaAiManager_1.PhantomArenaAiManager(a);
  }
  async StartAiOperation() {
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    await a.InitPromise?.Promise;
    var a = a.GetNpcAiOperationList();
    this.T01.ClearAllOperation();
    this.T01.SetOperationList(a);
    await this.T01.ExecuteAllOperation();
    if (this.T01.IsClear) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "已经退出副本,不执行后续逻辑");
      }
    } else {
      await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleNpcShowOverRequest();
    }
  }
  RefreshAll(a) {
    this.RolePanel.RefreshAll(a);
    this.FunctionalArea.RefreshAllBattleCard();
    this.RefreshFiledArea();
  }
  RefreshLifeNumWithEffect() {
    this.RolePanel.RefreshLifeNumWithEffect();
  }
  Clear() {
    this.T01.Clear();
  }
  async CallHandCardListToFight(a) {
    var e = [];
    for (const i of a) {
      e.push(this.FunctionalArea.TrySettingCard(i.kg1, i.Gg1.Qg1));
    }
    await Promise.all(e);
  }
  async CallLibraryCardListToFight(a) {
    var e = [];
    for (const i of a) {
      e.push(this.FunctionalArea.TrySettingCardFromLibrary(i.kg1, i.Gg1.Qg1));
    }
    await Promise.all(e);
  }
  async yFm(a) {
    if (!ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
      this.FiledArea = new PhantomArenaFieldArea_1.PhantomArenaFieldArea();
      this.FiledArea.RegisterViewProxy(this.ViewProxy);
      await this.FiledArea.CreateThenShowByActorAsync(a.GetOwner());
    }
  }
  async RefreshFiledArea() {
    await this.FiledArea?.Refresh(ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.FieldData);
    this.RolePanel.RefreshField();
  }
  async LockFiledArea() {
    await this.RefreshFiledArea();
    this.SwitchFieldState(Info_1.Info.IsInGamepad());
  }
  async UnlockFiledArea() {
    await this.RefreshFiledArea();
    this.SwitchFieldState(Info_1.Info.IsInGamepad());
  }
  SwitchFieldState(a) {
    this.FiledArea?.SwitchFieldState(!a);
    this.RolePanel.SwitchFieldState(a);
  }
}
exports.OpponentArea = OpponentArea;
//# sourceMappingURL=OpponentArea.js.map