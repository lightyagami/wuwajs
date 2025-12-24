"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackedMarkForTower = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiLayer_1 = require("../../../Ui/UiLayer");
const TrackedMark_1 = require("./TrackedMark");
const SUB_SCALE = 0.8;
const CENTER_Y = 62.5;
const center = Vector2D_1.Vector2D.Create(0, CENTER_Y);
const RAD_2_DEG = 180 / Math.PI;
class TrackedMarkForTower extends TrackedMark_1.TrackedMark {
  constructor() {
    super(...arguments);
    this.$te = undefined;
    this.Jna = undefined;
    this.Hnt = new Map();
    this.zna = Number.MAX_VALUE;
    this.Zna = () => {
      (0, puerts_1.releaseManualReleaseDelegate)(this.esa);
      this.Jna?.Kill();
      this.Jna = undefined;
      this.Gnt(5);
    };
    this.esa = t => {
      this.GetSprite(2).SetFillAmount(t);
      this.GetSprite(3).SetFillAmount(t);
    };
  }
  Initialize(t) {
    this.CreateThenShowByResourceIdAsync("UiItem_TowerBar", t, true);
  }
  OnUiShow() {
    if (this.IsSubTrack) {
      this.RootItem?.D_SetRelativeScale3D(new UE.VectorDouble(SUB_SCALE, SUB_SCALE, SUB_SCALE));
    } else {
      this.RootItem?.D_SetRelativeScale3D(new UE.VectorDouble(1, 1, 1));
    }
    this.Gnt(6);
    this.bnt(4);
  }
  OnUiHide() {
    this.Gnt(4);
    this.bnt(6);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    this.DirectionComp = this.GetItem(1);
    this.DirectionComp.SetUIActive(!this.IsInTrackRange && !this.IsForceHideDirection);
    this.Qnt();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.$te = undefined;
    this.Zna();
    this.Gnt(4);
    this.Gnt(5);
    this.Gnt(6);
    this.Hnt.clear();
  }
  Update(t) {
    if (GlobalData_1.GlobalData.World) {
      if (UiLayer_1.UiLayer.UiRootItem) {
        if (this.RootItem) {
          this.CurShowTime += t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
          this.RootItem.SetUIActive(true);
          this.UpdatePositionAndRotation(t);
          this.tsa();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 49, "【疑难杂症】标记固定在屏幕中心，RootItem为空");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 49, "【疑难杂症】标记固定在屏幕中心，GameWorld为空");
    }
  }
  UpdatePositionAndRotation(t) {
    var i;
    var e = Global_1.Global.CharacterController;
    var s = this.TempTrackPosition.ToUeVector();
    var r = UE.GameplayStatics.D_ProjectWorldToScreen(e, s, this.ScreenPositionRef);
    if (!r) {
      (s = (i = ModelManager_1.ModelManager.CameraModel.CameraTransform).InverseTransformPositionNoScale(s)).X = -s.X;
      i = i.TransformPositionNoScale(s);
      UE.GameplayStatics.D_ProjectWorldToScreen(e, i, this.ScreenPositionRef);
    }
    var s = (0, puerts_1.$unref)(this.ScreenPositionRef);
    this.ScreenPosition.Set(s.X, s.Y);
    if (!this.LastScreenPosition.Equals(this.ScreenPosition, 1) || !!this.NiagaraNeedActivateNextTick) {
      this.LastScreenPosition.DeepCopy(this.ScreenPosition);
      e = ModelManager_1.ModelManager.BattleUiModel;
      this.ScreenPosition.MultiplyEqual(e.ScreenPositionScale).AdditionEqual(e.ScreenPositionOffset).MultiplyEqual(this.PointTransport);
      this.InRange = this.ClampToEllipse(this.ScreenPosition, r);
      i = this.ScreenPosition.AdditionEqual(center);
      this.RootItem.SetAnchorOffset(i.ToUeVector2D());
      if (this.InRange || this.IsInTrackRange || this.IsForceHideDirection) {
        this.DirectionComp.SetUIActive(false);
      } else {
        this.TempRotator.Reset();
        this.TempRotator.Yaw = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) * RAD_2_DEG - 90;
        this.DirectionComp.SetUIRelativeRotation(this.TempRotator.ToUeRotator());
        this.DirectionComp.SetUIActive(true);
      }
    }
  }
  tsa() {
    if (!this.$te) {
      var t = this.TrackTarget;
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (!t) {
        return;
      }
      t = t.Entity;
      if (!t) {
        return;
      }
      this.$te = t.GetComponent(182);
      if (!this.$te) {
        return;
      }
    }
    var i;
    var e;
    var t = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
    if (!(t >= this.zna)) {
      i = t / this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
      this.GetSprite(0).SetFillAmount(i);
      this.bnt(5);
      e = this.GetSprite(3).GetFillAmount();
      this.Zna();
      this.isa(e, i);
      this.zna = t;
    }
  }
  Qnt() {
    this.Est(4);
    this.Est(5);
    this.Est(6);
  }
  Est(t) {
    var i = [];
    var e = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = e.Num();
    for (let t = 0; t < s; t++) {
      i.push(e.Get(t));
    }
    this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt.get(t);
    if (t) {
      for (const i of t) {
        i.Play();
      }
    }
  }
  Gnt(t) {
    t = this.Hnt.get(t);
    if (t) {
      for (const i of t) {
        i.Stop();
      }
    }
  }
  isa(t, i) {
    this.Jna = UE.LTweenBPLibrary.FloatTo(this.RootActor, (0, puerts_1.toManualReleaseDelegate)(this.esa), t, i);
    this.Jna.OnCompleteCallBack.Bind(this.Zna);
  }
}
exports.TrackedMarkForTower = TrackedMarkForTower;
//# sourceMappingURL=TrackedMarkForTower.js.map