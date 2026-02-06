"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUiAutoPilotContext = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const MapController_1 = require("../../../Map/Controller/MapController");
const TrackHelper_1 = require("../../../Track/TrackHelper");
const AutoPilotNavBtnView_1 = require("../AutoPilot/AutoPilotNavBtnView");
const AutoPilotTrackBtnGroup_1 = require("../AutoPilot/AutoPilotTrackBtnGroup");
const WorldMapSecondaryUiLayoutHelper_1 = require("./WorldMapSecondaryUiLayoutHelper");
class WorldMapSecondaryUiAutoPilotContext {
  constructor(t) {
    this.LayoutContext = t;
    this.RefreshPanelCallback = undefined;
    this.s9m = undefined;
    this.a9m = undefined;
    this.Iwg = undefined;
    this.l9m = undefined;
    this._9m = undefined;
    this.v3o = undefined;
    this.Twg = () => {
      this.OnHandleTrackAutoPilot(true);
    };
    this.bwg = () => {
      this.OnHandleTrackAutoPilot(false);
    };
    this.Rwg = () => {
      if (ModelManager_1.ModelManager.AutoPilotModel.HideQuickTransferConfirmBox) {
        this.HandleQuickGotoAutoPilot();
      } else {
        this.DFf(this.HandleQuickGotoAutoPilot);
      }
    };
    this.I4o = t => {
      var e;
      if (t.MarkType === 9) {
        if (e = this.v3o?.GetMarkItem(9, t.MarkId)) {
          (e = e).IsCreated = true;
          this.DVf(e, true);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AutoPilot", 87, "获取不到创建的自定义标记", ["MarkId", t.MarkId]);
        }
      }
    };
    this.HandleQuickGotoAutoPilot = () => {
      var t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
      if (t) {
        (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(242)?.IsDriver ? ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayerInVehicle({
          ClientReason: "QuickGotoAutoPilot",
          TargetPosition: t.StartPoint.ToUeVector(),
          TargetRotation: t.GetStartRotator(),
          TeleportMode: 0
        }) : ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
          ClientReason: "QuickGotoAutoPilot",
          TargetPosition: t.StartPoint.ToUeVector(),
          TargetRotation: t.GetStartRotator(),
          TeleportMode: 0
        })).finally(() => {
          this._9m?.();
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AutoPilot", 87, "快速前往寻路起点失败，寻路结果为空");
      }
    };
  }
  SetUiParent(t) {
    this.s9m = t;
  }
  SetDownStateBtnRoot(t) {
    this.a9m = t;
  }
  SetDownStateBtnRootActive(t) {
    this.a9m?.SetUIActive(t);
  }
  SetAutoPilotNavBtnActive(t) {
    this.Iwg?.GetOriginalItem()?.SetUIActive(t);
  }
  UpdateAutoPilotNavBtn(t, e) {
    this.Iwg?.RefreshUi(t, e);
  }
  RefreshAutoPilotTrackBtnGroup(t) {
    this.l9m?.GetOriginalItem()?.SetUIActive(t);
    if (t) {
      t = ModelManager_1.ModelManager.AutoPilotModel?.GetFindPathResult();
      this.SetBtnGoQuickEnable(ModelManager_1.ModelManager.TeleportModel.AllowTeleportByUi && !t?.GetIsShowPlayerToTargetLine());
    }
  }
  SetBtnGoQuickEnable(t) {
    this.l9m?.SetBtnGoQuickEnable(t);
  }
  SetCloseSecondaryUiFunction(t) {
    this._9m = t;
  }
  SetMap(t) {
    this.v3o = t;
  }
  async InitAutoPilotUi() {
    this.Iwg = new AutoPilotNavBtnView_1.AutoPilotNavBtnView(this);
    this.Iwg.OnBtnClickCallback = this.Twg;
    await this.Iwg.CreateThenShowByResourceIdAsync("UiItem_AutocruiseNavBtn", this.s9m);
    this.l9m = new AutoPilotTrackBtnGroup_1.AutoPilotTrackBtnGroup();
    this.l9m.BtnGoQuickCallback = this.Rwg;
    this.l9m.BtnCancelCallback = this.bwg;
    await this.l9m.CreateThenShowByResourceIdAsync("PnlSetOutBtn", this.s9m);
  }
  async OnHandleTrackAutoPilot(t) {
    var e = this.LayoutContext.MarkItem;
    if (e.MarkType === 9) {
      var o = e;
      if (!o.IsCreated && t) {
        this.LayoutContext.TakeAction = true;
        EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.CreateMapMark, this.I4o);
        const i = new CustomPromise_1.CustomPromise();
        MapController_1.MapController.RequestCreateCustomMark(o.TrackPosition, o.ConfigId, t => {
          i.SetResult(t);
        });
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveMapMark, 9, o.MarkId);
        o = await i.Promise;
        this.LayoutContext.TakeAction = false;
        if (!o) {
          EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateMapMark, this.I4o);
          this._9m?.();
        }
        return;
      }
    }
    this.DVf(e, t);
  }
  async DVf(t, e) {
    if (e) {
      const o = new CustomPromise_1.CustomPromise();
      TrackHelper_1.TrackHelper.SetMarkItemTrack(t, () => {
        this.RefreshPanelCallback?.(t);
        ModelManager_1.ModelManager.AutoPilotModel?.SetTrackingMarkItem(t);
        o.SetResult();
      });
      await o.Promise;
    } else {
      ModelManager_1.ModelManager.AutoPilotModel?.SetTrackingMarkItem(undefined);
    }
    this.SetDownStateBtnRootActive(!e);
    this.RefreshAutoPilotTrackBtnGroup(e);
    this.Iwg?.RefreshUi(e);
  }
  DFf(t) {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(427);
    e.HasToggle = true;
    e.ToggleTextKey = "Text_FastTravelConfirmToggle_text";
    e.SetToggleFunction(t => {
      ModelManager_1.ModelManager.AutoPilotModel.HideQuickTransferConfirmBox = t;
    });
    e.FunctionMap.set(1, () => {
      ModelManager_1.ModelManager.AutoPilotModel.HideQuickTransferConfirmBox = false;
    });
    e.FunctionMap.set(2, t);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
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