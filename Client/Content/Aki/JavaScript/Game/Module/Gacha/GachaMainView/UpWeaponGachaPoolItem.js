"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpWeaponGachaPoolItem = undefined;
const UE = require("ue");
const Queue_1 = require("../../../../Core/Container/Queue");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GachaPoolItem_1 = require("./GachaPoolItem");
const WeaponDescribeComponent_1 = require("./WeaponDescribeComponent");
class UpWeaponGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments);
    this.mWt = undefined;
    this.dWt = new Map();
    this.aGc = new Map();
    this.CWt = undefined;
    this.gWt = new Queue_1.Queue();
    this.pjt = false;
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = true;
  }
  Jft() {
    var e;
    this.pjt = false;
    if (this.gWt.Size !== 0 && (e = this.gWt.Pop())) {
      this.fWt(e);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.mWt = new WeaponDescribeComponent_1.WeaponDescribeComponent();
    await this.mWt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnPlayStartSeq() {
    if (this.CWt) {
      this.UFd(this.CWt);
    }
  }
  OnAfterHide() {
    this.ydm();
  }
  Refresh() {
    var e;
    if (this.GachaViewInfo) {
      e = this.GachaViewInfo.ShowIdList[0];
      this.fWt(e);
    }
  }
  fWt(e) {
    if (this.Rjt) {
      this.gWt.Push(e);
    } else {
      this.Ujt();
      this.pWt(e).finally(() => {
        this.Jft();
      });
    }
  }
  async pWt(t) {
    if (!this.IsDestroyOrDestroying) {
      this.mWt.Update(t);
      this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(2));
      var t = this.GetItem(0);
      var s = this.GachaViewInfo.WeaponPrefabPath;
      var h = this.dWt.get(s);
      if (!h || h !== this.CWt) {
        this.ydm();
        let e = h;
        if (!e) {
          h = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(s, t);
          e = h.GetComponentByClass(UE.UIItem.StaticClass());
          let i = this.aGc.get(e);
          if (!i) {
            i = new LevelSequencePlayer_1.LevelSequencePlayer(e);
            this.aGc.set(e, i);
          }
          e.GetOwner().OnSequencePlayEvent.Bind((e, t) => {
            if (i && i.IsValid() && e === "Start" && t === "PlayLoop") {
              i.PlayLevelSequenceByName("Loop");
            }
          });
          this.dWt.set(s, e);
        }
        e.SetUIActive(true);
        this.UFd(e);
        this.CWt = e;
      }
    }
  }
  UFd(e) {
    e = this.aGc.get(e);
    if (e) {
      e.StopSequenceByKey("Loop");
      e.PlayOrReplaySequenceByName("Start");
    }
  }
  hGc(e) {
    if (e &&= this.aGc.get(e)) {
      e.StopCurrentSequence();
    }
  }
  ydm() {
    if (this.CWt) {
      this.CWt.SetUIActive(false);
      this.hGc(this.CWt);
      this.CWt = undefined;
    }
  }
}
exports.UpWeaponGachaPoolItem = UpWeaponGachaPoolItem;
//# sourceMappingURL=UpWeaponGachaPoolItem.js.map