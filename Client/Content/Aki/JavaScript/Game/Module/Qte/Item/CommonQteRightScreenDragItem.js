"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteRightScreenDragItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
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
const CURVE_PATH = "/Game/Aki/UI/UIResources/UiFight/Curve/PlotQTE/PlotQteDragRT1.PlotQteDragRT1";
class CommonQteRightScreenDragItem extends CommonQteItemBase_1.CommonQteItemBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.SPe = undefined;
    this.fS1 = undefined;
    this.NHc = undefined;
    this.NQa = false;
    this.Wad = false;
    this.Qad = false;
    this.bzt = false;
    this.Clm = false;
    this.dbe = 0;
    this.USm = 0;
    this.ISm = 0;
    this.aXa = 0;
    this.plm = 0;
    this.s7 = 0;
    this.vlm = Vector2D_1.Vector2D.Create();
    this.ylm = Vector2D_1.Vector2D.Create();
    this.flm = Vector2D_1.Vector2D.Create();
    this.yOm = false;
    this.$xt = t => {
      if (t === "Start") {
        if (!this.IsQteEnd && !(this.IsQteStart = true, this.IsQteInteractive = true, this.SPe?.PlayLevelSequenceByName("Loop"), this.IsMobile)) {
          this.Qtt?.Show();
        }
      } else if (t === "Close") {
        this.Destroy();
      }
    };
    this.lqt = (t, i) => {
      if (Info_1.Info.IsInGamepad()) {
        this.USm = 0;
        this.Clm = false;
        this.ylm.Reset();
      } else {
        this.flm.Reset();
        this.Qad = false;
        this.Wad = false;
      }
      this.Kad(false);
    };
    this.BZu = (t, i) => {
      if (this.IsValidInput() && Info_1.Info.IsInGamepad()) {
        this.Wad = i !== 0;
        this.flm.X = i;
        this.Kad(this.Wad || this.Qad);
      }
    };
    this.kZu = (t, i) => {
      if (this.IsValidInput() && Info_1.Info.IsInGamepad()) {
        this.Qad = i !== 0;
        this.flm.Y = -i;
        this.Kad(this.Wad || this.Qad);
      }
    };
    this.JCo = t => {
      this.USm = this.ISm;
    };
    this.LSm = t => {
      this.USm = 0;
    };
    this.w8i = t => {
      if (this.IsValidInput() && this.NQa && t && (this.Kad(true), t = t.pointerPosition, LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t, this.vlm), this.ylm.DeepCopy(this.vlm), this.Clm = true, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("CommonQte", 26, "开始", ["pos", this.vlm.Tuple]);
      }
    };
    this.B8i = t => {
      if (this.IsValidInput() && this.NQa && this.bzt && t) {
        if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1) {
          this.Kad(false);
          this.Clm = false;
        } else if (this.Clm) {
          t = t.pointerPosition;
          LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t, this.ylm);
        }
      }
    };
    this.b8i = t => {
      if (this.IsValidInput() && this.NQa && (this.ylm.Reset(), this.vlm.Reset(), this.Clm = false, this.dbe = 0, this.Kad(false), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("CommonQte", 26, "放手");
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIDraggableComponent]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([2, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!this.IsMobile && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(2))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(CURVE_PATH, UE.CurveFloat, t => {
      this.NHc = t;
      i.SetResult();
    });
    await i.Promise;
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
    t.OnPointerUpCallBack.Bind(this.LSm);
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
        this.plm = i.DragBounds;
        this.s7 = i.DragLength;
        this.aXa = i.LerpSpeed / this.s7 / CommonDefine_1.MILLIONSECOND_PER_SECOND;
        this.yOm = i.CheckByRealTimeInput;
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
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxisIgnoreLimit("UiTurn", this.BZu);
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxisIgnoreLimit("UiLookUp", this.kZu);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    }
  }
  jQa() {
    if (this.NQa) {
      this.NQa = false;
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxisIgnoreLimit("UiTurn", this.BZu);
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxisIgnoreLimit("UiLookUp", this.kZu);
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
      this.Qtt?.Hide();
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Close");
      this.jQa();
      this.ClearTickTimer();
    }
  }
  Kad(t) {
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
      if (this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
        if (!this.fS1 || this.fS1.IsInvalid()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
          }
          this.HandleQteEnd();
        } else {
          this.fS1.UpdateTime(t);
          if (Info_1.Info.IsInGamepad()) {
            if (MathUtils_1.MathUtils.IsNearlyZero(this.flm.Size())) {
              this.dbe -= t * this.aXa;
            } else {
              var i = Vector2D_1.Vector2D.Create();
              i.X = MathUtils_1.MathUtils.Clamp(t * this.aXa, 0, 1);
              i.Y = this.NHc.GetFloatValue(this.dbe + i.X);
              var s = i.Size();
              if (s === 0) {
                return;
              }
              var s = this.flm.DotProduct(i) / s;
              this.dbe += s * i.X;
            }
          } else if (this.Clm) {
            this.dbe = (this.ylm.X - this.vlm.X) / this.s7 + this.USm;
            s = (this.ylm.Y - this.vlm.Y) / this.s7;
            if (Math.abs(this.NHc.GetFloatValue(MathUtils_1.MathUtils.Clamp(this.dbe, 0, 1)) - s) * this.s7 > this.plm && (this.ylm.Reset(), this.vlm.Reset(), this.Clm = false, this.Kad(false), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("CommonQte", 26, "出界");
            }
          } else {
            this.dbe = this.USm;
          }
          this.dbe = MathUtils_1.MathUtils.Clamp(this.dbe, 0, 1);
          this.ISm = MathUtils_1.MathUtils.InterpConstantTo(this.ISm, this.dbe, t, this.aXa);
          this.fS1.SetDraggingInfo(this.ISm, 0);
          if (this.yOm && this.fS1.CheckDragComplete(this.dbe, 0)) {
            this.fS1.IsPreSuccess = true;
          }
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
exports.CommonQteRightScreenDragItem = CommonQteRightScreenDragItem;
//# sourceMappingURL=CommonQteRightScreenDragItem.js.map