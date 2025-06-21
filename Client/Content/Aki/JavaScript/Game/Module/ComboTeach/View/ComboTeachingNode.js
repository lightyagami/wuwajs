"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ComboTeachingNode = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  KeyMap = new Map([
    ["攻击", InputEnums_1.EInputAction.攻击],
    ["技能", InputEnums_1.EInputAction.技能1],
    ["大招", InputEnums_1.EInputAction.大招],
    ["跳跃", InputEnums_1.EInputAction.跳跃],
    ["瞄准", InputEnums_1.EInputAction.瞄准],
    ["闪避", InputEnums_1.EInputAction.闪避],
    ["普通#1", InputEnums_1.EInputAction.攻击],
    ["技能#1", InputEnums_1.EInputAction.技能1],
    ["大招#1", InputEnums_1.EInputAction.大招],
    ["跳跃#1", InputEnums_1.EInputAction.跳跃],
    ["瞄准#1", InputEnums_1.EInputAction.瞄准],
    ["闪避#1", InputEnums_1.EInputAction.闪避]
  ]),
  ActionMap = new Map([
    ["攻击", InputMappingsDefine_1.actionMappings.攻击],
    ["技能", InputMappingsDefine_1.actionMappings.技能1],
    ["大招", InputMappingsDefine_1.actionMappings.大招],
    ["跳跃", InputMappingsDefine_1.actionMappings.跳跃],
    ["瞄准", InputMappingsDefine_1.actionMappings.瞄准],
    ["闪避", InputMappingsDefine_1.actionMappings.闪避],
    ["普通#1", InputMappingsDefine_1.actionMappings.攻击],
    ["技能#1", InputMappingsDefine_1.actionMappings.技能1],
    ["大招#1", InputMappingsDefine_1.actionMappings.大招],
    ["跳跃#1", InputMappingsDefine_1.actionMappings.跳跃],
    ["瞄准#1", InputMappingsDefine_1.actionMappings.瞄准],
    ["闪避#1", InputMappingsDefine_1.actionMappings.闪避]
  ]);
class ComboTeachingNode extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments), this.VIt = InputEnums_1.EInputAction.None, this.Pe = void 0, this.HoldTime = -0, this.SPe = void 0, this.KeyComponent = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem]
    ]
  }
  async InitAsync() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.GetItem(9).SetUIActive(Info_1.Info.IsInKeyBoard()), this.KeyComponent = new InputMultiKeyItem_1.InputMultiKeyItem, Info_1.Info.IsInTouch() ? await this.KeyComponent.CreateByActorAsync(this.GetItem(9).GetOwner()) : await this.KeyComponent.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())
  }
  OnBeforeDestroy() {
    this.SPe.Clear(), this.SPe = void 0, this.KeyComponent = void 0
  }
  OnSelect() {}
  OnUnSelect() {}
  OnMoveItem() {}
  OnRefreshItem(t) {
    this.Pe = t, this.SPe ? (this.InitNode(), this.Refresh()) : this.InitAsync().then(() => {
      this.InitNode(), this.Refresh()
    })
  }
  InitNode() {
    var t, i, s = this.Pe.Index,
      e = this.Pe.Config,
      n = this.Pe.IsHoldAction;
    0 === e.KeyID[s]?.length || void 0 === e.KeyID[s] ? this.RootItem.SetAlpha(0) : (t = e.KeyID[s].split(";")[1], i = e.KeyID[s].split(";")[0], this.VIt = KeyMap.get(i.split("#")[0]), i = {
      ActionOrAxisName: ActionMap.get(i.split("#")[0])
    }, this.KeyComponent?.RefreshByActionOrAxis(i), n && this.SPe.PlayLevelSequenceByName("AutoLoop"), this.SPe.StopCurrentSequence(!1, !0), this.SPe.PlayLevelSequenceByName("Start"), t && (i = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), i = EntitySystem_1.EntitySystem.Get(i).GetComponent(40).GetSkillInfo(Number(t))) && this.SetSpriteByPath(i.SkillIcon?.AssetPathName?.toString(), this.GetSprite(0), !1, "ComboTeachingView"), e.IconTagText.length > s && "" !== e.IconTagText[s] && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.IconTagText[s]), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.IconText[s]), LguiUtil_1.LguiUtil.ReplaceWildCard(this.GetText(7)), this.GetSprite(3).SetFillAmount(0), this.GetItem(4)?.SetUIActive(this.Pe.IsShowTag), this.GetSprite(3).SetUIActive(n), this.GetItem(10).SetUIActive(n))
  }
  Refresh() {
    var t;
    this.Pe && ((t = ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex) === this.Pe.Index ? (this.GetSprite(1).SetUIActive(!1), this.GetSprite(2).SetUIActive(!1), this.GetItem(6).SetUIActive(!0)) : t < this.Pe.Index ? (this.GetSprite(1).SetUIActive(!1), this.GetSprite(2).SetUIActive(!1), this.GetItem(6).SetUIActive(!1)) : t > this.Pe.Index && (this.GetSprite(1).SetUIActive(!0), this.GetSprite(2).SetUIActive(!1), this.GetItem(6).SetUIActive(!1)))
  }
  PlayFailAnimation() {
    this.GetSprite(2).SetUIActive(!0), this.SPe.StopCurrentSequence(!1, !0), this.SPe.PlayLevelSequenceByName("ClickRigMIs")
  }
  PlaySuccessAnimation() {
    this.GetSprite(1).SetUIActive(!0), this.SPe.StopCurrentSequence(!1, !0), this.SPe.PlayLevelSequenceByName("ClickRigMIs")
  }
  OnPress(t, i) {
    t = {
      ActionKey: t,
      ActionType: 0
    };
    10 === this.Pe.SuccessCondition.GetConditionType() && this.CheckSuccessDelay(t), ModelManager_1.ModelManager.ComboTeachingModel.CheckFailCondition(this.Pe, 7) && this.CheckFailDelay(t)
  }
  OnRelease(t, i) {
    this.HoldTime = 0, this.GetSprite(3).SetFillAmount(0), this.SPe.StopSequenceByKey("LongPress"), this.Pe.IsHoldAction && this.SPe.PlayLevelSequenceByName("AutoLoop"), !this.Pe.IsEmit && this.Pe.IsHoldAction && this.GetItem(4)?.SetUIActive(this.Pe.IsShowTag), this.GetItem(8).SetUIActive(!1), this.GetItem(6).SetUIActive(!0);
    t = {
      ActionKey: t,
      ActionType: 1
    };
    10 === this.Pe.SuccessCondition.GetConditionType() && this.CheckSuccessDelay(t), ModelManager_1.ModelManager.ComboTeachingModel.CheckFailCondition(this.Pe, 7) && this.CheckFailDelay(t)
  }
  OnHold(t, i) {
    this.Pe.IsHoldAction && t === this.VIt && (this.HoldTime = i, this.GetItem(4)?.SetUIActive(this.Pe.IsShowTag), this.GetSprite(3).SetFillAmount(this.HoldTime / this.Pe.HoldTotalTime), "LongPress" !== this.SPe.GetCurrentSequence() && (this.SPe.PlayLevelSequenceByName("LongPress"), this.GetItem(8).SetUIActive(!0), this.GetItem(6).SetUIActive(!1)), t = {
      ActionKey: t,
      ActionType: 2,
      HoldTime: i
    }, 11 === this.Pe.SuccessCondition.GetConditionType() && this.CheckSuccessDelay(t), ModelManager_1.ModelManager.ComboTeachingModel.CheckFailCondition(this.Pe, 8)) && this.CheckFailDelay(t)
  }
  OnUseSkill(t) {
    var i = ModelManager_1.ModelManager.ComboTeachingModel.CheckFailCondition(this.Pe, 0);
    !this.Pe.IsHoldAction && i && this.CheckFailDelay()
  }
  OnTick(t) {
    this.Pe.IsEmit || (this.Pe.NeedTickSummon && ModelManager_1.ModelManager.ComboTeachingModel.CheckSummonBuffAdd(this.Pe), !this.Pe.SuccessCondition) || 1 === this.Pe.SuccessCondition.Type && this.CheckSuccessCondition() || this.CheckFailCondition()
  }
  CheckSuccessDelay(t) {
    0 === this.Pe.SuccessDelay ? this.CheckSuccessCondition(t) : (this.Pe.SuccessHandle && (TimerSystem_1.TimerSystem.Has(this.Pe.SuccessHandle) && TimerSystem_1.TimerSystem.Remove(this.Pe.SuccessHandle), this.Pe.SuccessHandle = void 0), this.Pe.SuccessHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.CheckSuccessCondition(t)
    }, this.Pe.SuccessDelay))
  }
  CheckSuccessCondition(t) {
    return !(!this.Pe.SuccessCondition.Check(this.Pe, t) || this.Pe.IsEmit) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingNodeEnd, this, !0), this.SPe.StopSequenceByKey("LongPress"), this.SPe.StopCurrentSequence(!1, !0), this.SPe.PlayLevelSequenceByName("ClickRigMIs"), this.GetItem(8).SetUIActive(!1), this.Pe.IsEmit = !0)
  }
  CheckFailCondition() {
    if (!this.Pe.IsEmit) {
      let i = !1;
      this.Pe.FailUpdateCondition.forEach(t => {
        i = t.Check(this.Pe) || i
      }), i && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingNodeEnd, this, !1), this.SPe.StopCurrentSequence(!1, !0), this.SPe.PlayLevelSequenceByName("ClickRigMIs"), this.Pe.IsEmit = !0)
    }
  }
  CheckFailDelay(t) {
    0 === this.Pe.FailDelay ? this.CheckFailEventCondition(t) : (this.Pe.FailHandle && (TimerSystem_1.TimerSystem.Has(this.Pe.FailHandle) && TimerSystem_1.TimerSystem.Remove(this.Pe.FailHandle), this.Pe.FailHandle = void 0), this.Pe.FailHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.CheckFailEventCondition(t)
    }, this.Pe.FailDelay))
  }
  CheckFailEventCondition(s) {
    if (!this.Pe.IsEmit) {
      let i = !1;
      this.Pe.FailEventCondition.forEach(t => {
        i = t.Check(this.Pe, s) || i
      }), i && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingNodeEnd, this, !1), this.SPe.StopCurrentSequence(!1, !0), this.SPe.PlayLevelSequenceByName("ClickRigMIs"), this.Pe.IsEmit = !0)
    }
  }
  OnBulletHit(t) {
    var i = this.Pe.SuccessCondition.GetConditionType();
    9 !== i && 1 !== i || (i = {
      HitSkillId: t.Attacker.GetComponent(40)?.CurrentSkill?.SkillId ?? 0,
      BulletId: t.BulletId
    }, this.CheckSuccessDelay(i))
  }
}
exports.ComboTeachingNode = ComboTeachingNode;
//# sourceMappingURL=ComboTeachingNode.js.map