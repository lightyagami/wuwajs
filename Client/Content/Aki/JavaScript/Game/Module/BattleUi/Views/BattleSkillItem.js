"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const BattleLinkDefine_1 = require("../../Battle/Link/BattleLinkDefine");
const SkillCdController_1 = require("../../Battle/SkillCdController");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const ControlScreenController_1 = require("../../ControlScreen/ControlScreenController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BattleUiDefine_1 = require("../BattleUiDefine");
const VisibleStateUtil_1 = require("../VisibleStateUtil");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const BattleSkillConfigLongPressItem_1 = require("./BattleSkillConfigLongPressItem");
const BattleSkillExtraEffectRhythmItem_1 = require("./BattleSkillExtraEffectRhythmItem");
const BattleSkillLongPressItem_1 = require("./BattleSkillLongPressItem");
const BattleSkillNumItem_1 = require("./BattleSkillNumItem");
const BattleSkillSwitchComponent_1 = require("./BattleSkillSwitchComponent");
const BattleSkillUltraItem_1 = require("./BattleSkillUltraItem");
const BattleUiNiagaraItem_1 = require("./BattleUiNiagaraItem");
const EQUIP_EFFECT_TIME = 500;
class BattleSkillItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.sit = undefined;
    this.DraggableComponent = undefined;
    this.SkillButtonData = undefined;
    this.ait = undefined;
    this.hit = undefined;
    this.lit = undefined;
    this.CoolDownUiText = undefined;
    this.uit = undefined;
    this.cit = -0;
    this.mit = -0;
    this.dit = -0;
    this.OnCoolDownFinishedCallback = undefined;
    this.Cit = false;
    this.git = undefined;
    this.IsLongPress = false;
    this.fit = false;
    this.pit = "";
    this.jtt = undefined;
    this.vit = 0;
    this.zQ_ = undefined;
    this.Wtt = undefined;
    this.Mem = 1;
    this.Mit = undefined;
    this.Eit = 0;
    this.yit = undefined;
    this.Iit = undefined;
    this.KeyItem = undefined;
    this.SetTextureHandleId = 0;
    this.Ktt = 0;
    this.Tit = 0;
    this.KeyActionName = undefined;
    this.KeyOperationType = undefined;
    this.ClickEffect = undefined;
    this.CombinePressTipSprite = undefined;
    this.PressActionType = InputEnums_1.EInputAction.None;
    this.ZKa = 0;
    this.Qel = false;
    this.bQ1 = false;
    this.Lit = undefined;
    this.Dit = undefined;
    this.Rit = undefined;
    this.Uit = undefined;
    this.Ait = undefined;
    this.Pit = undefined;
    this.xit = false;
    this.wit = false;
    this.Bit = false;
    this.HideCdText = false;
    this.CdFixedPoint = 1;
    this.IsHideNumComp = false;
    this.qit = 1;
    this.Git = 1;
    this.SkillNameText = undefined;
    this.UltraComponentVisibleState = 0;
    this.XGu = 0;
    this.uim = undefined;
    this.UltraComponent = undefined;
    this.NumComponent = undefined;
    this.SwitchComponent = undefined;
    this.LongPressComponent = undefined;
    this.ConfigLongPressComponent = undefined;
    this.ExtraEffectComponent = undefined;
    this.AlphaTweenComp = undefined;
    this.OnSelfCenteredMode = (t, i) => {
      if (TimerSystem_1.TimerSystem.Has(this.hit)) {
        TimerSystem_1.TimerSystem.ChangeDilation(this.hit, 1 / i);
      }
    };
    this.OnBattleLinkStatusChanged = t => {
      this.RefreshLinkStatus(t);
    };
    this.OnTouch = (t, i) => {
      var s;
      if (this.IsLongPress && (i = i.TouchType, t = Number(t), s = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(t)?.GetPointerEventData()?.pressComponent) && i === 2 && s.GetOwner() === this.ait.GetOwner()) {
        ControlScreenController_1.ControlScreenController.ExecuteCameraRotation(t);
      }
    };
    this.Oit = () => {
      this.IsLongPress = true;
      this.OnLongPressButton();
    };
    this.kit = t => {
      this.cit -= BattleUiDefine_1.SKILL_COOLDOWN_LOOP_INTERVAL;
      this.cit = Math.round(this.cit * 10) / 10;
      if (this.cit > 0) {
        if (!this.HideCdText) {
          this.CoolDownUiText.SetText(this.cit.toFixed(this.CdFixedPoint));
        }
      } else {
        this.FinishSkillCoolDown();
      }
    };
  }
  get GetUltraComponent() {
    var t;
    if (!this.UltraComponent) {
      t = this.GetItem(8);
      this.UltraComponent = new BattleSkillUltraItem_1.BattleSkillUltraItem(t);
    }
    return this.UltraComponent;
  }
  get GetNumComponent() {
    var t;
    if (!this.IsHideNumComp) {
      if (!this.NumComponent) {
        t = this.GetItem(8);
        this.NumComponent = new BattleSkillNumItem_1.BattleSkillNumItem(t);
      }
      return this.NumComponent;
    }
  }
  get GetSwitchComponent() {
    var t;
    if (!this.SwitchComponent) {
      t = this.GetItem(8);
      this.SwitchComponent = new BattleSkillSwitchComponent_1.BattleSkillSwitchComponent();
      this.SwitchComponent.CreateByResourceIdAsync("UiItem_BattleSkillSwitchItem", t);
    }
    return this.SwitchComponent;
  }
  get GetLongPressComponent() {
    var t;
    if (!this.LongPressComponent) {
      t = this.GetItem(8);
      this.LongPressComponent = new BattleSkillLongPressItem_1.BattleSkillLongPressItem();
      this.LongPressComponent.CreateByResourceIdAsync("UiItem_BattleSkillLongPressItem", t);
    }
    return this.LongPressComponent;
  }
  get GetConfigLongPressComponent() {
    var t;
    if (!this.ConfigLongPressComponent) {
      t = this.GetItem(8);
      this.ConfigLongPressComponent = new BattleSkillConfigLongPressItem_1.BattleSkillConfigLongPressItem();
      this.ConfigLongPressComponent.CreateByResourceIdAsync("UiItem_BattleSkillLongPressItem", t);
    }
    return this.ConfigLongPressComponent;
  }
  GetExtraContainer() {
    return this.GetItem(8);
  }
  GetPointEventButton() {
    return this.ait;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText], [3, UE.UISprite], [4, UE.UITexture], [5, UE.UIButtonComponent], [6, UE.UINiagara], [7, UE.UINiagara], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UINiagara], [11, UE.UIText], [12, UE.UINiagara]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([13, UE.UISprite]);
      this.ComponentRegisterInfos.push([14, UE.UIItem]);
    }
  }
  Initialize(t) {
    super.Initialize();
    this.Eit = t;
    this.ait = this.GetButton(5);
    this.lit = this.GetItem(0);
    this.CoolDownUiText = this.GetText(2);
    this.uit = this.GetSprite(1);
    this.Lit = this.GetTexture(4);
    this.Dit = this.GetSprite(3);
    this.Rit = this.Lit.GetOwner().GetComponentByClass(UE.UITextureTransitionComponent.StaticClass());
    this.Uit = this.Dit.GetOwner().GetComponentByClass(UE.UISpriteTransition.StaticClass());
    this.Ait = this.Lit.GetTexture();
    this.Pit = this.Dit.GetSprite();
    this.xit = true;
    this.wit = true;
    this.SkillNameText = this.GetText(11);
    this.ClickEffect = new BattleUiNiagaraItem_1.BattleUiNiagaraItem(this.GetUiNiagara(10));
    this.GetUiNiagara(6).SetNiagaraUIActive(false, false);
    this.GetUiNiagara(7).SetNiagaraUIActive(false, true);
    this.AddEvents();
  }
  async InitializeAsync() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      this.CombinePressTipSprite = this.GetSprite(13);
      t = this.GetItem(14);
      this.KeyItem = new InputMultiKeyItem_1.InputMultiKeyItem(true);
      this.sit = this.RootItem.GetParentAsUIItem();
      await this.KeyItem.CreateByActorAsync(t.GetOwner());
    }
  }
  Refresh(t) {
    if (this.SkillButtonData !== t) {
      this.TryReleaseButton();
      this.ClickEffect?.Stop();
      this.ExtraEffectComponent?.Stop();
    }
    if (t && (this.SkillButtonData = t, this.InitVehicleHandle(), this.RefreshVisible(), this.RefreshSkillIcon(), this.RefreshSkillName(), this.RefreshCdCompletedEffect(), this.RefreshDynamicEffect(), this.RefreshKey(), this.RefreshTimeDilation(), this.RefreshSkillCoolDown(), this.RefreshLimitCount(true), this.RefreshAttribute(false), this.Fit() && this.RefreshEquipExplore(), this.RefreshSkillButtonLongPress(), this.RefreshConfigLongPress(), this.Qel)) {
      this.RefreshLinkStatus(this.ZKa);
    }
  }
  Deactivate() {
    this.TryReleaseButton();
    this.ResetSkillCoolDown();
    this.Vit();
    this.jit();
    this.SkillButtonData = undefined;
    this.SetTextureHandleId = 0;
    this.OnCoolDownFinishedCallback = undefined;
    this.KeyItem?.SetActive(false);
    this.KeyItem?.ResetLongPress();
    this.KeyActionName = undefined;
    this.KeyOperationType = undefined;
    this.PressActionType = InputEnums_1.EInputAction.None;
    this.ClickEffect.Stop();
    this.ZKa = 0;
    this.CancelLoadDynamicEffectNiagara();
    this.CancelLoadCdCompletedNiagara();
    this.HideAndClearSkillSprite("休眠技能按钮");
    this.HideAndClearSkillTexture();
    this.Mit = undefined;
    if (this.vit !== 0 || this.zQ_ !== undefined) {
      this.GetUiNiagara(7)?.ResetOverrideParameters();
      this.vit = 0;
      this.zQ_ = undefined;
    }
    if (this.UltraComponent) {
      this.UltraComponent.Destroy();
      this.UltraComponent = undefined;
    }
    if (this.NumComponent) {
      this.NumComponent.Destroy();
      this.NumComponent = undefined;
    }
    if (this.SwitchComponent) {
      this.SwitchComponent.Destroy();
      this.SwitchComponent = undefined;
    }
    if (this.LongPressComponent) {
      this.LongPressComponent.Destroy();
      this.LongPressComponent = undefined;
    }
    if (this.ExtraEffectComponent) {
      this.ExtraEffectComponent.Stop();
      this.ExtraEffectComponent.Destroy();
      this.ExtraEffectComponent = undefined;
    }
    this.OnRefreshVisible(false);
    this.OnDeactivate();
  }
  OnShowBattleChildView() {
    this.sit?.SetUIActive(true);
  }
  OnHideBattleChildView() {
    this.sit?.SetUIActive(false);
  }
  UpdateAlpha() {
    this.Git = this.RootItem.GetAlpha();
    if (this.Git > this.qit) {
      this.RootItem.SetAlpha(this.qit);
    } else {
      this.qit = this.Git;
    }
  }
  Reset() {
    this.RemoveEvents();
    this.Deactivate();
    this.ait = undefined;
    this.KeyItem = undefined;
    this.ClickEffect = undefined;
    this.Mit = undefined;
    this.AlphaTweenComp = undefined;
    this.Lit = undefined;
    this.Dit = undefined;
    this.Rit = undefined;
    this.Uit = undefined;
    this.Ait = undefined;
    this.Pit = undefined;
    this.uim = undefined;
    super.Reset();
  }
  Tick(t) {
    this.Wit(t);
    this.ConfigLongPressComponent?.Tick(t);
  }
  AddEvents() {
    if (!this.fit) {
      this.GetPointEventButton().OnPointDownCallBack.Bind(() => {
        this.OnSkillButtonPressed();
      });
      this.GetPointEventButton().OnPointUpCallBack.Bind(() => {
        this.OnSkillButtonReleased();
      });
      this.GetPointEventButton().OnPointCancelCallBack.Bind(() => {
        this.OnSkillButtonCancel();
      });
      this.DraggableComponent = this.GetPointEventButton().GetOwner().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
      InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.OnTouch);
      if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInBattleLink()) {
        this.Qel = true;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleLinkStatusChanged, this.OnBattleLinkStatusChanged);
      }
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.OnSelfCenteredMode);
      this.fit = true;
    }
  }
  RemoveEvents() {
    if (this.fit) {
      if (this.GetPointEventButton()) {
        this.GetPointEventButton().OnPointDownCallBack.Unbind();
        this.GetPointEventButton().OnPointUpCallBack.Unbind();
        this.GetPointEventButton().OnPointCancelCallBack.Unbind();
      }
      InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.OnTouch);
      if (this.Qel) {
        this.Qel = false;
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleLinkStatusChanged, this.OnBattleLinkStatusChanged);
      }
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.OnSelfCenteredMode);
      this.fit = false;
    }
  }
  RefreshLinkStatus(t) {
    var i;
    var t = t ?? this.ZKa;
    this.ZKa = t;
    if (this.SkillButtonData) {
      if ((i = this.SkillButtonData.GetActionType()) !== InputEnums_1.EInputAction.大招 && i !== InputEnums_1.EInputAction.技能1 && i !== InputEnums_1.EInputAction.攻击 && i !== InputEnums_1.EInputAction.幻象2) {
        if (this.bQ1) {
          this.GetUiNiagara(12).SetNiagaraUIActive(false, true);
          this.bQ1 = false;
        }
      } else {
        if (i === InputEnums_1.EInputAction.大招) {
          this._ot(t !== 4, 1);
        }
        if (t === 4) {
          this.GetUiNiagara(12).SetNiagaraUIActive(true, true);
          this.bQ1 = true;
        } else {
          this.GetUiNiagara(12).SetNiagaraUIActive(false, true);
          this.bQ1 = false;
        }
      }
    }
  }
  OnSkillButtonPressed() {
    var t;
    var i;
    if (this.SkillButtonData && (this.SkillButtonData.IsEnableInput() && this.qit !== 0 && (t = this.SkillButtonData.GetActionType(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SkillButton]当技能按钮按下时", ["inputActionType", t]), this.OnInputAction(), this.PressActionType = t, Info_1.Info.OperationType === 1 ? (i = this.SkillButtonData.GetInputAction(), InputDistributeController_1.InputDistributeController.InputAction(i, true)) : (i = t, InputController_1.InputController.InputAction(i, 1))), this.IsNeedLongPress())) {
      let t = this.SkillButtonData.GetLongPressTime();
      if (t <= 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "重新获取技能按钮长按时长", ["inputActionType", this.SkillButtonData.GetActionType()]);
        }
        this.SkillButtonData.RefreshLongPressTime();
        t = this.SkillButtonData.GetLongPressTime();
      }
      if (!(t <= 0)) {
        this.git = TimerSystem_1.TimerSystem.Delay(this.Oit, t * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
    }
  }
  IsNeedLongPress() {
    return this.SkillButtonData.GetIsLongPressControlCamera();
  }
  OnSkillButtonReleased() {
    var t;
    var i;
    if (this.SkillButtonData) {
      if (this.PressActionType !== InputEnums_1.EInputAction.None) {
        t = this.SkillButtonData.GetActionType();
        if (this.PressActionType === t) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "[SkillButton]当技能按钮抬起时", ["inputActionType", t]);
          }
          if (Info_1.Info.OperationType === 1) {
            i = this.SkillButtonData.GetInputAction();
            InputDistributeController_1.InputDistributeController.InputAction(i, false);
          } else {
            InputController_1.InputController.InputAction(t, 2);
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "[SkillButton]当技能按钮抬起时,技能按钮对应的ActionType已经变化，会执行按下时候的Action抬起", ["inputActionType", t], ["PressActionType", this.PressActionType]);
          }
          if (Info_1.Info.OperationType === 1) {
            InputDistributeController_1.InputDistributeController.InputAction(InputEnums_1.EInputAction[this.PressActionType], false);
          } else {
            InputController_1.InputController.InputAction(this.PressActionType, 2);
          }
        }
      }
      this.PressActionType = InputEnums_1.EInputAction.None;
      this.Vit();
      this.IsLongPress = false;
    }
  }
  OnSkillButtonCancel() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[SkillButton]当技能按钮取消时,执行抬起流程", ["inputActionType", this.SkillButtonData?.GetActionType()]);
    }
    this.OnSkillButtonReleased();
  }
  TryReleaseButton() {
    if (this.PressActionType !== InputEnums_1.EInputAction.None) {
      this.OnSkillButtonReleased();
    }
  }
  OnLongPressButton() {}
  SetSkillIcon(i) {
    if (!StringUtils_1.StringUtils.IsEmpty(i) && this.Mit !== i) {
      if (this.SetTextureHandleId !== 0) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SetTextureHandleId);
      }
      this.Bit = true;
      const s = this.Lit;
      const e = this.Dit;
      this.Mit = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "技能图标加载开始", ["", this.Eit], ["", i]);
      }
      if (this.CheckSkillIconIsTexture(i)) {
        if (e) {
          this.HideAndClearSkillSprite("资源类型是Texture");
        }
        this.SetTextureHandleId = ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.Texture, t => {
          this.Bit = false;
          if (s && this.Mit === i) {
            if (t) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 17, "技能图标加载成功", ["", this.Eit], ["", i]);
              }
              this.ShowAndSetSkillTexture(t);
            } else {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 17, "技能图标加载完成，但是资源为空", ["", this.Eit], ["", i]);
              }
              this.HideAndClearSkillTexture();
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "技能图标加载完成, 但是已过期", ["", this.Eit], ["", i]);
          }
        }, 103);
        this.Mit = i;
        if (this.Bit) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "技能图标加载中，隐藏图片", ["", this.Eit], ["", i]);
          }
          s.SetUIActive(false);
        }
      } else {
        this.HideAndClearSkillTexture();
        this.SetTextureHandleId = ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LGUISpriteData_BaseObject, t => {
          this.Bit = false;
          if (e && this.Mit === i) {
            if (t) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 17, "技能图标加载成功", ["", this.Eit], ["", i]);
              }
              this.ShowAndSetSkillSprite(t);
            } else {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 17, "技能图标加载完成，但是资源为空", ["", this.Eit], ["", i]);
              }
              this.HideAndClearSkillSprite("技能图标加载资源失败");
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "技能图标加载完成, 但是已过期", ["", this.Eit], ["", i]);
          }
        }, 103);
        if (this.Bit) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "技能图标隐藏Sprite, 加载中", ["", this.Eit], ["", i]);
          }
          e.SetUIActive(false);
        }
      }
    }
  }
  CheckSkillIconIsTexture(t) {
    return t.search("Image/") > 0;
  }
  HideAndClearSkillTexture() {
    if (this.Lit) {
      if (!this.xit) {
        this.Lit.SetTexture(this.Ait);
        this.Rit?.SetAllStateTexture(this.Ait);
        this.xit = true;
      }
      this.Lit.SetUIActive(false);
    }
  }
  ShowAndSetSkillTexture(t) {
    this.Lit.SetTexture(t);
    this.Rit?.SetAllStateTexture(t);
    this.xit = false;
    this.Lit.SetUIActive(true);
  }
  HideAndClearSkillSprite(t) {
    if (this.Dit && (this.wit || (this.Dit.SetSprite(this.Pit), this.Uit?.SetAllTransitionSprite(this.Pit), this.wit = true), this.Dit.SetUIActive(false), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Battle", 17, "技能图标隐藏Sprite", ["", this.Eit], ["", t], ["", this.Mit]);
    }
  }
  ShowAndSetSkillSprite(t) {
    this.Dit.SetSprite(t);
    this.Uit?.SetAllTransitionSprite(t);
    this.wit = false;
    this.Dit.SetUIActive(true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "技能图标显示Sprite", ["", this.Eit], ["", this.Mit]);
    }
  }
  RefreshSkillIcon() {
    if (this.SkillButtonData) {
      if (this.SkillButtonData.IsMultiStageSkill()) {
        const t = this.SkillButtonData.GetMultiSkillTexturePath();
        this.SetSkillIcon(t);
      } else {
        const t = this.SkillButtonData.GetSkillTexturePath();
        this.SetSkillIcon(t);
      }
    }
  }
  RefreshSkillName() {
    var t;
    var i = this.SkillButtonData?.GetSkillId();
    if (i) {
      t = this.SkillButtonData.GetSkillIconName();
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        if (i = ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillNameBySkillId(i)) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.SkillNameText, i);
          this.SkillNameText.SetUIActive(true);
        } else {
          this.SkillNameText.SetUIActive(false);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.SkillNameText, t);
        this.SkillNameText.SetUIActive(true);
      }
    } else {
      this.SkillNameText.SetUIActive(false);
    }
  }
  SetSkillItemEnable(t, i = false) {
    if (this.ait && (i || this.ait.GetSelfInteractive() !== t)) {
      this.ait.SetSelfInteractive(t);
    }
  }
  RefreshKey() {
    var t;
    var i = Info_1.Info.OperationType;
    if (i === 2) {
      t = this.SkillButtonData.GetActionName();
      if (this.KeyActionName === t && this.KeyOperationType === i) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[KeyItem]刷新技能按钮按键图标时，平台和行为名称与上一次刷新一致，因此不刷新", ["actionName", t], ["operationType", i]);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[KeyItem]刷新技能按钮按键图标", ["actionName", t]);
        }
        if (this.KeyItem) {
          this.KeyItem.RefreshByActionOrAxis({
            ActionOrAxisName: t
          });
          this.KeyItem.SetActive(true);
        }
        this.KeyOperationType = i;
        this.KeyActionName = t;
      }
    }
  }
  PauseGame(t) {
    if (t === 1) {
      if (TimerSystem_1.TimerSystem.Has(this.hit) && !TimerSystem_1.TimerSystem.IsPause(this.hit)) {
        TimerSystem_1.TimerSystem.Pause(this.hit);
      }
      if (TimerSystem_1.TimerSystem.Has(this.yit) && !TimerSystem_1.TimerSystem.IsPause(this.yit)) {
        TimerSystem_1.TimerSystem.Pause(this.yit);
      }
    } else if (t === 0 && (TimerSystem_1.TimerSystem.Has(this.hit) && TimerSystem_1.TimerSystem.IsPause(this.hit) && TimerSystem_1.TimerSystem.Resume(this.hit), TimerSystem_1.TimerSystem.Has(this.yit)) && TimerSystem_1.TimerSystem.IsPause(this.yit)) {
      TimerSystem_1.TimerSystem.Resume(this.yit);
    }
  }
  RefreshSkillCoolDownOnShow() {
    if (!(this.cit <= 0) && !(this.mit <= 0) && !!this.uit) {
      this.RefreshSkillCoolDown();
    }
  }
  RefreshSkillCoolDown() {
    if (this.SkillButtonData) {
      if (this.SkillButtonData.TotalCoolDownCustom > 0) {
        this.RefreshLimitCount(true);
        this.PlaySkillCd(this.SkillButtonData.GetRemainingCoolDownCustom(), this.SkillButtonData.TotalCoolDownCustom, this.SkillButtonData.HideCoolDownTextCustom);
      } else if ((!this.Kit() || !this.Qit()) && (!this.Xit() || !this.$it()) && (!this.SkillButtonData.IsMultiStageSkill() || !this.TryRefreshMultiSkillCoolDown())) {
        if (this.V6l() && this.j6l()) {
          this.RefreshLimitCount();
        } else {
          this.RefreshLimitCount();
          this.Yit();
        }
      }
      this.RefreshEnable();
    }
  }
  TryRefreshMultiSkillCoolDown() {
    var t;
    var i;
    var s = this.SkillButtonData.GetMultiSkillInfo();
    return !!s && s.NextSkillId !== 0 && !(t = s.RemainingStartTime, i = s.StartTime, t > 0 ? this.PlaySkillCd(t, i) : this.PlaySkillCd(s.RemainingStopTime, s.StopTime - i, true), 0);
  }
  Yit() {
    var t;
    var i = this.SkillButtonData.GetGroupSkillCdInfo();
    if (i) {
      if (this.IsHideNumComp && i.RemainingCount > 0) {
        this.PlaySkillCd(0, 0);
      } else {
        t = i.CurRemainingCd;
        i = i.CurMaxCd;
        this.PlaySkillCd(t, i);
      }
    } else if (!this.SkillButtonData.HasCdComponent()) {
      this.PlaySkillCd(0, 0);
    }
  }
  PlaySkillCd(t, i, s = false) {
    BattleSkillItem.zit.Start();
    this.HideCdText = s;
    if (t > 0 && i > 0) {
      if (this.SkillButtonData.IsCdVisible()) {
        this.Zit(t, i);
      } else {
        this.eot(t);
      }
    } else {
      this.FinishSkillCoolDown();
    }
    BattleSkillItem.zit.Stop();
  }
  Zit(t, i, s) {
    const e = this.SkillButtonData?.GetSkillId();
    if (this.HasListenAttribute()) {
      this.tot(true, undefined, true);
    }
    this.PlaySkillTimeDown(t, i, () => {
      if (this.SkillButtonData.IsMultiStageSkill()) {
        this.TryRefreshMultiSkillCoolDown();
      }
      var t = e === this.SkillButtonData?.GetSkillId();
      this.SkillButtonData.RefreshIsEnable();
      if (this.HasListenAttribute()) {
        this.oot(false);
        this.tot(t, undefined, false);
      } else if (t) {
        this.rot();
      }
      if (this.SkillButtonData.IsVehicleSkillInCd()) {
        this.j6l();
      }
      s?.();
    });
  }
  eot(t) {
    this.ResetSkillCoolDown();
    this.yit = TimerSystem_1.TimerSystem.Delay(() => {
      this.SkillButtonData.RefreshIsEnable();
      this.FinishSkillCoolDown();
    }, t * TimeUtil_1.TimeUtil.InverseMillisecond);
    this.not(this.yit);
  }
  rot() {
    var t;
    if (!!this.SkillButtonData && !(this.SkillButtonData.GetCdCompletedEffectId() < 0)) {
      if (this.qit !== 0) {
        if (!(t = this.GetUiNiagara(6)).bIsUIActive) {
          t.SetUIActive(true);
        }
        t.ActivateSystem(true);
      }
    }
  }
  PlaySkillTimeDown(t, i, s) {
    this.sot();
    if (t <= (this.cit = 0)) {
      this.lit.SetUIActive(false);
    } else {
      this.cit = t;
      this.mit = i;
      this.dit = Time_1.Time.FlowTime * TimeUtil_1.TimeUtil.Millisecond - (i - t);
      this.OnCoolDownFinishedCallback = s;
      if (this.HideCdText) {
        this.CoolDownUiText.SetText("");
      } else {
        this.CoolDownUiText.SetText(this.cit.toFixed(this.CdFixedPoint));
      }
      this.hit = TimerSystem_1.TimerSystem.Forever(this.kit, BattleUiDefine_1.SKILL_COOLDOWN_INTERVAL);
      this.not(this.hit);
      this.lit.SetUIActive(true);
      if (SkillCdController_1.SkillCdController.IsPause()) {
        this.uit?.SetFillAmount((i - t) / i);
      }
    }
  }
  FinishSkillCoolDown() {
    var t;
    this.ResetSkillCoolDown();
    if (this.OnCoolDownFinishedCallback) {
      t = this.OnCoolDownFinishedCallback;
      this.OnCoolDownFinishedCallback = undefined;
      t();
    }
  }
  Wit(t) {
    var i;
    if (!(this.cit <= 0) && !(this.mit <= 0) && !!this.uit) {
      i = (Time_1.Time.FlowTime * TimeUtil_1.TimeUtil.Millisecond - this.dit) / this.mit;
      this.uit.SetFillAmount(i);
    }
  }
  ResetSkillCoolDown() {
    this.lit.SetUIActive(false);
    this.sot();
    this.cit = 0;
  }
  sot() {
    if (TimerSystem_1.TimerSystem.Has(this.hit)) {
      TimerSystem_1.TimerSystem.Remove(this.hit);
    }
    if (TimerSystem_1.TimerSystem.Has(this.yit)) {
      TimerSystem_1.TimerSystem.Remove(this.yit);
    }
  }
  RefreshEnable(t = false) {
    var i;
    if (this.SkillButtonData) {
      i = this.aot();
      this.SetSkillItemEnable(i, t);
    }
  }
  DisableButton() {
    this.SetSkillItemEnable(false, true);
  }
  RefreshVisible() {
    var t;
    if (this.RootItem?.IsValid() && ((t = this.IsVisible()) !== this.RootItem.bIsUIActive || this.sit && t !== this.sit.bIsUIActive)) {
      this.OnRefreshVisible(t);
    }
  }
  OnRefreshVisible(t) {
    if (t) {
      if (!this.IsShowOrShowing) {
        this.Show();
        this.RefreshEnable(true);
        this.uim?.();
      }
    } else if (!this.IsHideOrHiding) {
      this.TryReleaseButton();
      this.Hide();
      this.uim?.();
    }
  }
  GetGuideItem() {
    if (!this.IsCreateOrCreating) {
      let t = this.GetTexture(4);
      if (t === undefined) {
        return undefined;
      } else if (ObjectUtils_1.ObjectUtils.IsValid(t) && t.IsUIActiveInHierarchy() || (t = this.GetSprite(3)) !== undefined) {
        return [this.RootItem, t];
      } else {
        return undefined;
      }
    }
  }
  RefreshCdCompletedEffect() {
    var t;
    if (!!this.SkillButtonData && !(this.SkillButtonData.GetCdCompletedEffectId() <= 0) && !(this.SkillButtonData.AttributeId > 0)) {
      if (t = this.SkillButtonData.GetCdCompletedEffectConfig()) {
        t = t.NiagaraPath;
        if (!StringUtils_1.StringUtils.IsEmpty(t) && (!!StringUtils_1.StringUtils.IsEmpty(this.pit) || this.pit !== t)) {
          this.CancelLoadCdCompletedNiagara();
          this.Tit = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, t => {
            if (t?.IsValid()) {
              this.GetUiNiagara(6)?.SetNiagaraSystem(t);
            }
          });
          this.pit = t;
        }
      }
    }
  }
  CancelLoadCdCompletedNiagara() {
    if (this.Tit) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Tit);
      this.Tit = undefined;
    }
  }
  GetDynamicEffectConfig() {
    if (this.SkillButtonData) {
      return this.SkillButtonData.GetDynamicEffectConfig();
    }
  }
  GetDynamicEffectPath(t) {
    t = t.NiagaraPath;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      return t;
    }
  }
  CancelLoadDynamicEffectNiagara() {
    if (this.Ktt) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ktt);
      this.Ktt = undefined;
      this.Wtt = undefined;
    }
  }
  RefreshDynamicEffect() {
    var t = this.GetDynamicEffectConfig();
    let i = undefined;
    if (t) {
      i = this.GetDynamicEffectPath(t);
    }
    this.RefreshDynamicEffectScale(t);
    if (this.jtt === i) {
      if (!this.Wtt) {
        this.JQ_(t, true);
      }
    } else {
      this.CancelLoadDynamicEffectNiagara();
      this.jtt = i;
      if (this.jtt) {
        this.Wtt = this.jtt;
        this.Ktt = ResourceSystem_1.ResourceSystem.LoadAsync(this.Wtt, UE.NiagaraSystem, t => {
          var i;
          this.Wtt = undefined;
          if (t?.IsValid() && (i = this.GetUiNiagara(7))) {
            i.SetNiagaraSystem(t);
            i = this.GetDynamicEffectConfig();
            this.JQ_(i);
            this.SetDynamicEffectVisible(true);
          }
        });
      } else {
        this.SetDynamicEffectVisible(false);
      }
    }
  }
  JQ_(i, s = false) {
    if (i && (i.ElementId !== this.vit || i.Color !== this.zQ_)) {
      let t = undefined;
      this.zQ_ = i.Color;
      if (StringUtils_1.StringUtils.IsEmpty(this.zQ_)) {
        this.vit = i.ElementId;
        if (this.vit > 0) {
          i = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(this.vit);
          t = new UE.LinearColor(UE.Color.FromHex(i.SkillEffectColor));
        }
      } else {
        this.vit = 0;
        t = new UE.LinearColor(UE.Color.FromHex(this.zQ_));
      }
      i = this.GetUiNiagara(7);
      if (t) {
        i.SetNiagaraVarLinearColor("Color", t);
      } else {
        i.ResetOverrideParameters();
        if (s && i.NiagaraComponent) {
          i.NiagaraComponent.ResetOverrideParametersAndActivate();
        }
      }
    }
  }
  RefreshDynamicEffectScale(t) {
    t = t?.Scale ?? 1;
    if (this.Mem !== t) {
      this.Mem = t;
      this.GetUiNiagara(7)?.SetUIItemScale(t === 1 ? Vector_1.Vector.OneVector : new UE.Vector(t, t, t));
    }
  }
  SetDynamicEffectVisible(t) {
    var i = this.GetUiNiagara(7);
    if (i) {
      if (t) {
        if (!i.bIsUIActive) {
          i.SetUIActive(true);
        }
        i.ActivateSystem(true);
      } else if (i.bIsUIActive) {
        i.SetUIActive(false);
      }
    }
  }
  RefreshTimeDilation() {
    this.hot(this.lot());
  }
  lot() {
    if (SkillCdController_1.SkillCdController.IsPause()) {
      return 0;
    } else {
      return Time_1.Time.TimeDilation;
    }
  }
  not(t) {
    var i = this.lot() * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
    if (i != 1) {
      if (i > 0) {
        TimerSystem_1.TimerSystem.ChangeDilation(t, i);
      } else {
        TimerSystem_1.TimerSystem.Pause(t);
      }
    }
  }
  hot(t) {
    if (TimerSystem_1.TimerSystem.Has(this.hit)) {
      if (t > 0) {
        if (TimerSystem_1.TimerSystem.IsPause(this.hit)) {
          TimerSystem_1.TimerSystem.Resume(this.hit);
        }
        TimerSystem_1.TimerSystem.ChangeDilation(this.hit, t * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      } else if (!TimerSystem_1.TimerSystem.IsPause(this.hit)) {
        TimerSystem_1.TimerSystem.Pause(this.hit);
      }
    }
    if (TimerSystem_1.TimerSystem.Has(this.yit)) {
      if (t > 0) {
        if (TimerSystem_1.TimerSystem.IsPause(this.yit)) {
          TimerSystem_1.TimerSystem.Resume(this.yit);
        }
        TimerSystem_1.TimerSystem.ChangeDilation(this.yit, t);
      } else if (!TimerSystem_1.TimerSystem.IsPause(this.yit)) {
        TimerSystem_1.TimerSystem.Pause(this.yit);
      }
    }
  }
  Vit() {
    if (this.git && TimerSystem_1.TimerSystem.Has(this.git)) {
      TimerSystem_1.TimerSystem.Remove(this.git);
      this.git = undefined;
    }
  }
  Fit() {
    var t = this.SkillButtonData?.GetButtonType() === 7 && !this.SkillButtonData.HasConfigFollower();
    if (this.SwitchComponent || t) {
      this.GetSwitchComponent.SetComponentActive(t);
    }
    return t;
  }
  RefreshAttribute(t = true) {
    var i = this.HasListenAttribute();
    var s = this.UltraComponent?.Visible;
    if (s !== i && (this._ot(i, 0), s)) {
      this.uot();
    }
    if (i) {
      this.RefreshFrameSprite();
      this.cot();
      this.mot();
      this.oot(t);
    }
    this.RefreshEnable();
  }
  _ot(t, i) {
    this.UltraComponentVisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.UltraComponentVisibleState, t, i);
    t = VisibleStateUtil_1.VisibleStateUtil.GetVisible(this.UltraComponentVisibleState);
    if (this.UltraComponent || t) {
      this.GetUltraComponent.SetComponentActive(t);
    }
  }
  RefreshFrameSprite() {
    var t;
    if (this.HasListenAttribute()) {
      t = this.SkillButtonData.GetFrameSpriteColor();
      this.GetUltraComponent.SetFrameSprite(t);
    }
  }
  oot(t = true) {
    var i = this.SkillButtonData.GetAttribute();
    var s = this.SkillButtonData.GetMaxAttribute();
    if (s === 0) {
      this.SetEnergyPercent(1, t);
      this.tot(t, false, undefined);
    } else {
      this.SetEnergyPercent(i / s, t);
      this.tot(t, i < s, undefined);
    }
  }
  tot(t, i, s) {
    let e = i;
    let h = s;
    if (!e && !h) {
      if (i === undefined) {
        s = this.SkillButtonData.GetAttribute();
        i = this.SkillButtonData.GetMaxAttribute();
        e = s < i;
      }
      if (h === undefined) {
        h = this.SkillButtonData.GetSkillRemainingCoolDown() > 0;
      }
    }
    s = !e && !h;
    this.SetMaxEnergyEffectEnable(s);
    if (t) {
      this.dot(s);
    }
  }
  Kit() {
    return this.SkillButtonData?.GetButtonType() === 7 && this.SkillButtonData.IsSkillInItemUseBuffCd();
  }
  Qit() {
    var [t, i] = this.SkillButtonData.GetEquippedItemUsingBuffCd();
    return t > 0 && (this.Zit(t, i, () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeSelectedExploreId);
      this.RefreshEnable();
    }), true);
  }
  Xit() {
    return this.SkillButtonData?.GetButtonType() === 7 && this.SkillButtonData.IsSkillInItemUseSkillCd();
  }
  $it() {
    var [t, i] = this.SkillButtonData.GetEquippedItemUsingSkillCd();
    return t > 0 && (this.Zit(t, i, () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeSelectedExploreId);
      this.RefreshEnable();
    }), true);
  }
  V6l() {
    return this.SkillButtonData?.GetButtonType() === 5 && this.SkillButtonData.IsVehicleSkillInCd();
  }
  j6l() {
    var [t, i] = this.SkillButtonData.GetVehicleSkillCd();
    return t > 0 && (this.Zit(t, i, () => {
      this.RefreshEnable();
    }), true);
  }
  RefreshEquipExplore() {
    const t = this.GetItem(9);
    var i;
    var s;
    var e;
    if (t.IsUIActiveSelf()) {
      t.SetUIActive(false);
    }
    if (this.SkillButtonData.GetExploreSkillChange()) {
      t.SetUIActive(true);
      this.SkillButtonData.SetExploreSkillChange(false);
      this.jit();
      this.Iit = TimerSystem_1.TimerSystem.Delay(() => {
        this.Iit = undefined;
        t.SetUIActive(false);
      }, EQUIP_EFFECT_TIME);
    }
    this.GetSwitchComponent.RefreshSwitch();
    if (this.SkillButtonData?.IsExploreAsFight || this.SkillButtonData?.IsSkillIdChangeByTag()) {
      this.GetSwitchComponent.UpdateNumPanel(false);
      this.GetSwitchComponent.UpdatePointPanel(false);
    } else {
      if (i = ModelManager_1.ModelManager.RouletteModel.IsExploreSkillHasNum()) {
        s = ModelManager_1.ModelManager.RouletteModel.GetExploreSkillShowNum();
        this.GetSwitchComponent.UpdateNumPanel(i, s);
      } else {
        this.GetSwitchComponent.UpdateNumPanel(i);
      }
      s = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
      if (i = ModelManager_1.ModelManager.RouletteModel.IsExploreSkillHasSetNum(s)) {
        [s, e] = ModelManager_1.ModelManager.RouletteModel.GetExploreSkillShowSetNumById(s);
        this.GetSwitchComponent.UpdatePointPanel(i, e, s);
      } else {
        this.GetSwitchComponent.UpdatePointPanel(i);
      }
    }
  }
  jit() {
    if (this.Iit) {
      TimerSystem_1.TimerSystem.Remove(this.Iit);
      this.Iit = undefined;
    }
  }
  SetMaxEnergyEffectEnable(t) {
    this.GetUltraComponent.SetUltraEffectEnable(t);
  }
  Cot(t) {}
  got(t) {
    this.GetUltraComponent.SetUltraUpEffectEnable(t);
  }
  SetEnergyPercent(t, i) {
    this.GetUltraComponent.SetBarPercent(t, i);
  }
  dot(t) {
    if (this.Cit !== t) {
      if (this.Cit = t) {
        this.fot();
      } else {
        this.uot();
      }
    }
  }
  fot() {
    this.Cot(true);
  }
  uot() {
    if (this.UltraComponent) {
      this.Cot(false);
      this.SetMaxEnergyEffectEnable(false);
      this.got(false);
    }
  }
  cot() {
    var t;
    if (this.HasListenAttribute()) {
      t = this.SkillButtonData.GetMaxAttributeEffectPath();
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        this.GetUltraComponent.RefreshUltraEffect(t, this.SkillButtonData.GetMaxAttributeColor());
      }
      if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()) {
        this.GetUltraComponent.RefreshUltraDynamicEffect(BattleLinkDefine_1.SKILL_BUTTON_EFFECT_PATH);
      } else {
        this.GetUltraComponent.StopUltraDynamicEffect();
      }
    }
  }
  mot() {
    var t;
    if (!!this.SkillButtonData && !(this.SkillButtonData.GetMaxAttributeBurstEffectId() <= 0)) {
      if (t = this.SkillButtonData.GetMaxAttributeBurstEffectConfig()) {
        t = t.NiagaraPath;
        if (!StringUtils_1.StringUtils.IsEmpty(t)) {
          this.GetUltraComponent.RefreshUltraTipsEffect(t);
        }
      }
    }
  }
  SetLimitUseSkillCount(t) {
    this.GetNumComponent?.SetRemainingCount(t);
  }
  RefreshLimitCount(s = false) {
    if (this.SkillButtonData) {
      let t = false;
      let i = 0;
      if (this.SkillButtonData.IsLimitCountCustom) {
        t = true;
        i = this.SkillButtonData.RemainingCountCustom;
      } else if (this.SkillButtonData.IsLimitCountVehicleSkill) {
        t = true;
        i = this.SkillButtonData.RemainingCountVehicleSkill;
      } else {
        e = this.SkillButtonData.GetGroupSkillCdInfo();
        if (t = e !== undefined && e.LimitCount > 1) {
          i = e.RemainingCount;
        }
      }
      var e = this.NumComponent?.TargetActive ?? false;
      if ((e !== t || !!s) && (!!this.NumComponent || !!t)) {
        this.GetNumComponent?.SetComponentActive(t);
      }
      if (t) {
        this.SetLimitUseSkillCount(i);
      }
    }
  }
  RefreshSkillButtonLongPress() {
    var t;
    var i;
    if (this.SkillButtonData) {
      if (((t = this.SkillButtonData.GetButtonType()) === 1 || t === 6) && (t = this.SkillButtonData.IsShowLongPress())) {
        (i = this.GetLongPressComponent).SetComponentActive(t);
        i.SetAction(this.SkillButtonData.GetActionType());
        this.SkillButtonData.RefreshLongPressDuration();
        i.SetDuration(this.SkillButtonData.GetLongPressDuration());
        if (this.SkillButtonData.GetIsLongPressing()) {
          i.StartProgress();
        }
      } else {
        this.LongPressComponent?.SetComponentActive(false);
      }
    }
  }
  InitVehicleHandle() {
    this.SkillButtonData?.InitVehicleHandle();
  }
  RefreshConfigLongPress() {
    var t;
    if (this.SkillButtonData) {
      if (this.SkillButtonData.GetIsConfigShowLongPress()) {
        (t = this.GetConfigLongPressComponent).SetComponentActive(true);
        t.SetAction(this.SkillButtonData.GetActionType());
        t.SetDuration(this.SkillButtonData.GetLongPressTime());
      } else {
        this.ConfigLongPressComponent?.SetComponentActive(false);
      }
    }
  }
  RefreshExtraEffect() {
    if (this.SkillButtonData) {
      var t = this.SkillButtonData.GetFormationData();
      if (t && t.ExtraEffect !== 0) {
        if (this.ExtraEffectComponent) {
          if (this.ExtraEffectComponent.GetEffectType() === t.ExtraEffect) {
            this.ExtraEffectComponent.SetComponentActive(true);
            this.ExtraEffectComponent.Refresh(t.ExtraEffectDuration);
            return;
          }
          this.ExtraEffectComponent.Destroy();
          this.ExtraEffectComponent = undefined;
        }
        if (t.ExtraEffect === 1) {
          this.ExtraEffectComponent = new BattleSkillExtraEffectRhythmItem_1.BattleSkillExtraEffectRhythmItem();
          this.ExtraEffectComponent.Init(this.GetExtraContainer());
          this.ExtraEffectComponent.SetComponentActive(true);
          this.ExtraEffectComponent.Refresh(t.ExtraEffectDuration);
        }
        this.ExtraEffectComponent?.SetEffectType(t.ExtraEffect);
      } else if (this.ExtraEffectComponent) {
        this.ExtraEffectComponent.SetComponentActive(false);
      }
    }
  }
  aot() {
    return !!this.SkillButtonData && this.SkillButtonData.IsEnable();
  }
  IsVisible() {
    return !!this.SkillButtonData && this.SkillButtonData.IsVisible();
  }
  GetAttributeId() {
    return this.SkillButtonData.AttributeId;
  }
  HasListenAttribute() {
    return !!this.SkillButtonData && this.SkillButtonData.HasAttribute();
  }
  GetSkillButtonData() {
    return this.SkillButtonData;
  }
  GetInputIndex() {
    return this.Eit;
  }
  OnInputAction(t = false) {
    if (t || this.SkillButtonData && this.SkillButtonData.IsEnable() && this.SkillButtonData.IsVisible()) {
      this.ClickEffect?.Play();
    }
  }
  SetVisibleByExploreMode(t, i = false) {
    let s = false;
    if (t) {
      this.qit = this.Git;
      s = true;
    } else {
      this.qit = 0;
    }
    if (this.RootItem) {
      this.RootItem.SetRaycastTarget(s);
      this.GetItem(8).SetUIActive(t);
      if (i) {
        if (this.AlphaTweenComp) {
          this.AlphaTweenComp.Stop();
        } else {
          this.AlphaTweenComp = this.RootActor.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
        }
        (t = this.AlphaTweenComp.GetPlayTween()).from = this.RootItem.GetAlpha();
        t.to = this.qit;
        this.AlphaTweenComp.Play();
      } else {
        if (this.AlphaTweenComp) {
          this.AlphaTweenComp.Stop();
        }
        this.RootItem.SetAlpha(this.qit);
      }
    }
  }
  OnDeactivate() {}
  SetOnVisibleChangedCallback(t) {
    this.uim = t;
  }
  SetSkillItemLayout(t) {
    var i;
    if (this.XGu !== t.Index && (this.XGu = t.Index, (i = this.RootItem?.GetParentAsUIItem())?.SetUIParent(t.Item), t.Index === 0)) {
      i?.SetHierarchyIndex(1);
    }
  }
}
(exports.BattleSkillItem = BattleSkillItem).zit = Stats_1.Stat.Create("[SkillButton]PlaySkillCd");
//# sourceMappingURL=BattleSkillItem.js.map