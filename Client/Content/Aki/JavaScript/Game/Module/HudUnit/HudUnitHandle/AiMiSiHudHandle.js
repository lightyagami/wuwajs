"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiMiSiHudHandle = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const AiMiSiHudUnit_1 = require("../HudUnit/AiMiSiHudUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class AiMiSiHudHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.PUg = undefined;
    this.Wst = undefined;
    this.Xte = undefined;
    this.ldt = [];
    this.Pe = new AiMiSiHudUnit_1.AiMiSiHudData();
    this.xie = () => {
      this.AUg();
      this.DUg();
      this.UUg();
      this.Rst();
    };
    this.xUg = (t, i) => {
      this.Pe.IsMechanism = i;
      this.PUg?.MarkDataDirty();
    };
    this.BUg = (t, i) => {
      this.Pe.IsJoint = i;
      this.PUg?.MarkDataDirty();
    };
    this.kUg = (t, i) => {
      this.Pe.IsSpecialJoint = i;
      this.PUg?.MarkDataDirty();
    };
    this.qUg = (t, i) => {
      this.Pe.IsSprint = i;
      this.PUg?.MarkDataDirty();
    };
    this.aXe = (t, i) => {
      this.Pe.InFight = i;
      this.PUg?.MarkDataDirty();
    };
    this.FGg = (t, i) => {
      this.Pe.IsModeOne = i;
      this.PUg?.RefreshModeIcon();
    };
    this.ayo = (t, i) => {
      this.Pe.InAir = i;
      this.PUg?.MarkDataDirty();
    };
    this.NGg = (t, i) => {
      this.Pe.IsUltraBuff = i;
      this.PUg?.MarkDataDirty();
    };
    this.gne = () => {
      this.PUg?.OnHurt();
    };
    this.OUg = (t, i, s) => {
      this.UUg();
    };
    this.VGg = (t, i, s) => {
      this.Rst();
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.AUg();
    this.NewHudUnit(AiMiSiHudUnit_1.AiMiSiHudUnit, "UiItem_AimisiHUD", false).then(t => {
      this.PUg = t;
      if (this.PUg) {
        this.PUg.InitData(this.Pe);
        this.DUg();
        this.UUg();
        this.Rst();
      }
    });
  }
  OnDestroyed() {
    if (this.PUg) {
      this.DestroyHudUnit(this.PUg);
      this.PUg = undefined;
    }
    this.GUg();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
  }
  AUg() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t && t.CreatureRoleId === 1210) {
      this.Wst = t;
      this.Xte = t.GameplayTagComponent;
      this.Pe.IsForeground = true;
      if (this.Xte) {
        this.mdt(225676701, this.xUg);
        this.mdt(833486288, this.BUg);
        this.mdt(982722547, this.kUg);
        this.mdt(935946401, this.qUg);
        this.mdt(1996802261, this.aXe);
        this.mdt(1140274167, this.FGg);
        this.mdt(40422668, this.ayo);
        this.mdt(860414201, this.NGg);
        this.Pe.IsMechanism = this.Xte.HasTag(225676701);
        this.Pe.IsJoint = this.Xte.HasTag(833486288);
        this.Pe.IsSpecialJoint = this.Xte.HasTag(982722547);
        this.Pe.IsSprint = this.Xte.HasTag(935946401);
        this.Pe.InFight = this.Xte.HasTag(1996802261);
        this.Pe.IsModeOne = this.Xte.HasTag(1140274167);
        this.Pe.InAir = this.Xte.HasTag(40422668);
        this.Pe.IsUltraBuff = this.Xte.HasTag(860414201);
      } else {
        this.Pe.IsMechanism = false;
        this.Pe.IsJoint = false;
        this.Pe.IsSpecialJoint = false;
        this.Pe.IsSprint = false;
        this.Pe.InFight = false;
        this.Pe.IsModeOne = false;
        this.Pe.InAir = false;
        this.Pe.IsUltraBuff = false;
      }
      if (this.Wst?.EntityHandle?.Valid) {
        EventSystem_1.EventSystem.AddWithTarget(this.Wst.EntityHandle.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.gne);
      }
      (t = this.Wst.AttributeComponent).AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy5, this.OUg);
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy5Max, this.OUg);
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.VGg);
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.VGg);
    } else {
      this.GUg();
      this.Pe.IsForeground = false;
    }
    this.PUg?.MarkDataDirty();
  }
  GUg() {
    var t;
    if (this.Wst) {
      if (this.Wst.EntityHandle?.Valid) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Wst.EntityHandle.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.gne);
        (t = this.Wst.AttributeComponent).RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy5, this.OUg);
        t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy5Max, this.OUg);
        t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_Life, this.VGg);
        t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.VGg);
      }
      this.Wst = undefined;
    }
    this.Xte = undefined;
    for (const i of this.ldt) {
      i.EndTask();
    }
    this.ldt.length = 0;
  }
  DUg() {
    if (this.PUg) {
      this.PUg.SetTargetVisible(this.Wst !== undefined);
    }
  }
  UUg() {
    if (this.PUg) {
      var i = this.Wst?.AttributeComponent;
      if (i) {
        let t = 0;
        var s = i.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy5);
        var i = i.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy5Max);
        if (i > 0) {
          t = s / i;
        }
        this.PUg.SetEnduranceProgress(t);
      }
    }
  }
  Rst() {
    if (this.PUg) {
      let t = 0;
      var i;
      var s = this.Wst?.AttributeComponent;
      if (s && (i = s.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life), (s = s.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n)) > 0)) {
        t = i / s;
      }
      this.PUg.SetHpPercent(t);
    }
  }
  mdt(t, i) {
    if (this.Xte && (t = this.Xte.ListenForTagAddOrRemove(t, i))) {
      this.ldt.push(t);
    }
  }
  OnInputControllerChanged(t, i) {
    if (!!this.PUg && t !== i && (t === 5 || i === 5)) {
      this.PUg.RefreshKeyNode();
      this.PUg.RefreshRotateMachineSpeed();
    }
  }
}
exports.AiMiSiHudHandle = AiMiSiHudHandle;
//# sourceMappingURL=AiMiSiHudHandle.js.map