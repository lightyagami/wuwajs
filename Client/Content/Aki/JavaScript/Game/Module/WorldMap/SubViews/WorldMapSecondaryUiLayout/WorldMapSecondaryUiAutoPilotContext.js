"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUiAutoPilotContext = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapController_1 = require("../../../Map/Controller/MapController");
const MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils");
const TrackHelper_1 = require("../../../Track/TrackHelper");
const AutoPilotTrackBtnGroup_1 = require("../AutoPilot/AutoPilotTrackBtnGroup");
const AutoPilotTrackToggle_1 = require("../AutoPilot/AutoPilotTrackToggle");
const WorldMapSecondaryUiLayoutHelper_1 = require("./WorldMapSecondaryUiLayoutHelper");
class WorldMapSecondaryUiAutoPilotContext {
  constructor(t) {
    this.LayoutContext = t;
    this.RefreshPanelCallback = undefined;
    this.o7m = undefined;
    this.n7m = undefined;
    this.s7m = undefined;
    this.a7m = undefined;
    this.h7m = undefined;
    this.v3o = undefined;
    this.Eqf = t => {
      this.OnHandleTrackAutoPilot(t);
    };
    this.I4o = t => {
      var e;
      if (t.MarkType === 9) {
        if (e = this.v3o?.GetMarkItem(9, t.MarkId)) {
          (e = e).IsCreated = true;
          this.Iqf(e, true);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AutoPilot", 87, "获取不到创建的自定义标记", ["MarkId", t.MarkId]);
        }
      }
    };
    this.HandleQuickGotoAutoPilot = () => {
      var t;
      var e = this.LayoutContext.MarkItem;
      if (this.v3o && (t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.v3o, e))) {
        MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(e, t, () => {
          this.h7m?.();
        }, true);
      }
    };
  }
  SetUiParent(t) {
    this.o7m = t;
  }
  SetDownStateBtnRoot(t) {
    this.n7m = t;
  }
  SetDownStateBtnRootActive(t) {
    this.n7m?.SetUIActive(t);
  }
  SetAutoPilotTrackToggleActive(t) {
    this.s7m?.GetOriginalItem()?.SetUIActive(t);
  }
  UpdateAutoPilotTrackToggle(t) {
    this.s7m?.SetTrackToggleState(t, false);
  }
  RefreshAutoPilotTrackBtnGroup(t) {
    this.a7m?.GetOriginalItem()?.SetUIActive(t);
    if (t) {
      t = this.LayoutContext.MarkItem;
      t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.v3o, t);
      this.SetBtnGoQuickEnable(ModelManager_1.ModelManager.TeleportModel.AllowTeleportByUi && t !== undefined);
    }
  }
  SetBtnGoQuickEnable(t) {
    this.a7m?.SetBtnGoQuickEnable(t);
  }
  SetCloseSecondaryUiFunction(t) {
    this.h7m = t;
  }
  SetMap(t) {
    this.v3o = t;
  }
  async InitAutoPilotUi() {
    this.s7m = new AutoPilotTrackToggle_1.AutoPilotTrackToggle(this);
    this.s7m?.SetTrackToggleCallback(this.Eqf);
    await this.s7m.CreateThenShowByResourceIdAsync("TogNavTrack", this.o7m);
    this.a7m = new AutoPilotTrackBtnGroup_1.AutoPilotTrackBtnGroup();
    this.a7m?.SetBtnGoQuickCallBack(this.HandleQuickGotoAutoPilot);
    await this.a7m.CreateThenShowByResourceIdAsync("PnlSetOutBtn", this.o7m);
  }
  async OnHandleTrackAutoPilot(t) {
    var e = this.LayoutContext.MarkItem;
    if (e.MarkType === 9) {
      var i = e;
      if (!i.IsCreated && t) {
        this.LayoutContext.TakeAction = true;
        EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.CreateMapMark, this.I4o);
        const o = new CustomPromise_1.CustomPromise();
        MapController_1.MapController.RequestCreateCustomMark(i.TrackPosition, i.ConfigId, t => {
          o.SetResult(t);
        });
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveMapMark, 9, i.MarkId);
        i = await o.Promise;
        this.LayoutContext.TakeAction = false;
        if (!i) {
          EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateMapMark, this.I4o);
          this.h7m?.();
        }
        return;
      }
    }
    this.Iqf(e, t);
  }
  Iqf(t, e) {
    if (e) {
      TrackHelper_1.TrackHelper.SetMarkItemTrack(t, () => {
        this.RefreshPanelCallback?.(t);
        ModelManager_1.ModelManager.AutoPilotModel?.SetTrackingMarkItem(t);
      });
    } else {
      ModelManager_1.ModelManager.AutoPilotModel?.SetTrackingMarkItem(undefined);
    }
    this.SetDownStateBtnRootActive(!e);
    this.RefreshAutoPilotTrackBtnGroup(e);
  }
  UpdateAutoPilotState() {
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAutoPilotState(this);
  }
  IsNeedCustomMarkCreate() {
    var t = this.LayoutContext.MarkItem;
    if (t.MarkType === 9 && !t.IsCreated) {
      return true;
    }
    return false;
  }
}
exports.WorldMapSecondaryUiAutoPilotContext = WorldMapSecondaryUiAutoPilotContext;
//# sourceMappingURL=WorldMapSecondaryUiAutoPilotContext.js.map