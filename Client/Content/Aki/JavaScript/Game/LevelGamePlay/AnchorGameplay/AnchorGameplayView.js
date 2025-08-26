"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnchorGameplayView = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputMultiKeyItem_1 = require("../../Module/Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const CommonQteDragContext_1 = require("../../Module/Qte/CommonQte/CommonQteDragContext");
const CommonQteViewBase_1 = require("../../Module/Qte/View/CommonQteViewBase");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../Ui/UiManager");
class AnchorGameplayView extends CommonQteViewBase_1.CommonQteViewBase {
  constructor() {
    super(...arguments);
    this.iJs = undefined;
    this.H_t = undefined;
    this.n$u = undefined;
    this.s$u = undefined;
    this.Sq1 = undefined;
    this.a$u = false;
    this.LCa = Vector2D_1.Vector2D.Create();
    this.h$u = 0;
    this.fS1 = undefined;
    this.SPe = undefined;
    this.U1e = 560;
    this.l$u = undefined;
    this._$u = 100;
    this.u$u = -0.05;
    this.Nld = 500;
    this.Vld = -1;
    this.jld = false;
    this.Hld = undefined;
    this.vKe = t => {
      var e;
      var i;
      var s;
      if (this.IsQteEnd || this.IsQtePause || !this.l$u || !this.a$u) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Temp", 31, "[AnchorGameplayView] OnPointerDrag", ["IsQteEnd", this.IsQteEnd], ["IsQtePause", this.IsQtePause], ["MoveCurve", this.l$u], ["ClickedBtn", this.a$u]);
        }
      } else {
        t = t.pointerPosition;
        e = Vector2D_1.Vector2D.Create();
        LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(t, e);
        i = (e.Y - this.LCa.Y) / this.U1e;
        this.h$u += i * -1;
        this.h$u = MathUtils_1.MathUtils.Clamp(this.h$u, 0, 1);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Temp", 31, "[AnchorGameplayView] OnPointerDrag", ["deltaPercentage", i], ["CurPercentage", this.h$u]);
        }
        i = this.l$u.GetVectorValue(this.h$u);
        this.n$u.SetUIRelativeLocation(i);
        i = Vector2D_1.Vector2D.Create(this.n$u.GetLGUISpaceAbsolutePosition());
        s = Vector2D_1.Vector2D.Create(e);
        if (Vector2D_1.Vector2D.Distance(i, s) > this._$u || this.h$u === 1) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Temp", 31, "[AnchorGameplayView] OnPointerDrag Detach", ["position", t], ["itemPos", i], ["pointerPos", s], ["Dist", Vector2D_1.Vector2D.Distance(i, s)], ["DetachOffset", this._$u]);
          }
          this.a$u = false;
          this.kxe();
        } else {
          this.LCa.DeepCopy(e);
        }
      }
    };
    this.pKe = t => {
      t = t.pointerPosition;
      LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(t, this.LCa);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[AnchorGameplayView] OnPointerBeginDrag");
      }
    };
    this.kxe = () => {
      var t;
      if (this.fS1?.State !== 2) {
        if (this.h$u !== 1) {
          t = this.l$u.GetVectorValue(0);
          this.n$u.SetUIRelativeLocation(t);
          this.h$u = 0;
        } else {
          this.SPe?.PlayLevelSequenceByName("Success");
          this.fS1.QteSuccess();
        }
      }
    };
    this.qOi = () => {
      this.a$u = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[AnchorGameplayView]OnPress called");
      }
    };
    this.lG = () => {
      this.a$u = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[AnchorGameplayView]OnRelease called");
      }
    };
    this.$xt = t => {
      if (t === "Start01") {
        if (!this.IsQteEnd) {
          this.SPe?.PlayLevelSequenceByName("Tips");
          this.IsQteStart = true;
          this.IsQteInteractive = true;
        }
      } else if (t === "Close01" || t === "Success") {
        UiManager_1.UiManager.CloseView("AnchorGameplayView");
      }
    };
    this.lqt = () => {
      this.kxe();
      if (Info_1.Info.IsInGamepad()) {
        this.c$u();
        this.Sq1?.Show();
      } else {
        this.d$u();
        this.Sq1?.Hide();
      }
    };
    this.m$u = (t, e) => {
      if (!this.IsQteEnd && !this.IsQtePause && !!this.l$u) {
        if (e <= 0) {
          if (this.h$u !== 0) {
            this.kxe();
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Temp", 31, "[AnchorGameplayView]OnGamepadInput called", ["value", e]);
          }
          this.h$u += e * this.u$u;
          this.h$u = MathUtils_1.MathUtils.Clamp(this.h$u, 0, 1);
          e = this.l$u.GetVectorValue(this.h$u);
          this.n$u.SetUIRelativeLocation(e);
          if (this.h$u === 1) {
            this.kxe();
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIButtonComponent], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t;
    if (!this.IsMobile && (this.Sq1 = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(2))) {
      await this.Sq1?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnAddEventListener() {
    this.lqt();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  uYl() {
    this.H_t = this.GetDraggable(0);
    this.H_t.OnPointerDragCallBack.Bind(this.vKe);
    this.H_t.OnPointerBeginDragCallBack.Bind(this.pKe);
    this.H_t.OnPointerEndDragCallBack.Bind(this.kxe);
    this.iJs = this.H_t.GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass());
  }
  Vi() {
    this.U1e = CommonParamById_1.configCommonParamById.GetIntConfig("AnchorBtnMoveDistance");
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("AnchorMovementCurve");
    this.l$u = ResourceSystem_1.ResourceSystem.Load(t, UE.CurveVector);
    this._$u = CommonParamById_1.configCommonParamById.GetIntConfig("AnchorBtnDetachOffset");
    this.u$u = CommonParamById_1.configCommonParamById.GetFloatConfig("AnchorGamepadBtnMovementFactor");
    this.Nld = CommonParamById_1.configCommonParamById.GetIntConfig("AnchorEndAnimTime");
    this.Vld = 1 / this.Nld;
  }
  OnStart() {
    super.OnStart();
    this.Vi();
    this.uYl();
    this.s$u = this.GetButton(1);
    this.s$u.OnPointDownCallBack.Bind(this.qOi);
    this.s$u.OnPointUpCallBack.Bind(this.lG);
    this.n$u = this.s$u.GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.$xt);
    this.h$u = 0;
    this.iJs.SetUIActive(false);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (!this.IsQteEnd && this.fS1?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.fS1.HandleId);
    }
    this.OnRemoveEventListener();
    this.SPe?.Clear();
  }
  CommonQteEnd(t) {
    if (this.fS1?.HandleId === t) {
      this.HandleQteEnd();
    }
  }
  HandleQteEnd() {
    if (!this.IsQteEnd) {
      this.IsQteEnd = true;
      if (this.h$u !== 1) {
        this.SPe?.StopCurrentSequence();
        this.jld = true;
        this.Hld = () => {
          this.SPe?.PlayLevelSequenceByName("Success");
        };
      }
    }
  }
  SetQteContext(t) {
    if (t instanceof CommonQteDragContext_1.CommonQteDragContext) {
      this.fS1 = t;
      this.Sq1?.RefreshByActionOrAxis({
        ActionOrAxisName: "UiLookUp"
      });
      if (Info_1.Info.IsInGamepad()) {
        this.Sq1?.Show();
      } else {
        this.Sq1?.Hide();
      }
      this.Bfc();
      this.SetQteActive(t);
    }
  }
  OnTick(t) {
    if (this.jld) {
      this.$ld(t);
    } else if (!!this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
      if (!this.fS1 || this.fS1.IsInvalid()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CommonQte", 31, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
        }
        this.HandleQteEnd();
      } else {
        this.fS1.UpdateTime(t);
        if (ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode) {
          this.Bfc();
        }
      }
    }
  }
  $ld(t) {
    this.h$u += t * this.Vld;
    this.h$u = MathUtils_1.MathUtils.Clamp(this.h$u, 0, 1);
    t = this.l$u.GetVectorValue(this.h$u);
    this.n$u.SetUIRelativeLocation(t);
    if (this.h$u === 1 && (this.jld = false, this.Hld)) {
      this.Hld();
    }
  }
  PlayQteStart() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CommonQte", 31, "[AnchorGameplayView] PlayQteStart");
    }
    if (!this.IsQteActive || this.IsQteEnd || this.IsQtePause || !this.fS1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CommonQte", 31, "[AnchorGameplayView] PlayQteStart", ["IsQteActive", this.IsQteActive], ["IsQteEnd", this.IsQteEnd], ["IsQtePause", this.IsQtePause], ["CommonQteContext", this.fS1?.HandleId]);
      }
    } else {
      this.IsQtePlayStart = true;
      this.iJs.SetUIActive(true);
      this.SPe?.PlayLevelSequenceByName("Start01");
      ControllerHolder_1.ControllerHolder.CommonQteController.SetExpiredTimer(this.fS1);
    }
  }
  OnRemoveEventListener() {
    if (Info_1.Info.IsInGamepad()) {
      this.d$u();
    }
  }
  c$u() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiScroll1, this.m$u);
  }
  d$u() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiScroll1, this.m$u);
  }
  Bfc() {
    var t;
    if (this.fS1 && (t = this.fS1.GetUiConfig())) {
      t = t.UIConfig;
      this.RootItem.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign);
      this.RootItem.SetAnchorOffset(t.AnchorOffset);
    }
  }
}
exports.AnchorGameplayView = AnchorGameplayView;
//# sourceMappingURL=AnchorGameplayView.js.map