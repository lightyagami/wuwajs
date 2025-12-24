"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackHelper = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const MapController_1 = require("../Map/Controller/MapController");
const TaskMarkItem_1 = require("../Map/Marks/MarkItem/TaskMarkItem");
const QuestController_1 = require("../QuestNew/Controller/QuestController");
class TrackHelper {
  static SetMarkItemTrack(r, a) {
    if (r instanceof TaskMarkItem_1.TaskMarkItem) {
      if (r.NodeId !== 0) {
        var l = r.TreeConfigId;
        if (ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(l)) {
          a?.();
        } else {
          QuestController_1.QuestNewController.RequestTrackQuest(r.TreeConfigId, true, 1, 0, a);
        }
      } else {
        l = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
        let e = false;
        if (e = !!l && l.MarkId === r.MarkId) {
          a?.();
        } else {
          MapController_1.MapController.RequestTrackMapMark({
            MarkType: 12,
            MarkId: r.MarkId,
            Track: true
          }, (e, r) => {
            a?.();
          });
        }
      }
    } else if (r.IsTracked) {
      a?.();
    } else {
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: r.MarkType,
        MarkId: r.MarkId,
        Track: true
      }, (e, r) => {
        a?.();
      });
    }
  }
}
exports.TrackHelper = TrackHelper;
//# sourceMappingURL=TrackHelper.js.map