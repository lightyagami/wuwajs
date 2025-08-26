"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveCursorPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const InputController_1 = require("../../../../Input/InputController");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputExtraShowCursorCenter_1 = require("../../../../Ui/Input/InputExtraShowCursorCenter");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const SECTOR_ANGLE_SIZE = 0.0222222222222222;
const HALF_SECTOR_ANGLE_SIZE = 22.5;
const SECTOR_NUM = 8;
const MOUSE_SAFE_AREA_KEY = "GuyingxiongkaiSafeArea";
const THIS_VIEW_NAME = "MoveCursorPanel";
class MoveCursorPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.z41 = 0;
    this.J41 = 0;
    this.AO1 = 0;
    this.C71 = true;
    this.pH1 = undefined;
    this.XY1 = undefined;
    this.WBr = undefined;
    this.SPe = undefined;
    this.p71 = (e, t) => {
      if (t) {
        if (t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()) {
          t.MorphShowSpecialEnergyBar = true;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "OnTagAddOrRemove roleData 为空");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiEnergyBarVisible, true);
        this.C71 = false;
        this.SetUiActive(false);
        InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt);
        InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData(THIS_VIEW_NAME);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
      }
    };
    this.XBo = () => {
      if (!this.pH1 || !this.WBr?.HasAnyTag(this.pH1)) {
        this.YY1();
        if (Info_1.Info.IsInKeyBoard()) {
          this.C71 = true;
          InputDistributeController_1.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt);
          InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.RegisterExtraRefreshData(THIS_VIEW_NAME, this);
        } else {
          this.C71 = false;
          InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt);
          InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData(THIS_VIEW_NAME);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
      }
    };
    this.Srt = (e, t) => {
      if (InputMappingsDefine_1.actionMappings.攻击 === e && t === 0) {
        InputController_1.InputController.InputAction(InputEnums_1.EInputAction.攻击, 1);
      } else if (InputMappingsDefine_1.actionMappings.闪避 === e && t === 0) {
        InputController_1.InputController.InputAction(InputEnums_1.EInputAction.闪避, 1);
      }
    };
  }
  CreateDynamic(e) {
    this.CreateThenShowByResourceIdAsync("UiItem_SlashTip", e);
    this.pH1 = ModelManager_1.ModelManager.BattleUiModel.GetTagIdMoveCursorVisible();
  }
  Initialize(e) {
    var t = CommonParamById_1.configCommonParamById.GetFloatArrayConfig(MOUSE_SAFE_AREA_KEY);
    if (t) {
      this.z41 = t[0];
      this.J41 = t[1];
    }
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.XY1 = this.GetTexture(1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UITexture]];
  }
  OnAfterShow() {
    this.SPe?.PlaySequencePurely("Start");
    this.SPe?.PlaySequencePurely("Loop");
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (e) {
      if (this.pH1) {
        this.WBr = e.GameplayTagComponent;
        if (this.WBr) {
          if (this.WBr.HasAnyTag(this.pH1)) {
            this.C71 = false;
            this.SetUiActive(false);
            e.MorphShowSpecialEnergyBar = true;
          } else {
            this.YY1();
            e.MorphShowSpecialEnergyBar = false;
            InputDistributeController_1.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt);
            InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.RegisterExtraRefreshData(THIS_VIEW_NAME, this);
            for (const t of this.pH1) {
              this.WBr?.AddTagAddOrRemoveListener(t, this.p71);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "OnAfterShow this.GameplayTagComp 为空");
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 20, "OnAfterShow roleData 为空");
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
  }
  YY1() {
    if (Info_1.Info.IsInKeyBoard()) {
      this.SetTextureByPath("/Game/Aki/UI/UIResources/Common/Image/UiIconPcBtn/T_IconPcBtn_Mouse2_UI.T_IconPcBtn_Mouse2_UI", this.XY1);
    } else {
      this.SetTextureByPath("/Game/Aki/UI/UIResources/Common/Image/UiIconPcBtn/T_IconPcBtn_XboxL2_UI.T_IconPcBtn_XboxL2_UI", this.XY1);
    }
  }
  OnHideBattleChildView() {
    if (this.C71) {
      InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt);
      InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData(THIS_VIEW_NAME);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
    }
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (e) {
      if (this.pH1 && e.GameplayTagComponent) {
        for (const t of this.pH1) {
          e.GameplayTagComponent.RemoveTagAddOrRemoveListener(t, this.p71);
        }
      }
      e.MorphShowSpecialEnergyBar = true;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 20, "OnBeforeDestroy roleData 为空");
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.InputControllerChange, this.XBo)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  IsShowCursor() {
    return !!Info_1.Info.IsInKeyBoard() && this.C71;
  }
  Tick(e) {
    if (this.IsShowCursor()) {
      var t = Global_1.Global.CharacterController.GetCursorPosition();
      if (t) {
        var n = ModelManager_1.ModelManager.BattleUiModel.ViewportSize;
        var i = n.X * 0.5;
        var n = n.Y * 0.5;
        var r = i * this.z41;
        var s = n * this.J41;
        var i = t.X - i;
        var n = n - t.Y;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Activity", 20, "坐标", ["dx, dy", `(${i}, ${n})`], ["sX, sY", `(${r}, ${s})`]);
        }
        if (!(Math.abs(i) < r) || !(Math.abs(n) < s)) {
          let e = Math.atan2(n, i) * MathUtils_1.MathUtils.RadToDeg;
          if (e < 0) {
            e += 360;
          }
          t = Math.floor((e + HALF_SECTOR_ANGLE_SIZE) * SECTOR_ANGLE_SIZE) % SECTOR_NUM;
          if (t !== this.AO1) {
            switch (this.AO1 = t) {
              case 0:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1);
                break;
              case 1:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1);
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
                break;
              case 2:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
                break;
              case 3:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1);
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
                break;
              case 4:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1);
                break;
              case 5:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1);
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
                break;
              case 6:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
                break;
              case 7:
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1);
                InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
            }
          }
        }
      }
    }
  }
}
exports.MoveCursorPanel = MoveCursorPanel;
//# sourceMappingURL=MoveCursorPanel.js.map