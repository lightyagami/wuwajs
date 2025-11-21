"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardDataFactory = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class SurvivorsRogueCardDataFactory {
  static CreateGeneralItem(e) {
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsItem(e);
    if (r) {
      return {
        Type: 0,
        Id: e,
        Index: 0,
        QualityId: r.Quality,
        TitleId: r.Name,
        DescId: r.Desc
      };
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 无法创建对应卡片数据类,无道具配置", ["Id", e]);
    }
  }
  static CreateGeneralCharacter(e) {
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e);
    if (r) {
      r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r.TrialRoleId);
      if (r) {
        var o = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleDefaultEvolve(e);
        if (o) {
          return {
            Type: 2,
            Id: e,
            Index: 0,
            QualityId: o.Quality,
            TitleText: r.GetName(),
            DescId: o.Describe
          };
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 无法创建对应卡片数据类,查找不到角色默认进化id", ["Id", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 无法创建对应卡片数据类,无试用角色数据", ["Id", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 无法创建对应卡片数据类,无角色配置", ["Id", e]);
    }
  }
  static CreateGeneralWeapon(e) {
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e);
    if (r) {
      var o = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponDefaultEvolve(e);
      if (o) {
        return {
          Type: 1,
          Id: e,
          Index: 0,
          QualityId: o.Quality,
          TitleId: r.Name,
          DescId: o.Describe
        };
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 无法创建对应卡片数据类,查找不到武器默认进化id", ["Id", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 无法创建对应卡片数据类,无武器配置", ["Id", e]);
    }
  }
}
exports.SurvivorsRogueCardDataFactory = SurvivorsRogueCardDataFactory;
//# sourceMappingURL=SurvivorsRogueCardDataFactory.js.map