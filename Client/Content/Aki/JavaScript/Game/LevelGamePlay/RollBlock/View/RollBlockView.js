"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollBlockView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiResourceById_1 = require("../../../../Core/Define/ConfigQuery/UiResourceById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Module/Util/LguiUtil");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
class RollBlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.VRf = 0;
    this.HRf = 0;
    this.$pt = undefined;
    this.X2f = undefined;
    this.Lxf = undefined;
    this.Fxe = undefined;
    this.Ulg = false;
    this._9g = undefined;
    this.jRf = (e, t) => {
      if (this.kSg()) {
        if (e === InputMappingsDefine_1.axisMappings.NavigationTopDown && Math.abs(this.VRf - t) > MathCommon_1.MathCommon.SmallNumber) {
          if (t > 0.5 && this.VRf <= 0.5) {
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向后移动", 1);
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向前移动", 0);
          } else if (t < -0.5 && this.VRf >= -0.5) {
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向前移动", 1);
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向后移动", 0);
          } else if (t > -0.5 && t < 0.5) {
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput(this.VRf > 0 ? "向前移动" : "向后移动", 1);
          }
          this.VRf = t;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RollBlock", 31, "[input] ForwardInputValue", ["Value", this.VRf]);
          }
        } else if (e === InputMappingsDefine_1.axisMappings.NavigationLeftRight && Math.abs(this.HRf - t) > MathCommon_1.MathCommon.SmallNumber && (t > 0.5 && this.HRf <= 0.5 ? (ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向左移动", 1), ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向右移动", 0)) : t < -0.5 && this.HRf >= -0.5 ? (ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向右移动", 1), ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向左移动", 0)) : t > -0.5 && t < 0.5 && ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput(this.HRf > 0 ? "向右移动" : "向左移动", 1), this.HRf = t, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("RollBlock", 31, "[input] RightInputValue", ["Value", this.HRf]);
        }
      }
    };
    this.bOi = (e, t) => {
      if ((this.kSg() || t !== 0) && (e === InputMappingsDefine_1.actionMappings.Ui方向上 ? ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向前移动", t) : e === InputMappingsDefine_1.actionMappings.Ui方向下 ? ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向后移动", t) : e === InputMappingsDefine_1.actionMappings.Ui方向左 ? ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向左移动", t) : e === InputMappingsDefine_1.actionMappings.Ui方向右 && ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向右移动", t), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("RollBlock", 31, "[input] OnInput", ["ActionName", e], ["ActionType", t.toString()]);
      }
    };
    this.BCf = () => {
      if (!this.Lxf?.bIsUIActive) {
        this.Lxf?.SetUIActive(true);
        this.$pt?.PlayLevelSequenceByName("TipsIn");
      }
    };
    this.Y2f = e => {
      switch (e) {
        case "开始":
          this.RemoveEventListener(true);
          break;
        case "失败":
          this.AddEventListener();
          break;
        case "成功":
          this.X2f?.SetUIActive(false);
          EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.RollBlockAllCompleted, this.z2f);
      }
    };
    this.yct = e => {
      if (e === "Start01") {
        this.AddEventListener();
      }
    };
    this.z2f = () => {
      this.GetButton(5)?.GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(ControllerHolder_1.ControllerHolder.RollBlockController.GetIsMultiBlock());
      this.X2f?.SetUIActive(true);
      this.$pt?.PlayLevelSequenceByName("Start01");
      ControllerHolder_1.ControllerHolder.RollBlockController.NotifyServerShowAllBlock();
      this.Fxe?.SetUIActive(false);
      if (this._9g) {
        TimerSystem_1.FlowTimeTimerSystem.Remove(this._9g);
      }
      this._9g = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
        this._9g = undefined;
        this.Fxe?.SetUIActive(true);
      }, 4000);
    };
    this.Tdf = () => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickSwitch();
    };
    this.bdf = () => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickReset();
    };
    this.xpt = () => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickEsc();
    };
    this.Rdf = () => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickTip();
    };
    this.lil = () => {
      ControllerHolder_1.ControllerHolder.TutorialController.OpenExclusiveTutorial(201);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIText], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIText], [16, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.Tdf], [6, this.bdf], [7, this.xpt], [12, this.Rdf], [16, this.lil]];
  }
  AddEventListener() {
    if (!this.Ulg && !(this.Ulg = true, this.zla(), this.J2f(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowRollBlockTips, this.BCf), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnRollBlockReseting, this.Y2f))) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRollBlockReseting, this.Y2f);
    }
  }
  RemoveEventListener(e = false) {
    this.Ulg = false;
    this.Jla();
    this.Z2f();
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ShowRollBlockTips, this.BCf)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowRollBlockTips, this.BCf);
    }
    if (!e) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRollBlockReseting, this.Y2f);
    }
  }
  OnRemoveEventListener() {
    this.RemoveEventListener();
  }
  zla() {
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.NavigationTopDown, this.jRf);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.NavigationLeftRight, this.jRf);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向上, this.bOi);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向下, this.bOi);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向左, this.bOi);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向右, this.bOi);
  }
  Jla() {
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.NavigationTopDown, this.jRf);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.NavigationLeftRight, this.jRf);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向上, this.bOi);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向下, this.bOi);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向左, this.bOi);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向右, this.bOi);
  }
  J2f() {
    this.GetButton(1)?.OnPointDownCallBack.Bind(() => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向左移动", 0);
    });
    this.GetButton(1)?.OnPointUpCallBack.Bind(() => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向左移动", 1);
    });
    this.GetButton(2)?.OnPointDownCallBack.Bind(() => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向右移动", 0);
    });
    this.GetButton(2)?.OnPointUpCallBack.Bind(() => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向右移动", 1);
    });
    this.GetButton(3)?.OnPointDownCallBack.Bind(() => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向前移动", 0);
    });
    this.GetButton(3)?.OnPointUpCallBack.Bind(() => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向前移动", 1);
    });
    this.GetButton(4)?.OnPointDownCallBack.Bind(() => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向后移动", 0);
    });
    this.GetButton(4)?.OnPointUpCallBack.Bind(() => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向后移动", 1);
    });
  }
  Z2f() {
    this.GetButton(1)?.OnPointDownCallBack.Unbind();
    this.GetButton(1)?.OnPointUpCallBack.Unbind();
    this.GetButton(2)?.OnPointDownCallBack.Unbind();
    this.GetButton(2)?.OnPointUpCallBack.Unbind();
    this.GetButton(3)?.OnPointDownCallBack.Unbind();
    this.GetButton(3)?.OnPointUpCallBack.Unbind();
    this.GetButton(4)?.OnPointDownCallBack.Unbind();
    this.GetButton(4)?.OnPointUpCallBack.Unbind();
  }
  kSg() {
    var e = ModelManager_1.ModelManager.InputDistributeModel.GetNotAllowFightInputViewNameSet();
    var e = Array.from(e);
    return e.length !== 0 && e[e.length - 1] === this.Info.Name;
  }
  OnBeforeShow() {
    this.X2f = this.GetItem(13);
    this.X2f?.SetUIActive(false);
    this.Lxf = this.GetItem(8);
    this.Lxf?.SetUIActive(false);
    this.Fxe = this.GetButton(6)?.GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass());
    var e = ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting;
    var t = ControllerHolder_1.ControllerHolder.RollBlockController.GetCurrentDifficulty();
    var i = ControllerHolder_1.ControllerHolder.RollBlockController.GetTotalDifficulty();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), e.RollBlockMainTipKey);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), e.RollBlockSecondTipKey, t, i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.RollBlockPhantomTipKey);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (t !== 2 && (i = UiResourceById_1.configUiResourceById.GetConfig(t === 1 ? "SP_CubeMoveTipIconM" : "SP_CubeMoveTipIconF")?.Path)) {
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LGUISpriteData_BaseObject, e => {
        if (e && e.IsValid()) {
          this.GetSprite(10)?.SetSprite(e);
        }
      });
      this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.$pt?.BindSequenceCloseEvent(this.yct);
      EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.RollBlockAllCompleted, this.z2f);
    }
  }
  OnBeforeDestroy() {
    if (this._9g) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this._9g);
    }
    this._9g = undefined;
  }
}
exports.RollBlockView = RollBlockView;
//# sourceMappingURL=RollBlockView.js.map