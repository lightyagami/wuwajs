"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skill = exports.MONTAGE_DEFAULT_INDEX = exports.MONTAGE_INVALID_INDEX = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
const EffectSystem_1 = require("../../../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds");
const ExtraEffectAddBattleFlag_1 = require("../Abilities/ExtraEffect/ExtraEffectAddBattleFlag");
const BaseSkillComponent_1 = require("./BaseSkillComponent");
const EndSkillInfo_1 = require("./EndSkillInfo");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const EffectUtil_1 = require("../../../../../Utils/EffectUtil");
exports.MONTAGE_INVALID_INDEX = -1;
exports.MONTAGE_DEFAULT_INDEX = 0;
const MONTAGE_BLEND_TIME = 0.2;
class Skill {
  constructor() {
    this.Dzo = Stats_1.Stat.Create("Add Spec Tag");
    this.Rzo = Stats_1.Stat.Create("Add InSkill Tag");
    this.Uzo = Stats_1.Stat.Create("Add Spec Buff");
    this.Azo = Stats_1.Stat.Create("Remove Spec Buff&Tag");
    this.Pzo = Stats_1.Stat.Create("Remove InSkill Tag");
    this.xzo = Stats_1.Stat.Create("Add Spec EndBuff");
    this.ActiveAbility = undefined;
    this.wzo = undefined;
    this.Bzo = undefined;
    this.MontageContextId = undefined;
    this.PreContextId = undefined;
    this.ANc = undefined;
    this.BattleFlags = [];
    this.SkillBehaviorAnimNotifyMessageId = undefined;
    this.FightStateHandle = 0;
    this.bzo = 0;
    this.qzo = false;
    this.Gzo = false;
    this.Nzo = undefined;
    this.kzo = [];
    this.Fzo = false;
    this.Vzo = undefined;
    this.Hzo = undefined;
    this.jzo = undefined;
    this.CurrentMontageIndex = exports.MONTAGE_INVALID_INDEX;
    this.Wzo = [];
    this.Kzo = new Map();
    this.oGl = 0;
    this.Xzo = 0;
    this.EndSkillInfo = undefined;
    this.cBe = undefined;
    this.$zo = undefined;
    this.Lie = undefined;
    this.Hte = undefined;
    this.C51 = undefined;
    this.vHr = undefined;
  }
  get MNc() {
    return this.ANc;
  }
  set MNc(t) {
    this.ANc = t;
    ExtraEffectAddBattleFlag_1.AddBattleFlag.ApplyEffects(this.cBe.Entity, this);
  }
  get SkillId() {
    return this.bzo;
  }
  get Active() {
    return this.qzo;
  }
  get IsSimulated() {
    return this.Gzo;
  }
  get SkillInfo() {
    return this.Nzo;
  }
  get SkillName() {
    return this.Nzo?.SkillName.toString() ?? "";
  }
  get SkillTagIds() {
    return this.kzo;
  }
  HasAnimTag() {
    return this.Fzo;
  }
  get AbilityClass() {
    return this.Vzo;
  }
  GetMontageByIndex(t) {
    if (this.jzo && !(t < 0) && !(t >= this.jzo.length)) {
      return this.jzo[t];
    }
  }
  SetMontageByIndex(t, i) {
    this.jzo ||= new Array(this.SkillInfo.MontagePaths.Num());
    if (t < this.jzo.length) {
      this.jzo[t] = i;
    }
  }
  GetLoadedMontages() {
    return this.jzo;
  }
  get InterruptLevel() {
    return this.oGl;
  }
  set InterruptLevel(t) {
    this.oGl = t;
  }
  Initialize(t, i, s) {
    this.cBe = s;
    this.$zo = s.Entity.GetComponent(175);
    this.Lie = s.Entity.GetComponent(206);
    this.Hte = s.Entity.GetComponent(3);
    this.C51 = s.Entity.GetComponent(25);
    this.vHr = s.Entity.GetComponent(123);
    this.bzo = t;
    this.Nzo = i;
    this.qzo = false;
    this.EndSkillInfo = new EndSkillInfo_1.EndSkillInfo();
    this.oGl = i.InterruptLevel;
    for (let t = i.SkillTag.Num() - 1; t >= 0; t--) {
      var e = i.SkillTag.Get(t);
      var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e?.TagName);
      if (e === -897737980) {
        this.Fzo = true;
      }
      this.kzo.push(e);
    }
    if (i.SkillMode === 1) {
      this.Yzo();
    }
    this.Jzo();
  }
  Clear() {
    if (this.Active) {
      this.EndSkill();
    }
    if (this.Hzo) {
      this.cBe.Entity.GetComponent(17).ClearAbility(this.Hzo);
      this.Hzo = undefined;
    }
    this.cBe = undefined;
    this.$zo = undefined;
    this.Lie = undefined;
    this.Nzo = undefined;
    this.ActiveAbility = undefined;
    this.wzo = undefined;
    this.qzo = false;
    this.jzo = undefined;
    return !(this.Vzo = undefined);
  }
  Yzo() {
    let t = this.SkillInfo.SkillGA.AssetPathName.toString();
    var i;
    if (t && t.length > 0 && t !== "None") {
      t = this.Hte?.GetReplaceEffect(t) ?? t;
      this.Vzo = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.Class);
      if (this.Vzo) {
        i = UE.KuroStaticLibrary.GetDefaultObject(this.Vzo);
        if (this.Vzo.IsChildOf(UE.Ga_Passive_C.StaticClass())) {
          this.cBe.SetGaPassiveClassToSkillMap(this.Vzo, this.SkillId);
          this.MNc = this.$La();
        } else if (i.AbilityTriggers && i.AbilityTriggers.Num() > 0) {
          CombatLog_1.CombatLog.Error("Skill", this.cBe.Entity, "被动技能未继承自Ga_Passive", ["技能Id", this.SkillId], ["技能名", this.SkillName], ["GA", this.SkillInfo.SkillGA], ["GA Path", t]);
        }
        this.nO1();
        if (i.StartOnGiven) {
          this.cBe.StartOnGivenList.push(this.SkillId);
        }
      } else {
        CombatLog_1.CombatLog.Error("Skill", this.cBe.Entity, "加载技能GA失败，GA未加载", ["技能Id", this.SkillId], ["技能名", this.SkillName], ["GA", this.SkillInfo.SkillGA], ["GA Path", t]);
      }
    } else {
      CombatLog_1.CombatLog.Error("Skill", this.cBe.Entity, "加载技能GA失败，GA路径为空", ["技能Id", this.SkillId], ["技能名", this.SkillName], ["GA", this.SkillInfo.SkillGA], ["GA Path", t]);
    }
  }
  nO1() {
    var t;
    if (this.Vzo) {
      t = this.cBe.Entity.GetComponent(17);
      this.Hzo = t.GetAbility(this.Vzo);
    }
  }
  Jzo() {
    if (this.SkillInfo.Animations.Num() > 0) {
      this.jzo = new Array(this.SkillInfo.Animations.Num());
      var s = this.cBe?.Entity.GetComponent(3);
      for (let i = 0; i < this.SkillInfo.Animations.Num(); ++i) {
        const o = this.SkillInfo.Animations.Get(i);
        if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(o)) {
          var e = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(o);
          const l = i;
          let t = e.ToAssetPathName();
          if (s) {
            t = s.GetReplaceMontage(t) ?? t;
          }
          var h = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.AnimMontage);
          if (h?.IsValid()) {
            this.jzo[l] = h;
          } else {
            ResourceSystem_1.ResourceSystem.LoadAsync(e.ToAssetPathName(), UE.AnimMontage, t => {
              if (t?.IsValid()) {
                this.jzo[l] = t;
              } else {
                CombatLog_1.CombatLog.Warn("Skill", this.cBe.Entity, "蒙太奇加载失败，请检查Animations蒙太奇软路径对象", ["技能Id", this.SkillId], ["技能名", this.SkillName], ["索引", l], ["AssetNamePath", o.AssetPathName]);
              }
            });
          }
        } else {
          CombatLog_1.CombatLog.Warn("Skill", this.cBe.Entity, "蒙太奇软路径对象无效，请设置Animations蒙太奇软路径对象", ["技能Id", this.SkillId], ["技能名", this.SkillName], ["索引", i]);
        }
      }
    } else {
      var r = this.SkillInfo.MontagePaths;
      if (r.Num() > 0) {
        let i = false;
        this.jzo = new Array(r.Num());
        for (let t = 0; t < r.Num(); ++t) {
          var a = r.Get(t);
          if (!a || a.length === 0) {
            i = true;
            CombatLog_1.CombatLog.Error("Skill", this.cBe.Entity, "蒙太奇路径为空，请设置MontagePaths蒙太奇路径", ["技能Id", this.SkillId], ["技能名", this.SkillName], ["索引", t]);
          }
          if (i) {
            return;
          }
          a = this.C51?.GetMontageByName(a, true, true);
          if (a) {
            this.jzo[t] = a;
          } else {
            CombatLog_1.CombatLog.Warn("Skill", this.cBe.Entity, "蒙太奇未加载", ["技能Id", this.SkillId], ["技能名", this.SkillName], ["索引", t]);
          }
        }
      }
    }
  }
  AttachEffect(t, i, s, e) {
    let h = this.Kzo.get(i);
    s = {
      BoneName: s,
      EffectHandle: t,
      WhenSkillEndEnableTime: e
    };
    if (h) {
      h.push(s);
    } else {
      (h = []).push(s);
      this.Kzo.set(i, h);
    }
  }
  zzo(t, i, s) {
    if (EffectSystem_1.EffectSystem.IsValid(i) && (EffectSystem_1.EffectSystem.SetTimeScale(i, 1), !(s > 0) || !(EffectSystem_1.EffectSystem.GetTotalPassTime(i) > s))) {
      var e = EffectSystem_1.EffectSystem.GetSureEffectActor(i);
      switch (t) {
        case 2:
          if (e) {
            e.K2_DetachFromActor(1, 1, 1);
          }
          EffectUtil_1.EffectUtil.ListenForeverTimeScale(i, this.vHr);
          EffectSystem_1.EffectSystem.StopEffectById(i, "[Skill.EffectsProcess] Detach", false);
          break;
        case 4:
          if (e) {
            e.K2_DetachFromActor(1, 1, 1);
            EffectSystem_1.EffectSystem.StopEffectById(i, "[Skill.EffectsProcess] DetachDestroy", true);
          }
          break;
        case 3:
          if (e) {
            e.K2_DetachFromActor(1, 1, 1);
            EffectUtil_1.EffectUtil.ListenForeverTimeScale(i, this.vHr);
            EffectSystem_1.EffectSystem.StopEffectById(i, "[Skill.EffectsProcess] DetachEnd", false);
          }
          break;
        case 6:
          EffectSystem_1.EffectSystem.StopEffectById(i, "[Skill.EffectsProcess] UnDetachDestroy", true);
          break;
        case 5:
          EffectUtil_1.EffectUtil.ListenForeverTimeScale(i, this.vHr);
          EffectSystem_1.EffectSystem.StopEffectById(i, "[Skill.EffectsProcess] UnDetachEnd", false);
      }
    }
  }
  Zzo() {
    if (this.Kzo) {
      for (var [i, s] of this.Kzo) {
        for (let t = s.length - 1; t >= 0; t--) {
          var e = s.pop();
          var h = e.EffectHandle;
          this.zzo(i, h, e.WhenSkillEndEnableTime);
        }
      }
      this.Kzo.clear();
    }
  }
  BeginSkill() {
    return !this.Active && (this.CurrentMontageIndex = exports.MONTAGE_INVALID_INDEX, this.qzo = true, this.Gzo = false, this.MNc = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(), this.MontageContextId = undefined, this.EndSkillInfo?.Reset(), true);
  }
  BeginSkillBuffAndTag(i) {
    this.Xzo = i;
    this.Dzo.Start();
    if (this.$zo) {
      t = this.$zo.AddTagWithReturnHandle(this.SkillTagIds);
      this.Wzo.push(t);
    }
    this.Dzo.Stop();
    if (this.Lie && this.SkillInfo.GroupId === BaseSkillComponent_1.SKILL_GROUP_MAIN) {
      this.Rzo.Start();
      if (this.SkillInfo.IsFullBodySkill) {
        this.Lie.AddTag(1996624497);
      } else {
        this.Lie.AddTag(704115290);
      }
      this.Rzo.Stop();
    }
    if (this.$zo && !this.IsSimulated) {
      this.Uzo.Start();
      if (Math.abs(this.SkillInfo.StrengthCost) > 0) {
        t = this.$zo.AddBuffLocal(CharacterBuffIds_1.buffId.SkillStrengthForbidden, {
          InstigatorId: this.$zo.CreatureDataId,
          Reason: `技能${this.SkillId}存在体力消耗`,
          PreMessageId: this.MNc
        });
        this.Wzo.push(t);
      }
      var t = this.$zo.AddAttributeRateModifierLocal(EAttributeId.Proto_SkillToughRatio, this.SkillInfo.ToughRatio - 1, `技能${this.SkillId}技能状态韧性系数`);
      this.Wzo.push(t);
      if (this.SkillInfo.ImmuneFallDamageTime > 0) {
        t = this.$zo.AddBuffLocal(CharacterBuffIds_1.buffId.FallImmune, {
          InstigatorId: this.$zo.CreatureDataId,
          Duration: this.SkillInfo.ImmuneFallDamageTime,
          Reason: `技能${this.SkillId}跌落伤害保护`,
          PreMessageId: this.MNc
        });
        this.Wzo.push(t);
      }
      for (let t = 0; t < this.SkillInfo.SkillBuff.Num(); ++t) {
        var s = this.$zo.AddBuffLocal(Number(this.SkillInfo.SkillBuff.Get(t)), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: i,
          Reason: `技能${this.SkillId}通过技能期间生效的GE添加`,
          PreMessageId: this.MNc
        });
        this.Wzo.push(s);
      }
      for (let t = 0; t < this.SkillInfo.SkillStartBuff.Num(); ++t) {
        this.$zo.AddBuff(Number(this.SkillInfo.SkillStartBuff.Get(t)), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: i,
          Reason: `技能${this.SkillId}开始时添加`,
          PreMessageId: this.MNc
        });
      }
      this.Uzo.Stop();
    }
  }
  EndSkill() {
    if (!this.Active) {
      return false;
    }
    this.InterruptLevel = this.SkillInfo.InterruptLevel;
    this.qzo = false;
    this.ActiveAbility = undefined;
    this.cBe.FightStateComp?.ExitState(this.FightStateHandle);
    this.eZo();
    this.Zzo();
    this.Azo.Start();
    this.Wzo.forEach(t => {
      this.$zo?.RemoveBuffByHandle(t, -1, "技能结束移除");
    });
    this.Wzo.length = 0;
    this.Azo.Stop();
    if (this.Lie && this.SkillInfo.GroupId === BaseSkillComponent_1.SKILL_GROUP_MAIN) {
      this.Pzo.Start();
      if (this.SkillInfo.IsFullBodySkill) {
        this.Lie.RemoveTag(1996624497);
      } else {
        this.Lie.RemoveTag(704115290);
      }
      this.Pzo.Stop();
    }
    if (this.$zo && !this.IsSimulated) {
      this.xzo.Start();
      for (let t = 0; t < this.SkillInfo.SkillEndBuff.Num(); ++t) {
        this.$zo.AddBuff(Number(this.SkillInfo.SkillEndBuff.Get(t)), {
          InstigatorId: this.$zo.CreatureDataId,
          Level: this.Xzo,
          Reason: `技能${this.SkillId}结束时添加`,
          PreMessageId: this.MNc
        });
      }
      this.xzo.Stop();
    }
    return true;
  }
  SimulatedBeginSkill(t) {
    return !this.Active && (this.qzo = true, this.Gzo = true, this.MNc = t, this.BeginSkillBuffAndTag(0), true);
  }
  SetTimeDilation(t, i) {
    for (const s of this.Kzo.values()) {
      if (s) {
        for (const e of s) {
          if (EffectSystem_1.EffectSystem.IsValid(e.EffectHandle)) {
            EffectUtil_1.EffectUtil.SetEffectTimeScale(e.EffectHandle, t, i);
          }
        }
      }
    }
  }
  PlayMontage(t, i, s, e, h, r) {
    var a = this.GetMontageByIndex(t);
    if (!a?.IsValid()) {
      CombatLog_1.CombatLog.Error("Skill", this.cBe.Entity, "播放的蒙太奇索引不存在", ["技能id:", this.SkillId], ["技能名:", this.SkillName], ["index", t]);
      return false;
    }
    this.CurrentMontageIndex = t;
    s = s ? FNameUtil_1.FNameUtil.GetDynamicFName(s) : FNameUtil_1.FNameUtil.EMPTY;
    this.wzo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(this.cBe.GetMainAnimInstance(), a, i, e, s);
    this.wzo.bShouldEmitOnEndedEvent = true;
    this.wzo.EndCallback.Add(t => {
      h?.(t);
    });
    this.Bzo = h;
    this.MontageContextId = r ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    this.cBe.MontageComp?.PushMontageInfo({
      MontageNames: [],
      SkillId: this.SkillId,
      MontageIndex: t,
      MontageTaskMessageId: this.MontageContextId
    }, a);
    return true;
  }
  eZo() {
    var t;
    if (this.wzo) {
      t = this.wzo.MontageToPlay;
      this.wzo.EndTask();
      this.wzo = undefined;
      this.cBe.GetMainAnimInstance().Montage_Stop(MONTAGE_BLEND_TIME, t);
    }
    this.Bzo = undefined;
  }
  RequestStopMontage(t) {
    var i;
    if (this.Bzo) {
      i = this.Bzo;
      this.Bzo = undefined;
      i?.(t);
    }
  }
  SetEffectHidden(t) {
    for (const i of this.Kzo.values()) {
      for (const s of i) {
        if (EffectSystem_1.EffectSystem.IsValid(s.EffectHandle)) {
          EffectSystem_1.EffectSystem.SetEffectHidden(s.EffectHandle, t, "Skill");
        }
      }
    }
  }
  $La() {
    var t = this.cBe.Entity.GetComponent(0).ComponentDataMap.get("Vys")?.Vys;
    if (t && t.pI_) {
      for (const i of t.pI_) {
        if (this.SkillId === MathUtils_1.MathUtils.LongToNumber(i.r5n)) {
          return MathUtils_1.MathUtils.LongToBigInt(i._Vn);
        }
      }
    }
    CombatLog_1.CombatLog.Error("Skill", this.cBe.Entity, "未找到服务器对应被动ga技能的上下文，检查该技能是否有导出给服务器", ["技能Id", this.SkillId]);
  }
}
exports.Skill = Skill;
//# sourceMappingURL=Skill.js.map