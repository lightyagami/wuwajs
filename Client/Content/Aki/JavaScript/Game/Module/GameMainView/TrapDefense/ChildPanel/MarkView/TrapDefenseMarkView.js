"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMarkView = undefined;
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class TrapDefenseMarkView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.MarkId = 0;
    this.yXu = Vector2D_1.Vector2D.Create(0, 0);
    this.NeedUpdatePositionInner = false;
    this.MarkId = e;
  }
  GetMarkData() {
    return ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarkInfoByMarkId(this.MarkId);
  }
  get NeedUpdatePosition() {
    return this.NeedUpdatePositionInner;
  }
  OnTowerDefenseStepUpdate(e) {}
  UpdatePosition(e, t) {
    var r;
    var s = this.GetMarkData();
    if (s !== undefined && !(s = s.UiPosition).IsZero()) {
      s = Vector2D_1.Vector2D.Create(s.X, s.Y);
      r = Vector2D_1.Vector2D.Create();
      s.Multiply(e, r).Subtraction(t, r);
      this.SetAnchorOffset(r);
      if (this.IsShow) {
        this.GetRootItem().SetAlpha(1);
      }
    }
  }
  SetAnchorOffset(e, t) {
    if (!e.Equals(this.yXu)) {
      var r = this.GetRootItem();
      if (r !== undefined) {
        r.SetAnchorOffset(e.ToUeVector2D());
      }
      if (t !== undefined) {
        for (const s of t) {
          s.SetAnchorOffset(e.ToUeVector2D());
        }
      }
      this.yXu.Set(e.X, e.Y);
    }
  }
}
exports.TrapDefenseMarkView = TrapDefenseMarkView;
//# sourceMappingURL=TrapDefenseMarkView.js.map