"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteDragItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonQteDragContext_1 = require("../CommonQte/CommonQteDragContext");
const CommonQteItemBase_1 = require("./CommonQteItemBase");
class InputHandle {
  constructor() {
    this.Vector = Vector_1.Vector.Create();
    this.IsValid = false;
  }
}
class CommonQteDragItem extends CommonQteItemBase_1.CommonQteItemBase {
  constructor() {
    super(...arguments);
    this.YZu = undefined;
    this.WZu = undefined;
    this.Qtt = undefined;
    this.fS1 = undefined;
    this.SPe = undefined;
    this.iIl = -1;
    this.NQa = false;
    this.zZu = 0;
    this.JZu = false;
    this.fgt = 0;
    this.$G = new InputHandle();
    this.Iod = false;
    this.Tod = false;
    this.bzt = false;
    this.$xt = t => {
      if (t === "Start") {
        if (!this.IsQteEnd && !(this.IsQteStart = true, this.IsQteInteractive = true, this.SPe?.PlayLevelSequenceByName("Loop"), this.IsMobile)) {
          this.Qtt?.Show();
        }
      } else if (t === "Close") {
        this.Destroy();
      }
    };
    this.X7c = (t, i) => {
      if (this.IsValidInput() && Info_1.Info.IsInGamepad()) {
        this.$G.IsValid = true;
        this.$G.Vector.X = i * this.zZu;
        this.Iod = i !== 0;
        this.bod(this.Iod || this.Tod);
      }
    };
    this.Y7c = (t, i) => {
      if (this.IsValidInput() && Info_1.Info.IsInGamepad()) {
        this.$G.IsValid = true;
        this.$G.Vector.Y = -i * this.zZu;
        this.Tod = i !== 0;
        this.bod(this.Iod || this.Tod);
      }
    };
    this.z7c = undefined;
    this.w8i = t => {
      if (this.IsValidInput() && this.NQa) {
        this.z7c = t.GetLocalPointInPlane();
        this.bod(true);
      }
    };
    this.B8i = t => {
      if (this.IsValidInput() && this.NQa) {
        if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
          this.z7c = undefined;
          this.$G.IsValid = false;
        } else if (t = t.GetLocalPointInPlane()) {
          this.$G.Vector.Y = t.Y - this.z7c.Y;
          this.$G.Vector.X = t.X - this.z7c.X;
        }
      }
    };
    this.b8i = t => {
      if (this.IsValidInput() && this.NQa) {
        this.z7c = undefined;
        this.$G.IsValid = false;
        this.$G.Vector.Reset();
        this.bod(false);
      }
    };
    this.J7c = () => {
      this.$G.IsValid = true;
    };
    this.Z7c = () => {
      this.$G.IsValid = false;
      this.$G.Vector.Reset();
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIDraggableComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIItem], [5, UE.UISliderComponent]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([6, UE.UIItem]);
      this.ComponentRegisterInfos.push([7, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!this.IsMobile && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(7))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    super.OnStart();
    this.YZu = this.GetButton(2).GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
    this.WZu = this.GetSlider(5);
    this.WZu?.SetValue(1);
    this.WZu?.SetSelfInteractive(false);
    this.GetItem(4)?.SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    if (Info_1.Info.IsInTouch()) {
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    } else {
      t = this.GetItem(6);
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(t);
      this.SetAttachRootItem(t);
    }
    this.SPe.BindSequenceCloseEvent(this.$xt);
    var t = this.GetDraggable(1);
    t.OnPointerBeginDragCallBack.Bind(this.w8i);
    t.OnPointerDragCallBack.Bind(this.B8i);
    t.OnPointerEndDragCallBack.Bind(this.b8i);
    var t = this.GetButton(2);
    t.OnPointDownCallBack.Bind(this.J7c);
    t.OnPointUpCallBack.Bind(this.Z7c);
    this.SetUiActive(false);
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
    var s;
    if (t instanceof CommonQteDragContext_1.CommonQteDragContext) {
      this.iIl = t.HandleId;
      if (i = (this.fS1 = t).GetAction()) {
        this.Qtt?.RefreshByActionOrAxis({
          ActionOrAxisName: i
        });
        this.Qtt?.Show();
      }
      this.IsQteInteractive = false;
      if (i = t.GetUiConfig()) {
        this.IsQteInteractive = i.InteractiveTiming === 0;
        this.zZu = i.SlideLength;
        this.fgt = i.Direction;
      }
      i = i?.UIConfig.TextId;
      s = this.GetText(3);
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(s, i);
        s?.SetUIActive(true);
      }
      this.GetItem(4)?.SetUIActive(!t.IsPermanent);
      this.GetItem(0).SetUIRelativeRotation(new UE.Rotator(0, this.fgt + 180, 0));
      this.fgt *= MathUtils_1.MathUtils.DegToRad;
      this.Bfc();
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
    this.$G.IsValid = false;
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
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxisIgnoreLimit("UiTurn", this.X7c);
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxisIgnoreLimit("UiLookUp", this.Y7c);
    }
  }
  jQa() {
    if (this.NQa) {
      this.NQa = false;
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxisIgnoreLimit("UiTurn", this.X7c);
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxisIgnoreLimit("UiLookUp", this.Y7c);
    }
  }
  CommonQteEnd(t) {
    if (this.iIl === t) {
      this.HandleQteEnd();
    }
  }
  HandleQteEnd() {
    if (!this.IsQteEnd) {
      this.IsQteEnd = true;
      this.Qtt?.Hide();
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Close");
      this.jQa();
      this.ClearTickTimer();
    }
  }
  bod(t) {
    if (t !== this.bzt) {
      if (this.bzt = t) {
        this.fS1?.Response();
      } else {
        this.fS1?.ResponseEnd();
      }
    }
  }
  OnTick(t) {
    var i;
    var s;
    if (this.RootItem?.IsValid()) {
      if (!!this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
        if (!this.fS1 || this.fS1.IsInvalid()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
          }
          this.HandleQteEnd();
        } else {
          this.fS1.UpdateTime(t);
          if (!this.fS1.IsPermanent) {
            this.WZu?.SetValue(this.fS1?.GetRemainingTimeProgress() ?? 1);
          }
          if (this.$G.IsValid) {
            this.JZu = false;
            t = this.$G.Vector.Size2D();
            i = this.$G.Vector.HeadingAngle();
            if (t < this.zZu) {
              this.YZu.SetAnchorOffsetX(this.$G.Vector.X);
              this.YZu.SetAnchorOffsetY(this.$G.Vector.Y);
            } else {
              s = this.zZu / t;
              this.YZu.SetAnchorOffsetX(this.$G.Vector.X * s);
              this.YZu.SetAnchorOffsetY(this.$G.Vector.Y * s);
            }
            this.fS1.SetDraggingInfo(t, i);
            if (ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode) {
              this.Bfc();
            }
          } else if (!this.JZu) {
            this.$G.Vector.Reset();
            this.JZu = true;
            this.YZu.SetAnchorOffsetX(0);
            this.YZu.SetAnchorOffsetY(0);
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
exports.CommonQteDragItem = CommonQteDragItem;
//# sourceMappingURL=CommonQteDragItem.js.map