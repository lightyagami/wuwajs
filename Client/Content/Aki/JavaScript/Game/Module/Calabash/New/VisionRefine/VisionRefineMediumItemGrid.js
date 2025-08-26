"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineMediumItemGrid = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class VisionRefineMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.CheckSelectByView = undefined;
    this.ZBt = () => {
      var e = this.fGt;
      if (e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectItemAdd, e.GetConfigId(), e.GetUniqueId());
      }
    };
  }
  OnStart() {
    super.OnStart();
    this.GetItemGridExtendToggle().FocusListenerDelegate.Bind(this.ZBt);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.GetItemGridExtendToggle().FocusListenerDelegate.Unbind();
  }
  OnRefresh(e, t, i) {
    this.MRu(e);
  }
  MRu(e) {
    var t;
    var i;
    var r = e.GetUniqueId();
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(r);
    if (r) {
      t = e.GetItemDataType();
      i = {
        Type: 4,
        Data: e,
        ItemConfigId: e.GetConfigId(),
        IsLockVisible: e.GetIsLock(),
        IsDeprecate: e.GetIsDeprecated(),
        StarLevel: e.GetQuality()
      };
      if (t === 3) {
        i.Level = r.GetCost();
        i.IsLevelTextUseChangeColor = true;
        i.BottomTextId = "VisionLevel";
        i.BottomTextParameter = [r.GetPhantomLevel()];
        i.VisionFetterGroupId = r.GetFetterGroupId();
        i.IsOmitBottomText = true;
        i.IsDisable = !r.GetVisionIfCanRefine();
      } else {
        i.BottomText = e.GetCount().toString();
      }
      this.Apply(i);
      this.ERu(e);
    }
  }
  ERu(e) {
    var t;
    if (this.CheckSelectByView) {
      t = this.CheckSelectByView(this.fGt);
      this.SetSelected(t, true);
      e = e.GetUniqueId();
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
      this.SetGreenSelected(t && e.GetVisionIfCanRefine());
    }
  }
  RefreshByView(e) {
    this.MRu(e);
  }
  get fGt() {
    return this.Data;
  }
}
exports.VisionRefineMediumItemGrid = VisionRefineMediumItemGrid;
//# sourceMappingURL=VisionRefineMediumItemGrid.js.map