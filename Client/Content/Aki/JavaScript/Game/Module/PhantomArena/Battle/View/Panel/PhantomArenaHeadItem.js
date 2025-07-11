"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaHeadItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const PhantomArenaDialogItem_1 = require("./PhantomArenaDialogItem");
class AddHpItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Nno = e => {
      if (e === "Start") {
        this.PlayClose();
      } else if (e === "Close") {
        this.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
  }
  OnDestroy() {
    this.Sequence.Clear();
  }
  RefreshAddHpNum(e) {
    this.GetText(0).SetText(e.toString());
  }
  PlayStart() {
    this.SetActive(true);
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequencePurely("Start");
  }
  PlayClose() {
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequencePurely("Close");
  }
}
class PhantomArenaHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DialogItem = undefined;
    this.IsOwn = false;
    this.NeedAddHpEffect = false;
    this.SequencePlayer = undefined;
    this.AddHpItem = undefined;
    this.icu = e => {
      if (e === "DamageAccumulate") {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBattleDamageAccumulateEnd);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UISprite]];
  }
  async InitAddHpItem() {
    if (this.NeedAddHpEffect) {
      this.AddHpItem = new AddHpItem();
      await this.AddHpItem.CreateByResourceIdAsync("PnlRoleAddHp", this.GetItem(3));
    }
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SequencePlayer.BindSequenceCloseEvent(this.icu);
    this.RefreshDamageBar(0);
  }
  async iZ1() {
    this.DialogItem = new PhantomArenaDialogItem_1.PhantomArenaDialogItem();
    if (this.IsOwn) {
      await this.DialogItem.CreateByResourceIdAsync("PnlRoleDialogUp", this.GetItem(3));
    } else {
      await this.DialogItem.CreateByResourceIdAsync("PnlRoleDialogDown", this.GetItem(3));
    }
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.InitAddHpItem(), this.iZ1()]);
  }
  SetBarActive(e) {
    this.GetSprite(1).SetUIActive(e);
    this.GetSprite(2).SetUIActive(!e);
  }
  RefreshLifeBar(e) {
    this.GetSprite(2).SetFillAmount(e);
    this.GetSprite(1).SetFillAmount(e);
  }
  RefreshDamageBar(e) {
    this.GetSprite(4)?.SetFillAmount(e);
  }
  RefreshRoleIcon(e) {
    this.SetTextureByPath(e, this.GetTexture(0));
  }
  GetAttachItem() {
    return this.GetItem(3);
  }
  PlayAccumulateDamage() {
    this.SequencePlayer?.PlayLevelSequenceByName("DamageAccumulate");
  }
  PlayAddHpEffect(e) {
    this.AddHpItem.RefreshAddHpNum(e);
    this.AddHpItem.PlayStart();
  }
}
exports.PhantomArenaHeadItem = PhantomArenaHeadItem;
//# sourceMappingURL=PhantomArenaHeadItem.js.map