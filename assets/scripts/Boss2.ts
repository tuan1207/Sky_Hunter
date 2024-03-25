import { _decorator, Collider2D, Component, IPhysics2DContact, Node } from 'cc';
import { Boss } from './Boss';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('Boss2')
export class Boss2 extends Boss {
    update(dt: number): void {
        super.update(dt);
    }
    start() {
        super.start();
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact){
        super.onBeginContact(selfCollider, otherCollider, contact);
        this.scheduleOnce(() => {this.bulletCont.push(otherCollider)});
        this.currentHealth -= 1.5;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
        }
        GameCtrl.instance.healthBar.progress = this.currentHealth / this.maxHealth;
        if(this.bulletCont.length >= 100){
            this.scheduleOnce(() => {GameCtrl.instance.countPoint(1000)});
            GameCtrl.instance.healthBar.node.active = false;  
            this.scheduleOnce(() => {selfCollider.node.destroy()});
            GameCtrl.instance.schedule(GameCtrl.instance.spawnTurn3, 7, 9, 0);
            this.bulletCont = [];
        }
    }
}


