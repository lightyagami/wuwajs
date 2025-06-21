"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.VisionRefineMediumItemGrid = void 0;
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class VisionRefineMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), this.CheckSelectByView = void 0, this.ZBt = () => {
      var e = this.fGt;
      e && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectItemAdd, e.GetConfigId(), e.GetUniqueId())
    }
  }
  OnStart() {
    super.OnStart(), this.GetItemGridExtendToggle().FocusListenerDelegate.Bind(this.ZBt)
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.GetItemGridExtendToggle().FocusListenerDelegate.Unbind()
  }
  OnRefresh(e, t, i) {
    this.pdu(e)
  }
  pdu(e) {
    var t, i, r = e.GetUniqueId(),
      r = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(r);
    r && (t = e.GetItemDataType(), i = {
      Type: 4,
      Data: e,
      ItemConfigId: e.GetConfigId(),
      IsLockVisible: e.GetIsLock(),
      IsDeprecate: e.GetIsDeprecated(),
      StarLevel: e.GetQuality()
    }, 3 === t ? (i.Level = r.GetCost(), i.IsLevelTextUseChangeColor = !0, i.BottomTextId = "VisionLevel", i.BottomTextParameter = [r.GetPhantomLevel()], i.VisionFetterGroupId = r.GetFetterGroupId(), i.IsOmitBottomText = !0, i.IsDisable = !r.GetVisionIfCanRefine()) : i.BottomText = e.GetCount().toString(), this.Apply(i), this.vdu(e))
  }
  vdu(e) {
    var t;
    this.CheckSelectByView && (t = this.CheckSelectByView(this.fGt), this.SetSelected(t, !0), e = e.GetUniqueId(), e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e), this.SetGreenSelected(t && e.GetVisionIfCanRefine()))
  }
  RefreshByView(e) {
    this.pdu(e)
  }
  get fGt() {
    return this.Data
  }
}
exports.VisionRefineMediumItemGrid = VisionRefineMediumItemGrid;
//# sourceMappingURL=VisionRefineMediumItemGrid.js.map