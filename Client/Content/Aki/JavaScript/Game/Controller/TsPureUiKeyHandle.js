"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsPureUiKeyHandle = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const ModelManager_1 = require("../Manager/ModelManager");
const UiLayer_1 = require("../Ui/UiLayer");
const LEFT_BARACKET_NAME = new UE.FName("LeftBracket");
const RIGHT_BARACKET_NAME = new UE.FName("RightBracket");
class TsPureUiKeyHandle {
  constructor() {
    this.R$e = undefined;
    this.MDa = () => {
      if (ModelManager_1.ModelManager.SundryModel.CanOpenGmView) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "按下 】 键显示所有界面");
        }
        UiLayer_1.UiLayer.ForceShowUi();
      }
    };
    this.SDa = () => {
      if (ModelManager_1.ModelManager.SundryModel.CanOpenGmView) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Input", 10, "按下 【 键隐藏所有界面");
        }
        UiLayer_1.UiLayer.ForceHideUi();
      }
    };
  }
  Initialize(e) {
    this.R$e = e;
  }
  Reset() {
    this.R$e = undefined;
  }
  BindKey() {
    cpp_1.FKuroInputInterface.RegisterKeyBinding(new UE.InputChord(new UE.Key(LEFT_BARACKET_NAME), false, false, false, false), 1, this.R$e, this, this.MDa);
    cpp_1.FKuroInputInterface.RegisterKeyBinding(new UE.InputChord(new UE.Key(RIGHT_BARACKET_NAME), false, false, false, false), 1, this.R$e, this, this.SDa);
  }
}
exports.TsPureUiKeyHandle = TsPureUiKeyHandle;
//# sourceMappingURL=TsPureUiKeyHandle.js.map