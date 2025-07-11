"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingNormalTechCostItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class FishingNormalTechCostItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ETt = 0;
    this.TTt = e => {
      for (const t of e) {
        if (this.ETt === t.s5n) {
          this.Jbi();
          return;
        }
      }
    };
    this.LTt = e => {
      if (e.includes(this.ETt)) {
        this.Jbi();
      }
    };
    this.DTt = (e, t, i) => {
      if (this.ETt === e.s5n) {
        this.Jbi();
      }
    };
    this.YP = () => {
      if (this.ETt) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  OnStart() {
    this.dde();
  }
  OnBeforeDestroy() {
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveCommonItem, this.LTt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.DTt);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveCommonItem, this.LTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.DTt);
  }
  Refresh(e, t, i) {
    this.ETt = e;
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    if (e) {
      this.SetTextureByPath(e.IconSmall, this.GetTexture(2));
      e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ETt);
      this.GetText(3).SetText("" + e);
    }
  }
  Jbi() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ETt);
    this.GetText(3).SetText("" + e);
  }
}
exports.FishingNormalTechCostItem = FishingNormalTechCostItem;
//# sourceMappingURL=FishingNormalTechCostItem.js.map