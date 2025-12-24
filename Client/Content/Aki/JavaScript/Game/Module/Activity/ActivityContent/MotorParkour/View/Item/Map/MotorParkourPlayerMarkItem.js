"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourPlayerMarkItem = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../../../Core/Utils/Math/Vector2D");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
const GeneralLogicTreeUtil_1 = require("../../../../../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapUtil_1 = require("../../../../../../Map/MapUtil");
const PLAYER_ROTATE_UPDATE_THRESHOLD = 10;
class MotorParkourPlayerMarkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Hzu = Vector2D_1.Vector2D.Create(0, 0);
    this.hN_ = new UE.Rotator(0, 0, 0);
  }
  UpdatePosition(e, r) {
    var t;
    var i;
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (o?.Valid && (o = o.Entity.GetComponent(3)) && (i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ?? Vector_1.Vector.ZeroVectorProxy, i = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(new Vector2D_1.Vector2D(i.X, i.Y)), t = Vector2D_1.Vector2D.Create(), i.Multiply(e, t).Subtraction(r, t), this.SetAnchorOffset(t), i = -(o.ActorRotationProxy.Yaw + 90), Math.abs(this.hN_.Yaw - i) > PLAYER_ROTATE_UPDATE_THRESHOLD)) {
      this.hN_.Yaw = i;
      this.RootItem.SetUIRelativeRotation(this.hN_);
    }
  }
  SetAnchorOffset(e, r) {
    if (!e.Equals(this.Hzu)) {
      var t = this.GetRootItem();
      if (t !== undefined) {
        t.SetAnchorOffset(e.ToUeVector2D());
      }
      if (r !== undefined) {
        for (const i of r) {
          i.SetAnchorOffset(e.ToUeVector2D());
        }
      }
      this.Hzu.Set(e.X, e.Y);
    }
  }
}
exports.MotorParkourPlayerMarkItem = MotorParkourPlayerMarkItem;
//# sourceMappingURL=MotorParkourPlayerMarkItem.js.map