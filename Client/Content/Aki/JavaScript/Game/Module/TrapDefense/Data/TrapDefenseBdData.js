"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TrapDefenseBdBuffData_1 = require("./TrapDefenseBdBuffData");
class TrapDefenseBdData {
  constructor(t) {
    this.Id = 0;
    this.Config = undefined;
    this.SumProgress = 1;
    this.BdBuffDataList = [];
    this.BdBuffDataMap = new Map();
    this.PreAddedBdBuffData = undefined;
    this.IsUnlock = false;
    this.Id = t;
  }
  static Create(t) {
    var e = new TrapDefenseBdData(t.Id);
    e.Config = t;
    e.AU();
    return e;
  }
  AU() {
    for (const e of ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBdGroupListByBdId(this.Id)) {
      var t = TrapDefenseBdBuffData_1.TrapDefenseBdBuffData.Create(e);
      this.BdBuffDataList.push(t);
      this.BdBuffDataMap.set(e.Id, t);
    }
    this.SumProgress = this.Config.GoldBuffCount;
  }
  IsActive() {
    return this.BdBuffDataList.some(t => t.IsActive);
  }
  SetUnlock(t) {
    this.IsUnlock = t;
  }
  IsUnlockInTheUi() {
    return !!ModelManager_1.ModelManager.TrapDefenseModel?.ViewModelBdSum.IsInstance || this.IsUnlock;
  }
  GetGoldQualityBuffDataList() {
    return this.GetQualityBuffDataList(5);
  }
  GetQualityBuffDataList(e) {
    return this.BdBuffDataList.filter(t => t.Config.Quality === e);
  }
  GetCurrentActiveProgressNum() {
    return this.BdBuffDataList.reduce((t, e) => t + e.GetActiveBdProgressNum(), 0);
  }
  GetBdProgressInfoList() {
    var e = [];
    var r = this.GetCurrentActiveProgressNum();
    var [s, i] = this.GetBdProgressArrowPos(r);
    for (let t = 0; t < this.SumProgress; t++) {
      e.push({
        BdData: this,
        IsActive: t < r,
        IsShowQualityArrow: t + 1 === s,
        QualityArrowRes: i
      });
    }
    return e;
  }
  GetBdProgressArrowPos(t) {
    if (this.Config.PurpleBuffCount > t) {
      return [this.Config.PurpleBuffCount, "SP_ArrowPurple"];
    } else {
      return [this.Config.GoldBuffCount, "SP_ArrowGold"];
    }
  }
  GetCurActiveQualityPool() {
    var t = this.GetCurrentActiveProgressNum();
    if (this.Config.PurpleBuffCount > t) {
      return 3;
    } else if (this.Config.GoldBuffCount > t) {
      return 4;
    } else {
      return 5;
    }
  }
  SetPreAddedBuff(t) {
    this.PreAddedBdBuffData = t;
  }
  PreAddedBuffIsActiveNewQuality(t) {
    if (this.IsZeroBdType()) {
      return [false, 4];
    } else {
      t = t ?? (this.PreAddedBdBuffData ? 1 : 0);
      if ((t = this.GetCurrentActiveProgressNum() + t) === this.Config.PurpleBuffCount) {
        return [true, 4];
      } else if (t === this.Config.GoldBuffCount) {
        return [true, 5];
      } else if (t < this.Config.PurpleBuffCount) {
        return [false, 3];
      } else if (t < this.Config.GoldBuffCount) {
        return [false, 4];
      } else {
        return [false, 5];
      }
    }
  }
  GetSumProgressForStageMode(t = 0) {
    if (this.GetCurrentActiveProgressNum() + t >= this.Config.PurpleBuffCount) {
      return this.Config.GoldBuffCount;
    } else {
      return this.Config.PurpleBuffCount;
    }
  }
  IsZeroBdType() {
    return this.Config.Id === 0;
  }
  GetShowActorLabelStr() {
    var t = this.Id;
    var e = this.Config.PurpleBuffCount;
    return `BdDesc_${t}_Gold-${this.Config.GoldBuffCount}_Purple-${e}_BuffLen-${this.BdBuffDataList.length}_Active-${this.IsActive()}_Unlock-${this.IsUnlock}}`;
  }
  GetBdBuffShowListForSumView() {
    if (ModelManager_1.ModelManager.TrapDefenseModel?.ViewModelBdSum.IsInstance) {
      const t = this.BdBuffDataList.filter(t => t.IsActive);
      t.sort(this.SortBdBuffQuality.bind(this));
      return t;
    }
    const t = this.BdBuffDataList;
    t.sort(this.SortBdBuffQuality.bind(this));
    return t;
  }
  SortBdBuffQuality(t, e) {
    var r = t.Config.Quality;
    var s = e.Config.Quality;
    if (r !== s) {
      return s - r;
    } else {
      return e.Id - t.Id;
    }
  }
}
exports.TrapDefenseBdData = TrapDefenseBdData;
//# sourceMappingURL=TrapDefenseBdData.js.map