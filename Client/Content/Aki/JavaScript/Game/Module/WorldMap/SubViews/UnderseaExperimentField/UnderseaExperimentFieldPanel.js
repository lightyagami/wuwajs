"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnderseaExperimentFieldPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ExploreProgressDefine_1 = require("../../../ExploreProgress/ExploreProgressDefine");
const UnderseaExperimentToggleItem_1 = require("./UnderseaExperimentToggleItem");
class UnderseaExperimentFieldPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.YUi = 0;
    this.kHc = new Map([[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]]);
    this.JRu = new Map();
    this.ZRu = undefined;
    this.aLn = e => {
      this.YUi = e;
      e = ConfigManager_1.ConfigManager.WorldMapConfig?.GetCustomizedThumbnailConfig(e);
      this.ZRu?.(e?.MarkId ?? 0);
      this.Oqe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggle], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.aLn.bind(this, 1)], [1, this.aLn.bind(this, 2)], [2, this.aLn.bind(this, 3)], [3, this.aLn.bind(this, 4)], [4, this.aLn.bind(this, 5)]];
  }
  async Initialize(e, i) {
    await this.CreateThenShowByResourceIdAsync("UiItem_MiniMapLayout", e);
    this.ZRu = i;
    var s;
    var t;
    var r = ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(ExploreProgressDefine_1.AREA_LEVEL) ?? 0;
    var a = [];
    for ([s, t] of this.kHc) {
      var n = this.GetExtendToggle(t);
      a.push(this.ewu(s, n));
      if (ConfigManager_1.ConfigManager.WorldMapConfig.GetCustomizedThumbnailConfig(s)?.DefaultSelected && this.YUi === 0) {
        this.YUi = s;
      }
      if (r === s) {
        this.YUi = s;
      }
    }
    if (this.YUi === 0) {
      this.YUi = 1;
    }
    await Promise.all(a);
    this.Oqe();
  }
  async ewu(e, i) {
    var s = new UnderseaExperimentToggleItem_1.UnderseaExperimentToggleItem();
    await s.Initialize(e, i);
    this.JRu.set(e, s);
  }
  Oqe() {
    for (var [e, i] of this.kHc) {
      this.GetExtendToggle(i).SetToggleState(this.YUi === e ? 1 : 0);
    }
  }
}
exports.UnderseaExperimentFieldPanel = UnderseaExperimentFieldPanel;
//# sourceMappingURL=UnderseaExperimentFieldPanel.js.map