"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffTargetRoleItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const ANIMATION_LENGTH = 200;
const LOW_HP_PERCENT = 0.2;
class BuffTargetRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.z0t = undefined;
    this.Z0t = -1;
    this.eft = 0;
    this.tft = -0;
    this.ift = false;
    this.oft = undefined;
    this.rft = 0;
    this.nft = undefined;
    this.sft = undefined;
    this.SPe = undefined;
    this.aft = undefined;
    this.hft = false;
    this.lft = false;
    this._ft = () => {
      if (this.oft) {
        this.oft(this);
      }
    };
    this.uft = (t, i, e) => {
      var s;
      if (i !== e && this.z0t) {
        s = this.z0t.Entity.GetComponent(182).GetCurrentValue(EAttributeId.l5n);
        this.z0t.SetCurrentAttribute(i);
        this.cft(e, i, s);
      }
    };
  }
  Initialize(t) {
    this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIItem], [8, UE.UIItem], [7, UE.UIButtonComponent], [9, UE.UINiagara]];
    this.BtnBindInfo = [[7, this._ft]];
  }
  OnStart() {
    this.sft = new MediumItemGrid_1.MediumItemGrid();
    this.sft.Initialize(this.GetItem(0).GetOwner());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.aft = this.GetUiNiagara(9);
    this.aft.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.sft = undefined;
    this.sft = undefined;
    this.SPe?.Clear();
    this.ResetBuffTargetRoleItem();
    this.mft();
    this.aft = undefined;
  }
  ResetBuffTargetRoleItem() {
    this.z0t = undefined;
    this.hft = false;
    this.m$e();
  }
  Tick(t) {
    if (this.ift) {
      if (this.tft > ANIMATION_LENGTH) {
        this.dft();
      } else {
        this.Cft();
        this.tft += t;
      }
    }
  }
  RefreshBuffTargetRoleItem(t) {
    var i = (this.z0t = t).RoleConfigId;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    var s = t.RoleLevel;
    var h = Math.floor(t.CurrentAttribute);
    var t = Math.floor(t.MaxAttribute);
    var i = {
      Type: 2,
      ItemConfigId: i,
      SkinId: e.SkinId,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [s],
      ElementId: e.ElementId
    };
    this.sft.Apply(i);
    this.SetCurrentValueBarPercent(h / t);
    this.gft(h, t);
    this.SetPreviewValueBarVisible(false);
    this.SetAnimationValueBarVisible(false);
    this.fft(false);
    this.SetSelected(false);
    this.SetNoneRole(false);
    this.c$e();
  }
  RemoveRole() {
    this.SetNoneRole(true);
    this.m$e();
    this.z0t = undefined;
  }
  c$e() {
    if (this.z0t) {
      this.z0t.Entity.GetComponent(182).AddListener(EAttributeId.Proto_Life, this.uft, "Life.BuffTargetRoleItem");
    }
  }
  m$e() {
    if (this.z0t) {
      this.z0t.Entity.GetComponent(182).RemoveListener(EAttributeId.Proto_Life, this.uft);
    }
  }
  RefreshPreviewUseItem(t, i, e) {
    var s = Math.min(t + e, i);
    var h = Math.min(e, i - t);
    this.SetCurrentValueBarPercent(t / i);
    this.SetPreviewValueBarPercent(s / i);
    this.SetPreviewValueBarVisible(e > 0);
    this.SetAddValueText(Math.floor(h));
    this.fft(e > 0);
    this.SetPreviewValueText(Math.floor(s), Math.floor(i));
  }
  ResetPreviewUseItem() {
    var t = this.z0t.CurrentAttribute;
    var i = this.z0t.MaxAttribute;
    this.SetPreviewValueBarVisible(false);
    this.fft(false);
    this.gft(t, i);
  }
  SetCurrentValueBarPercent(t) {
    var i = this.GetSprite(4);
    i.SetChangeColor(t <= LOW_HP_PERCENT, i.changeColor);
    i.SetFillAmount(t);
  }
  SetPreviewValueBarPercent(t) {
    this.GetSprite(5).SetFillAmount(t);
  }
  SetPreviewValueBarVisible(t) {
    this.GetSprite(5).SetUIActive(t);
  }
  SetAnimationValueBarPercent(t) {
    this.GetSprite(3).SetFillAmount(t);
  }
  pft(t) {
    var i = this.GetSprite(3);
    i.SetChangeColor(t <= LOW_HP_PERCENT, i.changeColor);
  }
  SetAnimationValueBarVisible(t) {
    this.GetSprite(3).SetUIActive(t);
  }
  SetAddValueText(t) {
    this.GetText(1).SetText("+" + t);
  }
  fft(t) {
    this.GetText(1).SetUIActive(t);
  }
  gft(t, i) {
    var e = this.GetText(2);
    if (t <= 0) {
      e.SetText(`<color=#ff0000ff>${Math.ceil(t)}</color>/${Math.ceil(i)}`);
    } else {
      e.SetText(Math.ceil(t) + "/" + Math.ceil(i));
    }
  }
  SetPreviewValueText(t, i) {
    this.GetText(2).SetText(`<color=#00ff00ff>${t}</color>/${i}`);
  }
  SetSelected(t) {
    if (t) {
      this.sft.SetSelected(true);
      this.SPe.PlayLevelSequenceByName("Selected");
    } else {
      this.ResetPreviewUseItem();
      this.SetAnimationValueBarVisible(false);
      this.sft.SetSelected(false);
    }
    this.lft = t;
  }
  IsSelected() {
    return this.lft;
  }
  SetNoneRole(t) {
    var i = this.GetItem(8);
    var e = this.GetItem(6);
    i.SetUIActive(t);
    e.SetUIActive(!t);
  }
  GetUseBuffItemRoleData() {
    return this.z0t;
  }
  BindOnClickedBuffTargetRoleItem(t) {
    this.oft = t;
  }
  vft() {
    const t = () => {
      this.aft.SetUIActive(true);
      this.aft.ActivateSystem(true);
    };
    var i;
    if (this.hft) {
      t();
    } else {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Niagara_BuffTreat");
      this.SetNiagaraSystemByPath(i, this.aft, () => {
        this.hft = true;
        t();
      });
    }
  }
  mft() {
    this.aft.DeactivateSystem();
    this.aft.SetUIActive(false);
  }
  cft(t, i, e) {
    if (t !== i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 37, `播放属性进度条动画，currentAttribute：${t},targetAttribute:${i},maxAttribute:${e}`);
      }
      if (!this.ift) {
        this.Z0t = t;
      }
      this.vft();
      this.eft = i;
      this.rft = e;
      this.tft = 0;
      this.ift = true;
      this.SetAnimationValueBarVisible(true);
      this.pft(this.Z0t / this.rft);
      this.ResetPreviewUseItem();
      this.SPe.PlayLevelSequenceByName("Reply");
    }
  }
  dft() {
    this.ift = false;
    this.tft = -1;
    var t = this.z0t.CurrentAttribute;
    var i = this.z0t.MaxAttribute;
    var e = this.z0t.GetAddAttribute();
    this.pft(t / i);
    this.RefreshPreviewUseItem(t, i, e);
    this.SetAnimationValueBarVisible(false);
    if (this.nft) {
      this.nft();
    }
  }
  BindOnUseItemAnimationFinished(t) {
    this.nft = t;
  }
  Cft() {
    var t = Math.min(this.tft / ANIMATION_LENGTH, 1);
    this.Z0t = MathUtils_1.MathUtils.Lerp(this.Z0t, this.eft, t);
    this.SetAnimationValueBarPercent(this.Z0t / this.rft);
  }
}
exports.BuffTargetRoleItem = BuffTargetRoleItem;
//# sourceMappingURL=BuffTargetRoleItem.js.map