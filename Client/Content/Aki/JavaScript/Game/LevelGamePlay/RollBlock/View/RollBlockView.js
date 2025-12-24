"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollBlockView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiResourceById_1 = require("../../../../Core/Define/ConfigQuery/UiResourceById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
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
    this.JIf = 0;
    this.ZIf = 0;
    this.$pt = undefined;
    this.CAf = undefined;
    this.pRf = undefined;
    this.wKf = false;
    this.eTf = (e, t) => {
      if (this.AZf()) {
        if (e === InputMappingsDefine_1.axisMappings.NavigationTopDown && Math.abs(this.JIf - t) > MathCommon_1.MathCommon.SmallNumber) {
          if (t > 0.5 && this.JIf <= 0.5) {
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向后移动", 1);
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向前移动", 0);
          } else if (t < -0.5 && this.JIf >= -0.5) {
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向前移动", 1);
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向后移动", 0);
          } else if (t > -0.5 && t < 0.5) {
            ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput(this.JIf > 0 ? "向前移动" : "向后移动", 1);
          }
          this.JIf = t;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RollBlock", 31, "[input] ForwardInputValue", ["Value", this.JIf]);
          }
        } else if (e === InputMappingsDefine_1.axisMappings.NavigationLeftRight && Math.abs(this.ZIf - t) > MathCommon_1.MathCommon.SmallNumber && (t > 0.5 && this.ZIf <= 0.5 ? (ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向左移动", 1), ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向右移动", 0)) : t < -0.5 && this.ZIf >= -0.5 ? (ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向右移动", 1), ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向左移动", 0)) : t > -0.5 && t < 0.5 && ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput(this.ZIf > 0 ? "向右移动" : "向左移动", 1), this.ZIf = t, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("RollBlock", 31, "[input] RightInputValue", ["Value", this.ZIf]);
        }
      }
    };
    this.bOi = (e, t) => {
      if (e === InputMappingsDefine_1.actionMappings.Ui方向上) {
        ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向前移动", t);
      } else if (e === InputMappingsDefine_1.actionMappings.Ui方向下) {
        ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向后移动", t);
      } else if (e === InputMappingsDefine_1.actionMappings.Ui方向左) {
        ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向左移动", t);
      } else if (e === InputMappingsDefine_1.actionMappings.Ui方向右) {
        ControllerHolder_1.ControllerHolder.RollBlockController.OnClickMoveInput("向右移动", t);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[input] OnInput", ["ActionName", e], ["ActionType", t.toString()]);
      }
    };
    this.tgf = () => {
      if (!this.pRf?.bIsUIActive) {
        this.pRf?.SetUIActive(true);
        this.$pt?.PlayLevelSequenceByName("TipsIn");
      }
    };
    this.pAf = e => {
      switch (e) {
        case "开始":
          this.RemoveEventListener(true);
          break;
        case "失败":
          this.AddEventListener();
          break;
        case "成功":
          this.CAf?.SetUIActive(false);
          EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.RollBlockAllCompleted, this.vAf);
      }
    };
    this.yct = e => {
      if (e === "Start01") {
        this.AddEventListener();
      }
    };
    this.vAf = () => {
      this.GetButton(5)?.GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(ControllerHolder_1.ControllerHolder.RollBlockController.GetIsMultiBlock());
      this.CAf?.SetUIActive(true);
      this.$pt?.PlayLevelSequenceByName("Start01");
      ControllerHolder_1.ControllerHolder.RollBlockController.NotifyServerShowAllBlock();
    };
    this.wuf = () => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickSwitch();
    };
    this.Luf = () => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickReset();
    };
    this.xpt = () => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickEsc();
    };
    this.Puf = () => {
      ControllerHolder_1.ControllerHolder.RollBlockController.OnClickTip();
    };
    this.lil = () => {
      ControllerHolder_1.ControllerHolder.TutorialController.OpenExclusiveTutorial(201);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIText], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIText], [16, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.wuf], [6, this.Luf], [7, this.xpt], [12, this.Puf], [16, this.lil]];
  }
  AddEventListener() {
    if (!this.wKf && !(this.wKf = true, this.zla(), this.yAf(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowRollBlockTips, this.tgf), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnRollBlockReseting, this.pAf))) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRollBlockReseting, this.pAf);
    }
  }
  RemoveEventListener(e = false) {
    this.wKf = false;
    this.Jla();
    this.SAf();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowRollBlockTips, this.tgf);
    if (!e) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRollBlockReseting, this.pAf);
    }
  }
  OnRemoveEventListener() {
    this.RemoveEventListener();
  }
  zla() {
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.NavigationTopDown, this.eTf);
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.NavigationLeftRight, this.eTf);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向上, this.bOi);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向下, this.bOi);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向左, this.bOi);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向右, this.bOi);
  }
  Jla() {
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.NavigationTopDown, this.eTf);
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.NavigationLeftRight, this.eTf);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向上, this.bOi);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向下, this.bOi);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向左, this.bOi);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向右, this.bOi);
  }
  yAf() {
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
  SAf() {
    this.GetButton(1)?.OnPointDownCallBack.Unbind();
    this.GetButton(1)?.OnPointUpCallBack.Unbind();
    this.GetButton(2)?.OnPointDownCallBack.Unbind();
    this.GetButton(2)?.OnPointUpCallBack.Unbind();
    this.GetButton(3)?.OnPointDownCallBack.Unbind();
    this.GetButton(3)?.OnPointUpCallBack.Unbind();
    this.GetButton(4)?.OnPointDownCallBack.Unbind();
    this.GetButton(4)?.OnPointUpCallBack.Unbind();
  }
  AZf() {
    var e = ModelManager_1.ModelManager.InputDistributeModel.GetNotAllowFightInputViewNameSet();
    var e = Array.from(e);
    return e.length !== 0 && e[e.length - 1] === this.Info.Name;
  }
  OnBeforeShow() {
    this.CAf = this.GetItem(13);
    this.CAf?.SetUIActive(false);
    this.pRf = this.GetItem(8);
    this.pRf?.SetUIActive(false);
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
      EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.RollBlockAllCompleted, this.vAf);
    }
  }
}
exports.RollBlockView = RollBlockView;
//# sourceMappingURL=RollBlockView.js.map