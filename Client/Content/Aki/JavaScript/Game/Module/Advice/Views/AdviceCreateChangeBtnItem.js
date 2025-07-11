"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceCreateChangeBtnItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceCreateChangeBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Xy = -0;
    this.h7e = () => {
      this.Q7e();
      UiManager_1.UiManager.OpenView("AdviceWordView");
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.h7e]];
  }
  Q7e() {
    var e = ModelManager_1.ModelManager.AdviceModel;
    e.CurrentChangeWordType = 0;
    var i = e.CurrentSentenceWordMap.get(this.Xy);
    e.CurrentSelectWordId = i;
    e.CurrentPreSelectSentenceIndex = this.Xy;
  }
  SetIndex(e) {
    this.Xy = e;
  }
  UpdateCurrentLineMode(e) {
    this.X7e(e);
  }
  X7e(e) {
    if (e === 0) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeOneLineWord");
    } else if (this.Xy === 0) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeFirstLineWord");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeLastLineWord");
    }
  }
}
exports.AdviceCreateChangeBtnItem = AdviceCreateChangeBtnItem;
//# sourceMappingURL=AdviceCreateChangeBtnItem.js.map