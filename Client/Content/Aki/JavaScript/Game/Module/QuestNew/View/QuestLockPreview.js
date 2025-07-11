"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestLockPreview = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LockReasonItem_1 = require("./LockReasonItem");
class QuestLockPreview extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Rno = undefined;
    this.Uno = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnBeforeCreate() {
    this.Rno = this.OpenParam;
  }
  OnStart() {
    super.OnStart();
    this.Ano();
  }
  Ano() {
    if (this.Rno && this.Rno.length !== 0) {
      this.Uno = [];
      var e = this.GetItem(2);
      var i = this.GetItem(1);
      for (const o of this.Rno) {
        var t = LguiUtil_1.LguiUtil.CopyItem(e, i);
        var s = new LockReasonItem_1.LockReasonItem(o);
        s.CreateThenShowByActorAsync(t.GetOwner());
        this.Uno.push(s);
      }
      e.SetUIActive(false);
    }
  }
}
exports.QuestLockPreview = QuestLockPreview;
//# sourceMappingURL=QuestLockPreview.js.map