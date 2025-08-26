"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStateViewBase = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GameBudgetAllocatorConfigCreator_1 = require("../../../../World/Define/GameBudgetAllocatorConfigCreator");
const MoraleMonsterLevelItem_1 = require("../../../Battle/Morale/View/MoraleMonsterLevelItem");
const BattleUiControl_1 = require("../../BattleUiControl");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const HpBufferStateMachine_1 = require("./HpBufferStateMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const UPDATE_TOLERATION = 0.1;
const PERCENT_TOLERATION = 0.01;
const SCALE_TOLERATION = 0.004;
class HeadStateViewNode {
  constructor() {
    this.OQt = undefined;
    this.Vge = true;
    this.xC = true;
    this.cka = 0;
    this.mka = 0;
    this.dka = 0;
    this.Cka = false;
    this.yW = undefined;
    this.ScheduledAfterTick = undefined;
    this.LocationProxyFunction = undefined;
  }
  RegisterTick(t) {
    this.OQt = t;
    if (this.yW) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 66, "HeadStateViewNode RegisterTick: 重复注册Tick", ["HeadStateViewNode", this.constructor.name]);
      }
      this.UnregisterTick();
    }
    t = GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBattleHeadStateViewConfig;
    this.yW = GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(t.GroupName, t.SignificanceGroup, this, this.OQt.GetRootActor());
  }
  UnregisterTick() {
    if (this.yW) {
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(this);
      this.yW = undefined;
    }
  }
  CacheRefreshInfo(t, e, i) {
    this.cka = t;
    this.mka = e;
    this.dka = i;
    this.Cka = true;
  }
  ScheduledTick(t, e, i) {
    if (this.Cka && this.Vge && this.xC) {
      this.OQt.OnRefresh(this.cka, this.mka, this.dka);
      this.Cka = false;
    }
  }
  OnEnabledChange(t, e) {
    this.Vge = t;
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    this.xC = t;
  }
}
class HeadStateViewBase extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.ScaleToleration = SCALE_TOLERATION;
    this.CurrentBarPercent = 1;
    this.j1t = 0;
    this.W1t = 0;
    this.K1t = -1;
    this.IsActivated = false;
    this.HeadStateData = undefined;
    this.Q1t = 0;
    this.DetailHeadStateRangeInternal = 0;
    this.StateViewDisplayMaxDistance = 0;
    this.StateViewDisplayMinDistance = 0;
    this.X1t = Vector_1.Vector.Create(0, 0, -1);
    this.Gue = Rotator_1.Rotator.Create();
    this.$1t = Rotator_1.Rotator.Create();
    this.Distance = 0;
    this.HardnessAttributeId = EAttributeId.Proto_EAttributeType_None;
    this.MaxHardnessAttributeId = EAttributeId.Proto_EAttributeType_None;
    this.Y1t = Vector_1.Vector.Create();
    this.yB_ = Vector_1.Vector.Create();
    this.J1t = undefined;
    this.z1t = undefined;
    this.Z1t = new HpBufferStateMachine_1.HpBufferStateMachine();
    this.u_t = Stats_1.Stat.Create("[HeadState]HeadState-Destroy");
    this.Bst = -0;
    this.c_t = false;
    this.NeedCorrectionOutside = false;
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.m_t = (0, puerts_1.$ref)(undefined);
    this.d_t = (0, puerts_1.$ref)(undefined);
    this.C_t = Vector_1.Vector.Create();
    this.g_t = Vector_1.Vector.Create();
    this.f_t = Vector_1.Vector.Create();
    this.MoraleLevelItem = undefined;
    this.gka = new HeadStateViewNode();
    this.wQu = undefined;
    this.p_t = () => {
      if (this.J1t) {
        this.J1t(this.HeadStateData.GetEntity());
        this.z1t = undefined;
      }
    };
    this.OnFallDownVisibleChange = () => {};
    this.OnAddOrRemoveBuff = (t, e, i, s) => {};
    this.OnRoleLevelChange = (t, e, i) => {};
    this.OnChangeTeam = () => {};
    this.OnShieldChanged = t => {};
    this.OnHardnessHideChanged = t => {};
    this.Zrt = t => {
      this.OnHardnessAttributeChanged();
    };
    this.ent = t => {
      this.OnHardnessAttributeChanged();
    };
    this.OnHardnessChanged = (t, e, i) => {};
    this.VulnerabilityActivated = t => {};
    this.OnLevelChanged = (t, e, i) => {};
    this.OnLifeChanged = (t, e, i) => {
      this.OnHealthChanged();
    };
    this.OnCampChanged = () => {
      this.RefreshOnCampChanged();
    };
  }
  CreateHeadStateView(t, e, i, s, h) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[HeadState] CreateHeadStateView", ["headStateType", e], ["ComponentId", this.ComponentId]);
    }
    this.LQu(e, i, s, h);
    e = this.GetResourceId();
    i = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(e);
    if (i) {
      this.c_t = true;
      this.CreateByActorAsync(i);
    } else {
      this.c_t = false;
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.CreateByPathAsync(s, t, true);
    }
  }
  async CreateHeadStateViewAsync(t, e, i, s, h) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[HeadState] CreateHeadStateViewAsync", ["headStateType", e], ["ComponentId", this.ComponentId]);
    }
    this.LQu(e, i, s, h);
    e = this.GetResourceId();
    i = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(e);
    if (i) {
      this.c_t = true;
      await this.CreateByActorAsync(i);
    } else {
      this.c_t = false;
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      await this.CreateByPathAsync(s, t, true);
    }
  }
  LQu(t, e, i, s) {
    var h = this.GetResourceId();
    if (!StringUtils_1.StringUtils.IsEmpty(h)) {
      this.Q1t = t;
      this.DetailHeadStateRangeInternal = e;
      this.StateViewDisplayMaxDistance = i;
      this.StateViewDisplayMinDistance = s;
      this.Z1t.UpdateParams(t);
    }
  }
  ShowHeadStateView(t) {
    if (this.HeadStateData !== undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "[HeadState]HeadStateView重复设置HeadStateData, 需先执行Recycle", ["旧EntityId", this.HeadStateData.GetEntityId()], ["新EntityId", t.GetEntityId()], ["ComponentId", this.ComponentId]);
    }
    if (this.WaitToDestroy) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "[HeadState]HeadStateView即将销毁，不可再次执行Show", ["新EntityId", t.GetEntityId()], ["ComponentId", this.ComponentId]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[HeadState] ShowHeadStateView", ["EntityId", t.GetEntityId()], ["ComponentId", this.ComponentId]);
      }
      this.HeadStateData = t;
      if (!this.ChildViewData) {
        this.InitChildType(14);
      }
      this.ShowBattleVisibleChildView(true);
    }
  }
  RecycleHeadStateView(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[HeadState] RecycleHeadStateView", ["EntityId", this.HeadStateData?.GetEntityId()], ["ComponentId", this.ComponentId]);
    }
    this.wQu = t;
    if (this.IsActivated) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[HeadState] DeactivateByRecycle", ["EntityId", this.HeadStateData?.GetEntityId()], ["ComponentId", this.ComponentId]);
      }
      this.ResetBattleHeadState();
      this.gka.UnregisterTick();
      this.IsActivated = false;
    }
    this.HeadStateData = undefined;
    this.HideBattleVisibleChildView();
    if (this.ChildViewData) {
      this.ClearChildViewData();
    }
  }
  DestroyHeadStateView() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[HeadState] DestroyHeadStateView", ["EntityId", this.HeadStateData?.GetEntityId()], ["ComponentId", this.ComponentId]);
    }
    this.wQu = undefined;
    if (this.IsActivated) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[HeadState] DeactivateByDestroy", ["EntityId", this.HeadStateData?.GetEntityId()], ["ComponentId", this.ComponentId]);
      }
      this.ResetBattleHeadState();
      this.gka.UnregisterTick();
      this.IsActivated = false;
    }
    this.HeadStateData = undefined;
    if (this.IsEnable) {
      this.HideBattleVisibleChildView();
    }
    if (this.ChildViewData) {
      this.ClearChildViewData();
    }
    this.Destroy();
  }
  async OnBeforeShowAsyncImplement() {
    if (this.HeadStateData) {
      await this.LoadExtraItem(this.HeadStateData);
    }
  }
  OnBeforeShow() {
    if (!!this.HeadStateData && !this.IsActivated) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[HeadState] ActiveBeforeShow", ["EntityId", this.HeadStateData?.GetEntityId()], ["ComponentId", this.ComponentId]);
      }
      this.ActiveBattleHeadState(this.HeadStateData);
      this.gka.RegisterTick(this);
      this.IsActivated = true;
    }
  }
  OnAfterHide() {
    if (!this.HeadStateData) {
      if (this.wQu) {
        this.wQu(this, this.HeadStateType);
        this.wQu = undefined;
      }
    }
  }
  GetResourceId() {
    return "UiItem_LittleMonsterState_Prefab";
  }
  DestroyOverride() {
    var t;
    this.gka.UnregisterTick();
    return !!this.c_t && !!this.RootActor && !(t = this.GetResourceId(), BattleUiControl_1.BattleUiControl.Pool.RecycleHeadStateView(t, this.RootActor), 0);
  }
  async LoadExtraItem(t) {
    await this.LoadMoraleLevelItem(t);
  }
  async LoadMoraleLevelItem(e) {
    if (e.IsNormalMonster()) {
      e = e.GetMoraleLevel();
      if (e) {
        let t = this.MoraleLevelItem;
        if (!t) {
          await (t = new MoraleMonsterLevelItem_1.MoraleMonsterLevelItem()).CreateByResourceIdAsync("UiItem_MonsterMoraleLevel", undefined, true);
          this.MoraleLevelItem = t;
        }
        t.SetMoraleLevel(e);
        return true;
      }
    }
    this.RemoveMoraleLevelItem();
    return false;
  }
  RemoveExtraItem() {
    this.RemoveMoraleLevelItem();
  }
  RemoveMoraleLevelItem() {
    if (this.MoraleLevelItem) {
      this.MoraleLevelItem.GetRootItem().DetachFromParent();
      this.MoraleLevelItem.Destroy();
      this.MoraleLevelItem = undefined;
    }
  }
  ActiveBattleHeadState(t) {
    HeadStateViewBase.t_t.Start();
    var e = this.GetHp();
    var i = this.GetMaxHp();
    this.CurrentBarPercent = e && i ? e / i : 0;
    this.BindCallback();
    this.v_t(0);
    this.RefreshHardnessAttributeId();
    this.M_t();
    this.NeedCorrectionOutside = false;
    HeadStateViewBase.t_t.Stop();
  }
  ActivateHideTimeDown(t, e = undefined) {
    this.E_t();
    if (t) {
      this.J1t = e;
      this.z1t = TimerSystem_1.TimerSystem.Delay(this.p_t, t);
    } else {
      this.p_t();
    }
  }
  E_t() {
    if (this.z1t) {
      TimerSystem_1.TimerSystem.Remove(this.z1t);
      this.z1t = undefined;
    }
  }
  SetHeadStateScale(t) {
    if (Math.abs(this.X1t.Z - t) > this.ScaleToleration) {
      this.X1t.X = t;
      this.X1t.Y = t;
      this.X1t.Z = t;
      this.RootItem.SetUIRelativeScale3D(this.X1t.ToUeVectorOld(true));
    }
  }
  OnRefresh(t, e, i) {
    if (this.IsActivated) {
      HeadStateViewBase.Ult.Start();
      this.Distance = t;
      this.v_t(e);
      this.nmt(i);
      HeadStateViewBase.Ult.Stop();
    }
  }
  v_t(t) {
    HeadStateViewBase.bO1.Start();
    this.SetHeadStateScale(t);
    this.S_t();
    this.RefreshHeadStateRotation();
    HeadStateViewBase.bO1.Stop();
  }
  RefreshHeadStateRotation() {
    var t = CameraController_1.CameraController.CameraRotator;
    var e = this.HeadStateData?.ActorComponent?.ActorGravityDirectProxy ?? Vector_1.Vector.DownVectorProxy;
    if (e.SizeSquared2D() === 0) {
      if (e.Z <= 0) {
        this.Gue.Yaw = t.Yaw + 90;
        this.Gue.Roll = t.Pitch - 90;
      } else {
        this.Gue.Yaw = t.Yaw - 90;
        this.Gue.Roll = 90 - t.Pitch;
      }
      this.Gue.Pitch = 0;
    } else {
      MathUtils_1.MathUtils.ComposeRotator(HeadStateViewBase.iPc, t, this.Gue);
    }
    if (!(Math.abs(this.Gue.Yaw - this.$1t.Yaw) <= UPDATE_TOLERATION) || !(Math.abs(this.Gue.Roll - this.$1t.Roll) <= UPDATE_TOLERATION) || !(Math.abs(this.Gue.Pitch - this.$1t.Pitch) <= UPDATE_TOLERATION)) {
      this.$1t.FromUeRotator(this.Gue);
      this.RootItem.SetUIRelativeRotation(this.$1t.ToUeRotator());
    }
  }
  S_t() {
    this.yB_.FromUeVector(this.HeadStateData.GetWorldLocation());
    var t = this.yB_;
    if (this.NeedCorrectionOutside) {
      this.CheckAndCorrectionOutside(t);
    }
    if (!this.Y1t.Equals(t, UPDATE_TOLERATION)) {
      this.RootItem.SetUIRelativeLocation(t.ToUeVectorOld());
      this.Y1t.Set(t.X, t.Y, t.Z);
    }
  }
  CheckAndCorrectionOutside(t) {
    var e;
    var i;
    var s;
    var h;
    var a = t.ToUeVector();
    var r = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.D_ProjectWorldToScreen(r, a, this.S$e)) {
      e = (a = (0, puerts_1.$unref)(this.S$e)).X;
      h = a.Y;
      if (!(e < -(i = (s = ModelManager_1.ModelManager.BattleUiModel.ViewportSize).X * this.HeadStateData.CommonParam.OutHorizontalMargin)) && !(e > s.X + i) && !((e = s.Y * this.HeadStateData.CommonParam.OutTopMargin) < h)) {
        a.Y = e;
        UE.GameplayStatics.DeprojectScreenToWorld(r, a, this.m_t, this.d_t);
        i = (0, puerts_1.$unref)(this.m_t);
        s = (0, puerts_1.$unref)(this.d_t);
        this.C_t.FromUeVector(i);
        this.g_t.FromUeVector(s);
        t.Subtraction(this.C_t, this.f_t);
        h = this.f_t.Size2D() * this.g_t.Size() / this.g_t.Size2D();
        this.C_t.AdditionEqual(this.g_t.MultiplyEqual(h));
        if (this.C_t.Z > this.HeadStateData.ActorComponent.ActorLocationProxy.Z) {
          t.Z = this.C_t.Z;
        }
      }
    }
  }
  ResetBattleHeadState() {
    this.u_t.Start();
    this.UnBindCallback();
    this.StopBarLerpAnimation();
    this.E_t();
    this.RemoveExtraItem();
    this.u_t.Stop();
  }
  nmt(t) {
    var e;
    if (this.K1t !== -1 && !(HeadStateViewBase.e_t.Start(), (e = this.Z1t.UpdatePercent(t)) < 0 ? this.StopBarLerpAnimation() : this.M_t(e), HeadStateViewBase.e_t.Stop(), this.j1t >= this.W1t)) {
      this.K1t = this.K1t + t;
    }
  }
  M_t(t) {
    if (!(Math.abs(this.Bst - t) < PERCENT_TOLERATION)) {
      if (t) {
        this.OnLerpBarBufferPercent(t);
      } else {
        this.OnLerpBarBufferPercent(this.CurrentBarPercent);
      }
      this.Bst = t;
    }
  }
  OnLerpBarBufferPercent(t) {}
  PlayBarAnimation(t) {
    var e;
    var i = t;
    var s = this.CurrentBarPercent;
    if (!(s <= i)) {
      e = this.Z1t.IsOriginState();
      this.Z1t.GetHit(i, s);
      this.j1t = i;
      this.W1t = s;
      this.CurrentBarPercent = t;
      this.K1t = 0;
      if (e && !this.Z1t.IsOriginState()) {
        this.OnBeginBarAnimation(s);
      }
    }
  }
  OnBeginBarAnimation(t) {}
  StopBarLerpAnimation() {
    this.j1t = 0;
    this.W1t = 0;
    this.K1t = -1;
    this.Z1t.Reset();
  }
  get HeadStateType() {
    return this.Q1t;
  }
  BindCallback() {
    this.HeadStateData.BindOnShieldChanged(this.OnShieldChanged);
    this.HeadStateData.BindOnFallDownVisibleChange(this.OnFallDownVisibleChange);
    this.HeadStateData.BindOnHardnessHideChanged(this.OnHardnessHideChanged);
    this.HeadStateData.BindOnHardnessActivated(this.Zrt);
    this.HeadStateData.BindOnRageActivated(this.ent);
    this.HeadStateData.BindOnHardnessChanged(this.OnHardnessChanged);
    this.HeadStateData.BindOnVulnerabilityActivated(this.VulnerabilityActivated);
    this.HeadStateData.BindOnLevelChanged(this.OnLevelChanged);
    this.HeadStateData.BindOnLifeChanged(this.OnLifeChanged);
    this.HeadStateData.BindOnCampChanged(this.OnCampChanged);
  }
  UnBindCallback() {
    this.HeadStateData?.UnBindAllCallback();
  }
  RefreshHardnessAttributeId() {
    if (this.HeadStateData.ContainsTagById(-1838149281)) {
      this.HardnessAttributeId = EAttributeId.Proto_Rage;
      this.MaxHardnessAttributeId = EAttributeId.Proto_RageMax;
    } else {
      this.HardnessAttributeId = EAttributeId.Proto_Hardness;
      this.MaxHardnessAttributeId = EAttributeId.Proto_HardnessMax;
    }
    this.OnEliteStateChange();
  }
  OnEliteStateChange() {}
  AddOrRemoveBuff(t, e, i, s) {
    if (this.IsActivated) {
      this.OnAddOrRemoveBuff(t, e, i, s);
    }
  }
  RoleLevelChange(t, e, i) {
    if (this.IsActivated) {
      this.OnRoleLevelChange(t, e, i);
    }
  }
  ChangeTeam() {
    if (this.IsActivated) {
      this.OnChangeTeam();
    }
  }
  OnHardnessAttributeChanged() {
    this.RefreshHardnessAttributeId();
  }
  OnHealthChanged() {}
  RefreshOnCampChanged() {}
  GetHpAndShieldPercent() {
    return this.HeadStateData.GetHpAndShieldPercent();
  }
  GetHpAndMaxHp() {
    return this.HeadStateData.GetHpAndMaxHp();
  }
  IsDetailVisible() {
    return !(this.Distance <= this.StateViewDisplayMinDistance) && (!!this.HeadStateData.HasFightTag || this.Distance <= this.DetailHeadStateRangeInternal);
  }
  IsLevelTextVisible() {
    return this.Distance >= this.StateViewDisplayMinDistance && this.Distance <= this.StateViewDisplayMaxDistance && !this.IsShowMoraleLevel();
  }
  IsBuffVisible() {
    return this.Distance >= this.StateViewDisplayMinDistance && this.Distance <= this.DetailHeadStateRangeInternal;
  }
  IsShowMoraleLevel() {
    return this.MoraleLevelItem !== undefined;
  }
  GetLevel() {
    return this.HeadStateData.GetLevel();
  }
  GetMaxHp() {
    return this.HeadStateData.GetMaxHp();
  }
  GetHp() {
    return this.HeadStateData.GetHp();
  }
  GetMonsterShield() {
    return this.HeadStateData.GetShield();
  }
  GetHpColor() {
    return this.HeadStateData.GetHpColor();
  }
}
(exports.HeadStateViewBase = HeadStateViewBase).iPc = Rotator_1.Rotator.Create(0, 90, -90);
HeadStateViewBase.Ult = Stats_1.Stat.Create("[HeadState]HeadState-Tick");
HeadStateViewBase.e_t = Stats_1.Stat.Create("[HeadState]HeadState-Lerp");
HeadStateViewBase.t_t = Stats_1.Stat.Create("[HeadState]HeadState-Activate");
HeadStateViewBase.bO1 = Stats_1.Stat.Create("[HeadState]HeadState-RefreshTransform"); //# sourceMappingURL=HeadStateViewBase.js.map