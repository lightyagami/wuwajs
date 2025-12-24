"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorButton = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputController_1 = require("../../../Input/InputController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const BattleSkillItemDynamicEffect_1 = require("./BattleSkillItemDynamicEffect");
const BattleUiNiagaraItem_1 = require("./BattleUiNiagaraItem");
class BehaviorButton extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.tit = undefined;
    this.Mit = "";
    this.frt = undefined;
    this.prt = undefined;
    this.KeyActionName = undefined;
    this.BehaviorType = 101;
    this.Qtt = undefined;
    this.vrt = undefined;
    this.Mrt = undefined;
    this.qit = 1;
    this.Git = 1;
    this.Fnm = undefined;
    this.fWm = undefined;
    this.Ert = () => {
      var t;
      if (this.qit !== 0) {
        if (t = this.tit?.InputAction) {
          this.Srt(t, 1);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton, true, this.BehaviorType);
      }
    };
    this.yrt = () => {
      var t = this.tit?.InputAction;
      if (t) {
        this.Srt(t, 2);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton, false, this.BehaviorType);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UINiagara], [3, UE.UINiagara]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([4, UE.UIItem]);
    }
  }
  Initialize(t) {
    super.Initialize();
    this.Ore();
    this.BehaviorType = t.InputActionType;
    t = this.GetSprite(1);
    this.prt = t.GetOwner().GetComponentByClass(UE.UISpriteTransition.StaticClass());
    this.vrt = new BattleUiNiagaraItem_1.BattleUiNiagaraItem(this.GetUiNiagara(2));
    this.fWm = new BattleSkillItemDynamicEffect_1.BattleSkillItemDynamicEffect(this.GetUiNiagara(3));
  }
  async InitializeAsync() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      t = this.GetItem(4);
      this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(true);
      await this.Qtt.CreateByActorAsync(t.GetOwner());
    }
  }
  OnBeforeDestroy() {
    this.tit = undefined;
    this.Qtt = undefined;
    this.vrt.Stop();
    this.vrt = undefined;
    if (this.frt) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.frt);
      this.frt = undefined;
    }
    this.fWm?.Reset();
    this.fWm = undefined;
    this.kre();
    this.Mrt = undefined;
    this.Fnm = undefined;
  }
  Ore() {
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Bind(this.Ert);
    t.OnPointUpCallBack.Bind(this.yrt);
  }
  kre() {
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Unbind();
    t.OnPointUpCallBack.Unbind();
  }
  UpdateAlpha() {
    this.Git = this.RootItem.GetAlpha();
    if (this.Git > this.qit) {
      this.RootItem.SetAlpha(this.qit);
    } else {
      this.qit = this.Git;
    }
  }
  Refresh(t) {
    this.tit = t;
    this.RefreshVisible();
    this.RefreshEnable(true);
    this.RefreshSkillIcon();
    this.RefreshDynamicEffect();
    this.RefreshKey();
  }
  RefreshAll() {
    if (this.tit) {
      this.Refresh(this.tit);
    }
  }
  Srt(t, i) {
    this.OnInputAction();
    InputController_1.InputController.InputAction(t, i);
  }
  OnInputAction() {
    if (this.qit !== 0) {
      this.vrt?.Play();
    }
  }
  RefreshSkillIcon() {
    var t;
    if (this.tit) {
      t = this.tit.GetSkillTexturePath();
      this.Irt(t);
    }
  }
  Irt(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t) && this.Mit !== t) {
      if (this.frt) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.frt);
      }
      const e = this.GetSprite(1);
      let i = true;
      this.frt = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LGUISpriteData_BaseObject, t => {
        i = false;
        this.frt = undefined;
        if (e && t && (e.SetSprite(t, false), e.bIsUIActive || e.SetUIActive(true), this.prt)) {
          this.prt.SetAllTransitionSprite(t);
        }
      });
      this.Mit = t;
      if (!i) {
        this.frt = undefined;
      }
    }
  }
  RefreshVisible() {
    var t;
    if (this.RootItem?.IsValid() && (t = this.IsVisible()) !== this.RootItem.bIsUIActive) {
      if (t) {
        this.Show();
        this.RefreshEnable(true);
      } else {
        this.Hide();
      }
      this.Fnm?.();
    }
  }
  IsVisible() {
    return !!this.tit && (this.BehaviorType !== 102 || !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10031)) && this.tit.IsVisible();
  }
  RefreshEnable(t) {}
  SetVisibleByExploreMode(t, i = false) {
    let e = false;
    if (t) {
      this.qit = this.Git;
      e = true;
    } else {
      this.qit = 0;
    }
    if (this.RootItem) {
      this.RootItem.SetRaycastTarget(e);
      if (i) {
        if (this.Mrt) {
          this.Mrt.Stop();
        } else {
          this.Mrt = this.RootActor.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
        }
        (t = this.Mrt.GetPlayTween()).from = this.RootItem.GetAlpha();
        t.to = this.qit;
        this.Mrt.Play();
      } else {
        if (this.Mrt) {
          this.Mrt.Stop();
        }
        this.RootItem.SetAlpha(this.qit);
      }
    }
  }
  SetOnVisibleChangedCallback(t) {
    this.Fnm = t;
  }
  RefreshDynamicEffect() {
    var t = this.GetDynamicEffectConfig();
    this.fWm?.RefreshDynamicEffect(t);
  }
  GetDynamicEffectConfig() {
    if (this.tit) {
      return this.tit.GetDynamicEffectConfig();
    }
  }
  GetKeyItem() {
    return this.Qtt;
  }
  RefreshKey() {
    var t;
    if (Info_1.Info.OperationType === 2) {
      t = this.tit.GetActionName();
      if (this.KeyActionName === t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[KeyItem]刷新技能按钮按键图标时，行为名称与上一次刷新一致，因此不刷新", ["actionName", t]);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[KeyItem]刷新技能按钮按键图标", ["actionName", t]);
        }
        if (this.Qtt) {
          this.Qtt.RefreshByActionOrAxis({
            ActionOrAxisName: t
          });
          this.Qtt.SetActive(true);
        }
        this.KeyActionName = t;
      }
    }
  }
  GetActionName() {
    return this.KeyActionName;
  }
}
exports.BehaviorButton = BehaviorButton;
//# sourceMappingURL=BehaviorButton.js.map