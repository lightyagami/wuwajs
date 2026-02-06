"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrArchiveCollectCardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const InfrastructureController_1 = require("../../InfrastructureController");
class InfrArchiveCollectCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ZLf = 0;
    this.f5m = () => {
      var r = ConfigManager_1.ConfigManager.InfrastructureConfig.GetArchiveItemConfig(this.ZLf);
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r.ItemId) > 0;
      if (r && e) {
        if (ModelManager_1.ModelManager.InfrastructureModel.GetArchiveIsUnRead(this.ZLf)) {
          InfrastructureController_1.InfrastructureController.RequestInfrArchiveReadRequest([this.ZLf]);
        }
        ControllerHolder_1.ControllerHolder.InfoDisplayController.OpenInfoDisplay(r.InfoDisplayId, undefined, undefined, false, UiLayerType_1.ELayerType.Pop);
      }
    };
    this.g5m = () => {
      var r = ConfigManager_1.ConfigManager.InfrastructureConfig.GetArchiveItemConfig(this.ZLf);
      if (r) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(r.AccessPath);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIText], [8, UE.UITexture], [9, UE.UIItem], [10, UE.UINiagara]];
    this.BtnBindInfo = [[0, this.f5m], [4, this.g5m]];
  }
  Refresh(r) {
    this.ZLf = r;
    this.C5m();
  }
  C5m() {
    var r = ConfigManager_1.ConfigManager.InfrastructureConfig.GetArchiveItemConfig(this.ZLf);
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r.ItemId) > 0;
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r.ItemId);
    this.GetItem(1).SetUIActive(!e);
    this.GetItem(5).SetUIActive(e);
    this.SetTextureByPath(i.Icon, this.GetTexture(2));
    this.SetTextureByPath(i.Icon, this.GetTexture(6));
    this.GetText(7).ShowTextNew(i.Name);
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetArchiveItemQualityPath(i.QualityId);
    this.SetTextureByPath(e, this.GetTexture(8));
    this.GetItem(9).SetUIActive(ModelManager_1.ModelManager.InfrastructureModel.GetArchiveIsUnRead(this.ZLf));
    this.GetUiNiagara(10).SetNiagaraVarInt("Subuv", r.EffectId);
  }
}
exports.InfrArchiveCollectCardItem = InfrArchiveCollectCardItem;
//# sourceMappingURL=InfrArchiveCollectCardItem.js.map