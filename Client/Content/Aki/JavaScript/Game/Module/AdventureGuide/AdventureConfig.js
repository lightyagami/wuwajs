"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureGuideConfig = undefined;
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const AdventureTaskAll_1 = require("../../../Core/Define/ConfigQuery/AdventureTaskAll");
const AdventureTaskById_1 = require("../../../Core/Define/ConfigQuery/AdventureTaskById");
const AdventureTaskChapterAll_1 = require("../../../Core/Define/ConfigQuery/AdventureTaskChapterAll");
const AdventureTaskChapterById_1 = require("../../../Core/Define/ConfigQuery/AdventureTaskChapterById");
const DetectionDropDownTypeById_1 = require("../../../Core/Define/ConfigQuery/DetectionDropDownTypeById");
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const DungeonDetectionAll_1 = require("../../../Core/Define/ConfigQuery/DungeonDetectionAll");
const DungeonDetectionById_1 = require("../../../Core/Define/ConfigQuery/DungeonDetectionById");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const InstanceDungeonEntranceById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceById");
const LevelPlayInfoMappingConfigAll_1 = require("../../../Core/Define/ConfigQuery/LevelPlayInfoMappingConfigAll");
const MonsterDetectionAll_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionAll");
const MonsterDetectionById_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const PreOpenDetectionAll_1 = require("../../../Core/Define/ConfigQuery/PreOpenDetectionAll");
const PreOpenDetectionById_1 = require("../../../Core/Define/ConfigQuery/PreOpenDetectionById");
const SecondaryGuideDataById_1 = require("../../../Core/Define/ConfigQuery/SecondaryGuideDataById");
const SilentAreaDetectionAll_1 = require("../../../Core/Define/ConfigQuery/SilentAreaDetectionAll");
const SilentAreaDetectionById_1 = require("../../../Core/Define/ConfigQuery/SilentAreaDetectionById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ILevelPlay_1 = require("../../../UniverseEditor/Interface/ILevelPlay");
const ModelManager_1 = require("../../Manager/ModelManager");
class AdventureGuideConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.KQl = new Map();
    this.tDu = new Map();
  }
  OnInit() {
    var e = this.GetPreOpenDetectionConfAll();
    if (e) {
      for (const r of e) {
        if (!this.KQl.has(r.DetectionId)) {
          this.KQl.set(r.DetectionId, []);
        }
        this.KQl.get(r.DetectionId).push(r);
      }
    }
    var n;
    var e = LevelPlayInfoMappingConfigAll_1.configLevelPlayInfoMappingConfigAll.GetConfigList();
    if (e) {
      for (const t of e) {
        if (t.Type === ILevelPlay_1.ELevelPlayInfoMappingType.NightmareSpawnPoint && !(n = JSON.parse(t.Data), this.tDu.has(n.LevelPlayId))) {
          this.tDu.set(n.LevelPlayId, n);
        }
      }
    }
    return true;
  }
  GetPreOpenDetectionConfListByDetectionId(e, n) {
    var e = this.KQl.get(e);
    var r = [];
    if (e) {
      for (const t of e) {
        if (t.SoundAreaType === n) {
          r.push(t);
        }
      }
    }
    return r;
  }
  GetPreOpenDetectionConfList(e, n, r) {
    e = this.GetPreOpenDetectionConfListByDetectionId(e, n);
    if (e.length === 0 && r !== 0 && (n = this.GetPreOpenDetectionConfById(r))) {
      e.push(n);
    }
    return e;
  }
  GetAdventureTaskConfig(e) {
    return AdventureTaskById_1.configAdventureTaskById.GetConfig(e);
  }
  GetAllAdventureTaskConfig() {
    return AdventureTaskAll_1.configAdventureTaskAll.GetConfigList();
  }
  GetDropShowInfo(e) {
    return DropPackageById_1.configDropPackageById.GetConfig(e).DropPreview;
  }
  GetShowReward(n, r) {
    var t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    let o = 0;
    if (r) {
      if (n.has(r)) {
        o = n.get(r);
      } else {
        for (let e = r - 1; e >= 0; e--) {
          if (n.has(e)) {
            o = n.get(e);
            break;
          }
        }
      }
    } else if (n.has(t)) {
      o = n.get(t);
    } else {
      for (let e = t - 1; e >= 0; e--) {
        if (n.has(e)) {
          o = n.get(e);
          break;
        }
      }
    }
    if (o > 0) {
      const e = DropPackageById_1.configDropPackageById.GetConfig(o);
      if (e) {
        return e.DropPreview;
      }
    }
    const e = DropPackageById_1.configDropPackageById.GetConfig(n.get(1));
    return e.DropPreview;
  }
  GetChapterAdventureConfig(e) {
    return AdventureTaskChapterById_1.configAdventureTaskChapterById.GetConfig(e);
  }
  GetAllMonsterDetection() {
    return MonsterDetectionAll_1.configMonsterDetectionAll.GetConfigList();
  }
  GetAllDungeonDetection() {
    return DungeonDetectionAll_1.configDungeonDetectionAll.GetConfigList();
  }
  GetAllSilentAreaDetection() {
    return SilentAreaDetectionAll_1.configSilentAreaDetectionAll.GetConfigList();
  }
  GetMonsterDetectionConfById(e) {
    return MonsterDetectionById_1.configMonsterDetectionById.GetConfig(e);
  }
  GetDungeonDetectionConfById(e) {
    return DungeonDetectionById_1.configDungeonDetectionById.GetConfig(e);
  }
  GetSilentAreaDetectionConfById(e) {
    return SilentAreaDetectionById_1.configSilentAreaDetectionById.GetConfig(e);
  }
  GetMaxChapter() {
    var e = ConfigCommon_1.ConfigCommon.ToList(AdventureTaskChapterAll_1.configAdventureTaskChapterAll.GetConfigList());
    e.sort((e, n) => n.Id - e.Id);
    return e[0].Id;
  }
  GetMaxDungeonLevel(e) {
    let n = 0;
    for (const t of InstanceDungeonEntranceById_1.configInstanceDungeonEntranceById.GetConfig(e).InstanceDungeonList) {
      var r = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(t);
      var r = r.DifficultyLevel[r.DifficultyLevel.length - 1];
      if (r > n) {
        n = r;
      }
    }
    return n;
  }
  GetSecondaryGuideDataTextById(e) {
    return SecondaryGuideDataById_1.configSecondaryGuideDataById.GetConfig(e).Text;
  }
  GetSecondaryGuideDataConf(e) {
    return SecondaryGuideDataById_1.configSecondaryGuideDataById.GetConfig(e);
  }
  GetLocalFilterTextById(e) {
    e = SecondaryGuideDataById_1.configSecondaryGuideDataById.GetConfig(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Text) ?? "";
  }
  GetPreOpenDetectionConfById(e) {
    return PreOpenDetectionById_1.configPreOpenDetectionById.GetConfig(e);
  }
  GetPreOpenDetectionConfAll() {
    return PreOpenDetectionAll_1.configPreOpenDetectionAll.GetConfigList();
  }
  GetDropDownConfig(e) {
    return DetectionDropDownTypeById_1.configDetectionDropDownTypeById.GetConfig(e);
  }
  GetLevelPlayNightMareConfig(e) {
    return this.tDu.get(e);
  }
}
exports.AdventureGuideConfig = AdventureGuideConfig;
//# sourceMappingURL=AdventureConfig.js.map