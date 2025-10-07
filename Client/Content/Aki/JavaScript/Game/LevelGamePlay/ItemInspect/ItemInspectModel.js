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
    this.hfd = false;
    this.lfd = 0;
    this._fd = 0;
    this.ufd = 0;
    this.cfd = "";
    this.dfd = "";
    this.mfd = 0;
    this.ffd = 0;
    this.gfd = 0;
    this.Cfd = 0;
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
    this.rmd = 0;
    this.omd = 0;
    this.vyd = undefined;
    this.Mon = undefined;
    this.lzu = undefined;
  }
  OnInit() {
    this.hQu.set(0, "AstrologyItemInspectView");
    this.lQu.Init();
    return true;
  }
  InitGlobalConfig(t) {
    this.lfd = t.输入速度限制;
    this._fd = t.平滑插值旋转速度;
    this.ufd = t.重置旋转速度;
    this.cfd = t.压暗网格体.ToAssetPathName();
    this.dfd = t.压暗材质.ToAssetPathName();
    this.mfd = t.压暗屏幕深度;
    this.ffd = t.压暗不透明度;
    this.gfd = t.压暗过渡时间;
    this.Cfd = t.压暗过渡间隔;
    this.hfd = true;
  }
  IsInitGlobalConfig() {
    return this.hfd;
  }
  GetInputSeedLimit() {
    return this.lfd;
  }
  GetRotateInterpSpeed() {
    return this._fd;
  }
  GetResetItemRotationSpeed() {
    return this.ufd;
  }
  GetDarkStageMeshPath() {
    return this.cfd;
  }
  GetDarkStageMaterialPath() {
    return this.dfd;
  }
  GetDarkStageScreenDepth() {
    return this.mfd;
  }
  GetDarkStageAlpha() {
    return this.ffd;
  }
  GetDarkStageBlendTime() {
    return this.gfd;
  }
  GetDarkStageBlendInterval() {
    return this.Cfd;
  }
  InitData(t, i, e, s, h, r, o) {
    this.dQu = this.hQu.get(t);
    this.rmd = i;
    this.omd = i * GAME_PAD_SENSITIVITY;
    this.cQu = e;
    this.mQu = s;
    this.vyd = h;
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
    this.vyd = undefined;
    this.Mon = undefined;
    this.rmd = 0;
    this.omd = 0;
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
    return this.rmd;
  }
  GetGamePadSensitivity() {
    return this.omd;
  }
  GetMaxValidPointCount() {
    return this.mQu?.GetMaxValidCount() ?? 0;
  }
  GetCheckedValidPointCount() {
    return this.mQu?.GetCheckedValidCount() ?? 0;
  }
  GetFinishEffect() {
    return this.vyd;
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