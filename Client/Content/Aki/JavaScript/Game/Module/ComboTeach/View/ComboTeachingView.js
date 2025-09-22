"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboTeachingView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const InputController_1 = require("../../../Input/InputController");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView");
const GuideController_1 = require("../../Guide/GuideController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ComboTeachingInputHandler_1 = require("../ComboTeachingInputHandler");
const ComboTeachingNode_1 = require("./ComboTeachingNode");
const DRAGITEM_INTERVAL = -280;
const SHOW_TIP_ID = "12900001";
const BEFORE_JUMP_TIME = 100;
class ComboTeachingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.HIt = undefined;
    this.sV1 = -1;
    this.ELo = undefined;
    this.$It = false;
    this.NodeList = [];
    this.oH1 = false;
    this.n7u = -1;
    this.OnPress = (e, t) => {
      var i = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
      if (i) {
        i.OnPress(e, t);
      }
    };
    this.OnRelease = (e, t) => {
      var i = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
      if (i) {
        i.OnRelease(e, t);
      }
    };
    this.OnHold = (e, t) => {
      var i = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
      if (i) {
        i.OnHold(e, t);
      }
    };
    this.OnNodeEnd = (e, t) => {
      ModelManager_1.ModelManager.ComboTeachingModel.IsEmit = true;
      if (t) {
        ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex = ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex + 1;
        if (!(this.NodeList.length > ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex)) {
          if (this.sV1 > 0) {
            if (ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(this.sV1).KeyID.length === 0) {
              TimerSystem_1.TimerSystem.Delay(() => {
                this.aV1();
              }, 200);
              return;
            } else {
              this.aV1();
              return;
            }
          } else {
            if (!this.$It) {
              this.$It = true;
              ModelManager_1.ModelManager.ComboTeachingModel.ResetComboConfig();
              TimerSystem_1.TimerSystem.Delay(() => {
                this.ELo.Clear();
                var e = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(SHOW_TIP_ID);
                var t = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObjByRawId(SHOW_TIP_ID);
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(e.TypeId, t, undefined, undefined, undefined, Number(SHOW_TIP_ID), () => {
                  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingFinish);
                  if (UiManager_1.UiManager.IsViewOpen("ComboTeachingView") || UiManager_1.UiManager.IsViewHide("ComboTeachingView")) {
                    this.CloseMe();
                  }
                  ModelManager_1.ModelManager.ComboTeachingModel.IsClose = true;
                  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingCloseGuide);
                });
              }, 1000);
            }
            return;
          }
        }
        this.ELo.AttachToIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
      } else {
        this.GetItem(4).SetUIActive(true);
        e.PlayFailAnimation();
        this.RemoveTeachingEventListener();
        TimerSystem_1.TimerSystem.Delay(() => {
          ModelManager_1.ModelManager.ComboTeachingModel.ResetComboConfig();
          ModelManager_1.ModelManager.ComboTeachingModel.IsClose = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingCloseGuide);
          ModelManager_1.ModelManager.ComboTeachingModel.OnComboListEnd();
          this.RefreshComboList(ModelManager_1.ModelManager.ComboTeachingModel.RecoveryComboId);
          this.AddTeachingEventListener();
          this.OnSelectedUpdate();
          this.GetItem(4).SetUIActive(false);
        }, 1000);
      }
    };
    this.OnSelectedUpdate = () => {
      if (this.ELo) {
        for (const t of this.ELo.GetItems()) {
          t.Refresh();
        }
        var e = ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex;
        if (!(e >= this.NodeList.length)) {
          ModelManager_1.ModelManager.ComboTeachingModel.OnCurIndexChanged(this.NodeList[e]);
        }
      }
    };
    this.OnCharUseSkill = (e, t, i) => {
      if (!this.$It) {
        e = EntitySystem_1.EntitySystem.Get(e);
        if (e) {
          if (e.GetComponent(0)?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) {
            return;
          }
        }
        ModelManager_1.ModelManager.ComboTeachingModel.IsEmit = false;
        ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = t;
        ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr = false;
        ModelManager_1.ModelManager.ComboTeachingModel.NextAttr = false;
        this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex)?.OnUseSkill(t);
      }
    };
    this.OnCharEndSkill = (e, t) => {
      e = EntitySystem_1.EntitySystem.Get(e);
      if (e && e.GetComponent(0)?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) {
        return;
      }
      ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = 0;
      ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime = 0;
    };
    this.OnNextAttrChanged = (e, t, i) => {
      if (!this.$It) {
        e = EntitySystem_1.EntitySystem.Get(e);
        if (e) {
          if (e.GetComponent(0)?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) {
            return;
          }
        }
        ModelManager_1.ModelManager.ComboTeachingModel.NextAttr = i;
        ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId = t;
      }
    };
    this.OnHit = e => {
      var t;
      if (!this.$It) {
        if (t = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex)) {
          t.OnBulletHit(e);
        }
      }
    };
    this.OnOpenLoading = () => {
      this.CloseMe();
    };
    this.ILo = (e, t, i) => {
      return new ComboTeachingNode_1.ComboTeachingNode(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    ModelManager_1.ModelManager.ComboTeachingModel.IsClose = false;
    this.hV1();
    this.RefreshComboList(this.OpenParam);
    this.InitComboInputHandler();
  }
  OnBeforeShow() {
    this.OnSelectedUpdate();
  }
  OnAddEventListener() {
    this.AddTeachingEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartLoadingState, this.OnOpenLoading);
  }
  OnRemoveEventListener() {
    this.RemoveTeachingEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartLoadingState, this.OnOpenLoading);
  }
  AddTeachingEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingPress, this.OnPress);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingRelease, this.OnRelease);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingHold, this.OnHold);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingNodeEnd, this.OnNodeEnd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingIndexUpdate, this.OnSelectedUpdate);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.OnCharUseSkill);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, this.OnCharEndSkill);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillAcceptChanged, this.OnNextAttrChanged);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BulletHit, this.OnHit);
    this.oH1 = true;
  }
  RemoveTeachingEventListener() {
    if (this.oH1) {
      this.oH1 = false;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingPress, this.OnPress);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingRelease, this.OnRelease);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingHold, this.OnHold);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingNodeEnd, this.OnNodeEnd);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingIndexUpdate, this.OnSelectedUpdate);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.OnCharUseSkill);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillAcceptChanged, this.OnNextAttrChanged);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BulletHit, this.OnHit);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnCharEndSkill);
    }
  }
  OnBeforeDestroy() {
    this.ELo = undefined;
    InputController_1.InputController.RemoveInputHandler(this.HIt);
    ModelManager_1.ModelManager.ComboTeachingModel.OnComboListEnd();
  }
  hV1() {
    var e = this.GetItem(0);
    var t = this.GetItem(5);
    this.ELo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner());
    this.ELo.SetControllerItem(t);
    this.ELo.CreateItems(this.GetItem(3).GetOwner(), DRAGITEM_INTERVAL, this.ILo, 0);
    this.GetItem(3).SetUIActive(false);
  }
  RefreshComboList(e) {
    var t = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(e);
    this.sV1 = t.NextRoleGuideID;
    t.guideID.forEach((e, t) => {
      GuideController_1.GuideController.TryStartGuide(e);
    });
    if (e !== this.n7u) {
      this.n7u = e;
      for (const n of this.NodeList) {
        if (n.SuccessHandle) {
          if (TimerSystem_1.TimerSystem.Has(n.SuccessHandle)) {
            TimerSystem_1.TimerSystem.Remove(n.SuccessHandle);
          }
          n.SuccessHandle = undefined;
        }
        if (n.FailHandle) {
          if (TimerSystem_1.TimerSystem.Has(n.FailHandle)) {
            TimerSystem_1.TimerSystem.Remove(n.FailHandle);
          }
          n.FailHandle = undefined;
        }
      }
      for (let e = this.NodeList.length = 0; e < t.CommandID.length; e++) {
        var i = ModelManager_1.ModelManager.ComboTeachingModel.CreateComboNodeInfo(e, t);
        this.NodeList.push(i);
      }
    } else {
      for (const r of this.NodeList) {
        r.IsEmit = false;
        r.NeedTickSummon = true;
        if (r.SuccessHandle) {
          if (TimerSystem_1.TimerSystem.Has(r.SuccessHandle)) {
            TimerSystem_1.TimerSystem.Remove(r.SuccessHandle);
          }
          r.SuccessHandle = undefined;
        }
        if (r.FailHandle) {
          if (TimerSystem_1.TimerSystem.Has(r.FailHandle)) {
            TimerSystem_1.TimerSystem.Remove(r.FailHandle);
          }
          r.FailHandle = undefined;
        }
      }
    }
    this.ELo.ReloadView(this.NodeList.length, this.NodeList, 0);
    ModelManager_1.ModelManager.ComboTeachingModel.RefreshComboList(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.DescriptionTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.DescriptionContent);
  }
  InitComboInputHandler() {
    this.HIt = new ComboTeachingInputHandler_1.ComboTeachingInputHandler();
    InputController_1.InputController.AddInputHandler(this.HIt);
  }
  OnTick(e) {
    if (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId !== 0) {
      ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime += e;
    }
    ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime -= e;
    if (ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime < 0) {
      ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime = 0;
    }
    if (Global_1.Global.BaseCharacter && (t = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), (EntitySystem_1.EntitySystem.Get(t)?.GetComponent(179)).IsJump) && ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime === 0) {
      ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime = BEFORE_JUMP_TIME;
    }
    var t = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
    if (t) {
      t.OnTick(e);
    }
  }
  aV1() {
    ModelManager_1.ModelManager.ComboTeachingModel.IsClose = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingCloseGuide);
    if (UiManager_1.UiManager.IsViewOpen("ComboTeachingView") || UiManager_1.UiManager.IsViewHide("ComboTeachingView")) {
      this.CloseMe(e => {
        if (e) {
          UiManager_1.UiManager.OpenView("ComboTeachingView", this.sV1);
        }
      });
    }
  }
}
exports.ComboTeachingView = ComboTeachingView;
//# sourceMappingURL=ComboTeachingView.js.map