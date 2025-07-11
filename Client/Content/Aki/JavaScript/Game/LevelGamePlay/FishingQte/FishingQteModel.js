"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQteModel = undefined;
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const DockyardItemBlockOriginalData_1 = require("../../Module/Activity/ActivityContent/Fishing/Dockyard/Base/DockyardItemBlockOriginalData");
const FishingQteDefine_1 = require("./FishingQteDefine");
const PERCENT_CONVERT = 0.01;
class FishingQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentGameplayId = 0;
    this.CurrentFishingPointConfigId = 0;
    this.CurrentFishingPointCreatureDataId = 0;
    this.CurrentInteractType = 0;
    this.GameInfo = undefined;
    this.GSl = undefined;
    this.kSl = undefined;
    this.CurrentFishingIconType = undefined;
    this.hO_ = 1;
    this.lO_ = 1;
    this.f7_ = 0;
    this.vt_ = new Map();
    this._O_ = new Map();
    this.Xi_ = [];
  }
  get GameConfig() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      return this.GSl;
    } else {
      return this.kSl;
    }
  }
  async GameplayStart(t, e) {
    t = ModelManager_1.ModelManager.FishingModel.GetFishingPointDataByPbEntityId(t);
    if (!t) {
      return false;
    }
    if (!t.IsValid()) {
      await ControllerHolder_1.ControllerHolder.FishingController.RequestFishingPointInfo(t.SceneId, t.Id);
    }
    var i;
    var r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointConfigById(t.Id);
    if (ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(r.UnlockTech)) {
      if (t.CurrentCount === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 37, "[FishingQte] 交互点可捕捞次数不足", ["捕捞点配置Id", t.Id]);
        }
        return false;
      } else {
        i = r.ShowItem;
        i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(i);
        this.CurrentFishingPointCreatureDataId = e;
        this.CurrentFishingPointConfigId = t.Id;
        this.CurrentGameplayId = t.GamePlayId;
        this.CurrentInteractType = 0;
        this.CurrentFishingIconType = i.Type === 1 ? 0 : 1;
        return this.Fn_(t.CurrentCount);
      }
    } else {
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(r.UnlockTech);
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Fishing_TechUnlockTip2");
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
      r = StringUtils_1.StringUtils.Format(i, t);
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(r);
      return false;
    }
  }
  GameplayStartByTempFishPoint(t) {
    var e = ModelManager_1.ModelManager.FishingModel.GetTempFishingPointDataByCreatureDataId(t);
    if (e) {
      if (e.CurrentCount === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 37, "[FishingQte] 交互点可捕捞次数不足", ["临时捕捞点实体Id", e.CreatureDataId]);
        }
        return false;
      } else {
        this.CurrentFishingPointCreatureDataId = t;
        this.CurrentFishingPointConfigId = 0;
        this.CurrentGameplayId = e.GamePlayId;
        this.CurrentInteractType = 1;
        this.CurrentFishingIconType = 0;
        return this.Fn_(e.CurrentCount);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 37, "[FishingQte] 无法查到对应临时捕捞点信息", ["CreatureDataId", t]);
      }
      return false;
    }
  }
  Fn_(t) {
    this.cO_();
    this.NSl();
    this.GameInfo ||= new FishingQteDefine_1.FishingQteGameInfo();
    this.GameInfo.Clear();
    var e = this.GameConfig.IsAnticlockwise ? 1 : 0;
    this.GameInfo.CreateRingInfo(e);
    this.GameInfo.MaxRound = t;
    var e = this.GameConfig.InvalidArea;
    this.GameInfo.GetRingInfo().IsWholeRing = e.length === 0;
    this.AccumulatePerfectCombo = 0;
    this.vt_.clear();
    this._O_.clear();
    this.Xi_.length = 0;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelPlay", 37, "[FishingQte] 捕鱼玩法开始", ["LevelGameplayId", this.CurrentGameplayId], ["FishingPointId", this.CurrentFishingPointConfigId], ["cIncId", this.CurrentFishingPointCreatureDataId]);
    }
    return true;
  }
  cO_() {
    this.lO_ = 1;
    this.hO_ = 1;
    var t;
    var e = ModelManager_1.ModelManager.FishingModel.EffectType2TechIdsMap;
    var i = e.get(11);
    if (i) {
      for (const s of i) {
        if (ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(s)) {
          t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(s).Effect[0];
          t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(t);
          this.lO_ += t.Params[0] * PERCENT_CONVERT;
        }
      }
    }
    var r;
    var i = e.get(10);
    if (i) {
      for (const a of i) {
        if (ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(a)) {
          r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(a).Effect[0];
          r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(r);
          this.hO_ += r.Params[0] * PERCENT_CONVERT;
        }
      }
    }
  }
  NSl() {
    var t;
    var e;
    var i;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.GSl = ConfigManager_1.ConfigManager.FishingConfig.GetFishingQteConfig(this.CurrentGameplayId);
    } else if (e = IGlobal_1.globalConfig.FishingRouletteConfig) {
      e = (0, PublicUtil_1.getConfigPath)(e);
      i = (t = "", puerts_1.$ref)("");
      ue_1.KuroStaticLibrary.LoadFileToString(i, e);
      t = (0, puerts_1.$unref)(i);
      if (e = JSON.parse(t)) {
        i = e.find(t => t.Id === this.CurrentGameplayId);
        this.kSl = i;
        this.kSl.CursorSpeed = this.g7_(i.CursorSpeed);
        this.kSl.RouletteRotateSpeed = this.g7_(i.RouletteRotateSpeed);
        this.kSl.PerfectAppearRate = this.g7_(i.PerfectAppearRate);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 37, "[FishingQte] 捕鱼转盘玩法找不到Json数据配置");
    }
  }
  g7_(t) {
    var t = t.replace("[", "").replace("]", "").split(",");
    var e = new Map();
    for (const r of t) {
      var i = r.split(":");
      e.set(Number(i[0]), Number(i[1]));
    }
    return e;
  }
  EnterNextRound() {
    this.GameInfo.CurrentRound = Math.min(this.GameInfo.CurrentRound + 1, this.GameInfo.MaxRound);
    if (this.GameInfo.CurrentRound !== this.GameInfo.MaxRound) {
      this.GameInfo.CurrentScore -= this.GameConfig.MaxScore;
    } else {
      this.GameInfo.SetGameStage(4);
    }
  }
  get ScoreUp() {
    return this.GameConfig.ScoreUp * this.lO_;
  }
  get HitAreaScore() {
    return this.GameConfig.HitAreaScore * this.hO_;
  }
  get PerfectScore() {
    return this.GameConfig.PerfectScore * this.hO_;
  }
  set AccumulatePerfectCombo(t) {
    this.f7_ = t;
    this.C7_();
  }
  get AccumulatePerfectCombo() {
    return this.f7_;
  }
  OnQteOn() {
    this.GameInfo.CurrentScore += this.HitAreaScore;
    this.AccumulatePerfectCombo++;
  }
  OnPerfectOn() {
    this.GameInfo.CurrentScore += this.PerfectScore;
    this.AccumulatePerfectCombo++;
  }
  OnMissOn() {
    this.GameInfo.CurrentScore = Math.max(0, this.GameInfo.CurrentScore - this.GameConfig.MistakeScore);
    this.AccumulatePerfectCombo = 0;
  }
  C7_() {
    var t = this.AccumulatePerfectCombo;
    this.GameInfo.CursorSpeed = this.p7_(t, this.GameConfig.CursorSpeed);
    this.GameInfo.RingSpeed = this.p7_(t, this.GameConfig.RouletteRotateSpeed);
    this.GameInfo.PerfectAppearRate = this.p7_(t, this.GameConfig.PerfectAppearRate);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelPlay", 37, "[FishingQte] ComboInfoChange", ["Combo", this.AccumulatePerfectCombo], ["CursorSpeed", this.GameInfo.CursorSpeed], ["RingSpeed", this.GameInfo.RingSpeed], ["PerfectAppearRate", this.GameInfo.PerfectAppearRate]);
    }
  }
  p7_(e, t) {
    var i = Array.from(t.entries());
    for (let t = 0; t < i.length; t++) {
      var r = i[t][0];
      var s = i[t][1];
      if (!(t < i.length - 1)) {
        return s;
      }
      var a = i[t + 1][0];
      if (r <= e && e < a) {
        return s;
      }
    }
    return 0;
  }
  SetTempGetDataListFromServer(t, e) {
    for (const r of t) {
      var i = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(r);
      this.vt_.set(r.b9n, i);
      this._O_.set(r.b9n, e);
      this.Xi_.push(i);
    }
  }
  GetTempGetDataList() {
    var t = Array.from(this.vt_.values());
    this.vt_.clear();
    this._O_.clear();
    this.Xi_.length = 0;
    return t;
  }
  ShiftTempGetData() {
    return this.Xi_.shift();
  }
  IsTempGetDataEmpty() {
    return this.Xi_.length === 0;
  }
  GetTempGetDataTag(t) {
    return this._O_.get(t) ?? 0;
  }
}
exports.FishingQteModel = FishingQteModel;
//# sourceMappingURL=FishingQteModel.js.map