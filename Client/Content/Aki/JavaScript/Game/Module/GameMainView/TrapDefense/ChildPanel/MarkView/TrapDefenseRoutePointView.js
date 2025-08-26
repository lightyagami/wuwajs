"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRoutePointView = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const TrapDefenseDefine_1 = require("../../../../TrapDefense/TrapDefenseDefine");
class TrapDefenseRoutePointView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.StartTimestamp = 0;
    this.Index = 0;
  }
  OnBeforeShow() {
    var e = this.GetSprite(0);
    var r = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePointNum();
    e.SetAlpha((r - this.Index) / r);
    this.RootItem.SetAlpha(0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  UpdatePosition(e, r, t) {
    if (this.IsShow) {
      this.RootItem.SetAlpha(1);
      (e = Vector_1.Vector.Create(e.X, e.Y, e.Z)).Multiply(TrapDefenseDefine_1.worldToTrapDefenseUiUnit, e);
      (e = Vector2D_1.Vector2D.Create(e.X, e.Y)).Multiply(r, e).Subtraction(t, e);
      this.GetRootItem().SetAnchorOffset(e.ToUeVector2D());
    }
  }
}
exports.TrapDefenseRoutePointView = TrapDefenseRoutePointView;
//# sourceMappingURL=TrapDefenseRoutePointView.js.map