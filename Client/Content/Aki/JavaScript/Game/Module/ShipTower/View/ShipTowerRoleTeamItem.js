"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerRoleTeamItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerRoleTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Vlo = [];
    this.fGt = undefined;
    this.OnClickCallback = undefined;
    this.StageData = undefined;
    this.ya_ = e => {
      this.qA_()?.SetToggleStateForce(1);
      this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite]];
    this.BtnBindInfo = [[0, this.ya_]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    for (let e = 2; e <= 4; e++) {
      var t = new MediumItemGrid_1.MediumItemGrid();
      t.Initialize(this.GetItem(e).GetOwner());
      t.SetToggleInteractive(false);
      this.Vlo.push(t);
    }
    this.qA_().bLockStateOnSelect = false;
  }
  qA_() {
    return this.GetExtendToggle(0);
  }
  Refresh(o) {
    this.fGt = o;
    let h = true;
    this.Vlo.forEach((e, t) => {
      var i;
      var r;
      var s = o.GetRoleIdList[t];
      if (s) {
        i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(s);
        r = ModelManager_1.ModelManager.ShipTowerModel.GetAllTeamRoleData(s);
        s = {
          Type: 2,
          ItemConfigId: s,
          SkinId: o.GetRoleDataByPosition(t + 1)?.RoleSkinId ?? 0,
          BottomTextId: "Text_LevelShow_Text",
          BottomTextParameter: [i.GetLevelData().GetLevel()],
          ElementId: i.GetRoleConfig().ElementId,
          HalfAreaInfo: r,
          IsTrialRoleVisible: i.IsTrialRole()
        };
        e.Apply(s);
        if (!r) {
          h = false;
        }
      } else {
        h = false;
        e.Apply({
          Type: 5
        });
      }
    });
    this.GetText(1).SetText(o.FormationId.toString());
    if (h) {
      const i = this.Vlo.map((e, t) => o.GetRoleIdList[t]);
      h = this.StageData.TeamDataList.some(e => e.GetRoleIdListEdit().every((e, t) => e === i[t]));
    }
    this.GetSprite(5)?.SetUIActive(h);
  }
  OnSelected(e) {
    this.qA_()?.SetToggleStateForce(1);
    this.OnClickCallback?.(this.fGt);
  }
  OnDeselected(e) {
    this.qA_()?.SetToggleStateForce(0);
  }
}
exports.ShipTowerRoleTeamItem = ShipTowerRoleTeamItem;
//# sourceMappingURL=ShipTowerRoleTeamItem.js.map