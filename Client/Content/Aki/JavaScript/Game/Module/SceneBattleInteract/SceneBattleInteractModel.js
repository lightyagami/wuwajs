"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneBattleInteractModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const WeaponSceneInteractById_1 = require("../../../Core/Define/ConfigQuery/WeaponSceneInteractById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const SceneBattleInteractDefine_1 = require("./SceneBattleInteractDefine");
const SceneBattleInteractEffect_1 = require("./SceneBattleInteractEffect");
const SceneBattleInteractPool_1 = require("./SceneBattleInteractPool");
class SceneBattleInteractModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Dqc = false;
    this.Bqc = 0;
    this.EffectMap = new Map();
    this.DefaultWeaponInteractConfig = undefined;
    this.WeaponInteractConfigMap = new Map();
    this.IgnoreCommonWeapon = false;
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.mTa();
    this.xT1();
    SceneBattleInteractPool_1.SceneBattleInteractPool.Clear();
    return true;
  }
  OnLeaveLevel() {
    this.mTa();
    this.xT1();
    SceneBattleInteractPool_1.SceneBattleInteractPool.Clear();
    return true;
  }
  CreateSceneBattleInteract(e, t = 0, r = 0) {
    var n;
    if (this.Open) {
      n = new SceneBattleInteractEffect_1.SceneBattleInteractEffect();
      SceneBattleInteractModel.kqc++;
      n.Id = SceneBattleInteractModel.kqc;
      n.Init(e, t, r);
      this.EffectMap.set(n.Id, n);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "CreateSceneBattleInteract", ["id", n.Id]);
      }
      return n;
    }
  }
  DestroySceneBattleInteract(e) {
    var t = this.EffectMap.get(e);
    if (t) {
      t.Destroy();
      this.EffectMap.delete(e);
    }
  }
  SetSceneBattleInteractEnable(e, t, r = 0) {
    e = this.EffectMap.get(e);
    return !!e && (e.SetEnable(t, r), true);
  }
  GetSceneBattleInteract(e) {
    return this.EffectMap.get(e);
  }
  GetDefaultWeaponInteractConfig() {
    if (this.Open) {
      this.DefaultWeaponInteractConfig ||= ResourceSystem_1.ResourceSystem.Load(SceneBattleInteractDefine_1.WEAPON_INTERACT_CONFIG_PATH, UE.BP_SceneBattleInteract_C);
      return this.DefaultWeaponInteractConfig;
    }
  }
  GetWeaponInteractConfig(e) {
    var t;
    if (this.Open && !(e <= 0)) {
      return this.WeaponInteractConfigMap.get(e) || ((t = WeaponSceneInteractById_1.configWeaponSceneInteractById.GetConfig(e)?.Path) ? (t = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_SceneBattleInteract_C), this.WeaponInteractConfigMap.set(e, t), t) : undefined);
    }
  }
  get Open() {
    return this.Dqc;
  }
  set Open(e) {
    if (this.Dqc !== e && !(this.Dqc = e, this.Dqc)) {
      this.mTa();
    }
  }
  get Debug() {
    return this.Bqc;
  }
  set Debug(e) {
    if (this.Bqc !== e) {
      this.Bqc = e;
      for (const t of this.EffectMap.values()) {
        t.SetDebug(this.Bqc);
      }
    }
  }
  mTa() {
    for (const e of this.EffectMap.values()) {
      e.Destroy();
    }
    this.EffectMap.clear();
  }
  xT1() {
    this.DefaultWeaponInteractConfig = undefined;
    this.WeaponInteractConfigMap.clear();
  }
  RefreshIgnoreCommonWeapon(e) {
    if (e) {
      this.IgnoreCommonWeapon = true;
    } else {
      for (const t of this.EffectMap.values()) {
        if (t.GetIgnoreCommonWeapon()) {
          this.IgnoreCommonWeapon = true;
          return;
        }
      }
      this.IgnoreCommonWeapon = false;
    }
  }
}
(exports.SceneBattleInteractModel = SceneBattleInteractModel).kqc = 0;
//# sourceMappingURL=SceneBattleInteractModel.js.map