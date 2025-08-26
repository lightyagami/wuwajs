"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectModel = undefined;
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const ItemInspectEffectCenter_1 = require("./Effect/ItemInspectEffectCenter");
const GAME_PAD_SENSITIVITY = 20;
class ItemInspectModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Jld = false;
    this.Zld = 0;
    this.e_d = 0;
    this.t_d = 0;
    this.i_d = "";
    this.r_d = "";
    this.o_d = 0;
    this.n_d = 0;
    this.s_d = 0;
    this.a_d = 0;
    this.R$u = new Map();
    this.w$u = new ItemInspectEffectCenter_1.ItemInspectEffectCenter();
    this.CloseSkipConfirmBox = false;
    this.OpenRangeDebug = false;
    this.OriginItemActor = undefined;
    this.DarkStageActor = undefined;
    this.DarkStageMaterial = undefined;
    this.DarkStageBlendTimer = undefined;
    this.CurItemId = 0;
    this.ResettingItem = false;
    this.OnResetItemRotationFinish = undefined;
    this.InputDirect = Vector2D_1.Vector2D.Create();
    this.TempRotator = Rotator_1.Rotator.Create();
    this.TempRotator2 = Rotator_1.Rotator.Create();
    this.TargetQuat = Quat_1.Quat.Create();
    this.TempQuat = Quat_1.Quat.Create();
    this.TempVector = Vector_1.Vector.Create();
    this.VisiblePoints = [];
    this.VisiblePointsPool = [];
    this.L$u = false;
    this.A$u = false;
    this.P$u = undefined;
    this.D$u = undefined;
    this.x$u = undefined;
    this.nld = 0;
    this.sld = 0;
    this.Aud = undefined;
    this.Mon = undefined;
    this.U$u = undefined;
  }
  OnInit() {
    this.R$u.set(0, "AstrologyItemInspectView");
    this.w$u.Init();
    return true;
  }
  InitGlobalConfig(t) {
    this.Zld = t.输入速度限制;
    this.e_d = t.平滑插值旋转速度;
    this.t_d = t.重置旋转速度;
    this.i_d = t.压暗网格体.ToAssetPathName();
    this.r_d = t.压暗材质.ToAssetPathName();
    this.o_d = t.压暗屏幕深度;
    this.n_d = t.压暗不透明度;
    this.s_d = t.压暗过渡时间;
    this.a_d = t.压暗过渡间隔;
    this.Jld = true;
  }
  IsInitGlobalConfig() {
    return this.Jld;
  }
  GetInputSeedLimit() {
    return this.Zld;
  }
  GetRotateInterpSpeed() {
    return this.e_d;
  }
  GetResetItemRotationSpeed() {
    return this.t_d;
  }
  GetDarkStageMeshPath() {
    return this.i_d;
  }
  GetDarkStageMaterialPath() {
    return this.r_d;
  }
  GetDarkStageScreenDepth() {
    return this.o_d;
  }
  GetDarkStageAlpha() {
    return this.n_d;
  }
  GetDarkStageBlendTime() {
    return this.s_d;
  }
  GetDarkStageBlendInterval() {
    return this.a_d;
  }
  InitData(t, i, e, s, h, r, o) {
    this.D$u = this.R$u.get(t);
    this.nld = i;
    this.sld = i * GAME_PAD_SENSITIVITY;
    this.P$u = e;
    this.x$u = s;
    this.Aud = h;
    this.Mon = r;
    this.U$u = o;
  }
  ClearData() {
    this.CurItemId = 0;
    this.InputDirect.Reset();
    this.w$u.ClearEffects();
    this.VisiblePoints.length = 0;
    this.VisiblePointsPool.length = 0;
    this.L$u = false;
    this.A$u = false;
    this.P$u = undefined;
    this.D$u = undefined;
    this.x$u = undefined;
    this.Aud = undefined;
    this.Mon = undefined;
    this.nld = 0;
    this.sld = 0;
    this.U$u = undefined;
    this.ResettingItem = false;
    this.OnResetItemRotationFinish = undefined;
    this.OriginItemActor = undefined;
    if (this.DarkStageActor?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("ItemInspect Clear", this.DarkStageActor);
    }
    this.DarkStageActor = undefined;
    this.DarkStageMaterial = undefined;
    this.DarkStageBlendTimer?.Remove();
    this.DarkStageBlendTimer = undefined;
  }
  LoadPrefabReady() {
    this.L$u = true;
  }
  OpenViewReady() {
    this.A$u = true;
  }
  IsInspectReady() {
    return this.L$u && this.A$u;
  }
  GetViewName() {
    return this.D$u;
  }
  GetRangeChecker() {
    return this.P$u;
  }
  GetPointManager() {
    return this.x$u;
  }
  GetEffectCenter() {
    return this.w$u;
  }
  GetDragSensitivity() {
    return this.nld;
  }
  GetGamePadSensitivity() {
    return this.sld;
  }
  GetMaxValidPointCount() {
    return this.x$u?.GetMaxValidCount() ?? 0;
  }
  GetCheckedValidPointCount() {
    return this.x$u?.GetCheckedValidCount() ?? 0;
  }
  GetFinishEffect() {
    return this.Aud;
  }
  GetLineElement() {
    return this.Mon;
  }
  GetFinishCallback() {
    return this.U$u;
  }
}
exports.ItemInspectModel = ItemInspectModel;
//# sourceMappingURL=ItemInspectModel.js.map