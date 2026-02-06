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
    this.CheckWarningByView = undefined;
    this.GetRefineType = undefined;
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
  OnRefresh(e, i, t) {
    this.Data = e;
    this.MRu(e);
  }
  MRu(i) {
    var t = i.GetUniqueId();
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    if (r) {
      var e = i.GetItemDataType();
      var s = {
        Type: 4,
        Data: i,
        ItemConfigId: i.GetConfigId(),
        IsLockVisible: i.GetIsLock(),
        IsDeprecate: i.GetIsDeprecated(),
        StarLevel: i.GetQuality()
      };
      switch (e) {
        case 3:
          {
            var o;
            var n;
            var a;
            var l = s;
            var d = this.GetRefineType?.() ?? 0;
            l.ItemConfigId = r.GetConfigId(true);
            l.QualityId = r.GetQuality();
            l.Level = r.GetCost();
            l.IsLevelTextUseChangeColor = true;
            l.BottomTextId = "VisionLevel";
            l.BottomTextParameter = [r.GetPhantomLevel()];
            l.VisionFetterGroupId = r.GetFetterGroupId();
            l.IsOmitBottomText = true;
            l.IsDisable = !r.GetVisionIfCanRefine(d);
            let e = false;
            if (this.CheckSelectByView) {
              e = this.CheckSelectByView(i);
            }
            if (d !== 0 && !e && ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(t)) {
              o = r.GetUniqueId();
              n = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(o);
              a = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(o);
              l.VisionRoleHeadInfo = {
                RoleConfigId: n,
                VisionUniqueId: o
              };
              l.IsMainVisionVisible = a;
            }
            this.SetSelected(e, true);
            var h = e && r.GetVisionIfCanRefine(d);
            switch (d) {
              case 0:
                {
                  let e = !(l.ReduceButtonInfo = {
                    IsVisible: h
                  });
                  if (this.CheckWarningByView) {
                    e = this.CheckWarningByView(this.fGt);
                  }
                  l.IsWarning = e;
                  l.IsGreenSelected = false;
                  break;
                }
              case 1:
                l.ReduceButtonInfo = {
                  IsVisible: false
                };
                l.IsWarning = false;
                l.IsGreenSelected = h;
            }
            break;
          }
        default:
          s.BottomText = i.GetCount().toString();
      }
      this.Apply(s);
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