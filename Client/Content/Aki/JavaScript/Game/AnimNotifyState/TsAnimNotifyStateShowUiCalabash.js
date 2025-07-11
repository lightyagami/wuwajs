"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsUiSceneRoleActor_1 = require("../Module/UiComponent/TsUiSceneRoleActor");
const UiCalabashAnsContext_1 = require("../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiCalabashAnsContext");
class TsAnimNotifyStateShowUiCalabash extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Socket = undefined;
    this.IsRotate = false;
    this.UiCalabashAnsContext = undefined;
  }
  Constructor() {
    this.UiCalabashAnsContext = undefined;
  }
  K2_NotifyBegin(t, e, o) {
    var i;
    if (this.Socket) {
      if ((i = t.GetOwner()) instanceof TsUiSceneRoleActor_1.default) {
        this.UiCalabashAnsContext = new UiCalabashAnsContext_1.UiCalabashAnsContext(this.Socket, this.IsRotate);
        i.Model?.CheckGetComponent(6).AddAns("UiCalabashAnsContext", this.UiCalabashAnsContext);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "Ui界面葫芦显示动画通知中socket配置为空", ["meshComp", t], ["animation", e]);
    }
    return false;
  }
  K2_NotifyEnd(t, e) {
    if (this.Socket) {
      var o = t.GetOwner();
      if (o instanceof TsUiSceneRoleActor_1.default) {
        if (!this.UiCalabashAnsContext) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Calabash", 43, "TsAnimNotifyStateShowUiCalabash未成对，UiCalabashAnsContext为空");
          }
          return false;
        }
        o.Model?.CheckGetComponent(6).ReduceAns("UiCalabashAnsContext", this.UiCalabashAnsContext);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "Ui界面葫芦显示动画通知中socket配置为空", ["meshComp", t], ["animation", e]);
    }
    return false;
  }
  GetNotifyName() {
    return "Ui界面葫芦显示";
  }
}
exports.default = TsAnimNotifyStateShowUiCalabash;
//# sourceMappingURL=TsAnimNotifyStateShowUiCalabash.js.map