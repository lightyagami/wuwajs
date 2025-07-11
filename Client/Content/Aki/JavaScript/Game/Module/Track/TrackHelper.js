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
  static SetMarkItemTrack(r) {
    if (r instanceof TaskMarkItem_1.TaskMarkItem) {
      if (r.NodeId !== 0) {
        var a = r.TreeConfigId;
        if (!ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(a)) {
          QuestController_1.QuestNewController.RequestTrackQuest(r.TreeConfigId, true, 1, 0);
        }
      } else {
        a = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
        let e = false;
        if (!(e = !!a && a.MarkId === r.MarkId)) {
          MapController_1.MapController.RequestTrackMapMark({
            MarkType: 12,
            MarkId: r.MarkId,
            Track: true
          });
        }
      }
    } else if (!r.IsTracked) {
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: r.MarkType,
        MarkId: r.MarkId,
        Track: true
      });
    }
  }
}
exports.TrackHelper = TrackHelper;
//# sourceMappingURL=TrackHelper.js.map