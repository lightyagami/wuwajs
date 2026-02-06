"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourMapItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const MotorParkourPlayerMarkItem_1 = require("./Map/MotorParkourPlayerMarkItem");
class MotorParkourMapItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.LevelData = e;
    this.JTf = undefined;
    this.Wzu = Vector2D_1.Vector2D.Create();
    this.Qzu = Vector2D_1.Vector2D.Create();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [1, UE.UI2DLineRaw], [2, UE.UI2DLineRaw]];
  }
  async OnBeforeStartAsync() {
    this.Wzu.Set(this.LevelData.UiOffset[0], this.LevelData.UiOffset[1]);
    this.Qzu.Set(this.LevelData.CenterOffset[0], this.LevelData.CenterOffset[1]);
    this.GetItem(0).SetAnchorOffset(this.Wzu.ToUeVector2D());
    var e = [];
    this.JTf = new MotorParkourPlayerMarkItem_1.MotorParkourPlayerMarkItem();
    e.push(this.JTf.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.DrawMapPathLine();
    var t = this.GetItem(3);
    t.SetAnchorOffset(ModelManager_1.ModelManager.MotorParkourMapModel.EndPointOffset.ToUeVector2D());
    var r = ModelManager_1.ModelManager.MotorParkourMapModel.EndPointRotator;
    t.K2_AddRelativeRotation(r, false, undefined, false);
    await Promise.all(e);
  }
  DrawMapPathLine() {
    ModelManager_1.ModelManager.MotorParkourMapModel.InitSplinePoints(this.LevelData.SplineId, this.LevelData.MapScale, this.Qzu, this.LevelData.SplineStartIndex, this.LevelData.SplineEndIndex);
    var e = ModelManager_1.ModelManager.MotorParkourMapModel.SplinePoints;
    this.GetUiLineRaw(1)?.SetPoints(e);
  }
  UpdatePlayerPosition() {
    this.JTf?.UpdatePosition(this.LevelData.MapScale, this.Qzu);
    var e = ModelManager_1.ModelManager.MotorParkourMapModel.GetPathTakenSplinePoints();
    this.GetUiLineRaw(2)?.SetPoints(e);
  }
}
exports.MotorParkourMapItem = MotorParkourMapItem;
//# sourceMappingURL=MotorParkourMapItem.js.map