"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymModel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const LordGymEntranceSetById_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceSetById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const PayShopDefine_1 = require("../PayShop/PayShopDefine");
const LoadAsyncPromise_1 = require("../UiComponent/LoadAsyncPromise");
const LordGymDefine_1 = require("./LordGymDefine");
class LordGymModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LordId2EntranceIdMap = undefined;
    this.UnLockLordGym = [];
    this.ReadLoadGymIds = [];
    this.FirstUnLockLordGym = [];
    this.EntranceEntityId = 0;
    this.EntranceSetId = 0;
    this.EntryChallengeId = 0;
    this.LastChallengeLordEntranceId = 0;
    this.CurrentChallengeLordGymId = 0;
    this.IsDeadInChallenge = false;
    this.LastChallengeLordId = 0;
    this.LordGymRecord = new Map();
    this.LordGymEntranceInfo = [];
    this.LordGymEntrancesWithNewTag = [];
    this.NewLordGymEntranceIdRecord = undefined;
    this.CacheTransform = undefined;
    this.CacheLocation = undefined;
    this.CacheRotator = undefined;
    this.CacheScale = undefined;
    this.mtg = undefined;
  }
  OnInit() {
    this.LordId2EntranceIdMap = new Map();
    for (const e of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceAllConfig()) {
      for (const r of e.LordGymList) {
        this.LordId2EntranceIdMap.set(r, e.Id);
      }
    }
    return true;
  }
  GetLordGymIsUnLock(e) {
    return this.UnLockLordGym.includes(e);
  }
  GetLordGymHasRead(e) {
    return this.ReadLoadGymIds.includes(e);
  }
  ReadLordGym(e) {
    this.ReadLoadGymIds.push(e);
  }
  GetLordGymEntranceList(e) {
    return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceLordList(e);
  }
  GetLastGymFinish(e) {
    var r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e);
    if (r.Difficulty <= 1) {
      return true;
    }
    for (const t of ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(r.Difficulty - 1)) {
      if (t.PlayId === r.PlayId) {
        return this.LordGymRecord.has(t.Id);
      }
    }
    return false;
  }
  GetNextGymId(e) {
    const r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e);
    return ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(r.Difficulty + 1)?.find(e => e.PlayId === r.PlayId)?.Id;
  }
  GetLordGymIsFinish(e) {
    return this.LordGymRecord.has(e);
  }
  GetMarkIdByLordGymId(e) {
    e = this.LordId2EntranceIdMap.get(e);
    return ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e)?.MarkId;
  }
  GetLordGymEntranceFinish(e) {
    var r = this.GetGymCanFightMaxLevelWithoutLockCondition(e);
    return this.GetHasFinishLord(e) + "/" + r;
  }
  GetHasFinishLord(e) {
    e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (!e) {
      return 0;
    }
    let r = 0;
    for (const t of e.LordGymList) {
      if (this.GetLordGymIsFinish(t)) {
        r++;
      }
    }
    return r;
  }
  GetMaxDifficultyLordGymEntrance(r) {
    r = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (r) {
      let e = 0;
      for (const i of r.LordGymList) {
        var t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i);
        if (this.GetLordGymIsUnLock(i) && t.Difficulty > e) {
          e = t.Difficulty;
        }
      }
      return e;
    }
  }
  GetMaxDifficultyLordGymEntranceCanFight(r) {
    r = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (r) {
      let e = 1;
      for (const i of r.LordGymList) {
        var t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i);
        if (t.Difficulty > 1 && this.GetLordGymIsUnLock(i) && this.GetLordGymIsFinish(i - 1) && t.Difficulty > e) {
          e = t.Difficulty;
        }
      }
      return e;
    }
  }
  GetCanFightLordGym(e = 0) {
    for (const o of this.UnLockLordGym) {
      var r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
      var t = this.GetLordGymIsUnLock(o);
      var r = r.Difficulty === 1 || this.GetLordGymIsFinish(o - 1);
      var i = this.GetLordGymIsFinish(o);
      if (t && r && !i) {
        return o;
      }
    }
    return 0;
  }
  GetGymEntranceAllFinish(e) {
    e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(e);
    if (!e) {
      return false;
    }
    for (const r of e.LordGymList) {
      if (!this.GetLordGymIsFinish(r)) {
        return false;
      }
    }
    return true;
  }
  GetGymCanFightMaxLevelWithoutLockCondition(r) {
    r = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(r);
    if (r) {
      let e = 1;
      for (const i of r.LordGymList) {
        var t = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i);
        if (t.Difficulty > 1 && this.GetLordGymIsUnLock(i) && t.Difficulty > e) {
          e = t.Difficulty;
        }
      }
      return e;
    }
  }
  GetLordGymCurrencyRewardAndTotalCount(e) {
    e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(e).LordEntranceList;
    let r = 0;
    let t = 0;
    var i = ConfigManager_1.ConfigManager.LordGymConfig;
    var o = ConfigManager_1.ConfigManager.ExchangeRewardConfig;
    for (const a of e) {
      for (const h of i.GetLordGymEntranceConfig(a).LordGymList) {
        var n = i.GetLordGymConfig(h).RewardId;
        var n = o.GetExchangeRewardPreviewRewardList(n);
        var s = this.GetLordGymIsFinish(h);
        for (const f of n) {
          if (f[0].ItemId === PayShopDefine_1.LORD_GYM_CURRENCY_ID || f[0].ItemId === PayShopDefine_1.LORD_GYM_THIRD_CURRENCY_ID) {
            if (s) {
              r += f[1];
            }
            t += f[1];
          }
        }
      }
    }
    return [r, t];
  }
  IsChallenging() {
    return this.CurrentChallengeLordGymId > 0;
  }
  InitNewLordGymEntranceIdRecord() {
    this.NewLordGymEntranceIdRecord = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.NewLordGymEntranceIdRecord) ?? new Array();
  }
  RecordNewLordGymEntrance(e) {
    if (this.NewLordGymEntranceIdRecord && !this.IsNewLordGymEntranceRecord(e)) {
      this.NewLordGymEntranceIdRecord.push(e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.NewLordGymEntranceIdRecord, this.NewLordGymEntranceIdRecord);
    }
  }
  IsNewLordGymEntranceRecord(e) {
    return this.NewLordGymEntranceIdRecord?.includes(e) ?? false;
  }
  PhraseEntranceInfo(e) {
    if (e) {
      this.LordGymEntranceInfo.length = 0;
      for (const t of e) {
        var r = new LordGymEntranceInfo();
        r.Phrase(t);
        this.LordGymEntranceInfo.push(r);
      }
    }
  }
  GetLordGymEntranceWithNewTag() {
    this.LordGymEntrancesWithNewTag.length = 0;
    for (const r of this.LordGymEntranceInfo) {
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      if (e >= r.EffectBeginTime && e <= r.EffectEndTime) {
        this.LordGymEntrancesWithNewTag.push(r.Id);
      }
    }
    return this.LordGymEntrancesWithNewTag;
  }
  GetLordGymThirdBossSequenceActor() {
    return this.mtg;
  }
  DestroyLordGymThirdBossSequenceActor() {
    if (this.mtg?.IsValid()) {
      this.mtg.SequencePlayer?.Stop();
      this.mtg.K2_DestroyActor();
      this.mtg = undefined;
    }
  }
  PlaybackPosition(e) {
    var r;
    var t;
    if (this.mtg?.IsValid() && (r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroSceneInteractionActorSystem.StaticClass()), (t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("MonsterCase"), 1))?.IsValid() && r.SetSequenceWithTargetLevelActor(this.mtg, this.mtg.GetSequence(), t), UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(this.mtg.GetSequence(), true), this.mtg.bOverrideInstanceData = true, r = this.mtg.DefaultInstanceData, t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(ControllerHolder_1.ControllerHolder.RenderModuleController.GetKuroCurrentUiSceneTransform()), r.TransformOrigin = t, r = (e ? this.mtg?.SequencePlayer?.GetStartTime() : this.mtg?.SequencePlayer?.GetEndTime()).Time)) {
      t = new UE.MovieSceneSequencePlaybackParams(r, 0, "", 0, 0);
      this.mtg?.SequencePlayer?.SetPlaybackPosition(t);
    }
  }
  async Fwg(e) {
    this.DestroyLordGymThirdBossSequenceActor();
    var r;
    var t = await new LoadAsyncPromise_1.LoadAsyncPromise(LordGymDefine_1.LORD_GYM_THIRD_SEQUENCE_PATH, UE.LevelSequence).Promise;
    if (t && !this.mtg?.IsValid()) {
      r = (0, puerts_1.$ref)(undefined);
      UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, t, new UE.MovieSceneSequencePlaybackSettings(), r);
      this.mtg = (0, puerts_1.$unref)(r);
      (r = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = false;
      r.bPauseAtEnd = true;
      this.mtg.PlaybackSettings = r;
      this.mtg.SetTickableWhenPaused(true);
      this.mtg.SetSequence(t);
      this.PlaybackPosition(e);
    }
  }
  async EnterLordGymThirdBossScene(e) {
    await this.Fwg(e);
    var e = UE.KuroGISystem.GetKuroGISystem(GlobalData_1.GlobalData.World.GetWorld());
    if (e && ((e = e.GetKuroGlobalGIActor()).UINeedLerpData = true, e.GlobalUiScenePostProcess && (e.GlobalUiScenePostProcess.bEnabled = false), e.GlobalPostProcessVolume)) {
      e.GlobalPostProcessVolume.bIsUISceneRendering = true;
    }
  }
  ExitLordGymThirdBossScene() {
    var e = UE.KuroGISystem.GetKuroGISystem(GlobalData_1.GlobalData.World.GetWorld());
    if (e && ((e = e.GetKuroGlobalGIActor()).UINeedLerpData = false, e.GlobalUiScenePostProcess && (e.GlobalUiScenePostProcess.bEnabled = true), e.GlobalPostProcessVolume)) {
      e.GlobalPostProcessVolume.bIsUISceneRendering = false;
    }
  }
}
exports.LordGymModel = LordGymModel;
class LordGymEntranceInfo {
  constructor() {
    this.Id = 0;
    this.EffectBeginTime = 0;
    this.EffectEndTime = 0;
  }
  Phrase(e) {
    this.Id = e.s5n;
    this.EffectBeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.xE_)) / 1000;
    this.EffectEndTime = Number(MathUtils_1.MathUtils.LongToBigInt(e.UE_)) / 1000;
  }
}
//# sourceMappingURL=LordGymModel.js.map