"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerRecommendItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PERCENT = 0.01;
class TowerRecommendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.tFe = undefined;
    this.tRo = undefined;
    this.nFe = (e, t, r) => {
      var i = new MediumItemGrid_1.MediumItemGrid();
      i.Initialize(t.GetOwner());
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.Q6n);
      var t = {
        Type: 2,
        ItemConfigId: e.Q6n,
        SkinId: t.SkinId,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [e.F6n],
        ElementId: t.ElementId,
        IsDisable: !this.iRo(e)
      };
      i.Apply(t);
      return {
        Key: r,
        Value: i
      };
    };
    this.oRo = () => {
      EditBattleTeamController_1.EditBattleTeamController.ResetSlotDataThenSetEditBattleTeamByRoleId(this.tRo);
      UiManager_1.UiManager.CloseView("TowerRecommendView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIInteractionGroup], [2, UE.UIText], [3, UE.UIText], [4, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[0, this.oRo]];
  }
  OnStart() {
    this.tRo = [];
  }
  Refresh(e, t, r) {
    this.GetText(2).SetText("" + (r + 1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Text_ExplorationDegree_Text", MathUtils_1.MathUtils.GetFloatPointFloorString(e.PGs * PERCENT, 2));
    this.tFe = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(4), this.nFe);
    var i = [];
    for (const a of e.ajn) {
      i.push(a);
    }
    i.sort((e, t) => {
      var r;
      var i;
      if (e.F6n === t.F6n) {
        if ((r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.Q6n).QualityId) === (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.Q6n).QualityId)) {
          return t.Q6n - e.Q6n;
        } else {
          return i - r;
        }
      } else {
        return t.F6n - e.F6n;
      }
    });
    this.tFe.RebuildLayoutByDataNew(i);
  }
  iRo(e) {
    e = e.Q6n;
    if (ModelManager_1.ModelManager.RoleModel.IsMainRole(e)) {
      var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
      if (ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)?.ElementId !== ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)?.GetElementInfo()?.Id) {
        this.GetInteractionGroup(1).SetInteractable(false);
        return false;
      }
      this.tRo.push(t);
    } else {
      if (!ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)) {
        this.GetInteractionGroup(1).SetInteractable(false);
        return false;
      }
      this.tRo.push(e);
    }
    return true;
  }
  OnBeforeDestroy() {
    this.tRo.length = 0;
    this.tFe = undefined;
  }
}
exports.TowerRecommendItem = TowerRecommendItem;
//# sourceMappingURL=TowerRecommendItem.js.map