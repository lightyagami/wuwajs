"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDetailsSkillItem = exports.PhantomArenaBattleDetailsRoleItem = exports.PhantomArenaBattleDetailsMonsterItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Time_1 = require("../../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const HpBufferStateMachine_1 = require("../../../../BattleUi/Views/HeadState/HpBufferStateMachine");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaHeadItem_1 = require("../Panel/PhantomArenaHeadItem");
const FACTOR_INTERVAL = 600;
class PhantomArenaBattleDetailsMonsterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Proxy = undefined;
    this.AttributeComp = undefined;
    this.EntityId = 0;
    this.HasTickInit = false;
    this.BeforeBattleFactor = [];
    this.HadPlayFactor = new Set();
    this.CurShowTime = 0;
    this.CurPlayingIndex = -1;
    this.SequencePlayer = undefined;
    this.IsOwn = false;
    this.TweenerX = undefined;
    this.TweenerZ = undefined;
    this.DelegateX = undefined;
    this.DelegateZ = undefined;
    this.DamageCount = 0;
    this.HpMachine = new HpBufferStateMachine_1.HpBufferStateMachine();
    this.OldLife = 0;
    this.MaxLife = 0;
    this.LastLife = 0;
    this.AnimPlayed = false;
    this.OnClickCb = undefined;
    this.eTt = () => {
      if (this.OnClickCb) {
        this.OnClickCb(this.EntityId);
      }
    };
    this.OU1 = () => {
      var t = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) ?? 0;
      var i = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n) ?? this.MaxLife;
      if (i !== 0) {
        this.MaxLife = i;
      }
      var s = t / i;
      if (this.OldLife <= t) {
        this.GetSprite(11).SetFillAmount(s);
        this.HpMachine.Reset();
      } else {
        this.HpMachine.GetHit(s, this.OldLife / i);
      }
      this.OldLife = t;
      this.GetSprite(4).SetFillAmount(s);
      this.GetSprite(3).SetFillAmount(s);
      if (this.OldLife === 0) {
        this.GetItem(9)?.SetUIActive(true);
        this.SequencePlayer?.PlayLevelSequenceByName("Kill");
      }
    };
    this.Fj1 = () => {
      var t = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4) ?? 0;
      if (this.IsOwn) {
        this.Proxy.SetOwnAllSettlePoint(this.EntityId, t);
      } else {
        this.Proxy.SetOpponentSettlePoint(this.EntityId, t);
      }
    };
    this.Icu = t => {
      var i = this.GetUiNiagara(8).D_K2_GetComponentLocation();
      var t = Vector_1.Vector.Create(t, i.Y, i.Z).ToUeVector();
      this.GetUiNiagara(8).D_K2_SetWorldLocation(t, false, undefined, false);
    };
    this.Tcu = t => {
      var i = this.GetUiNiagara(8).D_K2_GetComponentLocation();
      var i = Vector_1.Vector.Create(i.X, i.Y, t).ToUeVector();
      this.GetUiNiagara(8).D_K2_SetWorldLocation(i, false, undefined, false);
    };
    this.vmu = () => {
      this.TweenerX &&= undefined;
      this.GetUiNiagara(8).SetUIActive(false);
    };
    this.ymu = () => {
      this.TweenerZ &&= undefined;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UINiagara], [9, UE.UIItem], [10, UE.UIText], [11, UE.UISprite]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.qU1();
    this.DelegateX = (0, puerts_1.toManualReleaseDelegate)(this.Icu);
    this.DelegateZ = (0, puerts_1.toManualReleaseDelegate)(this.Tcu);
    this.GetItem(9)?.SetUIActive(false);
    this.GetText(10)?.SetUIActive(false);
    this.GetUiNiagara(8)?.SetUIActive(false);
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.GU1();
    this.TweenerX &&= undefined;
    this.TweenerZ &&= undefined;
    (0, puerts_1.releaseManualReleaseDelegate)(this.Icu);
    (0, puerts_1.releaseManualReleaseDelegate)(this.Tcu);
  }
  FU1(t) {
    this.DamageCount = t;
    this.GetText(2).SetText(t.toString());
  }
  Kbe(t) {
    t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetCardDataByEntityId(t);
    t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    this.SetTextureByPath(t.BvbIcon, this.GetTexture(1));
  }
  qU1() {
    this.GetSprite(3).SetUIActive(this.IsOwn);
    this.GetSprite(4).SetUIActive(!this.IsOwn);
  }
  bcu(t, i) {
    var s = this.IsOwn ? "LightShowRight" : "LightShowLeft";
    if (this.HasTickInit) {
      this.CurPlayingIndex = -1;
      this.BeforeBattleFactor.length = 0;
      this.HadPlayFactor.clear();
      if (this.SequencePlayer?.IsPlayingSequence(s)) {
        this.SequencePlayer?.StopPlayingSequence(false, true);
      }
    } else {
      this.BeforeBattleFactor.length = 0;
      for (const e of i) {
        if (ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(e).IsBeforeBattle) {
          this.BeforeBattleFactor.push(e);
        }
      }
      this.BeforeBattleFactor.sort((t, i) => {
        t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(t);
        return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(i).Sort - t.Sort;
      });
      if (this.BeforeBattleFactor.length > 0) {
        this.CurPlayingIndex = 0;
      }
      this.HasTickInit = true;
    }
  }
  Rcu(t) {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(t);
    var i = t.IsBeforeBattle;
    var t = t.Name;
    var s = this.GetText(7);
    this.GetItem(5)?.SetUIActive(!i);
    this.GetItem(6)?.SetUIActive(i);
    s?.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, t);
  }
  Tick(t) {
    if (this.HasTickInit) {
      if ((t = this.HpMachine.UpdatePercent(t)) >= 0) {
        this.GetSprite(11)?.SetFillAmount(t);
      }
      if (!ModelManager_1.ModelManager.CreatureModel.GetEntity(this.EntityId)?.Valid && this.OldLife !== 0 && !this.AnimPlayed) {
        this.AttributeComp?.RemoveListeners([CharacterAttributeTypes_1.EAttributeId.Proto_Life, CharacterAttributeTypes_1.EAttributeId.l5n], this.OU1);
        this.AttributeComp?.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.Fj1);
        this.AttributeComp = undefined;
        this.OU1();
      }
      this.Smu();
    }
  }
  Smu() {
    var t = this.Lcu();
    var i = this.IsOwn ? "LightShowRight" : "LightShowLeft";
    if (t) {
      if (this.BeforeBattleFactor.length !== 0) {
        this.BeforeBattleFactor.length = 0;
        this.CurPlayingIndex = -1;
      }
      if (this.SequencePlayer?.IsPlayingSequence(i)) {
        this.SequencePlayer?.ReplaySequenceByKey(i);
      } else {
        this.SequencePlayer?.PlayLevelSequenceByName(i);
      }
      this.Rcu(t);
    } else if (!(this.CurPlayingIndex < 0) && !(this.CurPlayingIndex >= this.BeforeBattleFactor.length) && !this.SequencePlayer?.IsPlayingSequence(i)) {
      this.Rcu(this.BeforeBattleFactor[this.CurPlayingIndex]);
      this.SequencePlayer?.PlayLevelSequenceByName(i);
      this.CurPlayingIndex++;
    }
  }
  NU1() {
    if (this.AttributeComp) {
      this.AttributeComp?.AddListeners([CharacterAttributeTypes_1.EAttributeId.Proto_Life, CharacterAttributeTypes_1.EAttributeId.l5n], this.OU1);
      this.AttributeComp?.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.Fj1);
    }
  }
  GU1() {
    if (this.AttributeComp) {
      this.AttributeComp?.RemoveListeners([CharacterAttributeTypes_1.EAttributeId.Proto_Life, CharacterAttributeTypes_1.EAttributeId.l5n], this.OU1);
      this.AttributeComp?.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.Fj1);
    }
  }
  RegisterProxy(t) {
    this.Proxy = t;
  }
  Refresh(t) {
    this.EntityId = t;
    this.GU1();
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    this.AttributeComp = i?.Entity?.GetComponent(183);
    this.NU1();
    const s = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetCardDataByEntityId(t);
    i = s.GetFightValueByAttr(Protocol_1.Aki.Protocol.GC1.Proto_CostAbility);
    this.FU1(i);
    this.Kbe(t);
    this.OU1();
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.bcu(s.ConfigId, s.ExtraFactors);
    }, 600);
  }
  Lcu() {
    if (!(this.CurShowTime + FACTOR_INTERVAL > Time_1.Time.Now)) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.EntityId)?.Entity?.GetComponent(217);
      if (t) {
        var i = [];
        for (const s of ModelManager_1.ModelManager.PhantomArenaBattleModel.GetPhantomTagMap()) {
          if (!!t.HasTag(s[0]) && !this.HadPlayFactor.has(s[1])) {
            i.push(s[1]);
          }
        }
        if (i.length !== 0) {
          i.sort((t, i) => {
            t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(t);
            return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(i).Sort - t.Sort;
          });
          this.HadPlayFactor.add(i[0]);
          this.CurShowTime = Time_1.Time.Now;
          return i[0];
        }
      }
    }
  }
  GetDamage() {
    this.LastLife = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) ?? 0;
    if (this.LastLife) {
      return this.DamageCount;
    } else {
      return 0;
    }
  }
  ShowWinAnim() {
    var t = this.IsOwn ? "LightShowRight" : "LightShowLeft";
    if (this.SequencePlayer?.IsPlayingSequence(t)) {
      this.SequencePlayer?.StopCurrentSequence(false, true);
    }
    this.LastLife = this.AttributeComp?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) ?? 0;
    if (this.LastLife) {
      this.SequencePlayer?.PlayLevelSequenceByName("DamageAccumulate");
      this.AnimPlayed = true;
      return this.DamageCount;
    } else {
      return 0;
    }
  }
  OnAccumulateEvent(t, i, s, e) {
    var h;
    var r;
    if (this.LastLife && (this.GetUiNiagara(8).SetUIActive(true), h = PhantomArenaDefine_1.ACCUMULATE_TWEEN_TIME, r = this.GetButton(0).RootUIComp.D_K2_GetComponentLocation(), this.TweenerX = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateX, r.X, t, h), this.TweenerZ = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateZ, r.Z, i, h), this.TweenerX && (this.TweenerX.OnCompleteCallBack.Bind(this.vmu), this.TweenerX.SetEase(28), this.TweenerX.SetCurveFloat(s)), this.TweenerZ)) {
      this.TweenerZ.OnCompleteCallBack.Bind(this.ymu);
      this.TweenerZ.SetEase(28);
      this.TweenerZ.SetCurveFloat(e);
    }
  }
}
exports.PhantomArenaBattleDetailsMonsterItem = PhantomArenaBattleDetailsMonsterItem;
class PhantomArenaBattleDetailsRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoleHead = undefined;
    this.ViewProxy = undefined;
    this.TweenerDamage = undefined;
    this.DelegateDamage = undefined;
    this.IsOwn = false;
    this.MaxLife = 0;
    this.CurLife = 0;
    this.LastShieldNum = 0;
    this.wcu = t => {
      this.RoleHead?.RefreshDamageBar(t / this.MaxLife);
      t = Math.max(0, Math.floor(t));
      this.GetText(1).SetText(t + "/" + this.MaxLife);
    };
    this.Mmu = () => {
      this.TweenerDamage &&= undefined;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText]];
  }
  OnStart() {
    this.DelegateDamage = (0, puerts_1.toManualReleaseDelegate)(this.wcu);
  }
  OnBeforeDestroy() {
    this.TweenerDamage &&= undefined;
    (0, puerts_1.releaseManualReleaseDelegate)(this.wcu);
  }
  async RZ1() {
    this.RoleHead = new PhantomArenaHeadItem_1.PhantomArenaHeadItem();
    this.RoleHead.IsOwn = this.IsOwn;
    await this.RoleHead.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    if (this.IsOwn) {
      this.ViewProxy.DialogManager.SetOwnDialogItem(this.RoleHead.DialogItem);
    } else {
      this.ViewProxy.DialogManager.SetOpponentDialogItem(this.RoleHead.DialogItem);
    }
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.RZ1()]);
  }
  RefreshLifeNum(t, i) {
    this.MaxLife = i;
    this.CurLife = t;
    this.GetText(1).SetText(t + "/" + i);
    this.RoleHead.RefreshLifeBar(t / i);
  }
  SetHitNum(t) {
    this.GetText(3)?.SetText("-" + t);
  }
  RefreshLifeAfterDamage(t, i) {
    var i = Math.max(0, this.CurLife - i);
    this.RoleHead.RefreshLifeBar(i / this.MaxLife);
    var s = PhantomArenaDefine_1.DAMAGE_COUNT_TWEEN_TIME;
    this.TweenerDamage = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateDamage, this.CurLife, i, s);
    if (this.TweenerDamage) {
      this.TweenerDamage.OnCompleteCallBack.Bind(this.Mmu);
      this.TweenerDamage.SetEase(28);
      this.TweenerDamage.SetCurveFloat(t);
    }
  }
  SetBarActive(t) {
    this.RoleHead.SetBarActive(t);
  }
  RefreshHeadIcon(t) {
    this.RoleHead.RefreshRoleIcon(t);
  }
  RefreshShieldNum(t) {
    var i;
    if (t > this.LastShieldNum && this.LastShieldNum === 0) {
      this.GetText(5).SetText(t.toString());
      this.GetItem(4).SetUIActive(true);
    } else if (t >= this.LastShieldNum) {
      this.GetText(5).SetText(t.toString());
    } else if (t === 0) {
      this.GetItem(4).SetUIActive(false);
    } else {
      i = t - this.LastShieldNum;
      this.GetText(5).SetText(t.toString());
      this.GetText(6).SetText(i.toString());
    }
    this.LastShieldNum = t;
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t;
  }
  OnAccumulateAfterEvent() {
    this.RoleHead?.PlayAccumulateDamage();
  }
  GetHeadLocation() {
    return this.GetItem(0).D_K2_GetComponentLocation();
  }
}
exports.PhantomArenaBattleDetailsRoleItem = PhantomArenaBattleDetailsRoleItem;
class PhantomArenaBattleDetailsSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TweenerX = undefined;
    this.TweenerZ = undefined;
    this.DelegateX = undefined;
    this.DelegateZ = undefined;
    this.SettlePoint = 0;
    this.SequencePlayer = undefined;
    this.Icu = t => {
      var i = this.GetUiNiagara(5).D_K2_GetComponentLocation();
      var t = Vector_1.Vector.Create(t, i.Y, i.Z).ToUeVector();
      this.GetUiNiagara(5).D_K2_SetWorldLocation(t, false, undefined, false);
    };
    this.Tcu = t => {
      var i = this.GetUiNiagara(5).D_K2_GetComponentLocation();
      var i = Vector_1.Vector.Create(i.X, i.Y, t).ToUeVector();
      this.GetUiNiagara(5).D_K2_SetWorldLocation(i, false, undefined, false);
    };
    this.vmu = () => {
      this.TweenerX &&= undefined;
      this.GetUiNiagara(5).SetUIActive(false);
    };
    this.ymu = () => {
      this.TweenerZ &&= undefined;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UINiagara]];
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.DelegateX = (0, puerts_1.toManualReleaseDelegate)(this.Icu);
    this.DelegateZ = (0, puerts_1.toManualReleaseDelegate)(this.Tcu);
    this.GetUiNiagara(5).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.TweenerX &&= undefined;
    this.TweenerZ &&= undefined;
    (0, puerts_1.releaseManualReleaseDelegate)(this.Icu);
    (0, puerts_1.releaseManualReleaseDelegate)(this.Tcu);
  }
  RefreshIcon(t) {
    this.SetTextureByPath(t, this.GetTexture(0));
  }
  RefreshSettlePointText(t) {
    this.SettlePoint = t;
    this.GetText(1).SetText(t.toString());
  }
  ShowWinAnim() {
    if (this.SettlePoint) {
      this.SequencePlayer?.PlayLevelSequenceByName("DamageAccumulate");
      return this.SettlePoint;
    } else {
      return 0;
    }
  }
  GetDamage() {
    return this.SettlePoint;
  }
  OnAccumulateEvent(t, i, s) {
    var e;
    if (this.SettlePoint && (this.GetUiNiagara(5).SetUIActive(true), e = this.GetTexture(0).D_K2_GetComponentLocation(), this.TweenerX = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateX, e.X, t, PhantomArenaDefine_1.ACCUMULATE_TWEEN_TIME), this.TweenerZ = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.DelegateZ, e.Z, i, PhantomArenaDefine_1.ACCUMULATE_TWEEN_TIME), this.TweenerX && (this.TweenerX.SetEase(28), this.TweenerX.SetCurveFloat(s), this.TweenerX.OnCompleteCallBack.Bind(this.vmu)), this.TweenerZ)) {
      this.TweenerZ.SetEase(28);
      this.TweenerZ.SetCurveFloat(s);
      this.TweenerZ.OnCompleteCallBack.Bind(this.ymu);
    }
  }
}
exports.PhantomArenaBattleDetailsSkillItem = PhantomArenaBattleDetailsSkillItem;
//# sourceMappingURL=PhantomArenaBattleDetailsIconItem.js.map