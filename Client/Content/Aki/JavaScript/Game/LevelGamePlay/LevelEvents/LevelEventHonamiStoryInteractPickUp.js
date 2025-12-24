"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventHonamiStoryInteractPickUp = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventHonamiStoryInteractPickUp extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var o;
    var n;
    if (t) {
      if (t = EntitySystem_1.EntitySystem.Get(t.EntityId)) {
        if ((o = t.CheckGetComponent(0)).HonamiStoryItemInfo) {
          if (ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2) && !ModelManager_1.ModelManager.HonamiStoryModel.IsPickUpViewOpened()) {
            if (n = t.CheckGetComponent(207)) {
              n.SetInteractionState(false, "HonamiStoryPickUp");
            }
            n = ModelManager_1.ModelManager.HonamiStoryModel.CreateHonamiStoryItemData(o.HonamiStoryItemInfo);
            ModelManager_1.ModelManager.HonamiStoryModel.TryPickUp(n, t);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 58, "[LevelEventHonamiStoryInteractPickUp] 非HonamiStoryItem");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 58, "[LevelEventHonamiStoryInteractPickUp] 实体不存在");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 58, "[LevelEventHonamiStoryInteractPickUp] 上下文不存在");
    }
  }
}
exports.LevelEventHonamiStoryInteractPickUp = LevelEventHonamiStoryInteractPickUp;
//# sourceMappingURL=LevelEventHonamiStoryInteractPickUp.js.map