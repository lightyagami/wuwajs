"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUiLayoutHelper = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
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
    var e = t.MarkItem;
    var e = ModelManager_1.ModelManager.MapModel.GetMarkAreaText(e.MapId, e.EntityConfigId);
    if (e) {
      t.AreaText.SetText(e);
    }
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
    t.ConfirmButtonItem.SetLocalText("TeleportFastMove");
  }
  static UpdateConfirmButtonTextWithStopDetectionStyle(t) {
    t.ConfirmButtonItem.SetLocalTextNew("Text_TeleportStop_Text");
  }
  static UpdateConfirmButtonTextWithTrackStyle(t) {
    var e = t.MarkItem;
    let a = "";
    a = e.IsTracked ? "InstanceDungeonEntranceCancelTrack" : "InstanceDungeonEntranceTrack";
    t.ConfirmButtonItem.SetLocalText(a);
  }
  static UpdateConfirmButtonEnableClickByTeleportState(t) {
    var e = t.MarkItem;
    var e = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(e.MarkId).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable;
    t.ConfirmButtonItem.SetEnableClick(!e);
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
}
exports.WorldMapSecondaryUiLayoutHelper = WorldMapSecondaryUiLayoutHelper;
//# sourceMappingURL=WorldMapSecondaryUiLayoutHelper.js.map