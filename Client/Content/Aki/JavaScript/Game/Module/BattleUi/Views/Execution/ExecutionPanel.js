"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecutionPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const ExecutionItem_1 = require("./ExecutionItem");
const Info_1 = require("../../../../../Core/Common/Info");
const CLOSE_ANIM_TIME = 300;
const childType = 17;
class ExecutionPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Hnt = undefined;
    this.sDe = undefined;
    this.lat = undefined;
    this._at = undefined;
    this.uat = undefined;
    this.cat = undefined;
    this.mat = true;
    this.dat = () => {
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    };
    this.bMe = (t, i) => {
      if (i === 1) {
        this.Cat();
      }
    };
    this.Cat = () => {
      var t;
      if (this.sDe?.Valid) {
        this.lat?.OnInputAction();
        if ((t = this.sDe.Entity.GetComponent(118))?.IsPawnInteractive()) {
          t.InteractPawn();
        }
      } else {
        this.m$e();
        this.sDe = undefined;
        this.Hide();
      }
    };
    this.gat = () => {
      this.mat = this.cat.GetChildVisible(childType);
      if (this.mat) {
        if (this.sDe?.Valid && !this.IsShowOrShowing) {
          this.Show();
        }
      } else if (!this.IsHideOrHiding) {
        this.Hide();
      }
    };
    this.zpe = () => {
      this.fat();
    };
  }
  Init(t) {
    this.cat = ModelManager_1.ModelManager.BattleUiModel.ChildViewData;
    this.mat = this.cat.GetChildVisible(childType);
    this.Initialize(t);
  }
  async Initialize(t) {
    await this.CreateByResourceIdAsync("UiItem_FightSkillDeath", t, true);
    if (this.sDe?.Valid && this.mat) {
      this.Show();
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  GetExecutionItem() {
    if (this.IsShowOrShowing) {
      return this.GetItem(0);
    } else {
      return undefined;
    }
  }
  async OnBeforeStartAsync() {
    await this.fet();
    this.Ore();
  }
  async fet() {
    var t = new ExecutionItem_1.ExecutionItem();
    var i = this.GetItem(0).GetOwner();
    await t.NewByRootActorAsync(i);
    (this.lat = t).Init(this.Cat);
    t.RefreshKeyByActionName(InputMappingsDefine_1.actionMappings.通用交互);
    t.RefreshSkillIconByResId("SP_IconPutDeath");
    return true;
  }
  OnStart() {
    this.Est(1);
    this.Est(2);
  }
  OnAfterShow() {
    this.Gnt(2);
    this.bnt(1);
  }
  async OnBeforeHideAsync() {
    this.Gnt(1);
    if (this.uat) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "重复调用隐藏");
      }
      this.uat.SetResult();
    }
    this.uat = new CustomPromise_1.CustomPromise();
    this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME);
    this.bnt(2);
    await this.uat.Promise;
  }
  OnBeforeDestroy() {
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
      this.uat.SetResult();
    }
    this.lat?.Destroy();
    this.lat = undefined;
    this.kre();
  }
  Ore() {
    if (!Info_1.Info.IsInTouch()) {
      InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.通用交互, this.bMe);
    }
    this.cat.AddCallback(childType, this.gat);
  }
  kre() {
    if (!Info_1.Info.IsInTouch()) {
      InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.通用交互, this.bMe);
    }
    this.cat.RemoveCallback(childType, this.gat);
  }
  Est(t) {
    var i = [];
    var e = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = e.Num();
    for (let t = 0; t < s; t++) {
      i.push(e.Get(t));
    }
    this.Hnt ||= new Map();
    this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt.get(t);
    if (t) {
      for (const i of t) {
        i.Play();
      }
    }
  }
  Gnt(t) {
    t = this.Hnt.get(t);
    if (t) {
      for (const i of t) {
        i.Stop();
      }
    }
  }
  ShowByEntity(t) {
    if (this.sDe?.Id !== t) {
      if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t)) {
        this.m$e();
        this.sDe = t;
        this._o();
      } else {
        this.fat();
      }
    }
  }
  HideByEntity(t) {
    if (this.sDe?.Id === t) {
      this.fat();
    }
  }
  _o() {
    this.c$e();
    if (!this.IsShowOrShowing && this.mat) {
      this.Show();
    }
    ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(true);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(7, 19, false, true);
  }
  fat() {
    this.m$e();
    this.sDe = undefined;
    if (!this.IsHideOrHiding) {
      this.Hide();
    }
    ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(false);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(7, 19, true, true);
  }
  c$e() {
    if (this.sDe) {
      EventSystem_1.EventSystem.AddWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  m$e() {
    if (this.sDe) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
}
exports.ExecutionPanel = ExecutionPanel;
//# sourceMappingURL=ExecutionPanel.js.map