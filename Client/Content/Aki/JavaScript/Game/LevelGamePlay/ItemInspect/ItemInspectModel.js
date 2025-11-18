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
    this.c0d = false;
    this.d0d = 0;
    this.m0d = 0;
    this.f0d = 0;
    this.g0d = "";
    this.C0d = "";
    this.p0d = 0;
    this.v0d = 0;
    this.y0d = 0;
    this.S0d = 0;
    this.hQu = new Map();
    this.lQu = new ItemInspectEffectCenter_1.ItemInspectEffectCenter();
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
    this._Qu = false;
    this.uQu = false;
    this.cQu = undefined;
    this.dQu = undefined;
    this.mQu = undefined;
    this.lmd = 0;
    this._md = 0;
    this.FMd = undefined;
    this.Mon = undefined;
    this.lzu = undefined;
  }
  OnInit() {
    this.hQu.set(0, "AstrologyItemInspectView");
    this.lQu.Init();
    return true;
  }
  InitGlobalConfig(t) {
    this.d0d = t.输入速度限制;
    this.m0d = t.平滑插值旋转速度;
    this.f0d = t.重置旋转速度;
    this.g0d = t.压暗网格体.ToAssetPathName();
    this.C0d = t.压暗材质.ToAssetPathName();
    this.p0d = t.压暗屏幕深度;
    this.v0d = t.压暗不透明度;
    this.y0d = t.压暗过渡时间;
    this.S0d = t.压暗过渡间隔;
    this.c0d = true;
  }
  IsInitGlobalConfig() {
    return this.c0d;
  }
  GetInputSeedLimit() {
    return this.d0d;
  }
  GetRotateInterpSpeed() {
    return this.m0d;
  }
  GetResetItemRotationSpeed() {
    return this.f0d;
  }
  GetDarkStageMeshPath() {
    return this.g0d;
  }
  GetDarkStageMaterialPath() {
    return this.C0d;
  }
  GetDarkStageScreenDepth() {
    return this.p0d;
  }
  GetDarkStageAlpha() {
    return this.v0d;
  }
  GetDarkStageBlendTime() {
    return this.y0d;
  }
  GetDarkStageBlendInterval() {
    return this.S0d;
  }
  InitData(t, i, e, s, h, r, o) {
    this.dQu = this.hQu.get(t);
    this.lmd = i;
    this._md = i * GAME_PAD_SENSITIVITY;
    this.cQu = e;
    this.mQu = s;
    this.FMd = h;
    this.Mon = r;
    this.lzu = o;
  }
  ClearData() {
    this.CurItemId = 0;
    this.InputDirect.Reset();
    this.lQu.ClearEffects();
    this.VisiblePoints.length = 0;
    this.VisiblePointsPool.length = 0;
    this._Qu = false;
    this.uQu = false;
    this.cQu = undefined;
    this.dQu = undefined;
    this.mQu = undefined;
    this.FMd = undefined;
    this.Mon = undefined;
    this.lmd = 0;
    this._md = 0;
    this.lzu = undefined;
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
    this._Qu = true;
  }
  OpenViewReady() {
    this.uQu = true;
  }
  IsInspectReady() {
    return this._Qu && this.uQu;
  }
  GetViewName() {
    return this.dQu;
  }
  GetRangeChecker() {
    return this.cQu;
  }
  GetPointManager() {
    return this.mQu;
  }
  GetEffectCenter() {
    return this.lQu;
  }
  GetDragSensitivity() {
    return this.lmd;
  }
  GetGamePadSensitivity() {
    return this._md;
  }
  GetMaxValidPointCount() {
    return this.mQu?.GetMaxValidCount() ?? 0;
  }
  GetCheckedValidPointCount() {
    return this.mQu?.GetCheckedValidCount() ?? 0;
  }
  GetFinishEffect() {
    return this.FMd;
  }
  GetLineElement() {
    return this.Mon;
  }
  GetFinishCallback() {
    return this.lzu;
  }
}
exports.ItemInspectModel = ItemInspectModel;
//# sourceMappingURL=ItemInspectModel.js.map