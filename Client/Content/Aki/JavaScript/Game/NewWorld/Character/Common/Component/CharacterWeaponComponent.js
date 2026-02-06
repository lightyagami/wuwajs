"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var o = arguments.length;
  var a = o < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        a = (o < 3 ? h(a) : o > 3 ? h(i, e, a) : h(i, e)) || a;
      }
    }
  }
  if (o > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterWeaponComponent = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const CalabashMeshByMeshId_1 = require("../../../../../Core/Define/ConfigQuery/CalabashMeshByMeshId");
const SoarById_1 = require("../../../../../Core/Define/ConfigQuery/SoarById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const CharacterUtils_1 = require("../../CharacterUtils");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CharacterWeaponMesh_1 = require("./Weapon/CharacterWeaponMesh");
const ConcomitantWeaponHelper_1 = require("./Weapon/ConcomitantWeaponHelper");
const KEEP_WEAPON_OUT_THREADHOLD = 0.1;
const WEAPON_IN_DELAY = 100;
const HIDE_WEAPON_AFTER_WEAPON_IN_DELAY = 1000;
const glideRelativeRotator = new UE.Rotator(0, 90, -90);
const noHideEffectWeaponIds = new Set([21040063, 21050063]);
const skinTag = -403067358;
class HideWeaponOrder {
  constructor(t, i, e, s = true, h = 0) {
    this.Index = 0;
    this.Hide = false;
    this.WithEffect = false;
    this.NormaState = true;
    this.ExtraType = 0;
    this.Index = t;
    this.Hide = i;
    this.WithEffect = e;
    this.NormaState = s;
    this.ExtraType = h;
  }
}
class WeaponEquipInfo {
  constructor() {
    this.WeaponId = 0;
    this.WeaponConfig = undefined;
    this.WeaponBreachLevel = 0;
  }
  SetData(t) {
    if (!t.zys && !t.fTs) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "[武器组件]获取武器配置失败 pb", ["weaponId", t.zys ?? undefined], ["WeaponBreachLevel", t.fTs ?? undefined]);
      }
      return false;
    }
    if (this.WeaponId !== t.zys) {
      this.WeaponId = t.zys;
      var i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.WeaponId);
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 57, "[武器组件]获取武器配置失败", ["weaponId", this.WeaponId]);
        }
        return false;
      }
      this.WeaponConfig = i;
    }
    this.WeaponBreachLevel = t.fTs;
    return true;
  }
}
let CharacterWeaponComponent = class CharacterWeaponComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.oRe = undefined;
    this.Lie = undefined;
    this.y5r = undefined;
    this.I5r = undefined;
    this.Hulu = undefined;
    this.WKr = 0;
    this.Mba = false;
    this.HuluHideEffect = 0;
    this.jWf = false;
    this.Paragliding = undefined;
    this.ParaglidingIsOpen = false;
    this.ParaglidingIsHover = false;
    this.ParaglidingIsAscent = false;
    this.SoarWing = undefined;
    this.SoarWingConfig = undefined;
    this.KKr = -1;
    this.QKr = undefined;
    this.XKr = 0;
    this.$Kr = 0;
    this.YKr = undefined;
    this.JKr = undefined;
    this.Xjt = false;
    this.zKr = false;
    this.ZKr = new Array();
    this.AiItemMarkId = 0;
    this.AiWeaponConfigId = 0;
    this.CacheAiSocketItem = undefined;
    this.eQr = undefined;
    this.tQr = undefined;
    this.iQr = 0;
    this.oQr = 0;
    this.rQr = undefined;
    this.nQr = undefined;
    this.sQr = undefined;
    this.aQr = undefined;
    this.hQr = 0;
    this.lQr = undefined;
    this._Qr = undefined;
    this.uQr = undefined;
    this.cQr = undefined;
    this.mQr = Vector_1.Vector.Create();
    this.dQr = undefined;
    this.Jsh = false;
    this.CQr = 10;
    this.gQr = true;
    this.WeaponEquipInfo = undefined;
    this.fQr = (t, i) => {
      this.SetWeaponVisibleByTag(i, t, true);
    };
    this.pQr = (t, i) => {
      this.SetWeaponVisibleByTag(i, t, false);
    };
    this._Ru = () => {
      for (const t of this.QKr.CharacterWeapons) {
        t.UpdateHideEffectStateInSelfCentered();
      }
    };
    this.I3r = (t, i) => {
      var e;
      var s;
      if (t?.Valid) {
        e = t.GetComponent(86);
        this.vQr();
        this.CheckAndHangWeapons(false);
        (i ? (this.MQr(0), this) : (this.MQr(0), t = (i = t.GetComponent(217)).HasTag(this.oQr), s = this.Lie.HasTag(this.oQr), this.SyncParagliding(e, t || s), t && !s && (i.RemoveTag(this.oQr), this.Lie.AddTag(this.oQr)), e)).OpenParagliding(false);
        if (this.SoarWing && e.SoarWing) {
          this.$gl();
          this.SoarWing.GetAnimInstance()?.SyncAnimStates(e.SoarWing.GetAnimInstance());
        }
      } else {
        this.OpenParagliding(false);
      }
    };
    this.EQr = (t, i) => {
      if (!!i && !this.ParaglidingIsOpen && this.Entity.GetComponent(186).MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Glide) {
        this.OpenParagliding(true);
      }
    };
    this.SQr = (t, i) => {
      if (!i && this.ParaglidingIsOpen) {
        i = EffectSystem_1.EffectSystem.SpawnEffect(this.ActorComp.Actor, this.ActorComp.Actor.Mesh.D_GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME, 1), "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Huaxiang_End.DA_Fx_Group_Huaxiang_End", "[CharacterWeaponComponent.OnGlidingChanged]", new EffectContext_1.EffectContext(this.Entity.Id));
        if (EffectSystem_1.EffectSystem.IsValid(i) && (i = EffectSystem_1.EffectSystem.GetEffectActor(i)) && i.IsValid()) {
          i.K2_AttachToComponent(this.Paragliding, FNameUtil_1.FNameUtil.EMPTY, 0, 0, 0, false);
        }
        this.OpenParagliding(false);
        this.Lie.RemoveTag(this.oQr);
      }
    };
    this.yQr = (t, i) => {
      this.ParaglidingIsHover = i;
      var e = this.Paragliding.GetAnimInstance();
      if (e) {
        e.SetHover(i);
      }
    };
    this.P3r = (t, i) => {
      if (t === CharacterUnifiedStateTypes_1.ECharMoveState.Soar || i === CharacterUnifiedStateTypes_1.ECharMoveState.Soar) {
        this.$gl();
      }
      if (this.ActorComp.IsMoveAutonomousProxy && !this.Xjt && this.AiWeaponConfigId && i === CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp && t !== i) {
        this.ReceiveCharacterKnockUpDropWeapon();
      }
    };
    this.L3r = () => {
      if (this.SoarWing && this.SoarWingConfig) {
        this.SoarWing.SetAnimClass(undefined);
        ResourceSystem_1.ResourceSystem.LoadAsync(this.SoarWingConfig.动画蓝图.ToAssetPathName(), UE.Class, t => {
          this.SoarWing.SetAnimClass(t);
          if (!this.SoarWing.GetAnimInstance()) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Test", 6, "SetNewSoarWing Error!", ["Mesh", this.SoarWing?.SkeletalMesh?.GetName()], ["NewClass", t?.GetName()]);
            }
          }
        });
      }
    };
    this.IQr = (t, i) => {
      if (i) {
        if (!EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect)) {
          i = ModelUtil_1.ModelUtil.GetModelConfig(this.WKr);
          this.MQr(0);
          this.HuluHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(this.ActorComp.Actor, this.ActorComp.Actor.Mesh.D_GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.HULU_EFFECT_SOCKET_NAME, 1), i.DA.AssetPathName?.toString(), "[CharacterWeaponComponent.OnHuluHandEffectShowChanged]", new EffectContext_1.EffectContext(this.Entity.Id));
          if (EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) && (i = EffectSystem_1.EffectSystem.GetEffectActor(this.HuluHideEffect)) && i.IsValid()) {
            i.K2_AttachToComponent(this.ActorComp.Actor.Mesh, CharacterNameDefines_1.CharacterNameDefines.HULU_EFFECT_SOCKET_NAME, 2, 2, 2, false);
          }
        }
      } else {
        if (EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect)) {
          EffectSystem_1.EffectSystem.StopEffectById(this.HuluHideEffect, "[CharacterWeaponComponent.OnHuluHandEffectShowChanged]", true);
          this.HuluHideEffect = 0;
        }
        if (!this.Lie.HasTag(-1775045118)) {
          this.SetHuluHidden(false);
        }
      }
    };
    this.TQr = (t, i) => {
      if (i) {
        this.MQr(1);
        this.SetHuluHidden(this.jWf, false);
      } else {
        this.MQr(0);
        this.SetHuluHidden(false);
      }
    };
    this.LQr = (t, i) => {
      switch (this.hQr) {
        case 0:
          this.SetHuluHidden(i, true, true);
          break;
        case 1:
          this.SetHuluHidden(i, false);
      }
    };
    this.DQr = new Set();
    this.RQr = (t, i) => {
      if (i) {
        this.DQr.add(t);
      } else {
        this.DQr.delete(t);
      }
    };
    this.UQr = () => {
      this.AQr();
    };
    this.rc_ = new Set();
    this.mfu = undefined;
    this.$gl = () => {
      this.mfu = TimerSystem_1.TimerSystem.Next(() => {
        this.SoarWing?.SetHiddenInGame(!this.W7c());
        this.mfu = undefined;
      });
    };
  }
  static get Dependencies() {
    return [3];
  }
  get _Pr() {
    return this.KKr;
  }
  set _Pr(t) {
    if (this.KKr !== t && (this.KKr = t, this.Nqc(this.QKr?.CharacterWeapons[0]), this.Nqc(this.QKr?.CharacterWeapons[1]), this.Lie)) {
      if (t === 0) {
        if (!this.Lie.HasTag(-2075724632)) {
          this.Lie.AddTag(-2075724632);
        }
      } else if (this.Lie.HasTag(-2075724632)) {
        this.Lie.RemoveTag(-2075724632);
      }
    }
  }
  SetParaglidingIsAscent(t) {
    this.ParaglidingIsAscent = t;
    var i = this.Paragliding.GetAnimInstance();
    if (i) {
      i.SetDash(t);
    }
  }
  OnInitData() {
    this.dQr = new UE.TransformDouble();
    this.WeaponEquipInfo = new WeaponEquipInfo();
    return true;
  }
  OnInit() {
    return true;
  }
  OnActivate() {
    TimerSystem_1.TimerSystem.Next(() => {
      if (this.Lie?.HasTag(skinTag)) {
        this.Lie?.RemoveTag(skinTag);
        this.Lie?.AddTag(skinTag);
      }
    });
    ConcomitantWeaponHelper_1.ConcomitantWeaponHelper.SyncWeaponToConcomitants(this.Entity);
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.CheckGetComponent(3);
    this.oRe = this.Entity.GetComponent(188);
    this.Lie = this.Entity.GetComponent(217);
    this.y5r = this.Entity.GetComponent(54);
    this.I5r = this.Entity.GetComponent(186);
    this.Xjt = this.ActorComp.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player;
    this.zKr = this.Xjt || this.ActorComp.CreatureData.GetBaseInfo()?.Category.MonsterMatchType === 4 || !!ConcomitantWeaponHelper_1.ConcomitantWeaponHelper.GetConcomitantWeaponSubMeshNames(this.Entity);
    this.iQr = 0;
    this.AiItemMarkId = 0;
    if (!this.ActorComp) {
      return false;
    }
    this.Sba();
    this.PQr();
    this.xQr();
    var t = this.ActorComp.CreatureData.GetParaglidingSkinId();
    if (t > 0) {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(t);
      this.wQr(t.ModelId);
    } else {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(1);
      this.wQr(t);
    }
    var t = this.ActorComp.CreatureData.GetSoarWingSkinId();
    if (t > 0) {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(t);
      this.Xgl(t.ModelId);
    } else {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(0);
      this.Xgl(t);
    }
    for (const i of this.QKr.CharacterWeapons) {
      this.bQr(i, true, false, true, 0, "OnStart-InitHide");
    }
    if (this.Xjt) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.SoarTypeChange, this.$gl);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationAdd, this._Ru);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationRemove, this._Ru);
      this.oQr = 1905601506;
      this.rQr = this.Lie.ListenForTagAddOrRemove(this.oQr, this.EQr);
      this.nQr = this.Lie.ListenForTagAddOrRemove(262865373, this.SQr);
      this.sQr = this.Lie.ListenForTagAddOrRemove(921953316, this.yQr);
      this._Qr = this.Lie.ListenForTagAddOrRemove(-1660069905, this.IQr);
      this.lQr = this.Lie.ListenForTagAddOrRemove(507209871, this.TQr);
      this.uQr = this.Lie.ListenForTagAddOrRemove(-1775045118, this.LQr);
      this.BQr();
      this.InitWeaponVisibleData();
      this.gYs();
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.P3r);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharChangeMeshAnim, this.L3r);
    }
    return true;
  }
  OnEntitySoarWingOrParaglidingSkinChangeNotify(t) {
    for (const e of t.cGc) {
      let t = 0;
      t = e.Z7n > 0 ? ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(e.Z7n).ModelId : ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(e._Gc);
      var i = this.Entity.GetComponent(0);
      if (e._Gc === 1) {
        i?.SetParaglidingSkinId(e.Z7n);
        this.wQr(t);
      } else if (e._Gc === 0) {
        i?.SetSoarWingSkinId(e.Z7n);
        this.Xgl(t);
      }
    }
  }
  OnEnd() {
    if (this.Xjt) {
      if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
      }
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.SoarTypeChange, this.$gl);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationAdd, this._Ru);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationRemove, this._Ru);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.P3r);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharChangeMeshAnim, this.L3r);
    }
    return true;
  }
  OnTick(t) {
    if (this.zKr) {
      this.CheckAndHangWeapons(true);
    }
    for (const e of this.ZKr) {
      var i;
      if (e.Index < 0) {
        for (const s of this.QKr.CharacterWeapons) {
          if (!e.NormaState) {
            s.VisibleHelper.EnableHiddenInGameByExtraVisibleType(e.ExtraType, true);
          }
          this.bQr(s, e.Hide, e.WithEffect, e.NormaState, e.ExtraType, "OnTick-AllWeapons");
        }
      } else if (e.Index < this.QKr.CharacterWeapons.length) {
        i = this.QKr.CharacterWeapons[e.Index];
        if (!e.NormaState) {
          i.VisibleHelper.EnableHiddenInGameByExtraVisibleType(e.ExtraType, true);
        }
        this.bQr(i, e.Hide, e.WithEffect, e.NormaState, e.ExtraType, `OnTick-Weapon[${e.Index}]`);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 6, "隐藏武器选择了错误的武器序号", ["index", e.Index], ["BP", this.ActorComp.Actor.GetName()]);
      }
    }
    if ((this.ZKr.length = 0) === this._Pr && this.DQr.size > 0) {
      for (const h of this.QKr.CharacterWeapons) {
        this.bQr(h, true, true, true, 0, "OnTick-HideTags");
      }
    }
    this.qQr(t);
    this.GQr();
    this.NQr();
  }
  OnClear() {
    this.ClearWeaponVisibleData();
    this.QKr?.Destroy();
    this.QKr = undefined;
    if (EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.HuluHideEffect, "[CharacterWeaponComponent.OnClear]", true);
      this.HuluHideEffect = 0;
    }
    if (this.YKr) {
      TimerSystem_1.TimerSystem.Remove(this.YKr);
      this.YKr = undefined;
    }
    if (this.JKr) {
      TimerSystem_1.TimerSystem.Remove(this.JKr);
      this.JKr = undefined;
    }
    if (this.mfu) {
      TimerSystem_1.TimerSystem.Remove(this.mfu);
      this.mfu = undefined;
    }
    if (this.Xjt) {
      this.rQr.EndTask();
      this.nQr.EndTask();
      this.sQr.EndTask();
      this.rQr = undefined;
      this.nQr = undefined;
      this.sQr = undefined;
      this._Qr.EndTask();
      this._Qr = undefined;
      this.uQr.EndTask();
      this.uQr = undefined;
      this.lQr.EndTask();
      this.lQr = undefined;
      this.aQr.forEach(t => {
        t.EndTask();
      });
      this.aQr = [];
    } else {
      this.ClearWeaponForAi();
      this.AiWeaponConfigId = 0;
    }
    var t = this.Paragliding?.GetAnimInstance();
    if (t?.DebugDestructText) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Role", 6, "Paragliding OnClear", ["DebugDestructText", t.DebugDestructText]);
      }
      t.DebugDestructText = "";
    }
    return true;
  }
  OnEnable() {
    this.GQr();
  }
  OnDisable(t) {
    this.GQr();
  }
  BQr() {
    if (this.Lie.HasTag(this.oQr)) {
      this.OpenParagliding(true);
    }
  }
  PQr() {
    this.QKr = new CharacterWeaponMesh_1.CharacterWeaponMesh();
    var t;
    var i = this.ActorComp.Actor.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
    var e = new Array();
    for (let t = 0; t < i.Num(); ++t) {
      var s = i.Get(t);
      if (s instanceof UE.SkeletalMeshComponent && s.GetName().startsWith("WeaponCase")) {
        e.push(s);
        s.bAbsoluteScale = false;
      }
    }
    if (this.Xjt) {
      t = this.Entity.GetComponent(0).GetRoleConfig().WeaponScale;
      this.mQr.Set(t[0], t[1], t[2]);
      this.dQr.SetScale3D(this.mQr.ToUeVector());
    } else {
      this.mQr.Set(1, 1, 1);
    }
    this.QKr.Init(e, this.ActorComp.Actor.Mesh, this.ActorComp.Actor, false);
    if (this.QKr.CharacterWeapons.length > 0) {
      if (this.Xjt) {
        this.OQr();
        this.EquipWeaponForRole();
        this.kQr();
        this.UT1();
      } else if (this.zKr) {
        this.OQr();
        this.kQr();
        this.mQr.FromUeVector(this.QKr?.CharacterWeapons[0].Mesh.RelativeScale3D);
      }
    }
    if (!this.zKr) {
      this.FQr();
    }
  }
  OQr() {
    var t = this.Entity.GetComponent(0).GetModelConfig();
    var i = t.NormalSockets;
    var e = t.BattleSockets;
    if (i.Num() !== e.Num() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "角色设置武器失败,两种类型槽位数量不统一", ["Id", this.ActorComp.Actor.GetName()], ["ModelId", t.ID]);
    }
    if (i.Num() > this.QKr.CharacterWeapons.length || e.Num() > this.QKr.CharacterWeapons.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "角色设置武器失败,角色蓝图武器组件少于武器数量配置", ["Id", this.ActorComp.Actor.GetName()], ["ModelId", t.ID]);
      }
      this.QKr.ChangeCharacterWeapons(i.Num());
    }
    let s = 0;
    for (const h of this.QKr.CharacterWeapons) {
      h.NormalSocket = FNameUtil_1.FNameUtil.GetDynamicFName(i.Get(s));
      h.BattleSocket = FNameUtil_1.FNameUtil.GetDynamicFName(e.Get(s));
      ++s;
    }
  }
  kQr() {
    this._Pr = 0;
    for (const t of this.QKr.CharacterWeapons) {
      this.W7o(t, t.NormalSocket, this.dQr, false);
    }
    this.JKr = undefined;
  }
  FQr() {
    this.VQr();
    var t = this.ActorComp.CreatureData?.ComponentDataMap.get("fys");
    if (t) {
      if (t = t.fys?.zys) {
        this.RegisterCharacterDropWeaponEvent(t);
        this.ChangeWeaponByWeaponByConfigId(t);
      } else {
        this._Pr = -1;
        this.WeaponIn(false, 0, "CreateWeaponMeshForOther");
      }
    }
  }
  wQr(t) {
    var i;
    if (this.Xjt && (this.Paragliding || ((i = this.ActorComp.Actor.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, CharacterNameDefines_1.CharacterNameDefines.PARAGLIDING_MESH_COMP_NAME)).K2_AttachToComponent(this.ActorComp.Actor.Mesh, CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME, 0, 0, 0, true), this.Paragliding = i, this.ActorComp.Actor.CharRenderingComponent.AddComponentByCase(7, this.Paragliding)), this.SetNewParagliding(t), this.Paragliding.D_K2_SetRelativeLocation(Vector_1.Vector.ZeroVectorProxy.ToUeVector(), false, undefined, false), this.Paragliding.K2_SetRelativeRotation(glideRelativeRotator, false, undefined, false), this.Paragliding.D_SetWorldScale3D(Vector_1.Vector.OneVectorProxy.ToUeVector()), this.HQr(true), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Weapon", 57, "加载滑翔伞", ["location", this.Paragliding?.D_K2_GetComponentLocation()?.ToString()], ["characterLocation", this.ActorComp?.ActorLocation?.ToString()], ["modelConfigId", t]);
    }
  }
  Xgl(t) {
    var i;
    var e;
    if (this.Xjt && (i = SoarById_1.configSoarById.GetConfig(this.ActorComp.CreatureData.GetRoleConfig().RoleBody)) && (this.SoarWing || ((e = this.ActorComp.Actor.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, CharacterNameDefines_1.CharacterNameDefines.SOAR_WING_MESH_COMP_NAME)).K2_AttachToComponent(this.ActorComp.Actor.Mesh, new UE.FName(i.HangSocket), 0, 0, 0, true), this.SoarWing = e, this.ActorComp.Actor.CharRenderingComponent.AddComponentByCase(12, e)), this.SoarWing.K2_SetRelativeTransform(MathUtils_1.MathUtils.DefaultTransform, false, undefined, false), this.$gl(), this.SoarWingConfig = ModelUtil_1.ModelUtil.GetModelConfig(t), ResourceSystem_1.ResourceSystem.LoadAsync(this.SoarWingConfig.网格体.ToAssetPathName(), UE.SkeletalMesh, i => {
      this.SoarWing.SetSkeletalMesh(i, false);
      ResourceSystem_1.ResourceSystem.LoadAsync(this.SoarWingConfig.动画蓝图.ToAssetPathName(), UE.Class, t => {
        this.SoarWing.SetAnimClass(t);
        if (!this.SoarWing.GetAnimInstance()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Test", 6, "SetNewSoarWing Error!", ["Mesh", i?.GetName()], ["NewClass", t?.GetName()]);
          }
        }
      });
    }), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Weapon", 6, "加载翱翔翼", ["location", this.SoarWing?.D_K2_GetComponentLocation()?.ToString()], ["characterLocation", this.ActorComp?.ActorLocation?.ToString()]);
    }
  }
  HQr(t) {
    var i;
    var e = this.Paragliding.GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.ROOT, 0);
    if (e.GetScale3D().Z > 3 && (i = this.ActorComp?.Actor.Mesh?.GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME, 0), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("Test", 6, "1136590 Paragliding scale error.", ["Actor", this.ActorComp?.Actor.GetName()], ["BindSocket", i?.GetScale3D()], ["ParaglidingMesh", this.Paragliding.K2_GetComponentScale()], ["ParaglidingRoot", e.GetScale3D()]);
    }
    this.ParaglidingIsOpen = !t;
    TimerSystem_1.TimerSystem.Next(() => {
      this.Paragliding.SetHiddenInGame(!this.ParaglidingIsOpen);
    });
  }
  OpenParagliding(t) {
    var i;
    var e;
    this.ParaglidingIsOpen = t;
    if (this.Paragliding) {
      if (i = this.Paragliding.GetAnimInstance()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Weapon", 57, "打开滑翔伞", ["bOpen", t], ["location", this.Paragliding?.D_K2_GetComponentLocation()?.ToString()], ["characterLocation", this.ActorComp?.ActorLocation?.ToString()]);
        }
        if (e = this.y5r?.GetAkComponent()) {
          if (t) {
            AudioSystem_1.AudioSystem.PostEvent("play_role_com_paragliding_open", e);
          } else {
            AudioSystem_1.AudioSystem.PostEvent("play_role_com_paragliding_close", e);
          }
        }
        i.SetOpenParagliding(t);
        i.SyncAnimStates(undefined);
        this.HQr(!t);
        if (!t) {
          UE.KuroAnimLibrary.EndAnimNotifyStates(i);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Weapon", 57, "打开滑翔伞: 异步未加载完成返回");
      }
    }
  }
  SetNewParagliding(t) {
    const i = ModelUtil_1.ModelUtil.GetModelConfig(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(i.网格体.ToAssetPathName(), UE.SkeletalMesh, e => {
      this.Paragliding.SetSkeletalMesh(e, false);
      ResourceSystem_1.ResourceSystem.LoadAsync(i.动画蓝图.ToAssetPathName(), UE.Class, t => {
        this.Paragliding.SetAnimClass(t);
        if (this.ParaglidingIsOpen) {
          this.OpenParagliding(true);
        }
        var i = this.Paragliding.GetAnimInstance();
        if (i) {
          i.DebugDestructText = `Owner: ${this.ActorComp?.Owner?.GetName()}, Self: ${this.Paragliding?.GetName()} entityId: ${this.Entity.Id} pbDataId: ${this.ActorComp?.CreatureData.GetPbDataId()}`;
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Test", 6, i.DebugDestructText);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Test", 6, "SetNewParagliding Error!", ["Mesh", e?.GetName()], ["NewClass", t?.GetName()]);
        }
      });
    });
  }
  SyncParagliding(t, i = true) {
    this.HQr(!t.ParaglidingIsOpen);
    t.HQr(true);
    t = t.Paragliding.GetAnimInstance();
    if (i) {
      this.Paragliding.GetAnimInstance()?.SyncAnim(t);
    }
    t?.SyncAnim(undefined);
    UE.KuroAnimLibrary.EndAnimNotifyStates(t);
  }
  xQr() {
    if (this.Xjt) {
      this.HuluHideEffect = 0;
      this.cQr = undefined;
      this.jQr(this.TVd());
    }
  }
  jQr(i) {
    if (this.WKr !== i) {
      this.jWf = false;
      if (this.Hulu) {
        this.ActorComp.Actor.CharRenderingComponent.RemoveComponentByCase(6);
      } else {
        (t = this.ActorComp.Actor.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, CharacterNameDefines_1.CharacterNameDefines.HULU_MESH_COMP_NAME)).K2_AttachToComponent(this.ActorComp.Actor.Mesh, CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME, 0, 0, 0, true);
        t.SetAnimationMode(2);
        this.Hulu = t;
        this.MQr(0);
      }
      var t = ModelUtil_1.ModelUtil.GetModelConfig(i);
      if (t) {
        this.WKr = i;
        const e = CalabashMeshByMeshId_1.configCalabashMeshByMeshId.GetConfig(this.WKr);
        e?.OldEffects.forEach((t, i) => {
          i = e.NewEffects[i];
          this.ActorComp.ReplaceEffectMap.set(t, i);
        });
        this.jWf = !!e && e.HideParaglider > 0;
        ResourceSystem_1.ResourceSystem.LoadAsync(t.网格体.ToAssetPathName(), UE.SkeletalMesh, t => {
          if (t) {
            this.Hulu.SetSkeletalMesh(t);
            this.ActorComp.Actor.CharRenderingComponent.AddComponentByCase(6, this.Hulu);
            this.SetHuluHidden(false, true, true);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 57, "该葫芦Id没有配置网格体", ["Id", i]);
          }
        });
      } else {
        t = this.Entity.GetComponent(0);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 57, "该葫芦Id没有配置Config", ["Id", i], ["roleId", t?.GetRoleId()]);
        }
      }
    }
  }
  MQr(e) {
    if (e !== this.hQr) {
      let t = undefined;
      let i = FNameUtil_1.FNameUtil.EMPTY;
      switch (e) {
        case 0:
          i = CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME;
          t = this.ActorComp.Actor.Mesh;
          break;
        case 1:
          i = CharacterNameDefines_1.CharacterNameDefines.HULU_GLIDEING_SOCKET_NAME;
          t = this.Paragliding;
      }
      this.Hulu.K2_AttachToComponent(t, i, 0, 0, 0, true);
      this.hQr = e;
    }
  }
  GetHuluId() {
    return this.WKr;
  }
  SetHuluHidden(t, i = true, e = false) {
    let s = t;
    let h = i;
    if (this.Mba && this.hQr === 0) {
      s = true;
      h = false;
    }
    if (!e || this.Hulu.bHiddenInGame !== s) {
      if (h) {
        if (s) {
          if (this.cQr && this.cQr >= 0) {
            this.ActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.cQr);
            this.cQr = undefined;
          }
          this.Hulu.SetHiddenInGame(t);
        } else {
          if (this.cQr && this.cQr >= 0) {
            this.ActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.cQr);
            this.cQr = undefined;
          }
          this.Hulu.SetHiddenInGame(true);
          ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart", UE.PD_CharacterControllerData_C, t => {
            if (this.hQr !== 1) {
              this.cQr = this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerData(t);
              this.Hulu.SetHiddenInGame(false);
            }
          });
        }
      } else {
        if (this.cQr && this.cQr >= 0) {
          this.ActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.cQr);
          this.cQr = undefined;
        }
        this.Hulu.SetHiddenInGame(s);
      }
    }
  }
  OnEntityHuluSkinChangeNotify(t) {
    this.jQr(this.TVd(t));
  }
  TVd(t = 0) {
    let i = 0;
    var t = t === 0 ? this.Entity.GetComponent(0)?.HuluSkinId ?? 0 : t;
    return i = t > 0 ? ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(t).ModelId : (t = this.Entity.GetComponent(0), t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.GetRoleId()), CharacterUtils_1.CharacterUtils.GetHuluModelId(t.PartyId));
  }
  VQr() {
    this.AiWeaponConfigId = 0;
  }
  ClearWeaponForAi() {
    this._Pr = 0;
    this.QKr?.ChangeCharacterWeapons(0);
    this.AiItemMarkId = 0;
    this.UnRegisterCharacterDropWeaponEvent();
  }
  ChangeWeaponByWeaponByConfigId(t) {
    var i = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(t, this.Entity);
    if (i) {
      this.ChangeWeaponByWeaponSocketItem(i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "Ai改变武器失败,原因Config配置错误", ["Id", this.ActorComp.Actor.GetName()], ["Char", this.ActorComp.Actor.GetName()], ["Item config id", t]);
    }
  }
  ChangeWeaponByWeaponSocketItem(t) {
    this.OldWeaponHidden();
    this._Pr = 1;
    this.eQr = t;
    if (this.YKr) {
      TimerSystem_1.TimerSystem.Remove(this.YKr);
      this.YKr = undefined;
    }
    t = this.QKr.ChangeCharacterWeapons(this.eQr.Meshes.Num());
    this.ActorComp.Actor.CharRenderingComponent.Init(this.ActorComp.Actor.RenderType);
    let i = 0;
    for (const s of t) {
      var e = this.eQr.Meshes.Get(i);
      const h = s.Mesh;
      const o = this.eQr.WeaponEffectPath.AssetPathName?.toString();
      const a = e.AnimInstanceSoftPtr.ToAssetPathName();
      if (h instanceof UE.SkeletalMeshComponent) {
        ResourceSystem_1.ResourceSystem.LoadAsync(e.MeshSoftPtr.ToAssetPathName(), UE.SkeletalMesh, t => {
          h.SetSkeletalMesh(t);
          if (a && a !== "") {
            ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.Class, t => {
              h.SetAnimClass(t);
            });
          }
          if (o) {
            ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.PD_CharacterControllerData_C, t => {
              s.BattleEffectId = this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerData(t);
            });
          }
        });
      }
      s.WeaponHidden = false;
      s.BattleEffectId = undefined;
      s.BattleSocket = e.SocketName;
      ++i;
    }
    this.WeaponOutInternal(0, "ChangeWeaponByWeaponSocketItem");
    this.eQr = undefined;
    this.tQr = undefined;
    if (this.tQr && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "Ai改变武器失败,Config没有被清理", ["Id", this.tQr]);
    }
  }
  EquipWeaponForRole() {
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("Lys")?.Lys;
    return !!t && this.EquipWeaponForRoleByWeaponComponent(t);
  }
  EquipWeaponForRoleByWeaponComponent(t) {
    var i;
    if (this.WeaponEquipInfo.SetData(t)) {
      return !!(i = this.WeaponEquipInfo.WeaponConfig) && (this.Jsh = noHideEffectWeaponIds.has(t.zys), this.gQr = i.HiddenTime > 0, this.CQr = i.HiddenTime, this.C_l(this.g_l()));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "[武器组件]获取武器配置失败 pb", ["Character", this.ActorComp?.Actor.GetName()], ["ConfigId", this.ActorComp?.CreatureData.GetRoleId()], ["weaponId", t.zys ?? undefined], ["WeaponBreachLevel", t.fTs ?? undefined]);
      }
      return false;
    }
  }
  g_l() {
    let t = [];
    var i = this.ActorComp.CreatureData.GetWeaponSkinId();
    t = (i > 0 ? ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i) : this.WeaponEquipInfo.WeaponConfig).Models;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 4, "初始化武器皮肤", ["weaponSkinId", i], ["modelIds", t]);
    }
    return t;
  }
  C_l(r) {
    if (r.length !== this.QKr.CharacterWeapons.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "角色配置武器失败 蓝图武器component数量与配置数量不配置", ["Id", this.tQr], ["ModelIds", r]);
      }
      return false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 4, "开始设置武器模型", ["modelIds", r]);
    }
    let n = 1;
    for (let t = 0; t < this.iQr; ++t) {
      this.ActorComp.Actor.CharRenderingComponent.RemoveComponentByCase(n);
      n += 1;
    }
    let t = 0;
    this.Jsh = false;
    if (this.rc_.size > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 4, "设置武器模型过期，丢弃此次");
      }
      this.rc_.forEach(t => {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
      });
      this.rc_.clear();
    }
    for (const _ of r) {
      this.Jsh = this.Jsh || noHideEffectWeaponIds.has(_);
      const f = this.QKr.CharacterWeapons[t].Mesh;
      if (f instanceof UE.SkeletalMeshComponent) {
        const n = 1 + t;
        const c = ModelUtil_1.ModelUtil.GetModelConfig(_);
        var i;
        if (c) {
          i = ResourceSystem_1.ResourceSystem.LoadAsync(c.网格体.ToAssetPathName(), UE.SkeletalMesh, t => {
            if (t) {
              var i = f.GetNumMaterials();
              for (let t = 0; t < i; ++t) {
                f.SetMaterial(t, undefined);
              }
              var e = t.Materials;
              var s = e.Num();
              f.SetAnimClass(undefined);
              f.SetSkeletalMesh(t);
              for (let t = 0; t < s; ++t) {
                f.SetMaterial(t, e.Get(t).MaterialInterface);
              }
              t = c.动画蓝图.ToAssetPathName();
              if (t && t !== "") {
                ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
                  if (t) {
                    f.SetAnimClass(t);
                  }
                });
              }
              this.ActorComp.Actor.CharRenderingComponent.AddComponentByCase(n, f);
              const h = c.DA.AssetPathName?.toString();
              if (h && h !== "") {
                const o = f.SkeletalMesh;
                const a = ControllerHolder_1.ControllerHolder.WeaponController;
                Promise.all([a.LoadCharacterRenderingFunctionLibraryAsync(), a.LoadWeaponLevelMaterialDataAsync(h)]).then(([, t]) => {
                  if (t && f.SkeletalMesh === o && (a.ApplyWeaponLevelMaterial(f, t, this.WeaponEquipInfo.WeaponBreachLevel), Log_1.Log.CheckDebug())) {
                    Log_1.Log.Debug("Character", 25, "设置武器换色", ["materialData", h], ["level", this.WeaponEquipInfo.WeaponBreachLevel]);
                  }
                });
              }
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Character", 4, "设置武器模型完成", ["modelId", _], ["weaponCount", r.length]);
              }
              EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharacterWeaponLoaded, f.GetName());
            }
          });
          this.rc_.add(i);
          ++t;
        }
      }
    }
    this.iQr = t;
    if (this.ActorComp.CreatureData.GetWeaponSkinId() > 0) {
      this.Lie?.AddTag(skinTag);
    } else {
      this.Lie?.RemoveTag(skinTag);
    }
    return true;
  }
  OnEquipWeaponForRoleNotify(t) {
    this.EquipWeaponForRoleByWeaponComponent(t.Lys);
    ConcomitantWeaponHelper_1.ConcomitantWeaponHelper.SyncWeaponToConcomitants(this.Entity);
  }
  OnEntityEquipSkinChangeNotify(t) {
    var t = t.lI_.yI_;
    this.ActorComp.CreatureData.SetWeaponSkinId(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 4, "服务器下发武器皮肤", ["weaponSkinId", t]);
    }
    if (t === 0) {
      this.C_l(this.WeaponEquipInfo.WeaponConfig.Models);
    } else {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(t).Models;
      this.C_l(t);
    }
    ConcomitantWeaponHelper_1.ConcomitantWeaponHelper.SyncWeaponToConcomitants(this.Entity);
  }
  CheckAndHangWeapons(t) {
    if (this._Pr === 0) {
      if (this.Lie.HasTag(-1348147833)) {
        this.WeaponOut(0, "武器切换到手");
      }
    } else if ((!this.oRe?.Valid || !!(this.oRe.BattleIdleEndTime <= 0)) && !this.Lie.HasTag(-1348147833) && (!this.oRe.Valid || !this.oRe.MainAnimInstance || !!(this.oRe.MainAnimInstance.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.KEEP_WEAPON_OUT_NAME, 0) < KEEP_WEAPON_OUT_THREADHOLD))) {
      this.WeaponIn(t, 0, "CheckAndHangWeapons");
    }
  }
  HideWeaponsWhenHideBones(i, e) {
    if (this.ActorComp) {
      var s = CharacterNameDefines_1.CharacterNameDefines.ROOT;
      for (const h of this.QKr.CharacterWeapons) {
        let t = h.Mesh.GetAttachSocketName();
        if (!FNameUtil_1.FNameUtil.IsEmpty(t)) {
          while (!s.op_Equality(t) && !e.op_Equality(t)) {
            t = this.ActorComp.Actor.Mesh.GetParentBone(t);
          }
          if (t.op_Equality(e)) {
            h.Mesh.SetHiddenInGame(i);
          }
        }
      }
    }
  }
  qQr(t) {
    if (!(this.$Kr >= this.XKr) && this.ActorComp) {
      this.$Kr += t;
      var i = Math.min(this.$Kr / this.XKr, 1);
      for (const e of this.QKr.CharacterWeapons) {
        UE.KismetMathLibrary.D_TLerp(e.LerpStartTransform, e.LerpEndTransform, i).SetScale3D(this.mQr.ToUeVector());
        e.Mesh.D_K2_SetRelativeTransform(UE.KismetMathLibrary.D_TLerp(e.LerpStartTransform, e.LerpEndTransform, i), false, undefined, false);
      }
    }
  }
  WeaponInInternal(t, i = 0, e) {
    this._Pr = 0;
    if (this.ActorComp) {
      if (this.YKr) {
        TimerSystem_1.TimerSystem.Remove(this.YKr);
        this.YKr = undefined;
      }
      if (this.JKr) {
        TimerSystem_1.TimerSystem.Remove(this.JKr);
        this.JKr = undefined;
      }
      if (this.gQr) {
        this.JKr = TimerSystem_1.TimerSystem.Delay(() => {
          this.HideWeapon(-1, true, true, false, 0, "WeaponInInternal-DelayHide");
          this.JKr = undefined;
        }, this.CQr * HIDE_WEAPON_AFTER_WEAPON_IN_DELAY);
        this.XKr = i;
        if ((this.$Kr = 0) < i || !t) {
          for (const s of this.QKr.CharacterWeapons) {
            this.W7o(s, s.NormalSocket, this.dQr, i > 0);
            this.bQr(s, false, true, true, 0, "WeaponInInternal-NoEffect");
          }
        } else {
          for (const h of this.QKr.CharacterWeapons) {
            h.BattleEffectId = this.ActorComp.Actor.CharRenderingComponent.AddMaterialControllerData(this.ActorComp.Actor.WeaponInEffect);
            if (!h.WeaponHidden) {
              this.bQr(h, true, true, true, 0, "WeaponInInternal-WithEffect");
            }
          }
          this.YKr = TimerSystem_1.TimerSystem.Delay(() => {
            this.YKr = undefined;
            for (const t of this.QKr.CharacterWeapons) {
              this.W7o(t, t.NormalSocket, this.dQr, i > 0);
              this.bQr(t, false, true, true, 0, "WeaponInInternal-DelayedShow");
            }
          }, WEAPON_IN_DELAY);
        }
      } else {
        for (const o of this.QKr.CharacterWeapons) {
          this.W7o(o, o.NormalSocket, this.dQr, i > 0);
          this.bQr(o, true, true, true, 0, "WeaponInInternal-NoShow");
        }
      }
    }
  }
  WeaponIn(t, i = 0, e = "") {
    if (this._Pr !== 0) {
      this.WeaponInInternal(t, i, e);
    }
  }
  OldWeaponHidden() {
    if (this.ActorComp) {
      if (this.YKr) {
        TimerSystem_1.TimerSystem.Remove(this.YKr);
        this.YKr = undefined;
      }
      for (const t of this.QKr.CharacterWeapons) {
        this.bQr(t, true, true, true, 0, "OldWeaponHidden");
      }
    }
  }
  WeaponOutInternal(t = 0, i) {
    this._Pr = 1;
    if (this.ActorComp) {
      if (this.YKr) {
        TimerSystem_1.TimerSystem.Remove(this.YKr);
        this.YKr = undefined;
      }
      if (this.JKr) {
        TimerSystem_1.TimerSystem.Remove(this.JKr);
        this.JKr = undefined;
      }
      if ((this.XKr = t) > 0) {
        this.$Kr = 0;
      }
      for (const e of this.QKr.CharacterWeapons) {
        this.W7o(e, e.BattleSocket, this.dQr, t > 0);
        this.bQr(e, false, true, true, 0, "WeaponOutInternal");
        if (e.BattleEffectId) {
          this.ActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(e.BattleEffectId);
          e.BattleEffectId = 0;
        }
      }
    }
  }
  WeaponOut(t = 0, i = "") {
    if (this._Pr !== 1) {
      this.WeaponOutInternal(t, i);
    }
  }
  W7o(t, i, e, s) {
    var h = this.ActorComp.Actor.Mesh.D_GetSocketTransform(i, 0);
    e.SetScale3D(this.mQr.ToUeVector());
    if (s) {
      t.LerpStartTransform = UE.KismetMathLibrary.D_ComposeTransforms(t.Mesh.D_K2_GetComponentToWorld(), h.Inverse());
      t.LerpStartTransform.SetScale3D(this.mQr.ToUeVector());
      t.LerpEndTransform = e;
    }
    t.Mesh.K2_AttachToComponent(this.ActorComp.Actor.Mesh, i, 0, 0, 0, true);
    if (s) {
      t.Mesh.D_K2_SetRelativeTransform(t.LerpStartTransform, false, undefined, true);
    } else {
      t.Mesh.D_K2_SetRelativeTransform(e, false, undefined, true);
    }
  }
  ChangeWeaponHangState(t, i, e, s, h) {
    if (this._Pr !== t) {
      switch (t) {
        case 0:
          this.WeaponIn(false, s, h);
          break;
        case 1:
          this.WeaponOut(s, h);
          break;
        default:
          this._Pr = t;
          if (this.YKr) {
            TimerSystem_1.TimerSystem.Remove(this.YKr);
            this.YKr = undefined;
          }
          if (this.JKr) {
            TimerSystem_1.TimerSystem.Remove(this.JKr);
            this.JKr = undefined;
          }
          if (i.Num() !== this.QKr.CharacterWeapons.length || e.Num() !== this.QKr.CharacterWeapons.length) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 6, "切换武器挂载需要与本身武器部件数量一样的输入数据", ["Char", this.ActorComp.Actor.GetName()]);
            }
            return false;
          }
          if ((this.XKr = s) > 0) {
            this.$Kr = 0;
          }
          {
            let t = 0;
            for (const a of this.QKr.CharacterWeapons) {
              var o = UE.KismetMathLibrary.Conv_TransformToTransformDouble(e.Get(t));
              this.W7o(a, i.Get(t), o, s > 0);
              this.bQr(a, false, true, true, 0, "ChangeWeaponHangState");
              if (a.BattleEffectId) {
                this.ActorComp.Actor.CharRenderingComponent.RemoveMaterialControllerData(a.BattleEffectId);
                a.BattleEffectId = 0;
              }
              ++t;
            }
          }
      }
    }
    return true;
  }
  HideWeapon(t, i, e, s = false, h = 0, o) {
    this.ZKr.push(new HideWeaponOrder(t, i, e, s, h));
  }
  vQr() {
    for (const t of this.ZKr) {
      t.WithEffect = false;
    }
  }
  GQr() {
    if (this.QKr?.CharacterWeapons) {
      var t = this.ActorComp?.Actor.bHidden || !this.Active;
      for (const i of this.QKr.CharacterWeapons) {
        i.SetBuffEffectsHiddenInGame(t || i.WeaponHidden);
      }
    }
  }
  bQr(t, i, e = true, s = true, h = 0, o) {
    s = this._Pr === 0 && this.DQr.size > 0 || t.VisibleHelper.RequestAndUpdateHiddenInGame(i, s, h);
    if (s === t.WeaponHidden) {
      return false;
    }
    if (i && s) {
      t.ReleaseHideEffect();
    }
    t.Mesh.SetHiddenInGame(s, true);
    if (s && t.Mesh instanceof UE.SkeletalMeshComponent) {
      h = t.Mesh.GetAnimInstance();
      UE.KuroAnimLibrary.EndAnimNotifyStates(h);
    }
    h = t.WeaponHidden;
    t.WeaponHidden = s;
    if (i && s && e && !h && !this.Jsh) {
      t.ShowHideEffect(this.ActorComp?.GetReplaceEffect(CharacterWeaponMesh_1.WEAPON_HIDDEN_EFFECT));
    }
    t.SetBuffEffectsHiddenInGame(i && s);
    this.Nqc(t);
    return true;
  }
  RegisterCharacterDropWeaponEvent(t) {
    this.AiWeaponConfigId = t;
    this.CacheAiSocketItem = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(t, this.Entity);
    this.WQr(this.CacheAiSocketItem.Tag);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.UQr);
  }
  UnRegisterCharacterDropWeaponEvent() {
    if (this.AiWeaponConfigId && this.AiWeaponConfigId !== 0) {
      this.CacheAiSocketItem = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(this.AiWeaponConfigId, this.Entity);
      this.KQr(this.CacheAiSocketItem.Tag);
      this.AiWeaponConfigId = 0;
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.UQr);
    }
  }
  ReceiveCharacterKnockUpDropWeapon() {
    ModelManager_1.ModelManager.AiWeaponModel.Net.SendDiscardWeaponPush(this);
  }
  AQr() {
    if (this.AiWeaponConfigId !== 0) {
      ModelManager_1.ModelManager.AiWeaponModel.Net.SendDiscardWeaponPush(this);
    }
  }
  WQr(t) {
    t = t?.TagId;
    if (!this.Lie) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "怪物添加Tag 的TagComponent组件为初始化完成，请检查MonsterEntity的组件start顺序");
      }
    }
    if (t && !this.Lie.HasTag(t)) {
      this.Lie.AddTag(t);
    }
  }
  KQr(t) {
    if (this.Lie.Active) {
      this.Lie.RemoveTag(t?.TagId);
    }
  }
  get HasWeapon() {
    return this._Pr === 1;
  }
  ResetWeaponTag() {
    this.CacheAiSocketItem = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(this.AiWeaponConfigId, this.Entity);
    if (this.CacheAiSocketItem) {
      this.WQr(this.CacheAiSocketItem.Tag);
    }
  }
  GetWeaponBreachLevel() {
    if (this.WeaponEquipInfo) {
      return this.WeaponEquipInfo.WeaponBreachLevel;
    } else {
      return -1;
    }
  }
  InitWeaponVisibleData() {
    var i = ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfig(this.Entity);
    if (i) {
      let t = 0;
      for (const e of this.QKr.CharacterWeapons) {
        e.VisibleHelper.InitBaseTable(t < i.BaseType.length ? i.BaseType[t] : 0);
        e.VisibleHelper.InitTagHelper(this.Lie, t < i.BaseType.length ? i.VisibleTags[t] : "", this.fQr, t < i.BaseType.length ? i.HiddenTags[t] : "", this.pQr);
        t++;
      }
    }
  }
  gYs() {
    var t = this.ActorComp.CreatureData;
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t.GetRoleId());
    var t = ConfigManager_1.ConfigManager.WeaponComponentConfig.GetHideWeaponTags(t);
    this.aQr = [];
    t.forEach(t => {
      t = this.Lie.ListenForTagAddOrRemove(t, this.RQr);
      if (t) {
        this.aQr.push(t);
      }
    });
  }
  Sba() {
    var t;
    if (this.Xjt) {
      t = this.ActorComp.CreatureData;
      this.Mba = t.GetModelConfig().隐藏葫芦;
      if (!this.Mba) {
        t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.GetRoleId());
        this.Mba = t?.HideHuLu ?? false;
      }
    }
  }
  InitDebugWeaponVisibleDataById(t) {
    var i = ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfigById(t);
    let e = 0;
    for (const s of this.QKr.CharacterWeapons) {
      s.VisibleHelper.InitBaseTable(e < i.BaseType.length ? i.BaseType[e] : 0);
      s.VisibleHelper.InitTagHelper(this.Lie, e < i.BaseType.length ? i.VisibleTags[e] : "", this.fQr, e < i.BaseType.length ? i.HiddenTags[e] : "", this.pQr);
      e++;
    }
    this.HideWeapon(-1, true, false, false, 0, "InitWeaponVisibleData");
    this.JKr = undefined;
  }
  ClearWeaponVisibleData() {
    if (this.QKr?.CharacterWeapons) {
      for (const t of this.QKr.CharacterWeapons) {
        t.VisibleHelper.ClearTagHelper();
      }
    }
  }
  SetWeaponVisibleByTag(t, i, e) {
    if (i) {
      this.HideWeapon(t.Index, !e, true, false, 2, "SetWeaponVisibleByTag-TagExist");
    } else {
      this.HideWeapon(t.Index, e, true, false, 2, "SetWeaponVisibleByTag-TagNotExist");
    }
  }
  GetCurrentWeaponEquipDebugInfo() {
    let t = "";
    t += `[武器组件]{ weaponId: ${this.WeaponEquipInfo.WeaponId}, 'WeaponBreachLevel:' ${this.WeaponEquipInfo.WeaponBreachLevel}, models:${this.WeaponEquipInfo.WeaponConfig.Models}  }
`;
    for (const e of this.QKr.CharacterWeapons) {
      var i = e.Mesh;
      t += `[武器组件]{ weaponMesh: ${i.SkeletalMesh.GetName()}, AnimInstance: ${i.GetAnimInstance().GetName()},         BattleSocket: ${e.BattleSocket},NormalSocket: ${e.NormalSocket} }
`;
    }
    return t;
  }
  GetWeaponMesh() {
    return this.QKr;
  }
  IsCurrentWeaponHideEffectPlaying() {
    return !!EffectSystem_1.EffectSystem.IsValid(this.QKr?.CharacterWeapons[0]?.WeaponHideEffect ?? 0) && EffectSystem_1.EffectSystem.IsPlaying(this.QKr?.CharacterWeapons[0]?.WeaponHideEffect ?? 0);
  }
  NQr() {
    if (this.zKr && this.QKr?.CharacterWeapons) {
      for (const t of this.QKr.CharacterWeapons) {
        if (!t.WeaponHidden && EffectSystem_1.EffectSystem.IsValid(t.WeaponHideEffect) && EffectSystem_1.EffectSystem.IsPlaying(t.WeaponHideEffect)) {
          if (!this.Lie.HasTag(577301498)) {
            this.Lie.AddTag(577301498);
          }
        } else if (this.Lie.HasTag(577301498)) {
          this.Lie.RemoveTag(577301498);
        }
      }
    }
  }
  W7c() {
    return this.I5r?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar && this.Entity.GetComponent(64)?.CurrentSoarType !== 1;
  }
  UT1() {
    var t;
    if (this.ActorComp?.IsAutonomousProxy && (t = this.WeaponEquipInfo?.WeaponConfig?.WeaponType)) {
      this.QKr?.CharacterWeapons[0].InitWeaponSceneInteract(t);
      if (t === 3 || t === 4) {
        this.QKr?.CharacterWeapons[1].InitWeaponSceneInteract(t + 100);
      }
    }
  }
  Nqc(t) {
    if (!!t && !(t.SceneInteractWeaponType <= 0)) {
      t.UpdateSceneInteractEnable(this._Pr !== 0);
    }
  }
};
CharacterWeaponComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(86)], CharacterWeaponComponent);
exports.CharacterWeaponComponent = CharacterWeaponComponent; //# sourceMappingURL=CharacterWeaponComponent.js.map