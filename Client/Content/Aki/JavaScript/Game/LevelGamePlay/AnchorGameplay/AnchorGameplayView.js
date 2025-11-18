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
    this.OHc = undefined;
    this.qHc = undefined;
    this.Sq1 = undefined;
    this.GHc = false;
    this.LCa = Vector2D_1.Vector2D.Create();
    this.FHc = 0;
    this.fS1 = undefined;
    this.SPe = undefined;
    this.U1e = 560;
    this.NHc = undefined;
    this.VHc = 100;
    this.jHc = -0.05;
    this.zgd = 500;
    this.Jgd = -1;
    this.Zgd = false;
    this.e0d = undefined;
    this.vKe = t => {
      var e;
      var i;
      var s;
      if (this.IsQteEnd || this.IsQtePause || !this.NHc || !this.GHc) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Temp", 31, "[AnchorGameplayView] OnPointerDrag", ["IsQteEnd", this.IsQteEnd], ["IsQtePause", this.IsQtePause], ["MoveCurve", this.NHc], ["ClickedBtn", this.GHc]);
        }
      } else {
        t = t.pointerPosition;
        e = Vector2D_1.Vector2D.Create();
        LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(t, e);
        i = (e.Y - this.LCa.Y) / this.U1e;
        this.FHc += i * -1;
        this.FHc = MathUtils_1.MathUtils.Clamp(this.FHc, 0, 1);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Temp", 31, "[AnchorGameplayView] OnPointerDrag", ["deltaPercentage", i], ["CurPercentage", this.FHc]);
        }
        i = this.NHc.GetVectorValue(this.FHc);
        this.OHc.SetUIRelativeLocation(i);
        i = Vector2D_1.Vector2D.Create(this.OHc.GetLGUISpaceAbsolutePosition());
        s = Vector2D_1.Vector2D.Create(e);
        if (Vector2D_1.Vector2D.Distance(i, s) > this.VHc || this.FHc === 1) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Temp", 31, "[AnchorGameplayView] OnPointerDrag Detach", ["position", t], ["itemPos", i], ["pointerPos", s], ["Dist", Vector2D_1.Vector2D.Distance(i, s)], ["DetachOffset", this.VHc]);
          }
          this.GHc = false;
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
        if (this.FHc !== 1) {
          t = this.NHc.GetVectorValue(0);
          this.OHc.SetUIRelativeLocation(t);
          this.FHc = 0;
        } else {
          this.SPe?.PlayLevelSequenceByName("Success");
          this.fS1.QteSuccess();
        }
      }
    };
    this.qOi = () => {
      this.GHc = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[AnchorGameplayView]OnPress called");
      }
    };
    this.lG = () => {
      this.GHc = false;
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
        this.HHc();
        this.Sq1?.Show();
      } else {
        this.$Hc();
        this.Sq1?.Hide();
      }
    };
    this.WHc = (t, e) => {
      if (!this.IsQteEnd && !this.IsQtePause && !!this.NHc) {
        if (e <= 0) {
          if (this.FHc !== 0) {
            this.kxe();
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Temp", 31, "[AnchorGameplayView]OnGamepadInput called", ["value", e]);
          }
          this.FHc += e * this.jHc;
          this.FHc = MathUtils_1.MathUtils.Clamp(this.FHc, 0, 1);
          e = this.NHc.GetVectorValue(this.FHc);
          this.OHc.SetUIRelativeLocation(e);
          if (this.FHc === 1) {
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
    this.NHc = ResourceSystem_1.ResourceSystem.Load(t, UE.CurveVector);
    this.VHc = CommonParamById_1.configCommonParamById.GetIntConfig("AnchorBtnDetachOffset");
    this.jHc = CommonParamById_1.configCommonParamById.GetFloatConfig("AnchorGamepadBtnMovementFactor");
    this.zgd = CommonParamById_1.configCommonParamById.GetIntConfig("AnchorEndAnimTime");
    this.Jgd = 1 / this.zgd;
  }
  OnStart() {
    super.OnStart();
    this.Vi();
    this.uYl();
    this.qHc = this.GetButton(1);
    this.qHc.OnPointDownCallBack.Bind(this.qOi);
    this.qHc.OnPointUpCallBack.Bind(this.lG);
    this.OHc = this.qHc.GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.$xt);
    this.FHc = 0;
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
      if (this.FHc !== 1) {
        this.SPe?.StopCurrentSequence();
        this.Zgd = true;
        this.e0d = () => {
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
    if (this.Zgd) {
      this.t0d(t);
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
  t0d(t) {
    this.FHc += t * this.Jgd;
    this.FHc = MathUtils_1.MathUtils.Clamp(this.FHc, 0, 1);
    t = this.NHc.GetVectorValue(this.FHc);
    this.OHc.SetUIRelativeLocation(t);
    if (this.FHc === 1 && (this.Zgd = false, this.e0d)) {
      this.e0d();
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
      this.$Hc();
    }
  }
  HHc() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiScroll1, this.WHc);
  }
  $Hc() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiScroll1, this.WHc);
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