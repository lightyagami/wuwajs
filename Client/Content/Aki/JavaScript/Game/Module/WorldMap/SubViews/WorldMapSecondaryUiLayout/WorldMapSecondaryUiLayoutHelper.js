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
    var a = t.LayoutContext.MarkItem;
    if (a && this.u7m(t)) {
      if (!(e = ModelManager_1.ModelManager.AutoPilotModel?.IsPlayerInAutoPilotArea)) {
        t.LayoutContext.MapTipsActivateTipPanel?.SetUiActive(true);
        t.LayoutContext.MapTipsActivateTipPanel?.SetActivatedTip("AutoPilot_AreaNotSupported", false);
      }
      t.UpdateAutoPilotTrackToggle(!e ? 2 : a.IsAutoPilotTracked ? 1 : 0);
      t.SetDownStateBtnRootActive(!a.IsAutoPilotTracked);
      t.RefreshAutoPilotTrackBtnGroup(a.IsAutoPilotTracked);
    }
  }
  static u7m(t) {
    let e = true;
    if (t.LayoutContext.GetIsConfirmBtnActive()) {
      e = false;
    }
    var a = t.LayoutContext.MarkItem;
    if (!ControllerHolder_1.ControllerHolder.AutoPilotController.CheckIsInAutoPilotArea(a.WorldPosition, a.MapId)) {
      e = false;
    }
    t.SetAutoPilotTrackToggleActive(e);
    return e;
  }
}
exports.WorldMapSecondaryUiLayoutHelper = WorldMapSecondaryUiLayoutHelper;
//# sourceMappingURL=WorldMapSecondaryUiLayoutHelper.js.map