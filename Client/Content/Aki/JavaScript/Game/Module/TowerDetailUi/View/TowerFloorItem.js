"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerFloorItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TowerData_1 = require("../TowerData");
const TowerModel_1 = require("../TowerModel");
const TowerRoleSimpleItem_1 = require("./TowerRoleSimpleItem");
const TowerStarsSimpleItem_1 = require("./TowerStarsSimpleItem");
class TowerFloorItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.IDo = undefined;
    this.TDo = -1;
    this.Rjt = false;
    this.BDo = -1;
    this.$be = undefined;
    this.tFe = undefined;
    this.kqe = e => {
      if (this.IDo && e === 1) {
        this.IDo(this.TDo, this.Rjt);
      }
    };
    this.vke = () => {
      return new TowerStarsSimpleItem_1.TowerStarsSimpleItem();
    };
    this.nFe = () => {
      return new TowerRoleSimpleItem_1.TowerRoleSimpleItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIHorizontalLayout], [5, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.vke);
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.nFe);
    this.SetToggleState(0);
  }
  Refresh(e, t, i) {
    this.TDo = e;
    this.Rjt = !ModelManager_1.ModelManager.TowerModel.GetFloorIsUnlock(this.TDo);
    var r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
    this.GetText(2).SetText("" + r.Floor);
    var o = ModelManager_1.ModelManager.TowerModel.GetFloorData(this.TDo);
    this.BDo = o?.Star ?? 0;
    var s = [];
    for (let e = 1; e <= TowerModel_1.FLOOR_STAR; e++) {
      s.push(this.BDo >= e);
    }
    this.$be.RefreshByData(s);
    var h = [];
    if (o) {
      for (const a of o.Formation) {
        h.push(a.Q6n);
      }
    }
    while (h.length < TowerData_1.TOWER_TEAM_MAX_NUMBER) {
      h.push(0);
    }
    this.tFe.RefreshByData(h);
    this.SetTextureByPath(r.ItemBgPath, this.GetTexture(1));
    if (this.Rjt) {
      this.GetExtendToggle(5).SetToggleState(2);
    } else {
      this.GetExtendToggle(5).SetToggleState(0);
    }
    if (ModelManager_1.ModelManager.TowerModel.DefaultFloor === e) {
      this.SetToggleState(1);
    }
  }
  BindOnClickToggle(e) {
    this.IDo = e;
  }
  OnBeforeDestroy() {
    this.IDo = undefined;
    this.$be = undefined;
    this.tFe = undefined;
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e);
  }
}
exports.TowerFloorItem = TowerFloorItem;
//# sourceMappingURL=TowerFloorItem.js.map