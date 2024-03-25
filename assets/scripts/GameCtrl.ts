import { _decorator, Component, Node, Prefab, Vec3, instantiate, macro, Label, ProgressBar, System, sys, Pool, NodePool, RigidBody2D, Vec2, tween } from 'cc';
import { Plane } from './Plane';
import { ButtonPlayScene } from './ButtonPlayScene';
import { Boss } from './Boss';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    static instance: GameCtrl;

    @property(Prefab)
    public enemyWave1: Prefab = null;
    @property(Prefab)
    public enemyWave2: Prefab = null;
    @property(Prefab)
    public enemyWave3: Prefab = null;
    @property(Prefab)
    public listBoss: Prefab [] = [];
    @property(Prefab)
    public helicop: Prefab = null;

    @property(Node)
    public overNode: Node = null;

    @property(Label)
    public countPointLb: Label;
    @property(Label)
    public overPointLb: Label;
    @property(Label)
    public highPointLb: Label;

    @property(ProgressBar)
    public healthBar: ProgressBar = null;

    public destroyCount: number = 0;
    public highPoint: number = 0;
    public countElement: number = 1;

    private objectPool: NodePool;
    listPos = [
        new Vec3(640, 760, -1), //turn 1, 3, 5, 7
        new Vec3(-50, 760, -1), //turn 2
        new Vec3(-100, 560, -1),//turn 4
        new Vec3(-50, 270, -1), //turn 6
        new Vec3(1330, 560, -1),//turn 8
        new Vec3(1330, 270, -1),//turn 9
        new Vec3(1330, 760, -1),//turn 10
        new Vec3(640, 500, -1)  //turn boss
    ];
    protected onLoad(): void {
        GameCtrl.instance = this;
        this.schedule(this.spawnTurn1, 7, 9, 0);
        this.schedule(this.spawnObject, 24, macro.REPEAT_FOREVER, 0);
        this.objectPool = new NodePool();
    }
    protected update(dt: number): void {
    }
    countEle(){
        if(this.countElement === 10){
            this.countElement = 1;
            return;
        }
        this.countElement++;
    }
    spawnTurn1(){
        if(!ButtonPlayScene.instance.spawnEnabled) return;
        console.log('bat dau spawn');
        this.scheduleOnce(() => {this.countEle()}); 
        let bulletPrefab0 = this.enemyWave1;
        for(let j = 0; j < 5; j++){
            let prefabInstance = instantiate(bulletPrefab0);
            prefabInstance.parent = this.node;
            switch(this.countElement){    
                case 1:
                    prefabInstance.setWorldPosition(this.listPos[1].x - (100 * (0 + j)), this.listPos[1].y + (60 * (j + 1)), this.listPos[0].z);
                    break;
                case 2:
                    prefabInstance.setWorldPosition(this.listPos[0].x, this.listPos[0].y + (120 * (0 + j)), this.listPos[0].z);
                    break;
                case 3:
                    prefabInstance.setWorldPosition(this.listPos[2].x + (140 * (j - 2)), this.listPos[2].y, this.listPos[2].z);
                    break;
                case 4:
                    prefabInstance.setWorldPosition(this.listPos[0].x, this.listPos[0].y + (120 * (0 + j)), this.listPos[0].z);
                    break;
                case 5:
                    prefabInstance.setWorldPosition(this.listPos[3].x + (140 * (j - 2)), this.listPos[3].y, this.listPos[3].z);
                    break;
                case 6:
                    prefabInstance.setWorldPosition(this.listPos[0].x + (120 * (j - 2)), this.listPos[0].y, this.listPos[0].z);
                    break;
                case 7:
                    prefabInstance.setWorldPosition(this.listPos[4].x + (140 * (j - 2)), this.listPos[4].y, this.listPos[4].z);
                    break;
                case 8:
                    prefabInstance.setWorldPosition(this.listPos[5].x + (140 * (j - 2)), this.listPos[5].y, this.listPos[5].z);
                    break;
                case 9:
                    prefabInstance.setWorldPosition(this.listPos[6].x + (100 * (0 + j)), this.listPos[6].y + (60 * (j + 1)), this.listPos[6].z);
                    break;
                case 10:
                    prefabInstance.setWorldPosition(this.listPos[0].x + (120 * (j - 2)), this.listPos[0].y, this.listPos[0].z);
                    break;
                default:
                    break;
            }
        }
        if(this.countElement === 10){
            this.scheduleOnce(()=> {this.spawnBoss1()}, 5);
        }

    }
    spawnTurn2(){
        if(!ButtonPlayScene.instance.spawnEnabled) return;
        console.log('bat dau spawn');
        this.scheduleOnce(() => {this.countEle()}); 
        let bulletPrefab0 = this.enemyWave2;
        for(let j = 0; j < 5; j++){
            let prefabInstance = instantiate(bulletPrefab0);
            prefabInstance.parent = this.node;
            switch(this.countElement){
                
                case 1:
                    prefabInstance.setWorldPosition(this.listPos[1].x - (100 * (0 + j)), this.listPos[1].y + (60 * (j + 1)), this.listPos[0].z);
                    break;
                case 2:
                    prefabInstance.setWorldPosition(this.listPos[0].x, this.listPos[0].y + (120 * (0 + j)), this.listPos[0].z);
                    break;
                case 3:
                    prefabInstance.setWorldPosition(this.listPos[2].x + (140 * (j - 2)), this.listPos[2].y, this.listPos[2].z);
                    break;
                case 4:
                    prefabInstance.setWorldPosition(this.listPos[0].x, this.listPos[0].y + (120 * (0 + j)), this.listPos[0].z);
                    break;
                case 5:
                    prefabInstance.setWorldPosition(this.listPos[3].x + (140 * (j - 2)), this.listPos[3].y, this.listPos[3].z);
                    break;
                case 6:
                    prefabInstance.setWorldPosition(this.listPos[0].x + (120 * (j - 2)), this.listPos[0].y, this.listPos[0].z);
                    break;
                case 7:
                    prefabInstance.setWorldPosition(this.listPos[4].x + (140 * (j - 2)), this.listPos[4].y, this.listPos[4].z);
                    break;
                case 8:
                    prefabInstance.setWorldPosition(this.listPos[5].x + (140 * (j - 2)), this.listPos[5].y, this.listPos[5].z);
                    break;
                case 9:
                    prefabInstance.setWorldPosition(this.listPos[6].x + (100 * (0 + j)), this.listPos[6].y + (60 * (j + 1)), this.listPos[6].z);
                    break;
                case 10:
                    prefabInstance.setWorldPosition(this.listPos[0].x + (120 * (j - 2)), this.listPos[0].y, this.listPos[0].z);
                    break;
                default:
                    break;
            }
        }
        if(this.countElement === 10){
            this.scheduleOnce(()=> {this.spawnBoss2()}, 5);
        }
    }
    spawnTurn3(){
        if(!ButtonPlayScene.instance.spawnEnabled) return;
        console.log('bat dau spawn');
        this.scheduleOnce(() => {this.countEle()}); 
        let bulletPrefab0 = this.enemyWave3;
        for(let j = 0; j < 5; j++){
            let prefabInstance = instantiate(bulletPrefab0);
            prefabInstance.parent = this.node;
            switch(this.countElement){
                
                case 1:
                    prefabInstance.setWorldPosition(this.listPos[1].x - (100 * (0 + j)), this.listPos[1].y + (60 * (j + 1)), this.listPos[0].z);
                    break;
                case 2:
                    prefabInstance.setWorldPosition(this.listPos[0].x, this.listPos[0].y + (120 * (0 + j)), this.listPos[0].z);
                    break;
                case 3:
                    prefabInstance.setWorldPosition(this.listPos[2].x + (140 * (j - 2)), this.listPos[2].y, this.listPos[2].z);
                    break;
                case 4:
                    prefabInstance.setWorldPosition(this.listPos[0].x, this.listPos[0].y + (120 * (0 + j)), this.listPos[0].z);
                    break;
                case 5:
                    prefabInstance.setWorldPosition(this.listPos[3].x + (140 * (j - 2)), this.listPos[3].y, this.listPos[3].z);
                    break;
                case 6:
                    prefabInstance.setWorldPosition(this.listPos[0].x + (120 * (j - 2)), this.listPos[0].y, this.listPos[0].z);
                    break;
                case 7:
                    prefabInstance.setWorldPosition(this.listPos[4].x + (140 * (j - 2)), this.listPos[4].y, this.listPos[4].z);
                    break;
                case 8:
                    prefabInstance.setWorldPosition(this.listPos[5].x + (140 * (j - 2)), this.listPos[5].y, this.listPos[5].z);
                    break;
                case 9:
                    prefabInstance.setWorldPosition(this.listPos[6].x + (100 * (0 + j)), this.listPos[6].y + (60 * (j + 1)), this.listPos[6].z);
                    break;
                case 10:
                    prefabInstance.setWorldPosition(this.listPos[0].x + (120 * (j - 2)), this.listPos[0].y, this.listPos[0].z);
                    break;
                default:
                    break;
            }
        }
        if(this.countElement === 10){
            this.scheduleOnce(()=> {this.spawnBoss3()}, 5);
        }
    }
    spawnBoss1(){
        console.log('da spawn');
        let enemyPre = this.listBoss[0];
        this.healthBar.node.active = true;
        this.healthBar.progress = 1;
        let prefabInstance = instantiate(enemyPre);
        prefabInstance.parent = this.node;
        prefabInstance.setWorldPosition(this.listPos[7]);
    }
    spawnBoss2(){
        let enemyPre = this.listBoss[1];
        this.healthBar.node.active = true;
        this.healthBar.progress = 1;
        let prefabInstance = instantiate(enemyPre);
        prefabInstance.parent = this.node;
        prefabInstance.setWorldPosition(this.listPos[7]);
    }
    spawnBoss3(){
        let enemyPre = this.listBoss[2];
        this.healthBar.node.active = true;
        this.healthBar.progress = 1;
        let prefabInstance = instantiate(enemyPre);
        prefabInstance.parent = this.node;
        prefabInstance.setWorldPosition(this.listPos[7]);
    }
    spawnObject() {
        if(!ButtonPlayScene.instance.spawnEnabled) return;
        let object = this.objectPool.get();
        if (!object) {
            object = instantiate(this.helicop);
        }
        object.parent = this.node;
        object.setWorldPosition(0, 620, 0);
        this.node.addChild(object);
    }
    countPoint(point: number){
        this.destroyCount += point;
        this.countPointLb.string = `${this.destroyCount}`;
        this.overPointLb.string = `${this.destroyCount}`;
    }
    savePoint() {
        this.overPointLb.string = `${this.destroyCount}`;

        let storedHighPoint = parseInt(sys.localStorage.getItem('highPoint'));
        if (!isNaN(storedHighPoint)) {
            this.highPoint = storedHighPoint;
        }

        if (this.destroyCount > this.highPoint) {
            this.highPoint = this.destroyCount;
            sys.localStorage.setItem('highPoint', this.highPoint.toString());
        }

        this.highPointLb.string = `${this.highPoint}`;
    }
}


