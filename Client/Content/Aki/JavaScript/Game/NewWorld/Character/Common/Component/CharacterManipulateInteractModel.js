"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManipulateInteractModel = undefined;
const GlobalConfigFromCsvByName_1 = require("../../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
class ManipulateInteractModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Bal = -1;
    this.bal = -1;
    this.$0l = -1;
    this.InRangePoints = new Set();
    this.sHr = (e, t) => {
      if (e) {
        this.InRangePoints.add(t);
      } else {
        this.InRangePoints.delete(t);
      }
    };
  }
  get StatueInteractCheckAngle() {
    return this.Bal;
  }
  get StatueInteractMoveSpeed() {
    return this.bal;
  }
  get StatueInteractMaxMoveTime() {
    return this.$0l;
  }
  OnInit() {
    this.qal();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange, this.sHr);
    return true;
  }
  qal() {
    var e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("StatueInteract.CheckAngle");
    if (e) {
      this.Bal = parseFloat(e.Value);
    }
    if (e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("StatueInteract.MoveSpeed")) {
      this.bal = parseInt(e.Value);
    }
    if (e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("StatueInteract.MaxMoveTime")) {
      this.$0l = parseFloat(e.Value);
    }
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange, this.sHr);
    return true;
  }
}
exports.ManipulateInteractModel = ManipulateInteractModel;
//# sourceMappingURL=CharacterManipulateInteractModel.js.map