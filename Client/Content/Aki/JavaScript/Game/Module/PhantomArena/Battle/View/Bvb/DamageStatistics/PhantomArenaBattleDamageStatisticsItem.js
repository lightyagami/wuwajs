"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDamageStatisticsItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiFloatTween_1 = require("../../../../../Util/Lgui/LguiFloatTween");
const LguiIntTween_1 = require("../../../../../Util/Lgui/LguiIntTween");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const TWEEN_DURATION = 0.3;
const BURN_BLOOD_BUFF_RESULT_ID = 700020001;
class PhantomArenaBattleDamageStatisticsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ValueTween = undefined;
    this.OffsetTween = undefined;
    this.EntityId = undefined;
    this.Entity = undefined;
    this.AttributeComp = undefined;
    this.ValueSprite = undefined;
    this.LerpCurve = undefined;
    this.GetAllCount = undefined;
    this.GetCount = undefined;
    this.NotifyValueChange = undefined;
    this.e3m = (t, e, i, s) => {
      var h = this.AttributeComp.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
      this.NotifyValueChange(this.EntityId, Math.abs(s.Damage), h, 2);
    };
    this.t3m = (t, e, i, s) => {
      if (s.DamageData.Id !== BURN_BLOOD_BUFF_RESULT_ID && s.DamageData.CalculateType === 0) {
        e = e.GetComponent(181).GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
        this.NotifyValueChange(this.EntityId, Math.abs(s.Damage), e, 1);
      }
    };
    this.i3m = t => {
      this.ValueSprite.SetFillAmount(t);
    };
    this.r3m = t => {
      this.GetOriginalItem().SetAnchorOffsetY(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIText]];
  }
  OnStart() {
    this.ValueSprite = this.GetSprite(4);
    this.ValueTween = new LguiFloatTween_1.LguiFloatTween();
    this.ValueTween.BindUpdateTween(this.i3m);
    this.OffsetTween = new LguiIntTween_1.LguiIntTween();
    this.OffsetTween.BindUpdateTween(this.r3m);
  }
  OnDestroy() {
    this.ValueTween.Destroy();
    this.OffsetTween.Destroy();
    this.m$e(this.Entity);
    this.Entity = undefined;
  }
  Kbe() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetCardDataByEntityId(this.EntityId);
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    this.SetTextureByPath(t.BvbIcon, this.GetTexture(2));
  }
  P5e() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetCardDataByEntityId(this.EntityId);
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    var i = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Name);
    i.SetChangeColor(t.IsNpcCard, i.changeColor);
  }
  WNe() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetCardDataByEntityId(this.EntityId);
    this.GetItem(0).SetUIActive(!t.IsNpcCard);
    this.GetItem(1).SetUIActive(t.IsNpcCard);
    this.ValueSprite.SetChangeColor(t.IsNpcCard, this.ValueSprite.changeColor);
  }
  Init(t, e, i) {
    this.m$e(this.Entity);
    this.LerpCurve = e;
    this.EntityId = t;
    this.Entity = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity;
    this.AttributeComp = this.Entity?.GetComponent(181);
    this.c$e(this.Entity);
    this.GetOriginalItem().SetAnchorOffsetY(i);
    this.Kbe();
    this.P5e();
    this.WNe();
  }
  RefreshOffsetY(t) {
    var e = this.GetOriginalItem().GetAnchorOffsetY();
    this.OffsetTween.PlayTween(e, t, TWEEN_DURATION);
  }
  RefreshCount() {
    var t;
    var e;
    var i = this.GetAllCount();
    if (i === 0) {
      this.ValueSprite.SetFillAmount(0);
      this.GetText(5).SetText("0");
    } else {
      t = this.GetCount(this.EntityId);
      e = this.ValueSprite.GetFillAmount();
      this.ValueTween.PlayTween(e, t / i, TWEEN_DURATION);
      this.GetText(5).SetText(t.toString());
    }
  }
  c$e(t) {
    if (t) {
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.e3m)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.e3m);
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharDamage, this.t3m)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharDamage, this.t3m);
      }
    }
  }
  m$e(t) {
    if (t && (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.e3m) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.e3m), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharDamage, this.t3m))) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharDamage, this.t3m);
    }
  }
}
exports.PhantomArenaBattleDamageStatisticsItem = PhantomArenaBattleDamageStatisticsItem;
//# sourceMappingURL=PhantomArenaBattleDamageStatisticsItem.js.map