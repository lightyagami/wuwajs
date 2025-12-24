"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboTeachingNode = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const InputEnums_1 = require("../../../Input/InputEnums");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const KeyMap = new Map([["攻击", InputEnums_1.EInputAction.攻击], ["技能", InputEnums_1.EInputAction.技能1], ["大招", InputEnums_1.EInputAction.大招], ["跳跃", InputEnums_1.EInputAction.跳跃], ["瞄准", InputEnums_1.EInputAction.瞄准], ["闪避", InputEnums_1.EInputAction.闪避], ["普通#1", InputEnums_1.EInputAction.攻击], ["技能#1", InputEnums_1.EInputAction.技能1], ["大招#1", InputEnums_1.EInputAction.大招], ["跳跃#1", InputEnums_1.EInputAction.跳跃], ["瞄准#1", InputEnums_1.EInputAction.瞄准], ["闪避#1", InputEnums_1.EInputAction.闪避]]);
const ActionMap = new Map([["攻击", InputMappingsDefine_1.actionMappings.攻击], ["技能", InputMappingsDefine_1.actionMappings.技能1], ["大招", InputMappingsDefine_1.actionMappings.大招], ["跳跃", InputMappingsDefine_1.actionMappings.跳跃], ["瞄准", InputMappingsDefine_1.actionMappings.瞄准], ["闪避", InputMappingsDefine_1.actionMappings.闪避], ["普通#1", InputMappingsDefine_1.actionMappings.攻击], ["技能#1", InputMappingsDefine_1.actionMappings.技能1], ["大招#1", InputMappingsDefine_1.actionMappings.大招], ["跳跃#1", InputMappingsDefine_1.actionMappings.跳跃], ["瞄准#1", InputMappingsDefine_1.actionMappings.瞄准], ["闪避#1", InputMappingsDefine_1.actionMappings.闪避]]);
class ComboTeachingNode extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.VIt = InputEnums_1.EInputAction.None;
    this.Pe = undefined;
    this.HoldTime = -0;
    this.SPe = undefined;
    this.KeyComponent = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
  }
  async InitAsync() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(9).SetUIActive(Info_1.Info.IsInKeyBoard());
    this.KeyComponent = new InputMultiKeyItem_1.InputMultiKeyItem();
    if (Info_1.Info.IsInTouch()) {
      await this.KeyComponent.CreateByActorAsync(this.GetItem(9).GetOwner());
    } else {
      await this.KeyComponent.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
    }
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
    this.KeyComponent = undefined;
  }
  OnSelect() {}
  OnUnSelect() {}
  OnMoveItem() {}
  OnRefreshItem(t) {
    this.Pe = t;
    if (this.SPe) {
      this.InitNode();
      this.Refresh();
    } else {
      this.InitAsync().then(() => {
        this.InitNode();
        this.Refresh();
      });
    }
  }
  InitNode() {
    var t;
    var i;
    var s = this.Pe.Index;
    var e = this.Pe.Config;
    var n = this.Pe.IsHoldAction;
    if (e.KeyID[s]?.length === 0 || e.KeyID[s] === undefined) {
      this.RootItem.SetAlpha(0);
    } else {
      t = e.KeyID[s].split(";")[1];
      i = e.KeyID[s].split(";")[0];
      this.VIt = KeyMap.get(i.split("#")[0]);
      i = {
        ActionOrAxisName: ActionMap.get(i.split("#")[0])
      };
      this.KeyComponent?.RefreshByActionOrAxis(i);
      if (n) {
        this.SPe.PlayLevelSequenceByName("AutoLoop");
      }
      this.SPe.StopCurrentSequence(false, true);
      this.SPe.PlayLevelSequenceByName("Start");
      if (t && (i = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), i = EntitySystem_1.EntitySystem.Get(i).GetComponent(41).GetSkillInfo(Number(t)))) {
        this.SetSpriteByPath(i.SkillIcon?.AssetPathName?.toString(), this.GetSprite(0), false, "ComboTeachingView");
      }
      if (e.IconTagText.length > s && e.IconTagText[s] !== "") {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.IconTagText[s]);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.IconText[s]);
      LguiUtil_1.LguiUtil.ReplaceWildCard(this.GetText(7));
      this.GetSprite(3).SetFillAmount(0);
      this.GetItem(4)?.SetUIActive(this.Pe.IsShowTag);
      this.GetSprite(3).SetUIActive(n);
      this.GetItem(10).SetUIActive(n);
    }
  }
  Refresh() {
    var t;
    if (this.Pe) {
      if ((t = ModelManager_1.ModelManager.ComboTeachingModel.CurrentNodeIndex) === this.Pe.Index) {
        this.GetSprite(1).SetUIActive(false);
        this.GetSprite(2).SetUIActive(false);
        this.GetItem(6).SetUIActive(true);
      } else if (t < this.Pe.Index) {
        this.GetSprite(1).SetUIActive(false);
        this.GetSprite(2).SetUIActive(false);
        this.GetItem(6).SetUIActive(false);
      } else if (t > this.Pe.Index) {
        this.GetSprite(1).SetUIActive(true);
        this.GetSprite(2).SetUIActive(false);
        this.GetItem(6).SetUIActive(false);
      }
    }
  }
  PlayFailAnimation() {
    this.GetSprite(2).SetUIActive(true);
    this.SPe.StopCurrentSequence(false, true);
    this.SPe.PlayLevelSequenceByName("ClickRigMIs");
  }
  PlaySuccessAnimation() {
    this.GetSprite(1).SetUIActive(true);
    this.SPe.StopCurrentSequence(false, true);
    this.SPe.PlayLevelSequenceByName("ClickRigMIs");
  }
  OnPress(t, i) {
    t = {
      ActionKey: t,
      ActionType: 0
    };
    if (this.Pe.SuccessCondition.GetConditionType() === 10) {
      this.CheckSuccessDelay(t);
    }
    if (ModelManager_1.ModelManager.ComboTeachingModel.CheckFailCondition(this.Pe, 7)) {
      this.CheckFailDelay(t);
    }
  }
  OnRelease(t, i) {
    this.HoldTime = 0;
    this.GetSprite(3).SetFillAmount(0);
    this.SPe.StopSequenceByKey("LongPress");
    if (this.Pe.IsHoldAction) {
      this.SPe.PlayLevelSequenceByName("AutoLoop");
    }
    if (!this.Pe.IsEmit && this.Pe.IsHoldAction) {
      this.GetItem(4)?.SetUIActive(this.Pe.IsShowTag);
    }
    this.GetItem(8).SetUIActive(false);
    this.GetItem(6).SetUIActive(true);
    t = {
      ActionKey: t,
      ActionType: 1
    };
    if (this.Pe.SuccessCondition.GetConditionType() === 10) {
      this.CheckSuccessDelay(t);
    }
    if (ModelManager_1.ModelManager.ComboTeachingModel.CheckFailCondition(this.Pe, 7)) {
      this.CheckFailDelay(t);
    }
  }
  OnHold(t, i) {
    if (this.Pe.IsHoldAction && t === this.VIt && (this.HoldTime = i, this.GetItem(4)?.SetUIActive(this.Pe.IsShowTag), this.GetSprite(3).SetFillAmount(this.HoldTime / this.Pe.HoldTotalTime), this.SPe.GetCurrentSequence() !== "LongPress" && (this.SPe.PlayLevelSequenceByName("LongPress"), this.GetItem(8).SetUIActive(true), this.GetItem(6).SetUIActive(false)), t = {
      ActionKey: t,
      ActionType: 2,
      HoldTime: i
    }, this.Pe.SuccessCondition.GetConditionType() === 11 && this.CheckSuccessDelay(t), ModelManager_1.ModelManager.ComboTeachingModel.CheckFailCondition(this.Pe, 8))) {
      this.CheckFailDelay(t);
    }
  }
  OnUseSkill(t) {
    var i = ModelManager_1.ModelManager.ComboTeachingModel.CheckFailCondition(this.Pe, 0);
    if (!this.Pe.IsHoldAction && i) {
      this.CheckFailDelay();
    }
  }
  OnTick(t) {
    if (!this.Pe.IsEmit && !(this.Pe.NeedTickSummon && ModelManager_1.ModelManager.ComboTeachingModel.CheckSummonBuffAdd(this.Pe), !this.Pe.SuccessCondition) && (this.Pe.SuccessCondition.Type !== 1 || !this.CheckSuccessCondition())) {
      this.CheckFailCondition();
    }
  }
  CheckSuccessDelay(t) {
    if (this.Pe.SuccessDelay === 0) {
      this.CheckSuccessCondition(t);
    } else {
      if (this.Pe.SuccessHandle) {
        if (TimerSystem_1.TimerSystem.Has(this.Pe.SuccessHandle)) {
          TimerSystem_1.TimerSystem.Remove(this.Pe.SuccessHandle);
        }
        this.Pe.SuccessHandle = undefined;
      }
      this.Pe.SuccessHandle = TimerSystem_1.TimerSystem.Delay(() => {
        this.CheckSuccessCondition(t);
      }, this.Pe.SuccessDelay);
    }
  }
  CheckSuccessCondition(t) {
    return !!this.Pe.SuccessCondition.Check(this.Pe, t) && !this.Pe.IsEmit && !!EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingNodeEnd, this, true) && (this.SPe.StopSequenceByKey("LongPress"), this.SPe.StopCurrentSequence(false, true), this.SPe.PlayLevelSequenceByName("ClickRigMIs"), this.GetItem(8).SetUIActive(false), this.Pe.IsEmit = true);
  }
  CheckFailCondition() {
    if (!this.Pe.IsEmit) {
      let i = false;
      this.Pe.FailUpdateCondition.forEach(t => {
        i = t.Check(this.Pe) || i;
      });
      if (i && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingNodeEnd, this, false)) {
        this.SPe.StopCurrentSequence(false, true);
        this.SPe.PlayLevelSequenceByName("ClickRigMIs");
        this.Pe.IsEmit = true;
      }
    }
  }
  CheckFailDelay(t) {
    if (this.Pe.FailDelay === 0) {
      this.CheckFailEventCondition(t);
    } else {
      if (this.Pe.FailHandle) {
        if (TimerSystem_1.TimerSystem.Has(this.Pe.FailHandle)) {
          TimerSystem_1.TimerSystem.Remove(this.Pe.FailHandle);
        }
        this.Pe.FailHandle = undefined;
      }
      this.Pe.FailHandle = TimerSystem_1.TimerSystem.Delay(() => {
        this.CheckFailEventCondition(t);
      }, this.Pe.FailDelay);
    }
  }
  CheckFailEventCondition(s) {
    if (!this.Pe.IsEmit) {
      let i = false;
      this.Pe.FailEventCondition.forEach(t => {
        i = t.Check(this.Pe, s) || i;
      });
      if (i && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingNodeEnd, this, false)) {
        this.SPe.StopCurrentSequence(false, true);
        this.SPe.PlayLevelSequenceByName("ClickRigMIs");
        this.Pe.IsEmit = true;
      }
    }
  }
  OnBulletHit(t) {
    var i = this.Pe.SuccessCondition.GetConditionType();
    if (i === 9 || i === 1) {
      i = {
        HitSkillId: t.Attacker.GetComponent(41)?.CurrentSkill?.SkillId ?? 0,
        BulletId: t.BulletId
      };
      this.CheckSuccessDelay(i);
    }
  }
}
exports.ComboTeachingNode = ComboTeachingNode;
//# sourceMappingURL=ComboTeachingNode.js.map