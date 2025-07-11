"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerMonsterItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerElementItem_1 = require("./TowerElementItem");
class TowerMonsterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.Mli = undefined;
    this.jli = () => {
      return new TowerElementItem_1.TowerElementItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.jli);
  }
  Refresh(e, t, r) {
    var i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e);
    this.SetTextureByPath(i, this.GetTexture(2));
    var i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e).ElementIdArray;
    this.Mli?.RefreshByData(i);
    var i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(e);
    this.GetText(0).SetText(i);
    var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor);
    var i = e.InstanceId;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(i, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_InstanceDungeonRecommendLevel_Text", e);
  }
  SetLevelText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_InstanceDungeonRecommendLevel_Text", e);
  }
}
exports.TowerMonsterItem = TowerMonsterItem;
//# sourceMappingURL=TowerMonsterItem.js.map