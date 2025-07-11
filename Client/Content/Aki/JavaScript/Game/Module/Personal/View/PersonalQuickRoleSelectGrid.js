"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalQuickRoleSelectGrid = undefined;
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TeamRoleGrid_1 = require("../../RoleSelect/TeamRoleGrid");
class PersonalQuickRoleSelectGrid extends TeamRoleGrid_1.TeamRoleGrid {
  OnRefresh(e, o, a) {
    var r = e.GetLevelData();
    var t = e.GetDataId();
    var l = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(t);
    var i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleOriginalSkinData(t);
    var d = this.IsHighlightIndex?.(l);
    var i = {
      Type: 2,
      ItemConfigId: t,
      SkinId: i.GetItemId(),
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [r.GetLevel()],
      Index: l > 0 ? l : undefined,
      HighlightIndex: d,
      ElementId: e.GetRoleConfig().ElementId,
      Data: e,
      IsNewVisible: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem, t)
    };
    this.Apply(i);
    var r = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(t);
    this.SetSelected(r, true);
  }
}
exports.PersonalQuickRoleSelectGrid = PersonalQuickRoleSelectGrid;
//# sourceMappingURL=PersonalQuickRoleSelectGrid.js.map