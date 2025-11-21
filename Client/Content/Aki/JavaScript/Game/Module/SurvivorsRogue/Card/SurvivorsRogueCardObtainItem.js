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
    var s = (this.GoodData = e).VTd;
    switch (s.R5n) {
      case "kTd":
        await this.Swd(s, r);
        break;
      case "qTd":
        await this.Mwd(s, r);
        break;
      case "xTd":
        await this.Ewd(s, r);
        break;
      case "UTd":
        await this.Iwd(s, r);
    }
    this.SetSelected(a, false, true);
  }
  async Swd(e, a) {
    var r = e.kTd;
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
  async Mwd(e, a) {
    var r = e.qTd;
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
  async Ewd(e, a) {
    var r = e.v9n;
    var s = e.xTd;
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
  async Iwd(e, a) {
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
    return e.VTd.w5n;
  }
}
exports.SurvivorsRogueCardObtainItem = SurvivorsRogueCardObtainItem;
//# sourceMappingURL=SurvivorsRogueCardObtainItem.js.map