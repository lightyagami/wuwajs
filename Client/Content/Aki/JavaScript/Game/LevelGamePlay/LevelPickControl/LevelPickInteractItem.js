"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPickInteractItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const Global_1 = require("../../Global");
class LevelPickInteractItem {
  constructor() {
    this.nGa = Vector2D_1.Vector2D.Create();
    this.sGa = Vector2D_1.Vector2D.Create();
    this.OQt = undefined;
    this.Zqe = undefined;
    this.aGa = undefined;
  }
  get IsValid() {
    return !this.nGa.Equals(this.sGa);
  }
  Init(t, e, i = undefined) {
    this.RefreshBox(t);
    this.Zqe = e;
    this.aGa = i;
  }
  RefreshBox(t) {
    var e;
    var i;
    if (UE.KuroLevelPlayLibrary.GetActorScreenBoundingBox(Global_1.Global.CharacterController, t, LevelPickInteractItem.hGa, LevelPickInteractItem.lGa)) {
      e = (0, puerts_1.$unref)(LevelPickInteractItem.hGa);
      i = (0, puerts_1.$unref)(LevelPickInteractItem.lGa);
      this.nGa.X = e.X;
      this.nGa.Y = e.Y;
      this.sGa.X = i.X;
      this.sGa.Y = i.Y;
      this.OQt = t;
    } else {
      this.nGa.X = 0;
      this.nGa.Y = 0;
      this.sGa.X = 0;
      this.sGa.Y = 0;
    }
  }
  CheckInside(t) {
    return t.X > this.nGa.X && t.Y > this.nGa.Y && t.X < this.sGa.X && t.Y < this.sGa.Y;
  }
  OnPick() {
    if (this.OQt) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Interaction", 36, "Pick Item", ["actorName", this.OQt?.GetName()]);
      }
      if (this.aGa) {
        this.aGa(this.OQt);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Interaction", 36, "[LevelPick]Owner is undefined when pick");
    }
  }
  OnClick() {
    if (this.OQt) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Interaction", 36, "Click Item", ["actorName", this.OQt?.GetName()]);
      }
      if (this.Zqe) {
        this.Zqe(this.OQt);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Interaction", 36, "[LevelPick]Owner is undefined when click");
    }
  }
}
(exports.LevelPickInteractItem = LevelPickInteractItem).hGa = (0, puerts_1.$ref)(undefined);
LevelPickInteractItem.lGa = (0, puerts_1.$ref)(undefined); //# sourceMappingURL=LevelPickInteractItem.js.map