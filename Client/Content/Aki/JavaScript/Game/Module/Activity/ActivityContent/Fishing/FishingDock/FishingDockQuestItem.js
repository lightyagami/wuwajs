"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingDockQuestItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const FishingDockQuestChildItem_1 = require("./FishingDockQuestChildItem");
class FishingDockQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SO_ = undefined;
    this.Ud_ = () => {
      UiManager_1.UiManager.OpenView("FishingQuestView");
    };
    this.sGe = () => {
      return new FishingDockQuestChildItem_1.FishingDockQuestChildItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Ud_]];
  }
  OnStart() {
    this.SO_ = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.sGe);
  }
  OnBeforeShow() {
    this.RefreshItem();
  }
  RefreshItem() {
    let e = false;
    var i;
    var t;
    for ([i, t] of ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts) {
      const M = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i);
      if (M.EntrustPool !== 3 && t === 2) {
        e = true;
        break;
      }
      var r = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(M.AccessPath);
      var a = Number(r?.Val3 ?? 0);
      if (r && a) {
        if (ModelManager_1.ModelManager.FishingModel.GetTechNodeCanLevelUp(a)) {
          e = true;
          break;
        }
      }
    }
    this.GetItem(4).SetUIActive(e);
    if (ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust) {
      const M = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust);
      if (M) {
        if (M.EntrustType === 0 || M.EntrustType === 1) {
          this.GetVerticalLayout(2).RootUIComp.SetUIActive(true);
          var s;
          var n;
          var o = M.EntrustTarget;
          var g = [];
          var u = M.TargetDesText;
          for ([s, n] of o) {
            var h = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(s);
            var h = {
              MaxCount: n,
              CurrentCount: h,
              DesText: u.get(s) ?? ""
            };
            g.push(h);
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), M.Name);
          this.SO_?.RefreshByData(g);
        } else if (M.EntrustType === 2) {
          this.GetVerticalLayout(2).RootUIComp.SetUIActive(false);
        }
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Fishing_NotTraceEntrust");
      this.GetVerticalLayout(2).RootUIComp.SetUIActive(false);
    }
  }
}
exports.FishingDockQuestItem = FishingDockQuestItem;
//# sourceMappingURL=FishingDockQuestItem.js.map