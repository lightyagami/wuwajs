"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCollect = undefined;
const AudioController_1 = require("../../../Core/Audio/AudioController");
const Log_1 = require("../../../Core/Common/Log");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelEventCollect extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    let r = undefined;
    switch (o.Type) {
      case 1:
        r = o.EntityId;
        break;
      case 5:
        r = o.TriggerEntityId;
        break;
      default:
        return;
    }
    var n;
    if (r) {
      if (n = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(r)) {
        if (o?.IsClientTrigger) {
          LevelGeneralCommons_1.LevelGeneralCommons.ChangeToDestroyState(ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(n));
        }
        if ((n = n.Entity?.GetComponent(0)) && (n = n.GetPbEntityInitData()) && (n = (0, IComponent_1.getComponent)(n.ComponentsData, "InteractAudioComponent")) && n.InteractEventConfig && (n = n.InteractEventConfig.CollectAkEvent)) {
          if (n = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(n)?.Path) {
            AudioController_1.AudioController.PostEvent(n, undefined);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Audio", 7, "[Audio][LevelEventCollect]collect 未找到资源", ["eventPath", n]);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 7, "LevelEventCollect行为执行时找不到实体", ["EntityId", r]);
      }
    }
  }
}
exports.LevelEventCollect = LevelEventCollect;
//# sourceMappingURL=LevelEventCollect.js.map