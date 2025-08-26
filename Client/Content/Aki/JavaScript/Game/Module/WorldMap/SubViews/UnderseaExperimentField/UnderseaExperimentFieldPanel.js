"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnderseaExperimentFieldPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UnderseaExperimentToggleItem_1 = require("./UnderseaExperimentToggleItem");
class UnderseaExperimentFieldPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.YUi = 0;
    this.eWc = new Map([[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]]);
    this.owu = new Map();
    this.nwu = undefined;
    this.aLn = e => {
      this.YUi = e;
      e = ConfigManager_1.ConfigManager.WorldMapConfig?.GetCustomizedThumbnailConfig(e);
      this.nwu?.(e?.MarkId ?? 0);
      this.Oqe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggle], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.aLn.bind(this, 1)], [1, this.aLn.bind(this, 2)], [2, this.aLn.bind(this, 3)], [3, this.aLn.bind(this, 4)], [4, this.aLn.bind(this, 5)]];
  }
  async Initialize(e, i) {
    await this.CreateThenShowByResourceIdAsync("UiItem_MiniMapLayout", e);
    this.nwu = i;
    var t;
    var s;
    var a = ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(3) ?? 0;
    var r = [];
    for ([t, s] of this.eWc) {
      var n = this.GetExtendToggle(s);
      r.push(this.swu(t, n));
      var n = ConfigManager_1.ConfigManager.WorldMapConfig.GetCustomizedThumbnailConfig(t);
      if (n?.DefaultSelected && this.YUi === 0) {
        this.YUi = t;
      }
      if (a === n?.AreaId) {
        this.YUi = t;
      }
    }
    if (this.YUi === 0) {
      this.YUi = 1;
    }
    await Promise.all(r);
    this.Oqe();
  }
  async swu(e, i) {
    var t = new UnderseaExperimentToggleItem_1.UnderseaExperimentToggleItem();
    await t.Initialize(e, i);
    this.owu.set(e, t);
  }
  Oqe() {
    for (var [e, i] of this.eWc) {
      this.GetExtendToggle(i).SetToggleState(this.YUi === e ? 1 : 0);
    }
  }
}
exports.UnderseaExperimentFieldPanel = UnderseaExperimentFieldPanel;
//# sourceMappingURL=UnderseaExperimentFieldPanel.js.map