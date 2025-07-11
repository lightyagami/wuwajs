"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCardData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FloroRanchTagData_1 = require("./FloroRanchTagData");
class FloroRanchCardData {
  constructor(e) {
    this.Lo = undefined;
    this.P4e = true;
    this._mu = 0;
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
    this._mu = e;
  }
  get ConditionId() {
    return this._mu;
  }
  get IsDefaultUnlock() {
    var e = this.Lo.Race;
    return ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchRaceData(e).ConditionId === 0 && this._mu === 0;
  }
  get ConditionText() {
    var e = this.Lo.Race;
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchRaceData(e);
    if (e.IsUnLock || e.ConditionId === 0) {
      if (this.ConditionId === 0) {
        return "";
      } else {
        return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.ConditionId) ?? "";
      }
    } else {
      return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.ConditionId) ?? "";
    }
  }
  get Id() {
    return this.Lo.Id;
  }
  GetName() {
    return this.Lo.Name;
  }
  get Name() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Lo.Name);
  }
  get Desc() {
    return this.TagData.Desc;
  }
  GetCardQualityData() {
    var e = this.Lo.RarityId;
    return ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(e);
  }
  GetDeleteCost() {
    return this.Lo.Cost;
  }
  GetIcon() {
    return this.Lo.Icon;
  }
  GetRaceName() {
    var e = this.Lo.Race;
    return ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchRaceData(e).GetRaceName();
  }
  GetBasicSalary() {
    return this.Lo.Salary;
  }
  GetCardRace() {
    return this.Lo.Race;
  }
  GetCardRarity() {
    return this.Lo.RarityId;
  }
  GetCardSalary() {
    return this.Lo.Salary;
  }
  GetSpineAtlas() {
    return this.Lo.Spine;
  }
  GetSpineData() {
    return this.Lo.SpineSkeletonData;
  }
  GetEvolveItemOffsetY() {
    return this.Lo.EvolveItemOffsetY;
  }
  GetCardDefaultDirection() {
    return this.Lo.Towards;
  }
  GetCardSpecialEffect() {
    return this.Lo.SpeicalEffectshow;
  }
  get IsShowInHandBook() {
    return this.Lo.Illustration;
  }
  get IsSpecialPhantom() {
    return this.Lo.IsSpecial;
  }
  get Video() {
    return this.Lo.Video;
  }
  get HasNewLabel() {
    return !this.IsDefaultUnlock && !(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot) ?? new Set()).has(this.Id);
  }
}
exports.FloroRanchCardData = FloroRanchCardData;
//# sourceMappingURL=FloroRanchCardData.js.map