"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterWeaponMesh = exports.CharacterWeapon = exports.WEAPON_HIDDEN_EFFECT = undefined;
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const SkeletalMeshEffectContext_1 = require("../../../../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SkeletalMeshComponentPool_1 = require("../MeshHelper/SkeletalMeshComponentPool");
const WeaponMeshVisibleHelper_1 = require("./WeaponMeshVisibleHelper");
exports.WEAPON_HIDDEN_EFFECT = "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd";
class CharacterWeapon {
  constructor(e, t, s, i = undefined) {
    this.Index = e;
    this.Mesh = t;
    this.HideEffectMode = s;
    this.EntityId = i;
    this.NormalSocket = undefined;
    this.BattleSocket = undefined;
    this.BattleEffectId = undefined;
    this.LerpStartTransform = undefined;
    this.LerpEndTransform = undefined;
    this.WeaponHidden = false;
    this.WeaponHideEffect = 0;
    this.WeaponBuffEffects = new Set();
    this.SceneInteractId = 0;
    this.SceneInteractWeaponType = 0;
    this.VisibleHelper = new WeaponMeshVisibleHelper_1.WeaponMeshVisibleHelper(this);
  }
  Destroy() {
    this.ReleaseHideEffect();
    if (this.SceneInteractId !== 0) {
      ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(this.SceneInteractId);
    }
  }
  ReleaseHideEffect() {
    if (EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.WeaponHideEffect, "[CharacterWeapon.Destroy]", true);
      this.WeaponHideEffect = 0;
    }
  }
  ShowHideEffect(e = undefined) {
    var t;
    var s = this.Mesh.D_GetSocketTransform(FNameUtil_1.FNameUtil.EMPTY, 0);
    if (!EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect)) {
      (t = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(this.EntityId)).SkeletalMeshComp = this.Mesh;
      this.WeaponHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(this.Mesh, s, e ?? exports.WEAPON_HIDDEN_EFFECT, "[CharacterWeapon.ShowHideEffect]", t);
    }
    if (EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect)) {
      this.UpdateHideEffectStateInSelfCentered();
      if (!e) {
        (t = EffectSystem_1.EffectSystem.GetEffectActor(this.WeaponHideEffect)).K2_AttachToComponent(this.Mesh, FNameUtil_1.FNameUtil.EMPTY, 0, 0, 0, false);
        t.D_K2_SetActorTransform(s, false, undefined, true);
      }
    } else {
      this.WeaponHideEffect = 0;
    }
  }
  SetBuffEffectsHiddenInGame(e) {
    for (const s of this.WeaponBuffEffects) {
      var t;
      if (EffectSystem_1.EffectSystem.IsValid(s)) {
        if ((t = EffectSystem_1.EffectSystem.GetSureEffectActor(s))?.IsValid() && t.bHidden !== e) {
          EffectSystem_1.EffectSystem.SetEffectHidden(s, e);
        }
      } else {
        this.WeaponBuffEffects.delete(s);
      }
    }
  }
  AddBuffEffect(e) {
    this.WeaponBuffEffects.add(e);
    if (this.WeaponHidden && EffectSystem_1.EffectSystem.GetEffectActor(e)?.IsValid()) {
      EffectSystem_1.EffectSystem.SetEffectHidden(e, true);
    }
  }
  RemoveBuffEffect(e) {
    this.WeaponBuffEffects.delete(e);
  }
  InitWeaponSceneInteract(e) {
    this.SceneInteractWeaponType = e;
  }
  UpdateSceneInteractEnable(e) {
    var t;
    if (ModelManager_1.ModelManager.SceneBattleInteractModel?.Open) {
      e = e && !this.WeaponHidden;
      if (this.SceneInteractId === 0) {
        if (e) {
          if ((t = ModelManager_1.ModelManager.SceneBattleInteractModel.GetWeaponInteractConfig(this.SceneInteractWeaponType)) && (t = ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(t))) {
            this.SceneInteractId = t.Id;
            t.SetIsCommonWeapon(true);
            t.SetDispatchWeaponEventEnable(true);
            t.BindEntityId(this.EntityId ?? 0);
            t.SetUpdateLocationSocket(this.Mesh, FNameUtil_1.FNameUtil.EMPTY);
            t.SetEnable(true);
          }
          return;
        } else {
          return undefined;
        }
      } else {
        ModelManager_1.ModelManager.SceneBattleInteractModel.SetSceneBattleInteractEnable(this.SceneInteractId, e);
        return;
      }
    }
    this.SceneInteractId = 0;
  }
  UpdateSelfCenteredState() {
    this.UpdateHideEffectStateInSelfCentered();
  }
  UpdateHideEffectStateInSelfCentered() {
    var e;
    if (this.EntityId && EffectSystem_1.EffectSystem.IsValid(this.WeaponHideEffect) && (e = EntitySystem_1.EntitySystem.GetComponent(this.EntityId, 126))?.Valid && (e = e.GetTopForeverTimeScaleConfig(0))) {
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(e.SourceType, this.WeaponHideEffect, e.TimeDilation);
    }
  }
}
exports.CharacterWeapon = CharacterWeapon;
const WEAPON_POOL_MAX_SIZE = 3;
class CharacterWeaponMesh {
  constructor() {
    this.ler = new Array();
    this._er = undefined;
    this.OC = undefined;
  }
  Init(t, e, s, i) {
    this._er = new SkeletalMeshComponentPool_1.SkeletalMeshComponentPool();
    this._er.Init(WEAPON_POOL_MAX_SIZE, e, s, t, i);
    this.OC = s;
    if (t.length !== 0) {
      let e = 0;
      for (const h of t) {
        this.ler.push(new CharacterWeapon(e, h, s.WeaponHideEffect, this.OC.EntityId));
        e++;
      }
    }
    return true;
  }
  Destroy() {
    for (const e of this.ler) {
      e.Destroy();
    }
    this.ler.splice(0, this.ler.length);
    this._er = undefined;
  }
  ChangeCharacterWeapons(t) {
    var s = this.ler.length;
    if (t > WEAPON_POOL_MAX_SIZE) {
      return [];
    }
    var i = this._er?.GetComponents(t);
    if (!i) {
      return [];
    }
    if (t < s) {
      this.ler.splice(t, s - t);
      for (let e = 0; e < t; ++e) {
        this.ler[e].Mesh = i[e];
      }
    } else if (s < t) {
      var h = t - s;
      for (let e = 0; e < s; ++e) {
        this.ler[e].Mesh = i[e];
      }
      for (let e = 0; e < h; ++e) {
        this.ler.push(new CharacterWeapon(e + s, i[e + s], this.OC.WeaponHideEffect, this.OC.EntityId));
      }
    }
    return this.ler;
  }
  get CharacterWeapons() {
    return this.ler;
  }
  Clean() {
    this.ChangeCharacterWeapons(0);
  }
  ShrinkPool() {
    this._er.Shrink();
  }
  GetUsedLength() {
    return this._er.GetUsedLength();
  }
}
exports.CharacterWeaponMesh = CharacterWeaponMesh;
//# sourceMappingURL=CharacterWeaponMesh.js.map