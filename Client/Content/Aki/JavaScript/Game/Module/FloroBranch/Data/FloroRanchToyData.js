"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchToyData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FloroRanchTagData_1 = require("./FloroRanchTagData");
class FloroRanchToyData {
  constructor(e) {
    this.Lo = undefined;
    this.P4e = true;
    this.Qmu = 0;
    this.TagData = new FloroRanchTagData_1.FloroRanchTagData();
    this.Lo = e;
    this.TagData.SetTagId(this.Lo.Tag);
  }
  UpdateUnLockState(e) {
    this.P4e = e;
  }
  get IsUnLock() {
    return this.P4e;
  }
  set ConditionId(e) {
    this.Qmu = e;
  }
  get ConditionId() {
    return this.Qmu;
  }
  get ConditionText() {
    if (this.ConditionId === 0) {
      return "";
    } else {
      return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.ConditionId) ?? "";
    }
  }
  get Id() {
    return this.Lo.Id;
  }
  GetToyType() {
    return this.Lo.Type;
  }
  GetName() {
    return this.Lo.Name;
  }
  get Name() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Lo.Name);
  }
  GetToyQualityData() {
    var e = this.Lo.RarityId;
    return ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(e);
  }
  GetDeleteEarn() {
    return this.Lo.Remove;
  }
  GetIcon() {
    return this.Lo.Icon;
  }
  GetIsUnique() {
    return this.Lo.Unique;
  }
  get Desc() {
    return this.TagData.Desc;
  }
  GetRarity() {
    return this.Lo.RarityId;
  }
  get IsAdaptAllRace() {
    return this.Lo.Race.length === 0;
  }
  GetRace() {
    var e = this.Lo.Race;
    if (e.length === 0) {
      return -1;
    } else {
      return e[0];
    }
  }
  GetToyRaceData() {
    var e = this.GetRace();
    if (e !== -1) {
      var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
      if (t) {
        return t.GetFloroRanchRaceData(e);
      }
    }
  }
}
exports.FloroRanchToyData = FloroRanchToyData;
//# sourceMappingURL=FloroRanchToyData.js.map