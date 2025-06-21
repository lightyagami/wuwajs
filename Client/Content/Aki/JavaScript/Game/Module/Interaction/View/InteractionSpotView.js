"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.InteractionSpotView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  CENTER_Y = 62.5,
  center = Vector2D_1.Vector2D.Create(0, CENTER_Y);
class InteractionSpotView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.RootActorRotation = void 0, this.Fq1 = void 0, this.Nq1 = void 0, this.Wai = !1, this.Wq1 = !1, this.Qq1 = !1, this.Oau = !1, this.Hea = void 0, this.$G1 = void 0, this.WG1 = !1, this.QG1 = !1, this.KG1 = void 0, this.XG1 = void 0, this.D81 = void 0, this.yB = Vector_1.Vector.Create(), this.ScreenPosition = Vector2D_1.Vector2D.Create(), this.ICt = Vector2D_1.Vector2D.Create(), this._ii = !1, this.$xt = t => {
      this.QG1 && this.KG1 === t ? this.Destroy(this.XG1) : this.WG1 && (this.WG1 = !1, "NorOut" === t ? this.Hea?.PlayLevelSequenceByName("Select") : "Start" !== t && "UnSelect" !== t || this.Hea?.PlayLevelSequenceByName("Loop"))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem]
    ]
  }
  OnStart() {
    this.RootItem?.SetUIActive(!0), this.RootActorRotation = this.RootActor.K2_GetActorRotation(), this.Fq1 = this.GetItem(0), this.Nq1 = this.GetItem(1), this.Fq1.SetUIActive(!0), this.Nq1.SetUIActive(!1), this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.Hea.BindSequenceCloseEvent(this.$xt)
  }
  OnAfterShow() {
    this.Kq1()
  }
  DestroySelf(t) {
    this.QG1 = !0, this.Hea?.StopCurrentSequence(), this.$G1 ? (this.KG1 = "SetOut", this.Hea?.PlayLevelSequenceByName("SetOut")) : !1 === this.$G1 && (this.KG1 = "NorOut", this.Hea?.PlayLevelSequenceByName("NorOut")), this.XG1 = t
  }
  Update() {
    var t, i, s;
    this.D81 && this._ii && (t = Global_1.Global.CharacterController, i = this.D81.D_GetTransform().TransformPositionNoScale(this.yB.ToUeVector()), s = (0, puerts_1.$ref)(void 0), UE.GameplayStatics.D_ProjectWorldToScreen(t, i, s), t = (0, puerts_1.$unref)(s), this.ScreenPosition.Set(t.X, t.Y), this.ICt.Equals(this.ScreenPosition, 1) || (this.ICt.DeepCopy(this.ScreenPosition), i = Vector2D_1.Vector2D.Create(t.X, t.Y), s = ModelManager_1.ModelManager.BattleUiModel, i.MultiplyEqual(s.ScreenPositionScale).AdditionEqual(s.ScreenPositionOffset).MultiplyEqual(Vector2D_1.Vector2D.Create(1, -1)).AdditionEqual(center), this.RootItem.SetAnchorOffset(i.ToUeVector2D())))
  }
  SetOwnerActor(t) {
    this.D81 = t
  }
  SetRootItemState(t) {
    this._ii = t, this.RootItem?.SetUIActive(t)
  }
  SetIsSelect(t) {
    this.Wai = t, this.Kq1()
  }
  SetIsInEntityInteractRange(t) {
    this.Wq1 = t, this.Kq1()
  }
  SetIsTracking(t) {
    this.Qq1 = t, this.Kq1()
  }
  SetIsObstruct(t) {
    this.Oau = t, this.Kq1()
  }
  SetOffset(t) {
    this.yB.DeepCopy(t)
  }
  Kq1() {
    var t = this.Wai && this.Wq1;
    this.Qq1 ? (this.Fq1.SetUIActive(!1), this.Nq1.SetUIActive(!0)) : (this.Fq1.SetUIActive(!0), this.Nq1.SetUIActive(!1)), this.$G1 !== t && (this.YG1(t), this.$G1 = t), this.Fq1.SetAlpha(this.Oau ? .3 : 1), this.Nq1.SetAlpha(this.Oau ? .3 : 1)
  }
  YG1(t) {
    this.WG1 = !1, this.Hea?.StopCurrentSequence(), void 0 === this.$G1 ? t ? this.Hea?.PlayLevelSequenceByName("Select") : (this.Hea?.PlayLevelSequenceByName("Start"), this.WG1 = this.Qq1) : this.$G1 ? this.$G1 && (this.WG1 = this.Qq1, this.Hea?.PlayLevelSequenceByName("UnSelect")) : this.Hea?.PlayLevelSequenceByName("Select")
  }
}
exports.InteractionSpotView = InteractionSpotView;
//# sourceMappingURL=InteractionSpotView.js.map