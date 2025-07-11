"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleVisionIdentifyAttribute = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PhantomDataBase_1 = require("../../../Phantom/PhantomBattle/Data/PhantomDataBase");
const VisionIdentifyItem_1 = require("../../../Phantom/Vision/View/VisionIdentifyItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
class RoleVisionIdentifyAttribute extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AttributeScroller = undefined;
    this.sGe = () => new VisionIdentifyItem_1.VisionIdentifyItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.AttributeScroller = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.sGe);
  }
  Refresh(e, a, i) {
    const n = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(i.RoleId, i.Cost);
    const r = n?.GetSubAttrRecommendInfo();
    const o = r ? r.length : 0;
    const s = new Array();
    e.forEach(e => {
      var i = new PhantomDataBase_1.VisionSubPropViewData();
      i.Data = e;
      i.SourceView = "VisionEquipmentView";
      i.CurrentVisionData = a;
      if (e.PhantomSubProp) {
        var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(e.PhantomSubProp.Yws);
        if (n) {
          for (let e = 0; e < o; e++) {
            if (t.AddType === r[e].GetAddType() && t.PropId === r[e].GetAttrId()) {
              i.NeedHighLight = true;
            }
          }
        }
      }
      s.push(i);
    });
    this.AttributeScroller.RefreshByData(s);
  }
}
exports.RoleVisionIdentifyAttribute = RoleVisionIdentifyAttribute;
//# sourceMappingURL=RoleVisionIdentifyAttribute.js.map