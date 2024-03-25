import { _decorator, Collider2D, Component, instantiate, IPhysics2DContact, macro, Node, RigidBody2D } from 'cc';
import { Boss } from './Boss';
import { GameCtrl } from './GameCtrl';
import { ButtonPlayScene } from './ButtonPlayScene';
const { ccclass, property } = _decorator;

@ccclass('Boss3')
export class Boss3 extends Boss {
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
        this.currentHealth -= 1;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
        }
        GameCtrl.instance.healthBar.progress = this.currentHealth / this.maxHealth;
        if(this.bulletCont.length >= 150){
            this.scheduleOnce(() => {GameCtrl.instance.countPoint(1000)});
            GameCtrl.instance.healthBar.node.active = false;  
            this.scheduleOnce(() => {selfCollider.node.destroy()});
            GameCtrl.instance.schedule(GameCtrl.instance.spawnTurn1, 7, 9, 0);
            this.bulletCont = [];
        }
    }
    spawnBullet() {
        if(!ButtonPlayScene.instance.spawnEnabled) return;
        for( let i = 0; i < this.bulletVelos.length; i++){
            let enemyPre = this.bulletE;
            for(let j = 0; j < 3; j++){
                let prefabInstance = instantiate(enemyPre);
                prefabInstance.parent = this.node.parent;
                prefabInstance.getComponent(RigidBody2D).linearVelocity = this.bulletVelos[i];
                if(j === 0){
                    prefabInstance.setWorldPosition(this.node.worldPosition.x - 105, this.node.worldPosition.y - 65, this.node.worldPosition.z);
                }
                if(j === 1){
                    prefabInstance.setWorldPosition(this.node.worldPosition.x + 105, this.node.worldPosition.y - 65, this.node.worldPosition.z);
                }
                if(j === 2){
                    prefabInstance.setWorldPosition(this.node.worldPosition.x, this.node.worldPosition.y, this.node.worldPosition.z);
                }
            }
        }
    }
}


