import { _decorator, Component, tween, Vec3, Node, Prefab, instantiate, Collider2D, Contact2DType, IPhysics2DContact, math, Vec2, RigidBody2D, macro, UITransform } from 'cc';
import { GameCtrl } from './GameCtrl';
import { Plane } from './Plane';
import { AudioToggle } from './AudioToggle';
import { ButtonPlayScene } from './ButtonPlayScene';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    static instance: Enemy;
    @property(Prefab)
    public destroyPre: Prefab = null;
    @property(Prefab)
    public bulletPre: Prefab = null;

    public bulletSpeed: number = 5;
    private posX: number;
    private posY: number;
    private contE2 = [];
    private contE3 = [];
    protected onLoad(): void {
        Enemy.instance = this;
        this.schedule(this.spawnBultet, 2.5, macro.REPEAT_FOREVER, 0);
    }
    start() {
        let collider = this.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        
    }

    update(deltaTime: number) {
        this.enemyMove();
    }
    spawnBultet(){
        let bullet = this.bulletPre;
        let prefabInstance = instantiate(bullet);
        prefabInstance.parent = Plane.instance.bullet;
        prefabInstance.setWorldPosition(this.node.worldPosition);

        let direction = this.node.position.subtract(Plane.instance.node.position).normalize();
        let bulletVelo = new Vec2(-direction.x * 10, -direction.y * 10);
        prefabInstance.getComponent(RigidBody2D).linearVelocity = bulletVelo;
    }
    destroyB(){
        let destroyPrefab = this.destroyPre;
        let prefabInstance = instantiate(destroyPrefab);
        prefabInstance.parent = this.node;
        prefabInstance.setWorldPosition(this.node.worldPosition);
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        AudioToggle.instance.onAudioQueue(7);

        if(selfCollider.node.name.startsWith('enemy1')){
            this.scheduleOnce(() => {selfCollider.node.destroy()});
            this.scheduleOnce(() => {GameCtrl.instance.countPoint(100)});
            
        }
        if(selfCollider.node.name.startsWith('enemy2')){
            this.scheduleOnce(() => {this.contE2.push(otherCollider.node)});
            if(this.contE2.length >= 1){
                this.scheduleOnce(() => {selfCollider.node.destroy()});
                this.scheduleOnce(() => {GameCtrl.instance.countPoint(100)});
            }
        }
        if(selfCollider.node.name.startsWith('enemy3')){
            this.scheduleOnce(() => {this.contE3.push(otherCollider.node)});
            if(this.contE3.length >= 2 ){
                this.scheduleOnce(() => {selfCollider.node.destroy()});
                this.scheduleOnce(() => {GameCtrl.instance.countPoint(100)});
            }
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){

    }
    enemyMove(){
        if(!ButtonPlayScene.instance.moveEnable) return;
        if(GameCtrl.instance.countElement === 1){
            if(this.posY < -400){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;

            this.posY -= this.bulletSpeed * 0.75;
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 2){
            if(this.posY < -400){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;

            this.posX += this.bulletSpeed * 0.75;
            this.posY -= this.bulletSpeed * 0.5;
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 3){
            if(this.posX > 700){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;
                
            if(this.posY > 40){
                this.posY -= this.bulletSpeed * 0.75;
            }else{
                this.posX += this.bulletSpeed ;
            }
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 4){
            if(this.posX > 700){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;

            this.posX += this.bulletSpeed;
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 5){
            if(this.posX < -700){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;
                
            if(this.posY > 40){
                this.posY -= this.bulletSpeed * 0.75;
            }else{
                this.posX -= this.bulletSpeed ;
            }
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 6){
            if(this.posY < -400){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;

            if(this.posX < -400){
                this.posX += this.bulletSpeed * 0.75;
            }else{
                this.posX += this.bulletSpeed * 0.75;
                this.posY -= this.bulletSpeed * 0.5;
            }
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 7){
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;

            
            if(this.posY > 200){
                this.posY -= this.bulletSpeed * 0.75;
            }else{return;}
            this.scheduleOnce(()=>{this.node.destroy()}, 5);
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 8){
            if(this.posX < -700){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;

            this.posX -= this.bulletSpeed;
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 9){
            if(this.posY < -400){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;

            if(this.posX > 360){
                this.posX -= this.bulletSpeed * 0.75;
            }else{
                this.posX -= this.bulletSpeed * 0.75;
                this.posY -= this.bulletSpeed * 0.5;
            }
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
        if(GameCtrl.instance.countElement === 10){
            if(this.posY < -400){
                this.node.destroy();
            }
            this.posX = this.node.position.x;
            this.posY = this.node.position.y;

            this.posX -= this.bulletSpeed * 0.75;
            this.posY -= this.bulletSpeed * 0.5;
            let posBullet = new Vec3(this.posX, this.posY);
            this.node.setPosition(posBullet);
        }
    }
}


