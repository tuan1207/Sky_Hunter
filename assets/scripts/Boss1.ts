import { _decorator, Collider2D, instantiate, IPhysics2DContact, macro, math, RigidBody2D, Vec3 } from "cc";
import { Boss } from "./Boss";
import { ButtonPlayScene } from "./ButtonPlayScene";
import { GameCtrl } from "./GameCtrl";
const { ccclass, property } = _decorator;

@ccclass('Boss1')
export class Boss1 extends Boss{
    update(dt: number): void {
        super.update(dt);
    }
    start() {
        super.start();
    }
    protected onLoad(): void {
        this.schedule(this.spawnBullet, 2.5, macro.REPEAT_FOREVER, 0);
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact){
        super.onBeginContact(selfCollider, otherCollider, contact);
        this.scheduleOnce(() => {this.bulletCont.push(otherCollider)});
        this.currentHealth -= 3;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
        }
        GameCtrl.instance.healthBar.progress = this.currentHealth / this.maxHealth;
        if(this.bulletCont.length >= 50){   
            this.scheduleOnce(() => {GameCtrl.instance.countPoint(1000)});
            GameCtrl.instance.healthBar.node.active = false;      
            this.scheduleOnce(() => {selfCollider.node.destroy()}); 
            GameCtrl.instance.schedule(GameCtrl.instance.spawnTurn2, 7, 9, 0);
            this.bulletCont = [];
        }
    }
    spawnBullet() {
        if(!ButtonPlayScene.instance.spawnEnabled) return;
        for(let i = 0; i < this.bulletVelos.length; i++){
        let enemyPre = this.bulletE;
        let prefabInstance = instantiate(enemyPre);
        prefabInstance.getComponent(RigidBody2D).linearVelocity = this.bulletVelos[i];
        prefabInstance.parent = this.node.parent;
        prefabInstance.setWorldPosition(this.node.worldPosition);
        }
    }
}