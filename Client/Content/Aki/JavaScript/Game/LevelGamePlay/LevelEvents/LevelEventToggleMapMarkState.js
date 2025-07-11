"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventToggleMapMarkState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleMapMarkState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.tUe = e => {
      if (e === "WorldMapView") {
        this.Finish();
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.tUe);
      }
    };
  }
  ExecuteNew(e, r) {
    var a = e;
    if (a) {
      switch (a.Type) {
        case IAction_1.EMapMarkState.Show:
          var n = a;
          if (this.iUe(n.MarkId) && n.IsFocusOnFirstShow) {
            var t = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(n.MarkId);
            if (t.IsShow && t.NeedFocus) {
              t.NeedFocus = false;
              t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(n.MarkId);
              if (!t) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Map", 49, "缺少MapMark表缺少地图配置", ["MarkId", n.MarkId]);
                }
                this.Finish();
                return;
              }
              n = {
                MarkId: n.MarkId,
                MarkType: t.ObjectType,
                IsNotFocusTween: true
              };
              UiManager_1.UiManager.OpenView("WorldMapView", n, () => {
                ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
                if (!this.IsAsync) {
                  EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.tUe);
                }
              });
              if (!this.IsAsync) {
                return;
              }
            }
          }
          break;
        case IAction_1.EMapMarkState.Hide:
          this.iUe(a.MarkId);
      }
    }
    this.Finish();
  }
  iUe(e) {
    return ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)?.ShowCondition === -1;
  }
}
exports.LevelEventToggleMapMarkState = LevelEventToggleMapMarkState;
//# sourceMappingURL=LevelEventToggleMapMarkState.js.map