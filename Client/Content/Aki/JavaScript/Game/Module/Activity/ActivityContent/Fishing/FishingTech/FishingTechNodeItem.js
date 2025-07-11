"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingTechNodeItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class FishingTechNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PRr = undefined;
    this.OnClickToggleBack = undefined;
    this.kqe = () => {
      this.OnClickToggleBack?.(this.PRr, this.GetExtendToggle(0));
    };
    this.J9_ = () => {
      this.GetExtendToggle(0).SetToggleState(1, false);
      this.OnClickToggleBack?.(this.PRr, this.GetExtendToggle(0));
    };
    this.th_ = e => {
      if (this.PRr?.ConfigId === e || this.PRr?.PreNode === e) {
        this.RefreshNode(this.PRr);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh, this.PRr?.ConfigId);
      }
    };
  }
  get CurrentNode() {
    return this.PRr;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFishingTechNodeRefresh, this.th_);
    this.GetExtendToggle(0)?.OnUndeterminedClicked.Add(this.J9_);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFishingTechNodeRefresh, this.th_);
    RedDotController_1.RedDotController.UnBindGivenUi("FishingNormalTechNode", this.GetItem(3), this.PRr.ConfigId);
  }
  SelectNode() {
    this.GetExtendToggle(0).SetToggleState(1, false);
    this.OnClickToggleBack?.(this.PRr, this.GetExtendToggle(0));
  }
  RefreshNode(e) {
    if (e) {
      if (this.PRr) {
        RedDotController_1.RedDotController.UnBindGivenUi("FishingNormalTechNode", this.GetItem(3), this.PRr.ConfigId);
      }
      this.PRr = e;
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(this.PRr.ConfigId);
      this.SetTextureByPath(e.Icon, this.GetTexture(1));
      e = ModelManager_1.ModelManager.FishingModel.GetNodePreNodeUnlock(this.PRr.ConfigId);
      this.GetItem(2).SetUIActive(!e);
      if (ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(this.PRr.ConfigId)) {
        this.GetExtendToggle(0).SetToggleState(0);
      } else {
        this.GetExtendToggle(0).SetToggleState(2);
      }
      RedDotController_1.RedDotController.BindRedDot("FishingNormalTechNode", this.GetItem(3), undefined, this.PRr.ConfigId);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh, this.PRr?.ConfigId);
    }
  }
}
exports.FishingTechNodeItem = FishingTechNodeItem;
//# sourceMappingURL=FishingTechNodeItem.js.map