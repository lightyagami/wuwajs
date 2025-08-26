"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cursor = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const LguiResourceManager_1 = require("../../../Ui/LguiResourceManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SPEED = 0.05;
const ALLOW_MOVE_TICK_LIMIT = 2000;
class Cursor {
  constructor() {
    this.Bxo = undefined;
    this.bxo = undefined;
    this.qxo = undefined;
    this.Gxo = undefined;
    this.Nxo = undefined;
    this.Oxo = LguiResourceManager_1.LguiResourceManager.InvalidId;
    this.kxo = 0;
    this.Fxo = false;
    this.Vxo = true;
    this.Hxo = false;
    this.pX1 = false;
    this.IsMoveInstantly = false;
    this.jxo = 0;
    this.Wxo = undefined;
    this.Kxo = false;
    this.Qxo = 0;
  }
  Xxo() {
    if (!this.Bxo || !this.Bxo.IsValid()) {
      if (this.Oxo === LguiResourceManager_1.LguiResourceManager.InvalidId) {
        this.Oxo = LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId("UiItem_Cursor_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool), i => {
          this.Oxo = LguiResourceManager_1.LguiResourceManager.InvalidId;
          LguiUtil_1.LguiUtil.SetActorIsPermanent(i, true, true);
          this.Bxo = i.GetComponentByClass(UE.UIItem.StaticClass());
          this.bxo = this.Bxo.UIChildren.Get(0);
          this.bxo.SetUIActive(false);
        });
      }
    }
  }
  RefreshUseItem() {
    var i;
    if (!this.qxo || !this.qxo.IsValid()) {
      this.Xxo();
      if (this.Bxo?.IsValid()) {
        if (this.bxo?.IsValid()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiNavigation", 10, "拷贝一份新的光标");
          }
          this.qxo = LguiUtil_1.LguiUtil.CopyItem(this.bxo, this.Bxo);
          LguiUtil_1.LguiUtil.SetActorIsPermanent(this.qxo.GetOwner(), true, true);
          this.pX1 = false;
          this.vX1();
          this.Kxo = this.qxo.IsUIActiveSelf();
          i = this.Gxo !== undefined;
          this.TrySetUseItemUiActive(i);
          Cursor.kRe.Set(0, 0, 0);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiNavigation", 10, "光标原始节点出现问题");
        }
      }
    }
  }
  Yxo() {
    var i = this.Gxo.D_K2_GetComponentLocation();
    var t = this.Gxo.D_K2_GetComponentScale();
    Cursor.Jxo.Set(i.X + Cursor.zxo * t.X, 0, i.Z + Cursor.Zxo * t.Y);
    Cursor.ewo.DeepCopy(Cursor.Jxo);
    Cursor.kRe.DeepCopy(Cursor.Jxo);
    this.qxo.GetOwner().D_K2_SetActorLocation(Cursor.Jxo.ToUeVector(), false, undefined, false);
  }
  vX1() {
    if (this.qxo) {
      if (UiManager_1.UiManager.IsViewOpen("VideoView") || UiManager_1.UiManager.IsViewOpen("NetWorkConfirmBoxView")) {
        if (this.pX1) {
          this.qxo.SetUIParent(UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask));
          this.pX1 = false;
        }
      } else if (!this.pX1) {
        this.qxo.SetUIParent(UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Float));
        this.pX1 = true;
      }
    }
  }
  SetFollowItem(i) {
    this.Nxo = i;
    this.Gxo = i?.RootUIComp;
    this.kxo = 0;
    this.jxo = 0;
    Cursor.C2n = 0;
    Cursor.g2n = 0;
    if (i) {
      this.Fxo = true;
      this.Vxo = i.Cursor.Switch;
      this.two();
      this.TrySetUseItemUiActive(true);
      this.iwo();
    } else {
      this.TrySetUseItemUiActive(false);
    }
    this.vX1();
  }
  RepeatMove() {
    this.Fxo = true;
    this.jxo = 0;
  }
  two() {
    var i;
    var t;
    var s;
    var r;
    var e = this.Gxo.GetWidth();
    var h = this.Gxo.GetHeight();
    if (Cursor.C2n !== e || Cursor.g2n !== h) {
      i = this.Gxo.GetPivot();
      r = this.Nxo.GetCursorOffset();
      t = this.Nxo.GetBoundOffset();
      s = r.X - MathUtils_1.MathUtils.Clamp(i.X, 0, 1);
      r = r.Y - MathUtils_1.MathUtils.Clamp(i.Y, 0, 1);
      Cursor.zxo = s * e + t.X;
      Cursor.Zxo = r * h + t.Y;
      Cursor.C2n = e;
      Cursor.g2n = h;
    }
  }
  v6l() {
    if (this.Kxo) {
      this.qxo.SetAlpha(this.Gxo.GetCalculatedParentAlpha());
    }
  }
  SetIsUseMouse(i) {
    var t;
    if (this.Hxo !== i && (this.Hxo = i, t = !!this.Gxo && this.Gxo.bIsUIActive, this.TrySetUseItemUiActive(t), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("UiNavigation", 10, "[InputChange]使用鼠标标记发生变更!", ["使用鼠标", i]);
    }
  }
  iwo() {
    if (this.IsMoveInstantly) {
      this.IsMoveInstantly = false;
      this.Yxo();
      this.v6l();
    }
  }
  owo() {
    return !!UiManager_1.UiManager.IsInited && !(this.RefreshUseItem(), !this.Bxo) && !!this.Gxo?.IsValid() && !(this.Nxo ? !this.Fxo : (Log_1.Log.CheckError() && Log_1.Log.Error("UiNavigation", 10, "光标, 找不到导航对象"), 1));
  }
  rwo() {
    var i = this.Gxo.D_K2_GetComponentLocation();
    var t = this.Gxo.D_K2_GetComponentScale();
    Cursor.Jxo.Set(i.X + Cursor.zxo * t.X, 0, i.Z + Cursor.Zxo * t.Y);
    Vector_1.Vector.Lerp(Cursor.kRe, Cursor.Jxo, this.kxo, Cursor.ewo);
    this.kxo += SPEED;
    if (Vector_1.Vector.PointsAreSame(Cursor.ewo, Cursor.Jxo)) {
      Cursor.ewo.DeepCopy(Cursor.Jxo);
      this.nwo();
    }
    Cursor.kRe.DeepCopy(Cursor.ewo);
    this.qxo.GetOwner().D_K2_SetActorLocation(Cursor.ewo.ToUeVector(), false, undefined, false);
    this.two();
    this.v6l();
  }
  Tick(i) {
    if (this.owo()) {
      this.rwo();
      this.swo(i);
    }
  }
  Clear() {
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.Oxo);
    if (this.Bxo?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("Cursor.Clear1", this.Bxo.GetOwner());
    }
    if (this.qxo?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("Cursor.Clear2", this.qxo.GetOwner());
    }
    this.awo();
    this.Oxo = LguiResourceManager_1.LguiResourceManager.InvalidId;
    this.Qxo = 0;
    this.Bxo = undefined;
    this.bxo = undefined;
    this.qxo = undefined;
    this.Gxo = undefined;
    this.Nxo = undefined;
    this.Fxo = false;
    this.kxo = 0;
  }
  nwo() {
    if (this.jxo <= 0) {
      this.jxo = ALLOW_MOVE_TICK_LIMIT;
    }
  }
  swo(i) {
    if (!(this.jxo <= 0)) {
      this.jxo -= i;
      if (this.jxo <= 0) {
        this.Fxo = false;
      }
    }
  }
  TrySetUseItemUiActive(i) {
    if (this.qxo && this.qxo.IsValid() && (i = i && this.Vxo && !this.Hxo, this.Kxo !== i)) {
      this.awo();
      if (this.Kxo = i) {
        this.hwo();
      } else {
        this.lwo(i);
      }
    }
  }
  lwo(i) {
    this.qxo.SetUIActive(i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "[InputChange]鼠标显隐发生变更!", ["active", this.Kxo]);
    }
  }
  hwo() {
    if (this.Qxo === 0) {
      this.lwo(true);
    } else {
      this.lwo(false);
      this.Wxo = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.Wxo = undefined;
        this.lwo(true);
      }, this.Qxo);
      this.Qxo = 0;
    }
  }
  awo() {
    if (this.Wxo) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Wxo);
      this.Wxo = undefined;
    }
  }
  SetCursorActiveDelayTime(i) {
    this.Qxo = i;
  }
  RefreshCursorActive() {
    if (this.Nxo) {
      this.Vxo = this.Nxo.Cursor.Switch;
      this.TrySetUseItemUiActive(true);
    }
  }
}
(exports.Cursor = Cursor).kRe = Vector_1.Vector.Create();
Cursor.Jxo = Vector_1.Vector.Create();
Cursor.zxo = 0;
Cursor.Zxo = 0;
Cursor.ewo = Vector_1.Vector.Create();
Cursor.C2n = 0;
Cursor.g2n = 0; //# sourceMappingURL=CursorData.js.map