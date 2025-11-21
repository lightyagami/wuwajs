"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineMediumItemGrid = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
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
  OnRefresh(e, t, r) {
    this.MRu(e);
  }
  MRu(e) {
    var t = e.GetUniqueId();
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    if (r) {
      var i;
      var o;
      var s;
      var n = e.GetItemDataType();
      var a = {
        Type: 4,
        Data: e,
        ItemConfigId: e.GetConfigId(),
        IsLockVisible: e.GetIsLock(),
        IsDeprecate: e.GetIsDeprecated(),
        StarLevel: e.GetQuality()
      };
      switch (n) {
        case 3:
          {
            a.ItemConfigId = r.GetConfigId(true);
            a.Level = r.GetCost();
            a.IsLevelTextUseChangeColor = true;
            a.BottomTextId = "VisionLevel";
            a.BottomTextParameter = [r.GetPhantomLevel()];
            a.VisionFetterGroupId = r.GetFetterGroupId();
            a.IsOmitBottomText = true;
            a.IsDisable = !r.GetVisionIfCanRefine();
            let e = false;
            if (!(e = this.CheckSelectByView ? this.CheckSelectByView(this.fGt) : e) && ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(t)) {
              i = r.GetUniqueId();
              o = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(i);
              s = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i);
              a.VisionRoleHeadInfo = {
                RoleConfigId: o,
                VisionUniqueId: i
              };
              a.IsMainVisionVisible = s;
            }
            break;
          }
        default:
          a.BottomText = e.GetCount().toString();
      }
      this.Apply(a);
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