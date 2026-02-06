"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUiLayoutHelper = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class WorldMapSecondaryUiLayoutHelper {
  static UpdateAreaTxtByConfigMarkItem(t) {
    var e = t.MarkItem.GetAreaText();
    if (e) {
      t.AreaText.SetText(e);
    }
  }
  static UpdateAreaAndIconByConfigOrDynamicConfigMarkItem(t) {
    var e = t.MarkItem.GetAreaText();
    var a = e !== undefined;
    t.AreaText.SetUIActive(a);
    t.AreaIconItem.SetUIActive(a);
    if (a) {
      t.AreaText.SetText(e);
    }
  }
  static UpdateAreaTxtByServerMarkItem(t) {
    var e = t.MarkItem.GetAreaText();
    if (e) {
      t.AreaText.SetText(e);
    }
  }
  static UpdateIconAndTitleByServerMarkItem(t) {
    var e = t.MarkItem;
    WorldMapSecondaryUiLayoutHelper.UpdateIconByServerMarkItem(t);
    t.Title.ShowTextNew(ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.ConfigId).MarkTitle);
  }
  static UpdateIconAndTitle(t) {
    var e = t.MarkItem;
    WorldMapSecondaryUiLayoutHelper.UpdateIcon(t);
    t.Title.ShowTextNew(e.MarkConfig.MarkTitle);
  }
  static SetTitleUseChangeColor(t, e) {
    t.Title.SetChangeColor(e, t.Title.changeColor);
  }
  static UpdateIcon(t) {
    var e = t.MarkItem;
    t.SetSpriteByPathAction(e.IconPath, t.Icon, false);
  }
  static UpdateIconByServerMarkItem(t) {
    var e = t.MarkItem;
    t.SetSpriteByPathAction(e.IconPath, t.Icon, false);
  }
  static UpdateDesc(t) {
    var e = t.MarkItem;
    t.DescriptionText.ShowTextNew(e.MarkConfig.MarkDesc);
  }
  static UpdateBoxDesc(t) {
    var e = t.MarkItem;
    t.DescriptionText.ShowTextNew(e.GetDescText());
  }
  static UpdateServerMarkDesc(t) {
    var e = t.MarkItem.ConfigId;
    var e = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e);
    t.DescriptionText.ShowTextNew(e.MarkDesc);
  }
  static UpdateConfirmButtonTextWithFastMoveStyle(t) {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TeleportFastMove");
    t.SetConfirmBtnText(e);
  }
  static UpdateConfirmButtonTextWithStopDetectionStyle(t) {
    t.SetConfirmBtnText("Text_TeleportStop_Text");
  }
  static UpdateConfirmButtonTextWithTrackStyle(t) {
    var e = t.MarkItem;
    let a = "";
    a = e.IsTracked ? "InstanceDungeonEntranceCancelTrack" : "InstanceDungeonEntranceTrack";
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(a);
    t.SetConfirmBtnText(e);
  }
  static UpdateConfirmButtonEnableClickByTeleportState(t) {
    var e = t.MarkItem;
    var e = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(e.MarkId).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable;
    t.SetConfirmBtnEnableClick(!e);
  }
  static UpdateTrackButtonTextWithTrackStyle(t) {
    var e = t.MarkItem;
    let a = "";
    a = e.IsTracked ? "InstanceDungeonEntranceCancelTrack" : "InstanceDungeonEntranceTrack";
    t.TrackButtonItem.SetLocalText(a);
  }
  static UpdateDownStateIcon(t) {
    var e = t.MarkItem;
    var a = e.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(7);
    var e = e.MarkItemEntity.Resource.ChildIconPath;
    t.DownStateIcon.SetUIActive(a);
    if (a) {
      t.SetSpriteByPathAction(e, t.DownStateIcon, false);
    }
  }
  static UpdateAutoPilotState(t) {
    var e;
    var a;
    var r = t.LayoutContext.MarkItem;
    if (r && (a = ControllerHolder_1.ControllerHolder.AutoPilotController.GetAutoPilotAreaId(r.WorldPosition, r.MapId), this.d9m(t, a))) {
      if (!(a = (e = ModelManager_1.ModelManager.AutoPilotModel.AutoPilotAreaId) !== 0 && e === a)) {
        t.LayoutContext.MapTipsActivateTipPanel?.SetUiActive(true);
        t.LayoutContext.MapTipsActivateTipPanel?.SetActivatedTip(e === 0 ? "AutoPilot_AreaNotSupported" : "AutoPilot_AreaIsolatedTips", false);
      }
      t.UpdateAutoPilotNavBtn(r.IsAutoPilotTracked, a);
      t.SetDownStateBtnRootActive(!r.IsAutoPilotTracked);
      t.RefreshAutoPilotTrackBtnGroup(r.IsAutoPilotTracked);
    }
  }
  static d9m(t, e) {
    let a = true;
    if (!!t.LayoutContext.GetIsConfirmBtnActive() || !t.LayoutContext.TrackButtonItem.IsUiActiveInHierarchy()) {
      a = false;
    }
    if (e === 0) {
      a = false;
    }
    t.SetAutoPilotNavBtnActive(a);
    return a;
  }
}
exports.WorldMapSecondaryUiLayoutHelper = WorldMapSecondaryUiLayoutHelper;
//# sourceMappingURL=WorldMapSecondaryUiLayoutHelper.js.map