"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneBattleInteractModel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  WeaponSceneInteractById_1 = require("../../../Core/Define/ConfigQuery/WeaponSceneInteractById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  SceneBattleInteractDefine_1 = require("./SceneBattleInteractDefine"),
  SceneBattleInteractEffect_1 = require("./SceneBattleInteractEffect"),
  SceneBattleInteractPool_1 = require("./SceneBattleInteractPool");
class SceneBattleInteractModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.Dqc = !1, this.Bqc = 0, this.EffectMap = new Map, this.DefaultWeaponInteractConfig = void 0, this.WeaponInteractConfigMap = new Map
  }
  OnInit() {
    return !0
  }
  OnClear() {
    return this.mTa(), this.sT1(), SceneBattleInteractPool_1.SceneBattleInteractPool.Clear(), !0
  }
  OnLeaveLevel() {
    return this.mTa(), this.sT1(), SceneBattleInteractPool_1.SceneBattleInteractPool.Clear(), !0
  }
  CreateSceneBattleInteract(e, t = 0, r = 0) {
    var n;
    if (this.Open) return n = new SceneBattleInteractEffect_1.SceneBattleInteractEffect, SceneBattleInteractModel.kqc++, n.Id = SceneBattleInteractModel.kqc, n.Init(e, t, r), this.EffectMap.set(n.Id, n), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "CreateSceneBattleInteract", ["id", n.Id]), n
  }
  DestroySceneBattleInteract(e) {
    var t = this.EffectMap.get(e);
    t && (t.Destroy(), this.EffectMap.delete(e))
  }
  SetSceneBattleInteractEnable(e, t, r = 0) {
    e = this.EffectMap.get(e);
    return !!e && (e.SetEnable(t, r), !0)
  }
  GetSceneBattleInteract(e) {
    return this.EffectMap.get(e)
  }
  GetDefaultWeaponInteractConfig() {
    if (this.Open) return this.DefaultWeaponInteractConfig || (this.DefaultWeaponInteractConfig = ResourceSystem_1.ResourceSystem.Load(SceneBattleInteractDefine_1.WEAPON_INTERACT_CONFIG_PATH, UE.BP_SceneBattleInteract_C)), this.DefaultWeaponInteractConfig
  }
  GetWeaponInteractConfig(e) {
    var t;
    if (this.Open && !(e <= 0)) return this.WeaponInteractConfigMap.get(e) || ((t = WeaponSceneInteractById_1.configWeaponSceneInteractById.GetConfig(e)?.Path) ? (t = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_SceneBattleInteract_C), this.WeaponInteractConfigMap.set(e, t), t) : void 0)
  }
  get Open() {
    return this.Dqc
  }
  set Open(e) {
    this.Dqc === e || (this.Dqc = e, this.Dqc) || this.mTa()
  }
  get Debug() {
    return this.Bqc
  }
  set Debug(e) {
    if (this.Bqc !== e) {
      this.Bqc = e;
      for (const t of this.EffectMap.values()) t.SetDebug(this.Bqc)
    }
  }
  mTa() {
    for (const e of this.EffectMap.values()) e.Destroy();
    this.EffectMap.clear()
  }
  sT1() {
    this.DefaultWeaponInteractConfig = void 0, this.WeaponInteractConfigMap.clear()
  }
}(exports.SceneBattleInteractModel = SceneBattleInteractModel).kqc = 0;
//# sourceMappingURL=SceneBattleInteractModel.js.map