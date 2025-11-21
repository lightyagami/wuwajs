"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryEquipItemInfoItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class HonamiStoryEquipItemInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIText]];
  }
  Refresh(e, i, t) {
    var r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryBuffTemp(e.BuffId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "HonamiStory_EquipEffect", new LguiUtil_1.TableTextArgNew(r.Name));
    this.GetText(0).SetChangeColor(true, this.GetText(0).changeColor);
    let a = false;
    e = (a = e.FromTeamView ? ModelManager_1.ModelManager.RoleModel.IsShowSkillResume : ModelManager_1.ModelManager.HonamiStoryModel.GetSkillDescMode()) ? r.DescSimple : r.Desc;
    r = a ? r.DescSimpleArgs : r.DescArgs;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, ...r);
    this.GetText(1).SetChangeColor(true, this.GetText(1).changeColor);
    this.GetSprite(2).SetUIActive(true);
    this.GetSprite(3).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetText(6).SetUIActive(false);
  }
}
exports.HonamiStoryEquipItemInfoItem = HonamiStoryEquipItemInfoItem;
//# sourceMappingURL=HonamiStoryEquipItemInfoItem.js.map