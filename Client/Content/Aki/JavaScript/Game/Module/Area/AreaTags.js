"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaTags = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const FormationDataController_1 = require("../Abilities/FormationDataController");
class AreaTags {
  constructor() {
    this.nye = () => {
      if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ChangeArea, this.Hje)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.Hje);
      }
      if (ModelManager_1.ModelManager.AreaModel?.AreaInfo) {
        this.Hje(undefined, ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId);
      }
    };
    this.uMe = () => {
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ChangeArea, this.Hje)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.Hje);
      }
      if (ModelManager_1.ModelManager.AreaModel?.AreaInfo) {
        this.Hje(ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId, undefined);
      }
    };
    this.zYe = () => {
      if (ModelManager_1.ModelManager.AreaModel?.AreaInfo) {
        this.Hje(undefined, ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId);
      }
    };
    this.Hje = (e, t) => {
      var n = new Map();
      let r = t ?? 0;
      var a = new Set();
      for (; r !== 0;) {
        a.add(r);
        var o = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r);
        if (o?.EnterAreaTags?.size) {
          for (var [i, s] of o.EnterAreaTags) {
            if (!n.has(i)) {
              n.set(i, s);
            }
          }
        }
        r = o?.Father ?? 0;
      }
      for (r = e ?? 0; r !== 0 && !a.has(r);) {
        var _ = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r);
        if (_?.LeaveAreaTags?.size) {
          for (var [v, l] of _.LeaveAreaTags) {
            if (!n.has(v)) {
              n.set(v, l);
            }
          }
        }
        r = _?.Father ?? 0;
      }
      this.E3l(n);
    };
  }
  Init() {
    this.dde();
  }
  Destroy() {
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
  }
  E3l(e) {
    var t;
    var n;
    var r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var a = FormationDataController_1.FormationDataController.IsPlayerExist(r);
    for ([t, n] of e) {
      if (n === 0) {
        if (a && FormationDataController_1.FormationDataController.HasPlayerTag(r, t, true)) {
          FormationDataController_1.FormationDataController.RemovePlayerTag(r, t);
        }
      } else if (n === 1 && a && !FormationDataController_1.FormationDataController.HasPlayerTag(r, t, true)) {
        FormationDataController_1.FormationDataController.AddPlayerTag(r, t);
      }
    }
  }
}
exports.AreaTags = AreaTags;
//# sourceMappingURL=AreaTags.js.map