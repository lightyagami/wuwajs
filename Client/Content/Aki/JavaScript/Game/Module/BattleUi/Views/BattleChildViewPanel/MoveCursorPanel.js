"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoveCursorPanel = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  InputController_1 = require("../../../../Input/InputController"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputExtraShowCursorCenter_1 = require("../../../../Ui/Input/InputExtraShowCursorCenter"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
  SECTOR_ANGLE_SIZE = .0222222222222222,
  HALF_SECTOR_ANGLE_SIZE = 22.5,
  SECTOR_NUM = 8,
  MOUSE_SAFE_AREA_KEY = "GuyingxiongkaiSafeArea",
  THIS_VIEW_NAME = "MoveCursorPanel";
class MoveCursorPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments), this.y41 = 0, this.S41 = 0, this.Zk1 = 0, this.kj1 = !0, this.Z91 = void 0, this.AX1 = void 0, this.WBr = void 0, this.SPe = void 0, this.Oj1 = (e, t) => {
      t && ((t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()) ? t.MorphShowSpecialEnergyBar = !0 : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "OnTagAddOrRemove roleData 为空"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiEnergyBarVisible, !0), this.kj1 = !1, this.SetUiActive(!1), InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt), InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData(THIS_VIEW_NAME), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor))
    }, this.XBo = () => {
      this.Z91 && this.WBr?.HasAnyTag(this.Z91) || (this.PX1(), Info_1.Info.IsInKeyBoard() ? (this.kj1 = !0, InputDistributeController_1.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt), InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.RegisterExtraRefreshData(THIS_VIEW_NAME, this)) : (this.kj1 = !1, InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt), InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData(THIS_VIEW_NAME)), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor))
    }, this.Srt = (e, t) => {
      InputMappingsDefine_1.actionMappings.攻击 === e && 0 === t ? InputController_1.InputController.InputAction(InputEnums_1.EInputAction.攻击, 1) : InputMappingsDefine_1.actionMappings.闪避 === e && 0 === t && InputController_1.InputController.InputAction(InputEnums_1.EInputAction.闪避, 1)
    }
  }
  CreateDynamic(e) {
    this.CreateThenShowByResourceIdAsync("UiItem_SlashTip", e), this.Z91 = ModelManager_1.ModelManager.BattleUiModel.GetTagIdMoveCursorVisible()
  }
  Initialize(e) {
    var t = CommonParamById_1.configCommonParamById.GetFloatArrayConfig(MOUSE_SAFE_AREA_KEY);
    t && (this.y41 = t[0], this.S41 = t[1])
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.AX1 = this.GetTexture(1)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UITexture]
    ]
  }
  OnAfterShow() {
    this.SPe?.PlaySequencePurely("Start"), this.SPe?.PlaySequencePurely("Loop");
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (e) {
      if (this.Z91)
        if (this.WBr = e.GameplayTagComponent, this.WBr)
          if (this.WBr.HasAnyTag(this.Z91)) this.kj1 = !1, this.SetUiActive(!1), e.MorphShowSpecialEnergyBar = !0;
          else {
            this.PX1(), e.MorphShowSpecialEnergyBar = !1, InputDistributeController_1.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt), InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.RegisterExtraRefreshData(THIS_VIEW_NAME, this);
            for (const t of this.Z91) this.WBr?.AddTagAddOrRemoveListener(t, this.Oj1)
          }
      else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "OnAfterShow this.GameplayTagComp 为空")
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "OnAfterShow roleData 为空");
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo)
  }
  PX1() {
    Info_1.Info.IsInKeyBoard() ? this.SetTextureByPath("/Game/Aki/UI/UIResources/Common/Image/UiIconPcBtn/T_IconPcBtn_Mouse2_UI.T_IconPcBtn_Mouse2_UI", this.AX1) : this.SetTextureByPath("/Game/Aki/UI/UIResources/Common/Image/UiIconPcBtn/T_IconPcBtn_XboxL2_UI.T_IconPcBtn_XboxL2_UI", this.AX1)
  }
  OnHideBattleChildView() {
    this.kj1 && (InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.闪避], this.Srt), InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.UnRegisterExtraRefreshData(THIS_VIEW_NAME), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor));
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (e) {
      if (this.Z91 && e.GameplayTagComponent)
        for (const t of this.Z91) e.GameplayTagComponent.RemoveTagAddOrRemoveListener(t, this.Oj1);
      e.MorphShowSpecialEnergyBar = !0
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "OnBeforeDestroy roleData 为空");
    EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.InputControllerChange, this.XBo) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo)
  }
  OnBeforeDestroy() {
    this.SPe?.Clear(), this.SPe = void 0
  }
  IsShowCursor() {
    return !!Info_1.Info.IsInKeyBoard() && this.kj1
  }
  Tick(e) {
    if (this.IsShowCursor()) {
      var t = Global_1.Global.CharacterController.GetCursorPosition();
      if (t) {
        var n = ModelManager_1.ModelManager.BattleUiModel.ViewportSize,
          i = .5 * n.X,
          n = .5 * n.Y,
          r = i * this.y41,
          s = n * this.S41,
          i = t.X - i,
          n = n - t.Y;
        if (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Activity", 20, "坐标", ["dx, dy", `(${i}, ${n})`], ["sX, sY", `(${r}, ${s})`]), !(Math.abs(i) < r && Math.abs(n) < s)) {
          let e = Math.atan2(n, i) * MathUtils_1.MathUtils.RadToDeg;
          e < 0 && (e += 360);
          t = Math.floor((e + HALF_SECTOR_ANGLE_SIZE) * SECTOR_ANGLE_SIZE) % SECTOR_NUM;
          if (t !== this.Zk1) switch (this.Zk1 = t) {
            case 0:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1);
              break;
            case 1:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1), InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
              break;
            case 2:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
              break;
            case 3:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1), InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, 1);
              break;
            case 4:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1);
              break;
            case 5:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, -1), InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
              break;
            case 6:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1);
              break;
            case 7:
              InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveRight, 1), InputController_1.InputController.InputAxis(InputEnums_1.EInputAxis.MoveForward, -1)
          }
        }
      }
    }
  }
}
exports.MoveCursorPanel = MoveCursorPanel;
//# sourceMappingURL=MoveCursorPanel.js.map