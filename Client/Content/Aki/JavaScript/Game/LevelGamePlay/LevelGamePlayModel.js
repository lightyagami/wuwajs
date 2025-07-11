"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGamePlayModel = undefined;
const Queue_1 = require("../../Core/Container/Queue");
const ModelBase_1 = require("../../Core/Framework/ModelBase");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const UiLayer_1 = require("../Ui/UiLayer");
class LevelGamePlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.pUe = false;
    this.vUe = false;
    this.MUe = undefined;
    this.LevelRestrictOperationBlockAll = false;
    this.EUe = () => {
      this.SetWorldLoad(true);
    };
    this.ZDe = () => {
      if (this.LevelRestrictOperationBlockAll) {
        UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", false);
      }
    };
    this.JDe = () => {
      if (this.LevelRestrictOperationBlockAll) {
        UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", true);
      }
    };
  }
  OnInit() {
    this.pUe = false;
    this.vUe = true;
    this.MUe = new Queue_1.Queue();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.EUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    return true;
  }
  AddLoadNotify(e) {
    this.MUe.Push(e);
    this.UpdateLoadNotify();
  }
  SetWorldLoad(e) {
    this.pUe = e;
    this.UpdateLoadNotify();
  }
  SetWorldTeleport(e) {
    this.vUe = e;
    this.UpdateLoadNotify();
  }
  UpdateLoadNotify() {
    if (this.vUe && this.pUe) {
      while (!this.MUe.Empty) {
        var e = this.MUe.Pop();
        if (e) {
          e();
        }
      }
    }
  }
  ExecuteActionsNew(e, t, i) {
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(e, t, i);
  }
  OnClear() {
    this.pUe = false;
    this.vUe = false;
    this.MUe = undefined;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.EUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    return true;
  }
}
exports.LevelGamePlayModel = LevelGamePlayModel;
//# sourceMappingURL=LevelGamePlayModel.js.map