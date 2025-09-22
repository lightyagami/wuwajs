"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueModel = exports.PERMYRIAD_RATIO = exports.COMBO_LEVEL_CONFIG_LENGTH = undefined;
const Log_1 = require("../../../Core/Common/Log");
const KSCBasePropertyById_1 = require("../../../Core/Define/ConfigQuery/KSCBasePropertyById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const KscUtil_1 = require("../../KuroSimpleCombat/KscUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SurvivorsRogueCommandQueue_1 = require("./Command/SurvivorsRogueCommandQueue");
const SurvivorsRogueBattleData_1 = require("./Data/SurvivorsRogueBattleData");
const SurvivorsRogueGainData_1 = require("./Data/SurvivorsRogueGainData");
exports.COMBO_LEVEL_CONFIG_LENGTH = 4;
exports.PERMYRIAD_RATIO = 10000;
class SurvivorsRogueModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.RAd = 0;
    this.CurComboConfig = undefined;
    this.MaxWaveNum = 0;
    this.WaveTypeArray = [];
    this.ComboTimerFreezeTimeCfg = [0, 0, 0];
    this.ComboDurationAdditionCfg = [0, 0, 0];
    this._jd = 0;
    this.HasNewSettle = false;
    this.Svd = 0;
    this.SelectLevelInfo = undefined;
    this.NotTipsShopPurchaseAvailable = false;
    this.BattleData = SurvivorsRogueBattleData_1.SurvivorsRogueBattleData.Create();
    this.GainData = SurvivorsRogueGainData_1.SurvivorsRogueGainData.Create();
    this.CommandQueue = undefined;
    this.mmu = false;
    this.Hkd = undefined;
  }
  get CurLevelId() {
    return this.RAd;
  }
  set CurLevelId(t) {
    this.RAd = t;
    this.MaxWaveNum = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetMaxWaveNumByLevelId(t);
    this.WaveTypeArray = new Array(this.MaxWaveNum);
    for (let e = 0; e < this.MaxWaveNum; e++) {
      this.WaveTypeArray[e] = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetWaveType(t, e + 1);
    }
    this.CurComboConfig = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetComboConfig(t);
  }
  get CurRoleId() {
    return this.GainData.GetRoleGainData()?.ConfigId ?? 0;
  }
  get CurRoleLevel() {
    return this.GainData.GetRoleGainData()?.Data.F6n ?? 0;
  }
  get CurWaveRemainTime() {
    return ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetWaveDuration(this.CurLevelId, this.CurWaveNum);
  }
  get CurWaveType() {
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetWaveType(this.CurLevelId, this.CurWaveNum);
    if (e !== 2 || this.BattleData.EndlessWaveEnabled) {
      return e;
    } else {
      return 0;
    }
  }
  get IsBonusWave() {
    return ConfigManager_1.ConfigManager.SurvivorsRogueConfig.IsBonusWave(this.CurLevelId, this.CurWaveNum);
  }
  get CurWaveNum() {
    return this.BattleData.GetBatch();
  }
  InitComboEnhanceCfg(t) {
    if (t.length !== exports.COMBO_LEVEL_CONFIG_LENGTH) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SurvivorsRogue", 79, "幸存者连杀等级配置数量不匹配", ["合法数量", exports.COMBO_LEVEL_CONFIG_LENGTH], ["实际数量", t.length]);
      }
    } else {
      for (let e = 0; e < exports.COMBO_LEVEL_CONFIG_LENGTH; e++) {
        this.ComboTimerFreezeTimeCfg[e] = t[e].Zps;
        this.ComboDurationAdditionCfg[e] = t[e].w9d;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SurvivorsRogue", 79, "InitComboEnhanceCfg", ["ComboTimerFreezeTimeCfg", this.ComboTimerFreezeTimeCfg], ["ComboDurationAdditionCfg", this.ComboDurationAdditionCfg]);
      }
    }
  }
  set WaveTipsState(e) {
    if (this._jd === e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SurvivorsRogue", 79, "重复设置WaveTipsState, 直接跳过", ["State", e]);
      }
    } else {
      this._jd = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueSwitchWaveTipsState, e);
    }
  }
  get WaveTipsState() {
    return this._jd;
  }
  get NeedOpenActivityMainView() {
    var e = this.HasNewSettle;
    this.HasNewSettle = false;
    return e;
  }
  SetCurrentActivityId(e) {
    this.Svd = e;
  }
  IsActivityOn() {
    return this.Svd !== 0;
  }
  get ActivityData() {
    if (this.Svd !== 0) {
      return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.Svd);
    }
  }
  InitCommandQueue() {
    this.ClearCommandQueue();
    this.CommandQueue = new SurvivorsRogueCommandQueue_1.SurvivorsRogueCommandQueue();
  }
  ClearCommandQueue() {
    if (this.CommandQueue) {
      this.CommandQueue.Clear();
      this.CommandQueue = undefined;
    }
  }
  ClearGlobal() {
    this.ClearCommandQueue();
    this.BattleData.Clear();
    this.GainData.Clear();
    this.SelectLevelInfo = undefined;
    this.RAd = 0;
    this.MaxWaveNum = 0;
    this.WaveTypeArray = [];
    this._jd = 0;
    this.NotTipsShopPurchaseAvailable = false;
    for (let e = 0; e < exports.COMBO_LEVEL_CONFIG_LENGTH; e++) {
      this.ComboTimerFreezeTimeCfg[e] = 0;
      this.ComboDurationAdditionCfg[e] = 0;
    }
  }
  GetRogueCurrencyItemId() {
    return this.GetRogueActivityConfig()?.CurrencyItemId ?? 0;
  }
  GetRogueActivityConfig() {
    if (this.IsActivityOn()) {
      return ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsActivityConfigByActivityId(this.Svd);
    }
  }
  SetDebugMode(e) {
    this.mmu = e;
  }
  SaveCacheHandbookClickedMap() {
    if (this.Hkd !== undefined) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SurvivorsHandbookClicked, this.Hkd);
    }
  }
  GetItemIsNew(e, t) {
    if (this.Hkd === undefined) {
      this.Hkd = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SurvivorsHandbookClicked);
    }
    return !this.GetItemIsLock(e, t) && !this.Hkd?.get(this.Svd)?.get(e)?.has(t);
  }
  SetItemClicked(i, r) {
    if (this.Hkd === undefined) {
      this.Hkd = new Map();
    }
    if (!this.GetItemIsLock(i, r)) {
      var o = this.Svd;
      let e = this.Hkd.get(o);
      if (e === undefined) {
        e = new Map();
        this.Hkd.set(o, e);
      }
      let t = e.get(i);
      if (t === undefined) {
        t = new Set();
        e.set(i, t);
      }
      t.add(r);
    }
  }
  GetItemIsLock(e, t) {
    return !{
      [0]: this.ActivityData?.ItemMap,
      2: this.ActivityData?.RoleMap,
      1: this.ActivityData?.WeaponMap
    }[e]?.get(t);
  }
  GetRoleDefaultAttributeList(e, t) {
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e);
    var i = e.PropId;
    const r = e.RecommendProperty;
    e = KSCBasePropertyById_1.configKSCBasePropertyById.GetConfig(i);
    const o = KscUtil_1.KscUtil.GetAttrsDataByPropertyConfig(e);
    i = t.map(e => {
      var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(e);
      var i = o.get(e) ?? 0;
      return {
        AttrId: t.Id,
        Value: t.IsBasePermyriad ? i / exports.PERMYRIAD_RATIO : i,
        IsRecommend: r.includes(e)
      };
    });
    i.sort((e, t) => {
      var i = e.IsRecommend;
      if (i === t.IsRecommend) {
        return e.AttrId - t.AttrId;
      } else if (i) {
        return -1;
      } else {
        return 1;
      }
    });
    return i;
  }
}
exports.SurvivorsRogueModel = SurvivorsRogueModel;
//# sourceMappingURL=SurvivorsRogueModel.js.map