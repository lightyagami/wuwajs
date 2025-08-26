"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPickInteractController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelPickInteractItem_1 = require("./LevelPickInteractItem");
class LevelPickInteractController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.PauseTick();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartLoadingState, this.hMe);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartLoadingState, this.hMe);
    return true;
  }
  static zla() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.Ui左键点击, InputMappingsDefine_1.actionMappings.UI键盘F手柄A], this.XOa);
  }
  static Jla() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.Ui左键点击, InputMappingsDefine_1.actionMappings.UI键盘F手柄A], this.XOa);
  }
  static EnterPickInteractModel(e, t = false) {
    var i = e.Chessboard;
    var r = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(i);
    if (r) {
      this.kHa = undefined;
      this.zOa = true;
      this.A6l = 0;
      this.JOa = t;
      if (EntitySystem_1.EntitySystem.GetComponent(r.Id, 0)?.GetPbModelConfig()?.EntityType === "Chessboard" && (r = EntitySystem_1.EntitySystem.GetComponent(r.Id, 138))) {
        this.YOa(r);
      }
      if (UiModel_1.UiModel.IsInMainView) {
        UiManager_1.UiManager.OpenView("PickInteractionView");
        this.Z7a(e);
        this.zla();
      } else {
        this.Ikl = e;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
      }
    } else {
      this.kHa ||= WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelPickInteractController.EnterPickInteractModel", i, () => {
        LevelPickInteractController.EnterPickInteractModel(e, t);
      }, 60000, false);
    }
  }
  static Z7a(e) {
    var t;
    var i;
    var e = e.CameraConfig;
    if (e?.Type === IAction_1.EAdjustPlayerCamera.Fixed) {
      this.eHa = IAction_1.EAdjustPlayerCamera.Fixed;
      t = Vector_1.Vector.Create();
      i = Rotator_1.Rotator.Create();
      t.Set(e.CenterPos.X ?? 0, e.CenterPos.Y ?? 0, e.CenterPos.Z ?? 0);
      i.Set(e.CenterRot.Y ?? 0, e.CenterRot.Z ?? 0, e.CenterRot.X ?? 0);
      ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(t, i, e.Fov, e.FadeInTime, e.FadeOutTime, 1, () => {
        this.tHa();
      });
    }
  }
  static jPl(e = false) {
    if (this.OnClosingView) {
      this.OnClosingView();
      this.OnClosingView = undefined;
    }
    let t = undefined;
    if (this.A6l === 0) {
      t = this.eGa;
    }
    if (this.eHa === IAction_1.EAdjustPlayerCamera.Fixed) {
      if (e) {
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust();
        this.x6l(t);
      } else {
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust(undefined, () => {
          this.x6l(t);
        });
      }
    } else {
      this.x6l(t);
    }
  }
  static x6l(e) {
    var t;
    UiManager_1.UiManager.CloseView("PickInteractionView");
    if (!this.zOa && this.A6l === 0) {
      if (e instanceof SceneItemJigsawBaseComponent_1.SceneItemJigsawBaseComponent && (t = new Protocol_1.Aki.Protocol.Mv_(), e = e.Entity?.GetComponent(0)?.GetCreatureDataId())) {
        t.F4n = MathUtils_1.MathUtils.NumberToLong(e);
        Net_1.Net.Call(22993, t, e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Level", 36, "CloseInteractionView RenjuExitMatchedActionResponse", ["ErrorCode", e.G9n]);
          }
        });
      }
    }
  }
  static ExitPickInteractModel(e = false) {
    this.$ll = 0;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotNetworkStart, this.Xll)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.Xll);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotNetworkEnd, this.Yll)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Yll);
    }
    if (this.zOa) {
      this.OnClosingView = undefined;
      this.OnViewPiecePostMoveEventStart = undefined;
      this.OnViewPiecePostMoveEventEnd = undefined;
      this.zOa = false;
      this.jPl(e);
      this.ZOa.clear();
      this.Jla();
      if (this.eGa) {
        this.eGa.ClearLevelPickSelect();
        this.eGa.UnregisterPickControllerEvents();
        this.eGa.ForceResetPieceSelect(false);
        this.eGa = undefined;
        e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
        if (e) {
          var t;
          var i = e.GetComponent(29);
          if (i && (i.PreLeaveSitDownAction("ExitPickInteractModel"), e = e.GetComponent(3))) {
            r = Vector_1.Vector.Create();
            t = Vector_1.Vector.Create();
            e.ActorForwardProxy.Multiply(50, r);
            e.ActorLocationProxy.Addition(r, t);
            e.SetActorLocation(t.ToUeVector(), "LevelPickInteract Leave Chair Offset");
          }
          var r = i?.Chair;
          if (r) {
            const n = r.GetComponent(198);
            if (n) {
              n.SetInteractionState(false, "ExitPickInteractModel.Close");
              TimerSystem_1.TimerSystem.Delay(() => {
                n.SetInteractionState(true, "ExitPickInteractModel.Resume");
              }, 2000);
            }
          }
        }
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    }
  }
  static ResetPickInteractGame() {
    if (this.zOa) {
      if (this.eGa) {
        this.eGa.ClearLevelPickSelect();
        this.eGa.ResetTicTacToeGame();
      }
      this.WPl = false;
      this.tHa();
    }
  }
  static get zOa() {
    return this.iEl;
  }
  static set zOa(e) {
    if (this.iEl !== e) {
      if (this.iEl = e) {
        this.ResumeTick();
      } else {
        this.PauseTick();
      }
    }
  }
  static OnTick(e) {
    if (this.zOa) {
      if (this.JOa) {
        for (const t of this.tGa()) {
          t.OnPick();
        }
      }
      if (this.$ll > 0 && (this.$ll -= e, this.$ll <= 0)) {
        this.ExitPickInteractModel();
      }
    }
  }
  static tGa() {
    this.iGa.length = 0;
    var t = Global_1.Global.CharacterController;
    if (t) {
      let e = undefined;
      if (Info_1.Info.IsInKeyBoard()) {
        if (t = t.GetCursorPosition()) {
          this.rGa.X = t.X;
          this.rGa.Y = t.Y;
        }
        e = this.rGa;
      } else if (Info_1.Info.IsInTouch()) {
        e = this.Fdr;
      } else if (Info_1.Info.IsInGamepad()) {
        t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0, true);
        e = new Vector2D_1.Vector2D(t.pointerPosition.X, t.pointerPosition.Y);
      }
      if (e) {
        for (const r of this.ZOa) {
          var i = r[1];
          if (i.IsValid && i.CheckInside(e)) {
            this.iGa.push(i);
          }
        }
      }
    }
    return this.iGa;
  }
  static tHa() {
    for (const t of this.ZOa) {
      var e = t[0];
      t[1]?.RefreshBox(e);
    }
  }
  static YOa(t) {
    (this.eGa = t).RegisterPickControllerEvents(this.oGa, this.LGa, this.vAl, this.QPl, this.KPl);
    t.ForceResetPieceSelect(true);
    if (t.WaitingInitPiecesComplete) {
      this.ZOa.clear();
      for (const i of t.GetPickItemActors()) {
        var e = new LevelPickInteractItem_1.LevelPickInteractItem();
        e.Init(i, e => {
          if (!this.WPl) {
            t.OnLevelPickClick(e);
          }
        });
        this.ZOa.set(i, e);
      }
    } else {
      this.MAl = true;
    }
  }
}
exports.LevelPickInteractController = LevelPickInteractController;
(_a = LevelPickInteractController).JOa = false;
LevelPickInteractController.ZOa = new Map();
LevelPickInteractController.iGa = new Array();
LevelPickInteractController.rGa = Vector2D_1.Vector2D.Create();
LevelPickInteractController.Fdr = Vector2D_1.Vector2D.Create();
LevelPickInteractController.eGa = undefined;
LevelPickInteractController.hMe = () => {
  if (_a.zOa) {
    _a.ExitPickInteractModel(true);
  }
};
LevelPickInteractController.XOa = (e, t) => {
  if (t === 1) {
    t = _a.tGa();
    if (t.length > 0) {
      for (const i of t) {
        i.OnClick();
      }
    } else {
      _a.eGa?.LevelPickSelectUndefined();
    }
  }
};
LevelPickInteractController.Eqt = (e, t) => {
  if (t.TouchType === 1) {
    _a.Fdr.X = t.TouchPosition.X;
    _a.Fdr.Y = t.TouchPosition.Y;
    t = _a.tGa();
    if (t.length > 0) {
      for (const i of t) {
        i.OnClick();
      }
    } else {
      _a.eGa?.LevelPickSelectUndefined();
    }
  }
};
LevelPickInteractController.kHa = undefined;
LevelPickInteractController.Ikl = undefined;
LevelPickInteractController.A6l = 0;
LevelPickInteractController.JDe = () => {
  if (_a.zOa) {
    UiManager_1.UiManager.OpenView("PickInteractionView");
    if (_a.Ikl) {
      _a.Z7a(_a.Ikl);
    }
    _a.zla();
  }
  _a.Ikl = undefined;
  EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, _a.JDe);
};
LevelPickInteractController.eHa = undefined;
LevelPickInteractController.OnClosingView = undefined;
LevelPickInteractController.OnViewPiecePostMoveEventStart = undefined;
LevelPickInteractController.OnViewPiecePostMoveEventEnd = undefined;
LevelPickInteractController.$ll = 0;
LevelPickInteractController.LGa = e => {
  _a.$ll = 2500;
  if (_a.zOa) {
    TimerSystem_1.TimerSystem.Delay(() => {
      if (_a.zOa && !ModelManager_1.ModelManager.PlotModel?.IsInPlot) {
        _a.jPl();
      }
    }, _a.$ll * 2);
  }
  if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotNetworkStart, _a.Xll)) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, _a.Xll);
  }
  TimerSystem_1.TimerSystem.Delay(() => {
    if (e) {
      UiManager_1.UiManager.OpenView("MazeTipsWinView");
    } else {
      UiManager_1.UiManager.OpenView("MazeTipsLoseView");
    }
  }, 1500);
};
LevelPickInteractController.Xll = e => {
  EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, _a.Xll);
  if (e.PlotLevel === "Prompt" || e.PlotLevel === "LevelD") {
    _a.ExitPickInteractModel();
  } else {
    _a.$ll = 0;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, _a.Yll);
  }
};
LevelPickInteractController.Yll = e => {
  EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, _a.Yll);
  _a.ExitPickInteractModel();
};
LevelPickInteractController.iEl = false;
LevelPickInteractController.oGa = e => {
  if (_a.ZOa.has(e)) {
    _a.ZOa.get(e)?.RefreshBox(e);
  }
};
LevelPickInteractController.MAl = false;
LevelPickInteractController.vAl = () => {
  if (_a.eGa && _a.MAl) {
    _a.MAl = false;
    _a.YOa(_a.eGa);
  }
};
LevelPickInteractController.WPl = false;
LevelPickInteractController.QPl = () => {
  if (!_a.WPl) {
    _a.WPl = true;
    if (_a.OnViewPiecePostMoveEventStart) {
      _a.OnViewPiecePostMoveEventStart();
    }
  }
};
LevelPickInteractController.KPl = () => {
  if (_a.WPl && (_a.WPl = false, _a.OnViewPiecePostMoveEventEnd)) {
    _a.OnViewPiecePostMoveEventEnd();
  }
}; //# sourceMappingURL=LevelPickInteractController.js.map