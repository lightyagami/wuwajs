"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.WorldMapSecondaryUiLayoutHelper = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class WorldMapSecondaryUiLayoutHelper {
  static UpdateAreaTxtByConfigMarkItem(t) {
    var e = t.MarkItem.GetAreaText();
    e && t.AreaText.SetText(e)
  }
  static UpdateAreaAndIconByConfigOrDynamicConfigMarkItem(t) {
    var e = t.MarkItem.GetAreaText(),
      a = void 0 !== e;
    t.AreaText.SetUIActive(a), t.AreaIconItem.SetUIActive(a), a && t.AreaText.SetText(e)
  }
  static UpdateAreaTxtByServerMarkItem(t) {
    var e = t.MarkItem,
      e = ModelManager_1.ModelManager.MapModel.GetMarkAreaText(e.MapId, e.EntityConfigId);
    e && t.AreaText.SetText(e)
  }
  static UpdateIconAndTitle(t) {
    var e = t.MarkItem;
    WorldMapSecondaryUiLayoutHelper.UpdateIcon(t), t.Title.ShowTextNew(e.MarkConfig.MarkTitle)
  }
  static SetTitleUseChangeColor(t, e) {
    t.Title.SetChangeColor(e, t.Title.changeColor)
  }
  static UpdateIcon(t) {
    var e = t.MarkItem;
    t.SetSpriteByPathAction(e.IconPath, t.Icon, !1)
  }
  static UpdateDesc(t) {
    var e = t.MarkItem;
    t.DescriptionText.ShowTextNew(e.MarkConfig.MarkDesc)
  }
  static UpdateBoxDesc(t) {
    var e = t.MarkItem;
    t.DescriptionText.ShowTextNew(e.GetDescText())
  }
  static UpdateServerMarkDesc(t) {
    var e = t.MarkItem.ConfigId,
      e = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e);
    t.DescriptionText.ShowTextNew(e.MarkDesc)
  }
  static UpdateConfirmButtonTextWithFastMoveStyle(t) {
    t.ConfirmButtonItem.SetLocalText("TeleportFastMove")
  }
  static UpdateConfirmButtonTextWithStopDetectionStyle(t) {
    t.ConfirmButtonItem.SetLocalTextNew("Text_TeleportStop_Text")
  }
  static UpdateConfirmButtonTextWithTrackStyle(t) {
    var e = t.MarkItem;
    let a = "";
    a = e.IsTracked ? "InstanceDungeonEntranceCancelTrack" : "InstanceDungeonEntranceTrack", t.ConfirmButtonItem.SetLocalText(a)
  }
  static UpdateConfirmButtonEnableClickByTeleportState(t) {
    var e = t.MarkItem,
      e = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(e.MarkId).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable;
    t.ConfirmButtonItem.SetEnableClick(!e)
  }
  static UpdateTrackButtonTextWithTrackStyle(t) {
    var e = t.MarkItem;
    let a = "";
    a = e.IsTracked ? "InstanceDungeonEntranceCancelTrack" : "InstanceDungeonEntranceTrack", t.TrackButtonItem.SetLocalText(a)
  }
  static UpdateDownStateIcon(t) {
    var e = t.MarkItem,
      a = e.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(7),
      e = e.MarkItemEntity.Resource.ChildIconPath;
    t.DownStateIcon.SetUIActive(a), a && t.SetSpriteByPathAction(e, t.DownStateIcon, !1)
  }
}
exports.WorldMapSecondaryUiLayoutHelper = WorldMapSecondaryUiLayoutHelper;
//# sourceMappingURL=WorldMapSecondaryUiLayoutHelper.js.map