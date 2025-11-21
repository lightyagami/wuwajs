"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossStateViewBase = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const BattleUiControl_1 = require("../../BattleUiControl");
const BattleEntityChildView_1 = require("../BattleChildView/BattleEntityChildView");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const PERCENT_RATE = 100;
class BossStateViewBase extends BattleEntityChildView_1.BattleEntityChildView {
  constructor() {
    super(...arguments);
    this.Xrt = undefined;
    this.$rt = undefined;
    this.HardnessAttributeId = EAttributeId.Proto_EAttributeType_None;
    this.MaxHardnessAttributeId = EAttributeId.Proto_EAttributeType_None;
    this.BossStateViewConfig = undefined;
    this.HasHiddenTag = false;
    this.HasFallDownTag = false;
    this.HasFightTag = false;
    this.OnlyShowInBattleState = false;
    this.OnBossHeathChanged = (t, i, e) => {};
    this.u$e = t => {
      if (this.IsValid()) {
        this.OnBossShieldChanged(t);
      }
    };
    this.OnTimeScale = (t, i) => {
      if (this.IsValid()) {
        this.OnBossTimeScaleChange(t);
      }
    };
    this.Yrt = (t, i) => {
      this.OnBossHardnessActivated(i);
    };
    this.Jrt = (t, i) => {
      this.HasHiddenTag = i;
      this.RefreshHidden();
    };
    this.zrt = (t, i) => {
      this.HasFallDownTag = i;
      this.OnFallDownVisibleChanged(i);
    };
    this.Zrt = (t, i) => {
      this.OnHardnessAttributeChanged();
    };
    this.ent = (t, i) => {
      this.OnHardnessAttributeChanged();
    };
    this.aXe = (t, i) => {
      this.HasFightTag = i;
      this.RefreshHidden();
    };
    this.tnt = (t, i, e) => {
      this.OnBossHardnessChanged(i);
    };
    this.OnBossMaxHealthChanged = (t, i, e) => {};
    this.OnVulnerabilityActivated = (t, i) => {};
    this.OnLevelChanged = (t, i, e) => {};
  }
  Initialize(t) {
    super.Initialize(t);
    t = ConfigManager_1.ConfigManager.BattleUiConfig;
    this.Xrt = t.GetBufferAnimationSpeed();
    this.$rt = t.GetHardnessPercentList();
    this.RefreshHiddenTagState();
    this.RefreshHidden();
  }
  OnActivate() {
    this.BossStateViewConfig = this.GetMonsterConfig();
    this.OnlyShowInBattleState = this.BossStateViewConfig?.OnlyShowInBattleState ?? false;
    this.RefreshHiddenTagState();
    this.RefreshHidden();
    this.RefreshHardnessAttributeId();
  }
  OnDeactivate() {
    this.BossStateViewConfig = undefined;
    this.Xrt = undefined;
    this.$rt = undefined;
  }
  DestroyOverride() {
    super.DestroyOverride();
    BattleUiControl_1.BattleUiControl.Pool.RecycleHeadStateView(this.GetResourceId(), this.RootActor, true);
    this.RootActor = undefined;
    return !(this.RootItem = undefined);
  }
  AddEntityEvents(t) {
    EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharShieldChange, this.u$e);
    EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharBeHitTimeScale, this.OnTimeScale);
    this.ListenForTagSignificantChanged(t, 242005298, this.OnVulnerabilityActivated);
    this.ListenForTagSignificantChanged(t, 1261361093, this.Yrt);
    this.ListenForTagSignificantChanged(t, -13489149, this.Jrt);
    this.ListenForTagSignificantChanged(t, 1922078392, this.zrt);
    this.ListenForTagSignificantChanged(t, -1109506297, this.Zrt);
    this.ListenForTagSignificantChanged(t, -1838149281, this.ent);
    if (this.OnlyShowInBattleState) {
      this.ListenForTagSignificantChanged(t, 1996802261, this.aXe);
    }
    this.ListenForAttributeChanged(t, EAttributeId.Proto_Hardness, this.tnt);
    this.ListenForAttributeChanged(t, EAttributeId.Proto_Rage, this.tnt);
    this.ListenForAttributeChanged(t, EAttributeId.Proto_RageMax, this.tnt);
    this.ListenForAttributeChanged(t, EAttributeId.Proto_Lv, this.OnLevelChanged);
    this.ListenForAttributeChanged(t, EAttributeId.Proto_Life, this.OnBossHeathChanged);
    this.ListenForAttributeChanged(t, EAttributeId.l5n, this.OnBossMaxHealthChanged);
  }
  RemoveEntityEvents(t) {
    super.RemoveEntityEvents(t);
    EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharShieldChange, this.u$e);
    EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharBeHitTimeScale, this.OnTimeScale);
  }
  Reset() {
    super.Reset();
  }
  Tick(t) {}
  ChangeBuff(t, i, e) {}
  HideBossName(t) {}
  OnLanguageChange() {
    if (this.IsValid()) {
      this.OnBossLanguageChange();
    }
  }
  OnHardnessAttributeChanged() {
    this.RefreshHardnessAttributeId();
    this.OnBossStateChange();
  }
  RefreshHardnessAttributeId() {
    if (this.GetEntity().GetComponent(209).HasTag(-1838149281)) {
      this.HardnessAttributeId = EAttributeId.Proto_Rage;
      this.MaxHardnessAttributeId = EAttributeId.Proto_RageMax;
    } else {
      this.HardnessAttributeId = EAttributeId.Proto_Hardness;
      this.MaxHardnessAttributeId = EAttributeId.Proto_HardnessMax;
    }
  }
  OnBossStateChange() {}
  OnBossShieldChanged(t) {}
  OnFallDownVisibleChanged(t) {}
  OnBossTimeScaleChange(t) {}
  OnBossHardnessActivated(t) {}
  OnBossHardnessChanged(t) {}
  OnBossLanguageChange() {}
  RefreshHiddenTagState() {
    var t = this.GetEntity()?.GetComponent(209);
    this.HasHiddenTag = t?.HasTag(-13489149);
    this.HasFallDownTag = t?.HasTag(1922078392);
    this.HasFightTag = t?.HasTag(1996802261) ?? false;
  }
  RefreshHidden() {
    if (!this.IsValid() || this.HasHiddenTag || this.OnlyShowInBattleState && !this.HasFightTag) {
      this.Hide();
    } else {
      this.Show();
    }
  }
  GetBossStateViewState() {
    if (this.IsValid()) {
      var t = this.GetEntity().GetComponent(0);
      if (t) {
        return t.GetMonsterComponent()?.BossViewConfig?.BossStateViewType ?? 0;
      }
    }
  }
  GetHardnessStrength(t) {
    var i = t * PERCENT_RATE;
    for (const e of this.$rt) {
      if (e[0] <= i) {
        return e[1];
      }
    }
    return 0;
  }
  GetHpAndShieldPercent() {
    if (!this.IsValid()) {
      return [0, 0];
    }
    var t = this.GetCurrentAttributeValueById(EAttributeId.Proto_Life);
    var i = this.GetCurrentAttributeValueById(EAttributeId.l5n);
    var e = this.GetBossShield();
    let s = e <= i ? e / i : 1;
    return [t / i, s];
  }
  GetAttributeComponent() {
    return this.GetEntity().CheckGetComponent(177);
  }
  GetCurrentAttributeValueById(t) {
    return this.GetAttributeComponent().GetCurrentValue(t);
  }
  GetBossShield() {
    if (this.IsValid()) {
      return this.GetEntity().CheckGetComponent(75).ShieldTotal;
    } else {
      return 0;
    }
  }
  GetMonsterConfig() {
    if (this.IsValid()) {
      var t = this.GetEntity().GetComponent(0);
      if (t) {
        return t.GetMonsterComponent()?.BossViewConfig;
      }
    }
  }
  GetBaseInfo() {
    if (this.IsValid()) {
      var t = this.GetEntity().GetComponent(0);
      if (t) {
        return t.GetBaseInfo();
      }
    }
  }
  GetCreatureDataComp() {
    if (this.IsValid()) {
      return this.GetEntity().GetComponent(0);
    }
  }
  GetAttributeInfo() {
    if (this.IsValid()) {
      var t = this.GetEntity().GetComponent(0);
      if (t) {
        return t.GetAttributeComponent();
      }
    }
  }
  get BarBufferAnimLength() {
    return this.Xrt;
  }
  GetResourceId() {
    return "UiItem_BossState_Prefab";
  }
  HideWithAnim() {
    this.Hide();
  }
}
exports.BossStateViewBase = BossStateViewBase;
//# sourceMappingURL=BossStateViewBase.js.map