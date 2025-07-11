"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandbookDisplayGrid = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const WorldMapController_1 = require("../../../../../WorldMap/WorldMapController");
const MoonChasingController_1 = require("../MoonChasingController");
class HandbookDisplayGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.MCt = 0;
    this.NIa = undefined;
    this.Lxt = () => {
      var i;
      if (this.NIa.IsUnlock) {
        if (this.MCt <= 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MoonChasing", 58, "HandbookDisplayGrid 无效markId");
          }
        } else {
          i = {
            MarkId: this.MCt,
            MarkType: 0
          };
          WorldMapController_1.WorldMapController.OpenView(2, false, i);
        }
      } else if (UiManager_1.UiManager.IsViewOpen("MoonChasingMainView")) {
        MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(this.NIa.Id);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Moonfiesta_BuildingUnlock");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UITexture]];
    this.BtnBindInfo = [[3, this.Lxt]];
  }
  Refresh(i, r, o) {
    this.NIa = i;
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i.Id);
    this.Aqe(e.BuildingTexture, i.IsUnlock);
    this.h7s(true);
    if (i.IsUnlock) {
      this.l7s(e.Name);
    } else {
      this.GetText(2).SetText("???");
    }
    this.GetItem(4).SetUIActive(i.IsUnlock);
    this.GetItem(5).SetUIActive(!i.IsUnlock);
    this.GetButton(3).RootUIComp.SetUIActive(i.IsUnlock);
    this.MCt = e.MapMarkId;
  }
  Aqe(i, r) {
    const o = this.GetTexture(0);
    const e = this.GetTexture(6);
    o.SetUIActive(false);
    e.SetUIActive(false);
    if (i) {
      this.SetTextureByPath(i, o, undefined, () => {
        o.SetUIActive(true);
      });
      this.SetTextureByPath(i, e, undefined, () => {
        e.SetUIActive(!r);
      });
    }
  }
  h7s(i) {
    this.GetItem(1).SetUIActive(i);
  }
  l7s(i) {
    this.GetText(2).ShowTextNew(i);
  }
}
exports.HandbookDisplayGrid = HandbookDisplayGrid;
//# sourceMappingURL=HandbookDisplayGrid.js.map