"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRoleTechItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class FishingRoleTechItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnClickToggleBack = undefined;
    this.Node = undefined;
    this.kqe = () => {
      this.OnClickToggleBack?.(this.Node, this.GetExtendToggle(6));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIExtendToggle], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIScrollbarComponent]];
    this.BtnBindInfo = [[6, this.kqe]];
  }
  OnStart() {
    this.GetItem(3).SetUIActive(false);
  }
  Refresh(e, t, i) {
    var r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e.ConfigId);
    if (r) {
      if (this.Node) {
        RedDotController_1.RedDotController.UnBindGivenUi("FishingRoleTechNode", this.GetItem(8));
      }
      this.Node = e;
      this.GetScrollScrollbar(9).SetValue(0);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh, this.Node?.ConfigId);
      RedDotController_1.RedDotController.BindRedDot("FishingRoleTechNode", this.GetItem(8), undefined, this.Node.ConfigId);
      this.SetTextureByPath(r.Icon, this.GetTexture(5));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r.Name);
      var e = ModelManager_1.ModelManager.FishingModel.GetTechNodeCurrentLevel(e.ConfigId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "PrefabTextItem_3692737534_Text", e);
      var s = r.Effect.length;
      if (s <= e) {
        this.GetItem(4).SetUIActive(true);
        this.GetItem(2).SetUIActive(false);
        const a = r.Effect[s - 1];
        const g = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(a);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), g.Desc, ...g.ShowParams);
      } else {
        this.GetItem(4).SetUIActive(false);
        s = ModelManager_1.ModelManager.FishingModel.GetNodePreNodeUnlock(this.Node.ConfigId);
        this.GetItem(2).SetUIActive(!s);
        const a = r.Effect[e];
        const g = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(a);
        if (e === 0) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), g.Desc, ...g.ShowParams);
        } else {
          var s = r.Effect[e - 1];
          var o = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(s);
          var n = [];
          var h = o.ShowParams.length;
          for (let e = 0; e < h; e++) {
            var l = o.ShowParams[e] + "->" + g.ShowParams[e];
            n.push(l);
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), g.Desc, ...n);
        }
      }
    }
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("FishingRoleTechNode", this.GetItem(8), this.Node.ConfigId);
  }
  SelectToggle() {
    this.OnClickToggleBack?.(this.Node, this.GetExtendToggle(6));
    this.GetExtendToggle(6).SetToggleState(1, false);
  }
}
exports.FishingRoleTechItem = FishingRoleTechItem;
//# sourceMappingURL=FishingRoleTechItem.js.map