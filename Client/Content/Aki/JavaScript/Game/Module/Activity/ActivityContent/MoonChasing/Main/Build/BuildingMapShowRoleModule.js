"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingMapShowRoleModule = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class BuildingMapShowRoleModule extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UITexture], [11, UE.UITexture], [12, UE.UITexture]];
  }
  GetRoleTextureList() {
    var e = [];
    e.push(this.GetTexture(0));
    e.push(this.GetTexture(1));
    e.push(this.GetTexture(2));
    e.push(this.GetTexture(3));
    e.push(this.GetTexture(4));
    e.push(this.GetTexture(5));
    e.push(this.GetTexture(6));
    e.push(this.GetTexture(7));
    e.push(this.GetTexture(8));
    e.push(this.GetTexture(9));
    e.push(this.GetTexture(10));
    e.push(this.GetTexture(11));
    e.push(this.GetTexture(12));
    return e;
  }
  async OnBeforeStartAsync() {
    var e = this.GetRoleTextureList();
    var i = [];
    for (const t of ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList(true)) {
      var s = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(t.Id);
      var a = e[s.MapSortId - 1];
      a.SetUIActive(t.IsOwn);
      if (t.IsOwn) {
        s = this.SetTextureAsync(s.Portrait, a);
        i.push(s);
      }
    }
    await Promise.all(i);
  }
}
exports.BuildingMapShowRoleModule = BuildingMapShowRoleModule;
//# sourceMappingURL=BuildingMapShowRoleModule.js.map