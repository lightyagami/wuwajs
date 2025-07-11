"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingData = undefined;
const MultiTextLang_1 = require("../../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
class BuildingData {
  constructor(t) {
    this.Id = t;
    this.Level = 0;
    this.IsUnlock = false;
  }
  get IsBuild() {
    return this.Level > 0;
  }
  GetBuildingName() {
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.Id);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
  }
  GetConsumeCount() {
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.Id);
    if (this.Level === 0) {
      return t.UnLockPrice;
    } else {
      return ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingUpGradeCurveByGroupIdAndLevel(t.UpGradeCurve, this.Level).UpGradePrice;
    }
  }
  bJs(t, e) {
    return {
      TextId: t,
      ValueText: e
    };
  }
  GetAdditionDataList(t) {
    var t = MathUtils_1.MathUtils.Clamp(t, 1, this.LevelMax);
    var e = [];
    var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.Id);
    var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingUpGradeCurveByGroupIdAndLevel(i.UpGradeCurve, t);
    if (i.GoldAddition !== 0) {
      t = i.GoldAddition / 10 + "%";
      e.push(this.bJs("Moonfiesta_UP1", t));
    }
    if (i.GoldAdditionFix !== 0) {
      e.push(this.bJs("Moonfiesta_UP7", i.GoldAdditionFix.toString()));
    }
    if (i.WishAdditionFix !== 0) {
      e.push(this.bJs("Moonfiesta_UP2", i.WishAdditionFix.toString()));
    }
    if (i.EnergyAddition !== 0) {
      t = i.EnergyAddition / 10 + "%";
      e.push(this.bJs("Moonfiesta_UP3", t));
    }
    if (i.IdeaRatioAddition !== 0) {
      t = i.IdeaRatioAddition / 10 + "%";
      e.push(this.bJs("Moonfiesta_UP4", t));
    }
    if (i.SuccessAddition !== 0) {
      t = i.SuccessAddition / 10 + "%";
      e.push(this.bJs("Moonfiesta_UP5", t));
    }
    if (i.HeatAddition !== 0) {
      e.push(this.bJs("Moonfiesta_UP6", i.HeatAddition.toString()));
    }
    return e;
  }
  GetLevelUpIncreaseDesc() {
    var t = this.GetAdditionDataList(this.Level);
    if (t.length < 1) {
      return StringUtils_1.EMPTY_STRING;
    } else {
      t = t[0];
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.TextId) + " " + t.ValueText;
    }
  }
  GetAssociateRoleId() {
    return ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.Id).AssociateRole;
  }
  get IsCanLevelUp() {
    var t = this.GetConsumeCount();
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    return t <= ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
  }
  get LevelMax() {
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.Id);
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingUpGradeCurveByGroupId(t.UpGradeCurve);
    return t[t.length - 1].Level;
  }
  get IsMax() {
    return this.Level >= this.LevelMax;
  }
  get IsAvailableLevelUp() {
    return this.IsBuild && !this.IsMax;
  }
}
exports.BuildingData = BuildingData;
//# sourceMappingURL=BuildingData.js.map