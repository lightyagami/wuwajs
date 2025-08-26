"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationRestrictUtils = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const Global_1 = require("../../Global");
const InputEnums_1 = require("../../Input/InputEnums");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ExploreSkillFlagDefine_1 = require("../../Module/Functional/ExploreSkillFlag/ExploreSkillFlagDefine");
const InputManager_1 = require("../../Ui/Input/InputManager");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const LevelEventLockInputState_1 = require("../LevelEventLockInputState");
const InputTagModifyUtils_1 = require("./InputTagModifyUtils");
class OperationRestrictUtils {
  static SetOperationRestrictByOption(t) {
    switch (t.Type) {
      case IAction_1.EPlayerOperationType.DisableAll:
        this.SetOperationRestrictByDisableOption(t);
        break;
      case IAction_1.EPlayerOperationType.EnableAll:
        this.SetOperationRestrictEnableAll();
        break;
      case IAction_1.EPlayerOperationType.DisableModule:
        this.SetOperationRestrictByDisableSectionalOption(t);
    }
  }
  static SetOperationRestrictEnableAll() {
    this.SetInputUnlock();
    this.ClearInputLimitView();
    this.SetBattleUiEnableAll(false);
    this.SetInputBlockRestrict(false);
    this.SetMoveEnableAll();
    this.SetInteractEnable(false);
    this.SetSkillEnableAll();
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ModelManager_1.ModelManager.LevelGamePlayModel.LevelRestrictOperationBlockAll = false;
  }
  static SetOperationRestrictByDisableOption(t) {
    this.SetInputDisableAll();
    this.ClearInputLimitView();
    if (t.DisplayMode === IAction_1.EDisplayModeInPlayerOp.HideUi) {
      this.SetBattleUiDisableAll(true);
    } else {
      this.SetBattleUiEnableAll(false);
    }
    if (UiManager_1.UiManager.IsViewShow("BattleView")) {
      this.SetInputBlockRestrict(true);
    } else {
      this.SetInputBlockRestrict(false);
    }
    this.SetMoveDisableAll();
    this.SetInteractDisable(true);
    this.SetSkillDisableAll();
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ModelManager_1.ModelManager.LevelGamePlayModel.LevelRestrictOperationBlockAll = true;
  }
  static SetOperationRestrictByDisableSectionalOption(t) {
    this.SetInputEnableAll();
    this.SetBattleUiEnableAll(false);
    this.ClearInputLimitView();
    this.SetBattleUiRestrictByUiOption(t.UiOption);
    this.SetInputBlockRestrict(false);
    this.SetMoveRestrictByMoveOption(t.MoveOption);
    this.SetCameraRestrictByCameraOption(t.CameraOption);
    this.SetInteractRestrictByInteractOption(t.SceneInteractionOption);
    this.SetSkillRestrictBySkillOption(t.SkillOption);
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ModelManager_1.ModelManager.LevelGamePlayModel.LevelRestrictOperationBlockAll = false;
  }
  static SetInputUnlock() {
    LevelEventLockInputState_1.LevelEventLockInputState.Unlock();
  }
  static SetInputLimitView(t, e) {
    var i = LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.indexOf(t);
    var n = i !== -1;
    if (e) {
      if (!n) {
        LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.push(t);
      }
    } else if (n) {
      LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.splice(i, 1);
    }
  }
  static ClearInputLimitView() {
    LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc = false;
    LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = [];
  }
  static SetInputEnableAll() {
    var t = [InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag];
    if (LevelEventLockInputState_1.LevelEventLockInputState.RealLockInput) {
      LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames = t;
    } else {
      LevelEventLockInputState_1.LevelEventLockInputState.Lock(t);
    }
  }
  static SetInputDisableAll() {
    if (LevelEventLockInputState_1.LevelEventLockInputState.RealLockInput) {
      LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames = [];
    } else {
      LevelEventLockInputState_1.LevelEventLockInputState.Lock([]);
    }
  }
  static SetInputRestrictByTag(t, e) {
    if (!LevelEventLockInputState_1.LevelEventLockInputState.RealLockInput) {
      LevelEventLockInputState_1.LevelEventLockInputState.Lock([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag, InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag]);
    }
    InputTagModifyUtils_1.InputTagModifyUtils.SetEnableInputTag(LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames, t, e);
  }
  static GetInputEnableByTag(t) {
    return !LevelEventLockInputState_1.LevelEventLockInputState.RealLockInput || InputTagModifyUtils_1.InputTagModifyUtils.GetIsInputTagEnable(LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames, t, false);
  }
  static SetBattleUiEnableAll(t) {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
    if (t) {
      this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, true);
      LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc = false;
      for (const i of InputManager_1.InputManager.GetAllViewHotKeyHandle()) {
        var e = i.ViewName;
        if (e) {
          this.SetInputLimitView(e, false);
        }
      }
    }
  }
  static SetBattleUiDisableAll(t) {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(1);
    if (t) {
      this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, false);
      LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc = true;
      for (const i of InputManager_1.InputManager.GetAllViewHotKeyHandle()) {
        var e = i.ViewName;
        if (e) {
          this.SetInputLimitView(e, true);
        }
      }
    }
  }
  static SetBattleUiRestrictByUiOption(t) {
    if (t?.Type === IAction_1.EUiOperationType.Disable) {
      this.SetBattleUiRestrictByDisableUiOption(t);
    } else if (t?.Type === IAction_1.EUiOperationType.EnableSectionalUi) {
      this.SetBattleUiRestrictByEnableSectionalUiOption(t);
    } else {
      this.SetBattleUiRestrictByEnableUiOption(t);
    }
  }
  static SetBattleUiRestrictByEnableUiOption(t) {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(1, this.GWu, true);
    if (LevelEventLockInputState_1.LevelEventLockInputState.RealLockInput) {
      this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, true);
      LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc = false;
      for (const i of InputManager_1.InputManager.GetAllViewHotKeyHandle()) {
        var e = i.ViewName;
        if (e) {
          this.SetInputLimitView(e, false);
        }
      }
    }
  }
  static SetBattleUiRestrictByDisableUiOption(t) {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(1, this.GWu, false);
    this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.ShortcutKeyTag, false);
    LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc = true;
    for (const i of InputManager_1.InputManager.GetAllViewHotKeyHandle()) {
      var e = i.ViewName;
      if (e) {
        this.SetInputLimitView(e, true);
      }
    }
  }
  static SetBattleUiRestrictByEnableSectionalUiOption(t) {
    var e = new Set();
    var i = new Set();
    if (t.ShowEsc) {
      e.add(1);
    } else {
      i.add(1);
      LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc = true;
    }
    if (t.ShowMiniMap) {
      e.add(4);
    } else {
      i.add(4);
      this.SetInputLimitView("WorldMapView", true);
    }
    (t.ShowQuestTrack ? (e.add(5), e) : (i.add(5), i)).add(17);
    (t.ShowScreenEffect ? e : i).add(23);
    (t.ShowPositionOfficial ? e : i).add(25);
    if (t.ShowSystem) {
      e.add(3);
      e.add(2);
    } else {
      i.add(3);
      i.add(2);
      for (const a of InputManager_1.InputManager.GetAllViewHotKeyHandle()) {
        var n = a.ViewName;
        if (n && n !== "WorldMapView") {
          this.SetInputLimitView(n, true);
        }
      }
    }
    if (t.ShowOther) {
      for (const s of this.GWu) {
        if (!i.has(s) && !e.has(s)) {
          e.add(s);
        }
      }
    } else {
      for (const l of this.GWu) {
        if (!i.has(l) && !e.has(l)) {
          i.add(l);
        }
      }
      i.add(26);
    }
    if (t.AlwaysShowUiSections) {
      for (const o of t.AlwaysShowUiSections) {
        if (o === IAction_1.EUiElement.Guide) {
          i.delete(26);
          e.add(26);
        }
      }
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(1, Array.from(i), false);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(1, Array.from(e), true);
  }
  static SetBattleUiRestrictByUiChildType(t, e) {
    if (e?.length) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(1, e, false);
    }
    if (t?.length) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(1, t, true);
    }
  }
  static get GWu() {
    if (!this.FWu) {
      this.FWu = [];
      for (let t = 0; t < 37; t++) {
        if (t !== 12 && t !== 18 && t !== 19 && t !== 9 && t !== 10) {
          this.FWu.push(t);
        }
      }
    }
    return this.FWu;
  }
  static SetInputBlockRestrict(t) {
    if (t) {
      UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", true);
    } else {
      UiLayer_1.UiLayer.SetShowMaskLayer("LevelEventSetPlayerOperation", false);
    }
  }
  static SetMoveRestrictByMoveOption(t) {
    if (t?.Type === IAction_1.EMoveOperationType.Disable) {
      this.SetMoveRestrictByDisableMoveOption(t);
    } else {
      this.SetMoveEnableAll();
    }
  }
  static SetMoveEnableAll() {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(true, true, true, true);
    this.NWu(477750727, false);
    this.NWu(-63548288, false);
    this.NWu(229513169, false);
  }
  static SetMoveDisableAll() {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(false, false, false, false);
  }
  static SetMoveRestrictByDisableMoveOption(t) {
    this.NWu(477750727, !!t.ForbidSprint);
    this.NWu(-63548288, !!t.ForceWalk);
    this.NWu(229513169, !t.ForceWalk && !!t.ForceJog);
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(t.Forward, t.Back, t.Left, t.Right);
  }
  static NWu(t, e) {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    var n = i?.GetComponent(206);
    if (i?.Valid && n) {
      if (e) {
        if (!n.HasTag(t)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("LevelEvent", 39, "[OperationRestrictUtils.SetMoveRestrictTag] 添加Tag", ["TagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)]);
          }
          n.AddTag(t);
        }
      } else if (n.HasTag(t)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 39, "[OperationRestrictUtils.SetMoveRestrictTag] 删除Tag", ["TagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)]);
        }
        n.RemoveTag(t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 39, "[OperationRestrictUtils.SetMoveRestrictTag] 找不到对应实体Tag组件", ["TagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)]);
    }
  }
  static SetInteractRestrictByInteractOption(t) {
    if (t?.Type === IAction_1.ESceneInteractionOperationType.Disable) {
      this.SetInteractDisable(true);
    } else {
      this.SetInteractEnable(true);
    }
  }
  static SetInteractEnable(t) {
    if (t) {
      this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag, true);
    }
    this.SetBattleUiRestrictByUiChildType([19], undefined);
  }
  static SetInteractDisable(t) {
    if (t) {
      this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.InteractionRootTag, false);
    }
    this.SetBattleUiRestrictByUiChildType(undefined, [19]);
  }
  static SetCameraRestrictByCameraOption(t) {
    if (t?.Type === IAction_1.ECameraOperationType.Disable) {
      this.SetCameraDisable();
    } else {
      this.SetCameraEnable();
    }
  }
  static SetCameraEnable() {
    this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInputTag, true);
  }
  static SetCameraDisable() {
    this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInputTag, false);
  }
  static SetSkillRestrictBySkillOption(t) {
    if (t && t?.Type !== IAction_1.ESkillOperationType.Enable) {
      if (t?.Type === IAction_1.ESkillOperationType.DisableSection) {
        this.SetSkillRestrictByDisableSectionalSkillOption(t);
      } else if (t?.Type === IAction_1.ESkillOperationType.Disable) {
        this.SetSkillRestrictByDisableSkillOption(t);
      }
    } else {
      this.SetSkillEnableAll();
    }
  }
  static SetSkillEnableAll() {
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(1, true);
    ModelManager_1.ModelManager.ExploreSkillFlagModel.EnableAllExploreSkillFlag();
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, true);
    this.SetBattleUiRestrictByUiChildType([9, 10], undefined);
    ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(true, 0);
  }
  static SetSkillDisableAll() {
    this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInputTag, false);
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(1, false);
    ModelManager_1.ModelManager.ExploreSkillFlagModel.DisableAllExploreSkillFlag();
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, false);
    this.SetBattleUiRestrictByUiChildType(undefined, [9, 10]);
    ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(false, 0);
  }
  static SetSkillRestrictByDisableSkillOption(t) {
    this.SetInputRestrictByTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.ActionInputTag, false);
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(1, !t.DisableSkillWheel);
    ModelManager_1.ModelManager.ExploreSkillFlagModel.DisableAllExploreSkillFlag();
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, false);
    if (t.DisplayMode === IAction_1.EDisplayModeInSkillOp.Hide) {
      this.SetBattleUiRestrictByUiChildType(undefined, [9, 10]);
      ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(false, 0);
    } else if (t.DisplayMode === IAction_1.EDisplayModeInSkillOp.Ashen) {
      this.SetBattleUiRestrictByUiChildType([9, 10], undefined);
      ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(false, 0);
    } else if (t.DisplayMode === undefined) {
      this.SetBattleUiRestrictByUiChildType([9, 10], undefined);
      ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(true, 0);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 39, "[OperationRestrictUtils.SetSkillRestrictByDisableSkillOption] 配置出错", ["SkillOption", t]);
    }
  }
  static SetSkillRestrictByDisableSectionalSkillOption(t) {
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(1, !t.DisableSkillWheel);
    var e = t.DisableExploreSkill?.ExploreSkillList;
    var i = !!t.DisableExploreSkill?.IsComplementary;
    for (const l of ExploreSkillFlagDefine_1.levelExploreSkillFlagDefaultVal.keys()) {
      const n = !!e?.includes(l);
      const a = i ? n : !n;
      ModelManager_1.ModelManager.ExploreSkillFlagModel.SetExploreSkillFlagEnable(l, a);
    }
    const n = !!e?.includes(IAction_1.EExploreSkillType.PlaceTemporaryTeleport);
    const a = i ? n : !n;
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, a);
    let s = undefined;
    s = t.DisableBattleSkill?.IsDisableCharacterSkill ? [InputEnums_1.EInputAction.跳跃, InputEnums_1.EInputAction.攀爬, InputEnums_1.EInputAction.攻击, InputEnums_1.EInputAction.闪避, InputEnums_1.EInputAction.技能1, InputEnums_1.EInputAction.大招, InputEnums_1.EInputAction.切换角色1, InputEnums_1.EInputAction.切换角色2, InputEnums_1.EInputAction.切换角色3, InputEnums_1.EInputAction.锁定目标, InputEnums_1.EInputAction.瞄准] : [];
    if (t.DisableBattleSkill?.IsDisablePhantomSkill) {
      s.push(InputEnums_1.EInputAction.幻象2);
    }
    if (t.DisplayMode === undefined || t.DisplayMode === IAction_1.EDisplayModeInSkillOp.Disable) {
      this.SetBattleUiRestrictByUiChildType([9, 10], undefined);
      if (s.length <= 0) {
        ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(true, 0);
      } else {
        ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnableWithIgnoreList(true, s, 0);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 39, "[OperationRestrictUtils.SetSkillRestrictByDisableSectionalSkillOption] 配置出错", ["SkillOption", t]);
    }
  }
}
(exports.OperationRestrictUtils = OperationRestrictUtils).FWu = undefined;
//# sourceMappingURL=OperationRestrictUtils.js.map