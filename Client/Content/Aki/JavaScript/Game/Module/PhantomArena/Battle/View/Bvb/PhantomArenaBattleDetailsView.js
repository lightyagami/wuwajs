"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDetailsView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const InputExtraShowCursorCenter_1 = require("../../../../../Ui/Input/InputExtraShowCursorCenter");
const InputManager_1 = require("../../../../../Ui/Input/InputManager");
const InputDistributeDefine_1 = require("../../../../../Ui/InputDistribute/InputDistributeDefine");
const UiProhibitFightInputCenter_1 = require("../../../../../Ui/InputDistribute/UiProhibit/UiProhibitFightInputCenter");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const FlowController_1 = require("../../../../Plot/Flow/FlowController");
const LoadAsyncPromise_1 = require("../../../../UiComponent/LoadAsyncPromise");
const LguiFloatTween_1 = require("../../../../Util/Lgui/LguiFloatTween");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaBattleDamageStatisticsPanel_1 = require("./DamageStatistics/PhantomArenaBattleDamageStatisticsPanel");
const PhantomArenaBattleDetailsAreaItem_1 = require("./PhantomArenaBattleDetailsAreaItem");
const PhantomArenaJoystick_1 = require("./PhantomArenaJoystick");
const ANIM_DAMAGE_DELAY = 4500;
const DAMAGE_FIRST = 10;
class PhantomArenaBattleDetailsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.OwnArea = undefined;
    this.OpponentArea = undefined;
    this.Proxy = undefined;
    this.HeadStatePanel = undefined;
    this.MobileJoystick = undefined;
    this.DamageStatistics = undefined;
    this.IsWin = false;
    this.AccumulateTween = false;
    this.AnimDamageTween = false;
    this.CurveZ = undefined;
    this.CurveMeX = undefined;
    this.CurveOppositeX = undefined;
    this.CurveCommon = undefined;
    this.CurveDamageX = undefined;
    this.CurveDamageYMe = undefined;
    this.CurveDamageYNpc = undefined;
    this.TweenerNpcX = undefined;
    this.TweenerNpcZ = undefined;
    this.TweenerMeX = undefined;
    this.TweenerMeZ = undefined;
    this.SequencePlayer = undefined;
    this.MeDamaged = 0;
    this.MeBeforeDamaged = 0;
    this.MeOriginalDamage = 0;
    this.NpcDamaged = 0;
    this.NpcBeforeDamaged = 0;
    this.NpcOriginalDamage = 0;
    this.IsFinishSettle = false;
    this.FlowListName = "";
    this.DamageAnimEnd = false;
    this.TimeHandle = undefined;
    this.Awe = () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton(ModelManager_1.ModelManager.PhantomArenaBattleModel.OnClickExitButtonConfirm);
    };
    this.$Ht = () => {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.SetSpeedUp();
      this.Emu();
    };
    this.Pcu = t => {
      this.IsWin = t.nD1;
      this.NpcDamaged = t.hD1;
      this.NpcOriginalDamage = t.wWm;
      this.MeDamaged = t.sD1;
      this.MeOriginalDamage = t.RWm;
      this.IsFinishSettle = t.Oxm;
      this.kTm();
    };
    this.Ucu = t => {
      if (t === "DamageAccumulate") {
        if (!this.AccumulateTween) {
          this.AccumulateTween = true;
          if (this.IsWin || this.NpcBeforeDamaged > 0) {
            this.OwnArea?.StartAccumulate(this.CurveMeX, this.CurveZ, this.CurveCommon);
          }
          if (!this.IsWin && this.MeBeforeDamaged > 0) {
            this.OpponentArea?.StartAccumulate(this.CurveOppositeX, this.CurveZ, this.CurveCommon);
          }
        }
      } else if (t === "Damage") {
        if (!this.AnimDamageTween) {
          this.AnimDamageTween = true;
          if (this.MeDamaged > 0) {
            this.OwnArea?.SetDamageTween(this.CurveDamageX, this.MeDamaged);
          }
        }
      } else if (t === "DamageNPC" && !this.AnimDamageTween) {
        this.AnimDamageTween = true;
        if (this.NpcDamaged > 0) {
          this.OpponentArea?.SetDamageTween(this.CurveDamageX, this.NpcDamaged);
        }
      }
    };
    this.oSu = t => {
      var i = this.GetUiNiagara(5).D_K2_GetComponentLocation();
      var t = Vector_1.Vector.Create(t, i.Y, i.Z).ToUeVector();
      this.GetUiNiagara(5).D_K2_SetWorldLocation(t, false, undefined, false);
    };
    this.nSu = t => {
      var i = this.GetUiNiagara(5).D_K2_GetComponentLocation();
      var i = Vector_1.Vector.Create(i.X, i.Y, t).ToUeVector();
      this.GetUiNiagara(5).D_K2_SetWorldLocation(i, false, undefined, false);
    };
    this.sSu = t => {
      var i = this.GetUiNiagara(7).D_K2_GetComponentLocation();
      var t = Vector_1.Vector.Create(t, i.Y, i.Z).ToUeVector();
      this.GetUiNiagara(7).D_K2_SetWorldLocation(t, false, undefined, false);
    };
    this.aSu = t => {
      var i = this.GetUiNiagara(7).D_K2_GetComponentLocation();
      var i = Vector_1.Vector.Create(i.X, i.Y, t).ToUeVector();
      this.GetUiNiagara(7).D_K2_SetWorldLocation(i, false, undefined, false);
    };
    this.hSu = () => {
      this.GetUiNiagara(5).SetUIActive(false);
      this.SequencePlayer?.PlayLevelSequenceByName("Damage");
      this.nBf();
    };
    this._Su = () => {
      this.GetUiNiagara(7).SetUIActive(false);
      this.SequencePlayer?.PlayLevelSequenceByName("DamageNPC");
      this.sBf();
    };
    this.Bcu = () => {
      var t;
      var i;
      if (this.IsWin && this.IsFinishSettle) {
        t = ModelManager_1.ModelManager.PhantomArenaBattleModel.InstId;
        if (i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetSeqConfig(t)) {
          this.FlowListName = i.FlowListName;
          FlowController_1.FlowController.StartFlow(i.FlowListName, i.FlowId, i.StateId);
        } else {
          ModelManager_1.ModelManager.PhantomArenaBattleModel.TryPhantomBattleDealCardNotify();
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 77, "声骸竞技场3D BvB缺少胜利Seq配置", ["instId", t]);
          }
        }
      } else {
        if (this.MeBeforeDamaged) {
          this.kcu();
        }
        if (this.NpcBeforeDamaged) {
          this.mYm();
        }
      }
    };
    this.Ocu = t => {
      if ((t === "Damage" || t === "DamageNPC") && !this.DamageAnimEnd) {
        this.DamageAnimEnd = true;
        ModelManager_1.ModelManager.PhantomArenaBattleModel.TryPhantomBattleDealCardNotify();
      }
    };
    this.djo = () => {
      var t;
      var i;
      if (this.IsWin && this.FlowListName !== "") {
        t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
        i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
        this.OpponentArea?.RoleItem.RefreshLifeNum(Math.max(t, 0), i);
        this.HeadStatePanel?.RefreshAllHeadState(0);
        this.TimeHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          UiManager_1.UiManager.OpenView("PhantomArenaBattleDamageView", this.MeOriginalDamage);
          this.TimeHandle = undefined;
        }, ANIM_DAMAGE_DELAY);
      }
    };
    this.Cjo = t => {
      if (this.IsWin && t.FlowListName === this.FlowListName) {
        if (this.TimeHandle) {
          this.GAn();
        } else {
          UiManager_1.UiManager.CloseView("PhantomArenaBattleDamageView");
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.TryPhantomBattleDealCardNotify();
      }
    };
    this.Etl = t => {
      if (t === 2) {
        this.Proxy.SetIsInGamepadNavigation(false);
      }
    };
  }
  OnRegisterComponent() {
    this.Proxy = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIDraggableComponent], [5, UE.UINiagara], [6, UE.UIText], [7, UE.UINiagara], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Awe], [3, this.$Ht]];
  }
  async EEu() {
    var t;
    if (Info_1.Info.IsMobilePlatform()) {
      this.MobileJoystick = new PhantomArenaJoystick_1.PhantomArenaJoystick();
      t = this.GetItem(8);
      await this.MobileJoystick.NewByResourceId(t, "PnlJoystick");
    }
  }
  async $i1() {
    this.OwnArea = new PhantomArenaBattleDetailsAreaItem_1.PhantomArenaBattleDetailsAreaItem();
    this.OwnArea.IsOwn = true;
    this.OwnArea.RegisterProxy(this.Proxy);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetPlayerEntityIdListBySort();
    this.OwnArea.EntityIdList = t;
    await this.OwnArea.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.OwnArea.RoleItem.SetBarActive(true);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t);
    this.OwnArea.RoleItem.RefreshHeadIcon(t.RoleHeadTexture);
    this.VU1();
    this.nBf();
  }
  async Wi1() {
    this.OpponentArea = new PhantomArenaBattleDetailsAreaItem_1.PhantomArenaBattleDetailsAreaItem();
    this.OpponentArea.IsOwn = false;
    this.OpponentArea.RegisterProxy(this.Proxy);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetNpcEntityIdListBySort();
    this.OpponentArea.EntityIdList = t;
    await this.OpponentArea.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.OpponentArea.RoleItem.SetBarActive(false);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RoleId;
    if (t) {
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(t);
      this.OpponentArea.RoleItem.RefreshHeadIcon(t.NpcHead);
    }
    this.jU1();
    this.sBf();
  }
  async qcu() {
    var t = [this.VTf(), this.HTf(), this.jTf(), this.$Tf(), this.WTf(), this.QTf(), this.KTf()];
    await Promise.all(t);
  }
  async VTf() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleAccumulateY");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.CurveZ = await t.Promise;
  }
  async HTf() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleAccumulateMeX");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.CurveMeX = await t.Promise;
  }
  async jTf() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleAccumulateNpcX");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.CurveOppositeX = await t.Promise;
  }
  async $Tf() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleAccumulateCommon");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.CurveCommon = await t.Promise;
  }
  async WTf() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleDamage");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.CurveDamageX = await t.Promise;
  }
  async QTf() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleDamageY");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.CurveDamageYMe = await t.Promise;
  }
  async KTf() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleDamageYNPC");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.CurveDamageYNpc = await t.Promise;
  }
  oU1() {
    var t = UiManager_1.UiManager.GetViewByName("BattleView").OpenParam;
    this.HeadStatePanel = t.HeadStatePanel;
  }
  async y3m() {
    this.DamageStatistics = new PhantomArenaBattleDamageStatisticsPanel_1.PhantomArenaBattleDamageStatisticsPanel();
    await this.DamageStatistics.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
  }
  async OnBeforeStartAsync() {
    this.Proxy.RegisterView(this);
    await Promise.all([this.$i1(), this.Wi1(), this.EEu(), this.qcu(), this.y3m()]);
    this.oU1();
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SequencePlayer.BindSequenceCloseEvent(this.Ocu);
    this.TweenerNpcX = new LguiFloatTween_1.LguiFloatTween();
    this.TweenerNpcX.BindUpdateTween(this.oSu);
    this.TweenerNpcX.BindCompleteTween(this.hSu);
    this.TweenerNpcZ = new LguiFloatTween_1.LguiFloatTween();
    this.TweenerNpcZ.BindUpdateTween(this.nSu);
    this.TweenerMeX = new LguiFloatTween_1.LguiFloatTween();
    this.TweenerMeX.BindUpdateTween(this.sSu);
    this.TweenerMeX.BindCompleteTween(this._Su);
    this.TweenerMeZ = new LguiFloatTween_1.LguiFloatTween();
    this.TweenerMeZ.BindUpdateTween(this.aSu);
    this.GetUiNiagara(5).SetUIActive(false);
    this.GetUiNiagara(7).SetUIActive(false);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddBattleUiCommonChildVisibleReason(1);
    this.W31();
    this.Gk1();
    this.Fk1();
    this.Emu();
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb ? 10093 : 10141;
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(t);
    this.GetButton(3)?.RootUIComp.SetUIActive(t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotSequencePlay, this.djo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomArenaStartTurnResult, this.Pcu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Ucu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaBattleDamageAccumulateEnd, this.Bcu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomArenaStartTurnResult, this.Pcu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Ucu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaBattleDamageAccumulateEnd, this.Bcu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequencePlay, this.djo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo);
    this.Nk1();
    this.Vk1();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveBattleUiCommonChildVisibleReason(1);
    this.Proxy.DialogManager.Clear();
    this.TweenerNpcX.Destroy();
    this.TweenerNpcZ.Destroy();
    this.TweenerMeX.Destroy();
    this.TweenerMeZ.Destroy();
    this.CurveZ = undefined;
    this.CurveMeX = undefined;
    this.CurveOppositeX = undefined;
    this.CurveCommon = undefined;
    this.CurveDamageX = undefined;
    if (UiManager_1.UiManager.IsViewOpen("PhantomArenaBattleFloatTips")) {
      UiManager_1.UiManager.CloseView("PhantomArenaBattleFloatTips");
    }
    this.GAn();
    ModelManager_1.ModelManager.PhantomArenaBattleModel.SetIsInBattle(false);
    UiManager_1.UiManager.CloseView("PhantomArenaBattleDamageView");
  }
  OnTick(t) {
    this.HeadStatePanel?.Tick(t);
    this.OwnArea?.TickMonster(t);
    this.OpponentArea?.TickMonster(t);
    this.MobileJoystick?.Tick(t);
    this.DamageStatistics?.Tick(t);
  }
  Gk1() {
    InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.RegisterExtraRefreshData(this.Info.Name, this);
  }
  Nk1() {
    InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData(this.Info.Name);
  }
  Fk1() {
    UiProhibitFightInputCenter_1.UiProhibitFightInputCenter.RegisterExtraRefreshData(this.Info.Name, this);
  }
  Vk1() {
    UiProhibitFightInputCenter_1.UiProhibitFightInputCenter.UnRegisterExtraRefreshData(this.Info.Name);
  }
  W31() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetAllEntityIdList();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "场上的实体列表", ["entityIdList", t]);
    }
  }
  VU1() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    this.OwnArea.RoleItem.RefreshLifeNum(t, i);
  }
  nBf() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleBattleAttr(Protocol_1.Aki.Protocol.GC1.Proto_Defence);
    this.OwnArea.RoleItem.RefreshShieldNum(t);
  }
  jU1() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    this.OpponentArea.RoleItem.RefreshLifeNum(t, i);
  }
  sBf() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleBattleAttr(Protocol_1.Aki.Protocol.GC1.Proto_Defence);
    this.OpponentArea.RoleItem.RefreshShieldNum(t);
  }
  Emu() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.GetSpeedUpText();
    this.GetText(6)?.SetText(t.toFixed(1) + "X");
  }
  SetOwnAllSettlePoint(t) {
    this.OwnArea.SetSettlePoint(t);
  }
  SetOpponentSettlePoint(t) {
    this.OpponentArea.SetSettlePoint(t);
  }
  CheckCondition() {
    var t = ModelManager_1.ModelManager.InputDistributeModel.GetNotAllowFightInputViewNameSet();
    var t = Array.from(t);
    return t.length !== 0 && t[t.length - 1] === this.Info.Name;
  }
  GetDistributeTags() {
    if (this.Proxy.IsInGamepadNavigation) {
      return [InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag];
    } else if (InputManager_1.InputManager.IsShowMouseCursor() && Info_1.Info.IsInKeyBoard()) {
      return [InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag];
    } else {
      return [InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag];
    }
  }
  IsShowCursor() {
    var t = ModelManager_1.ModelManager.InputDistributeModel.GetNotAllowFightInputViewNameSet();
    var t = Array.from(t);
    return t.length === 0 || t[t.length - 1] !== this.Info.Name;
  }
  kTm() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 77, "声骸竞技场BvB结算表现开始", ["isWin", this.IsWin], ["MeDamaged", this.MeDamaged], ["NpcDamaged", this.NpcDamaged]);
    }
    this.NpcBeforeDamaged = this.OwnArea.GetBeforeDamage();
    this.MeBeforeDamaged = this.OpponentArea.GetBeforeDamage();
    if (this.NpcBeforeDamaged || this.MeBeforeDamaged) {
      this.OwnArea?.SetHitNum(this.MeDamaged);
      this.OpponentArea?.SetHitNum(this.NpcDamaged);
      if (this.IsWin || this.NpcBeforeDamaged) {
        this.OwnArea?.StartShowWinAnim();
      }
      if (!this.IsWin || !!this.MeBeforeDamaged) {
        this.OpponentArea?.StartShowWinAnim();
      }
    } else {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.TryPhantomBattleDealCardNotify();
    }
  }
  fYm(t) {
    let i = "";
    i = t < DAMAGE_FIRST ? "NS_Fx_LGUI_Trail_0" : "NS_Fx_LGUI_Trail_1";
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
  }
  async kcu() {
    var t = this.fYm(this.NpcOriginalDamage);
    await this.SetNiagaraSystemByPathAsync(t, this.GetUiNiagara(5));
    this.GetUiNiagara(5).SetUIActive(true);
    var t = this.OwnArea.GetHeadLocation();
    var i = this.OpponentArea.GetHeadLocation();
    this.GetUiNiagara(5).D_K2_SetWorldLocation(i, false, undefined, false);
    this.TweenerNpcX.PlayTween(i.X, t.X, PhantomArenaDefine_1.DAMAGE_TWEEN_TIME, this.CurveDamageX);
    this.TweenerNpcZ.PlayTween(i.Z, t.Z, PhantomArenaDefine_1.DAMAGE_TWEEN_TIME, this.CurveDamageYNpc);
    AudioSystem_1.AudioSystem.PostEvent(PhantomArenaDefine_1.DAMAGE_AUDIO);
  }
  async mYm() {
    var t = this.fYm(this.MeOriginalDamage);
    await this.SetNiagaraSystemByPathAsync(t, this.GetUiNiagara(7));
    this.GetUiNiagara(7).SetUIActive(true);
    var t = this.OpponentArea.GetHeadLocation();
    var i = this.OwnArea.GetHeadLocation();
    this.GetUiNiagara(7).D_K2_SetWorldLocation(i, false, undefined, false);
    this.TweenerMeX.PlayTween(i.X, t.X, PhantomArenaDefine_1.DAMAGE_TWEEN_TIME, this.CurveDamageX);
    this.TweenerMeZ.PlayTween(i.Z, t.Z, PhantomArenaDefine_1.DAMAGE_TWEEN_TIME, this.CurveDamageYMe);
    AudioSystem_1.AudioSystem.PostEvent(PhantomArenaDefine_1.DAMAGE_AUDIO);
  }
  GAn() {
    if (this.TimeHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimeHandle);
      this.TimeHandle = undefined;
    }
  }
  OnGetLoopAudioEvent() {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
      return this.Info.LoopAudioEvent;
    } else {
      return "play_ui_music_3_0_arena_card_battle";
    }
  }
}
exports.PhantomArenaBattleDetailsView = PhantomArenaBattleDetailsView;
//# sourceMappingURL=PhantomArenaBattleDetailsView.js.map