"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridDangoPluginIconComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const DangoAbyssDefine_1 = require("../../../Dango/DangoAbyss/DangoAbyssDefine");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridDangoPluginIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  GetLayoutLevel() {
    return 2;
  }
  GetResourceId() {
    return "UiItem_ItemChipIcon";
  }
  RefreshByInfo(e) {
    this.OnRefresh(e);
  }
  OnRefresh(e) {
    var n;
    var o;
    var e = e.PluginItemId;
    var i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemQualityIcon(e);
    if (i && e !== "") {
      o = i.SlotType;
      n = this.GetTexture(1);
      o = DangoAbyssDefine_1.iconSizeBySlotType.get(o);
      n.SetWidth(o);
      n.SetHeight(o);
      this.SetTextureByPath(e, this.GetTexture(0));
      this.SetTextureByPath(i.IconMiddle, n);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.MediumItemGridDangoPluginIconComponent = MediumItemGridDangoPluginIconComponent;
//# sourceMappingURL=MediumItemGridDangoPluginIconComponent.js.map