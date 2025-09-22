"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardObtainItem = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SurvivorsRogueCardScrollItemBase_1 = require("./SurvivorsRogueCardScrollItemBase");
class SurvivorsRogueCardObtainItem extends SurvivorsRogueCardScrollItemBase_1.SurvivorsRogueCardScrollItemBase {
  constructor() {
    super(...arguments);
    this.GoodData = undefined;
  }
  async RefreshAsync(e, a, r) {
    var s = (this.GoodData = e).fEd;
    switch (s.R5n) {
      case "lEd":
        await this.XTd(s, r);
        break;
      case "uEd":
        await this.YTd(s, r);
        break;
      case "sEd":
        await this.zTd(s, r);
        break;
      case "aEd":
        await this.JTd(s, r);
    }
    this.SetSelected(a, false, true);
  }
  async XTd(e, a) {
    var r = e.lEd;
    var s = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(r.Q6n);
    var o = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleLv(e.v9n);
    var s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(s.TrialRoleId);
    var r = {
      Type: 2,
      Id: r.Q6n,
      IncId: e.w5n,
      Index: a,
      QualityId: o.Quality,
      TitleText: s.GetName(),
      DescId: o.Describe,
      UseToggle: true,
      IsLevelUp: true,
      PropertyId: o.PropertyId,
      LvUpCount: o.Level,
      TagVisible: false
    };
    await this.Apply(r);
  }
  async YTd(e, a) {
    var r = e.uEd;
    var s = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(r.zys);
    var o = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponLv(e.v9n);
    var r = {
      Type: 1,
      Id: r.zys,
      IncId: e.w5n,
      Index: a,
      QualityId: o.Quality,
      TitleId: s.Name,
      DescId: o.Describe,
      UseToggle: true,
      IsLevelUp: true,
      PropertyId: o.PropertyId,
      LvUpCount: o.Level,
      TagVisible: false
    };
    await this.Apply(r);
  }
  async zTd(e, a) {
    var r = e.v9n;
    var s = e.sEd;
    var o = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(r);
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponDefaultEvolve(r);
    var r = {
      Type: 1,
      Id: r,
      IncId: e.w5n,
      Index: a,
      QualityId: i.Quality,
      TitleId: o.Name,
      DescId: i.Describe,
      UseToggle: true,
      TagId: "SurvivorsCard_WeaponLvTag",
      TagParams: [s.F6n.toString()],
      IsLevelUp: false,
      WeaponBondInfo: true
    };
    await this.Apply(r);
  }
  async JTd(e, a) {
    var r = e.v9n;
    var s = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsItem(r);
    var r = {
      Type: 0,
      Id: r,
      IncId: e.w5n,
      Index: a,
      QualityId: s.Quality,
      TitleId: s.Name,
      DescId: s.Desc,
      UseToggle: true,
      IsLevelUp: false
    };
    await this.Apply(r);
  }
  OnSelected(e) {
    this.SetSelected(true, e);
  }
  OnDeselected(e) {
    this.SetSelected(false, e);
  }
  GetKey(e, a) {
    return e.fEd.w5n;
  }
}
exports.SurvivorsRogueCardObtainItem = SurvivorsRogueCardObtainItem;
//# sourceMappingURL=SurvivorsRogueCardObtainItem.js.map