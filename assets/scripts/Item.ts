import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component {
    public bulletSpeed: number = 10;
    private posX: number;
    private posY: number;
    start() {
    }
    update(deltaTime: number) {
        this.posX = this.node.position.x;
        this.posY = this.node.position.y;
        if(this.posX === 0){
            return;
        }
        this.posY -= this.bulletSpeed * 0.3;
        
        let posBullet = new Vec3(this.posX, this.posY);
        this.node.setPosition(posBullet);
    }
}


