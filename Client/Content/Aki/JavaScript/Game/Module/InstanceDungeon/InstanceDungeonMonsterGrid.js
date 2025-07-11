"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonMonsterGrid = undefined;
const ue_1 = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const TowerElementItem_1 = require("../TowerDetailUi/View/TowerElementItem");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDungeonMonsterGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.CurrentInstanceId = 0;
    this.V1i = 0;
    this.Mli = undefined;
    this.jli = () => {
      return new TowerElementItem_1.TowerElementItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIText], [2, ue_1.UITexture], [3, ue_1.UIHorizontalLayout]];
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.jli);
  }
  Refresh(e, r, t) {
    this.V1i = e;
    var i;
    var n = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(this.V1i);
    this.GetText(0).SetText(n);
    let a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.CurrentInstanceId).EntityLevel;
    if (!a) {
      n = this.CurrentInstanceId;
      i = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
      [s, o] = ModelManager_1.ModelManager.ActivityModel.CheckActivityLevelBelongToType(n);
      a = s ? ModelManager_1.ModelManager.ActivityModel.GetActivityLevelRecommendLevel(n, i, o) : ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(n, i);
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "LevelText", a);
    var s = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(this.V1i);
    this.SetTextureByPath(s, this.GetTexture(2));
    var o = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e).ElementIdArray;
    this.Mli?.RefreshByData(o);
  }
}
exports.InstanceDungeonMonsterGrid = InstanceDungeonMonsterGrid;
//# sourceMappingURL=InstanceDungeonMonsterGrid.js.map