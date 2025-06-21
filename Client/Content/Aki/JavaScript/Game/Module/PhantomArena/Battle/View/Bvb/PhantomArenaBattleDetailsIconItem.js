"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleDetailsSkillItem = exports.PhantomArenaBattleDetailsRoleItem = exports.PhantomArenaBattleDetailsMonsterItem = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  HpBufferStateMachine_1 = require("../../../../BattleUi/Views/HeadState/HpBufferStateMachine"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaHeadItem_1 = require("../Panel/PhantomArenaHeadItem"),
  FACTOR_INTERVAL = 600;
class PhantomArenaBattleDetailsMonsterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Proxy = void 0, this.AttributeComp = void 0, this.EntityId = 0, this.HasTickInit = !1, this.BeforeBattleFactor = [], this.HadPlayFactor = new Set, this.CurShowTime = 0, this.CurPlayingIndex = -1, this.SequencePlayer = void 0, this.IsOwn = !1, this.TweenerX = void 0, this.TweenerZ = void 0, this.DelegateX = void 0, this.DelegateZ = void 0, this.DamageCount = 0, this.HpMachine = new HpBufferStateMachine_1.HpBufferStateMachine, this.OldLife = 0, this.MaxLife = 0, this.LastLife = 0, this.AnimPlayed = !1, this.OnClickCb = void 0, this.eTt = () => {
      this.OnClickCb && this.OnClickCb(this.EntityId)
    }, this.hU1 = () => {
      var t = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) ?? 0,
        i = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n) ?? this.MaxLife,
        s = (0 !== i && (this.MaxLife = i), t / i);
      this.OldLife <= t ? (this.GetSprite(11).SetFillAmount(s), this.HpMachine.Reset()) : this.HpMachine.GetHit(s, this.OldLife / i), this.OldLife = t, this.GetSprite(4).SetFillAmount(s), this.GetSprite(3).SetFillAmount(s), 0 === this.OldLife && (this.GetItem(9)?.SetUIActive(!0), this.SequencePlayer?.PlayLevelSequenceByName("Kill"))
    }, this.nj1 = () => {
      var t = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4) ?? 0;
      this.IsOwn ? this.Proxy.SetOwnAllSettlePoint(this.EntityId, t) : this.Proxy.SetOpponentSettlePoint(this.EntityId, t)
    }, this.Csu = t => {
      var i = this.GetUiNiagara(8).D_K2_GetComponentLocation(),
        t = Vector_1.Vector.Create(t, i.Y, i.Z).ToUeVector();
      this.GetUiNiagara(8).D_K2_SetWorldLocation(t, !1, void 0, !1)
    }, this.psu = t => {
      var i = this.GetUiNiagara(8).D_K2_GetComponentLocation(),
        i = Vector_1.Vector.Create(i.X, i.Y, t).ToUeVector();
      this.GetUiNiagara(8).D_K2_SetWorldLocation(i, !1, void 0, !1)
    }, this.Aau = () => {
      this.TweenerX && (this.TweenerX = void 0), this.GetUiNiagara(8).SetUIActive(!1)
    }, this.Pau = () => {
      this.TweenerZ && (this.TweenerZ = void 0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UINiagara],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UISprite]
    ], this.BtnBindInfo = [
      [0, this.eTt]
    ]
  }
  OnStart() {
    this.lU1(), this.DelegateX = (0, puerts_1.toManualReleaseDelegate)(this.Csu), this.DelegateZ = (0, puerts_1.toManualReleaseDelegate)(this.psu), this.GetItem(9)?.SetUIActive(!1), this.GetText(10)?.SetUIActive(!1), this.GetUiNiagara(8)?.SetUIActive(!1), this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  OnBeforeDestroy() {
    this._U1(), this.TweenerX && (this.TweenerX = void 0), this.TweenerZ && (this.TweenerZ = void 0), (0, puerts_1.releaseManualReleaseDelegate)(this.Csu), (0, puerts_1.releaseManualReleaseDelegate)(this.psu)
  }
  uU1(t) {
    this.DamageCount = t, this.GetText(2).SetText(t.toString())
  }
  Kbe(t) {
    t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetCardDataByEntityId(t), t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    this.SetTextureByPath(t.BvbIcon, this.GetTexture(1))
  }
  lU1() {
    this.GetSprite(3).SetUIActive(this.IsOwn), this.GetSprite(4).SetUIActive(!this.IsOwn)
  }
  vsu(t, i) {
    var s = this.IsOwn ? "LightShowRight" : "LightShowLeft";
    if (this.HasTickInit) this.CurPlayingIndex = -1, this.BeforeBattleFactor.length = 0, this.HadPlayFactor.clear(), this.SequencePlayer?.IsPlayingSequence(s) && this.SequencePlayer?.StopPlayingSequence(!1, !0);
    else {
      this.BeforeBattleFactor.length = 0;
      for (const e of i) ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(e).IsBeforeBattle && this.BeforeBattleFactor.push(e);
      this.BeforeBattleFactor.sort((t, i) => {
        t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(t);
        return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(i).Sort - t.Sort
      }), 0 < this.BeforeBattleFactor.length && (this.CurPlayingIndex = 0), this.HasTickInit = !0
    }
  }
  ysu(t) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(t),
      i = t.IsBeforeBattle,
      t = t.Name,
      s = this.GetText(7);
    this.GetItem(5)?.SetUIActive(!i), this.GetItem(6)?.SetUIActive(i), s?.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(s, t)
  }
  Tick(t) {
    this.HasTickInit && (0 <= (t = this.HpMachine.UpdatePercent(t)) && this.GetSprite(11)?.SetFillAmount(t), ModelManager_1.ModelManager.CreatureModel.GetEntity(this.EntityId)?.Valid || 0 === this.OldLife || this.AnimPlayed || (this.AttributeComp?.RemoveListeners([CharacterAttributeTypes_1.EAttributeId.Proto_Life, CharacterAttributeTypes_1.EAttributeId.l5n], this.hU1), this.AttributeComp?.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.nj1), this.AttributeComp = void 0, this.hU1()), this.xau())
  }
  xau() {
    var t = this.Ssu(),
      i = this.IsOwn ? "LightShowRight" : "LightShowLeft";
    t ? (0 !== this.BeforeBattleFactor.length && (this.BeforeBattleFactor.length = 0, this.CurPlayingIndex = -1), this.SequencePlayer?.IsPlayingSequence(i) ? this.SequencePlayer?.ReplaySequenceByKey(i) : this.SequencePlayer?.PlayLevelSequenceByName(i), this.ysu(t)) : this.CurPlayingIndex < 0 || this.CurPlayingIndex >= this.BeforeBattleFactor.length || this.SequencePlayer?.IsPlayingSequence(i) || (this.ysu(this.BeforeBattleFactor[this.CurPlayingIndex]), this.SequencePlayer?.PlayLevelSequenceByName(i), this.CurPlayingIndex++)
  }
  cU1() {
    this.AttributeComp && (this.AttributeComp?.AddListeners([CharacterAttributeTypes_1.EAttributeId.Proto_Life, CharacterAttributeTypes_1.EAttributeId.l5n], this.hU1), this.AttributeComp?.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.nj1))
  }
  _U1() {
    this.AttributeComp && (this.AttributeComp?.RemoveListeners([CharacterAttributeTypes_1.EAttributeId.Proto_Life, CharacterAttributeTypes_1.EAttributeId.l5n], this.hU1), this.AttributeComp?.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.nj1))
  }
  RegisterProxy(t) {
    this.Proxy = t
  }
  Refresh(t) {
    this.EntityId = t, this._U1();
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    this.AttributeComp = i?.Entity?.GetComponent(172), this.cU1();
    const s = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetCardDataByEntityId(t);
    i = s.GetFightValueByAttr(Protocol_1.Aki.Protocol.gC1.Proto_CostAbility);
    this.uU1(i), this.Kbe(t), this.hU1(), TimerSystem_1.TimerSystem.Delay(() => {
      this.vsu(s.ConfigId, s.ExtraFactors)
    }, 600)
  }
  Ssu() {
    if (!(this.CurShowTime + FACTOR_INTERVAL > Time_1.Time.Now)) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.EntityId)?.Entity?.GetComponent(205);
      if (t) {
        var i = [];
        for (const s of ModelManager_1.ModelManager.PhantomArenaBattleModel.GetPhantomTagMap()) !t.HasTag(s[0]) || this.HadPlayFactor.has(s[1]) || i.push(s[1]);
        if (0 !== i.length) return i.sort((t, i) => {
          t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(t);
          return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(i).Sort - t.Sort
        }), this.HadPlayFactor.add(i[0]), this.CurShowTime = Time_1.Time.Now, i[0]
      }
    }
  }
  GetDamage() {
    return this.LastLife = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) ?? 0, this.LastLife ? this.DamageCount : 0
  }
  ShowWinAnim() {
    var t = this.IsOwn ? "LightShowRight" : "LightShowLeft";
    return this.SequencePlayer?.IsPlayingSequence(t) && this.SequencePlayer?.StopCurrentSequence(!1, !0), this.LastLife = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) ?? 0, this.LastLife ? (this.SequencePlayer?.PlayLevelSequenceByName("DamageAccumulate"), this.AnimPlayed = !0, this.DamageCount) : 0
  }
  OnAccumulateEvent(t, i, s, e) {
    var h, r;
    this.LastLife && (this.GetUiNiagara(8).SetUIActive(!0), h = PhantomArenaDefine_1.ACCUMULATE_TWEEN_TIME, r = this.GetButton(0).RootUIComp.D_K2_GetComponentLocation(), this.TweenerX = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateX, r.X, t, h), this.TweenerZ = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateZ, r.Z, i, h), this.TweenerX && (this.TweenerX.OnCompleteCallBack.Bind(this.Aau), this.TweenerX.SetEase(28), this.TweenerX.SetCurveFloat(s)), this.TweenerZ) && (this.TweenerZ.OnCompleteCallBack.Bind(this.Pau), this.TweenerZ.SetEase(28), this.TweenerZ.SetCurveFloat(e))
  }
}
exports.PhantomArenaBattleDetailsMonsterItem = PhantomArenaBattleDetailsMonsterItem;
class PhantomArenaBattleDetailsRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.RoleHead = void 0, this.ViewProxy = void 0, this.TweenerDamage = void 0, this.DelegateDamage = void 0, this.IsOwn = !1, this.MaxLife = 0, this.CurLife = 0, this.Msu = t => {
      this.RoleHead?.RefreshDamageBar(t / this.MaxLife);
      t = Math.max(0, Math.floor(t));
      this.GetText(1).SetText(t + "/" + this.MaxLife)
    }, this.Uau = () => {
      this.TweenerDamage && (this.TweenerDamage = void 0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText]
    ]
  }
  OnStart() {
    this.DelegateDamage = (0, puerts_1.toManualReleaseDelegate)(this.Msu)
  }
  OnBeforeDestroy() {
    this.TweenerDamage && (this.TweenerDamage = void 0), (0, puerts_1.releaseManualReleaseDelegate)(this.Msu)
  }
  async lJ1() {
    this.RoleHead = new PhantomArenaHeadItem_1.PhantomArenaHeadItem, this.RoleHead.IsOwn = this.IsOwn, await this.RoleHead.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.IsOwn ? this.ViewProxy.DialogManager.SetOwnDialogItem(this.RoleHead.DialogItem) : this.ViewProxy.DialogManager.SetOpponentDialogItem(this.RoleHead.DialogItem)
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.lJ1()])
  }
  RefreshLifeNum(t, i) {
    this.MaxLife = i, this.CurLife = t, this.GetText(1).SetText(t + "/" + i), this.RoleHead.RefreshLifeBar(t / i)
  }
  SetHitNum(t) {
    this.GetText(3)?.SetText("-" + t)
  }
  RefreshLifeAfterDamage(t, i) {
    var i = Math.max(0, this.CurLife - i),
      s = (this.RoleHead.RefreshLifeBar(i / this.MaxLife), PhantomArenaDefine_1.DAMAGE_COUNT_TWEEN_TIME);
    this.TweenerDamage = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateDamage, this.CurLife, i, s), this.TweenerDamage && (this.TweenerDamage.OnCompleteCallBack.Bind(this.Uau), this.TweenerDamage.SetEase(28), this.TweenerDamage.SetCurveFloat(t))
  }
  SetBarActive(t) {
    this.RoleHead.SetBarActive(t)
  }
  RefreshHeadIcon(t) {
    this.RoleHead.RefreshRoleIcon(t)
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t
  }
  OnAccumulateAfterEvent() {
    this.RoleHead?.PlayAccumulateDamage()
  }
  GetHeadLocation() {
    return this.GetItem(0).D_K2_GetComponentLocation()
  }
}
exports.PhantomArenaBattleDetailsRoleItem = PhantomArenaBattleDetailsRoleItem;
class PhantomArenaBattleDetailsSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.TweenerX = void 0, this.TweenerZ = void 0, this.DelegateX = void 0, this.DelegateZ = void 0, this.SettlePoint = 0, this.SequencePlayer = void 0, this.Csu = t => {
      var i = this.GetUiNiagara(5).D_K2_GetComponentLocation(),
        t = Vector_1.Vector.Create(t, i.Y, i.Z).ToUeVector();
      this.GetUiNiagara(5).D_K2_SetWorldLocation(t, !1, void 0, !1)
    }, this.psu = t => {
      var i = this.GetUiNiagara(5).D_K2_GetComponentLocation(),
        i = Vector_1.Vector.Create(i.X, i.Y, t).ToUeVector();
      this.GetUiNiagara(5).D_K2_SetWorldLocation(i, !1, void 0, !1)
    }, this.Aau = () => {
      this.TweenerX && (this.TweenerX = void 0), this.GetUiNiagara(5).SetUIActive(!1)
    }, this.Pau = () => {
      this.TweenerZ && (this.TweenerZ = void 0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UINiagara]
    ]
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.DelegateX = (0, puerts_1.toManualReleaseDelegate)(this.Csu), this.DelegateZ = (0, puerts_1.toManualReleaseDelegate)(this.psu), this.GetUiNiagara(5).SetUIActive(!1)
  }
  OnBeforeDestroy() {
    this.TweenerX && (this.TweenerX = void 0), this.TweenerZ && (this.TweenerZ = void 0), (0, puerts_1.releaseManualReleaseDelegate)(this.Csu), (0, puerts_1.releaseManualReleaseDelegate)(this.psu)
  }
  RefreshIcon(t) {
    this.SetTextureByPath(t, this.GetTexture(0))
  }
  RefreshSettlePointText(t) {
    this.SettlePoint = t, this.GetText(1).SetText(t.toString())
  }
  ShowWinAnim() {
    return this.SettlePoint ? (this.SequencePlayer?.PlayLevelSequenceByName("DamageAccumulate"), this.SettlePoint) : 0
  }
  GetDamage() {
    return this.SettlePoint
  }
  OnAccumulateEvent(t, i, s) {
    var e;
    this.SettlePoint && (this.GetUiNiagara(5).SetUIActive(!0), e = this.GetTexture(0).D_K2_GetComponentLocation(), this.TweenerX = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateX, e.X, t, PhantomArenaDefine_1.ACCUMULATE_TWEEN_TIME), this.TweenerZ = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateZ, e.Z, i, PhantomArenaDefine_1.ACCUMULATE_TWEEN_TIME), this.TweenerX && (this.TweenerX.SetEase(28), this.TweenerX.SetCurveFloat(s), this.TweenerX.OnCompleteCallBack.Bind(this.Aau)), this.TweenerZ) && (this.TweenerZ.SetEase(28), this.TweenerZ.SetCurveFloat(s), this.TweenerZ.OnCompleteCallBack.Bind(this.Pau))
  }
}
exports.PhantomArenaBattleDetailsSkillItem = PhantomArenaBattleDetailsSkillItem;
//# sourceMappingURL=PhantomArenaBattleDetailsIconItem.js.map