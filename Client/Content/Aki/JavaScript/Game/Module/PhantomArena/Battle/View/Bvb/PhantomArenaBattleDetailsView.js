"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleDetailsView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase"),
  InputExtraShowCursorCenter_1 = require("../../../../../Ui/Input/InputExtraShowCursorCenter"),
  InputManager_1 = require("../../../../../Ui/Input/InputManager"),
  InputDistributeDefine_1 = require("../../../../../Ui/InputDistribute/InputDistributeDefine"),
  UiProhibitFightInputCenter_1 = require("../../../../../Ui/InputDistribute/UiProhibit/UiProhibitFightInputCenter"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  FlowController_1 = require("../../../../Plot/Flow/FlowController"),
  LoadAsyncPromise_1 = require("../../../../UiComponent/LoadAsyncPromise"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaBattleDetailsAreaItem_1 = require("./PhantomArenaBattleDetailsAreaItem"),
  PhantomArenaJoystick_1 = require("./PhantomArenaJoystick"),
  ANIM_DAMAGE_DELAY = 4500;
class PhantomArenaBattleDetailsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.OwnArea = void 0, this.OpponentArea = void 0, this.Proxy = void 0, this.HeadStatePanel = void 0, this.MobileJoystick = void 0, this.IsWin = !1, this.IsSelfPhantomAlive = !1, this.AccumulateTween = !1, this.AnimDamageTween = !1, this.CurveZ = void 0, this.CurveMeX = void 0, this.CurveOppositeX = void 0, this.CurveCommon = void 0, this.CurveDamageX = void 0, this.CurveDamageYMe = void 0, this.CurveDamageYNpc = void 0, this.TweenerNpcX = void 0, this.TweenerNpcZ = void 0, this.TweenerMeX = void 0, this.TweenerMeZ = void 0, this.DelegateNpcX = void 0, this.DelegateNpcZ = void 0, this.DelegateMeX = void 0, this.DelegateMeZ = void 0, this.SequencePlayer = void 0, this.MeDamaged = 0, this.MeBeforeDamaged = 0, this.NpcDamaged = 0, this.NpcBeforeDamaged = 0, this.FlowListName = "", this.DamageAnimEnd = !1, this.TimeHandle = void 0, this.Awe = () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton(ModelManager_1.ModelManager.PhantomArenaBattleModel.OnClickExitButtonConfirm)
    }, this.$Ht = () => {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.SetSpeedUp(), this.Dau()
    }, this.Isu = (t, i, e, s, h) => {
      this.IsWin = t, this.NpcDamaged = i, this.MeDamaged = s, this.Tsu(t)
    }, this.bsu = t => {
      "DamageAccumulate" === t ? this.AccumulateTween || (this.AccumulateTween = !0, (this.IsWin || 0 < this.NpcBeforeDamaged) && this.OwnArea?.StartAccumulate(this.CurveMeX, this.CurveZ, this.CurveCommon), !this.IsWin && 0 < this.MeBeforeDamaged && this.OpponentArea?.StartAccumulate(this.CurveOppositeX, this.CurveZ, this.CurveCommon)) : "Damage" !== t || this.AnimDamageTween || (this.AnimDamageTween = !0, 0 < this.MeDamaged && this.OwnArea?.SetDamageTween(this.CurveDamageX, this.MeDamaged), 0 < this.NpcDamaged && this.OpponentArea?.SetDamageTween(this.CurveDamageX, this.NpcDamaged))
    }, this.N1u = t => {
      var i = this.GetUiNiagara(5).D_K2_GetComponentLocation(),
        t = Vector_1.Vector.Create(t, i.Y, i.Z).ToUeVector();
      this.GetUiNiagara(5).D_K2_SetWorldLocation(t, !1, void 0, !1)
    }, this.V1u = t => {
      var i = this.GetUiNiagara(5).D_K2_GetComponentLocation(),
        i = Vector_1.Vector.Create(i.X, i.Y, t).ToUeVector();
      this.GetUiNiagara(5).D_K2_SetWorldLocation(i, !1, void 0, !1)
    }, this.j1u = t => {
      var i = this.GetUiNiagara(7).D_K2_GetComponentLocation(),
        t = Vector_1.Vector.Create(t, i.Y, i.Z).ToUeVector();
      this.GetUiNiagara(7).D_K2_SetWorldLocation(t, !1, void 0, !1)
    }, this.H1u = t => {
      var i = this.GetUiNiagara(7).D_K2_GetComponentLocation(),
        i = Vector_1.Vector.Create(i.X, i.Y, t).ToUeVector();
      this.GetUiNiagara(7).D_K2_SetWorldLocation(i, !1, void 0, !1)
    }, this.$1u = () => {
      this.TweenerNpcX && (this.TweenerNpcX = void 0), this.GetUiNiagara(5).SetUIActive(!1)
    }, this.W1u = () => {
      this.TweenerNpcZ && (this.TweenerNpcZ = void 0)
    }, this.Q1u = () => {
      this.TweenerMeX && (this.TweenerMeX = void 0), this.GetUiNiagara(7).SetUIActive(!1)
    }, this.K1u = () => {
      this.TweenerMeZ && (this.TweenerMeZ = void 0)
    }, this.Lsu = () => {
      var t, i;
      this.IsWin && this.IsSelfPhantomAlive ? (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.InstId, (i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetSeqConfig(t)) ? (this.FlowListName = i.FlowListName, FlowController_1.FlowController.StartFlow(i.FlowListName, i.FlowId, i.StateId)) : (ModelManager_1.ModelManager.PhantomArenaBattleModel.TryPhantomBattleDealCardNotify(), Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 77, "声骸竞技场3D BvB缺少胜利Seq配置", ["instId", t]))) : (this.MeBeforeDamaged && this.wsu(), this.NpcBeforeDamaged && this.X1u())
    }, this.Asu = t => {
      "Damage" !== t && "DamageNPC" !== t || this.DamageAnimEnd || (this.DamageAnimEnd = !0, ModelManager_1.ModelManager.PhantomArenaBattleModel.TryPhantomBattleDealCardNotify())
    }, this.djo = () => {
      var t, i;
      this.IsWin && "" !== this.FlowListName && (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife), i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife), this.OpponentArea?.RoleItem.RefreshLifeNum(Math.max(t, 0), i), this.HeadStatePanel?.RefreshAllHeadState(0), this.TimeHandle = TimerSystem_1.TimerSystem.Delay(() => {
        UiManager_1.UiManager.OpenView("PhantomArenaBattleDamageView", this.NpcDamaged), this.TimeHandle && (TimerSystem_1.TimerSystem.Has(this.TimeHandle) && TimerSystem_1.TimerSystem.Remove(this.TimeHandle), this.TimeHandle = void 0)
      }, ANIM_DAMAGE_DELAY))
    }, this.Cjo = t => {
      this.IsWin && t.FlowListName === this.FlowListName && (this.TimeHandle ? (TimerSystem_1.TimerSystem.Has(this.TimeHandle) && TimerSystem_1.TimerSystem.Remove(this.TimeHandle), this.TimeHandle = void 0) : UiManager_1.UiManager.CloseView("PhantomArenaBattleDamageView"), ModelManager_1.ModelManager.PhantomArenaBattleModel.TryPhantomBattleDealCardNotify())
    }, this.Etl = t => {
      2 === t && this.Proxy.SetIsInGamepadNavigation(!1)
    }
  }
  OnRegisterComponent() {
    this.Proxy = this.OpenParam, this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIDraggableComponent],
      [5, UE.UINiagara],
      [6, UE.UIText],
      [7, UE.UINiagara],
      [8, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.Awe],
      [3, this.$Ht]
    ]
  }
  async kuu() {
    var t;
    Info_1.Info.IsMobilePlatform() && (this.MobileJoystick = new PhantomArenaJoystick_1.PhantomArenaJoystick, t = this.GetItem(8), await this.MobileJoystick.NewByResourceId(t, "PnlJoystick"))
  }
  async Ti1() {
    this.OwnArea = new PhantomArenaBattleDetailsAreaItem_1.PhantomArenaBattleDetailsAreaItem, this.OwnArea.IsOwn = !0, this.OwnArea.RegisterProxy(this.Proxy);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetPlayerEntityIdListBySort(),
      t = (this.OwnArea.EntityIdList = t, await this.OwnArea.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.OwnArea.RoleItem.SetBarActive(!0), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId),
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t);
    this.OwnArea.RoleItem.RefreshHeadIcon(t.RoleHeadTexture), this.dU1()
  }
  async bi1() {
    this.OpponentArea = new PhantomArenaBattleDetailsAreaItem_1.PhantomArenaBattleDetailsAreaItem, this.OpponentArea.IsOwn = !1, this.OpponentArea.RegisterProxy(this.Proxy);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetNpcEntityIdListBySort(),
      t = (this.OpponentArea.EntityIdList = t, await this.OpponentArea.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.OpponentArea.RoleItem.SetBarActive(!1), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RoleId);
    t && (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId, t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(t), this.OpponentArea.RoleItem.RefreshHeadIcon(t.NpcHead)), this.mU1()
  }
  async Psu() {
    var t = [this.SAo(this.CurveZ, "CardBattleAccumulateY"), this.SAo(this.CurveMeX, "CardBattleAccumulateMeX"), this.SAo(this.CurveOppositeX, "CardBattleAccumulateNpcX"), this.SAo(this.CurveCommon, "CardBattleAccumulateCommon"), this.SAo(this.CurveDamageX, "CardBattleDamage"), this.SAo(this.CurveDamageYMe, "CardBattleDamageY"), this.SAo(this.CurveDamageYNpc, "CardBattleDamageYNPC")];
    await Promise.all(t)
  }
  async SAo(t, i) {
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    await new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat).Promise
  }
  wD1() {
    var t = UiManager_1.UiManager.GetViewByName("BattleView").OpenParam;
    this.HeadStatePanel = t.HeadStatePanel
  }
  async OnBeforeStartAsync() {
    this.Proxy.RegisterView(this), await Promise.all([this.Ti1(), this.bi1(), this.kuu(), this.Psu()]), this.wD1()
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SequencePlayer.BindSequenceCloseEvent(this.Asu), this.DelegateNpcX = (0, puerts_1.toManualReleaseDelegate)(this.N1u), this.DelegateNpcZ = (0, puerts_1.toManualReleaseDelegate)(this.V1u), this.DelegateMeX = (0, puerts_1.toManualReleaseDelegate)(this.j1u), this.DelegateMeZ = (0, puerts_1.toManualReleaseDelegate)(this.H1u), this.GetUiNiagara(5).SetUIActive(!1), this.GetUiNiagara(7).SetUIActive(!1), ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddBattleUiCommonChildVisibleReason(1), this.f31(), this.hk1(), this.lk1(), this.Dau();
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10093);
    this.GetButton(3)?.RootUIComp.SetUIActive(t), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotSequencePlay, this.djo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomArenaStartTurnResult, this.Isu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.bsu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaBattleDamageAccumulateEnd, this.Lsu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomArenaStartTurnResult, this.Isu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.bsu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaBattleDamageAccumulateEnd, this.Lsu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl)
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequencePlay, this.djo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo), this._k1(), this.uk1(), ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveBattleUiCommonChildVisibleReason(1), this.Proxy.DialogManager.Clear(), this.TweenerNpcX && (this.TweenerNpcX = void 0), this.TweenerNpcZ && (this.TweenerNpcZ = void 0), this.CurveZ = void 0, this.CurveMeX = void 0, this.CurveOppositeX = void 0, this.CurveCommon = void 0, (this.CurveDamageX = void 0, puerts_1.releaseManualReleaseDelegate)(this.N1u), (0, puerts_1.releaseManualReleaseDelegate)(this.V1u), (0, puerts_1.releaseManualReleaseDelegate)(this.j1u), (0, puerts_1.releaseManualReleaseDelegate)(this.H1u), UiManager_1.UiManager.IsViewOpen("PhantomArenaBattleFloatTips") && UiManager_1.UiManager.CloseView("PhantomArenaBattleFloatTips"), this.TimeHandle && (TimerSystem_1.TimerSystem.Has(this.TimeHandle) && TimerSystem_1.TimerSystem.Remove(this.TimeHandle), this.TimeHandle = void 0), UiManager_1.UiManager.CloseView("PhantomArenaBattleDamageView")
  }
  OnTick(t) {
    this.HeadStatePanel?.Tick(t), this.OwnArea?.TickMonster(t), this.OpponentArea?.TickMonster(t), this.MobileJoystick?.Tick(t)
  }
  hk1() {
    InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.RegisterExtraRefreshData(this.Info.Name, this)
  }
  _k1() {
    InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData(this.Info.Name)
  }
  lk1() {
    UiProhibitFightInputCenter_1.UiProhibitFightInputCenter.RegisterExtraRefreshData(this.Info.Name, this)
  }
  uk1() {
    UiProhibitFightInputCenter_1.UiProhibitFightInputCenter.UnRegisterExtraRefreshData(this.Info.Name)
  }
  f31() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetAllEntityIdList();
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "场上的实体列表", ["entityIdList", t])
  }
  dU1() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife),
      i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife);
    this.OwnArea.RoleItem.RefreshLifeNum(t, i)
  }
  mU1() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife),
      i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife);
    this.OpponentArea.RoleItem.RefreshLifeNum(t, i)
  }
  Dau() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.GetSpeedUpText();
    this.GetText(6)?.SetText(t.toFixed(1) + "X")
  }
  SetOwnAllSettlePoint(t) {
    this.OwnArea.SetSettlePoint(t)
  }
  SetOpponentSettlePoint(t) {
    this.OpponentArea.SetSettlePoint(t)
  }
  CheckCondition() {
    var t = ModelManager_1.ModelManager.InputDistributeModel.GetNotAllowFightInputViewNameSet(),
      t = Array.from(t);
    return 0 !== t.length && t[t.length - 1] === this.Info.Name
  }
  GetDistributeTags() {
    return this.Proxy.IsInGamepadNavigation ? [InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag] : InputManager_1.InputManager.IsShowMouseCursor() && Info_1.Info.IsInKeyBoard() ? [InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag] : [InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag]
  }
  IsShowCursor() {
    var t = ModelManager_1.ModelManager.InputDistributeModel.GetNotAllowFightInputViewNameSet(),
      t = Array.from(t);
    return 0 === t.length || t[t.length - 1] !== this.Info.Name
  }
  Tsu(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 77, "声骸竞技场3D BvB演出开始", ["isWin", t], ["MeDamaged", this.MeDamaged], ["NpcDamaged", this.NpcDamaged]), this.NpcBeforeDamaged = this.OwnArea.GetBeforeDamage(), this.IsSelfPhantomAlive = this.OwnArea.GetPhantomAlive(), this.MeBeforeDamaged = this.OpponentArea.GetBeforeDamage(), this.NpcBeforeDamaged || this.MeBeforeDamaged ? (this.OwnArea?.SetHitNum(this.MeDamaged), this.OpponentArea?.SetHitNum(this.NpcDamaged), (t || this.NpcBeforeDamaged) && this.OwnArea?.StartShowWinAnim(), t && !this.MeBeforeDamaged || this.OpponentArea?.StartShowWinAnim()) : ModelManager_1.ModelManager.PhantomArenaBattleModel.TryPhantomBattleDealCardNotify()
  }
  wsu() {
    this.SequencePlayer?.PlayLevelSequenceByName("Damage"), this.GetUiNiagara(5).SetUIActive(!0);
    var t = this.OwnArea.GetHeadLocation(),
      i = this.OpponentArea.GetHeadLocation(),
      e = (this.GetUiNiagara(5).D_K2_SetWorldLocation(i, !1, void 0, !1), PhantomArenaDefine_1.DAMAGE_TWEEN_TIME);
    this.TweenerNpcX = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateNpcX, i.X, t.X, e), this.TweenerNpcZ = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateNpcZ, i.Z, t.Z, e), this.TweenerNpcX && (this.TweenerNpcX.SetEase(28), this.TweenerNpcX.SetCurveFloat(this.CurveDamageX), this.TweenerNpcX.OnCompleteCallBack.Bind(this.$1u)), this.TweenerNpcZ && (this.TweenerNpcZ.SetEase(28), this.TweenerNpcZ.SetCurveFloat(this.CurveDamageYNpc), this.TweenerNpcZ.OnCompleteCallBack.Bind(this.W1u))
  }
  X1u() {
    this.SequencePlayer?.PlayLevelSequenceByName("DamageNPC"), this.GetUiNiagara(7).SetUIActive(!0);
    var t = this.OpponentArea.GetHeadLocation(),
      i = this.OwnArea.GetHeadLocation(),
      e = (this.GetUiNiagara(7).D_K2_SetWorldLocation(i, !1, void 0, !1), PhantomArenaDefine_1.DAMAGE_TWEEN_TIME);
    this.TweenerMeX = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateMeX, i.X, t.X, e), this.TweenerMeZ = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateMeZ, i.Z, t.Z, e), this.TweenerMeX && (this.TweenerMeX.SetEase(28), this.TweenerMeX.SetCurveFloat(this.CurveDamageX), this.TweenerMeX.OnCompleteCallBack.Bind(this.Q1u)), this.TweenerMeZ && (this.TweenerMeZ.SetEase(28), this.TweenerMeZ.SetCurveFloat(this.CurveDamageYMe), this.TweenerMeZ.OnCompleteCallBack.Bind(this.K1u))
  }
}
exports.PhantomArenaBattleDetailsView = PhantomArenaBattleDetailsView;
//# sourceMappingURL=PhantomArenaBattleDetailsView.js.map