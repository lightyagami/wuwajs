"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillGamepadItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const InputEnums_1 = require("../../../Input/InputEnums");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const BattleSkillItem_1 = require("./BattleSkillItem");
const BattleSkillSwitchInteractItem_1 = require("./BattleSkillSwitchInteractItem");
class BattleSkillGamepadItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments);
    this.GamepadData = undefined;
    this.ButtonAreaType = 0;
    this.IsSecondButton = false;
    this.HEe = "";
    this.eit = false;
    this.BehaviorButtonData = undefined;
    this.SrcBehaviorButtonData = undefined;
    this.SPe = undefined;
    this.iit = false;
    this.Dah = undefined;
  }
  get IsMainButton() {
    return this.ButtonAreaType === 0;
  }
  get IsSubButton() {
    return this.ButtonAreaType === 2;
  }
  get IsLeftButton() {
    return this.ButtonAreaType === 1;
  }
  Initialize(t) {
    super.Initialize(t);
    if (t < 4) {
      this.ButtonAreaType = 0;
    } else if (t < 8) {
      this.ButtonAreaType = 0;
      this.IsSecondButton = true;
      this.CdFixedPoint = 0;
      this.CoolDownUiText?.SetUIItemScale(new UE.Vector(1.667, 1.667, 1));
      this.IsHideNumComp = true;
    } else if (t < 12) {
      this.ButtonAreaType = 1;
      this.CdFixedPoint = 0;
      this.CoolDownUiText?.SetUIItemScale(new UE.Vector(1.667, 1.667, 1));
      this.IsHideNumComp = true;
    } else {
      this.ButtonAreaType = 2;
      this.CdFixedPoint = 1;
    }
  }
  SetKeyName(t) {
    this.HEe = t;
    if (this.IsMainButton || this.IsLeftButton) {
      this.KeyItem.SetActive(false);
    } else {
      t = {
        KeyName: this.HEe
      };
      this.KeyItem.RefreshByKeyList(t);
      this.KeyItem.SetActive(true);
    }
  }
  Tick(t) {
    super.Tick(t);
  }
  Refresh(t) {
    var i;
    if (!t && this.IsSecondButton || this.IsSecondButton && this.SrcBehaviorButtonData === undefined && t?.GetButtonType() === 7 && this.GamepadData?.SwitchInteractData.IsSwitchInteractOpen && this.GamepadData.SwitchInteractData.State === 2) {
      this.Deactivate();
    } else {
      i = this.SkillButtonData !== undefined || this.BehaviorButtonData !== undefined;
      this.BehaviorButtonData = undefined;
      if (t) {
        if (this.SkillButtonData !== t) {
          this.OnCoolDownFinishedCallback = undefined;
        }
        super.Refresh(t);
        if (this.SrcBehaviorButtonData) {
          this.SwitchInteract(false);
        }
      } else if (!!i || !this.eit) {
        this.eit = true;
        this.rit();
      }
    }
  }
  SwitchInteract(t, i) {
    if (t) {
      this.SrcBehaviorButtonData = this.BehaviorButtonData;
      this.BehaviorButtonData = undefined;
      this.OnCoolDownFinishedCallback = undefined;
      super.Refresh(i);
    } else {
      this.SrcBehaviorButtonData = undefined;
    }
    if (this.Dah) {
      this.Dah.RefreshEnable(t);
    } else if (t) {
      this.Dah = new BattleSkillSwitchInteractItem_1.BattleSkillSwitchInteractItem();
      this.Dah.Init(this.GetExtraContainer());
      this.Dah.RefreshEnable(true);
    }
  }
  rit() {
    if (this.SrcBehaviorButtonData) {
      this.SwitchInteract(false);
    }
    if (this.IsMainButton) {
      this.SkillButtonData = undefined;
      this.SetSkillIcon(this.GamepadData.NoneIcon);
      this.RefreshSkillName();
      this.ResetSkillCoolDown();
      this.SetTextureHandleId = 0;
      this.OnCoolDownFinishedCallback = undefined;
      this.KeyActionName = undefined;
      this.KeyOperationType = undefined;
      this.PressActionType = InputEnums_1.EInputAction.None;
      this.RefreshDynamicEffect();
      this.CancelLoadDynamicEffectNiagara();
      this.CancelLoadCdCompletedNiagara();
      if (this.UltraComponent) {
        this.UltraComponent.SetComponentActive(false);
      }
      if (this.NumComponent) {
        this.NumComponent.SetComponentActive(false);
      }
      if (this.DotIndicatorComponent) {
        this.DotIndicatorComponent.SetComponentActive(false);
      }
      if (this.SwitchComponent) {
        this.SwitchComponent.SetComponentActive(false);
      }
      if (this.ConfigLongPressComponent) {
        this.ConfigLongPressComponent.SetComponentActive(false);
      }
      if (this.ExtraEffectComponent) {
        this.ExtraEffectComponent.SetComponentActive(false);
      }
      if (!this.IsShowOrShowing) {
        this.Show();
      }
    } else {
      this.Deactivate();
    }
  }
  RefreshVisible() {
    if (this.IsMainButton) {
      if (this.IsVisible()) {
        if (!this.IsShowOrShowing) {
          this.Show();
        }
      } else {
        this.rit();
      }
    } else {
      super.RefreshVisible();
    }
  }
  RefreshEnable(t = false) {
    if (this.BehaviorButtonData) {
      this.SetSkillItemEnable(this.BehaviorButtonData.IsEnable(), t);
    } else {
      super.RefreshEnable(t);
    }
  }
  RefreshSkillCoolDown() {
    if (this.SkillButtonData) {
      super.RefreshSkillCoolDown();
    } else {
      this.FinishSkillCoolDown();
    }
  }
  PlaySwitchCd() {
    this.HideCdText = true;
    var t = (this.GamepadData?.SwitchInteractData.SwitchTime ?? 0) * TimeUtil_1.TimeUtil.Millisecond;
    this.PlaySkillTimeDown(t, t, undefined);
  }
  RefreshByBehaviorButtonData(t) {
    if ((this.SkillButtonData = undefined, (this.BehaviorButtonData = t).ButtonType === 104 && this.GamepadData?.SwitchInteractData.IsSwitchInteractOpen) && this.GamepadData.SwitchInteractData.State === 2) {
      t = ModelManager_1.ModelManager.SkillButtonUiModel?.GetSkillButtonDataByButton(7);
      if (t?.IsVisible() && t.GetSkillId()) {
        this.SwitchInteract(true, t);
        return;
      }
    }
    this.ResetSkillCoolDown();
    this.SetTextureHandleId = 0;
    this.OnCoolDownFinishedCallback = undefined;
    this.PressActionType = InputEnums_1.EInputAction.None;
    this.RefreshDynamicEffect();
    this.CancelLoadDynamicEffectNiagara();
    this.CancelLoadCdCompletedNiagara();
    if (this.UltraComponent) {
      this.UltraComponent.SetComponentActive(false);
    }
    if (this.NumComponent) {
      this.NumComponent.SetComponentActive(false);
    }
    if (this.DotIndicatorComponent) {
      this.DotIndicatorComponent.SetComponentActive(false);
    }
    if (this.SwitchComponent) {
      this.SwitchComponent.SetComponentActive(false);
    }
    this.RefreshVisible();
    this.RefreshSkillIcon();
    this.RefreshSkillName();
    this.RefreshKey();
    this.RefreshEnable();
    if (this.SrcBehaviorButtonData) {
      this.SwitchInteract(false);
    }
  }
  CheckSkillIconIsTexture(t) {
    return !!this.SkillButtonData && super.CheckSkillIconIsTexture(t);
  }
  RefreshSkillIcon() {
    if (this.BehaviorButtonData) {
      this.SetSkillIcon(this.BehaviorButtonData.GetSkillTexturePath());
    } else {
      super.RefreshSkillIcon();
    }
  }
  IsVisible() {
    return (!this.GamepadData.GetIsPressCombineButton() || this.HEe !== "Gamepad_LeftTrigger" && this.HEe !== "Gamepad_RightTrigger") && (this.BehaviorButtonData ? this.BehaviorButtonData.IsVisible() : this.SkillButtonData?.GetButtonType() === 11 && !!this.GamepadData.IsAim() || super.IsVisible());
  }
  Deactivate() {
    super.Deactivate();
    this.eit = false;
  }
  Reset() {
    this.SPe?.Clear();
    this.SPe = undefined;
    super.Reset();
  }
  RefreshKey() {
    if (this.IsMainButton || this.IsLeftButton) {
      this.KeyItem.SetActive(false);
    } else {
      this.SetKeyName(this.HEe);
      this.KeyItem.SetActive(true);
    }
  }
  OnInputAction(t = false) {
    if (this.BehaviorButtonData) {
      if (this.BehaviorButtonData.IsEnable() && this.BehaviorButtonData.IsVisible()) {
        this.ClickEffect?.Play();
      }
    } else {
      super.OnInputAction(t);
    }
  }
  PlayPressCombineButtonSeq() {
    this.nit();
    this.SPe.StopCurrentSequence();
    this.SPe.PlaySequencePurely("ClickLbIn");
    this.CombinePressTipSprite.SetUIActive(true);
    this.iit = true;
    this.ClickEffect?.Stop();
  }
  PlayReleaseCombineButtonSeq() {
    if (this.iit) {
      this.iit = false;
      this.nit();
      this.SPe.StopCurrentSequence();
      this.SPe.PlaySequencePurely("ClickLbOut");
      this.CombinePressTipSprite.SetUIActive(false);
      this.ClickEffect?.Stop();
    }
  }
  nit() {
    this.SPe ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
}
exports.BattleSkillGamepadItem = BattleSkillGamepadItem;
//# sourceMappingURL=BattleSkillGamepadItem.js.map