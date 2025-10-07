"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteCompassRotateItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonQteDragContext_1 = require("../CommonQte/CommonQteDragContext");
const CommonQteItemBase_1 = require("./CommonQteItemBase");
class CommonQteCompassRotateItem extends CommonQteItemBase_1.CommonQteItemBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.SPe = undefined;
    this.fS1 = undefined;
    this.NQa = false;
    this.Ead = false;
    this.Iad = false;
    this.bzt = false;
    this.TWd = undefined;
    this.bWd = new UE.Rotator();
    this.RWd = undefined;
    this.wWd = 0;
    this.LWd = 0;
    this.PWd = 0;
    this.XKd = 90;
    this.AWd = Vector2D_1.Vector2D.Create();
    this.Pnr = 0;
    this.YKd = 90;
    this.lqt = (t, i) => {
      if (Info_1.Info.IsInGamepad()) {
        this.YKd = 90;
        this.wWd = 0;
        this.LWd = 0;
      } else {
        this.AWd.Reset();
        this.Iad = false;
        this.Ead = false;
      }
      this.Tad(false);
    };
    this.$xt = t => {
      if (t === "Start") {
        if (!this.IsQteEnd && !(this.IsQteStart = true, this.IsQteInteractive = true, this.SPe?.PlayLevelSequenceByName("Loop"), this.IsMobile)) {
          this.Qtt?.Show();
        }
      } else if (t === "Close") {
        this.Destroy();
      }
    };
    this.BZu = (t, i) => {
      if (this.IsValidInput() && Info_1.Info.IsInGamepad()) {
        this.AWd.X = i;
        this.Ead = i !== 0;
        this.Tad(this.Ead || this.Iad);
      }
    };
    this.kZu = (t, i) => {
      if (this.IsValidInput() && Info_1.Info.IsInGamepad()) {
        this.AWd.Y = -i;
        this.Iad = i !== 0;
        this.Tad(this.Ead || this.Iad);
      }
    };
    this.JCo = t => {
      this.YKd = this.XKd;
    };
    this.zKd = t => {
      this.YKd = 90;
    };
    this.w8i = t => {
      var i;
      if (this.IsValidInput() && this.NQa && t) {
        this.Tad(true);
        t = t.pointerPosition;
        i = Vector2D_1.Vector2D.Create();
        LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t, i);
        this.wWd = Rotator_1.Rotator.ClampAxis(Math.atan2(i.Y - this.RWd.Y, i.X - this.RWd.X) * MathUtils_1.MathUtils.RadToDeg);
      }
    };
    this.B8i = t => {
      var i;
      if (this.IsValidInput() && this.NQa && this.bzt && t) {
        if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
          this.Tad(false);
          this.LWd = 0;
          this.wWd = 0;
        } else {
          t = t.pointerPosition;
          i = Vector2D_1.Vector2D.Create();
          LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t, i);
          t = Rotator_1.Rotator.ClampAxis(Math.atan2(i.Y - this.RWd.Y, i.X - this.RWd.X) * MathUtils_1.MathUtils.RadToDeg);
          this.LWd = t - this.wWd;
        }
      }
    };
    this.b8i = t => {
      if (this.IsValidInput() && this.NQa) {
        this.Tad(false);
        this.LWd = 0;
        this.wWd = 0;
        this.YKd = 90;
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIDraggableComponent], [2, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([3, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!this.IsMobile && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(3))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    super.OnStart();
    this.SetUiActive(false);
    var t = this.GetItem(0);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(t);
    this.SetAttachRootItem(t);
    this.SPe.BindSequenceCloseEvent(this.$xt);
    var t = this.GetDraggable(1);
    t.OnPointerBeginDragCallBack.Bind(this.w8i);
    t.OnPointerDragCallBack.Bind(this.B8i);
    t.OnPointerEndDragCallBack.Bind(this.b8i);
    t.OnPointerDownCallBack.Bind(this.JCo);
    t.OnPointerUpCallBack.Bind(this.zKd);
    this.TWd = this.GetItem(2);
    this.bWd.Pitch = 0;
    this.bWd.Roll = 0;
    this.bWd.Yaw = 0;
    this.PWd = 90;
    this.RWd = this.GetItem(2).GetUIWorldPosition();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (!this.IsQteEnd && this.fS1?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.fS1.HandleId);
    }
    this.fS1 = undefined;
  }
  SetQteContext(t) {
    var i;
    if (t instanceof CommonQteDragContext_1.CommonQteDragContext) {
      if (i = (this.fS1 = t).GetAction()) {
        this.Qtt?.RefreshByActionOrAxis({
          ActionOrAxisName: i
        });
        this.Qtt?.Show();
      }
      this.IsQteInteractive = false;
      if (i = t.GetUiConfig()) {
        this.IsQteInteractive = i.InteractiveTiming === 0;
        this.Pnr = i.CompassSpeed / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      }
      this.SetQteActive(t);
    }
  }
  RefreshOnBattleUiVisibleChanged() {
    var t;
    if (!this.IsAttaching) {
      if (this.fS1?.Source === 0) {
        t = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(20);
        this.SetActive(t);
      }
    }
  }
  PlayQteStart() {
    if (this.IsQteActive && !this.IsQteEnd && !this.IsQtePause && this.fS1) {
      this.IsQtePlayStart = true;
      this.SetUiActive(true);
      this.SPe?.PlayLevelSequenceByName("Start");
      this.HQa();
      ControllerHolder_1.ControllerHolder.CommonQteController.SetExpiredTimer(this.fS1);
    }
  }
  Bfc() {
    var t;
    if (this.fS1 && (t = this.fS1.GetUiConfig()) && (t = t.UIConfig, this.RootItem.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign), this.RootItem.SetAnchorOffset(t.AnchorOffset), this.IsAttaching)) {
      this.Reattach(this.fS1);
    }
  }
  OnQtePause() {
    this.jQa();
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.PauseQte(this.fS1.HandleId);
    }
  }
  OnQteResume() {
    if (this.IsQtePlayStart) {
      this.HQa();
    } else {
      this.PlayQteStart();
    }
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.ResumeQte(this.fS1.HandleId);
    }
  }
  HQa() {
    if (!this.NQa) {
      this.NQa = true;
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxisIgnoreLimit("UiScroll2", this.BZu);
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxisIgnoreLimit("UiScroll1", this.kZu);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    }
  }
  jQa() {
    if (this.NQa) {
      this.NQa = false;
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxisIgnoreLimit("UiScroll2", this.BZu);
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxisIgnoreLimit("UiScroll1", this.kZu);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    }
  }
  CommonQteEnd(t) {
    if (this.fS1?.HandleId === t) {
      this.HandleQteEnd();
    }
  }
  HandleQteEnd() {
    if (!this.IsQteEnd) {
      this.IsQteEnd = true;
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Close");
      this.jQa();
      this.ClearTickTimer();
    }
  }
  Tad(t) {
    if (t !== this.bzt) {
      if (this.bzt = t) {
        this.fS1?.Response();
      } else {
        this.fS1?.ResponseEnd();
      }
    }
  }
  OnTick(t) {
    if (this.RootItem?.IsValid()) {
      if (!!this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
        if (!this.fS1 || this.fS1.IsInvalid()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
          }
          this.HandleQteEnd();
        } else {
          this.fS1.UpdateTime(t);
          if (Info_1.Info.IsInGamepad()) {
            if (MathUtils_1.MathUtils.IsNearlyZero(this.AWd.Size())) {
              this.PWd = this.YKd;
            } else {
              this.PWd = Math.atan2(this.AWd.Y, this.AWd.X) * MathUtils_1.MathUtils.RadToDeg;
            }
          } else {
            this.PWd = this.YKd + this.LWd;
          }
          this.PWd = MathUtils_1.MathUtils.ClampAngle(this.PWd, 0, 90);
          this.XKd = MathUtils_1.MathUtils.InterpConstantTo(this.XKd, this.PWd, t, this.Pnr);
          this.fS1.SetDraggingInfo(0, (90 - this.XKd) * MathUtils_1.MathUtils.DegToRad);
          this.bWd.Yaw = this.XKd;
          this.TWd.SetUIRelativeRotation(this.bWd);
          if (ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode) {
            this.Bfc();
          }
        }
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Item已销毁, 强制停止Qte");
      }
      this.HandleQteEnd();
    }
  }
}
exports.CommonQteCompassRotateItem = CommonQteCompassRotateItem;
//# sourceMappingURL=CommonQteCompassRotateItem.js.map