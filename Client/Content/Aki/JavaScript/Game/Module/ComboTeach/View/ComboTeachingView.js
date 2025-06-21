"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ComboTeachingView = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  InputController_1 = require("../../../Input/InputController"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView"),
  GuideController_1 = require("../../Guide/GuideController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ComboTeachingInputHandler_1 = require("../ComboTeachingInputHandler"),
  ComboTeachingNode_1 = require("./ComboTeachingNode"),
  DRAGITEM_INTERVAL = -280,
  SHOW_TIP_ID = "12900001",
  BEFORE_JUMP_TIME = 100;
class ComboTeachingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.HIt = void 0, this.w41 = -1, this.ELo = void 0, this.$It = !1, this.NodeList = [], this.S91 = !1, this.pCu = -1, this.OnPress = (e, t) => {
      var i = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
      i && i.OnPress(e, t)
    }, this.OnRelease = (e, t) => {
      var i = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
      i && i.OnRelease(e, t)
    }, this.OnHold = (e, t) => {
      var i = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
      i && i.OnHold(e, t)
    }, this.OnNodeEnd = (e, t) => {
      if (ModelManager_1.ModelManager.ComboTeachingModel.IsEmit = !0, t) {
        if (ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex = ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex + 1, !(this.NodeList.length > ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex)) return 0 < this.w41 ? 0 === ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(this.w41).KeyID.length ? void TimerSystem_1.TimerSystem.Delay(() => {
          this.A41()
        }, 200) : void this.A41() : void(this.$It || (this.$It = !0, ModelManager_1.ModelManager.ComboTeachingModel.ResetComboConfig(), TimerSystem_1.TimerSystem.Delay(() => {
          this.ELo.Clear();
          var e = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfoByRawId(SHOW_TIP_ID),
            t = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObjByRawId(SHOW_TIP_ID);
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(e.TypeId, t, void 0, void 0, void 0, Number(SHOW_TIP_ID), () => {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingFinish), (UiManager_1.UiManager.IsViewOpen("ComboTeachingView") || UiManager_1.UiManager.IsViewHide("ComboTeachingView")) && this.CloseMe(), ModelManager_1.ModelManager.ComboTeachingModel.IsClose = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingCloseGuide)
          })
        }, 1e3)));
        this.ELo.AttachToIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex)
      } else this.GetItem(4).SetUIActive(!0), e.PlayFailAnimation(), this.RemoveTeachingEventListener(), TimerSystem_1.TimerSystem.Delay(() => {
        ModelManager_1.ModelManager.ComboTeachingModel.ResetComboConfig(), ModelManager_1.ModelManager.ComboTeachingModel.IsClose = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingCloseGuide), ModelManager_1.ModelManager.ComboTeachingModel.OnComboListEnd(), this.RefreshComboList(ModelManager_1.ModelManager.ComboTeachingModel.RecoveryComboId), this.AddTeachingEventListener(), this.OnSelectedUpdate(), this.GetItem(4).SetUIActive(!1)
      }, 1e3)
    }, this.OnSelectedUpdate = () => {
      if (this.ELo) {
        for (const t of this.ELo.GetItems()) t.Refresh();
        var e = ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex;
        e >= this.NodeList.length || ModelManager_1.ModelManager.ComboTeachingModel.OnCurIndexChanged(this.NodeList[e])
      }
    }, this.OnCharUseSkill = (e, t, i) => {
      if (!this.$It) {
        e = EntitySystem_1.EntitySystem.Get(e);
        if (e)
          if (e.GetComponent(0)?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) return;
        ModelManager_1.ModelManager.ComboTeachingModel.IsEmit = !1, ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = t, ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr = !1, ModelManager_1.ModelManager.ComboTeachingModel.NextAttr = !1, this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex)?.OnUseSkill(t)
      }
    }, this.OnCharEndSkill = (e, t) => {
      e = EntitySystem_1.EntitySystem.Get(e);
      if (e && e.GetComponent(0)?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) return;
      ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId = 0, ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime = 0
    }, this.OnNextAttrChanged = (e, t, i) => {
      if (!this.$It) {
        e = EntitySystem_1.EntitySystem.Get(e);
        if (e)
          if (e.GetComponent(0)?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) return;
        ModelManager_1.ModelManager.ComboTeachingModel.NextAttr = i, ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId = t
      }
    }, this.OnHit = e => {
      var t;
      this.$It || (t = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex)) && t.OnBulletHit(e)
    }, this.OnOpenLoading = () => {
      this.CloseMe()
    }, this.ILo = (e, t, i) => {
      return new ComboTeachingNode_1.ComboTeachingNode(e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem]
    ]
  }
  OnStart() {
    ModelManager_1.ModelManager.ComboTeachingModel.IsClose = !1, this.P41(), this.RefreshComboList(this.OpenParam), this.InitComboInputHandler()
  }
  OnBeforeShow() {
    this.OnSelectedUpdate()
  }
  OnAddEventListener() {
    this.AddTeachingEventListener(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartLoadingState, this.OnOpenLoading)
  }
  OnRemoveEventListener() {
    this.RemoveTeachingEventListener(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartLoadingState, this.OnOpenLoading)
  }
  AddTeachingEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingPress, this.OnPress), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingRelease, this.OnRelease), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingHold, this.OnHold), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingNodeEnd, this.OnNodeEnd), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingIndexUpdate, this.OnSelectedUpdate), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.OnCharUseSkill), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, this.OnCharEndSkill), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillAcceptChanged, this.OnNextAttrChanged), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BulletHit, this.OnHit), this.S91 = !0
  }
  RemoveTeachingEventListener() {
    this.S91 && (this.S91 = !1, EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingPress, this.OnPress), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingRelease, this.OnRelease), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingHold, this.OnHold), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingNodeEnd, this.OnNodeEnd), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingIndexUpdate, this.OnSelectedUpdate), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.OnCharUseSkill), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillAcceptChanged, this.OnNextAttrChanged), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BulletHit, this.OnHit), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnCharEndSkill))
  }
  OnBeforeDestroy() {
    this.ELo = void 0, InputController_1.InputController.RemoveInputHandler(this.HIt), ModelManager_1.ModelManager.ComboTeachingModel.OnComboListEnd()
  }
  P41() {
    var e = this.GetItem(0),
      t = this.GetItem(5);
    this.ELo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner()), this.ELo.SetControllerItem(t), this.ELo.CreateItems(this.GetItem(3).GetOwner(), DRAGITEM_INTERVAL, this.ILo, 0), this.GetItem(3).SetUIActive(!1)
  }
  RefreshComboList(e) {
    var t = ConfigManager_1.ConfigManager.ComboTeachingConfig.GetComboTeachingConfig(e);
    if (this.w41 = t.NextRoleGuideID, t.guideID.forEach((e, t) => {
        GuideController_1.GuideController.TryStartGuide(e)
      }), e !== this.pCu) {
      this.pCu = e;
      for (const n of this.NodeList) n.SuccessHandle && (TimerSystem_1.TimerSystem.Has(n.SuccessHandle) && TimerSystem_1.TimerSystem.Remove(n.SuccessHandle), n.SuccessHandle = void 0), n.FailHandle && (TimerSystem_1.TimerSystem.Has(n.FailHandle) && TimerSystem_1.TimerSystem.Remove(n.FailHandle), n.FailHandle = void 0);
      for (let e = this.NodeList.length = 0; e < t.CommandID.length; e++) {
        var i = ModelManager_1.ModelManager.ComboTeachingModel.CreateComboNodeInfo(e, t);
        this.NodeList.push(i)
      }
    } else
      for (const r of this.NodeList) r.IsEmit = !1, r.NeedTickSummon = !0, r.SuccessHandle && (TimerSystem_1.TimerSystem.Has(r.SuccessHandle) && TimerSystem_1.TimerSystem.Remove(r.SuccessHandle), r.SuccessHandle = void 0), r.FailHandle && (TimerSystem_1.TimerSystem.Has(r.FailHandle) && TimerSystem_1.TimerSystem.Remove(r.FailHandle), r.FailHandle = void 0);
    this.ELo.ReloadView(this.NodeList.length, this.NodeList, 0), ModelManager_1.ModelManager.ComboTeachingModel.RefreshComboList(e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.DescriptionTitle), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.DescriptionContent)
  }
  InitComboInputHandler() {
    this.HIt = new ComboTeachingInputHandler_1.ComboTeachingInputHandler, InputController_1.InputController.AddInputHandler(this.HIt)
  }
  OnTick(e) {
    0 !== ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId && (ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime += e), ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime -= e, ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime < 0 && (ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime = 0), Global_1.Global.BaseCharacter && (t = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), (EntitySystem_1.EntitySystem.Get(t)?.GetComponent(178)).IsJump) && 0 === ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime && (ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime = BEFORE_JUMP_TIME);
    var t = this.ELo.GetItemByShowIndex(ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex);
    t && t.OnTick(e)
  }
  A41() {
    ModelManager_1.ModelManager.ComboTeachingModel.IsClose = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingCloseGuide), (UiManager_1.UiManager.IsViewOpen("ComboTeachingView") || UiManager_1.UiManager.IsViewHide("ComboTeachingView")) && this.CloseMe(e => {
      e && UiManager_1.UiManager.OpenView("ComboTeachingView", this.w41)
    })
  }
}
exports.ComboTeachingView = ComboTeachingView;
//# sourceMappingURL=ComboTeachingView.js.map