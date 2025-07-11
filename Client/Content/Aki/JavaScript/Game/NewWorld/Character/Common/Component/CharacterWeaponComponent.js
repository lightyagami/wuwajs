"use strict";

var __decorate = this && this.__decorate || function (t, i, s, e) {
  var h;
  var o = arguments.length;
  var a = o < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, s, e);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        a = (o < 3 ? h(a) : o > 3 ? h(i, s, a) : h(i, s)) || a;
      }
    }
  }
  if (o > 3 && a) {
    Object.defineProperty(i, s, a);
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
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WeaponController_1 = require("../../../../Module/Weapon/WeaponController");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CharacterWeaponMesh_1 = require("./Weapon/CharacterWeaponMesh");
const KEEP_WEAPON_OUT_THREADHOLD = 0.1;
const WEAPON_IN_DELAY = 100;
const HIDE_WEAPON_AFTER_WEAPON_IN_DELAY = 1000;
const glideRelativeRotator = new UE.Rotator(0, 90, -90);
const HULU_BASE_ID = 20000000;
const HULU_PARTY_ID = 100000;
const noHideEffectWeaponIds = new Set([21040063, 21050063]);
const skinTag = -403067358;
class HideWeaponOrder {
  constructor(t, i, s, e = true, h = 0) {
    this.Index = 0;
    this.Hide = false;
    this.WithEffect = false;
    this.NormaState = true;
    this.ExtraType = 0;
    this.Index = t;
    this.Hide = i;
    this.WithEffect = s;
    this.NormaState = e;
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
    this.Hte = undefined;
    this.oRe = undefined;
    this.Lie = undefined;
    this.y5r = undefined;
    this.I5r = undefined;
    this.Hulu = undefined;
    this.WKr = 0;
    this.Mba = false;
    this.HuluHideEffect = 0;
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
    this.Hbu = () => {
      for (const t of this.QKr.CharacterWeapons) {
        t.UpdateHideEffectStateInSelfCentered();
      }
    };
    this.I3r = (t, i) => {
      var s;
      if (t?.Valid) {
        s = t.GetComponent(81);
        this.vQr();
        this.CheckAndHangWeapons(false);
        (i ? (this.MQr(0), this) : (this.MQr(0), this.SyncParagliding(s), (i = t.GetComponent(205)).HasTag(this.oQr) && !this.Lie.HasTag(this.oQr) && (i.RemoveTag(this.oQr), this.Lie.AddTag(this.oQr)), s)).OpenParagliding(false);
        if (this.SoarWing && s.SoarWing) {
          this.$gl();
          this.SoarWing.GetAnimInstance()?.SyncAnimStates(s.SoarWing.GetAnimInstance());
        }
      } else {
        this.OpenParagliding(false);
      }
    };
    this.EQr = (t, i) => {
      if (!!i && !this.ParaglidingIsOpen && this.Entity.GetComponent(175).MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Glide) {
        this.OpenParagliding(true);
      }
    };
    this.SQr = (t, i) => {
      if (!i && this.ParaglidingIsOpen) {
        i = EffectSystem_1.EffectSystem.SpawnEffect(this.Hte.Actor, this.Hte.Actor.Mesh.D_GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME, 1), "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Huaxiang_End.DA_Fx_Group_Huaxiang_End", "[CharacterWeaponComponent.OnGlidingChanged]", new EffectContext_1.EffectContext(this.Entity.Id));
        if (EffectSystem_1.EffectSystem.IsValid(i) && (i = EffectSystem_1.EffectSystem.GetEffectActor(i)) && i.IsValid()) {
          i.K2_AttachToComponent(this.Paragliding, FNameUtil_1.FNameUtil.EMPTY, 0, 0, 0, false);
        }
        this.OpenParagliding(false);
        this.Lie.RemoveTag(this.oQr);
      }
    };
    this.yQr = (t, i) => {
      this.ParaglidingIsHover = i;
      var s = this.Paragliding.GetAnimInstance();
      if (s) {
        s.SetHover(i);
      }
    };
    this.P3r = (t, i) => {
      if (t === CharacterUnifiedStateTypes_1.ECharMoveState.Soar || i === CharacterUnifiedStateTypes_1.ECharMoveState.Soar) {
        this.$gl();
      }
      if (this.Hte.IsMoveAutonomousProxy && !this.Xjt && this.AiWeaponConfigId && i === CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp && t !== i) {
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
          this.HuluHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(this.Hte.Actor, this.Hte.Actor.Mesh.D_GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.HULU_EFFECT_SOCKET_NAME, 1), i.DA.AssetPathName?.toString(), "[CharacterWeaponComponent.OnHuluHandEffectShowChanged]", new EffectContext_1.EffectContext(this.Entity.Id));
          if (EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) && (i = EffectSystem_1.EffectSystem.GetEffectActor(this.HuluHideEffect)) && i.IsValid()) {
            i.K2_AttachToComponent(this.Hte.Actor.Mesh, CharacterNameDefines_1.CharacterNameDefines.HULU_EFFECT_SOCKET_NAME, 2, 2, 2, false);
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
        this.SetHuluHidden(false, false);
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
    this.Pmu = undefined;
    this.$gl = () => {
      this.Pmu = TimerSystem_1.TimerSystem.Next(() => {
        this.SoarWing?.SetHiddenInGame(!this.QSu());
        this.Pmu = undefined;
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
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.oRe = this.Entity.GetComponent(177);
    this.Lie = this.Entity.GetComponent(205);
    this.y5r = this.Entity.GetComponent(51);
    this.I5r = this.Entity.GetComponent(175);
    this.Xjt = this.Hte.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player;
    this.zKr = this.Xjt || this.Hte.CreatureData.GetBaseInfo()?.Category.MonsterMatchType === 4;
    this.iQr = 0;
    this.AiItemMarkId = 0;
    if (!this.Hte) {
      return false;
    }
    this.Sba();
    this.PQr();
    this.xQr();
    var t = this.Hte.CreatureData.GetParaglidingSkinId();
    if (t > 0) {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(t);
      this.wQr(t.ModelId);
    } else {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(1);
      this.wQr(t);
    }
    var t = this.Hte.CreatureData.GetSoarWingSkinId();
    if (t > 0) {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(t);
      this.Xgl(t.ModelId);
    } else {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(0);
      this.Xgl(t);
    }
    if (this.Xjt) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.SoarTypeChange, this.$gl);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationAdd, this.Hbu);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationRemove, this.Hbu);
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
      for (const i of this.QKr.CharacterWeapons) {
        this.bQr(i, true, false);
      }
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.P3r);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharChangeMeshAnim, this.L3r);
    }
    return true;
  }
  OnEntitySoarWingOrParaglidingSkinChangeNotify(t) {
    for (const s of t.cGc) {
      let t = 0;
      t = s.Z7n > 0 ? ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(s.Z7n).ModelId : ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(s._Gc);
      var i = this.Entity.GetComponent(0);
      if (s._Gc === 1) {
        i?.SetParaglidingSkinId(s.Z7n);
        this.wQr(t);
      } else if (s._Gc === 0) {
        i?.SetSoarWingSkinId(s.Z7n);
        this.Xgl(t);
      }
    }
  }
  OnEnd() {
    if (this.Xjt) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.SoarTypeChange, this.$gl);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationAdd, this.Hbu);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationRemove, this.Hbu);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.P3r);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharChangeMeshAnim, this.L3r);
    }
    return true;
  }
  OnTick(t) {
    if (this.zKr) {
      this.CheckAndHangWeapons(true);
    }
    for (const s of this.ZKr) {
      var i;
      if (s.Index < 0) {
        for (const e of this.QKr.CharacterWeapons) {
          if (!s.NormaState) {
            e.VisibleHelper.EnableHiddenInGameByExtraVisibleType(s.ExtraType, true);
          }
          this.bQr(e, s.Hide, s.WithEffect, s.NormaState, s.ExtraType);
        }
      } else if (s.Index < this.QKr.CharacterWeapons.length) {
        i = this.QKr.CharacterWeapons[s.Index];
        if (!s.NormaState) {
          i.VisibleHelper.EnableHiddenInGameByExtraVisibleType(s.ExtraType, true);
        }
        this.bQr(i, s.Hide, s.WithEffect, s.NormaState, s.ExtraType);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 6, "隐藏武器选择了错误的武器序号", ["index", s.Index], ["BP", this.Hte.Actor.GetName()]);
      }
    }
    if ((this.ZKr.length = 0) === this._Pr && this.DQr.size > 0) {
      for (const h of this.QKr.CharacterWeapons) {
        this.bQr(h, true, true);
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
    if (this.Pmu) {
      TimerSystem_1.TimerSystem.Remove(this.Pmu);
      this.Pmu = undefined;
    }
    if (this.Xjt) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
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
        Log_1.Log.Debug("Role", 6, "Paragliding OnClear", ["DebugDesturctText", t.DebugDestructText]);
      }
      t.DebugDestructText = "";
    }
    return true;
  }
  BQr() {
    if (this.Lie.HasTag(this.oQr)) {
      this.OpenParagliding(true);
    }
  }
  PQr() {
    this.QKr = new CharacterWeaponMesh_1.CharacterWeaponMesh();
    var t;
    var i = this.Hte.Actor.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
    var s = new Array();
    for (let t = 0; t < i.Num(); ++t) {
      var e = i.Get(t);
      if (e instanceof UE.SkeletalMeshComponent && e.GetName().startsWith("WeaponCase")) {
        s.push(e);
        e.bAbsoluteScale = false;
      }
    }
    if (this.Xjt) {
      t = this.Entity.GetComponent(0).GetRoleConfig().WeaponScale;
      this.mQr.Set(t[0], t[1], t[2]);
      this.dQr.SetScale3D(this.mQr.ToUeVector());
    } else {
      this.mQr.Set(1, 1, 1);
    }
    this.QKr.Init(s, this.Hte.Actor.Mesh, this.Hte.Actor, false);
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
    if (!this.Xjt) {
      this.FQr();
    }
  }
  OQr() {
    var t = this.Entity.GetComponent(0).GetModelConfig();
    var i = t.NormalSockets;
    var s = t.BattleSockets;
    if (i.Num() !== s.Num() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "角色设置武器失败,两种类型槽位数量不统一", ["Id", this.Hte.Actor.GetName()], ["ModelId", t.ID]);
    }
    if (i.Num() > this.QKr.CharacterWeapons.length || s.Num() > this.QKr.CharacterWeapons.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "角色设置武器失败,角色蓝图武器组件少于武器数量配置", ["Id", this.Hte.Actor.GetName()], ["ModelId", t.ID]);
      }
      this.QKr.ChangeCharacterWeapons(i.Num());
    }
    let e = 0;
    for (const h of this.QKr.CharacterWeapons) {
      h.NormalSocket = FNameUtil_1.FNameUtil.GetDynamicFName(i.Get(e));
      h.BattleSocket = FNameUtil_1.FNameUtil.GetDynamicFName(s.Get(e));
      ++e;
    }
  }
  kQr() {
    this._Pr = 0;
    for (const t of this.QKr.CharacterWeapons) {
      this.W7o(t, t.NormalSocket, this.dQr, false);
    }
    this.HideWeapon(-1, true, false);
    this.JKr = undefined;
  }
  FQr() {
    this.VQr();
    var t = this.Hte.CreatureData?.ComponentDataMap.get("fys");
    if (t) {
      if (t = t.fys?.zys) {
        this.RegisterCharacterDropWeaponEvent(t);
        this.ChangeWeaponByWeaponByConfigId(t);
      } else {
        this._Pr = -1;
        this.WeaponIn(false);
      }
    }
  }
  wQr(t) {
    var i;
    if (this.Xjt && (this.Paragliding || ((i = this.Hte.Actor.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, CharacterNameDefines_1.CharacterNameDefines.PARAGLIDING_MESH_COMP_NAME)).K2_AttachToComponent(this.Hte.Actor.Mesh, CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME, 0, 0, 0, true), this.Paragliding = i, this.Hte.Actor.CharRenderingComponent.AddComponentByCase(7, this.Paragliding)), this.SetNewParagliding(t), this.Paragliding.D_K2_SetRelativeLocation(Vector_1.Vector.ZeroVectorProxy.ToUeVector(), false, undefined, false), this.Paragliding.K2_SetRelativeRotation(glideRelativeRotator, false, undefined, false), this.Paragliding.D_SetWorldScale3D(Vector_1.Vector.OneVectorProxy.ToUeVector()), this.HQr(true), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Weapon", 57, "加载滑翔伞", ["location", this.Paragliding?.D_K2_GetComponentLocation()?.ToString()], ["characterLocation", this.Hte?.ActorLocation?.ToString()], ["modelConfigId", t]);
    }
  }
  Xgl(t) {
    var i;
    var s;
    if (this.Xjt && (i = SoarById_1.configSoarById.GetConfig(this.Hte.CreatureData.GetRoleConfig().RoleBody)) && (this.SoarWing || ((s = this.Hte.Actor.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, CharacterNameDefines_1.CharacterNameDefines.SOAR_WING_MESH_COMP_NAME)).K2_AttachToComponent(this.Hte.Actor.Mesh, new UE.FName(i.HangSocket), 0, 0, 0, true), this.SoarWing = s, this.Hte.Actor.CharRenderingComponent.AddComponentByCase(12, s)), this.SoarWing.K2_SetRelativeTransform(MathUtils_1.MathUtils.DefaultTransform, false, undefined, false), this.$gl(), this.SoarWingConfig = ModelUtil_1.ModelUtil.GetModelConfig(t), ResourceSystem_1.ResourceSystem.LoadAsync(this.SoarWingConfig.网格体.ToAssetPathName(), UE.SkeletalMesh, i => {
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
      Log_1.Log.Debug("Weapon", 6, "加载翱翔翼", ["location", this.SoarWing?.D_K2_GetComponentLocation()?.ToString()], ["characterLocation", this.Hte?.ActorLocation?.ToString()]);
    }
  }
  HQr(t) {
    this.ParaglidingIsOpen = !t;
    TimerSystem_1.TimerSystem.Next(() => {
      this.Paragliding.SetHiddenInGame(!this.ParaglidingIsOpen);
    });
  }
  OpenParagliding(t) {
    var i;
    var s;
    this.ParaglidingIsOpen = t;
    if (this.Paragliding) {
      if (i = this.Paragliding.GetAnimInstance()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Weapon", 57, "打开滑翔伞", ["bOpen", t], ["location", this.Paragliding?.D_K2_GetComponentLocation()?.ToString()], ["characterLocation", this.Hte?.ActorLocation?.ToString()]);
        }
        if (s = this.y5r?.GetAkComponent()) {
          if (t) {
            AudioSystem_1.AudioSystem.PostEvent("play_role_com_paragliding_open", s);
          } else {
            AudioSystem_1.AudioSystem.PostEvent("play_role_com_paragliding_close", s);
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
    ResourceSystem_1.ResourceSystem.LoadAsync(i.网格体.ToAssetPathName(), UE.SkeletalMesh, s => {
      this.Paragliding.SetSkeletalMesh(s, false);
      ResourceSystem_1.ResourceSystem.LoadAsync(i.动画蓝图.ToAssetPathName(), UE.Class, t => {
        this.Paragliding.SetAnimClass(t);
        if (this.ParaglidingIsOpen) {
          this.OpenParagliding(true);
        }
        var i = this.Paragliding.GetAnimInstance();
        if (i) {
          i.DebugDestructText = `Owner: ${this.Hte?.Owner?.GetName()}, Self: ${this.Paragliding?.GetName()} entityId: ${this.Entity.Id} pbDataId: ${this.Hte?.CreatureData.GetPbDataId()}`;
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Test", 6, i.DebugDestructText);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Test", 6, "SetNewParagliding Error!", ["Mesh", s?.GetName()], ["NewClass", t?.GetName()]);
        }
      });
    });
  }
  SyncParagliding(t) {
    this.HQr(!t.ParaglidingIsOpen);
    t.HQr(true);
    t = t.Paragliding.GetAnimInstance();
    this.Paragliding.GetAnimInstance()?.SyncAnim(t);
    t?.SyncAnim(undefined);
    UE.KuroAnimLibrary.EndAnimNotifyStates(t);
  }
  xQr() {
    var t;
    var i;
    if (this.Xjt) {
      this.HuluHideEffect = 0;
      this.cQr = undefined;
      t = this.Entity.GetComponent(0);
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.GetRoleId());
      this.jQr(i.PartyId, 1, t.GetRoleId());
    }
  }
  jQr(t, i, s) {
    if (this.Hulu) {
      this.Hte.Actor.CharRenderingComponent.RemoveComponentByCase(6);
    } else {
      (h = this.Hte.Actor.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, CharacterNameDefines_1.CharacterNameDefines.HULU_MESH_COMP_NAME)).K2_AttachToComponent(this.Hte.Actor.Mesh, CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME, 0, 0, 0, true);
      this.Hulu = h;
      this.MQr(0);
    }
    const e = t * HULU_PARTY_ID + HULU_BASE_ID + i;
    var h = ModelUtil_1.ModelUtil.GetModelConfig(e);
    if (h) {
      ResourceSystem_1.ResourceSystem.LoadAsync(h.网格体.ToAssetPathName(), UE.SkeletalMesh, t => {
        if (t) {
          this.WKr = e;
          this.Hulu.SetSkeletalMesh(t);
          this.Hte.Actor.CharRenderingComponent.AddComponentByCase(6, this.Hulu);
          this.SetHuluHidden(false, true, true);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 57, "该葫芦Id没有配置网格体", ["Id", e]);
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "该葫芦Id没有配置Config", ["Id", e], ["partyId", t], ["quality", i], ["roleId", s]);
    }
  }
  MQr(s) {
    if (s !== this.hQr) {
      let t = undefined;
      let i = FNameUtil_1.FNameUtil.EMPTY;
      switch (s) {
        case 0:
          i = CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME;
          t = this.Hte.Actor.Mesh;
          break;
        case 1:
          i = CharacterNameDefines_1.CharacterNameDefines.HULU_GLIDEING_SOCKET_NAME;
          t = this.Paragliding;
      }
      this.Hulu.K2_AttachToComponent(t, i, 0, 0, 0, true);
      this.hQr = s;
    }
  }
  GetHuluId() {
    return this.WKr;
  }
  SetHuluHidden(t, i = true, s = false) {
    let e = t;
    let h = i;
    if (this.Mba && this.hQr === 0) {
      e = true;
      h = false;
    }
    if (!s || this.Hulu.bHiddenInGame !== e) {
      if (h) {
        if (e) {
          if (this.cQr && this.cQr >= 0) {
            this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.cQr);
            this.cQr = undefined;
          }
          this.Hulu.SetHiddenInGame(t);
        } else {
          if (this.cQr && this.cQr >= 0) {
            this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.cQr);
            this.cQr = undefined;
          }
          this.Hulu.SetHiddenInGame(true);
          ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart", UE.PD_CharacterControllerData_C, t => {
            if (this.hQr !== 1) {
              this.cQr = this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(t);
              this.Hulu.SetHiddenInGame(false);
            }
          });
        }
      } else {
        if (this.cQr && this.cQr >= 0) {
          this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.cQr);
          this.cQr = undefined;
        }
        this.Hulu.SetHiddenInGame(e);
      }
    }
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
      Log_1.Log.Error("Character", 57, "Ai改变武器失败,原因Config配置错误", ["Id", this.Hte.Actor.GetName()], ["Char", this.Hte.Actor.GetName()], ["Item config id", t]);
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
    this.Hte.Actor.CharRenderingComponent.Init(this.Hte.Actor.RenderType);
    let i = 0;
    for (const e of t) {
      var s = this.eQr.Meshes.Get(i);
      const h = e.Mesh;
      const o = this.eQr.WeaponEffectPath.AssetPathName?.toString();
      const a = s.AnimInstanceSoftPtr.ToAssetPathName();
      if (h instanceof UE.SkeletalMeshComponent) {
        ResourceSystem_1.ResourceSystem.LoadAsync(s.MeshSoftPtr.ToAssetPathName(), UE.SkeletalMesh, t => {
          h.SetSkeletalMesh(t);
          if (a && a !== "") {
            ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.Class, t => {
              h.SetAnimClass(t);
            });
          }
          if (o) {
            ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.PD_CharacterControllerData_C, t => {
              e.BattleEffectId = this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(t);
            });
          }
        });
      }
      e.WeaponHidden = false;
      e.BattleEffectId = undefined;
      e.BattleSocket = s.SocketName;
      ++i;
    }
    this.WeaponOutInternal(0);
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
        Log_1.Log.Error("Character", 6, "[武器组件]获取武器配置失败 pb", ["Character", this.Hte?.Actor.GetName()], ["ConfigId", this.Hte?.CreatureData.GetRoleId()], ["weaponId", t.zys ?? undefined], ["WeaponBreachLevel", t.fTs ?? undefined]);
      }
      return false;
    }
  }
  g_l() {
    let t = [];
    var i = this.Hte.CreatureData.GetWeaponSkinId();
    t = (i > 0 ? ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i) : this.WeaponEquipInfo.WeaponConfig).Models;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 4, "初始化武器皮肤", ["weaponSkinId", i], ["modelIds", t]);
    }
    return t;
  }
  C_l(a) {
    if (a.length !== this.QKr.CharacterWeapons.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "角色配置武器失败 蓝图武器component数量与配置数量不配置", ["Id", this.tQr], ["ModelIds", a]);
      }
      return false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 4, "开始设置武器模型", ["modelIds", a]);
    }
    let r = 1;
    for (let t = 0; t < this.iQr; ++t) {
      this.Hte.Actor.CharRenderingComponent.RemoveComponentByCase(r);
      r += 1;
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
    for (const n of a) {
      this.Jsh = this.Jsh || noHideEffectWeaponIds.has(n);
      const _ = this.QKr.CharacterWeapons[t].Mesh;
      if (_ instanceof UE.SkeletalMeshComponent) {
        const r = 1 + t;
        const f = ModelUtil_1.ModelUtil.GetModelConfig(n);
        var i;
        if (f) {
          i = ResourceSystem_1.ResourceSystem.LoadAsync(f.网格体.ToAssetPathName(), UE.SkeletalMesh, t => {
            if (t) {
              var i = _.GetNumMaterials();
              for (let t = 0; t < i; ++t) {
                _.SetMaterial(t, undefined);
              }
              var s = t.Materials;
              var e = s.Num();
              _.SetAnimClass(undefined);
              _.SetSkeletalMesh(t);
              for (let t = 0; t < e; ++t) {
                _.SetMaterial(t, s.Get(t).MaterialInterface);
              }
              t = f.动画蓝图.ToAssetPathName();
              if (t && t !== "") {
                ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
                  if (t) {
                    _.SetAnimClass(t);
                  }
                });
              }
              this.Hte.Actor.CharRenderingComponent.AddComponentByCase(r, _);
              const h = f.DA.AssetPathName?.toString();
              if (h && h !== "") {
                const o = _.SkeletalMesh;
                ResourceSystem_1.ResourceSystem.LoadAsync(h, UE.PD_WeaponLevelMaterialDatas_C, t => {
                  if (t && _.SkeletalMesh === o && (WeaponController_1.WeaponController.ApplyWeaponLevelMaterial(_, t, this.WeaponEquipInfo.WeaponBreachLevel), Log_1.Log.CheckDebug())) {
                    Log_1.Log.Debug("Character", 25, "设置武器换色", ["materialData", h], ["level", this.WeaponEquipInfo.WeaponBreachLevel]);
                  }
                });
              }
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Character", 4, "设置武器模型完成", ["modelId", n], ["weaponCount", a.length]);
              }
            }
          });
          this.rc_.add(i);
          ++t;
        }
      }
    }
    this.iQr = t;
    if (this.Hte.CreatureData.GetWeaponSkinId() > 0) {
      this.Lie?.AddTag(skinTag);
    } else {
      this.Lie?.RemoveTag(skinTag);
    }
    return true;
  }
  OnEquipWeaponForRoleNotify(t) {
    this.EquipWeaponForRoleByWeaponComponent(t.Lys);
  }
  OnEntityEquipSkinChangeNotify(t) {
    var t = t.lI_.yI_;
    this.Hte.CreatureData.SetWeaponSkinId(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 4, "服务器下发武器皮肤", ["weaponSkinId", t]);
    }
    if (t === 0) {
      this.C_l(this.WeaponEquipInfo.WeaponConfig.Models);
    } else {
      t = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(t).Models;
      this.C_l(t);
    }
  }
  CheckAndHangWeapons(t) {
    if (this._Pr === 0) {
      if (this.Lie.HasTag(-1348147833)) {
        this.WeaponOut();
      }
    } else if ((!this.oRe?.Valid || !!(this.oRe.BattleIdleEndTime <= 0)) && !this.Lie.HasTag(-1348147833) && (!this.oRe.Valid || !this.oRe.MainAnimInstance || !!(this.oRe.MainAnimInstance.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.KEEP_WEAPON_OUT_NAME, 0) < KEEP_WEAPON_OUT_THREADHOLD))) {
      this.WeaponIn(t);
    }
  }
  HideWeaponsWhenHideBones(i, s) {
    if (this.Hte) {
      var e = CharacterNameDefines_1.CharacterNameDefines.ROOT;
      for (const h of this.QKr.CharacterWeapons) {
        let t = h.Mesh.GetAttachSocketName();
        if (!FNameUtil_1.FNameUtil.IsEmpty(t)) {
          while (!e.op_Equality(t) && !s.op_Equality(t)) {
            t = this.Hte.Actor.Mesh.GetParentBone(t);
          }
          if (t.op_Equality(s)) {
            h.Mesh.SetHiddenInGame(i);
          }
        }
      }
    }
  }
  qQr(t) {
    if (!(this.$Kr >= this.XKr) && this.Hte) {
      this.$Kr += t;
      var i = Math.min(this.$Kr / this.XKr, 1);
      for (const s of this.QKr.CharacterWeapons) {
        UE.KismetMathLibrary.D_TLerp(s.LerpStartTransform, s.LerpEndTransform, i).SetScale3D(this.mQr.ToUeVector());
        s.Mesh.D_K2_SetRelativeTransform(UE.KismetMathLibrary.D_TLerp(s.LerpStartTransform, s.LerpEndTransform, i), false, undefined, false);
      }
    }
  }
  WeaponInInternal(t, i = 0) {
    this._Pr = 0;
    if (this.Hte) {
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
          this.HideWeapon(-1, true, true);
          this.JKr = undefined;
        }, this.CQr * HIDE_WEAPON_AFTER_WEAPON_IN_DELAY);
        this.XKr = i;
        if ((this.$Kr = 0) < i || !t) {
          for (const s of this.QKr.CharacterWeapons) {
            this.W7o(s, s.NormalSocket, this.dQr, i > 0);
            this.bQr(s, false);
          }
        } else {
          for (const e of this.QKr.CharacterWeapons) {
            e.BattleEffectId = this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(this.Hte.Actor.WeaponInEffect);
            if (!e.WeaponHidden) {
              this.bQr(e, true);
            }
          }
          this.YKr = TimerSystem_1.TimerSystem.Delay(() => {
            this.YKr = undefined;
            for (const t of this.QKr.CharacterWeapons) {
              this.W7o(t, t.NormalSocket, this.dQr, i > 0);
              this.bQr(t, false);
            }
          }, WEAPON_IN_DELAY);
        }
      } else {
        for (const h of this.QKr.CharacterWeapons) {
          this.W7o(h, h.NormalSocket, this.dQr, i > 0);
          this.bQr(h, true);
        }
      }
    }
  }
  WeaponIn(t, i = 0) {
    if (this._Pr !== 0) {
      this.WeaponInInternal(t, i);
    }
  }
  OldWeaponHidden() {
    if (this.Hte) {
      if (this.YKr) {
        TimerSystem_1.TimerSystem.Remove(this.YKr);
        this.YKr = undefined;
      }
      for (const t of this.QKr.CharacterWeapons) {
        this.bQr(t, true);
      }
    }
  }
  WeaponOutInternal(t = 0) {
    this._Pr = 1;
    if (this.Hte) {
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
      for (const i of this.QKr.CharacterWeapons) {
        this.W7o(i, i.BattleSocket, this.dQr, t > 0);
        this.bQr(i, false);
        if (i.BattleEffectId) {
          this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(i.BattleEffectId);
          i.BattleEffectId = 0;
        }
      }
    }
  }
  WeaponOut(t = 0) {
    if (this._Pr !== 1) {
      this.WeaponOutInternal(t);
    }
  }
  W7o(t, i, s, e) {
    var h = this.Hte.Actor.Mesh.D_GetSocketTransform(i, 0);
    s.SetScale3D(this.mQr.ToUeVector());
    if (e) {
      t.LerpStartTransform = UE.KismetMathLibrary.D_ComposeTransforms(t.Mesh.D_K2_GetComponentToWorld(), h.Inverse());
      t.LerpStartTransform.SetScale3D(this.mQr.ToUeVector());
      t.LerpEndTransform = s;
    }
    t.Mesh.K2_AttachToComponent(this.Hte.Actor.Mesh, i, 0, 0, 0, true);
    if (e) {
      t.Mesh.D_K2_SetRelativeTransform(t.LerpStartTransform, false, undefined, true);
    } else {
      t.Mesh.D_K2_SetRelativeTransform(s, false, undefined, true);
    }
  }
  ChangeWeaponHangState(t, i, s, e) {
    if (this._Pr !== t) {
      switch (t) {
        case 0:
          this.WeaponIn(false, e);
          break;
        case 1:
          this.WeaponOut(e);
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
          if (i.Num() !== this.QKr.CharacterWeapons.length || s.Num() !== this.QKr.CharacterWeapons.length) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 6, "切换武器挂载需要与本身武器部件数量一样的输入数据", ["Char", this.Hte.Actor.GetName()]);
            }
            return false;
          }
          if ((this.XKr = e) > 0) {
            this.$Kr = 0;
          }
          {
            let t = 0;
            for (const o of this.QKr.CharacterWeapons) {
              var h = UE.KismetMathLibrary.Conv_TransformToTransformDouble(s.Get(t));
              this.W7o(o, i.Get(t), h, e > 0);
              this.bQr(o, false);
              if (o.BattleEffectId) {
                this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(o.BattleEffectId);
                o.BattleEffectId = 0;
              }
              ++t;
            }
          }
      }
    }
    return true;
  }
  HideWeapon(t, i, s, e = false, h = 0) {
    this.ZKr.push(new HideWeaponOrder(t, i, s, e, h));
  }
  vQr() {
    for (const t of this.ZKr) {
      t.WithEffect = false;
    }
  }
  GQr() {
    if (this.QKr?.CharacterWeapons) {
      for (const t of this.QKr.CharacterWeapons) {
        t.SetBuffEffectsHiddenInGame(t.WeaponHidden);
      }
    }
  }
  bQr(t, i, s = true, e = true, h = 0) {
    e = this._Pr === 0 && this.DQr.size > 0 || t.VisibleHelper.RequestAndUpdateHiddenInGame(i, e, h);
    if (e === t.WeaponHidden) {
      return false;
    }
    if (i && e) {
      t.ReleaseHideEffect();
    }
    t.Mesh.SetHiddenInGame(e, true);
    if (e && t.Mesh instanceof UE.SkeletalMeshComponent) {
      h = t.Mesh.GetAnimInstance();
      UE.KuroAnimLibrary.EndAnimNotifyStates(h);
    }
    h = t.WeaponHidden;
    t.WeaponHidden = e;
    if (i && e && s && !h && !this.Jsh) {
      t.ShowHideEffect(this.Hte?.GetReplaceEffect(CharacterWeaponMesh_1.WEAPON_HIDDEN_EFFECT));
    }
    t.SetBuffEffectsHiddenInGame(i && e);
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
    var t = ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfig(this.Entity);
    let i = 0;
    for (const s of this.QKr.CharacterWeapons) {
      s.VisibleHelper.InitBaseTable(i < t.BaseType.length ? t.BaseType[i] : 0);
      s.VisibleHelper.InitTagHelper(this.Lie, i < t.BaseType.length ? t.VisibleTags[i] : "", this.fQr, i < t.BaseType.length ? t.HiddenTags[i] : "", this.pQr);
      i++;
    }
  }
  gYs() {
    var t = this.Hte.CreatureData;
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
      t = this.Hte.CreatureData;
      this.Mba = t.GetModelConfig().隐藏葫芦;
      if (!this.Mba) {
        t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.GetRoleId());
        this.Mba = t?.HideHuLu ?? false;
      }
    }
  }
  InitDebugWeaponVisibleDataById(t) {
    var i = ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfigById(t);
    let s = 0;
    for (const e of this.QKr.CharacterWeapons) {
      e.VisibleHelper.InitBaseTable(s < i.BaseType.length ? i.BaseType[s] : 0);
      e.VisibleHelper.InitTagHelper(this.Lie, s < i.BaseType.length ? i.VisibleTags[s] : "", this.fQr, s < i.BaseType.length ? i.HiddenTags[s] : "", this.pQr);
      s++;
    }
    this.HideWeapon(-1, true, false);
    this.JKr = undefined;
  }
  ClearWeaponVisibleData() {
    if (this.QKr?.CharacterWeapons) {
      for (const t of this.QKr.CharacterWeapons) {
        t.VisibleHelper.ClearTagHelper();
      }
    }
  }
  SetWeaponVisibleByTag(t, i, s) {
    if (i) {
      this.HideWeapon(t.Index, !s, true, false, 2);
    } else {
      this.HideWeapon(t.Index, s, true, false, 2);
    }
  }
  GetCurrentWeaponEquipDebugInfo() {
    let t = "";
    t += `[武器组件]{ weaponId: ${this.WeaponEquipInfo.WeaponId}, 'WeaponBreachLevel:' ${this.WeaponEquipInfo.WeaponBreachLevel}, models:${this.WeaponEquipInfo.WeaponConfig.Models}  }
`;
    for (const s of this.QKr.CharacterWeapons) {
      var i = s.Mesh;
      t += `[武器组件]{ weaponMesh: ${i.SkeletalMesh.GetName()}, AnimInstance: ${i.GetAnimInstance().GetName()},         BattleSocket: ${s.BattleSocket},NormalSocket: ${s.NormalSocket} }
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
  QSu() {
    return this.I5r?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar && this.Entity.GetComponent(59)?.CurrentSoarType !== 1;
  }
  UT1() {
    var t;
    if (this.Hte?.IsAutonomousProxy && (t = this.WeaponEquipInfo?.WeaponConfig?.WeaponType)) {
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
CharacterWeaponComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(81)], CharacterWeaponComponent);
exports.CharacterWeaponComponent = CharacterWeaponComponent; //# sourceMappingURL=CharacterWeaponComponent.js.map