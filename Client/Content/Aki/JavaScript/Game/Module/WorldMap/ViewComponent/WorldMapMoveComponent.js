"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapMoveComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapComponent_1 = require("../../Map/Base/MapComponent");
const MapUtil_1 = require("../../Map/MapUtil");
const MarkItem_1 = require("../../Map/Marks/MarkItem/MarkItem");
class WorldMapMoveComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.HFo = false;
    this.hfu = false;
    this.F9l = undefined;
    this.jFo = undefined;
    this.WFo = undefined;
    this.KFo = undefined;
    this.QFo = new Vector2D_1.Vector2D();
    this.XFo = new Vector2D_1.Vector2D();
    this.m5l = undefined;
    this.$Fo = undefined;
    this.YFo = t => {
      t = Vector2D_1.Vector2D.Create(t);
      this.SetMapPosition(t, false, 2);
    };
    this.JFo = t => {
      var e = Vector2D_1.Vector2D.Create();
      t.Multiply(this.BFo.TweenTime, e);
      var t = Vector2D_1.Vector2D.Create(this.MapUiPosition).AdditionEqual(e);
      this.SetMapPosition(t, true, 1, 2, CommonParamById_1.configCommonParamById.GetFloatConfig("MapDragInertiaTime"));
    };
    this.Ngo = () => {
      if (!this.hfu) {
        this.r3o(true);
      }
    };
    this.zFo = () => {};
    this.vKe = t => {
      if (!this.hfu) {
        this.ZFo(t);
      }
    };
    this.e3o = false;
    this.t3o = false;
    this.i3o = t => {
      this.QFo.Y = t;
      this.e3o = true;
    };
    this.o3o = t => {
      this.XFo.X = t;
      this.t3o = true;
    };
    this.Iwl = t => {
      var t = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(Vector2D_1.Vector2D.Create(t.X, t.Y));
      var e = ModelManager_1.ModelManager.WorldMapModel.MapScale;
      t.UnaryNegation(t);
      t.MultiplyEqual(e);
      this.SetMapPosition(t, false, 2);
    };
  }
  get ComponentType() {
    return 3;
  }
  get NYa() {
    var t = this.Parent;
    if (t !== undefined) {
      return t;
    }
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  get BFo() {
    return this.NYa.UiParams;
  }
  get PYe() {
    return this.NYa.ViewPortSize;
  }
  get FYa() {
    return this.NYa.MapSize;
  }
  get MapUiPosition() {
    var t;
    if (this.m5l === undefined) {
      t = this.NYa.Map.GetRootItem().GetAnchorOffset();
      this.m5l = Vector2D_1.Vector2D.Create(t.X, t.Y);
    }
    return this.m5l;
  }
  get SafeAreaSize() {
    var t = this.NYa.Map;
    var e = this.KFo;
    var i = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(t.MapId);
    var i = i.SafeAreaOffset.length === 4 ? i.SafeAreaOffset : [0, 0, 0, 0];
    e.MinX = -((this.FYa.X + t.MapOffset.Y + i[1]) * this.MapScale - this.PYe.X) / 2;
    e.MaxX = ((this.FYa.X - t.MapOffset.X - i[0]) * this.MapScale - this.PYe.X) / 2;
    e.MinY = -((this.FYa.Y - t.MapOffset.Z + i[3]) * this.MapScale - this.PYe.Y) / 2;
    e.MaxY = ((this.FYa.Y - t.MapOffset.W - i[2]) * this.MapScale - this.PYe.Y) / 2;
    return e;
  }
  get DangerousAreaSize() {
    var t = this.NYa.Map;
    var e = this.$Fo;
    var i = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(t.MapId);
    var i = i.SafeAreaOffset.length === 4 ? i.SafeAreaOffset : [0, 0, 0, 0];
    e.MinX = -((this.FYa.X + t.MapOffset.Y + t.FakeOffset + i[1]) * this.MapScale - this.PYe.X) / 2;
    e.MaxX = ((this.FYa.X - t.MapOffset.X + t.FakeOffset - i[0]) * this.MapScale - this.PYe.X) / 2;
    e.MinY = -((this.FYa.Y - t.MapOffset.Z + t.FakeOffset + i[3]) * this.MapScale - this.PYe.Y) / 2;
    e.MaxY = ((this.FYa.Y - t.MapOffset.W + t.FakeOffset - i[2]) * this.MapScale - this.PYe.Y) / 2;
    return e;
  }
  get IsTweeningMove() {
    return this.HFo;
  }
  get TweenTarget() {
    return this.F9l;
  }
  KillTweening() {
    if (this.HFo) {
      this.r3o();
    }
    this.HFo = false;
  }
  get IsDragMoveDisabled() {
    return this.hfu;
  }
  get MapScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale;
  }
  OnAdd() {
    this.KFo = {
      MinX: 0,
      MaxX: 0,
      MinY: 0,
      MaxY: 0
    };
    this.$Fo = {
      MinX: 0,
      MaxX: 0,
      MinY: 0,
      MaxY: 0
    };
    this.WFo = (0, puerts_1.toManualReleaseDelegate)(this.YFo);
  }
  OnEnable() {
    this.dde();
  }
  OnDisable() {
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapDragInertia, this.JFo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapPointerDrag, this.vKe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapPointerDown, this.Ngo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapWheelAxisInput, this.zFo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapJoystickMoveForward, this.i3o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapJoystickMoveRight, this.o3o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MoveWorldMapToPosition, this.Iwl);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapDragInertia, this.JFo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapPointerDrag, this.vKe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapPointerDown, this.Ngo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapWheelAxisInput, this.zFo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapJoystickMoveForward, this.i3o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapJoystickMoveRight, this.o3o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MoveWorldMapToPosition, this.Iwl);
  }
  OnRemove() {
    this.r3o();
    (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
    this.WFo = undefined;
    this.KFo = undefined;
    this.$Fo = undefined;
  }
  PushMap(t, e = true, i = 2) {
    if (this.BFo) {
      this.PushMapByUiPosition(t.UiPosition, e, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 18, "请于根节点挂KuroWorldMapUIParams组件");
    }
  }
  PushMapByUiPosition(t, e = true, i = 2) {
    var s;
    var h;
    var r;
    var n;
    var a;
    if (this.BFo) {
      s = t.X;
      t = t.Y;
      h = this.NYa.Map.GetRootItem().GetAnchorOffset();
      a = s * this.MapScale + h.X;
      h = t * this.MapScale + h.Y;
      r = this.BFo.FocusMark_AnchoredPosition.X;
      n = this.BFo.FocusMark_AnchoredPosition.Y;
      if (a === r && h === n) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapPositionChanged);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapUpdateMultiMap);
      } else {
        a = Vector2D_1.Vector2D.Create(-s * this.MapScale + r, -t * this.MapScale + n);
        this.SetMapPosition(a, e, i, this.BFo.TweenTypeEase, this.BFo.TweenTime, true, true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 18, "请于根节点挂KuroWorldMapUIParams组件");
    }
  }
  SetMapPosition(e, i, s = 0, h, r, n = true, a = false) {
    if (e) {
      if (this.BFo) {
        let t = Vector2D_1.Vector2D.Create();
        if (e instanceof Vector2D_1.Vector2D) {
          t.DeepCopy(e);
        } else if (e instanceof MarkItem_1.MarkItem) {
          t.X = e.UiPosition.X;
          t.Y = e.UiPosition.Y;
          t.MultiplyEqual(this.MapScale).UnaryNegation(t);
        }
        var e = Vector2D_1.Vector2D.Create(t.X, t.Y);
        t = this.n3o(e, s);
        const o = () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapPositionChanged);
          if (!this.HFo) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapUpdateMultiMap);
          }
        };
        if (i) {
          e = this.NYa.Map.GetRootItem().GetAnchorOffset();
          s = t.ToUeVector2D(true);
          if (this.Elh(e, s)) {
            this.l8l(t);
            o();
          } else {
            this.r3o();
            this.hfu = a;
            this.HFo = true;
            this.F9l = t;
            this.jFo = UE.LTweenBPLibrary.Vector2To(GlobalData_1.GlobalData.World, this.WFo, e, s, r, 0, h);
            this.jFo.OnCompleteCallBack.Bind(() => {
              this.F9l = undefined;
              this.HFo = false;
              this.hfu = false;
              o();
            });
          }
        } else {
          this.l8l(t);
          if (n) {
            o();
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "请于根节点挂KuroWorldMapUIParams组件");
      }
    }
  }
  SetMapPositionCauseByScaling(t, e, i = 0) {
    var s = this.IsTweeningMove;
    this.KillTweening();
    this.SetMapPosition(t, false, i);
    if (e) {
      this.SetMapPosition(e, s, i);
    }
  }
  l8l(t) {
    this.NYa.Map.GetRootItem().SetAnchorOffset(t.ToUeVector2D(true));
    this.m5l = t;
    this._8l(t);
  }
  _8l(t) {
    var t = Vector2D_1.Vector2D.Create(t.X, t.Y);
    var e = this.NYa.Map;
    var i = ModelManager_1.ModelManager.WorldMapModel.MapScale;
    t.DivisionEqual(i);
    t.UnaryNegation(t);
    e.FogUnlockAnchorItem.SetAnchorOffset(t.ToUeVector2D(true));
  }
  Elh(t, e) {
    return MathUtils_1.MathUtils.IsNearlyEqual(t.X, e.X) && MathUtils_1.MathUtils.IsNearlyEqual(t.Y, e.Y);
  }
  FocusPlayer(t, e = false, i = 0) {
    var s = Vector2D_1.Vector2D.Create();
    t.Multiply(this.MapScale, s).UnaryNegation(s);
    this.SetMapPosition(s, e, i, this.BFo.TweenTypeEase, this.BFo.TweenTime, true, true);
  }
  n3o(t, e, i = false) {
    let s = t.X;
    let h = t.Y;
    switch (e) {
      case 0:
        break;
      case 1:
        s = MathCommon_1.MathCommon.Clamp(t.X, this.SafeAreaSize.MinX, this.SafeAreaSize.MaxX);
        h = MathCommon_1.MathCommon.Clamp(t.Y, this.KFo.MinY, this.KFo.MaxY);
        break;
      case 2:
        s = MathCommon_1.MathCommon.Clamp(t.X, this.DangerousAreaSize.MinX, this.DangerousAreaSize.MaxX);
        h = MathCommon_1.MathCommon.Clamp(t.Y, this.DangerousAreaSize.MinY, this.DangerousAreaSize.MaxY);
    }
    let r = t;
    if (i || e === 0) {
      r.X = s;
      r.Y = h;
    } else {
      r = Vector2D_1.Vector2D.Create(s, h);
    }
    return r;
  }
  r3o(t) {
    if (this.jFo?.IsValid()) {
      this.jFo.Kill(t);
      this.jFo = undefined;
    }
    this.F9l = undefined;
    this.HFo = false;
    this.hfu = false;
  }
  ZFo(t) {
    var e = Vector2D_1.Vector2D.Create(this.MapUiPosition);
    this.SetMapPosition(e.AdditionEqual(t), false, 2);
  }
  C_d() {
    var t = ModelManager_1.ModelManager.WorldMapModel;
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig("MapDragSpeedMultiplier") ?? 1;
    var i = t.MapScaleMax - t.MapScaleMin;
    if (i > 0) {
      return (t.MapScale - t.MapScaleMin) * (1 - e) / i + e;
    } else {
      return 1;
    }
  }
  TickMoveDirty() {
    var t;
    var e;
    if (this.e3o || this.t3o) {
      t = Vector2D_1.Vector2D.Create(this.MapUiPosition);
      e = this.C_d();
      if (this.e3o) {
        t.AdditionEqual(this.QFo.MultiplyEqual(e));
        this.e3o = false;
      }
      if (this.t3o) {
        t.AdditionEqual(this.XFo.MultiplyEqual(e));
        this.t3o = false;
      }
      this.SetMapPosition(t, false, 2);
    }
  }
}
exports.WorldMapMoveComponent = WorldMapMoveComponent;
//# sourceMappingURL=WorldMapMoveComponent.js.map